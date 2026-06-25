import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Brain,
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  FileEdit,
  GraduationCap,
  Layers3,
  MonitorPlay,
  Route,
  Sparkles,
  Users,
  Video,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Container,
  Hero,
  PageShell,
  Section,
  SectionHeader,
  StatusPill,
} from '@/components/marketing'
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

const curriculumTools: Array<{
  title: string
  blurb: string
  icon: typeof Brain
  status: 'live' | 'beta' | 'planned'
  statusLabel: string
}> = [
  {
    title: 'AI Teaching Assistant',
    blurb: 'Answers student questions from your materials, with citations and integrity guardrails.',
    icon: Brain,
    status: 'live',
    statusLabel: 'Live',
  },
  {
    title: 'Content Generation',
    blurb: 'Draft quizzes, study guides, and rubrics from the same course materials.',
    icon: FileEdit,
    status: 'beta',
    statusLabel: 'Beta',
  },
  {
    title: 'Student Performance Insights',
    blurb: 'See which learning objectives aren’t landing — before the exam confirms it.',
    icon: BarChart3,
    status: 'beta',
    statusLabel: 'Beta',
  },
  {
    title: 'Multimedia Generation',
    blurb: 'Turn lecture notes into slide outlines and visual explainers for review.',
    icon: Video,
    status: 'planned',
    statusLabel: 'Planned',
  },
  {
    title: 'AI Grader',
    blurb: 'Grade against your rubric every time, with faculty review before release.',
    icon: ClipboardCheck,
    status: 'planned',
    statusLabel: 'Planned',
  },
]

export default function ProductsPage() {
  return (
    <PageShell>
      <Hero
        eyebrow="Products"
        title="One course model."
        accent="A whole suite of tools."
        description="EdPilot’s Curriculum Intelligence suite is live today — five tools that all run from the same course model, so faculty set things up once and everything stays in sync."
        actions={[
          { label: 'Explore Curriculum Intelligence', href: '/products/curriculum-intelligence' },
          { label: 'See Pricing', href: '/pricing', variant: 'secondary' },
        ]}
      />

      <Section className="py-20 md:py-28" surface="panel">
        <Container size="wide">
          <SectionHeader
            eyebrow="Available now"
            title="The Curriculum Intelligence suite."
            description="Not a single feature — a connected set of tools for the whole course, governed by the instructor and grounded in real materials."
          />
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

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {curriculumTools.map((tool) => {
              const Icon = tool.icon
              return (
                <div
                  key={tool.title}
                  className="flex h-full flex-col rounded-lg border border-border-gray bg-bg-surface p-5 transition-colors hover:border-border-strong"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <StatusPill tone={tool.status}>{tool.statusLabel}</StatusPill>
                  </div>
                  <h4 className="mt-4 text-sm font-semibold text-text-primary">{tool.title}</h4>
                  <p className="mt-1.5 text-[13px] leading-6 text-text-secondary">{tool.blurb}</p>
                </div>
              )
            })}
            <div className="flex h-full flex-col justify-center rounded-lg border border-dashed border-border-gray bg-bg-deep p-5">
              <p className="text-[13px] leading-6 text-text-secondary">
                All five tools share one course model — set it up once, and the tutor, grader,
                content, and analytics stay in sync.
              </p>
              <Link
                href="/products/curriculum-intelligence"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-[#A78BFA] focus-ring"
              >
                See how the suite works
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-20">
        <Container size="wide">
          <SectionHeader
            eyebrow="The wider platform, over time"
            title="Where EdPilot is headed."
            description="A few directions we’re exploring beyond the live suite. These are a roadmap, not products you can buy today — included for transparency, not as equal offerings."
            className="mb-8"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoonSuites.map((suite) => {
              const Icon = suite.icon
              return (
                <div
                  key={suite.id}
                  className="flex items-center gap-3 rounded-lg border border-border-gray bg-bg-deep px-4 py-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border-gray bg-bg-surface text-text-tertiary">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-text-secondary">
                    {suite.title}
                  </span>
                  <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-tertiary">
                    Planned
                  </span>
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
