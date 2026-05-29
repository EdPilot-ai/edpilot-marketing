import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  Lock,
  Mails,
  Plug,
  Rocket,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Users,
} from 'lucide-react'
import { BreadcrumbSchema } from '@/components/StructuredData'
import Footer from '@/components/Footer'
import {
  CTABand,
  Container,
  FeatureCard,
  PageShell,
  Section,
  SectionHeader,
  TrustBar,
} from '@/components/marketing'
import { Button } from '@/components/ui/button'
import { SIGN_UP_URL } from '@/lib/marketing'

export const metadata: Metadata = {
  title: 'How It Works — Self-Serve Setup for Your University',
  description:
    'Launch EdPilot at your university in minutes, not months. An admin signs up, EdPilot approves your institution, you invite professors, and faculty optionally connect Canvas. No IT project, no procurement maze.',
  keywords:
    'EdPilot setup, self-serve university AI, onboard professors, Canvas integration, FERPA AI teaching assistant, how to start EdPilot',
}

const steps = [
  {
    icon: UserPlus,
    title: 'Register your university',
    time: '~2 minutes',
    description:
      'A university admin creates an account with their official school email and enters the institution name. EdPilot figures out the rest from your email domain — no forms to chase down, no contracts to sign first.',
    result: 'Workspace request sent',
  },
  {
    icon: ShieldCheck,
    title: 'EdPilot approves your institution',
    time: 'Fast review',
    description:
      'We do a quick check to confirm you are a real university and to keep student data safe. The moment you are approved, your admin gets an email and your workspace goes live.',
    result: 'Institution verified',
  },
  {
    icon: Mails,
    title: 'Invite your professors',
    time: 'One click each',
    description:
      'From the admin dashboard, invite faculty by email — one at a time or paste a whole department list at once. Each professor gets a single join link and lands in their own dashboard ready to teach.',
    result: 'Faculty links delivered',
  },
  {
    icon: Plug,
    title: 'Professors connect Canvas — optional',
    time: 'Their choice',
    description:
      'Faculty can sync their Canvas roster and course materials in a couple of clicks, or skip Canvas entirely and upload files directly. Either way, the assistant only ever answers from approved course content.',
    result: 'Course AI goes live',
  },
]

const easeFeatures = [
  {
    icon: Rocket,
    title: 'Nothing to install',
    description:
      'EdPilot runs in the browser. Canvas connects with a secure token in seconds — not a six-week IT integration.',
  },
  {
    icon: GraduationCap,
    title: 'Professors stay in control',
    description:
      'Every instructor sets their own assistant mode, guardrails, and which materials the AI can use. No central team dictates the classroom.',
  },
  {
    icon: Lock,
    title: 'FERPA-safe by default',
    description:
      'Student data stays scoped to each course. Admins approve access, professors govern content, and nothing leaks between classes.',
  },
  {
    icon: Sparkles,
    title: 'Free to start',
    description:
      'Spin up a pilot at no cost. Add courses and faculty as adoption grows — no upfront commitment to find out if it works.',
  },
]

const roles = [
  {
    icon: Users,
    title: 'University admin',
    description:
      'Registers the institution, invites and manages professors, and sees adoption across every course from one dashboard.',
  },
  {
    icon: GraduationCap,
    title: 'Professor',
    description:
      'Accepts an invite, optionally connects Canvas, sets the assistant up for their course, and watches where students get stuck.',
  },
  {
    icon: Sparkles,
    title: 'Student',
    description:
      'Joins their course and asks questions in plain language — getting answers grounded in the actual syllabus and materials, with citations.',
  },
]

const trustItems = [
  {
    icon: ShieldCheck,
    label: 'Admin approved',
    detail: 'Institutions are verified by EdPilot before any workspace goes live.',
  },
  {
    icon: Lock,
    label: 'Course-scoped data',
    detail: 'Student activity stays inside the course it belongs to — FERPA-aligned by design.',
  },
  {
    icon: Clock,
    label: 'Live the same week',
    detail: 'Most universities go from sign-up to teaching faculty in days, not a semester.',
  },
]

const heroStats = [
  { label: 'Admin signup', value: '~2 min' },
  { label: 'Rollout speed', value: 'Same week' },
  { label: 'IT dependency', value: 'Optional' },
]

const launchTags = ['No code', 'No ticket queue', 'Canvas optional']

