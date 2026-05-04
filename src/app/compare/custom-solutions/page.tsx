import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { BreadcrumbSchema } from '@/components/StructuredData'
import {
  Container,
  Section,
  Hero,
  SectionHeader,
  CompareChecklist,
  CTASection,
} from '@/components/marketing'

export const metadata: Metadata = {
  title: 'EdPilot vs. custom in-house solutions',
  description:
    'Building your own AI infrastructure sounds appealing but carries hidden costs in time, money, expertise, and ongoing maintenance.',
}

const COSTS = {
  build: [
    { label: 'Initial development', value: '$500k–$2M+' },
    { label: 'Time to launch', value: '6–18 months' },
    { label: 'Team size', value: '3–8 engineers (ML, backend, security)' },
    { label: 'Annual maintenance', value: '$300k–$800k' },
    { label: 'Infrastructure', value: '$50k–$200k / year' },
    { label: 'Compliance & security', value: '$100k+ initial, ongoing' },
    { label: '5-year cost', value: '$2.5M–$6M+' },
  ],
  edpilot: [
    { label: 'Setup', value: '$0' },
    { label: 'Time to launch', value: '4–8 weeks' },
    { label: 'Team required', value: '1–2 admins; no ML experts needed' },
    { label: 'Annual cost', value: '$50k–$300k' },
    { label: 'Infrastructure', value: 'Included' },
    { label: 'Compliance & security', value: 'Included' },
    { label: '5-year cost', value: '$250k–$1.5M, all-inclusive' },
  ],
}

export default function CustomComparePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'EdPilot', url: 'https://edpilot.com' },
          { name: 'Compare', url: 'https://edpilot.com/compare' },
          { name: 'vs. Custom Solutions', url: 'https://edpilot.com/compare/custom-solutions' },
        ]}
      />

      <Hero
        eyebrow="Compare"
        titleNode={
          <>
            <span className="text-text-primary">EdPilot vs. </span>
            <span className="text-accent">building it yourself.</span>
          </>
        }
        description="Building your own AI infrastructure sounds appealing — until the bill, the timeline, and the maintenance burden show up."
      />

      <Container size="lg" className="-mt-8">
        <Link
          href="/compare"
          className="inline-flex items-center gap-1 text-text-secondary hover:text-accent text-[13px] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          All comparisons
        </Link>
      </Container>

      <Section spacing="lg">
        <Container size="lg">
          <SectionHeader title="At a glance." />
          <div className="grid gap-4 md:grid-cols-2">
            <CompareChecklist
              variant="other"
              title="Build custom"
              items={[
                { text: 'Complete control over design', positive: true },
                { text: 'Customized to your exact needs', positive: true },
                { text: '6–18 months to launch', positive: false },
                { text: '$500k–$2M+ development cost', positive: false },
                { text: 'Requires specialized ML/AI team', positive: false },
                { text: 'Ongoing maintenance burden on you', positive: false },
              ]}
            />
            <CompareChecklist
              variant="edpilot"
              title="EdPilot"
              items={[
                { text: '4–8 weeks to implementation', positive: true },
                { text: 'Institutional licensing model', positive: true },
                { text: 'No ML/AI team required', positive: true },
                { text: 'Continuous product improvements', positive: true },
                { text: 'FERPA, security, compliance built in', positive: true },
                { text: 'Ongoing support and training included', positive: true },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section surface="sunken" spacing="lg">
        <Container size="lg">
          <SectionHeader title="Total cost of ownership." />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border-gray bg-bg-surface overflow-hidden">
              <div className="border-b border-border-gray px-6 py-4 bg-[#0F0F12]">
                <h3 className="text-[14px] font-semibold text-text-primary">Build custom</h3>
              </div>
              <ul className="divide-y divide-border-gray">
                {COSTS.build.map((row) => (
                  <li key={row.label} className="flex items-baseline justify-between gap-4 px-6 py-3">
                    <span className="text-[12px] uppercase tracking-wider text-text-secondary">
                      {row.label}
                    </span>
                    <span className="text-[14px] font-medium text-text-primary text-right">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-accent/30 bg-accent/[0.04] overflow-hidden">
              <div className="border-b border-accent/20 px-6 py-4 bg-accent/[0.06]">
                <h3 className="text-[14px] font-semibold text-accent">EdPilot</h3>
              </div>
              <ul className="divide-y divide-accent/15">
                {COSTS.edpilot.map((row) => (
                  <li key={row.label} className="flex items-baseline justify-between gap-4 px-6 py-3">
                    <span className="text-[12px] uppercase tracking-wider text-text-secondary">
                      {row.label}
                    </span>
                    <span className="text-[14px] font-medium text-text-primary text-right">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container size="md">
          <SectionHeader title="Hidden risks of building custom." align="left" />
          <ul className="space-y-4 text-text-secondary text-[14px] leading-relaxed">
            <li>
              <span className="font-semibold text-text-primary">Timeline overruns.</span> ML projects
              commonly run 50–100% over plan. An 8-month project becomes 18.
            </li>
            <li>
              <span className="font-semibold text-text-primary">Team turnover.</span> Specialized ML
              engineers are in high demand. If your lead leaves mid-project, you’re rebuilding
              expertise.
            </li>
            <li>
              <span className="font-semibold text-text-primary">Model obsolescence.</span> LLMs
              improve fast. A model you ship in 2025 may be outdated by 2026. Continuous retraining
              is expensive.
            </li>
            <li>
              <span className="font-semibold text-text-primary">Compliance complexity.</span> FERPA,
              GDPR, accessibility — each adds months. Missing any one means legal exposure.
            </li>
            <li>
              <span className="font-semibold text-text-primary">Support burden.</span> You become the
              support team. Faculty issues, bugs, feature requests all land on you.
            </li>
          </ul>
        </Container>
      </Section>

      <CTASection
        title="Deploy AI teaching assistance in weeks, not years."
        description="Same level of control. None of the build cost. None of the maintenance burden."
        primaryHref="/contact"
        primaryLabel="Request a demo"
        secondaryHref="/products/curriculum-intelligence"
        secondaryLabel="See the product"
      />
    </>
  )
}
