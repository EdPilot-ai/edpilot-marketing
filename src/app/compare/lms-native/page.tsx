import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { BreadcrumbSchema } from '@/components/StructuredData'
import {
  Container,
  Section,
  Hero,
  SectionHeader,
  CompareTable,
  CompareChecklist,
  CTASection,
} from '@/components/marketing'

export const metadata: Metadata = {
  title: 'EdPilot vs. LMS-native AI',
  description:
    'EdPilot is vendor-independent and fully customizable to your institution’s policies — where LMS-native AI is bound to the LMS vendor’s roadmap and design.',
}

const ROWS = [
  {
    criterion: 'Vendor roadmap',
    edpilot: 'Customer-driven. Need a customization? It can be built.',
    other: 'Limited to whatever the LMS vendor decides to ship.',
  },
  {
    criterion: 'Customization',
    edpilot: 'Highly configurable — citations, scope limits, interaction caps, and more.',
    other: 'Limited configuration. Accept whatever behavior the vendor ships.',
  },
  {
    criterion: 'Switching LMS',
    edpilot: 'EdPilot stays. Policies, configs, and data continuity remain.',
    other: 'Lose the AI. No portability. Start over.',
  },
  {
    criterion: 'Multi-LMS governance',
    edpilot: 'Central governance across every LMS instance.',
    other: 'Each LMS instance is siloed. Hard to apply policy globally.',
  },
  {
    criterion: 'Advanced features',
    edpilot:
      'Course grounding, citation enforcement, audit trails, instructor monitoring out of the box.',
    other: 'Basic AI features. Course grounding and audit trails often missing.',
  },
]

export default function LMSNativeComparePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'EdPilot', url: 'https://edpilot.com' },
          { name: 'Compare', url: 'https://edpilot.com/compare' },
          { name: 'vs. LMS-native AI', url: 'https://edpilot.com/compare/lms-native' },
        ]}
      />

      <Hero
        eyebrow="Compare"
        titleNode={
          <>
            <span className="text-text-primary">EdPilot vs. </span>
            <span className="text-accent">LMS-native AI.</span>
          </>
        }
        description="LMS-native AI is bound to the LMS vendor’s roadmap and design. EdPilot is vendor-independent and fully customizable to your institution’s policies."
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
              title="Canvas, Blackboard, etc."
              items={[
                { text: 'Integrated into existing system', positive: true },
                { text: 'Single login for students', positive: true },
                { text: 'Limited by vendor roadmap', positive: false },
                { text: 'Cannot customize to your policies', positive: false },
                { text: 'Vendor lock-in', positive: false },
                { text: 'Switching LMS means losing the AI', positive: false },
              ]}
            />
            <CompareChecklist
              variant="edpilot"
              title="EdPilot"
              items={[
                { text: 'Works with any LMS', positive: true },
                { text: 'Fully customizable to your policies', positive: true },
                { text: 'Independent of any LMS vendor', positive: true },
                { text: 'SSO and deep integration available', positive: true },
                { text: 'No vendor lock-in', positive: true },
                { text: 'Survives LMS changes', positive: true },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section surface="sunken" spacing="lg">
        <Container size="lg">
          <SectionHeader title="Detailed comparison." />
          <CompareTable otherLabel="LMS-native AI" rows={ROWS} />
        </Container>
      </Section>

      <Section spacing="lg">
        <Container size="md">
          <div className="rounded-2xl border border-border-gray bg-bg-surface p-8">
            <h3 className="text-lg font-semibold text-text-primary mb-3">The vendor lock-in trap</h3>
            <p className="text-text-secondary text-[14px] leading-relaxed mb-4">
              LMS-native AI feels convenient: nothing new to procure. The hidden cost is bigger.
            </p>
            <ul className="space-y-2.5 text-text-secondary text-[13px] leading-relaxed">
              <li>— You become dependent on the LMS vendor’s AI roadmap.</li>
              <li>— Policies you need but the vendor hasn’t prioritized? Stuck waiting.</li>
              <li>— Switching LMS platforms means losing the AI and starting over.</li>
              <li>— Multi-institutional governance becomes fragmented.</li>
            </ul>
          </div>
        </Container>
      </Section>

      <CTASection
        title="Avoid vendor lock-in."
        description="Choose an AI platform built around your institution’s needs — not your LMS vendor’s roadmap."
        primaryHref="/contact"
        primaryLabel="Schedule a demo"
        secondaryHref="/products/curriculum-intelligence"
        secondaryLabel="See the product"
      />
    </>
  )
}
