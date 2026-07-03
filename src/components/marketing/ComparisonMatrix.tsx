"use client";

import { Fragment, useState } from "react";
import { Check, ChevronDown, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Interactive decision matrix for /compare.
 *
 * One data source renders two layouts: a full five-column table on desktop
 * (every capability expandable to a "why it matters" note plus per-column
 * detail) and an EdPilot-vs-one-alternative card view on mobile, where the
 * alternative is chosen with a segmented control. Status is never conveyed
 * by color alone — each cell pairs a distinct icon shape with sr-only text.
 */

type Status = "yes" | "partial" | "no";

type Row = {
  capability: string;
  why: string;
  cells: Record<string, { status: Status; note: string }>;
};

const ALTERNATIVES = [
  { id: "chatgpt", label: "ChatGPT" },
  { id: "tutoring", label: "Tutoring apps" },
  { id: "lms", label: "LMS-native AI" },
  { id: "custom", label: "DIY build" },
] as const;

const COLUMNS = [{ id: "edpilot", label: "EdPilot" }, ...ALTERNATIVES];

const GROUPS: Array<{ title: string; rows: Row[] }> = [
  {
    title: "What students experience",
    rows: [
      {
        capability: "Answers grounded in the actual course",
        why: "A confident answer that contradicts the professor is worse than no answer. Grounding means the AI's entire world is what the professor uploaded.",
        cells: {
          edpilot: {
            status: "yes",
            note: "Reads only the materials this professor uploaded or synced.",
          },
          chatgpt: { status: "no", note: "Open-internet knowledge; has never seen your syllabus." },
          tutoring: {
            status: "partial",
            note: "Knows the subject, not your course's framing or notation.",
          },
          lms: { status: "partial", note: "Depends on what the vendor indexes, and how well." },
          custom: { status: "partial", note: "Only if you build and maintain retrieval yourself." },
        },
      },
      {
        capability: "Citations on every answer",
        why: "Citations turn 'trust me' into 'check for yourself' — the difference between a study tool and a rumor mill.",
        cells: {
          edpilot: {
            status: "yes",
            note: "Every claim links to the exact slide, page, or handout.",
          },
          chatgpt: {
            status: "no",
            note: "Invents or omits sources; verification is on the student.",
          },
          tutoring: { status: "no", note: "The tutor's word is the source." },
          lms: { status: "partial", note: "Varies by vendor and content type." },
          custom: { status: "partial", note: "Possible — you own the citation pipeline forever." },
        },
      },
      {
        capability: "Guides on graded work instead of completing it",
        why: "The moment AI will write the submission, help becomes outsourcing. Integrity has to be enforced by the tool, not requested of it.",
        cells: {
          edpilot: {
            status: "yes",
            note: "Integrity mode gives hints and questions, never the finished work.",
          },
          chatgpt: { status: "no", note: "Will happily produce the entire assignment." },
          tutoring: { status: "partial", note: "Depends entirely on the individual tutor." },
          lms: { status: "partial", note: "Blunt on/off toggles at best." },
          custom: { status: "partial", note: "You design — and police — the policy yourself." },
        },
      },
    ],
  },
  {
    title: "What faculty control",
    rows: [
      {
        capability: "Per-course guardrails set by the professor",
        why: "A chemistry lab and a philosophy seminar need different AI behavior. Control has to live with the person who owns the course.",
        cells: {
          edpilot: {
            status: "yes",
            note: "Knowledge boundary, tone, citation policy, and assessment rules per course.",
          },
          chatgpt: { status: "no", note: "Per-student consumer accounts; faculty have no say." },
          tutoring: { status: "no", note: "Support happens off-campus, outside faculty reach." },
          lms: {
            status: "partial",
            note: "Admin-level settings, rarely per course or per professor.",
          },
          custom: {
            status: "partial",
            note: "Every control is another feature request to your dev team.",
          },
        },
      },
      {
        capability: "Visibility into where students struggle",
        why: "The most valuable output isn't the answer — it's knowing that 23 students hit the same wall before the exam does.",
        cells: {
          edpilot: {
            status: "yes",
            note: "Anonymous topic trends and misconception flags on the professor dashboard.",
          },
          chatgpt: { status: "no", note: "Zero signal back to faculty. Ever." },
          tutoring: {
            status: "no",
            note: "Per-student progress reports, disconnected from your course.",
          },
          lms: { status: "partial", note: "Clickstream analytics, not conceptual gaps." },
          custom: { status: "partial", note: "Another dashboard you have to design and build." },
        },
      },
      {
        capability: "Follows the course when it changes",
        why: "Courses are living things — a new rubric or reordered week should change what the AI says the same day.",
        cells: {
          edpilot: {
            status: "yes",
            note: "Re-upload or re-sync and every answer reflects the change.",
          },
          chatgpt: { status: "no", note: "Never knew the course in the first place." },
          tutoring: {
            status: "no",
            note: "Tutors learn about changes when students mention them.",
          },
          lms: { status: "partial", note: "Re-indexing cadence is the vendor's call." },
          custom: { status: "partial", note: "Manual re-indexing and upkeep, forever." },
        },
      },
    ],
  },
  {
    title: "What institutions need",
    rows: [
      {
        capability: "Institution-bound data with a FERPA posture",
        why: "Student questions are education records. Where they go, who sees them, and what trains on them is a compliance question, not a preference.",
        cells: {
          edpilot: {
            status: "yes",
            note: "Scoped to your institution and course; never trains public models.",
          },
          chatgpt: { status: "no", note: "Personal accounts under consumer terms." },
          tutoring: {
            status: "partial",
            note: "Third-party terms, negotiated student by student.",
          },
          lms: { status: "yes", note: "Inside your existing vendor contract." },
          custom: { status: "partial", note: "Your compliance burden, end to end." },
        },
      },
      {
        capability: "Live this week, without an IT project",
        why: "Pilots that need a semester of integration don't happen. Adoption speed decides whether governance arrives before habits form.",
        cells: {
          edpilot: {
            status: "yes",
            note: "Browser-based. Admin sign-up to teaching faculty in days.",
          },
          chatgpt: { status: "yes", note: "Nothing to deploy — and nothing governed." },
          tutoring: { status: "yes", note: "Students sign up alone, which is the problem." },
          lms: { status: "no", note: "Procurement, then the vendor's rollout schedule." },
          custom: { status: "no", note: "Quarters of engineering before day one." },
        },
      },
      {
        capability: "Independent of your LMS vendor",
        why: "Your AI strategy shouldn't wait politely for one vendor's roadmap — or be repriced at their next contract renewal.",
        cells: {
          edpilot: { status: "yes", note: "Syncs with Canvas today; works with no LMS at all." },
          chatgpt: { status: "yes", note: "Independent, but also unaccountable." },
          tutoring: { status: "yes", note: "Independent of the LMS and of the institution." },
          lms: { status: "no", note: "Locked to one vendor's roadmap and pricing." },
          custom: { status: "yes", note: "Independent — and entirely yours to maintain." },
        },
      },
    ],
  },
];

const STATUS_META: Record<Status, { label: string; className: string; chip: string }> = {
  yes: {
    label: "Built in",
    className: "text-status-success",
    chip: "border-status-success/25 bg-status-success/10",
  },
  partial: {
    label: "Partial / varies",
    className: "text-status-warning",
    chip: "border-status-warning/25 bg-status-warning/10",
  },
  no: {
    label: "Not available",
    className: "text-text-tertiary",
    chip: "border-border-gray bg-bg-deep",
  },
};

function StatusIcon({ status, showLabel = false }: { status: Status; showLabel?: boolean }) {
  const meta = STATUS_META[status];
  const Icon = status === "yes" ? Check : status === "partial" ? Minus : X;
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full border",
          meta.chip,
          meta.className,
        )}
      >
        <Icon className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={3} />
      </span>
      <span className={cn(!showLabel && "sr-only", "text-xs font-medium text-text-secondary")}>
        {meta.label}
      </span>
    </span>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {(Object.keys(STATUS_META) as Status[]).map((status) => (
        <StatusIcon key={status} status={status} showLabel />
      ))}
      <span className="text-xs text-text-tertiary">Click any row for the full story.</span>
    </div>
  );
}

