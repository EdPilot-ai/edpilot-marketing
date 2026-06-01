import type { Metadata } from 'next'
import {
  CheckCircle2,
  Clock,
  GraduationCap,
  Lock,
  Rocket,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { BreadcrumbSchema } from '@/components/StructuredData'
import Footer from '@/components/Footer'
import {
  InteractiveLaunchpad,
  RoleExplorer,
} from '@/components/marketing/SelfServeExperience'
import {
  CTABand,
  Container,
  FeatureCard,
  Hero,
  PageShell,
  Section,
  SectionHeader,
  TrustBar,
} from '@/components/marketing'
import { SIGN_UP_URL } from '@/lib/marketing'

export const metadata: Metadata = {
  title: 'How It Works — Self-Serve Setup for Your University',
  description:
    'Launch EdPilot at your university in minutes, not months. An admin signs up, EdPilot approves your institution, you invite professors, and faculty optionally connect Canvas. No IT project, no procurement maze.',
  keywords:
    'EdPilot setup, self-serve university AI, onboard professors, Canvas integration, FERPA AI teaching assistant, how to start EdPilot',
}

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
  { label: 'No IT lift', value: 'Optional' },
]

export default function HowItWorksPage() {
  const breadcrumbItems = [
    { name: 'EdPilot', url: 'https://edpilot.com' },
    { name: 'How It Works', url: 'https://edpilot.com/how-it-works' },
  ]

  return (
    <PageShell>
      <BreadcrumbSchema items={breadcrumbItems} />

      <Hero
        eyebrow="Self-serve onboarding"
        title="Launch EdPilot at your university in"
        accent="minutes, not months."
        description="No procurement maze. No IT project. An admin signs up, EdPilot approves your institution, and your professors are teaching with course-grounded AI the same week."
        actions={[
          { label: 'Get Started Free', href: SIGN_UP_URL },
          { label: 'Explore Setup', href: '#self-serve-setup', variant: 'secondary' },
        ]}
      />

      <Section id="self-serve-setup" className="py-16 md:py-24" surface="panel">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(139,92,246,0.08),rgba(24,24,27,0)_42%)]"
          aria-hidden="true"
        />
        <Container size="wide" className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                eyebrow="Interactive setup"
                title="Click through the launch path."
                description="The onboarding flow is deliberately small: request the workspace, get verified, invite faculty, and let professors choose Canvas or direct uploads."
                align="left"
                className="mb-7"
              />
              <div className="grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-lg border border-border-gray bg-border-gray">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="bg-[#0F0F12] px-4 py-3">
                    <p className="text-lg font-semibold tracking-[-0.02em] text-text-primary">
                      {stat.value}
                    </p>
                    <p className="mt-1 break-words text-[10px] uppercase tracking-[0.08em] text-text-tertiary">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <InteractiveLaunchpad />
          </div>
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
          <RoleExplorer />
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
