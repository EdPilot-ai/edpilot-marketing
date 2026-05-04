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
  title: 'EdPilot vs. tutoring platforms',
  description:
    'EdPilot is an institutional platform with instructor oversight — where homework tutoring platforms like Chegg and Tutor.com are designed for student-directed use without faculty visibility.',
}

const ROWS = [
  {
    criterion: 'Oversight model',
    edpilot: 'Instructor sets policies; faculty see usage patterns and trends.',
    other: 'Student-initiated; instructors have no visibility.',
  },
  {
    criterion: 'Academic integrity',
    edpilot: 'Built-in safeguards prevent homework completion without learning.',
    other: 'Designed for individual help; can enable assignment completion.',
  },
  {
    criterion: 'Institutional integration',
    edpilot: 'LMS integration, SSO, institutional data policies.',
    other: 'Consumer service; not integrated with university systems.',
  },
  {
    criterion: 'Data ownership',
    edpilot: 'University owns all data. Never used to train external models.',
    other: 'Vendor owns interaction data and may use it for product improvement.',
  },
  {
    criterion: 'Course alignment',
    edpilot: 'Grounded in your professor’s materials, terminology, and rubrics.',
    other: 'Generic explanations. May contradict course conventions.',
  },
]

export default function TutoringComparePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'EdPilot', url: 'https://edpilot.com' },
          { name: 'Compare', url: 'https://edpilot.com/compare' },
          { name: 'vs. Tutoring Platforms', url: 'https://edpilot.com/compare/tutoring-platforms' },
        ]}
      />

      <Hero
        eyebrow="Compare"
        titleNode={
          <>
            <span className="text-text-primary">EdPilot vs. </span>
            <span className="text-accent">tutoring platforms.</span>
          </>
        }
        description="Homework tutoring platforms are designed for student-directed use without institutional oversight. EdPilot is an institutional platform that keeps instructors and universities in control."
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
              title="Chegg, Tutor.com, etc."
              items={[
                { text: 'On-demand tutoring available', positive: true },
                { text: 'Broad subject coverage', positive: true },
                { text: 'No instructor oversight', positive: false },
                { text: 'Student-facing only', positive: false },
                { text: 'May enable academic dishonesty', positive: false },
                { text: 'Not integrated with university systems', positive: false },
              ]}
            />
            <CompareChecklist
              variant="edpilot"
              title="EdPilot"
              items={[
                { text: 'Institutional platform with oversight', positive: true },
                { text: 'Instructor-controlled policies', positive: true },
                { text: 'Course-specific expertise and citations', positive: true },
                { text: 'Integrated with university systems', positive: true },
                { text: 'Academic integrity enforced', positive: true },
                { text: 'FERPA-aligned infrastructure', positive: true },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section surface="sunken" spacing="lg">
        <Container size="lg">
          <SectionHeader title="Detailed comparison." />
          <CompareTable otherLabel="Tutoring platforms" rows={ROWS} />
        </Container>
      </Section>

      <Section spacing="lg">
        <Container size="md">
          <SectionHeader title="When each makes sense." align="left" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border-gray bg-bg-surface p-6">
              <h3 className="text-[14px] font-semibold text-text-primary mb-3">Tutoring platforms</h3>
              <ul className="space-y-2 text-text-secondary text-[13px] leading-relaxed">
                <li>— One-on-one help outside the classroom</li>
                <li>— Self-initiated study sessions</li>
                <li>— Help with subjects outside the formal curriculum</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-accent/30 bg-accent/[0.06] p-6">
              <h3 className="text-[14px] font-semibold text-accent mb-3">EdPilot</h3>
              <ul className="space-y-2 text-text-secondary text-[13px] leading-relaxed">
                <li>— In-class AI assistance with instructor oversight</li>
                <li>— Course-integrated homework help with safeguards</li>
                <li>— Scaling instruction in large-enrollment courses</li>
                <li>— Institution-wide AI policy enforcement</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <CTASection
        title="Ready to upgrade to institutional AI?"
        description="See how EdPilot brings instructor oversight, academic integrity, and course-specific expertise to AI-assisted learning."
        primaryHref="/contact"
        primaryLabel="Schedule a demo"
      />
    </>
  )
}
