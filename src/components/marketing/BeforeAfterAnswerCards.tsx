import { Reveal } from "@/components/marketing/Reveal";
import { cn } from "@/lib/utils";

export type AnswerScenario = {
  /** The student/faculty moment, shown as the window title. */
  setup: string;
  /** What the generic chatbot does (muted + strikethrough panel). */
  oldWay: string;
  /** What EdPilot does instead. */
  edpilot: string;
  /** Course citations backing the EdPilot answer, rendered as chips. */
  citations?: string[];
};

/**
 * Before/after answer cards for the comparison "Real moments" block (T9):
 * each scenario renders in the CourseAssistantMockup window-chrome style,
 * with the generic chatbot outcome on the left (muted, struck through) and
 * the EdPilot outcome on the right with citation chips. The framing stays
 * honest — copy describes behavior, it does not fabricate literal answers.
 */
export function BeforeAfterAnswerCards({
  scenarios,
  competitorName = "Generic chatbot",
  className,
}: {
  scenarios: AnswerScenario[];
  competitorName?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-5", className)}>
      {scenarios.map((scenario, index) => (
        <Reveal key={scenario.setup} delay={index * 0.06}>
          <div className="showcase-surface overflow-hidden rounded-xl border border-border-gray bg-bg-deep">
            <div className="flex items-center gap-3 border-b border-border-gray bg-bg-surface px-4 py-3">
              <div className="flex shrink-0 items-center gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-window-close" />
                <span className="h-2.5 w-2.5 rounded-full bg-window-minimize" />
                <span className="h-2.5 w-2.5 rounded-full bg-window-maximize" />
              </div>
              <p className="truncate text-[13px] font-medium text-text-secondary">
                {scenario.setup}
              </p>
            </div>
            <div className="grid gap-3 p-4 md:grid-cols-2 md:p-5">
              <div className="rounded-lg border border-border-gray bg-bg-surface/60 p-4">
                <p className="section-kicker text-text-tertiary">{competitorName}</p>
                <p className="mt-2.5 text-[13px] leading-6 text-text-tertiary line-through decoration-status-danger/50 decoration-1">
                  {scenario.oldWay}
                </p>
              </div>
              <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
                <p className="section-kicker text-accent">EdPilot</p>
                <p className="mt-2.5 text-[13px] leading-6 text-text-primary">{scenario.edpilot}</p>
                {scenario.citations && scenario.citations.length > 0 && (
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {scenario.citations.map((source, sourceIndex) => (
                      <span
                        key={source}
                        className="inline-flex max-w-full items-center gap-2 rounded-md border border-accent/15 bg-accent/5 px-2.5 py-1.5 text-[11px] font-medium text-accent"
                      >
                        <span
                          className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-accent/15 bg-bg-deep text-[10px]"
                          aria-hidden="true"
                        >
                          {sourceIndex + 1}
                        </span>
                        <span className="truncate">{source}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
