import Link from 'next/link'
import { ArrowRight, Bot, GraduationCap, Layers, Wrench } from 'lucide-react'
import { BreadcrumbSchema } from '@/components/StructuredData'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import {
  CTABand,
  Container,
  FeatureCard,
  Hero,
  PageShell,
  Section,
  SectionHeader,
} from '@/components/marketing'

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
    subtitle: 'Purpose-built university AI vs. general-purpose conversational AI',
    description:
      'Instructor control, course grounding, academic integrity, and institutional governance.',
    icon: Bot,
  },
  {
    slug: 'tutoring-platforms',
    title: 'EdPilot vs. Tutoring Platforms',
    subtitle: 'Institutional oversight vs. student-directed support',
    description: 'Compare EdPilot to homework tutoring services like Chegg and Tutor.com.',
    icon: GraduationCap,
  },
  {
    slug: 'lms-native',
    title: 'EdPilot vs. LMS-Native AI',
    subtitle: 'Vendor-independent AI vs. built-in LMS alternatives',
    description: 'See how EdPilot compares to AI built into Canvas, Blackboard, and other LMSs.',
    icon: Layers,
  },
  {
    slug: 'custom-solutions',
    title: 'EdPilot vs. Custom In-House Solutions',
    subtitle: 'Deployable platform vs. build-from-scratch infrastructure',
    description: 'Compare the cost, time, and complexity of EdPilot versus building your own AI.',
    icon: Wrench,
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
      <PageShell>
        <Hero
          eyebrow="Compare"
          title="How EdPilot compares"
          accent="to alternatives."
          description="Transparent comparisons for university buyers evaluating general AI, tutoring services, LMS-native tools, and custom builds."
        />

        <Section className="py-20 md:py-28">
          <Container>
            <div className="grid gap-4 md:grid-cols-2">
              {comparisons.map((comparison) => (
                <Link
                  key={comparison.slug}
                  href={`/compare/${comparison.slug}`}
                  className="group block"
                >
                  <FeatureCard
                    icon={comparison.icon}
                    title={comparison.title}
                    description={comparison.description}
                    className="h-full"
                  >
                    <p className="mt-2 text-xs font-medium text-accent">{comparison.subtitle}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                      Read comparison
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </FeatureCard>
                </Link>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="py-20 md:py-28" surface="panel">
          <Container>
            <SectionHeader
              eyebrow="Why EdPilot"
              title="Designed for institutional AI governance."
              description="Universities need more than a chatbot. EdPilot keeps faculty in control, grounds answers in course materials, and gives institutions a governed path to AI adoption."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ['Purpose-built for universities', 'Not adapted from consumer tools. Designed for accredited higher education.'],
                ['Instructor authority', 'Faculty set policy, knowledge boundaries, and student access.'],
                ['Course-specific grounding', 'AI responds from course materials instead of broad model memory.'],
                ['Academic integrity built in', 'Safeguards and visibility are core product requirements.'],
              ].map(([title, description]) => (
                <FeatureCard key={title} title={title} description={description} />
              ))}
            </div>
          </Container>
        </Section>

        <CTABand
          title="Ready to see EdPilot in action?"
          description="Schedule a demo and see how course-grounded AI changes the support layer for your institution."
          actions={[{ label: 'Schedule a Demo', href: '/contact' }]}
        />

        <Footer />
      </PageShell>
    </>
  )
}

