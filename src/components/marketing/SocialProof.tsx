import type { ElementType } from "react";
import {
  Accessibility,
  BadgeCheck,
  Building2,
  KeyRound,
  Lock,
  Quote,
  ShieldCheck,
} from "lucide-react";
import { SourceLine } from "@/components/marketing/Provenance";
import { CountUp } from "@/components/motion/CountUp";
import { cn } from "@/lib/utils";
import type { ProcurementBadge, Testimonial } from "@/lib/social-proof";

/**
 * A row of headline numbers. Pass product facts (value + label) or sourced
 * third-party evidence (value + label + source). When `source` is present it
 * renders as a small citation caption under the claim — that inline attribution
 * is what makes an external statistic defensible, so never drop it.
 */
export function StatBand({
  items,
  className,
}: {
  items: Array<{ value: string; label: string; source?: string }>;
  className?: string;
}) {
  const hasSources = items.some((item) => item.source);

  return (
    <dl
      className={cn(
        "shadow-card grid gap-px overflow-hidden rounded-xl border border-border-gray bg-border-gray sm:grid-cols-2 lg:grid-cols-4",
        // Sourced stats share row tracks via subgrid, so the number, the claim
        // and the citation each sit on one line across all four cards. Without
        // it a claim that wraps to three lines drags its own citation rule out
        // of alignment with its neighbours, which reads as sloppy on a section
        // whose whole job is looking defensible.
        hasSources && "lg:grid-rows-[auto_1fr_auto] lg:gap-y-0",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            "bg-bg-deep p-6 text-center md:p-7",
            hasSources
              ? "grid grid-rows-[auto_1fr_auto] gap-y-3 lg:row-span-3 lg:grid-rows-subgrid"
              : "flex flex-col",
          )}
        >
          {/* Absolutely positioned, so it never claims a subgrid row. */}
          <dt className="sr-only">
            {item.label}
            {item.source ? ` — source: ${item.source}` : ""}
          </dt>
          <dd
            className={cn(
              "font-display font-semibold tracking-[-0.03em] text-text-primary",
              // Values like "Same week" are words, not figures — keeping them on
              // one line stops a single card growing taller than the rest.
              "whitespace-nowrap text-3xl md:text-[2rem]",
            )}
          >
            <CountUp value={item.value} />
          </dd>
          {item.source ? (
            <>
              <p className="text-[13px] leading-5 text-text-secondary">{item.label}</p>
              <SourceLine className="text-left">{item.source}</SourceLine>
            </>
          ) : (
            <p className="section-kicker mt-2.5 leading-5 text-text-tertiary">{item.label}</p>
          )}
        </div>
      ))}
    </dl>
  );
}

const BADGE_ICONS: Record<string, ElementType> = {
  ferpa: ShieldCheck,
  "no-train": Lock,
  scoped: Building2,
  wcag: Accessibility,
  encryption: KeyRound,
  soc2: BadgeCheck,
};

/**
 * Compact security & procurement pills. Enabled badges render in the accent
 * style; a badge that is not yet enabled but carries a `note` (e.g. SOC 2
 * "in progress") renders in a muted pending style so nothing overstates a claim.
 * Badges that are neither enabled nor noted are omitted entirely.
 */
export function ProcurementBadges({
  badges,
  className,
}: {
  badges: ProcurementBadge[];
  className?: string;
}) {
  const shown = badges.filter((badge) => badge.enabled || badge.note);
  if (shown.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center justify-center gap-2.5", className)}>
      {shown.map((badge) => {
        const Icon = BADGE_ICONS[badge.id] ?? ShieldCheck;
        const pending = !badge.enabled;
        return (
          <li key={badge.id}>
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-medium leading-5",
                pending
                  ? "border-border-gray bg-bg-deep text-text-tertiary"
                  : "border-accent/20 bg-accent/[0.06] text-text-secondary",
              )}
            >
              <Icon
                className={cn(
                  "h-3.5 w-3.5 shrink-0",
                  pending ? "text-text-tertiary" : "text-accent",
                )}
                aria-hidden="true"
              />
              {badge.label}
              {badge.note && <span className="text-text-tertiary">· {badge.note}</span>}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * An honest horizontal strip of positioning statements, used in place of
 * customer logos until real ones exist. These are claims about how the product
 * is built, not fabricated social proof.
 */
/**
 * Renders real testimonials. Returns null when there are none, so the live
 * site never shows placeholder quotes.
 */
export function Testimonials({ quotes, className }: { quotes: Testimonial[]; className?: string }) {
  if (!quotes || quotes.length === 0) return null;

  return (
    <div
      className={cn(
        "grid gap-4",
        quotes.length > 1 ? "md:grid-cols-2 lg:grid-cols-3" : "mx-auto max-w-2xl",
        className,
      )}
    >
      {quotes.map((quote) => (
        <figure
          key={`${quote.name}-${quote.institution}`}
          className="flex h-full flex-col rounded-lg border border-border-gray bg-bg-surface p-6"
        >
          <Quote className="h-5 w-5 text-accent" aria-hidden="true" />
          <blockquote className="mt-4 flex-1 text-sm leading-7 text-text-primary">
            {quote.quote}
          </blockquote>
          <figcaption className="mt-5 border-t border-border-gray pt-4">
            <p className="text-sm font-semibold text-text-primary">{quote.name}</p>
            <p className="mt-0.5 text-xs text-text-secondary">
              {quote.title}, {quote.institution}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
