import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { BreadcrumbSchema } from '@/components/StructuredData'
import { Button } from '@/components/ui/button'
import {
  Badge,
  CTABand,
  Container,
  Hero,
  MarketingCard,
  PageShell,
  Section,
  SectionHeader,
} from '@/components/marketing'
import { SIGN_UP_URL } from '@/lib/marketing'

export const metadata: Metadata = {
  title: 'Pricing — Free professor pilots, institutional pricing by size',
  description:
    'EdPilot pricing is built for adoption: students and professor pilots start free, and institutions get pricing scaled to their size. No upfront commitment — add courses and faculty as adoption grows.',
  keywords:
    'EdPilot pricing, higher education AI pricing, university AI cost, free professor pilot, institutional AI pricing',
}

type Tier = {
  name: string
  price: string
  cadence?: string
  audience: string
  description: string
  features: string[]
  cta: { label: string; href: string }
  featured?: boolean
}

const tiers: Tier[] = [
  {
    name: 'Professor Pilot',
    price: 'Free',
    audience: 'For individual faculty',
    description:
      'Spin up your course on real materials, set the guardrails, and see where students get stuck — no procurement, no commitment.',
    features: [
      'Upload your syllabus, slides, and readings',
      'Set integrity rules and the knowledge boundary',
      'Student question & confusion analytics',
      'Direct upload today; Canvas/LMS workflow support in progress',
    ],
    cta: { label: 'Start a Free Pilot', href: SIGN_UP_URL },
    featured: true,
  },
  {
    name: 'Institution',
    price: 'Custom',
    cadence: 'scaled to your size',
    audience: 'For departments & universities',
    description:
      'Roll out across courses with admin controls, governance, and the procurement support your institution needs.',
    features: [
      'Admin dashboard & adoption visibility',
      'Institution-wide governance & data boundaries',
      'SSO and deeper LMS integration (roadmap)',
      'Security, accessibility & procurement support',
    ],
    cta: { label: 'Talk to Our Team', href: '/contact' },
  },
  {
    name: 'Students',
    price: 'Free',
    audience: 'For students in an EdPilot course',
    description:
      'Course-grounded help with citations — available to every student whose professor runs EdPilot.',
    features: [
      'Ask questions grounded in the actual course',
      'See the sources behind every answer',
      'Practice prompts and hints, never finished work',
      'No cost, ever, for students',
    ],
    cta: { label: 'Join Your Class', href: SIGN_UP_URL },
  },
]

export default function PricingPage() {
  const breadcrumbItems = [
    { name: 'EdPilot', url: 'https://edpilot.ai' },
    { name: 'Pricing', url: 'https://edpilot.ai/pricing' },
  ]

  return (
    <PageShell>
      <BreadcrumbSchema items={breadcrumbItems} />

      <Hero
        eyebrow="Pricing"
        title="Starts free."
        accent="Scales with your institution."
        description="EdPilot is priced for adoption, not gatekeeping. Students and professor pilots are free. Institutions pay based on size — with no upfront commitment to find out if it works."
        actions={[
          { label: 'Start a Free Pilot', href: SIGN_UP_URL },
          { label: 'Talk to Our Team', href: '/contact', variant: 'secondary' },
        ]}
        className="pb-12 md:pb-16"
      />

      <Section className="py-16 md:py-20">
        <Container size="wide">
          <div className="grid items-stretch gap-4 lg:grid-cols-3">
            {tiers.map((tier) => (
              <MarketingCard
                key={tier.name}
                featured={tier.featured}
                className="flex h-full flex-col p-6 md:p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                    {tier.name}
                  </h2>
                  {tier.featured && (
                    <Badge className="border-accent/20 tracking-[0.12em]">Most popular</Badge>
                  )}
                </div>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-[-0.03em] text-text-primary">
                    {tier.price}
                  </span>
                  {tier.cadence && (
                    <span className="text-sm text-text-tertiary">{tier.cadence}</span>
                  )}
                </div>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary">
                  {tier.audience}
                </p>
                <p className="mt-4 text-sm leading-7 text-text-secondary">{tier.description}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6 text-text-secondary">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={tier.featured ? 'default' : 'outline'}
                  className="mt-7 w-full"
                >
                  <Link href={tier.cta.href}>
                    {tier.cta.label}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </MarketingCard>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-7 text-text-secondary">
            Institutional pricing scales with the number of courses and faculty — start with a pilot
            and grow as adoption does. We’ll put real numbers in front of you once we understand your
            scope; there’s no upfront commitment to evaluate EdPilot.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-7 text-text-secondary">
            Need to see what is included first?{' '}
            <Link href="/products" className="font-semibold text-accent hover:text-accent-soft focus-ring">
              Explore Products
            </Link>
            . Need the rollout sequence?{' '}
            <Link href="/how-it-works" className="font-semibold text-accent hover:text-accent-soft focus-ring">
              See How It Works
            </Link>
            .
          </p>
        </Container>
      </Section>

      <Section className="py-16 md:py-20" surface="panel">
        <Container>
          <SectionHeader
            eyebrow="How institutional pricing works"
            title="No surprises, no shelfware."
            description="You only scale up once a pilot proves the value. Pricing follows real adoption — courses and faculty actually using the assistant — not a seat count you have to predict in advance."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Pilot for free',
                detail: 'Faculty test EdPilot on real course materials at no cost and with no contract.',
              },
              {
                step: '02',
                title: 'Scope the rollout',
                detail: 'We size pricing to your courses, faculty, and the controls your institution needs.',
              },
              {
                step: '03',
                title: 'Grow as adoption grows',
                detail: 'Add departments and courses over time — you’re never paying ahead of usage.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-lg border border-border-gray bg-bg-deep p-5 md:p-6"
              >
                <span className="text-xs font-bold text-text-tertiary">{item.step}</span>
                <h3 className="mt-4 text-sm font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-text-secondary">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-text-secondary">
            If your team is comparing EdPilot with general AI, LMS-native AI, or a custom build,{' '}
            <Link href="/compare" className="font-semibold text-accent hover:text-accent-soft focus-ring">
              review the comparisons
            </Link>
            .
          </p>
        </Container>
      </Section>

      <CTABand
        title="Find out what EdPilot would cost your campus."
        description="Start a free professor pilot today, or talk to our team about an institutional rollout and we’ll scope pricing to your scale."
        actions={[
          { label: 'Start a Free Pilot', href: SIGN_UP_URL },
          { label: 'Talk to Our Team', href: '/contact', variant: 'secondary' },
        ]}
      />
    </PageShell>
  )
}
