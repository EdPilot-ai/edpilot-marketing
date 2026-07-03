"use client";

import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * "What happens when a student asks" — the anatomy of one governed answer.
 *
 * This is the walkthrough that makes EdPilot's three pillars concrete instead
 * of abstract: faculty rules (governance), course sources (grounding), and
 * learning signals (visibility) are shown as stages of a single real answer,
 * with the matching region of the chat mockup highlighted at each step.
 *
 * Interaction is a simple click-through stepper: every stage's copy stays in
 * the DOM (collapsed stages keep their summary visible), highlighting is
 * purely visual, and the whole thing works with keyboard alone.
 */

const STAGES = [
  {
    id: "ask",
    icon: MessageSquare,
    label: "A student asks",
    tag: "Any hour",
    summary: "Plain-language questions, inside the course workspace.",
    detail:
      "It's 11pm before the quiz and office hours are long over. The student asks the way they'd ask a TA — no prompt engineering, no personal ChatGPT account, nothing leaving the course.",
  },
  {
    id: "rules",
    icon: ShieldCheck,
    label: "The professor's rules are applied",
    tag: "Governance",
    summary: "Faculty-set guardrails run before a single word is written.",
    detail:
      "The professor decided how this assistant behaves: guide on graded work instead of solving it, stay inside course scope, always cite. EdPilot enforces those rules on every reply — the AI works for the professor, not around them.",
  },
  {
    id: "sources",
    icon: BookOpenCheck,
    label: "The answer comes from course materials",
    tag: "Grounding",
    summary: "Built only from what the professor uploaded, with citations.",
    detail:
      "No web-scale guessing. The answer is assembled from this course's slides, readings, and handouts, and each claim links back to the exact source — so students can verify instead of trust.",
  },
  {
    id: "signal",
    icon: BarChart3,
    label: "The professor sees the pattern",
    tag: "Visibility",
    summary: "Every question becomes an early-warning learning signal.",
    detail:
      "Questions roll up into anonymous topic trends on the professor's dashboard. When 23 students hit the same wall in the same week, the professor finds out now — not from the exam grades.",
  },
] as const;

