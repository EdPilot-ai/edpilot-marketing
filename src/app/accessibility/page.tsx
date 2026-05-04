import Link from "next/link";
import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "EdPilot accessibility statement, conformance status, implemented features, known limitations, and how to report accessibility issues.",
};

function A11ySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-heading`} className="scroll-mt-20">
      <h2
        id={`${id}-heading`}
        className="text-xl font-semibold text-text-primary tracking-[-0.015em] mb-4"
      >
        {title}
      </h2>
      <div className="space-y-4 text-[14px] text-text-secondary leading-relaxed">{children}</div>
    </section>
  );
}

function A11yList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-1.5 text-[14px] text-text-secondary leading-relaxed list-disc list-inside marker:text-accent">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Accessibility Statement"
        meta={
          <>
            Last updated: <time dateTime="2026-03-23">March 23, 2026</time>
          </>
        }
      />

      <Container size="lg" className="py-14 space-y-12">
        <A11ySection id="commitment" title="Our commitment">
          <p>
            EdPilot is committed to ensuring its AI-powered education platform is accessible to all
            users, including individuals with disabilities. We design and build to conform to{" "}
            <strong className="text-text-primary">
              Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
            </strong>
            , as required under the{" "}
            <strong className="text-text-primary">
              Americans with Disabilities Act (ADA) Title II
            </strong>{" "}
            and the DOJ Title II Final Rule (April 2024), as well as applicable federal regulations
            (28 C.F.R. Part 35).
          </p>
        </A11ySection>

        <A11ySection id="conformance" title="Conformance status">
          <p>
            EdPilot is <strong className="text-text-primary">substantially conformant</strong> with
            WCAG 2.1 Level AA across all platform surfaces. The following accessibility features
            have been engineered, audited, and verified:
          </p>

          <h3 className="text-[14px] font-semibold text-text-primary mt-5 mb-2">
            Navigation & focus
          </h3>
          <A11yList
            items={[
              "Skip-to-main-content link on every page (WCAG 2.4.1)",
              "Full keyboard navigation throughout the application",
              "Visible focus indicators on all interactive elements (WCAG 2.4.7)",
              "Screen reader announcements for client-side route changes via a live-region announcer (WCAG 4.1.3)",
              'Session timeout warning dialog with focus management and role="alertdialog" (WCAG 2.2.1)',
            ]}
          />

          <h3 className="text-[14px] font-semibold text-text-primary mt-5 mb-2">
            Screen reader & ARIA support
          </h3>
          <A11yList
            items={[
              'Modal dialogs use role="dialog", aria-modal, and aria-labelledby (WCAG 4.1.2)',
              "Modal dialogs implement a full keyboard focus trap with Escape to dismiss (WCAG 2.1.2)",
              "Form inputs have programmatically associated <label> elements or aria-label (WCAG 1.3.1)",
              'AI chat container uses aria-live="polite" so new messages are announced',
              "Streaming responses use aria-busy during generation and announce completion (WCAG 4.1.3)",
              'Loading skeletons use role="status" and aria-live="polite" (WCAG 4.1.3)',
              "Collapsible sections use aria-expanded and aria-controls correctly",
              "Tab panels use the WAI-ARIA tabs pattern with arrow-key navigation",
              'Decorative icons hidden from assistive tech with aria-hidden="true"',
              "All informational images include meaningful alt text (WCAG 1.1.1)",
            ]}
          />

          <h3 className="text-[14px] font-semibold text-text-primary mt-5 mb-2">
            Data & visualizations
          </h3>
          <A11yList
            items={[
              "Course leaderboard rendered as a semantic <table> with aria-sort and an SR-only caption (WCAG 1.3.1)",
              'XP progress bars use role="progressbar" with aria-valuenow / min / max (WCAG 1.3.1)',
              'Charts offer "View as table" toggles for fully accessible alternatives (WCAG 1.3.1, 1.4.1)',
              "All status indicators use text alongside color, never color alone (WCAG 1.4.1)",
            ]}
          />

          <h3 className="text-[14px] font-semibold text-text-primary mt-5 mb-2">
            Color & contrast
          </h3>
          <A11yList
            items={[
              "All body text meets WCAG 1.4.3 AA contrast ratios (≥ 4.5:1)",
              "Secondary text raised to ~5.1:1 contrast for AA conformance",
              "Placeholder text raised across all search and chat inputs (WCAG 1.4.3)",
              "High-contrast mode supported via prefers-contrast: more (WCAG 1.4.11)",
            ]}
          />

          <h3 className="text-[14px] font-semibold text-text-primary mt-5 mb-2">
            Motion & animation
          </h3>
          <A11yList
            items={[
              "All animations and transitions respect prefers-reduced-motion: reduce (WCAG 2.3.3)",
              "Framer Motion reads the reduced-motion preference at runtime",
            ]}
          />

          <h3 className="text-[14px] font-semibold text-text-primary mt-5 mb-2">
            Course material accessibility (faculty tools)
          </h3>
          <A11yList
            items={[
              "Server-side accessibility scanner runs automatically on every uploaded file",
              "Structured remediation warnings are displayed to faculty immediately after upload",
              "Pre-upload accessibility advisory checklist before submission",
              "Materials Accessibility panel in the professor dashboard tracks scan health across files",
            ]}
          />

          <h3 className="text-[14px] font-semibold text-text-primary mt-5 mb-2">
            Automated testing & CI/CD
          </h3>
          <A11yList
            items={[
              "Automated axe-core audit runs on every PR via GitHub Actions",
              "Pa11y-CI configured for scheduled scanning against staging deployments at WCAG 2.1 AA",
              "Type-check, lint, and a11y audit gates are required before merge to main",
            ]}
          />
        </A11ySection>

        <A11ySection id="limitations" title="Known limitations">
          <p>The following limitations remain and are on our active remediation roadmap:</p>
          <A11yList
            items={[
              <>
                <strong className="text-text-primary">PDF tag structure and reading order</strong> —
                our scanner detects image-only PDFs but cannot inspect internal PDF tag trees.
                Faculty are advised to use Adobe Acrobat’s accessibility checker before uploading.
              </>,
              <>
                <strong className="text-text-primary">Third-party embedded content</strong> —
                externally hosted content is outside our control and may not meet WCAG 2.1 AA.
              </>,
              <>
                <strong className="text-text-primary">Complex analytics chart interactions</strong>{" "}
                — some advanced charts (trajectory graphs, timing heatmaps) do not yet have an
                equivalent data table.
              </>,
              <>
                <strong className="text-text-primary">Inline-script CSP directives</strong> — the
                current CSP includes <code className="text-accent">&apos;unsafe-inline&apos;</code>{" "}
                for scripts. Migration to nonce-based CSP is planned.
              </>,
            ]}
          />
        </A11ySection>

        <A11ySection id="tech" title="Technical specifications">
          <p>EdPilot relies on the following technologies for conformance:</p>
          <A11yList
            items={[
              "HTML5 / WAI-ARIA 1.1",
              "CSS prefers-reduced-motion, prefers-contrast, prefers-color-scheme media queries",
              "JavaScript / React 19 / Next.js",
              "Radix UI primitives (Dialog, Tabs, Tooltip) with built-in ARIA patterns",
            ]}
          />
          <p>The platform is evaluated using the following tools and methods:</p>
          <A11yList
            items={[
              "Automated axe-core static analysis (CI on every PR)",
              "Pa11y-CI WCAG 2.1 AA scan against staging",
              "Manual keyboard navigation testing",
              "Screen reader testing (NVDA on Windows, VoiceOver on macOS / iOS)",
              "WCAG 2.1 AA manual checklist review",
              "Color contrast verified using APCA and WCAG 2.x algorithms",
            ]}
          />
        </A11ySection>

        <section
          aria-labelledby="grievance-heading"
          className="rounded-2xl border border-accent/20 bg-accent/5 p-7"
        >
          <h2
            id="grievance-heading"
            className="text-xl font-semibold text-text-primary tracking-[-0.015em] mb-3"
          >
            Feedback & grievance process
          </h2>
          <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
            We welcome feedback on the accessibility of EdPilot. If you encounter barriers,
            experience difficulty using any feature with assistive technology, or have suggestions,
            please contact our Accessibility Coordinator:
          </p>

          <address className="not-italic text-[14px] text-text-secondary leading-relaxed space-y-1.5 mb-5">
            <p className="font-semibold text-text-primary">Accessibility Coordinator</p>
            <p>
              Email:{" "}
              <a
                href="mailto:accessibility@edpilot.ai"
                className="text-accent hover:text-accent-hover underline underline-offset-2"
              >
                accessibility@edpilot.ai
              </a>
            </p>
            <p>
              Response time: We aim to respond within 2 business days and resolve accessibility
              issues within 10 business days.
            </p>
          </address>

          <p className="text-[14px] text-text-secondary leading-relaxed mb-3">
            You may also submit a written grievance using our{" "}
            <Link
              href="/contact"
              className="text-accent hover:text-accent-hover underline underline-offset-2"
            >
              contact form
            </Link>
            . Please include:
          </p>
          <A11yList
            items={[
              "Your name and contact information",
              "The URL or page where the issue occurs",
              "A description of the barrier you encountered",
              "The assistive technology and browser you were using",
            ]}
          />
        </section>

        <A11ySection id="formal" title="Formal complaints">
          <p>
            If you are not satisfied with our response, you may contact the{" "}
            <strong className="text-text-primary">
              U.S. Department of Justice Civil Rights Division
            </strong>{" "}
            or file a complaint with the appropriate federal agency. More information at{" "}
            <a
              href="https://www.ada.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover underline underline-offset-2"
            >
              ada.gov
            </a>
            .
          </p>
        </A11ySection>

        <A11ySection id="timeline" title="Compliance timeline">
          <p>
            Under the DOJ Title II final rule (April 2024), covered entities must conform to WCAG
            2.1 Level AA. EdPilot has implemented a comprehensive, multi-phase accessibility program
            — structural ARIA, color contrast, semantic markup, high-contrast mode, automated CI/CD
            gating, faculty-facing materials accessibility pipeline, and full keyboard focus
            management across all dialogs. We continue to monitor, test, and improve accessibility
            as an ongoing engineering priority.
          </p>
        </A11ySection>
      </Container>
    </>
  );
}
