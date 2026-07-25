import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

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
};

export default nextConfig;
