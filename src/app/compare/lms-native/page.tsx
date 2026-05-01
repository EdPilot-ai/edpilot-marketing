import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/StructuredData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EdPilot vs. LMS-Native AI - Comparison',
  description:
    'EdPilot vs Canvas AI, Blackboard AI, and other LMS-native solutions. Compare vendor independence, customization, and institutional control.',
  keywords: 'EdPilot vs Canvas AI, EdPilot vs Blackboard, LMS integration, vendor independence',
}

export default function LMSNativePage() {
  const breadcrumbItems = [
    { name: 'EdPilot', url: 'https://edpilot.com' },
    { name: 'Compare', url: 'https://edpilot.com/compare' },
    { name: 'vs. LMS-Native AI', url: 'https://edpilot.com/compare/lms-native' },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <main id="main-content" className="min-h-screen bg-bg-page">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <Link href="/compare" className="text-accent font-medium hover:underline mb-4 inline-block">
            ← Back to Comparisons
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            EdPilot vs. LMS-Native AI
          </h1>
          <p className="text-lg text-text-secondary mb-12">
            LMS-native AI solutions are limited by vendor roadmap and design choices. EdPilot is
            vendor-independent and fully customizable to your institution&apos;s policies.
          </p>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-surface-secondary rounded-lg border border-surface-tertiary">
              <h3 className="font-bold text-text-primary mb-4">Canvas, Blackboard, etc.</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>✓ Integrated into existing system</li>
                <li>✓ Single login for students</li>
                <li>✗ Limited by vendor roadmap</li>
                <li>✗ Cannot customize to your policies</li>
                <li>✗ Vendor lock-in</li>
                <li>✗ One-size-fits-all design</li>
                <li>✗ Switching LMS means losing AI</li>
              </ul>
            </div>
            <div className="p-6 bg-accent bg-opacity-10 border border-accent rounded-lg">
              <h3 className="font-bold text-accent mb-4">EdPilot</h3>
              <ul className="space-y-2 text-sm text-accent">
                <li>✓ Works with any LMS</li>
                <li>✓ Fully customizable to your policies</li>
                <li>✓ Independent from LMS vendor roadmap</li>
                <li>✓ SSO and deep integration available</li>
                <li>✓ No vendor lock-in</li>
                <li>✓ Configurable to institutional needs</li>
                <li>✓ Survives LMS changes</li>
              </ul>
            </div>
          </div>

          {/* Key Differences */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Core Differences</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-accent pl-6">
                <h3 className="font-semibold text-text-primary mb-2">Vendor Roadmap</h3>
                <p className="text-text-secondary">
                  <strong>LMS-native:</strong> Limited to whatever the LMS vendor decides to build.
                  If Canvas decides not to support course grounding, you cannot add it.
                </p>
                <p className="text-text-secondary mt-2">
                  <strong>EdPilot:</strong> Your roadmap is customer-driven. Need specific
                  customizations? EdPilot can build them.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="font-semibold text-text-primary mb-2">Customization</h3>
                <p className="text-text-secondary">
                  <strong>LMS-native:</strong> Limited configuration options. Must accept whatever
                  behavior the vendor ships.
                </p>
                <p className="text-text-secondary mt-2">
                  <strong>EdPilot:</strong> Highly configurable. Want to require citations? Set
                  interaction limits? Restrict scope? All possible.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="font-semibold text-text-primary mb-2">Institutional Continuity</h3>
                <p className="text-text-secondary">
                  <strong>LMS-native:</strong> If you switch from Canvas to Blackboard, you lose
                  the AI. No data portability. Starting over.
                </p>
                <p className="text-text-secondary mt-2">
                  <strong>EdPilot:</strong> Works with any LMS. Switch LMS? EdPilot stays. Your
                  policies, configurations, and data continuity remain.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="font-semibold text-text-primary mb-2">Multi-Institutional Control</h3>
                <p className="text-text-secondary">
                  <strong>LMS-native:</strong> Each LMS instance is siloed. Difficult to implement
                  university-wide AI policy across multiple Canvas instances.
                </p>
                <p className="text-text-secondary mt-2">
                  <strong>EdPilot:</strong> Central governance across all LMS instances. Set
                  university policy; apply consistently everywhere.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="font-semibold text-text-primary mb-2">Advanced Features</h3>
                <p className="text-text-secondary">
                  <strong>LMS-native:</strong> Basic AI features only. No course grounding,
                  plagiarism detection, or audit trails in early versions.
                </p>
                <p className="text-text-secondary mt-2">
                  <strong>EdPilot:</strong> Full suite of institutional AI features built from day
                  one: course grounding, plagiarism detection, audit trails, instructor monitoring.
                </p>
              </div>
            </div>
          </section>

          {/* The Vendor Lock-In Trap */}
          <section className="mb-16 p-8 bg-surface-secondary rounded-lg border border-surface-tertiary">
            <h2 className="text-2xl font-bold text-text-primary mb-4">The Vendor Lock-In Trap</h2>
            <p className="text-text-secondary mb-4">
              Many institutions implement LMS-native AI because it seems convenient: &quot;Already built
              in, no new vendor to manage.&quot; But this creates a hidden cost:
            </p>
            <ul className="space-y-3 text-text-secondary text-sm list-disc list-inside mb-4">
              <li>You become dependent on the LMS vendor&apos;s AI roadmap</li>
              <li>Features and policies you need but LMS vendor doesn&apos;t prioritize? Stuck waiting.</li>
              <li>If you switch LMS platforms, you lose the AI and must start over</li>
              <li>Multi-institutional governance becomes fragmented</li>
              <li>Long-term cost often exceeds point-solutions</li>
            </ul>
            <p className="text-text-secondary">
              EdPilot avoids this by being LMS-agnostic. Use Canvas, Blackboard, Moodle, D2L,
              Desire2Learn, or any other system. EdPilot remains your source of truth for AI
              policy and behavior.
            </p>
          </section>

          {/* Integration Quality */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Integration Quality</h2>
            <div className="space-y-4 text-text-secondary">
              <p>
                <strong>LMS-native:</strong> Tight integration with one LMS, but that&apos;s the only
                place it works. No access outside the LMS.
              </p>
              <p>
                <strong>EdPilot:</strong> Deep integration available with any LMS (Canvas, Blackboard,
                D2L, Moodle, etc.). Accessible both inside and outside LMS. Consistent policies
                across all touchpoints.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="p-8 bg-accent bg-opacity-10 border border-accent rounded-lg">
            <h3 className="text-xl font-bold text-accent mb-3">Avoid vendor lock-in</h3>
            <p className="text-text-secondary mb-6">
              Choose an AI platform designed around your institution&apos;s needs, not your LMS
              vendor&apos;s product roadmap.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-opacity-90 transition-all"
            >
              Schedule Demo
            </Link>
          </section>
        </div>
      </main>
    </>
  )
}
