import Link from "next/link";
import type { ElementType, ReactNode } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft, Plus, X as XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BeforeAfterAnswerCards,
  type AnswerScenario,
} from "@/components/marketing/BeforeAfterAnswerCards";
import { ImagePlaceholder } from "@/components/marketing/ImagePlaceholder";
import { CitationMark, SourceChip } from "@/components/marketing/Provenance";
import { Reveal } from "@/components/marketing/Reveal";
import { CursorGlow } from "@/components/motion/CursorGlow";
import { Magnetic } from "@/components/motion/Magnetic";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { StepsRail } from "@/components/motion/StepsRail";
import { cn } from "@/lib/utils";
import { SIGN_UP_URL } from "@/lib/marketing";

type Action = {
  label: string;
  href: string;
  /**
   * primary   → filled violet button; the one clear action at a decision point.
   * secondary → outline button.
   * link      → quiet inline text link with an arrow, used to demote a second
   *             CTA (e.g. "Book a demo") beneath a single primary action.
   */
  variant?: "primary" | "secondary" | "link";
};

/**
 * Shared renderer for a row of CTAs. Keeps Hero, CTABand, and any inline
 * section CTA in lockstep so the "one primary button + quiet secondary link"
 * hierarchy is consistent site-wide. Wrap in a flex row at the call site.
 */
export function ActionControls({
  actions,
  buttonClassName,
}: {
  actions: Action[];
  buttonClassName?: string;
}) {
  return (
    <>
      {actions.map((action) =>
        action.variant === "link" ? (
          <Link
            key={action.href + action.label}
            href={action.href}
            className="group link-underline inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary focus-ring"
          >
            {action.label}
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        ) : action.variant === "secondary" ? (
          <Button
            key={action.href + action.label}
            asChild
            size="lg"
            variant="outline"
            className={buttonClassName}
          >
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ) : (
          // Primary CTAs get the subtle magnetic hover (T16); the wrapper is a
          // plain fragment on touch/reduced-motion, so layout never changes.
          <Magnetic key={action.href + action.label} className="inline-flex">
            <Button asChild size="lg" variant="default" className={buttonClassName}>
              <Link href={action.href}>
                {action.label}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </Magnetic>
        ),
      )}
    </>
  );
}

