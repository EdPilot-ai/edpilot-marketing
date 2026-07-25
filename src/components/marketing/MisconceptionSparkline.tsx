"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Pure-SVG misconception-trend sparkline (~120×48) for the "Insight-rich"
 * card (T9). Static illustrative data — misconceptions per week trending
 * down as the assistant surfaces them — rendered as a real artifact instead
 * of another icon. No chart library.
 *
 * P2: the trend line draws itself in the first time it scrolls into view
 * (pathLength tween), then the area fill and end dot settle in behind it.
 * Reduced motion follows the site's [data-reveal] pattern: SSR markup never
 * diverges from hydration, and the [data-draw] rule in the global
 * prefers-reduced-motion block pins everything fully drawn with !important.
 */
const TREND = [38, 34, 36, 27, 29, 20, 16, 9];

export function MisconceptionSparkline({ className }: { className?: string }) {
  const width = 120;
  const height = 48;
  const pad = 4;
  const max = Math.max(...TREND);
  const min = Math.min(...TREND);
  const points = TREND.map((value, index) => {
    const x = pad + (index * (width - pad * 2)) / (TREND.length - 1);
    const y = pad + (1 - (value - min) / (max - min)) * (height - pad * 2 - 10);
    return [x, y] as const;
  });
  const line = points.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `${pad},${height - 10} ${line} ${width - pad},${height - 10}`;
  const path = `M ${points.map(([x, y]) => `${x} ${y}`).join(" L ")}`;
  const [lastX, lastY] = points[points.length - 1];

  return (
    <figure className={cn("w-[120px]", className)}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Trend line showing student misconceptions per week falling over eight weeks"
        className="block"
      >
        <m.polygon
          data-draw=""
          points={area}
          fill="rgb(139 92 246 / 0.12)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ delay: 0.55, duration: 0.4, ease: "easeOut" }}
        />
        <m.path
          data-draw=""
          d={path}
          fill="none"
          stroke="var(--accent-text-hex)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <m.circle
          data-draw=""
          cx={lastX}
          cy={lastY}
          r="3"
          fill="var(--accent-text-hex)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ delay: 0.75, duration: 0.25, ease: "easeOut" }}
        />
      </svg>
      <figcaption className="mt-1.5 text-[11px] leading-4 text-text-tertiary">
        Misconceptions per week
      </figcaption>
    </figure>
  );
}
