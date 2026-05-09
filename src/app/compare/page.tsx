import Link from 'next/link'
import { ArrowRight, Bot, Building2, GraduationCap, Layers, ShieldCheck, Wrench } from 'lucide-react'
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
      'When a student asks at midnight, does the answer know your course or just sound confident?',
    icon: Bot,
  },
  {
    slug: 'tutoring-platforms',
    title: 'EdPilot vs. Tutoring Platforms',
    subtitle: 'Institutional oversight vs. student-directed support',
    description: 'Tutoring can help. Invisible tutoring that ignores your syllabus? Less charming.',
    icon: GraduationCap,
  },
  {
    slug: 'lms-native',
    title: 'EdPilot vs. LMS-Native AI',
    subtitle: 'Vendor-independent AI vs. built-in LMS alternatives',
    description: 'Your AI strategy should not wait politely for an LMS roadmap update.',
    icon: Layers,
  },
  {
    slug: 'custom-solutions',
    title: 'EdPilot vs. Custom In-House Solutions',
    subtitle: 'Deployable platform vs. build-from-scratch infrastructure',
    description: 'A prototype is easy. Governance, citations, audits, and support are the fun part.',
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
          title="Pick the AI that knows"
          accent="the assignment."
          description="Most AI tools can answer. EdPilot knows when it should answer, what it can cite, and which professor set the rules."
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
              eyebrow="The Short Version"
              title="EdPilot wins when stakes are real."
              description="The moment a student, professor, or IT team asks a practical question, generic AI starts leaking context. EdPilot was built for those moments."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: GraduationCap,
                  title: 'Student asks before the exam',
                  description:
                    'Generic AI gives a polished guess. EdPilot answers from Week 4 slides and points back to the exact source.',
                },
                {
                  icon: Bot,
                  title: 'Professor changes the rubric',
                  description:
                    'A chatbot shrugs. EdPilot updates the course model so support follows the new standard.',
                },
                {
                  icon: ShieldCheck,
                  title: 'IT asks who owns the data',
                  description:
                    'EdPilot has the grown-up answer: institution-bound data, governance, and clear boundaries.',
                },
                {
                  icon: Building2,
                  title: 'The dean asks if this scales',
                  description:
                    'One-off tools multiply risk. EdPilot gives departments a repeatable way to deploy course-aware AI.',
                },
              ].map((item) => (
                <FeatureCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
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
