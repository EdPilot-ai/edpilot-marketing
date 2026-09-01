import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content-Security-Policy for the marketing site.
 *
 * `script-src` keeps `'unsafe-inline'` deliberately. Killing it requires a
 * per-request nonce, which means a nonce-issuing middleware and dynamic
 * rendering on every page — that would drop this site's static generation, so
 * it would cost real money and latency to defend a surface that renders no
 * user-supplied HTML (all content is compiled-in constants, and the only
 * visitor input is write-only form data that is never echoed back). What the
 * policy still buys is origin control: an injected `<script src>` or a
 * hijacked dependency cannot pull code from, or beacon data out to, a host
 * that is not listed here. Revisit the nonce approach if this site ever
 * renders remote or visitor-authored content.
 *
 * Everything the site loads is same-origin: next/font self-hosts the Google
 * fonts at build time, and Vercel Analytics / Speed Insights are proxied under
 * /_vercel. Their public origins are listed only as a fallback so a routing
 * change does not silently break telemetry.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  // Dev needs 'unsafe-eval' for the Turbopack/HMR runtime; production does not.
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ""}https://va.vercel-scripts.com`,
  // Tailwind ships a static stylesheet, but framer-motion writes inline style
  // attributes and the no-JS reveal fallback is an inline <style>.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self' ${isDev ? "ws: " : ""}https://va.vercel-scripts.com https://vitals.vercel-insights.com`,
  "manifest-src 'self'",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // Redundant with frame-ancestors above, kept for browsers that predate it.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send the origin (not the path) cross-site, so a visitor reading
  // /compare/... does not leak that page to an outbound link target.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "camera=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "payment=()",
      "usb=()",
      "interest-cohort=()",
      "browsing-topics=()",
    ].join(", "),
  },
  // Two years, covering subdomains. Every *.edpilot.ai host is HTTPS-only, so
  // this is safe; `preload` is intentionally omitted because submitting to the
  // browser preload list is effectively irreversible.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the Turbopack project root to this repo. Without it, Next walks up
  // looking for lockfiles when the repo sits inside another JS project (or a
  // parent with its own package-lock.json) and can resolve the wrong root,
  // which breaks `next dev` / `next build` in nested checkouts. In a
  // standalone checkout this resolves to the same directory as the default.
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
