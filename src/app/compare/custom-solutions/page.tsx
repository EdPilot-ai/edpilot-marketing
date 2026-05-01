import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/StructuredData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EdPilot vs. Custom In-House Solutions - Comparison',
  description:
    'EdPilot vs building your own AI infrastructure. Compare costs, time-to-market, expertise, and ongoing maintenance for university AI.',
  keywords: 'EdPilot vs custom AI, build vs buy, AI infrastructure costs, institutional AI',
}

export default function CustomSolutionsPage() {
  const breadcrumbItems = [
    { name: 'EdPilot', url: 'https://edpilot.com' },
    { name: 'Compare', url: 'https://edpilot.com/compare' },
    { name: 'vs. Custom Solutions', url: 'https://edpilot.com/compare/custom-solutions' },
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
            EdPilot vs. Custom In-House Solutions
          </h1>
          <p className="text-lg text-text-secondary mb-12">
            Building your own AI infrastructure sounds appealing but carries hidden costs in time,
            money, expertise, and ongoing maintenance.
          </p>

          {/* Quick Comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-surface-secondary rounded-lg border border-surface-tertiary">
              <h3 className="font-bold text-text-primary mb-4">Build Custom</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>✓ Complete control over design</li>
                <li>✓ Customized to your exact needs</li>
                <li>✗ 6-18 months to launch</li>
                <li>✗ $500k-$2M+ development cost</li>
                <li>✗ Requires specialized ML/AI team</li>
                <li>✗ Ongoing maintenance burden</li>
                <li>✗ Compliance and security on you</li>
              </ul>
            </div>
            <div className="p-6 bg-accent bg-opacity-10 border border-accent rounded-lg">
              <h3 className="font-bold text-accent mb-4">EdPilot</h3>
              <ul className="space-y-2 text-sm text-accent">
                <li>✓ 4-8 weeks to implementation</li>
                <li>✓ Institutional licensing model</li>
                <li>✓ No ML/AI team required</li>
                <li>✓ Continuous product improvements</li>
                <li>✓ FER PA, security, compliance built in</li>
                <li>✓ Ongoing support and training</li>
                <li>✓ Institutional partnerships advantage</li>
              </ul>
            </div>
          </div>

          {/* Cost Analysis */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Total Cost of Ownership</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-accent pl-6">
                <h3 className="font-semibold text-text-primary mb-3">Building Custom</h3>
                <div className="space-y-3 text-sm text-text-secondary">
                  <p>
                    <strong>Initial Development:</strong> $500k-$2M+ depending on complexity,
                    features, and team location
                  </p>
                  <p>
                    <strong>Timeline:</strong> 6-18 months before first users see it
                  </p>
                  <p>
                    <strong>Team:</strong> 3-8 engineers (ML specialists, backend, frontend, DevOps,
                    security)
                  </p>
                  <p>
                    <strong>Annual Maintenance:</strong> $300k-$800k for ongoing development, bug
                    fixes, model improvements
                  </p>
                  <p>
                    <strong>Infrastructure:</strong> $50k-$200k/year for hosting, model serving,
                    vector databases
                  </p>
                  <p>
                    <strong>Compliance & Security:</strong> $100k+ for initial audit, FERPA/HIPAA
                    implementation, ongoing compliance
                  </p>
                  <p>
                    <strong>5-Year Cost:</strong> $2.5M-$6M+ including team opportunity cost
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="font-semibold text-text-primary mb-3">EdPilot</h3>
                <div className="space-y-3 text-sm text-accent">
                  <p>
                    <strong>Implementation:</strong> $0 setup fee. Institutional licensing based on
                    student/faculty count
                  </p>
                  <p>
                    <strong>Timeline:</strong> 4-8 weeks to full implementation
                  </p>
                  <p>
                    <strong>Team Required:</strong> 1-2 admins to configure; no ML experts needed
                  </p>
                  <p>
                    <strong>Annual Cost:</strong> $50k-$300k depending on institution size
                  </p>
                  <p>
                    <strong>Included:</strong> Hosting, model improvements, compliance, support,
                    training
                  </p>
                  <p>
                    <strong>5-Year Cost:</strong> $250k-$1.5M all-inclusive
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Risk Analysis */}
          <section className="mb-16 p-8 bg-surface-secondary rounded-lg border border-surface-tertiary">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Hidden Risks of Building Custom</h2>
            <div className="space-y-4 text-text-secondary text-sm">
              <p>
                <strong>Timeline Overruns:</strong> ML projects commonly overrun by 50-100%. What
                seemed like an 8-month project becomes 18 months.
              </p>
              <p>
                <strong>Team Turnover:</strong> Specialized ML engineers are in high demand. If your
                lead engineer leaves mid-project, you&apos;re rebuilding expertise.
              </p>
              <p>
                <strong>Model Obsolescence:</strong> LLMs improve rapidly. A model you build in
                2025 might be outdated by 2026. Continuous retraining is expensive.
              </p>
              <p>
                <strong>Compliance Complexity:</strong> FERPA, GDPR, accessibility, plagiarism
                detection—each adds months to development. Missing one means legal liability.
              </p>
              <p>
                <strong>Scale Challenges:</strong> Works fine with 1,000 students; breaks at 10,000.
                Scaling infrastructure is non-trivial and expensive.
              </p>
              <p>
                <strong>Support Burden:</strong> You&apos;re the support team. Faculty issues, bugs,
                feature requests—all land on your team.
              </p>
            </div>
          </section>

          {/* When Custom Makes Sense */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6">When Custom Makes Sense</h2>
            <div className="space-y-4 text-text-secondary text-sm">
              <p>
                Building custom AI infrastructure makes sense only if:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Your requirements are so specialized that no vendor can meet them</li>
                <li>You have in-house ML expertise and capacity dedicated to this</li>
                <li>You have $2M+ and 2+ years to invest</li>
                <li>You&apos;re willing to accept security and compliance risk</li>
                <li>You have a dedicated team to maintain it indefinitely</li>
              </ul>
              <p className="mt-4">
                For most institutions, EdPilot&apos;s highly customizable platform meets specialized
                needs at a fraction of the cost and timeline.
              </p>
            </div>
          </section>

          {/* The Real Comparison */}
          <section className="mb-16 p-8 bg-accent bg-opacity-10 border border-accent rounded-lg">
            <h2 className="text-2xl font-bold text-accent mb-4">The Real Decision</h2>
            <p className="text-text-secondary mb-4">
              This isn&apos;t really &quot;build vs. buy.&quot; It&apos;s &quot;do you want to build and maintain AI
              infrastructure, or do you want to deploy AI-assisted teaching?&quot;
            </p>
            <p className="text-text-secondary">
              If your goal is improving education, EdPilot gets you there in weeks. If your goal
              is building AI infrastructure for its own sake, custom is an option—but be prepared
              for the cost and complexity.
            </p>
          </section>

          {/* CTA */}
          <section className="p-8 bg-surface-secondary border border-surface-tertiary rounded-lg">
            <h3 className="text-xl font-bold text-text-primary mb-3">
              See institutional AI done right
            </h3>
            <p className="text-text-secondary mb-6">
              Deploy AI teaching assistance in weeks, not months. No ML team required.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-opacity-90 transition-all"
            >
              Request Demo
            </Link>
          </section>
        </div>
      </main>
    </>
  )
}