export function PageShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("marketing-canvas min-h-screen bg-bg-page text-text-primary", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  surface = "page",
  id,
}: {
  children: ReactNode;
  className?: string;
  /**
   * page  → flat page background.
   * panel → lifted band with hairline borders.
   * deep  → recessed band (below page background).
   * light → warm off-white band that breaks the dark rhythm; locally remaps
   *         the text/border/card tokens so content stays AA on off-white.
   * navy  → deep institutional navy + violet glow, for the closing CTA.
   */
  surface?: "page" | "panel" | "deep" | "light" | "navy";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "section-frame relative border-border-gray",
        surface === "panel" && "border-y bg-bg-surface",
        surface === "deep" && "border-y bg-bg-deep",
        surface === "light" && "border-y surface-light",
        surface === "navy" && "border-y surface-navy",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "narrow" | "default" | "wide";
}) {
  return (
    <div
      className={cn(
        "container mx-auto px-6 md:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-5xl",
        size === "wide" && "max-w-6xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "mx-auto max-w-3xl text-center",
        align === "left" && "max-w-2xl",
        className,
      )}
    >
      {/* The eyebrow reads as a deliberate marker rather than a stray line of
          purple text: a hairline chip with a single accent dot, which also
          gives the heading something to sit against. */}
      {eyebrow && (
        <div className={cn("mb-6 flex", align === "center" && "justify-center")}>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.06] py-1 pl-2.5 pr-3">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
            <span className="section-kicker">{eyebrow}</span>
          </span>
        </div>
      )}
      {/* `text-balance` evens the line lengths so a big headline never leaves a
          single orphaned word on its last line. */}
      <h2 className="text-balance font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-text-primary md:text-[3.15rem]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-pretty text-[15px] leading-7 text-text-secondary md:text-base md:leading-8",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("section-kicker", className)}>{children}</p>;
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border border-accent/15 bg-accent/5 px-2.5 py-1 text-[11px] font-medium tracking-[0.01em] text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "link-underline inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-accent transition-colors hover:text-accent-soft focus-ring",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Hero({
  eyebrow,
  title,
  accent,
  description,
  note,
  actions,
  children,
  className,
  align = "center",
  scrambleAccent = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  accent?: ReactNode;
  description?: ReactNode;
  /** Optional reassurance microcopy rendered under the CTAs. */
  note?: ReactNode;
  actions?: Action[];
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
  /**
   * T17: opt the accent phrase into the one-shot scramble-in. Deliberately
   * opt-in and used exactly once (homepage hero) — it is the site's single
   * signature text moment, so it must not become a default.
   */
  scrambleAccent?: boolean;
}) {
  return (
    <Section className={cn("pt-24 pb-16 md:pt-36 md:pb-28", className)}>
      {/* The hero's single ambient system: the slow-drifting aurora. The old
          static hero-glow used to stack a third radial gradient under it;
          one decisive gradient reads more expensive than a pile. Purely
          decorative, transform/opacity-only; the global reduced-motion rule
          collapses it to a static gradient. */}
      <div
        className="hero-aurora pointer-events-none absolute inset-x-0 top-0 h-[640px] overflow-hidden"
        aria-hidden="true"
      />
      <Container size="wide" className="relative z-10">
        <div
          className={cn(
            align === "center" && "mx-auto max-w-3xl text-center",
            align === "left" && "max-w-3xl",
          )}
        >
          {eyebrow && <p className="section-kicker animate-fade-up mb-5">{eyebrow}</p>}
          <h1 className="animate-fade-up anim-delay-1 font-display text-[2.55rem] font-semibold leading-[1.03] tracking-[-0.045em] text-text-primary sm:text-[3.65rem] md:text-[4.6rem] md:tracking-[-0.05em]">
            {title}
            {accent && (
              <span className="text-accent">
                {" "}
                {scrambleAccent && typeof accent === "string" ? (
                  <ScrambleText text={accent} />
                ) : (
                  accent
                )}
              </span>
            )}
          </h1>
          {description && (
            <p
              className={cn(
                "animate-fade-up anim-delay-2 mt-7 text-base leading-8 text-text-secondary md:text-[1.0625rem] md:leading-8",
                align === "center" && "mx-auto max-w-2xl",
              )}
            >
              {description}
            </p>
          )}
          {actions && actions.length > 0 && (
            <div
              className={cn(
                "animate-fade-up anim-delay-3 mt-10 flex flex-col gap-3 sm:flex-row",
                align === "center" && "items-center justify-center",
                align === "left" && "items-stretch sm:items-center",
              )}
            >
              <ActionControls actions={actions} buttonClassName="h-11 px-7" />
            </div>
          )}
          {note && (
            <p
              className={cn(
                "animate-fade-up anim-delay-4 mt-5 text-[13px] leading-6 text-text-tertiary",
                align === "center" && "mx-auto max-w-xl",
              )}
            >
              {note}
            </p>
          )}
        </div>
        {children}
      </Container>
    </Section>
  );
}

export function IconChip({ icon: Icon, className }: { icon: ElementType; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-gray bg-bg-deep text-accent",
        className,
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </div>
  );
}

export function MarketingCard({
  as: Component = "div",
  children,
  className,
  featured = false,
  surface = "surface",
  interactive = false,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  featured?: boolean;
  surface?: "surface" | "deep";
  interactive?: boolean;
}) {
  return (
    <Component
      className={cn(
        "card-premium rounded-xl border border-border-gray p-5",
        surface === "surface" && "bg-bg-surface",
        surface === "deep" && "bg-bg-deep",
        featured && "surface-gradient-featured relative overflow-hidden border-accent/20",
        interactive &&
          "card-interactive hover:-translate-y-px hover:border-accent/35 hover:bg-bg-elevated",
        className,
      )}
    >
      {/* T16: cursor-following glow on featured cards only. Renders null on
          touch/reduced-motion, so it never affects those users or SSR. */}
      {featured && <CursorGlow />}
      {children}
    </Component>
  );
}

export function FeatureCard({
  icon,
  title,
  description,
  children,
  className,
  featured = false,
}: {
  icon?: ElementType;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  featured?: boolean;
}) {
  return (
    <MarketingCard
      featured={featured}
      interactive
      className={cn("group relative overflow-hidden p-5 md:p-6", className)}
    >
      <div className={cn("flex items-start gap-3.5", !icon && "block")}>
        {icon && <IconChip icon={icon} className="h-9 w-9" />}
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[15px] font-semibold leading-6 tracking-[-0.01em] text-text-primary">
            {title}
          </h3>
          {description && (
            <p className="mt-1.5 text-[13px] leading-6 text-text-secondary">{description}</p>
          )}
        </div>
      </div>
      {children}
    </MarketingCard>
  );
}

