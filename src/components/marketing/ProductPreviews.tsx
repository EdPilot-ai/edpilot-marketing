import { ArrowUpRight, Check, FileText, Quote, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Small, in-code previews of the product surfaces.
 *
 * These replaced empty gradient blocks that were standing in for photography
 * that does not exist. A product site is better served by showing the product
 * than by a stock lecture-hall photo, and rendering them in code means they
 * inherit the theme: every colour below is a token, so the same component is
 * legible on the dark page and on the light band without a second variant.
 *
 * Everything shown is illustrative product UI, deliberately generic — no
 * institution names, no invented adoption metrics, nothing that reads as a real
 * customer's data.
 */

function Frame({
  children,
  aspect = "16/9",
  className,
}: {
  children: React.ReactNode;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      role="presentation"
      className={cn(
        "relative overflow-hidden rounded-xl border border-border-gray bg-bg-surface",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      <div className="absolute inset-0 flex flex-col p-3.5">{children}</div>
    </div>
  );
}

/** Window chrome: three dots and a title, so a preview reads as a screen. */
function Chrome({ title }: { title: string }) {
  return (
    <div className="mb-3 flex shrink-0 items-center gap-2">
      <span className="flex gap-1" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-text-faint/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-text-faint/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-text-faint/40" />
      </span>
      <span className="text-[10px] font-medium tracking-[0.02em] text-text-tertiary">{title}</span>
    </div>
  );
}

/** Administrators: rollout state across courses, the governance view. */
export function AdminPreview({ className }: { className?: string }) {
  const rows = [
    { course: "Statistics 101", state: "Live", tone: "live" as const },
    { course: "Organic Chemistry", state: "Live", tone: "live" as const },
    { course: "Intro to Economics", state: "In review", tone: "pending" as const },
  ];

  return (
    <Frame className={className}>
      <Chrome title="Campus rollout" />
      <div className="flex min-h-0 flex-1 flex-col gap-1.5">
        {rows.map((row) => (
          <div
            key={row.course}
            className="flex items-center justify-between gap-2 rounded-md border border-border-gray bg-bg-deep px-2.5 py-2"
          >
            <span className="truncate text-[11px] font-medium text-text-primary">{row.course}</span>
            <span
              className={cn(
                "shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em]",
                row.tone === "live"
                  ? "bg-accent/10 text-accent"
                  : "bg-text-faint/10 text-text-tertiary",
              )}
            >
              {row.state}
            </span>
          </div>
        ))}
        <div className="mt-auto flex items-center gap-2 pt-1">
          <ShieldCheck className="h-3 w-3 shrink-0 text-accent" aria-hidden="true" />
          <span className="text-[10px] text-text-tertiary">Faculty-governed · course-scoped</span>
        </div>
      </div>
    </Frame>
  );
}

/** Professors: where a class is getting stuck, before the exam says so. */
export function ProfessorPreview({ className }: { className?: string }) {
  const topics = [
    { topic: "Conditional probability", weight: 0.92 },
    { topic: "Bayes' theorem", weight: 0.64 },
    { topic: "Sampling bias", weight: 0.38 },
  ];

  return (
    <Frame className={className}>
      <Chrome title="Question patterns" />
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-2.5">
        {topics.map((item) => (
          <div key={item.topic} className="flex flex-col gap-1">
            <span className="truncate text-[10.5px] font-medium text-text-primary">
              {item.topic}
            </span>
            <span className="h-1 w-full overflow-hidden rounded-full bg-text-faint/15">
              <span
                className="block h-full rounded-full bg-accent/70"
                style={{ width: `${item.weight * 100}%` }}
              />
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex shrink-0 items-center gap-1.5 text-[10px] text-text-tertiary">
        <ArrowUpRight className="h-3 w-3 text-accent" aria-hidden="true" />
        Asked most this week
      </div>
    </Frame>
  );
}

/** Students: a grounded answer, with the citation that makes it checkable. */
export function StudentPreview({ className }: { className?: string }) {
  return (
    <Frame className={className}>
      <Chrome title="Course assistant" />
      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <p className="ml-auto max-w-[85%] rounded-lg rounded-br-sm bg-accent/10 px-2.5 py-1.5 text-[10.5px] leading-4 text-text-primary">
          Why divide by n−1 and not n?
        </p>
        <div className="max-w-[92%] rounded-lg rounded-bl-sm border border-border-gray bg-bg-deep px-2.5 py-2">
          <p className="text-[10.5px] leading-4 text-text-secondary">
            Because the sample mean is estimated from the same data, one degree of freedom is
            already spent.
          </p>
          <span className="mt-2 inline-flex items-center gap-1 rounded border border-accent/25 bg-accent/[0.07] px-1.5 py-0.5 text-[9px] font-medium text-accent">
            <FileText className="h-2.5 w-2.5" aria-hidden="true" />
            Lecture 4, p. 12
          </span>
        </div>
      </div>
    </Frame>
  );
}

/**
 * "The stakes": the same student question, answered twice — ungoverned versus
 * grounded in the course. It argues the section's point instead of decorating it.
 */
export function GovernanceContrastPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border-gray bg-bg-surface p-4 md:p-5",
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="rounded-lg border border-border-gray bg-bg-deep p-3.5">
          <div className="flex items-center gap-2">
            <Quote className="h-3 w-3 shrink-0 text-text-tertiary" aria-hidden="true" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-tertiary">
              A generic chatbot
            </span>
          </div>
          <p className="mt-2.5 text-[12px] leading-5 text-text-secondary">
            Answers from the open internet. No citation, no syllabus, no record the institution can
            review.
          </p>
        </div>

        <div className="rounded-lg border border-accent/25 bg-accent/[0.05] p-3.5">
          <div className="flex items-center gap-2">
            <Check className="h-3 w-3 shrink-0 text-accent" aria-hidden="true" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
              Inside EdPilot
            </span>
          </div>
          <p className="mt-2.5 text-[12px] leading-5 text-text-secondary">
            Answers from the professor&apos;s own materials, cited to the page, inside the
            guardrails the course set.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Cited", "Course-scoped", "Reviewable"].map((tag) => (
              <span
                key={tag}
                className="rounded border border-accent/25 bg-bg-surface px-1.5 py-0.5 text-[9px] font-medium text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
