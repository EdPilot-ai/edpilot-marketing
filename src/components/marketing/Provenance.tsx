import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The site's signature visual device: every claim wears its receipt the same
 * way, everywhere. Two registers, one grammar:
 *
 * - `SourceChip` — a numbered violet chip for PRODUCT citations (an answer
 *   tracing back to course materials). The numbered square is the mark.
 * - `SourceLine` — a hairline-topped "Source · name" caption for RESEARCH
 *   citations (external stats and surveys). The small-caps SOURCE tick is the
 *   same mark in caption register.
 *
 * If a claim can't carry one of these, that's a signal the claim shouldn't
 * ship. Do not restyle citations ad hoc — extend this file instead.
 */

export function SourceChip({
  index,
  children,
  className,
}: {
  /** 1-based citation number; pairs with an inline `CitationMark` in prose. */
  index: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-2 rounded-md border border-accent/15 bg-accent/5 px-2.5 py-1.5 text-[11px] font-medium text-accent",
        className,
      )}
    >
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-accent/15 bg-bg-deep text-[10px] tabular-nums">
        {index}
      </span>
      <span className="truncate">{children}</span>
    </span>
  );
}

/**
 * Inline superscript citation marker for prose, visually keyed to the
 * numbered `SourceChip`s beneath the same passage. Decorative — the chips
 * carry the source text for assistive tech, so the marker is aria-hidden.
 */
export function CitationMark({ index }: { index: number }) {
  return (
    <sup aria-hidden="true" className="ml-0.5 select-none text-[0.7em] font-semibold text-accent">
      {index}
    </sup>
  );
}

export function SourceLine({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "border-t border-border-gray pt-2.5 text-[11px] leading-4 text-text-tertiary",
        className,
      )}
    >
      <span className="text-text-faint mr-1.5 font-semibold uppercase tracking-[0.14em]">
        Source
      </span>
      {children}
    </p>
  );
}