export default function HowItWorksPage() {
  const breadcrumbItems = [
    { name: 'EdPilot', url: 'https://edpilot.com' },
    { name: 'How It Works', url: 'https://edpilot.com/how-it-works' },
  ]

  return (
    <PageShell>
      <BreadcrumbSchema items={breadcrumbItems} />

      <Section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[linear-gradient(180deg,rgba(139,92,246,0.18),rgba(20,20,22,0)_64%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
          aria-hidden="true"
        />
        <Container size="wide" className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Self-serve onboarding
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-text-primary md:text-7xl">
                Launch EdPilot at your university in{' '}
                <span className="text-accent">minutes, not months.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
                No procurement maze. No IT project. An admin signs up, EdPilot approves your
                institution, and your professors are teaching with course-grounded AI the same week.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-11 px-7">
                  <Link href={SIGN_UP_URL}>
                    Get started free
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-11 px-7">
                  <Link href="#steps">See the steps</Link>
                </Button>
              </div>
              <div className="mt-10 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-lg border border-border-gray bg-border-gray">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="bg-[#0F0F12] px-4 py-3">
                    <p className="text-lg font-semibold tracking-[-0.02em] text-text-primary">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-text-tertiary">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-px rounded-lg bg-[linear-gradient(135deg,rgba(139,92,246,0.55),rgba(34,197,94,0.18),rgba(56,189,248,0.18))] opacity-70" />
              <div className="relative overflow-hidden rounded-lg border border-border-gray bg-[#0F0F12] shadow-[0_34px_100px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between border-b border-border-gray px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#A78BFA]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#38BDF8]" />
                  </div>
                  <span className="rounded-md border border-accent/25 bg-accent/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
                    Launchpad
                  </span>
                </div>
                <div className="p-5 md:p-7">
                  <div className="grid gap-3">
                    {steps.map((step, index) => {
                      const Icon = step.icon
                      return (
                        <div
                          key={step.title}
                          className="grid grid-cols-[auto_1fr] gap-4 border-b border-border-gray/80 pb-3 last:border-0 last:pb-0 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-gray bg-bg-surface text-sm font-semibold text-text-primary">
                            {index + 1}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-text-primary sm:truncate">
                              {step.title}
                            </p>
                            <p className="mt-1 text-xs text-text-secondary">{step.result}</p>
                          </div>
                          <div className="col-start-2 flex items-center gap-2 text-xs font-medium text-text-secondary sm:col-start-auto">
                            <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                            {step.time}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {launchTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border-gray bg-bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="steps" className="py-20 md:py-28" surface="panel">
        <Container size="wide">
          <SectionHeader
            eyebrow="How it works"
            title="Four steps from sign-up to live."
            description="Everything is self-serve. You stay in the driver's seat the whole way — EdPilot just clears the runway."
          />
          <ol className="relative grid gap-4 lg:grid-cols-4">
            <div
              className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent lg:block"
              aria-hidden="true"
            />
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <li
                  key={step.title}
                  className="group relative overflow-hidden rounded-lg border border-border-gray bg-[#0F0F12] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-[#18181B] md:p-6"
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-base font-semibold text-accent">
                      {index + 1}
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-border-gray bg-bg-surface px-2.5 py-1 text-[11px] font-medium text-text-secondary">
                      <Icon className="h-3 w-3 text-accent" aria-hidden="true" />
                      {step.time}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold tracking-[-0.01em] text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{step.description}</p>
                  <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-text-tertiary">
                    {step.result}
                  </p>
                </li>
              )
            })}
          </ol>
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionHeader
              eyebrow="Why it's effortless"
              title="Built to set up itself."
              description="EdPilot is designed so a university can adopt it without a rollout team, a budget cycle, or a single line of code."
              align="left"
              className="mb-0"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {easeFeatures.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  featured={index === 0}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-20 md:py-28" surface="panel">
        <Container size="wide">
          <SectionHeader
            eyebrow="Who does what"
            title="Three lanes. No handoffs."
            description="The same onboarding gives each role exactly what they need — and nothing they don't."
          />
          <div className="grid gap-px overflow-hidden rounded-lg border border-border-gray bg-border-gray md:grid-cols-3">
            {roles.map((role) => {
              const Icon = role.icon
              return (
                <div key={role.title} className="bg-[#0F0F12] p-6 md:p-7">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-text-primary">{role.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{role.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container size="wide">
          <SectionHeader
            eyebrow="Safe by design"
            title="Fast to launch, careful with data."
            description="Self-serve doesn't mean a free-for-all. Every institution is verified and every course is walled off."
          />
          <TrustBar items={trustItems} />
          <div className="mx-auto mt-12 max-w-2xl">
            <ul className="space-y-3">
              {[
                'Your admin approves who joins — no one self-enrolls into your workspace.',
                'Professors decide what the AI can see and how it behaves in their course.',
                'Add or remove faculty and courses anytime, right from the dashboard.',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-text-secondary">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CTABand
        title="Set up your university today."
        description="It takes a couple of minutes to register. Once EdPilot approves your institution, you'll be inviting professors the same day."
        actions={[
          { label: 'Get started free', href: SIGN_UP_URL },
          { label: 'Talk to our team', href: '/contact', variant: 'secondary' },
        ]}
      />

      <Footer />
    </PageShell>
  )
}
