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
  title: 'EdPilot vs. ChatGPT',
  description:
    'EdPilot is purpose-built for university teaching with instructor control, course grounding, and academic integrity safeguards — where ChatGPT is a general-purpose tool.',
}

const ROWS = [
  {
    criterion: 'Instructor control',
    edpilot:
      'Full control over policies, scope, and student access. Faculty define the rules.',
    other:
      'No instructor control. Vendor sets policy. Same defaults for every user.',
  },
  {
    criterion: 'Course grounding',
    edpilot: 'Responses limited to your uploaded course materials. Citations included.',
    other: 'No course grounding. Responds about anything in training data.',
  },
  {
    criterion: 'Designed for education',
    edpilot: 'Purpose-built for university teaching and learning.',
    other: 'General-purpose tool designed for any user and any task.',
  },
  {
    criterion: 'Academic integrity',
    edpilot: 'Citation enforcement, scope guardrails, and review-ready audit trails.',
    other: 'No academic integrity protections. Easy to misuse.',
  },
  {
    criterion: 'FERPA compliance',
    edpilot: 'FERPA-aligned. Student data never trains public models.',
    other: 'Not designed for FERPA. Conversations may train future models.',
  },
  {
    criterion: 'LMS integration',
    edpilot: 'Direct upload now; Canvas, Blackboard, and Moodle integrations in progress.',
    other: 'Not designed for LMS integration. External workarounds required.',
  },
  {
    criterion: 'Institutional governance',
    edpilot: 'Data and control remain with the university at all times.',
    other: 'Data sent to vendor servers. University has no governance control.',
  },
  {
    criterion: 'Cost model',
    edpilot: 'Institutional licensing with volume pricing.',
    other: 'Per-user subscription or API consumption.',
  },
]

export default function ChatGPTComparePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'EdPilot', url: 'https://edpilot.com' },
          { name: 'Compare', url: 'https://edpilot.com/compare' },
          { name: 'vs. ChatGPT', url: 'https://edpilot.com/compare/chatgpt' },
        ]}
      />

      <Hero
        eyebrow="Compare"
        titleNode={
          <>
            <span className="text-text-primary">EdPilot vs. </span>
            <span className="text-accent">ChatGPT.</span>
          </>
        }
        description="ChatGPT is built for everyone. EdPilot is built for one thing — university teaching with instructor control, course grounding, and academic integrity safeguards."
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
              title="ChatGPT"
              items={[
                { text: 'Broad knowledge across domains', positive: true },
                { text: 'Conversational and natural', positive: true },
                { text: 'No instructor control', positive: false },
                { text: 'No course grounding', positive: false },
                { text: 'Plagiarism risk', positive: false },
                { text: 'No FERPA compliance', positive: false },
              ]}
            />
            <CompareChecklist
              variant="edpilot"
              title="EdPilot"
              items={[
                { text: 'Faculty-defined policies enforced', positive: true },
                { text: 'Course-grounded with citations', positive: true },
                { text: 'Academic integrity built in', positive: true },
                { text: 'FERPA-aligned data handling', positive: true },
                { text: 'Built for institutional governance', positive: true },
                { text: 'Purpose-built for higher education', positive: true },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section surface="sunken" spacing="lg">
        <Container size="lg">
          <SectionHeader title="Detailed comparison." />
          <CompareTable otherLabel="ChatGPT" rows={ROWS} />
        </Container>
      </Section>

      <Section spacing="lg">
        <Container size="md">
          <SectionHeader title="When each makes sense." align="left" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border-gray bg-bg-surface p-6">
              <h3 className="text-[14px] font-semibold text-text-primary mb-3">ChatGPT works for</h3>
              <ul className="space-y-2 text-text-secondary text-[13px] leading-relaxed">
                <li>— Individual exploratory learning outside formal courses</li>
                <li>— General research across diverse topics</li>
                <li>— Writing assistance for non-academic purposes</li>
                <li>— Quick information lookups</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-accent/30 bg-accent/[0.06] p-6">
              <h3 className="text-[14px] font-semibold text-accent mb-3">EdPilot works for</h3>
              <ul className="space-y-2 text-text-secondary text-[13px] leading-relaxed">
                <li>— In-class AI assistance with instructor oversight</li>
                <li>— Homework help that maintains academic integrity</li>
                <li>— Course-specific tutoring at scale</li>
                <li>— Large-enrollment courses needing scaled support</li>
                <li>— Institutions implementing AI literacy programs</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <CTASection
        title="See EdPilot in action."
        description="See how instructor control, course grounding, and academic integrity work together for your institution."
        primaryHref="/contact"
        primaryLabel="Request a demo"
        secondaryHref="/products/curriculum-intelligence"
        secondaryLabel="See the product"
      />
    </>
  )
}
