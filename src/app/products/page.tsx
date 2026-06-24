import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Cpu,
  GraduationCap,
  Layers3,
  MonitorPlay,
  Route,
  Sparkles,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container, Hero, PageShell, Section, SectionHeader } from '@/components/marketing'
import { SIGN_UP_URL } from '@/lib/marketing'

export const metadata: Metadata = {
  title: 'Products — Course-grounded AI for higher education',
  description:
    'Explore the EdPilot product suite: Curriculum Intelligence and the AI Teaching Assistant that answers student questions from your course materials, governed by faculty and ready for institutional review.',
  keywords:
    'EdPilot products, AI teaching assistant, curriculum intelligence, course-grounded AI, higher education AI platform',
}

const comingSoonSuites = [
  {
    id: 'professor-network',
    title: 'Professor Network Hub',
    description:
      'Share materials, co-develop courses, and collaborate with faculty across your institution.',
    icon: Users,
    signal: 'Faculty collaboration',
  },
  {
    id: 'student-career',
    title: 'Student Career Network',
    description: 'Job matching and career recommendations tied to academic performance.',
    icon: Briefcase,
    signal: 'Student outcomes',
  },
  {
    id: 'university-admin',
    title: 'University Admin Intelligence',
    description: 'Curriculum compliance tracking, course planning, and department analytics.',
    icon: Building2,
    signal: 'Admin visibility',
  },
  {
    id: 'ai-lab',
    title: 'AI Lab & Tooling Suite',
    description: 'Custom AI workflows, institutional knowledge bases, and model evaluation.',
    icon: Cpu,
    signal: 'AI governance',
  },
  {
    id: 'classroom-experience',
    title: 'Classroom Experience Suite',
    description: 'Live lecture support, engagement tracking, and post-class summaries.',
    icon: MonitorPlay,
    signal: 'Classroom layer',
  },
]

export default function ProductsPage() {
  return (
    <PageShell>
      <Hero
        eyebrow="Products"
        title="AI product suites for"
        accent="higher education."
        description="One suite is live today. The rest are being shaped around the same principle: institutional AI should be governed, grounded, and useful."
      />

      <Section className="py-20 md:py-28" surface="panel">
        <Container>
          <SectionHeader eyebrow="Available Now" title="Start with Curriculum Intelligence." />
          <Link href="/products/curriculum-intelligence" className="group block">
            <div className="rounded-lg border border-accent/30 bg-[linear-gradient(135deg,rgba(139,92,246,0.14),rgba(15,15,18,1)_45%,rgba(24,24,27,1))] p-6 transition duration-200 hover:border-accent/55 md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-text-primary group-hover:text-accent">
                      Curriculum Intelligence Suite
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-text-secondary">
                      AI tutor, content generation, rubric-based grading, multimedia materials, and
                      performance analytics, all powered by the same course model.
                    </p>
                  </div>
                </div>
                <span className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#3d3d45] bg-transparent px-4 text-sm font-medium text-text-primary transition-colors group-hover:border-accent/45 group-hover:bg-accent/10 group-hover:text-accent">
                  Learn More
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container size="wide">
          <SectionHeader
            eyebrow="Roadmap"
            title="A quieter view of what comes next."
            description="Future suites are framed as a roadmap, not equal products, so buyers can understand the platform direction without losing sight of the live suite."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {comingSoonSuites.map((suite, index) => {
              const Icon = suite.icon

              return (
                <div
                  key={suite.id}
                  className="group relative overflow-hidden rounded-lg border border-border-gray bg-[linear-gradient(180deg,rgba(34,34,40,0.74),rgba(15,15,18,0.92))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_26px_80px_rgba(0,0,0,0.32)] md:p-6 lg:col-span-2 [&:nth-child(4)]:lg:col-start-2"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-accent ring-1 ring-accent/10">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="rounded-md border border-border-gray bg-bg-page px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary">
                      Planned
                    </span>
                  </div>
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent/80">
                    {suite.signal}
                  </p>
                  <h3 className="mt-2 text-base font-semibold tracking-[-0.01em] text-text-primary">
                    {suite.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{suite.description}</p>
                  <div className="mt-6 flex items-center gap-2 border-t border-border-gray pt-4 text-xs text-text-tertiary">
                    <span className="font-mono text-[11px] text-text-tertiary">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px flex-1 bg-border-gray" />
                    <span>Roadmap suite</span>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      <Section className="py-20 md:py-28" surface="deep">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,15,18,1),rgba(25,18,38,0.62),rgba(15,15,18,1))]"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <div className="overflow-hidden rounded-lg border border-accent/25 bg-[linear-gradient(135deg,rgba(139,92,246,0.16),rgba(24,24,27,0.92)_44%,rgba(15,15,18,1))] shadow-[0_28px_90px_rgba(0,0,0,0.38)]">
            <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
              <div className="p-7 md:p-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                  <Route className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Institution path
                </p>
                <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-[-0.025em] text-text-primary md:text-4xl">
                  Built to graduate from pilot to institution.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-text-secondary md:text-base">
                  The product path starts with direct course-material upload and professor-led
                  pilots, then expands into LMS, SSO, accessibility, procurement, and multi-course
                  rollout conversations as institutions are ready.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="h-11 px-7">
                    <Link href={SIGN_UP_URL}>
                      Get Started Free
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-11 px-7">
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </div>
              <div className="border-t border-border-gray bg-bg-deep/58 p-6 md:border-l md:border-t-0 md:p-8">
                <div className="space-y-4">
                  {[
                    {
                      label: 'Pilot',
                      detail:
                        'Upload course materials, test student support, review faculty controls.',
                      icon: Sparkles,
                    },
                    {
                      label: 'Rollout',
                      detail:
                        'Add accessibility, procurement, LMS, and SSO requirements as scope grows.',
                      icon: Layers3,
                    },
                    {
                      label: 'Institution',
                      detail:
                        'Expand across programs with governed course models and clearer analytics.',
                      icon: CheckCircle2,
                    },
                  ].map((item, index) => (
                    <div key={item.label} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-accent">
                          <item.icon className="h-4 w-4" aria-hidden="true" />
                        </div>
                        {index < 2 && <span className="mt-3 h-8 w-px bg-border-gray" />}
                      </div>
                      <div className="pb-2">
                        <h3 className="text-sm font-semibold text-text-primary">{item.label}</h3>
                        <p className="mt-1 text-[13px] leading-6 text-text-secondary">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

    </PageShell>
  )
}
