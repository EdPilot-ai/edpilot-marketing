"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-triggered fade-up for below-the-fold content. Server pages wrap
 * section bodies (or individual grid items, with a small stagger `delay`) in
 * this; the `m` component gets its animation features from the LazyMotion
 * provider in the root layout, and `MotionConfig reducedMotion="user"` turns
 * the whole thing off for users who prefer reduced motion.
 *
 * Above-the-fold hero content deliberately does NOT use this; it animates
 * with the CSS-only `animate-fade-up` utility so first paint never depends
 * on JavaScript.
 *
 * Reduced motion: `MotionConfig reducedMotion="user"` stops transform
 * animation but Framer still animates opacity, which would gate content
 * behind whileInView. A `[data-reveal]` rule inside the global
 * prefers-reduced-motion media block (globals.css) pins opacity:1 /
 * transform:none with !important, so reduced-motion users get the final
 * visible state instantly — no scroll, no JS timing. (Kept in CSS rather
 * than branching here so the SSR markup never diverges from hydration.)
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div
      data-reveal=""
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{
        delay,
        opacity: { duration: 0.45, ease: "easeOut", delay },
        y: { type: "spring", stiffness: 120, damping: 20, mass: 0.9, delay },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}
