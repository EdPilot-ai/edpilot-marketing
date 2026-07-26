"use client";

import { useRef, type ReactNode } from "react";
import { m, useScroll, useTransform } from "framer-motion";

/**
 * Scroll-linked "screen" reveal for the hero mockup: it sits tilted back like a
 * display hinged away from you, then rises and flattens as the page scrolls
 * toward it.
 *
 * Written against the repo's own framer-motion setup rather than pulled from a
 * component registry — the site already owns its motion primitives
 * (`MockupTilt`, `ParallaxY`), shadcn is not configured here, and a vendored
 * copy would arrive with its own Tailwind assumptions and no reduced-motion
 * story.
 *
 * Composes with `MockupTilt`: the scroll rotation lives on this outer element
 * and the pointer tilt on an inner one, so once the mockup has settled at 0deg
 * the pointer behaviour is exactly what it was before.
 *
 * Reduced motion follows the site's `[data-draw]` convention — a global
 * prefers-reduced-motion rule pins those elements to `transform: none`, which
 * beats Framer's inline style, so the mockup simply sits flat and static.
 *
 * The tilt starts at the END of the range and unwinds toward 0 as the element
 * rises, which means the resting state of this component is *flat*. That is
 * deliberate: if scroll progress ever fails to update, a flat mockup is the
 * correct-looking fallback, where a stuck tilt would read as broken.
 */
export function ContainerScroll({
  children,
  className,
  /** Starting tilt in degrees. */
  tilt = 16,
  /** Starting scale, so the screen also settles forward as it flattens. */
  from = 0.94,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // The hero mockup is already on screen at first paint, so the range runs from
  // "top edge at the bottom of the viewport" to "element centred": at load it
  // is partway through, and it finishes flattening within a screen of scroll.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [tilt, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [from, 1]);

  return (
    <div ref={ref} className={className} style={{ perspective: 1400 }}>
      <m.div
        data-draw=""
        style={{ rotateX, scale, transformOrigin: "50% 0%", willChange: "transform" }}
      >
        {children}
      </m.div>
    </div>
  );
}
