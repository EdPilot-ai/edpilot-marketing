import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/StructuredData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EdPilot Comparisons - How We Compare to Alternatives',
  description:
    'See how EdPilot compares to general AI tools, tutoring platforms, LMS-native solutions, and custom in-house implementations for higher education.',
  keywords:
    'EdPilot vs ChatGPT, instructor-controlled AI comparison, course-grounded AI, educational AI',
}

const comparisons = [
  {
    slug: 'chatgpt',
    title: 'EdPilot vs. ChatGPT for Education',
    subtitle: 'Purpose-built university AI vs. general-purpose conversational tool',
    description:
      'Understand how EdPilot is specifically designed for universities with instructor control, course grounding, and academic integrity safeguards.',
  },
  {
    slug: 'tutoring-platforms',
    title: 'EdPilot vs. Tutoring Platforms',
    subtitle: 'Institutional platform with oversight vs. student-directed services',
    description:
      'Compare EdPilot to homework tutoring services like Chegg and Tutor.com.',
  },
  {
    slug: 'lms-native',
    title: 'EdPilot vs. LMS-Native AI',
    subtitle: 'Vendor-independent solution vs. built-in LMS alternatives',
    description:
      'See how EdPilot compares to AI built into Canvas, Blackboard, and other learning management systems.',
  },
  {
    slug: 'custom-solutions',
    title: 'EdPilot vs. Custom In-House Solutions',
    subtitle: 'Institutional-grade platform vs. build-from-scratch approaches',
    description:
      'Compare the cost, time, and complexity of EdPilot versus building your own AI infrastructure.',
  },
]

export default function ComparePage() {
  const breadcrumbItems = [
    { name: 'EdPilot', url: 'https://edpilot.com' },
    { name: 'Compare', url: 'https://edpilot.com/compare' },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <main id="main-content" className="min-h-screen bg-bg-page">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
              How EdPilot Compares
            </h1>
            <p className="text-lg text-text-secondary">
              Transparent comparisons of EdPilot to other solutions in the market.
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {comparisons.map((comparison) => (
              <Link
                key={comparison.slug}
                href={`/compare/${comparison.slug}`}
                className="group block p-6 border border-surface-tertiary rounded-lg hover:border-accent hover:shadow-lg transition-all duration-200"
              >
                <h2 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                  {comparison.title}
                </h2>
                <p className="text-sm font-medium text-accent mb-3">{comparison.subtitle}</p>
                <p className="text-text-secondary">{comparison.description}</p>
                <div className="mt-4 flex items-center text-accent text-sm font-medium">
                  Read comparison
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Why These Comparisons */}
          <section className="mt-16 pt-12 border-t border-surface-tertiary">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              Why EdPilot is Different
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Purpose-Built for Universities</h3>
                <p className="text-text-secondary text-sm">
                  Not adapted from consumer tools. Designed specifically for accredited higher
                  education institutions with instructor control and pedagogical alignment.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Instructor Authority</h3>
                <p className="text-text-secondary text-sm">
                  Faculty set all policies. Students cannot override or jailbreak the system. This
                  is institutional control, not vendor control.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Course-Specific Grounding</h3>
                <p className="text-text-secondary text-sm">
                  AI responds only about course materials. Prevents hallucination and keeps learning
                  focused on what students should know.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Academic Integrity Built In</h3>
                <p className="text-text-secondary text-sm">
                  Plagiarism detection, citation enforcement, and transparency about AI use are
                  core features, not afterthoughts.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 p-8 bg-surface-secondary border border-surface-tertiary rounded-lg">
            <h3 className="text-xl font-bold text-text-primary mb-3">Ready to see EdPilot in action?</h3>
            <p className="text-text-secondary mb-6">
              Schedule a demo with one of our specialists to understand how EdPilot can transform
              teaching at your institution.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-opacity-90 transition-all"
            >
              Schedule a Demo
            </Link>
          </section>
        </div>
      </main>
    </>
  )
}
