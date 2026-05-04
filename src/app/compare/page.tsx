import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { BreadcrumbSchema } from '@/components/StructuredData'
import {
  Container,
  Section,
  Hero,
  SectionHeader,
  CTASection,
} from '@/components/marketing'

export const metadata: Metadata = {
  title: 'Compare',
  description:
    'See how EdPilot compares to general AI tools, tutoring platforms, LMS-native solutions, and custom in-house implementations for higher education.',
}

const COMPARISONS = [
  {
    slug: 'chatgpt',
    title: 'EdPilot vs. ChatGPT',
    subtitle: 'Purpose-built university AI vs. general-purpose conversational tool',
    description:
      'See how EdPilot is purpose-built for higher education with instructor control, course grounding, and academic integrity safeguards.',
  },
  {
    slug: 'tutoring-platforms',
    title: 'EdPilot vs. tutoring platforms',
    subtitle: 'Institutional platform with oversight vs. student-directed services',
    description:
      'Compare EdPilot to homework tutoring services like Chegg and Tutor.com.',
  },
  {
    slug: 'lms-native',
    title: 'EdPilot vs. LMS-native AI',
    subtitle: 'Vendor-independent solution vs. built-in LMS alternatives',
    description:
      'See how EdPilot compares to AI built into Canvas, Blackboard, and other learning management systems.',
  },
  {
    slug: 'custom-solutions',
    title: 'EdPilot vs. custom in-house',
    subtitle: 'Institutional-grade platform vs. build-from-scratch approaches',
    description:
      'Compare the cost, time, and complexity of EdPilot versus building your own AI infrastructure.',
  },
]

const DIFFERENTIATORS = [
  {
    title: 'Purpose-built for universities',
    description:
      'Not adapted from consumer tools. Designed for higher education institutions with instructor control and pedagogical alignment.',
  },
  {
    title: 'Instructor authority',
    description:
      'Faculty set all policies. Students cannot override or jailbreak the system. Institutional control, not vendor control.',
  },
  {
    title: 'Course-specific grounding',
    description:
      'AI responds only about course materials. Prevents hallucination and keeps learning focused on what students need to know.',
  },
  {
    title: 'Academic integrity built in',
    description:
      'Citation enforcement, scope guardrails, and full audit trails are core features — not afterthoughts.',
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

      <Hero
        eyebrow="Compare"
        titleNode={
          <>
            <span className="text-text-primary">How EdPilot </span>
            <span className="text-accent">compares.</span>
          </>
        }
        description="Transparent comparisons of EdPilot to other solutions in the market. We tell you when each option makes sense — including the ones that aren’t us."
      />

      <Section spacing="lg">
        <Container size="lg">
          <div className="grid gap-4 md:grid-cols-2">
            {COMPARISONS.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="group block rounded-2xl border border-border-gray bg-bg-surface p-7 transition-all hover:border-accent/40 hover:bg-[#1d1d21]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent mb-3">
                  {c.subtitle}
                </p>
                <h2 className="text-lg font-semibold text-text-primary tracking-[-0.01em] mb-2 group-hover:text-accent transition-colors">
                  {c.title}
                </h2>
                <p className="text-text-secondary text-[13px] leading-relaxed mb-5">
                  {c.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-accent text-[13px] font-medium">
                  Read comparison
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="sunken" spacing="lg">
        <Container size="lg">
          <SectionHeader
            eyebrow="Why we’re different"
            title="The four things every comparison comes back to."
          />
          <div className="grid gap-3 md:grid-cols-2">
            {DIFFERENTIATORS.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-border-gray bg-bg-surface p-6"
              >
                <h3 className="text-[14px] font-semibold text-text-primary mb-1.5 tracking-[-0.005em]">
                  {d.title}
                </h3>
                <p className="text-text-secondary text-[13px] leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title="Ready to see EdPilot in action?"
        description="Schedule a demo with our team to understand how EdPilot can transform teaching at your institution."
        primaryHref="/contact"
        primaryLabel="Schedule a demo"
        secondaryHref="/products/curriculum-intelligence"
        secondaryLabel="See the product"
      />
    </>
  )
}
