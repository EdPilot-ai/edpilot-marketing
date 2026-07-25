"use client";

import { m } from "framer-motion";

/**
 * Connective line-draw above the "How it works" step cards (T15): a hairline
 * progress rail that draws itself left-to-right the first time it scrolls
 * into view, with a node per step popping in as the line reaches it.
 *
 * Desktop only — on mobile the cards stack vertically and a horizontal rail
 * would lie, so it is hidden below md. Purely decorative (aria-hidden); the
 * step numbers on the cards already carry the sequence semantically.
 *
 * Reduced motion follows the site's [data-reveal] pattern: SSR always
 * renders the same initial state (no hydration divergence), and a
 * [data-draw] rule in the global prefers-reduced-motion block pins the rail
 * fully drawn with !important — Framer's JS animation loses to the CSS pin,
 * so the rail is simply static for those users.
 *
 * The line is an SVG path (crisp pathLength draw, non-scaling stroke); the
 * nodes are absolutely-positioned HTML dots so they stay round at any width.
 */
export function StepsRail({ steps, className }: { steps: number; className?: string }) {
  // Column centers for an N-up grid, as percentages of the rail width.
  const centers = Array.from({ length: steps }, (_, i) => ((2 * i + 1) / (2 * steps)) * 100);
  const d = `M ${centers[0]} 10 L ${centers[centers.length - 1]} 10`;
  const stepDuration = 0.9 / steps;

  return (
    <div className={className} aria-hidden="true">
      <div className="relative h-5">
        <svg
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          className="absolute inset-0 block h-full w-full"
        >
          <m.path
            data-draw=""
            d={d}
            fill="none"
            stroke="var(--accent-hex)"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        </svg>
        {centers.map((cx, index) => (
          <m.span
            key={cx}
            data-draw=""
            className="absolute h-[7px] w-[7px] rounded-full bg-accent"
            style={{ left: `calc(${cx}% - 3.5px)`, top: "calc(50% - 3.5px)" }}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{
              delay: stepDuration * (index + 1),
              duration: 0.3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
