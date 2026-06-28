import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BarChart3,
  Building2,
  Eye,
  EyeOff,
  FileCheck2,
  GraduationCap,
  Lock,
  Scale,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react'
import { BreadcrumbSchema } from '@/components/StructuredData'
import {
  CTABand,
  Container,
  FeatureCard,
  Hero,
  IconChip,
  MarketingCard,
  PageShell,
  ProofPanel,
  Section,
  SectionHeader,
  StatBand,
} from '@/components/marketing'
import { SIGN_UP_URL } from '@/lib/marketing'
import { productFacts } from '@/lib/social-proof'

export const metadata: Metadata = {
  title: 'For University Leaders — Govern campus AI, don’t inherit the risk',
  description:
    'Students are already using AI on your courses. EdPilot gives administrators a governed path to campus AI: faculty control, FERPA-aligned data boundaries, adoption visibility, and a rollout that needs no IT project.',
  keywords:
    'university AI policy, campus AI governance, FERPA AI, higher education AI administration, institutional AI adoption, provost AI strategy, shadow AI',
}

const risks = [
  {
    icon: EyeOff,
    title: 'No visibility',
    description:
      'Generic chatbots leave no trail. You can’t see what students are asking, what they’re being told, or where it contradicts the course.',
  },
  {
    icon: Scale,
    title: 'No governance',
    description:
      'Tools adopted classroom-by-classroom mean no consistent policy, no data boundary, and nobody who can answer for it in a review.',
  },
  {
    icon: Lock,
    title: 'Unmanaged data',
    description:
      'Student questions and course content flow into consumer tools with terms your institution never approved.',
  },
]

const shifts = [
  {
    icon: ShieldCheck,
    title: 'Faculty set the rules',
    description:
      'Each instructor defines what the assistant knows, how it responds, and where it stops. Governance lives with the course, not a vendor default.',
  },
  {
    icon: Eye,
    title: 'You get visibility',
    description:
      'See adoption across departments, where students are confused, and where misuse is attempted — before it becomes an integrity case.',
  },
  {
    icon: BarChart3,
    title: 'AI becomes a decision, not a leak',
    description:
      'Course-grounded, cited answers replace ungoverned chatbots. Campus AI becomes something you chose and can stand behind.',
  },
]

const governanceVisualItems = [
  {
    icon: ShieldCheck,
    label: 'Course guardrails',
    detail: 'Faculty rules, citation expectations, and assessment boundaries stay visible.',
  },
  {
    icon: FileCheck2,
    label: 'Review posture',
    detail: 'Data handling, retention, accessibility, and LMS status are ready for signoff.',
  },
  {
    icon: Eye,
    label: 'Adoption visibility',
    detail: 'Leaders can see where pilots are active and what support questions are emerging.',
  },
]

const rolloutChecklist = [
  'Verify institutional domain',
  'Invite professor-led pilots',
  'Upload course materials directly',
  'Review privacy and procurement notes',
  'Scope department rollout when ready',
]

const signoff = [
  {
    icon: Lock,
    label: 'FERPA-aligned by design',
    detail: 'Built around institution-bound course and student data, with public model training off the table.',
  },
  {
    icon: Building2,
    label: 'Scoped by institution and course',
    detail: 'Course materials, student interactions, and deployments stay walled off by institution and course.',
  },
  {
    icon: FileCheck2,
    label: 'Procurement-ready answers',
    detail: 'Clear posture on data handling, retention, accessibility, and LMS status for IT, legal, and privacy review.',
  },
  {
    icon: Users,
    label: 'Faculty ownership',
    detail: 'Instructors keep control of course content and AI behavior instead of handing it to a generic layer.',
  },
  {
    icon: TrendingUp,
    label: 'Adoption you can measure',
    detail: 'Department-level visibility into where the assistant is used and where students need more support.',
  },
  {
    icon: GraduationCap,
    label: 'Integrity controls',
    detail: 'Assessment and homework requests are routed toward hints, practice, or refusal — not completion.',
  },
]