export function ComparisonMatrix({ className }: { className?: string }) {
  const [expanded, setExpanded] = useState<string | null>(GROUPS[0].rows[0].capability);
  const [alternative, setAlternative] = useState<(typeof ALTERNATIVES)[number]["id"]>("chatgpt");

  const toggle = (capability: string) =>
    setExpanded((current) => (current === capability ? null : capability));

  return (
    <div className={className}>
      <div className="mb-5">
        <Legend />
      </div>

      {/* Mobile: EdPilot vs one alternative, chosen with a segmented control. */}
      <div className="md:hidden">
        <div
          className="mb-4 grid grid-cols-2 gap-1.5 rounded-xl border border-border-gray bg-bg-deep p-1.5"
          role="group"
          aria-label="Choose an alternative to compare against EdPilot"
        >
          {ALTERNATIVES.map((alt) => (
            <button
              key={alt.id}
              type="button"
              onClick={() => setAlternative(alt.id)}
              aria-pressed={alternative === alt.id}
              className={cn(
                "focus-ring min-h-10 rounded-lg px-2 text-[13px] font-semibold transition-colors",
                alternative === alt.id
                  ? "bg-accent text-white"
                  : "text-text-secondary hover:bg-bg-surface hover:text-text-primary",
              )}
            >
              {alt.label}
            </button>
          ))}
        </div>
        <div className="space-y-6">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                {group.title}
              </p>
              <div className="shadow-card divide-y divide-border-gray overflow-hidden rounded-xl border border-border-gray bg-bg-surface">
                {group.rows.map((row) => {
                  const isOpen = expanded === row.capability;
                  return (
                    <div key={row.capability}>
                      <button
                        type="button"
                        onClick={() => toggle(row.capability)}
                        aria-expanded={isOpen}
                        className="focus-ring flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                      >
                        <span className="text-sm font-semibold leading-5 text-text-primary">
                          {row.capability}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-200",
                            isOpen && "rotate-180",
                          )}
                          aria-hidden="true"
                        />
                      </button>
                      <div className="grid grid-cols-2 gap-2 px-4 pb-4">
                        <div className="rounded-lg border border-accent/20 bg-accent/5 p-3">
                          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                            EdPilot
                          </p>
                          <StatusIcon status={row.cells.edpilot.status} />
                          {isOpen && (
                            <p className="mt-2 text-xs leading-5 text-text-secondary">
                              {row.cells.edpilot.note}
                            </p>
                          )}
                        </div>
                        <div className="rounded-lg border border-border-gray bg-bg-deep p-3">
                          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
                            {ALTERNATIVES.find((a) => a.id === alternative)?.label}
                          </p>
                          <StatusIcon status={row.cells[alternative].status} />
                          {isOpen && (
                            <p className="mt-2 text-xs leading-5 text-text-secondary">
                              {row.cells[alternative].note}
                            </p>
                          )}
                        </div>
                        {isOpen && (
                          <p className="col-span-2 rounded-lg border border-border-gray bg-bg-deep p-3 text-xs leading-5 text-text-secondary">
                            <span className="font-semibold text-text-primary">
                              Why it matters:{" "}
                            </span>
                            {row.why}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: the full matrix. */}
      <div className="shadow-card hidden overflow-hidden rounded-xl border border-border-gray bg-bg-surface md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border-gray bg-bg-deep">
              <th scope="col" className="w-[34%] px-5 py-4 text-sm font-semibold text-text-primary">
                Capability
              </th>
              {COLUMNS.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className={cn(
                    "px-3 py-4 text-center text-[13px] font-semibold",
                    column.id === "edpilot"
                      ? "bg-accent/[0.08] text-accent-soft"
                      : "text-text-secondary",
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          {GROUPS.map((group) => (
            <tbody key={group.title}>
              <tr className="border-b border-border-gray">
                <th
                  colSpan={COLUMNS.length + 1}
                  scope="colgroup"
                  className="bg-bg-deep/60 px-5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary"
                >
                  {group.title}
                </th>
              </tr>
              {group.rows.map((row) => {
                const isOpen = expanded === row.capability;
                const detailId = `matrix-${row.capability.replace(/\W+/g, "-").toLowerCase()}`;
                return (
                  <Fragment key={row.capability}>
                    <tr
                      className={cn(
                        "border-b border-border-gray transition-colors",
                        !isOpen && "hover:bg-bg-elevated/40",
                      )}
                    >
                      <th scope="row" className="px-0 py-0 text-left font-normal">
                        <button
                          type="button"
                          onClick={() => toggle(row.capability)}
                          aria-expanded={isOpen}
                          aria-controls={detailId}
                          className="focus-ring flex w-full items-center gap-2.5 px-5 py-4 text-left"
                        >
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-200",
                              isOpen && "rotate-180 text-accent",
                            )}
                            aria-hidden="true"
                          />
                          <span className="text-sm font-semibold leading-5 text-text-primary">
                            {row.capability}
                          </span>
                        </button>
                      </th>
                      {COLUMNS.map((column) => (
                        <td
                          key={column.id}
                          className={cn(
                            "px-3 py-4 text-center",
                            column.id === "edpilot" && "bg-accent/[0.05]",
                          )}
                        >
                          <StatusIcon status={row.cells[column.id].status} />
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border-gray">
                      <td colSpan={COLUMNS.length + 1} className="p-0">
                        <div
                          id={detailId}
                          className={cn(
                            "grid transition-[grid-template-rows] duration-300",
                            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                          )}
                        >
                          <div className="overflow-hidden">
                            <div className="bg-bg-deep/70 px-5 py-5">
                              <p className="max-w-3xl text-sm leading-6 text-text-secondary">
                                <span className="font-semibold text-text-primary">
                                  Why it matters:{" "}
                                </span>
                                {row.why}
                              </p>
                              <div className="mt-4 grid gap-2 lg:grid-cols-5">
                                {COLUMNS.map((column) => (
                                  <div
                                    key={column.id}
                                    className={cn(
                                      "rounded-lg border p-3",
                                      column.id === "edpilot"
                                        ? "border-accent/25 bg-accent/[0.06]"
                                        : "border-border-gray bg-bg-surface/60",
                                    )}
                                  >
                                    <p
                                      className={cn(
                                        "mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
                                        column.id === "edpilot"
                                          ? "text-accent"
                                          : "text-text-tertiary",
                                      )}
                                    >
                                      {column.label}
                                    </p>
                                    <p className="text-xs leading-5 text-text-secondary">
                                      {row.cells[column.id].note}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