function Region({
  active,
  dimmed,
  className,
  children,
}: {
  active: boolean;
  dimmed: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border transition-all duration-300",
        active
          ? "border-accent/45 bg-accent/[0.07] shadow-[0_0_0_1px_rgba(139,92,246,0.25),0_8px_28px_-12px_rgba(139,92,246,0.35)]"
          : "border-border-gray",
        dimmed && "opacity-50",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function GovernedAnswerWalkthrough({ className }: { className?: string }) {
  const [stage, setStage] = useState(0);

  return (
    <div className={cn("grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]", className)}>
      {/* Stage selector — an accordion-style stepper. */}
      <ol className="flex flex-col gap-2.5">
        {STAGES.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === stage;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setStage(index)}
                aria-expanded={isActive}
                className={cn(
                  "focus-ring w-full rounded-xl border p-4 text-left transition-all duration-200 md:p-5",
                  isActive
                    ? "border-accent/30 bg-bg-surface shadow-lg"
                    : "border-border-gray bg-bg-deep hover:border-accent/25 hover:bg-bg-surface",
                )}
              >
                <span className="flex items-center gap-3.5">
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-sm font-bold transition-colors",
                      isActive
                        ? "border-accent/30 bg-accent text-white"
                        : "border-border-gray bg-bg-surface text-text-secondary",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span
                        className={cn(
                          "text-[15px] font-semibold leading-6",
                          isActive ? "text-text-primary" : "text-text-secondary",
                        )}
                      >
                        {item.label}
                      </span>
                      <span
                        className={cn(
                          "rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
                          isActive
                            ? "border-accent/25 bg-accent/10 text-accent-soft"
                            : "border-border-gray text-text-tertiary",
                        )}
                      >
                        {item.tag}
                      </span>
                    </span>
                    {!isActive && (
                      <span className="mt-0.5 block text-[13px] leading-5 text-text-tertiary">
                        {item.summary}
                      </span>
                    )}
                  </span>
                  <Icon
                    className={cn("h-4 w-4 shrink-0", isActive ? "text-accent" : "text-text-tertiary")}
                    aria-hidden="true"
                  />
                </span>
                <span
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300",
                    isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <span className="overflow-hidden">
                    <span className="mt-3 block border-t border-border-gray pt-3 text-sm leading-7 text-text-secondary">
                      {item.detail}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
        <li className="mt-1 hidden lg:block">
          <button
            type="button"
            onClick={() => setStage((s) => (s + 1) % STAGES.length)}
            className="focus-ring inline-flex items-center gap-2 rounded-lg border border-border-gray bg-bg-surface px-4 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-accent/30 hover:bg-bg-elevated"
          >
            {stage === STAGES.length - 1 ? "Start over" : "Next step"}
            <ArrowRight className="h-4 w-4 text-accent" aria-hidden="true" />
          </button>
        </li>
      </ol>

      {/* The governed answer, with the active stage's region highlighted. */}
      <div className="overflow-hidden rounded-2xl border border-border-gray bg-bg-deep shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-border-gray bg-bg-surface px-4 py-3">
          <div className="flex items-center gap-2 text-[11px] font-medium text-text-tertiary">
            <span className="rounded-md border border-border-gray bg-bg-deep px-2 py-1">CS 201</span>
            <span>Data Structures</span>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            11:04 PM · Tuesday
          </span>
        </div>
        <div className="space-y-3.5 p-4 md:p-5" aria-hidden="true">
          <Region active={stage === 0} dimmed={stage !== 0} className="ml-auto max-w-[85%] border-accent/20 bg-accent/5 px-4 py-3">
            <p className="text-sm leading-6 text-text-primary">
              When should I use recursion instead of a loop? I keep getting it wrong on the practice
              problems.
            </p>
          </Region>

          <Region active={stage === 1} dimmed={stage !== 1} className="bg-bg-surface/60 px-4 py-3">
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              Prof. Okafor&apos;s rules for this course
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {["Guide, don't solve graded work", "Course scope only", "Citations required"].map(
                (rule) => (
                  <span
                    key={rule}
                    className="rounded-md border border-border-gray bg-bg-deep px-2.5 py-1 text-[11px] font-medium text-text-secondary"
                  >
                    {rule}
                  </span>
                ),
              )}
            </div>
          </Region>

          <Region active={stage === 2} dimmed={stage !== 2} className="bg-bg-surface px-4 py-4">
            <p className="text-sm leading-7 text-text-secondary">
              Think about the shape of the problem. In Lecture 7, recursion is the tool when a
              problem contains smaller copies of itself — like traversing the tree from Lab 3. A
              loop fits when you&apos;re repeating the same flat step. Try re-doing practice problem 4:
              does the problem shrink toward a base case?
            </p>
            <div className="mt-3.5 grid gap-2 sm:grid-cols-2">
              {["Lecture 7 slides, 12–18", "Lab 3 handout, p. 2"].map((source, index) => (
                <span
                  key={source}
                  className="inline-flex max-w-full items-center gap-2 rounded-md border border-accent/15 bg-accent/5 px-2.5 py-1.5 text-[11px] font-medium text-accent"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-accent/15 bg-bg-deep text-[10px]">
                    {index + 1}
                  </span>
                  <span className="truncate">{source}</span>
                </span>
              ))}
            </div>
          </Region>

          <Region active={stage === 3} dimmed={stage !== 3} className="bg-bg-surface/60 px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  <BarChart3 className="h-3.5 w-3.5 text-accent" />
                  Learning signal → professor dashboard
                </p>
                <p className="mt-2 text-sm font-semibold text-text-primary">
                  23 students asked about recursion vs. iteration this week
                </p>
                <p className="mt-1 text-xs leading-5 text-text-secondary">
                  Anonymous topic trend, flagged before Thursday&apos;s quiz.
                </p>
              </div>
              <span className="mt-1 flex h-8 items-end gap-1" aria-hidden="true">
                {[10, 16, 24, 32].map((h, i) => (
                  <span
                    key={i}
                    className={cn("w-2 rounded-sm", i === 3 ? "bg-accent" : "bg-border-gray")}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </span>
            </div>
          </Region>
        </div>
      </div>
    </div>
  );
}
