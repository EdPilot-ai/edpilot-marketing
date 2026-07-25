"use client";

import { m, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Gentle scroll-linked vertical parallax (T13). The wrapped block drifts
 * from +amount to -amount px as it crosses the viewport, smoothed by a soft
 * spring so it trails the scroll instead of tracking it 1:1. Transform-only,
 * so it cannot cause layout shift.
 *
 * Reduced motion follows the site's [data-reveal] pattern: SSR markup never
 * diverges from hydration, and the [data-parallax] rule in the global
 * prefers-reduced-motion block pins transform:none with !important — the
 * scroll-linked motion value loses to the CSS pin, so the block is static.
 */
export function ParallaxY({
  children,
  className,
  amount = 24,
}: {
  children: ReactNode;
  className?: string;
  /** Total half-travel in px. Keep small (16–28) for the "expensive restraint" feel. */
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const raw = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  const y = useSpring(raw, { stiffness: 80, damping: 20, mass: 0.8 });

  return (
    <m.div ref={ref} data-parallax="" style={{ y }} className={className}>
      {children}
    </m.div>
  );
}
