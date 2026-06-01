import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  GraduationCap,
  Layers,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
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
    signal: 'Course-grounded answers',
  },
  {
    slug: 'tutoring-platforms',
    title: 'EdPilot vs. Tutoring Platforms',
    subtitle: 'Institutional oversight vs. student-directed support',
    description: 'Tutoring can help. Invisible tutoring that ignores your syllabus? Less charming.',
    icon: GraduationCap,
    signal: 'Faculty-governed support',
  },
  {
    slug: 'lms-native',
    title: 'EdPilot vs. LMS-Native AI',
    subtitle: 'Vendor-independent AI vs. built-in LMS alternatives',
    description: 'Your AI strategy should not wait politely for an LMS roadmap update.',
    icon: Layers,
    signal: 'Vendor-independent rollout',
  },
  {
    slug: 'custom-solutions',
    title: 'EdPilot vs. Custom In-House Solutions',
    subtitle: 'Deployable platform vs. build-from-scratch infrastructure',
    description: 'A prototype is easy. Governance, citations, audits, and support are the fun part.',
    icon: Wrench,
    signal: 'Governance without rebuilds',
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
          <Container size="wide">
            <div className="grid gap-4 md:grid-cols-2">
              {comparisons.map((comparison, index) => {
                const Icon = comparison.icon

                return (
                  <Link
                    key={comparison.slug}
                    href={`/compare/${comparison.slug}`}
                    className="group block"
                  >
                    <div className="relative h-full overflow-hidden rounded-lg border border-border-gray bg-[linear-gradient(180deg,rgba(34,34,40,0.72),rgba(15,15,18,0.94))] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_30px_90px_rgba(0,0,0,0.34)] md:p-6">
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent opacity-0 transition group-hover:opacity-100"
                        aria-hidden="true"
                      />
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent ring-1 ring-accent/10">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                              Compare {String(index + 1).padStart(2, '0')}
                            </p>
                            <h2 className="mt-2 text-xl font-semibold leading-tight tracking-[-0.02em] text-text-primary">
                              {comparison.title}
                            </h2>
                          </div>
                        </div>
                        <ArrowRight
                          className="mt-1 h-4 w-4 shrink-0 text-text-tertiary transition duration-200 group-hover:translate-x-1 group-hover:text-accent"
                          aria-hidden="true"
                        />
                      </div>

                      <p className="mt-5 text-sm leading-7 text-text-secondary">
                        {comparison.description}
                      </p>

                      <div className="mt-6 border-t border-border-gray pt-5">
                        <div className="flex items-start gap-3">
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                            aria-hidden="true"
                          />
                          <div>
                            <p className="text-sm font-semibold text-text-primary">
                              {comparison.signal}
                            </p>
                            <p className="mt-1 text-[13px] leading-6 text-text-secondary">
                              {comparison.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>

                      <span className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border-gray bg-[#0F0F12] px-3 py-2 text-sm font-semibold text-accent transition group-hover:border-accent/35 group-hover:bg-accent/10">
                        Read comparison
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                )
              })}
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
