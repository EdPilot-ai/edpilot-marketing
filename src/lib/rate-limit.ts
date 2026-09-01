import { headers } from "next/headers";

/**
 * Best-effort abuse throttling for the site's public server actions.
 *
 * Server actions are unauthenticated POST endpoints: anything a browser can
 * submit, a script can submit in a loop. Every accepted contact submission
 * costs a request to the contact-intake service on GCP, and every accepted
 * newsletter signup costs a Postgres write, so an unthrottled action turns a
 * marketing form into a billing lever for anyone with curl.
 *
 * IMPORTANT — this is per-instance, in-memory state. On a serverless platform
 * the site runs across many short-lived instances, so the effective ceiling is
 * (instances x limit), not the limit. Treat this as a floor that blunts the
 * cheap single-source flood, NOT as the real control. The real control is an
 * edge rate limit in front of the deployment (Vercel Firewall) plus hard spend
 * caps on the downstream services. See docs/SECURITY-AUDIT.md.
 */

interface FixedWindow {
  count: number;
  resetAt: number;
}

/**
 * Bounded so a distributed flood cannot grow this map without limit — an
 * unbounded key space would turn the throttle itself into a memory-exhaustion
 * vector. When the map is full, new keys go untracked per-IP and the global
 * ceiling below is what holds.
 */
const MAX_TRACKED_KEYS = 10_000;

const windows = new Map<string, FixedWindow>();

function prune(now: number): void {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}

export interface RateLimitVerdict {
  allowed: boolean;
  /** Seconds until the caller's window resets. Zero when allowed. */
  retryAfterSeconds: number;
}

const ALLOWED: RateLimitVerdict = { allowed: true, retryAfterSeconds: 0 };

/**
 * Count one hit against `key` and report whether it stays within `limit` per
 * `windowMs`. Exported with an injectable clock so the behaviour is testable
 * without waiting on real time.
 */
export function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now: number = Date.now(),
): RateLimitVerdict {
  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    if (!existing && windows.size >= MAX_TRACKED_KEYS) {
      prune(now);
      // Still saturated: skip per-key tracking rather than growing without
      // bound. The global ceiling is the backstop in this state.
      if (windows.size >= MAX_TRACKED_KEYS) return ALLOWED;
    }
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return ALLOWED;
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return ALLOWED;
}

/** Test-only: drop all tracked windows so cases don't leak into each other. */
export function resetRateLimitState(): void {
  windows.clear();
}

function firstAddress(headerValue: string): string {
  // x-forwarded-for is a comma-separated chain; the client is leftmost.
  return headerValue.split(",")[0]?.trim() || "unknown";
}

/**
 * Resolve the caller's address for throttling purposes.
 *
 * `x-vercel-forwarded-for` is stamped by the platform edge and cannot be
 * spoofed by the client, so it is preferred. `x-forwarded-for` is last because
 * a client can prepend entries to it when the request does not pass through a
 * proxy that rewrites the header — a spoofable key would let an attacker mint
 * a fresh bucket per request, which is exactly why the global ceiling exists.
 */
export async function getClientAddress(): Promise<string> {
  const requestHeaders = await headers();

  const vercelForwarded = requestHeaders.get("x-vercel-forwarded-for");
  if (vercelForwarded) return firstAddress(vercelForwarded);

  const realIp = requestHeaders.get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwarded = requestHeaders.get("x-forwarded-for");
  if (forwarded) return firstAddress(forwarded);

  return "unknown";
}

export interface SubmissionLimits {
  /** Accepted submissions per address per window. */
  perAddress: number;
  perAddressWindowMs: number;
  /** Accepted submissions per instance per window, across all addresses. */
  global: number;
  globalWindowMs: number;
}

export const CONTACT_LIMITS: SubmissionLimits = {
  perAddress: 5,
  perAddressWindowMs: 10 * 60 * 1000,
  global: 60,
  globalWindowMs: 60 * 1000,
};

export const NEWSLETTER_LIMITS: SubmissionLimits = {
  perAddress: 5,
  perAddressWindowMs: 10 * 60 * 1000,
  global: 120,
  globalWindowMs: 60 * 1000,
};

/**
 * Apply both the per-address and the per-instance ceiling for one action.
 * The global check runs first and is not keyed on anything client-controlled,
 * so it still holds when an attacker rotates addresses.
 */
export async function checkSubmissionAllowed(
  bucket: string,
  limits: SubmissionLimits,
): Promise<RateLimitVerdict> {
  const globalVerdict = consumeRateLimit(
    `${bucket}:__global__`,
    limits.global,
    limits.globalWindowMs,
  );
  if (!globalVerdict.allowed) return globalVerdict;

  const address = await getClientAddress();
  return consumeRateLimit(`${bucket}:${address}`, limits.perAddress, limits.perAddressWindowMs);
}
