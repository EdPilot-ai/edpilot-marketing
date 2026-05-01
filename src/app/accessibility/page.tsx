import Link from 'next/link'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility Statement | EdPilot',
  description:
    'EdPilot accessibility statement, conformance status, implemented features, known limitations, and how to report accessibility issues.',
}

// This page requires no authentication and is publicly accessible to all visitors.

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-bg-page">
      <div className="container mx-auto px-6 max-w-3xl pt-36 pb-20">

        {/* Page header */}
        <header>
          <h1 className="text-4xl font-bold text-text-primary mb-2">Accessibility Statement</h1>
          <p className="text-text-secondary text-sm mb-8">
            Last updated: <time dateTime="2026-03-23">March 23, 2026</time>
          </p>
        </header>

        <div className="space-y-10 text-text-secondary">

          {/* Commitment */}
          <section aria-labelledby="commitment-heading">
            <h2 id="commitment-heading" className="text-xl font-semibold text-text-primary mb-3">
              Our Commitment
            </h2>
            <p className="leading-relaxed">
              EdPilot is committed to ensuring its AI-powered education platform is accessible to
              all users, including individuals with disabilities. We design and build to conform to{' '}
              <strong className="text-text-primary">
                Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
              </strong>
              , as required under the{' '}
              <strong className="text-text-primary">
                Americans with Disabilities Act (ADA) Title II
              </strong>{' '}
              and the DOJ Title II Final Rule (April 2024), as well as applicable federal
              regulations (28 C.F.R. Part 35).
            </p>
          </section>

          {/* Conformance status */}
          <section aria-labelledby="conformance-heading">
            <h2 id="conformance-heading" className="text-xl font-semibold text-text-primary mb-3">
              Conformance Status
            </h2>
            <p className="leading-relaxed mb-4">
              EdPilot is{' '}
              <strong className="text-text-primary">substantially conformant</strong> with WCAG 2.1
              Level AA across all platform surfaces. The following accessibility features have been
              engineered, audited, and verified:
            </p>

            <h3 className="text-base font-semibold text-text-primary mb-2 mt-5">
              Navigation &amp; Focus
            </h3>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>Skip-to-main-content link on every page (WCAG 2.4.1)</li>
              <li>Full keyboard navigation throughout the application</li>
              <li>
                Visible focus indicators on all interactive elements using a{' '}
                <code className="text-accent">2px solid</code> accent-color ring (WCAG 2.4.7)
              </li>
              <li>
                View toggle buttons use{' '}
                <code className="text-accent">aria-pressed</code> and{' '}
                <code className="text-accent">aria-label</code> so keyboard and screen reader users
                know the active layout at all times
              </li>
              <li>
                Screen reader announcements for all client-side route changes via a live-region
                route announcer (WCAG 4.1.3)
              </li>
              <li>
                Session timeout warning dialog with focus management and{' '}
                <code className="text-accent">role=&quot;alertdialog&quot;</code> (WCAG 2.2.1)
              </li>
            </ul>

            <h3 className="text-base font-semibold text-text-primary mb-2 mt-5">
              Screen Reader &amp; ARIA Support
            </h3>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>
                All modal dialogs use{' '}
                <code className="text-accent">role=&quot;dialog&quot;</code>,{' '}
                <code className="text-accent">aria-modal=&quot;true&quot;</code>, and{' '}
                <code className="text-accent">aria-labelledby</code> wiring (WCAG 4.1.2). This
                includes the Exit Student View modal, Leave Class confirmation, Join Class modal,
                Create Course modal, and the general Confirm Dialog component.
              </li>
              <li>
                All modal dialogs implement a full{' '}
                <strong className="text-text-primary">keyboard focus trap</strong> — Tab and
                Shift+Tab cycle only within the open dialog, and pressing Escape dismisses it and
                returns focus to the triggering element (WCAG 2.1.2)
              </li>
              <li>
                All form inputs have programmatically associated{' '}
                <code className="text-accent">{'<label>'}</code> elements or{' '}
                <code className="text-accent">aria-label</code> attributes. Search inputs that are
                visually labelled by a placeholder also carry a screen-reader-only{' '}
                <code className="text-accent">{'<label>'}</code> element (WCAG 1.3.1)
              </li>
              <li>
                The AI chat message container uses{' '}
                <code className="text-accent">aria-live=&quot;polite&quot;</code> and{' '}
                <code className="text-accent">aria-relevant=&quot;additions&quot;</code> so new
                messages are announced to screen readers without interrupting ongoing speech
              </li>
              <li>
                AI streaming responses are announced with{' '}
                <code className="text-accent">aria-busy=&quot;true&quot;</code> during generation
                and a debounced &quot;Response complete&quot; status message on completion
                (WCAG 4.1.3)
              </li>
              <li>
                Loading skeleton states carry{' '}
                <code className="text-accent">role=&quot;status&quot;</code> and{' '}
                <code className="text-accent">aria-live=&quot;polite&quot;</code> so screen readers
                announce when content is loading (WCAG 4.1.3)
              </li>
              <li>
                Collapsible sections use{' '}
                <code className="text-accent">aria-expanded</code>,{' '}
                <code className="text-accent">aria-controls</code>, and{' '}
                <code className="text-accent">role=&quot;region&quot;</code> with{' '}
                <code className="text-accent">aria-labelledby</code>
              </li>
              <li>
                Tab panels use the full WAI-ARIA tabs pattern with roving{' '}
                <code className="text-accent">tabIndex</code> and arrow-key navigation
              </li>
              <li>
                All decorative icons are hidden from assistive technology with{' '}
                <code className="text-accent">aria-hidden=&quot;true&quot;</code>
              </li>
              <li>All informational images include meaningful alternative text (WCAG 1.1.1)</li>
              <li>
                Unsaved-data warning inside the Exit Student View modal uses{' '}
                <code className="text-accent">role=&quot;alert&quot;</code> so it is announced
                immediately if present (WCAG 4.1.3)
              </li>
            </ul>

            <h3 className="text-base font-semibold text-text-primary mb-2 mt-5">
              Data &amp; Visualizations
            </h3>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>
                The course leaderboard is rendered as a semantic{' '}
                <code className="text-accent">{'<table>'}</code> with{' '}
                <code className="text-accent">{'<th scope="col">'}</code>,{' '}
                <code className="text-accent">aria-sort</code> on sortable columns, and a
                screen-reader-only caption (WCAG 1.3.1)
              </li>
              <li>
                XP progress bars use{' '}
                <code className="text-accent">role=&quot;progressbar&quot;</code> with{' '}
                <code className="text-accent">aria-valuenow</code>,{' '}
                <code className="text-accent">aria-valuemin</code>,{' '}
                <code className="text-accent">aria-valuemax</code>, and a descriptive{' '}
                <code className="text-accent">aria-label</code> (WCAG 1.3.1)
              </li>
              <li>
                The Concept Difficulty analytics chart offers a &quot;View as table&quot; toggle,
                rendering a fully accessible{' '}
                <code className="text-accent">{'<table>'}</code> alternative to the bar chart
                (WCAG 1.3.1, 1.4.1)
              </li>
              <li>
                All status indicators (course signals, integrity alerts, material health) use text
                labels alongside colour, never colour alone (WCAG 1.4.1)
              </li>
            </ul>

            <h3 className="text-base font-semibold text-text-primary mb-2 mt-5">
              Color &amp; Contrast
            </h3>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>
                All body text meets WCAG 1.4.3 AA contrast ratios (minimum 4.5:1 against
                background surfaces)
              </li>
              <li>
                Secondary text set to{' '}
                <code className="text-accent">#9D9DA8</code> (~5.1:1) and muted-foreground
                lightness raised to 65% to satisfy AA requirements
              </li>
              <li>
                Input placeholder text raised to{' '}
                <code className="text-accent">placeholder-white/50</code> across all search and
                chat inputs (WCAG 1.4.3)
              </li>
              <li>
                High-contrast mode supported via{' '}
                <code className="text-accent">@media (prefers-contrast: more)</code>: all CSS
                custom properties override to near-black/pure-white, borders become fully opaque,
                focus rings increase to 3px, and semi-transparent surfaces are replaced with solid
                equivalents (WCAG 1.4.11)
              </li>
            </ul>

            <h3 className="text-base font-semibold text-text-primary mb-2 mt-5">
              Motion &amp; Animation
            </h3>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>
                All animations and transitions respect the{' '}
                <code className="text-accent">prefers-reduced-motion: reduce</code> media query —
                durations are collapsed to 0.01ms and custom keyframe animations are disabled
                (WCAG 2.3.3)
              </li>
              <li>
                Framer Motion reads the reduced-motion preference at runtime and disables
                physics-based animations accordingly
              </li>
            </ul>

            <h3 className="text-base font-semibold text-text-primary mb-2 mt-5">
              Course Material Accessibility (Faculty Tools)
            </h3>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>
                Server-side accessibility scanner runs automatically on every uploaded file —
                detecting image-only or scanned PDFs, PPTX slides with missing alt text, DOCX
                images without descriptions, and high-risk spreadsheet structures (WCAG 1.1.1,
                1.3.1)
              </li>
              <li>
                Structured remediation warnings are displayed to faculty immediately after upload,
                with specific guidance for each issue and a link to remediation tools
              </li>
              <li>
                Faculty see a pre-upload accessibility advisory checklist before submitting files,
                establishing expectations before content reaches students
              </li>
              <li>
                An accessibility acknowledgment step is integrated into the faculty onboarding flow
              </li>
              <li>
                A Materials Accessibility panel in the professor analytics dashboard tracks
                accessibility health across all uploaded course files, showing scan status, warning
                counts, and remediation progress
              </li>
            </ul>

            <h3 className="text-base font-semibold text-text-primary mb-2 mt-5">
              Automated Testing &amp; CI/CD
            </h3>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>
                Automated axe-core accessibility audit runs on every pull request via GitHub
                Actions, covering page stubs spanning public routes and authenticated dashboard
                pages (WCAG 2.1 AA + best-practice rules)
              </li>
              <li>
                Pa11y-CI is configured for scheduled scanning against staging deployments, testing
                all public-facing routes at WCAG 2.1 AA standard
              </li>
              <li>
                Type-checking, linting, and the a11y audit gate are all required to pass before
                code merges to main
              </li>
            </ul>
          </section>

          {/* Known limitations */}
          <section aria-labelledby="limitations-heading">
            <h2 id="limitations-heading" className="text-xl font-semibold text-text-primary mb-3">
              Known Limitations
            </h2>
            <p className="leading-relaxed mb-3">
              The following limitations remain and are on our active remediation roadmap:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>
                <strong className="text-text-primary">PDF tag structure and reading order</strong>{' '}
                — our server-side scanner detects image-only PDFs but cannot inspect internal PDF
                tag trees, reading order, or heading structure, which require PDF/UA tooling not
                available in a pure JavaScript environment. Faculty are advised to use Adobe
                Acrobat&apos;s accessibility checker before uploading.
              </li>
              <li>
                <strong className="text-text-primary">Third-party embedded content</strong> —
                externally hosted content (linked resources, embedded media) is outside our
                control and may not meet WCAG 2.1 AA. We recommend faculty verify accessibility of
                any external materials before sharing with students.
              </li>
              <li>
                <strong className="text-text-primary">
                  Complex analytics chart interactions
                </strong>{' '}
                — while all charts with bar-based visualizations offer a table-view alternative,
                some advanced analytics charts (trajectory graphs, timing heatmaps) do not yet
                have an equivalent data table. This is scheduled for a future release.
              </li>
              <li>
                <strong className="text-text-primary">
                  Content Security Policy inline-script directives
                </strong>{' '}
                — the current CSP includes{' '}
                <code className="text-accent">&apos;unsafe-inline&apos;</code> for scripts, which
                is required by the current build pipeline. Migration to a nonce-based CSP is
                planned to eliminate this exception.
              </li>
            </ul>
          </section>

          {/* Technical specs */}
          <section aria-labelledby="tech-heading">
            <h2 id="tech-heading" className="text-xl font-semibold text-text-primary mb-3">
              Technical Specifications
            </h2>
            <p className="leading-relaxed mb-3">
              EdPilot relies on the following technologies for conformance:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>HTML5 / WAI-ARIA 1.1</li>
              <li>
                CSS including{' '}
                <code className="text-accent">prefers-reduced-motion</code>,{' '}
                <code className="text-accent">prefers-contrast: more</code>, and{' '}
                <code className="text-accent">prefers-color-scheme</code> media queries
              </li>
              <li>JavaScript / React 19 / Next.js</li>
              <li>
                Radix UI primitives (Dialog, Tabs, Tooltip, DropdownMenu) with built-in ARIA
                patterns
              </li>
            </ul>
            <p className="leading-relaxed mt-4 mb-2">
              The platform is evaluated using the following tools and methods:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Automated axe-core static analysis (runs in CI on every pull request)</li>
              <li>Pa11y-CI WCAG 2.1 AA scan against staging deployments</li>
              <li>Manual keyboard navigation testing</li>
              <li>Screen reader testing (NVDA on Windows, VoiceOver on macOS/iOS)</li>
              <li>WCAG 2.1 AA manual checklist review</li>
              <li>Color contrast verified using APCA and WCAG 2.x contrast algorithms</li>
            </ul>
          </section>

          {/* Grievance mechanism */}
          <section
            aria-labelledby="grievance-heading"
            className="border border-accent/20 bg-accent/5 rounded-xl p-6"
          >
            <h2 id="grievance-heading" className="text-xl font-semibold text-text-primary mb-3">
              Feedback &amp; Grievance Process
            </h2>
            <p className="leading-relaxed mb-4">
              We welcome feedback on the accessibility of EdPilot. If you encounter barriers,
              experience difficulty using any feature with assistive technology, or have suggestions
              for improvement, please contact our Accessibility Coordinator:
            </p>

            <address className="not-italic space-y-2 mb-5">
              <p className="font-semibold text-text-primary">Accessibility Coordinator</p>
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:accessibility@empowered.ai"
                  className="text-accent hover:text-accent-hover underline underline-offset-2"
                >
                  accessibility@empowered.ai
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                <a
                  href="tel:+15551234567"
                  className="text-accent hover:text-accent-hover underline underline-offset-2"
                >
                  (555) 123-4567
                </a>
              </p>
              <p>
                <strong>Response time:</strong> We aim to respond within 2 business days and
                resolve accessibility issues within 10 business days.
              </p>
            </address>

            <p className="leading-relaxed mb-4">
              You may also submit a written grievance using our{' '}
              <Link
                href="/contact"
                className="text-accent hover:text-accent-hover underline underline-offset-2"
              >
                contact form
              </Link>
              . Please include:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Your name and contact information</li>
              <li>The URL or page where the issue occurs</li>
              <li>A description of the barrier you encountered</li>
              <li>The assistive technology and browser you were using (if applicable)</li>
            </ul>
          </section>

          {/* Formal complaint */}
          <section aria-labelledby="formal-heading">
            <h2 id="formal-heading" className="text-xl font-semibold text-text-primary mb-3">
              Formal Complaints
            </h2>
            <p className="leading-relaxed">
              If you are not satisfied with our response, you may contact the{' '}
              <strong className="text-text-primary">
                U.S. Department of Justice Civil Rights Division
              </strong>{' '}
              or file a complaint with the appropriate federal agency overseeing the program.
              Additional information is available at{' '}
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
          </section>

          {/* Compliance timeline */}
          <section aria-labelledby="timeline-heading">
            <h2 id="timeline-heading" className="text-xl font-semibold text-text-primary mb-3">
              Compliance Timeline
            </h2>
            <p className="leading-relaxed">
              Under the DOJ Title II final rule (April 2024), covered entities must conform to
              WCAG 2.1 Level AA. EdPilot has implemented a comprehensive, multi-phase
              accessibility program spanning structural ARIA compliance, color contrast
              remediation, semantic markup, high-contrast mode support, automated CI/CD gating, a
              faculty-facing materials accessibility pipeline, and full keyboard focus-trap
              management across all modal dialogs. We continue to monitor, test, and improve
              accessibility as an ongoing engineering priority.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  )
}
