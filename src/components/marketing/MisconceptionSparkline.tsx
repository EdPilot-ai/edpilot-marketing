import { cn } from "@/lib/utils";

/**
 * Pure-SVG misconception-trend sparkline (~120×48) for the "Insight-rich"
 * card (T9). Static illustrative data — misconceptions per week trending
 * down as the assistant surfaces them — rendered as a real artifact instead
 * of another icon. No chart library, no animation, so it is inherently
 * inert under prefers-reduced-motion.
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
        <polygon points={area} fill="rgb(139 92 246 / 0.12)" />
        <polyline
          points={line}
          fill="none"
          stroke="var(--accent-text-hex)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={lastX} cy={lastY} r="3" fill="var(--accent-text-hex)" />
      </svg>
      <figcaption className="mt-1.5 text-[11px] leading-4 text-text-tertiary">
        Misconceptions per week
      </figcaption>
    </figure>
  );
}
