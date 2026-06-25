import type { Metadata } from 'next'
import {
  Accessibility,
  Database,
  FileText,
  KeyRound,
  Lock,
  Mail,
  ServerCog,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'
import { BreadcrumbSchema } from '@/components/StructuredData'
import {
  CTABand,
  Container,
  Hero,
  IconChip,
  PageShell,
  Section,
  SectionHeader,
  StatusPill,
} from '@/components/marketing'
import { SECURITY_EMAIL } from '@/lib/marketing'

export const metadata: Metadata = {
  title: 'Security & Trust — Data handling, privacy, and institutional review',
  description:
    'EdPilot’s security and privacy posture for higher education: FERPA-aligned data handling, institution-bound data boundaries, encryption, access controls, and accessibility. An honest view of what is live today and what is on the roadmap.',
  keywords:
    'EdPilot security, FERPA AI, higher education data privacy, student data protection, VPAT, SOC 2, data processing agreement, AI procurement security',
}

type Posture = {
  icon: typeof Lock
  title: string
  detail: string
  status: 'live' | 'beta' | 'planned'
  statusLabel: string
}

const dataPosture: Posture[] = [
  {
    icon: Lock,
    title: 'FERPA-aligned data handling',
    detail:
      'EdPilot is designed around FERPA-aligned handling of course and student data, with institutional access controls.',
    status: 'live',
    statusLabel: 'In place',
  },
  {
    icon: Database,
    title: 'Institution-bound data boundaries',
    detail:
      'Course materials, student interactions, and deployments are scoped by institution and course. Nothing crosses those boundaries without authorization.',
    status: 'live',
    statusLabel: 'In place',
  },
  {
    icon: ShieldCheck,
    title: 'No training of public models on student data',
    detail:
      'Student records and course content are not used to train public, general-purpose models.',
    status: 'live',
    statusLabel: 'In place',
  },
  {
    icon: KeyRound,
    title: 'Encryption in transit and at rest',
    detail: 'Data is encrypted in transit and at rest using industry-standard mechanisms.',
    status: 'live',
    statusLabel: 'In place',
  },
]

const accessPosture: Posture[] = [
  {
    icon: UserCheck,
    title: 'Institution-verified access',
    detail:
      'Institutions are verified before a workspace goes live, and an admin approves who joins — no open self-enrollment into your workspace.',
    status: 'live',
    statusLabel: 'In place',
  },
  {
    icon: ShieldCheck,
    title: 'Faculty-governed course access',
    detail:
      'Professors decide what each course assistant can see and how it behaves. Access follows the course boundary.',
    status: 'live',
    statusLabel: 'In place',
  },
  {
    icon: KeyRound,
    title: 'SSO / institutional identity',
    detail:
      'Single sign-on and deeper identity integration for institutional rollouts.',
    status: 'planned',
    statusLabel: 'On the roadmap',
  },
]

const compliancePosture: Posture[] = [
  {
    icon: Accessibility,
    title: 'Accessibility (WCAG / ADA)',
    detail:
      'Interaction patterns and content flows are designed against WCAG guidance. A formal VPAT/accessibility conformance report is in progress.',
    status: 'beta',
    statusLabel: 'In progress',
  },
  {
    icon: FileText,
    title: 'Data Processing Agreement (DPA)',
    detail:
      'A DPA and data-handling documentation are available to institutions in procurement — reach out and we’ll share current versions.',
    status: 'beta',
    statusLabel: 'Available on request',
  },
  {
    icon: ServerCog,
    title: 'SOC 2 / formal audits',
    detail:
      'We are an early-stage company and are not yet SOC 2 certified. Formal third-party audits are on our roadmap; we’re happy to walk your security team through our current controls.',
    status: 'planned',
    statusLabel: 'Not yet — on the roadmap',
  },
]

function PostureGrid({ items }: { items: Posture[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex h-full flex-col rounded-lg border border-border-gray bg-bg-surface p-5 md:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <IconChip icon={item.icon} className="h-10 w-10" />
            <StatusPill tone={item.status}>{item.statusLabel}</StatusPill>
          </div>
          <h3 className="mt-5 text-base font-semibold tracking-[-0.01em] text-text-primary">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-text-secondary">{item.detail}</p>
        </div>
      ))}
    </div>
  )
}

