import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/StructuredData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EdPilot vs. Tutoring Platforms - Comparison',
  description:
    'EdPilot vs homework tutoring platforms like Chegg and Tutor.com. Compare institutional oversight, academic integrity, and university integration.',
  keywords: 'EdPilot vs Chegg, EdPilot vs Tutor.com, institutional AI, academic integrity',
}

export default function TutoringPlatformsPage() {
  const breadcrumbItems = [
    { name: 'EdPilot', url: 'https://edpilot.com' },
    { name: 'Compare', url: 'https://edpilot.com/compare' },
    { name: 'vs. Tutoring Platforms', url: 'https://edpilot.com/compare/tutoring-platforms' },
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
            EdPilot vs. Tutoring Platforms
          </h1>
          <p className="text-lg text-text-secondary mb-12">
            Homework tutoring platforms are designed for student-directed use without institutional
            oversight. EdPilot is an institutional platform that keeps instructors and universities
            in control.
          </p>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-surface-secondary rounded-lg border border-surface-tertiary">
              <h3 className="font-bold text-text-primary mb-4">Chegg, Tutor.com, etc.</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>✓ One-on-one tutoring available</li>
                <li>✓ Broad subject coverage</li>
                <li>✗ No instructor oversight</li>
                <li>✗ Student-facing only</li>
                <li>✗ May encourage academic dishonesty</li>
                <li>✗ Not integrated with university systems</li>
                <li>✗ No FERPA compliance design</li>
              </ul>
            </div>
            <div className="p-6 bg-accent bg-opacity-10 border border-accent rounded-lg">
              <h3 className="font-bold text-accent mb-4">EdPilot</h3>
              <ul className="space-y-2 text-sm text-accent">
                <li>✓ Institutional platform with oversight</li>
                <li>✓ Instructor-controlled policies</li>
                <li>✓ Course-specific expertise</li>
                <li>✓ Integrated with university systems</li>
                <li>✓ Academic integrity enforced</li>
                <li>✓ FERPA-compliant infrastructure</li>
                <li>✓ Audit trails for accountability</li>
              </ul>
            </div>
          </div>

          {/* Key Differences */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Core Differences</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-accent pl-6">
                <h3 className="font-semibold text-text-primary mb-2">Oversight Model</h3>
                <p className="text-text-secondary">
                  <strong>Tutoring platforms:</strong> Student initiates service; instructor has no
                  visibility.
                </p>
                <p className="text-text-secondary mt-2">
                  <strong>EdPilot:</strong> Instructor sets policies; instructors see interaction
                  patterns and trends.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="font-semibold text-text-primary mb-2">Academic Integrity Risk</h3>
                <p className="text-text-secondary">
                  <strong>Tutoring platforms:</strong> Designed for individual help; may enable
                  homework completion without learning.
                </p>
                <p className="text-text-secondary mt-2">
                  <strong>EdPilot:</strong> Built-in safeguards prevent homework completion without
                  learning. Citation enforcement and scoping prevent misuse.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="font-semibold text-text-primary mb-2">Institutional Integration</h3>
                <p className="text-text-secondary">
                  <strong>Tutoring platforms:</strong> Consumer service; not integrated with
                  university systems.
                </p>
                <p className="text-text-secondary mt-2">
                  <strong>EdPilot:</strong> Native LMS integration, SSO, institutional data policies.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="font-semibold text-text-primary mb-2">Data Ownership</h3>
                <p className="text-text-secondary">
                  <strong>Tutoring platforms:</strong> Company owns interaction data and may use it
                  for product improvement.
                </p>
                <p className="text-text-secondary mt-2">
                  <strong>EdPilot:</strong> University owns all data. Never used for model training.
                  FERPA-compliant architecture.
                </p>
              </div>
            </div>
          </section>

          {/* Use Case Alignment */}
          <section className="mb-16 p-8 bg-surface-secondary rounded-lg border border-surface-tertiary">
            <h2 className="text-2xl font-bold text-text-primary mb-4">When Each Is Appropriate</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-text-primary mb-2">
                  Tutoring Platforms Work For:
                </h3>
                <ul className="space-y-2 text-text-secondary text-sm list-disc list-inside">
                  <li>Students seeking one-on-one help outside the classroom</li>
                  <li>Study sessions a student initiates on their own</li>
                  <li>Help with subjects outside the formal curriculum</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">EdPilot Works For:</h3>
                <ul className="space-y-2 text-text-secondary text-sm list-disc list-inside">
                  <li>In-class AI assistance with instructor oversight</li>
                  <li>Course-integrated homework help with safeguards</li>
                  <li>Scaling instruction in large-enrollment courses</li>
                  <li>Institutions implementing university-wide AI policies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="p-8 bg-accent bg-opacity-10 border border-accent rounded-lg">
            <h3 className="text-xl font-bold text-accent mb-3">Ready to upgrade to institutional AI?</h3>
            <p className="text-text-secondary mb-6">
              Learn how EdPilot brings institutional oversight, academic integrity, and
              instructor control to AI-assisted learning.
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
