import type { Metadata } from 'next'
import {
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

const steps = [
  {
    icon: UserPlus,
    title: 'Register your university',
    time: '~2 minutes',
    description:
      'A university admin creates an account with their official school email and enters the institution name. EdPilot figures out the rest from your email domain — no forms to chase down, no contracts to sign first.',
  },
  {
    icon: ShieldCheck,
    title: 'EdPilot approves your institution',
    time: 'Fast review',
    description:
      'We do a quick check to confirm you are a real university and to keep student data safe. The moment you are approved, your admin gets an email and your workspace goes live.',
  },
  {
    icon: Mails,
    title: 'Invite your professors',
    time: 'One click each',
    description:
      'From the admin dashboard, invite faculty by email — one at a time or paste a whole department list at once. Each professor gets a single join link and lands in their own dashboard ready to teach.',
  },
  {
    icon: Plug,
    title: 'Professors connect Canvas — optional',
    time: 'Their choice',
    description:
      'Faculty can sync their Canvas roster and course materials in a couple of clicks, or skip Canvas entirely and upload files directly. Either way, the assistant only ever answers from approved course content.',
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
          { label: 'Get started free', href: SIGN_UP_URL },
          { label: 'See the steps', href: '#steps', variant: 'secondary' },
        ]}
      />

      {/* Four steps */}
      <Section id="steps" className="py-20 md:py-28" surface="panel">
        <Container size="wide">
          <SectionHeader
            eyebrow="How it works"
            title="Four steps from sign-up to live."
            description="Everything is self-serve. You stay in the driver's seat the whole way — EdPilot just clears the runway."
          />
          <ol className="grid gap-4 md:grid-cols-2">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <li
                  key={step.title}
                  className="group relative overflow-hidden rounded-lg border border-border-gray bg-bg-surface p-6 transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-[#1d1d22] md:p-7"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-base font-semibold text-accent">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="text-base font-semibold tracking-[-0.01em] text-text-primary">
                          {step.title}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border-gray px-2.5 py-0.5 text-[11px] font-medium text-text-secondary">
                          <Icon className="h-3 w-3 text-accent" aria-hidden="true" />
                          {step.time}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-7 text-text-secondary">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </Container>
      </Section>

      {/* Why it's effortless */}
      <Section className="py-20 md:py-28">
        <Container size="wide">
          <SectionHeader
            eyebrow="Why it's effortless"
            title="Built to set up itself."
            description="EdPilot is designed so a university can adopt it without a rollout team, a budget cycle, or a single line of code."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {easeFeatures.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Who does what */}
      <Section className="py-20 md:py-28" surface="panel">
        <Container size="wide">
          <SectionHeader
            eyebrow="Who does what"
            title="Everyone gets their lane."
            description="The same onboarding gives each role exactly what they need — and nothing they don't."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {roles.map((role) => (
              <FeatureCard
                key={role.title}
                icon={role.icon}
                title={role.title}
                description={role.description}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Trust */}
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