export default function ForUniversitiesPage() {
  const breadcrumbItems = [
    { name: 'EdPilot', url: 'https://edpilot.ai' },
    { name: 'For Universities', url: 'https://edpilot.ai/for-universities' },
  ]

  return (
    <PageShell>
      <BreadcrumbSchema items={breadcrumbItems} />

      <Hero
        eyebrow="For university leaders"
        title="Adopt campus AI on purpose."
        accent="Not by accident."
        description="Your students are already using AI on your courses. EdPilot gives administrators a governed path to campus AI — faculty-controlled, FERPA-aligned, and ready for the people who have to sign off."
        actions={[
          { label: 'Book University Demo', href: '/contact' },
          { label: 'See Pricing', href: '/pricing', variant: 'secondary' },
        ]}
      />

      <Section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            eyebrow="The exposure you can't see"
            title="Ungoverned AI is already in your classrooms."
            description="It didn't wait for a policy. The question is no longer whether students use AI — it's whether the institution can see it, shape it, and answer for it."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {risks.map((risk) => (
              <FeatureCard
                key={risk.title}
                icon={risk.icon}
                title={risk.title}
                description={risk.description}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-20 md:py-28" surface="panel">
        <Container>
          <SectionHeader
            eyebrow="What changes when AI is governed"
            title="From a leak you inherit to a decision you own."
            description="EdPilot doesn't ban AI or pretend it will go away. It moves course AI inside the academic boundary, where faculty govern it and the institution can stand behind it."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {shifts.map((shift) => (
              <FeatureCard
                key={shift.title}
                featured
                icon={shift.icon}
                title={shift.title}
                description={shift.description}
              />
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-text-secondary">
            Want to see the product behind the governance model?{' '}
            <Link href="/products" className="font-semibold text-accent hover:text-accent-soft focus-ring">
              Explore the product suite
            </Link>
            .
          </p>
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <SectionHeader
              align="left"
              eyebrow="Admin governance view"
              title="A rollout picture leaders can actually use."
              description="The university view should make the control model tangible: faculty own the course, administrators see the rollout posture, and procurement questions do not wait until the end."
              className="mb-0"
            />

            <div className="surface-gradient-featured overflow-hidden rounded-lg border border-accent/20 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-gray bg-bg-surface/80 px-5 py-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    Governance workspace
                  </p>
                  <p className="mt-1 text-sm font-semibold text-text-primary">
                    Pilot controls, rollout notes, and signoff posture in one place.
                  </p>
                </div>
                <span className="rounded-md border border-border-gray bg-bg-deep px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary">
                  Pilot-ready
                </span>
              </div>

              <div className="grid gap-0 md:grid-cols-[1fr_0.9fr]">
                <div className="space-y-3 p-5 md:p-6">
                  {governanceVisualItems.map((item) => (
                    <MarketingCard key={item.label} surface="deep" className="p-4">
                      <div className="flex items-start gap-3">
                        <IconChip icon={item.icon} className="h-9 w-9" />
                        <div>
                          <h3 className="text-sm font-semibold text-text-primary">
                            {item.label}
                          </h3>
                          <p className="mt-1 text-[13px] leading-6 text-text-secondary">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </MarketingCard>
                  ))}
                </div>

                <div className="border-t border-border-gray bg-bg-deep/70 p-5 md:border-l md:border-t-0 md:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                    Rollout checklist
                  </p>
                  <ul className="mt-4 space-y-3">
                    {rolloutChecklist.map((item, index) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border-gray bg-bg-surface text-[11px] font-bold text-accent">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="pt-1 text-[13px] leading-6 text-text-secondary">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-20" surface="deep">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary md:text-3xl">
              Roll out without a rollout team.
            </h2>
            <p className="mt-4 text-sm leading-7 text-text-secondary md:text-base">
              No procurement maze, no IT project. An admin registers, EdPilot verifies the
              institution, and faculty are teaching with course-grounded AI the same week.
            </p>
            <p className="mt-4 text-sm text-text-secondary">
              See the launch path on{' '}
              <Link href="/how-it-works" className="font-semibold text-accent hover:text-accent-soft focus-ring">
                How It Works
              </Link>
              .
            </p>
          </div>
          <StatBand items={productFacts} />
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            eyebrow="Built for the people who sign off"
            title="Answers for IT, legal, and procurement — before they ask."
            description="The academic, privacy, and implementation posture is visible up front, so a pilot doesn't turn into a procurement surprise."
          />
          <ProofPanel items={signoff} />
          <p className="mt-6 text-center text-sm text-text-secondary">
            Have a security or procurement review coming up?{' '}
            <Link href="/contact" className="font-semibold text-accent hover:text-accent-soft focus-ring">
              Talk to our team
            </Link>{' '}
            and we&apos;ll walk through our data handling and controls. Comparing options first?{' '}
            <Link href="/compare" className="font-semibold text-accent hover:text-accent-soft focus-ring">
              See how EdPilot compares
            </Link>
            .
          </p>
        </Container>
      </Section>

      <CTABand
        title="Give your campus a governed path to AI."
        description="Book a walkthrough for university leadership, or start a professor-led pilot on real course materials — no commitment required."
        actions={[
          { label: 'Book University Demo', href: '/contact' },
          { label: 'Start a Professor Pilot', href: SIGN_UP_URL, variant: 'secondary' },
        ]}
      />
    </PageShell>
  )
}