export function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3 text-sm leading-6 text-text-secondary">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function TrustBar({
  items,
  className,
}: {
  items: Array<{ icon?: ElementType; label: string; detail: string }>;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-3", className)}>
      {items.map((item) => (
        <MarketingCard key={item.label} surface="deep" interactive className="p-5">
          <div className="flex items-start gap-3">
            {item.icon && <IconChip icon={item.icon} className="h-9 w-9" />}
            <div className={cn("min-w-0 flex-1", !item.icon && "text-center")}>
              <p className="section-kicker text-text-primary">{item.label}</p>
              <p className="mt-2 text-xs leading-5 text-text-secondary">{item.detail}</p>
            </div>
          </div>
        </MarketingCard>
      ))}
    </div>
  );
}

export function StatusPill({
  children,
  tone = "live",
}: {
  children: ReactNode;
  tone?: "live" | "beta" | "planned";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-medium tracking-[0.01em]",
        tone === "live" && "border-status-success/20 bg-status-success/5 text-status-success-soft",
        tone === "beta" && "border-status-warning/20 bg-status-warning/5 text-status-warning-soft",
        tone === "planned" && "border-border-gray bg-bg-deep text-text-tertiary",
      )}
    >
      {children}
    </span>
  );
}

function AnnotationPin({ number }: { number: number }) {
  return (
    <span
      className={cn(
        "animate-pin-pop flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white shadow-[0_0_0_3px_rgba(139,92,246,0.2)]",
        number === 2 && "pin-delay-2",
        number === 3 && "pin-delay-3",
      )}
      aria-hidden="true"
    >
      {number}
    </span>
  );
}

const MOCKUP_ANNOTATIONS = [
  {
    title: "The AI only knows what the professor uploads",
    detail:
      "Syllabus, slides, and rubrics become the assistant's entire world, not the open internet.",
  },
  {
    title: "Every answer cites the course",
    detail:
      "Students can click through to the exact slide or page, so trust never depends on vibes.",
  },
  {
    title: "Professors set rules the AI can't break",
    detail:
      "Integrity mode, citation policy, and assessment boundaries are enforced on every reply.",
  },
];

