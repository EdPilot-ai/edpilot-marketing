import Link from 'next/link'
import {
  AlertCircle,
  ChevronRight,
  Database,
  Eye,
  FileText,
  Lock,
  Mail,
  Shield,
  Users,
} from 'lucide-react'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Container, PageHeader } from '@/components/marketing'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'EdPilot privacy policy — what we collect, how we protect it, and how FERPA-aligned data handling works in practice.',
}

const LAST_UPDATED = 'March 21, 2026'

function LegalSection({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string
  icon?: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className="w-5 h-5 text-accent flex-shrink-0" aria-hidden="true" />}
        <h2 className="text-xl font-semibold text-text-primary tracking-[-0.015em]">{title}</h2>
      </div>
      <div className="space-y-4 text-[14px] text-text-secondary leading-relaxed">{children}</div>
    </section>
  )
}

function FieldGrid({
  items,
}: {
  items: { label: string; value: string }[]
}) {
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-border-gray bg-bg-surface p-4 text-center"
        >
          <p className="text-[11px] uppercase tracking-widest text-text-secondary/70 mb-1.5">
            {item.label}
          </p>
          <p className="text-base font-semibold text-text-primary">{item.value}</p>
        </div>
      ))}
    </div>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        meta={`Last updated: ${LAST_UPDATED}`}
      />

      <Container size="lg" className="py-14 space-y-12">
        <LegalSection id="introduction" title="Introduction">
          <p>
            EdPilot, Inc. (“we,” “our,” or “us”) operates an AI-powered educational platform that
            gives students a course-specific AI Teaching Assistant and gives professors the tools
            to manage, distribute, and track their curriculum.
          </p>
          <p>
            This Privacy Policy explains what personal information we collect when you use EdPilot,
            how we use and protect that information, and what choices you have. It applies to all
            users — students, professors, and demo visitors.
          </p>
          <p>
            By accessing or using EdPilot you agree to this policy. If you do not agree, please
            stop using the platform.
          </p>
        </LegalSection>

        <LegalSection id="what-we-collect" icon={Database} title="Information we collect">
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary mb-1.5">Account information</h3>
            <p>
              When you register we collect your name, email address, encrypted password, role
              (student or professor), and institutional affiliation. Professors may provide
              additional verification during the approval process.
            </p>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary mb-1.5">Academic content</h3>
            <p>
              Professors upload course materials — syllabi, lecture slides, assignments, and
              practice exams — which form the knowledge base for each course’s AI Teaching
              Assistant. Students generate content through their interactions with the assistant.
            </p>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary mb-1.5">Platform usage data</h3>
            <p>
              We log how you interact with EdPilot: features accessed, time on platform, chat
              session history, practice attempts, and message frequency. This data drives the
              engagement analytics professors see in their dashboard.
            </p>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary mb-1.5">Technical information</h3>
            <p>
              We collect IP addresses, browser type, device identifiers, operating system, and
              access timestamps to maintain platform security and optimize performance.
            </p>
          </div>
        </LegalSection>

        <LegalSection id="how-we-use" icon={Eye} title="How we use your information">
          {[
            {
              title: 'Deliver the AI Teaching Assistant',
              desc: 'Your enrollment and the materials your professor uploaded let us scope the AI to your specific curriculum — no generic web results.',
            },
            {
              title: 'Personalized learning',
              desc: 'Usage patterns power the learning profile dashboard: study streak, accuracy trends, topic strengths, and Socratic-mode recommendations.',
            },
            {
              title: 'Professor analytics',
              desc: 'Aggregated, course-level engagement data gives professors visibility into class-wide learning trends.',
            },
            {
              title: 'Platform communications',
              desc: 'We send account verification, course invitation, and important security emails. Non-essential communications can be opted out of in your account settings.',
            },
            {
              title: 'Academic integrity monitoring',
              desc: 'We flag unusual usage patterns in the professor analytics dashboard. This supports — not replaces — human academic integrity review.',
            },
            {
              title: 'Platform improvement',
              desc: 'Aggregated, anonymized data helps us improve AI response quality and develop new features. Individual conversations are never used to train public AI models.',
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-[14px] font-semibold text-text-primary mb-1">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </LegalSection>

        <LegalSection id="storage-security" icon={Lock} title="Storage & security">
          <FieldGrid
            items={[
              { label: 'In transit', value: 'TLS 1.3' },
              { label: 'At rest', value: 'AES-256' },
              { label: 'Infrastructure', value: 'AWS (US)' },
            ]}
          />
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary mb-1.5">
              Role-based access controls
            </h3>
            <p>
              Students can only access courses they’re enrolled in. Professors can only manage
              their own courses and see data from enrolled students. Administrative access is
              limited to essential personnel.
            </p>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary mb-1.5">AI processing</h3>
            <p>
              AI interactions are processed through Amazon Bedrock using Anthropic’s Claude models.
              Each course has an isolated knowledge base — responses draw only from materials
              uploaded by that course’s professor. Your conversations are{' '}
              <strong className="text-text-primary">never used to train public AI models</strong>.
            </p>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary mb-1.5">Data retention</h3>
            <p>
              Active course data is retained while the course is in session. After account deletion,
              all personal data is permanently removed within 30 days unless retention is required
              by law or institutional policy. Demo account data is retained for 90 days then
              automatically purged.
            </p>
          </div>
        </LegalSection>

        <LegalSection id="ferpa" icon={Shield} title="Student data protection (FERPA)">
          <p>
            EdPilot is designed to help educational institutions maintain compliance with the
            Family Educational Rights and Privacy Act (FERPA). Student education records are
            treated with strict confidentiality.
          </p>
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary mb-1.5">Strict data segregation</h3>
            <p>
              Student data is isolated at the course level. Professors see only enrolled students.
              Students see only enrolled courses. No cross-course data sharing without explicit
              consent.
            </p>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary mb-1.5">Institutional agreements</h3>
            <p>
              When partnering with educational institutions we operate within existing data
              governance frameworks and can execute Data Protection Agreements (DPAs) and Business
              Associate Agreements (BAAs) as required.
            </p>
          </div>
        </LegalSection>

        <LegalSection id="third-parties" icon={Users} title="Third-party services">
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary mb-3">
              AWS infrastructure we rely on
            </h3>
            <ul className="space-y-2">
              {[
                { service: 'AWS Cognito', purpose: 'User authentication & account management' },
                { service: 'AWS DynamoDB', purpose: 'Database — accounts, courses, sessions' },
                { service: 'AWS S3', purpose: 'Secure file storage for course materials' },
                { service: 'AWS Bedrock', purpose: 'AI model hosting (Anthropic Claude)' },
                { service: 'AWS SES', purpose: 'Transactional email delivery' },
              ].map((item) => (
                <li key={item.service} className="flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-accent mt-1 flex-shrink-0" />
                  <span>
                    <span className="font-semibold text-text-primary">{item.service}:</span>{' '}
                    {item.purpose}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border-gray bg-bg-surface p-4">
            <p className="font-semibold text-text-primary mb-1">We do not sell your data. Ever.</p>
            <p>
              We never sell, rent, or trade your personal information or educational data to third
              parties for marketing, advertising, or any other commercial purpose.
            </p>
          </div>
        </LegalSection>

        <LegalSection id="your-rights" icon={FileText} title="Your rights & controls">
          <ul className="space-y-3">
            {[
              {
                title: 'Access your data',
                desc: 'View your account information, course enrollments, and AI chat history at any time through your dashboard.',
              },
              {
                title: 'Correct your information',
                desc: 'Update your profile, email address, or account settings directly from your account page.',
              },
              {
                title: 'Delete your account',
                desc: 'Email privacy@edpilot.ai to request account deletion. All personal data is permanently removed within 30 days.',
              },
              {
                title: 'Export your data',
                desc: 'Request a copy of your data in JSON or CSV format by contacting support@edpilot.ai.',
              },
              {
                title: 'Opt out of emails',
                desc: 'Non-essential email communications can be disabled in your account settings. Security and verification emails cannot be disabled.',
              },
            ].map((item) => (
              <li key={item.title}>
                <span className="font-semibold text-text-primary">{item.title}.</span> {item.desc}
              </li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection id="children" icon={AlertCircle} title="Children’s privacy">
          <p>
            EdPilot is built for higher education — college and university students, typically 18
            years or older. We do not knowingly collect personal information from anyone under 13.
          </p>
          <p>
            If we discover that we have inadvertently collected data from a child under 13 without
            verifiable parental consent, we will delete it from our systems immediately.
          </p>
        </LegalSection>

        <LegalSection id="changes" title="Policy changes">
          <p>
            We may update this Privacy Policy to reflect changes in our practices, technology, or
            legal requirements. When we do, we’ll update the “Last updated” date at the top of this
            page.
          </p>
          <p>
            For material changes that affect your rights, we’ll also send an email notification to
            all registered users. We encourage you to review this page periodically.
          </p>
        </LegalSection>

        <LegalSection id="contact" icon={Mail} title="Questions about this policy?">
          <div className="space-y-2 mb-6">
            <p>
              <span className="font-medium text-text-primary">Privacy inquiries:</span>{' '}
              <a href="mailto:privacy@edpilot.ai" className="text-accent hover:underline">
                privacy@edpilot.ai
              </a>
            </p>
            <p>
              <span className="font-medium text-text-primary">General support:</span>{' '}
              <a href="mailto:support@edpilot.ai" className="text-accent hover:underline">
                support@edpilot.ai
              </a>
            </p>
          </div>
          <Link href="/contact">
            <Button>Contact us</Button>
          </Link>
        </LegalSection>
      </Container>
    </>
  )
}
