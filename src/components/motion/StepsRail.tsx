/**
 * Connective rail above the "How it works" step cards: a hairline spanning the
 * first and last step, with a node sitting on each column centre.
 *
 * Deliberately static. It was an animated SVG path whose `pathLength` draw is
 * implemented with stroke-dasharray, which rendered as a visibly broken line;
 * the scaled-element version that replaced it was continuous but started at
 * `scaleX(0)` and only filled in on `whileInView`, so anywhere that callback
 * did not fire the divider was invisible instead of merely ugly. A rule that
 * is just a rule cannot fail either way, and the page carries plenty of motion
 * elsewhere.
 *
 * Desktop only — on mobile the cards stack vertically and a horizontal rail
 * would lie about the layout. Purely decorative (aria-hidden); the numbered
 * cards carry the sequence semantically.
 */
export function StepsRail({ steps, className }: { steps: number; className?: string }) {
  // Column centres for an N-up grid, as percentages of the rail width.
  const centers = Array.from({ length: steps }, (_, i) => ((2 * i + 1) / (2 * steps)) * 100);
  const first = centers[0];
  const last = centers[centers.length - 1];

  return (
    <div className={className} aria-hidden="true">
      <div className="relative h-5">
        <div
          className="absolute top-1/2 h-px -translate-y-1/2 bg-accent/25"
          style={{ left: `${first}%`, width: `${last - first}%` }}
        />
        {centers.map((cx) => (
          <span
            key={cx}
            className="absolute h-[7px] w-[7px] rounded-full bg-accent"
            style={{ left: `calc(${cx}% - 3.5px)`, top: "calc(50% - 3.5px)" }}
          />
        ))}
      </div>
    </div>
  );
}
