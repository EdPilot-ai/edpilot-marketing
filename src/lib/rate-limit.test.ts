import { beforeEach, describe, expect, it } from "vitest";
import { consumeRateLimit, resetRateLimitState } from "./rate-limit";

describe("consumeRateLimit", () => {
  beforeEach(() => {
    resetRateLimitState();
  });

  it("allows callers up to the limit and denies the next hit", () => {
    const now = 1_000_000;
    for (let i = 0; i < 3; i += 1) {
      expect(consumeRateLimit("contact:1.2.3.4", 3, 60_000, now).allowed).toBe(true);
    }

    const denied = consumeRateLimit("contact:1.2.3.4", 3, 60_000, now);
    expect(denied.allowed).toBe(false);
    expect(denied.retryAfterSeconds).toBe(60);
  });

  it("keeps separate counters per key", () => {
    const now = 1_000_000;
    expect(consumeRateLimit("contact:1.1.1.1", 1, 60_000, now).allowed).toBe(true);
    expect(consumeRateLimit("contact:1.1.1.1", 1, 60_000, now).allowed).toBe(false);
    // A different address is unaffected by the first one's exhausted window.
    expect(consumeRateLimit("contact:2.2.2.2", 1, 60_000, now).allowed).toBe(true);
  });

  it("does not let one action's budget drain another's", () => {
    const now = 1_000_000;
    expect(consumeRateLimit("contact:__global__", 1, 60_000, now).allowed).toBe(true);
    expect(consumeRateLimit("contact:__global__", 1, 60_000, now).allowed).toBe(false);
    expect(consumeRateLimit("newsletter:__global__", 1, 60_000, now).allowed).toBe(true);
  });

  it("reopens the window once it expires", () => {
    const start = 1_000_000;
    expect(consumeRateLimit("contact:1.2.3.4", 1, 60_000, start).allowed).toBe(true);
    expect(consumeRateLimit("contact:1.2.3.4", 1, 60_000, start + 59_000).allowed).toBe(false);
    expect(consumeRateLimit("contact:1.2.3.4", 1, 60_000, start + 60_001).allowed).toBe(true);
  });

  it("reports a shrinking retry-after as the window drains", () => {
    const start = 1_000_000;
    consumeRateLimit("contact:1.2.3.4", 1, 60_000, start);
    expect(consumeRateLimit("contact:1.2.3.4", 1, 60_000, start + 10_000).retryAfterSeconds).toBe(
      50,
    );
    expect(consumeRateLimit("contact:1.2.3.4", 1, 60_000, start + 50_000).retryAfterSeconds).toBe(
      10,
    );
  });
});