export default function SecurityPage() {
  const breadcrumbItems = [
    { name: 'EdPilot', url: 'https://edpilot.ai' },
    { name: 'Security & Trust', url: 'https://edpilot.ai/security' },
  ]

  return (
    <PageShell>
      <BreadcrumbSchema items={breadcrumbItems} />

      <Hero
        eyebrow="Security & Trust"
        title="Built for institutional review."
        description="An honest, up-to-date view of how EdPilot handles your data — what is in place today and what is on the roadmap — so IT, legal, and procurement can evaluate us without guesswork."
        actions={[
          { label: 'Contact Security', href: `mailto:${SECURITY_EMAIL}` },
          { label: 'Talk to Our Team', href: '/contact', variant: 'secondary' },
        ]}
        className="pb-12 md:pb-16"
      />

      <Section className="py-12" surface="panel">
        <Container size="narrow" className="text-center">
          <p className="text-sm leading-7 text-text-secondary">
            EdPilot is an early-stage company building for higher education. We’d rather show you
            exactly where we are than overclaim. Below is our current posture, labeled honestly.
            For anything not covered here, email{' '}
            <a
              href={`mailto:${SECURITY_EMAIL}`}
              className="font-semibold text-accent hover:text-[#A78BFA] focus-ring"
            >
              {SECURITY_EMAIL}
            </a>
            .
          </p>
        </Container>
      </Section>

      <Section className="py-20 md:py-24">
        <Container size="wide">
          <SectionHeader
            align="left"
            eyebrow="Data & privacy"
            title="How student and course data is handled."
          />
          <PostureGrid items={dataPosture} />
        </Container>
      </Section>

      <Section className="py-20 md:py-24" surface="panel">
        <Container size="wide">
          <SectionHeader
            align="left"
            eyebrow="Access & governance"
            title="Who can get in, and who controls what."
          />
          <PostureGrid items={accessPosture} />
        </Container>
      </Section>

      <Section className="py-20 md:py-24">
        <Container size="wide">
          <SectionHeader
            align="left"
            eyebrow="Compliance & accessibility"
            title="Where we are — and where we’re headed."
            description="We label these honestly. Certifications we don’t hold yet are marked as such."
          />
          <PostureGrid items={compliancePosture} />
        </Container>
      </Section>

      <Section className="py-16" surface="deep">
        <Container size="narrow">
          <div className="flex flex-col items-start gap-5 rounded-lg border border-border-gray bg-bg-surface p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div className="flex items-start gap-4">
              <IconChip icon={Mail} className="h-10 w-10" />
              <div>
                <h2 className="text-base font-semibold text-text-primary">
                  Security or procurement questions?
                </h2>
                <p className="mt-1 text-sm leading-6 text-text-secondary">
                  We’ll route your team to the right documentation and walk through our controls.
                </p>
              </div>
            </div>
            <a
              href={`mailto:${SECURITY_EMAIL}`}
              className="shrink-0 rounded-lg border border-border-strong bg-transparent px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-accent/45 hover:bg-accent/10 hover:text-accent focus-ring"
            >
              {SECURITY_EMAIL}
            </a>
          </div>
        </Container>
      </Section>

      <CTABand
        title="Bring EdPilot to your security review."
        description="We’re happy to meet your IT, legal, and privacy teams where they are — with honest answers and current documentation."
        actions={[
          { label: 'Talk to Our Team', href: '/contact' },
          { label: 'Read the FAQ', href: '/faq', variant: 'secondary' },
        ]}
      />
    </PageShell>
  )
}
