"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads Framer Motion's animation + exit (AnimatePresence) features for the
 * lightweight `m` components used across the marketing pages.
 *
 * The pages import `m` (not `motion`) for a smaller bundle, but `m` renders
 * with NO animation features unless a `LazyMotion` provider supplies them.
 * Without this wrapper, entrance/exit animations silently no-op and elements
 * with an `initial` state (e.g. opacity:0) can stay stuck in that state.
 *
 * `domAnimation` covers animations, variants, and exit transitions; every
 * feature the marketing pages use. Layout/drag (`domMax`) are intentionally
 * left out to keep the bundle small.
 *
 * `reducedMotion="user"` makes Framer honor the OS "reduce motion" setting
 * (it does NOT by default). Framer animates with JS, so the global
 * prefers-reduced-motion CSS in globals.css can't reach it, so this is the
 * runtime equivalent, matching the site's stated WCAG/ADA posture.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </MotionConfig>
  );
}