export function CourseAssistantMockup({
  className,
  annotated = false,
}: {
  className?: string;
  /** Render numbered pins on the three panels plus a legend strip below, turning the mockup into a guided tour. */
  annotated?: boolean;
}) {
  return (
    <div className={cn("mx-auto max-w-6xl", className)}>
      <div className="showcase-surface overflow-hidden rounded-xl border border-border-gray bg-bg-deep">
        <div
          className="flex flex-wrap items-center justify-between gap-3 border-b border-border-gray bg-bg-surface px-4 py-3"
          data-tilt-depth="0.5"
        >
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-window-close" />
            <span className="h-2.5 w-2.5 rounded-full bg-window-minimize" />
            <span className="h-2.5 w-2.5 rounded-full bg-window-maximize" />
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-text-tertiary">
            <span className="rounded-md border border-border-gray bg-bg-deep px-2 py-1">
              BIO 214
            </span>
            <span>Cell Signaling and Disease</span>
          </div>
        </div>
        <div className="grid lg:grid-cols-[260px_minmax(0,1fr)_280px]">
          <aside
            className="border-b border-border-gray bg-bg-surface/70 p-4 lg:border-b-0 lg:border-r"
            data-tilt-depth="0.8"
          >
            <p className="section-kicker mb-3 flex items-center gap-2 text-text-tertiary">
              {annotated && <AnnotationPin number={1} />}
              Course Model
            </p>
            <div className="space-y-3">
              {[
                ["Syllabus", "12 policies indexed"],
                ["Week 6 slides", "48 concepts mapped"],
                ["Rubric", "4 criteria active"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border-gray bg-bg-deep p-3">
                  <p className="text-xs font-semibold text-text-primary">{label}</p>
                  <p className="mt-1 text-[11px] text-text-secondary">{value}</p>
                </div>
              ))}
            </div>
          </aside>

          <div className="min-w-0 p-4 md:p-6" data-tilt-depth="1.2">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="section-kicker text-accent">Student Workspace</p>
                <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-text-primary">
                  The answer stays inside the course.
                </h3>
              </div>
              <span className="flex items-center gap-2">
                {annotated && <AnnotationPin number={2} />}
                <StatusPill>Cites sources</StatusPill>
              </span>
            </div>
            <div className="space-y-4">
              <div className="ml-auto max-w-md rounded-lg border border-accent/20 bg-accent/5 px-4 py-3 text-sm leading-6 text-text-primary">
                Why does receptor desensitization matter in long-term treatment?
              </div>
              <div className="rounded-lg border border-border-gray bg-bg-surface px-4 py-4 text-sm leading-7 text-text-secondary">
                Receptor desensitization means the cell responds less after repeated exposure to a
                signal.
                <CitationMark index={1} /> In this course, Professor Rivera connects it to dosage
                planning: the same signal can produce a weaker effect over time, so treatment has to
                account for changing responsiveness.
                <CitationMark index={2} />
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {["Week 6 slides, frames 18-21", "Case note: beta blockers, p. 3"].map(
                    (source, index) => (
                      <SourceChip key={source} index={index + 1}>
                        {source}
                      </SourceChip>
                    ),
                  )}
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {["Ask a follow-up", "Generate practice", "Show misconception"].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-md border border-border-gray bg-bg-deep px-3 py-2 text-center text-xs font-medium text-text-secondary"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside
            className="border-t border-border-gray bg-bg-surface p-4 lg:border-l lg:border-t-0"
            data-tilt-depth="0.8"
          >
            <p className="section-kicker mb-4 flex items-center gap-2 text-text-tertiary">
              {annotated && <AnnotationPin number={3} />}
              Faculty Controls
            </p>
            <div className="space-y-3">
              {[
                ["Integrity mode", "Guide, do not complete"],
                ["Outside knowledge", "Off for students"],
                ["Citation policy", "Required"],
                ["Assessment help", "Hints only"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border-gray bg-bg-deep p-3">
                  <p className="text-[11px] text-text-tertiary">{label}</p>
                  <p className="mt-1 text-xs font-medium text-text-primary">{value}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
      {annotated && (
        <ol className="mt-6 grid gap-3 text-left md:grid-cols-3">
          {MOCKUP_ANNOTATIONS.map((item, index) => (
            <li
              key={item.title}
              className="flex gap-3 rounded-xl border border-border-gray bg-bg-surface/60 p-4"
            >
              <span className="mt-0.5">
                <AnnotationPin number={index + 1} />
              </span>
              <span>
                <span className="block text-[13px] font-semibold leading-5 text-text-primary">
                  {item.title}
                </span>
                <span className="mt-1 block text-xs leading-5 text-text-secondary">
                  {item.detail}
                </span>
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export function RoleValueGrid({
  items,
  className,
}: {
  items: Array<{
    role: string;
    promise: string;
    detail: string;
    icon?: ElementType;
    /** A rendered preview of the surface this role actually uses. Showing the
        product beats a placeholder block standing in for absent photography. */
    preview?: ReactNode;
  }>;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-3", className)}>
      {items.map((item, index) => (
        <Reveal key={item.role} delay={index * 0.08}>
          <MarketingCard className="h-full p-6">
            {item.preview && <div className="mb-5">{item.preview}</div>}
            <div className="flex items-center gap-3">
              {item.icon && <IconChip icon={item.icon} className="h-9 w-9" />}
              <p className="section-kicker text-accent">{item.role}</p>
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold leading-7 tracking-[-0.02em] text-text-primary">
              {item.promise}
            </h3>
            <p className="mt-3 text-sm leading-7 text-text-secondary">{item.detail}</p>
          </MarketingCard>
        </Reveal>
      ))}
    </div>
  );
}

export function WorkflowSteps({
  steps,
  className,
}: {
  steps: Array<{ step: string; title: string; description: string; icon?: ElementType }>;
  className?: string;
}) {
  return (
    <div className={className}>
      {/* T15: connective progress rail that draws in on scroll. Desktop only;
          decorative — the numbered cards carry the sequence semantically. */}
      <StepsRail steps={steps.length} className="mb-4 hidden md:block" />
      <div className="grid gap-3 md:grid-cols-4">
        {steps.map((item, index) => (
          <Reveal key={item.step} delay={index * 0.08}>
            <MarketingCard surface="deep" className="relative h-full p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="font-display text-xs font-bold text-text-tertiary">
                  {item.step}
                </span>
                {item.icon && <IconChip icon={item.icon} className="h-8 w-8" />}
              </div>
              <h3 className="font-display text-sm font-semibold leading-6 text-text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-[13px] leading-6 text-text-secondary">{item.description}</p>
            </MarketingCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function ProofPanel({
  items,
  className,
}: {
  items: Array<{ label: string; detail: string; icon?: ElementType }>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "surface-gradient-proof rounded-xl border border-border-gray p-5 md:p-7",
        className,
      )}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="flex gap-3">
            {item.icon && <IconChip icon={item.icon} className="h-9 w-9" />}
            <div>
              <p className="text-sm font-semibold text-text-primary">{item.label}</p>
              <p className="mt-1 text-[13px] leading-6 text-text-secondary">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SuiteMap({
  items,
  className,
}: {
  items: Array<{ title: string; status: "live" | "beta" | "planned"; icon?: ElementType }>;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-border-gray bg-bg-deep p-5 md:p-7", className)}>
      <div className="grid gap-4 lg:grid-cols-[1fr_220px_1fr] lg:items-center">
        <div className="grid gap-3">
          {items.slice(0, 3).map((item) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              className="bg-bg-surface"
            >
              <div className="mt-4">
                <StatusPill tone={item.status}>{item.status}</StatusPill>
              </div>
            </FeatureCard>
          ))}
        </div>
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-5 text-center">
          <p className="section-kicker text-accent">One Course Model</p>
          <p className="mt-3 text-sm leading-6 text-text-primary">
            Syllabus, lectures, readings, rubrics, policies, and outcomes stay synchronized.
          </p>
        </div>
        <div className="grid gap-3">
          {items.slice(3).map((item) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              className="bg-bg-surface"
            >
              <div className="mt-4">
                <StatusPill tone={item.status}>{item.status}</StatusPill>
              </div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CTABand({
  title,
  description,
  actions,
  surface = "deep",
}: {
  title: ReactNode;
  description: ReactNode;
  actions: Action[];
  /**
   * deep → default recessed band with a low-opacity violet texture rising
   *        from the bottom edge (CSS-only, no image request).
   * navy → institutional navy + violet glow variant, for the page-closing CTA.
   */
  surface?: "deep" | "navy";
}) {
  return (
    <Section className="py-20 md:py-28" surface={surface}>
      {surface === "deep" && (
        <div className="cta-texture pointer-events-none absolute inset-0" aria-hidden="true" />
      )}
      <Container className="relative z-10">
        <Reveal>
          <div className="cta-signal mx-auto max-w-3xl rounded-xl border border-border-gray px-7 py-12 text-center md:px-12">
            <div>
              <h2 className="font-display text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.035em] text-text-primary md:text-[3rem]">
                {title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-text-secondary md:text-base">
                {description}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ActionControls actions={actions} />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/**
 * Side-by-side capability lists for the compare deep-dive pages. Competitor
 * items that read as strengths (the first `leftStrengths`) get a neutral dot;
 * the rest get an X. Being honest about what alternatives do well makes the
 * EdPilot column more credible, and the icons make the split scannable.
 */
export function ComparisonGrid({
  leftTitle,
  rightTitle,
  leftItems,
  rightItems,
  leftStrengths = 2,
}: {
  leftTitle: string;
  rightTitle: string;
  leftItems: string[];
  rightItems: string[];
  leftStrengths?: number;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <MarketingCard className="p-6">
        <h3 className="mb-4 text-base font-semibold text-text-primary">{leftTitle}</h3>
        <ul className="space-y-3 text-sm leading-6 text-text-secondary">
          {leftItems.map((item, index) => (
            <li key={index} className="flex gap-3">
              {index < leftStrengths ? (
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-text-tertiary"
                  aria-hidden="true"
                />
              ) : (
                <XIcon className="mt-1 h-4 w-4 shrink-0 text-status-danger/70" aria-hidden="true" />
              )}
              <span className={cn(index < leftStrengths && "pl-1.5")}>{item}</span>
            </li>
          ))}
        </ul>
      </MarketingCard>
      <MarketingCard className="border-accent/25 bg-accent/5 p-6">
        <h3 className="mb-4 text-base font-semibold text-accent">{rightTitle}</h3>
        <ul className="space-y-3 text-sm leading-6 text-text-primary">
          {rightItems.map((item) => (
            <li key={item} className="flex gap-3">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </MarketingCard>
    </div>
  );
}

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border-gray bg-bg-surface px-3.5 text-sm font-medium text-text-secondary transition-all hover:border-accent/30 hover:bg-bg-elevated hover:text-text-primary focus-ring"
    >
      <ChevronLeft className="h-4 w-4 text-accent" aria-hidden="true" />
      {children}
    </Link>
  );
}

export function ComparisonDetail({
  eyebrow = "Comparison",
  title,
  description,
  competitorName,
  competitorItems,
  edpilotItems,
  competitorStrengths = 2,
  sections,
  scenarios,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  competitorName: string;
  competitorItems: string[];
  edpilotItems: string[];
  /** How many leading competitorItems are genuine strengths (rendered neutrally instead of with an X). */
  competitorStrengths?: number;
  sections: Array<{ title: string; body: ReactNode }>;
  scenarios?: AnswerScenario[];
}) {
  return (
    <PageShell>
      {/* Compare pages speak the same CTA grammar as the rest of the site:
          one primary pilot action, one quiet walkthrough alternative. The old
          "Request Demo" / "Get Started Free" pair was off-grammar (and "free"
          overstated the offer to a procurement reader). */}
      <Hero
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={[
          { label: "Plan a University Pilot", href: SIGN_UP_URL },
          {
            label: "Prefer a walkthrough first? Book a demo",
            href: "/contact",
            variant: "link",
          },
        ]}
        className="pb-14 md:pb-20"
      >
        <div className="mt-8 text-center">
          <BackLink href="/compare">Back to comparisons</BackLink>
        </div>
      </Hero>

      {scenarios && scenarios.length > 0 && (
        <Section className="py-16">
          <Container>
            <SectionHeader
              eyebrow="Real moments"
              title="Where the difference becomes obvious."
              description="The best comparison is not a feature checklist. It is what happens on a Tuesday night before an exam."
            />
            <BeforeAfterAnswerCards scenarios={scenarios} competitorName={competitorName} />
          </Container>
        </Section>
      )}

      <Section className="py-16" surface="panel">
        <Container>
          <ComparisonGrid
            leftTitle={competitorName}
            rightTitle="EdPilot"
            leftItems={competitorItems}
            rightItems={edpilotItems}
            leftStrengths={competitorStrengths}
          />
        </Container>
      </Section>

      {/* The closing argument reads as a numbered editorial sequence, not a
          stack of identical cards — this page is where a skeptical buyer
          decides, so it ends like an argument, not a brochure. */}
      <Section className="py-16 md:py-24">
        <Container size="narrow">
          <ol className="space-y-0">
            {sections.map((section, index) => (
              <li
                key={section.title}
                className="grid gap-4 border-t border-border-gray py-8 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[72px_minmax(0,1fr)] md:gap-6"
              >
                <span
                  aria-hidden="true"
                  className="text-text-faint font-display text-3xl font-semibold tabular-nums tracking-[-0.03em]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.02em] text-text-primary">
                    {section.title}
                  </h2>
                  <div className="mt-3 text-sm leading-7 text-text-secondary">{section.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CTABand
        title="Bring institutional control to AI-assisted learning."
        description="See how EdPilot grounds AI in your courses, your policies, and your faculty governance."
        actions={[{ label: "Plan a University Pilot", href: SIGN_UP_URL }]}
      />
    </PageShell>
  );
}

export function ProsePage({
  title,
  description,
  eyebrow,
  children,
}: {
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <PageShell>
      <Hero eyebrow={eyebrow} title={title} description={description} className="pb-12 md:pb-16" />
      <Section className="pb-20">
        <Container size="narrow">
          <div className="prose-marketing">{children}</div>
        </Container>
      </Section>
    </PageShell>
  );
}

/**
 * Accessible FAQ accordion built on native <details>/<summary>; keyboard and
 * screen-reader support come from the platform, works with JavaScript
 * disabled, and every answer stays in the server-rendered HTML for SEO.
 */
export function FAQList({
  items,
  className,
}: {
  items: Array<{ question: string; answer: ReactNode }>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "shadow-card divide-y divide-border-gray overflow-hidden rounded-xl border border-border-gray bg-bg-surface",
        className,
      )}
    >
      {items.map((item) => (
        <details key={item.question} className="group px-6 py-5">
          <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold leading-6 text-text-primary [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/5 text-accent transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            >
              <Plus className="h-3.5 w-3.5" />
            </span>
          </summary>
          <div className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
