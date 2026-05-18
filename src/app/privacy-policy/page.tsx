'use client'

import {
  Shield,
  Lock,
  Eye,
  Users,
  Database,
  FileText,
  Mail,
  AlertCircle,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Container, Hero, PageShell, Section } from '@/components/marketing'
import { SUPPORT_EMAIL } from '@/lib/marketing'

const LAST_UPDATED = 'March 21, 2026'

export default function PrivacyPolicyPage() {
  return (
    <PageShell>

      {/* ── Page Header ── */}
      <Hero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${LAST_UPDATED}`}
        className="pb-12 md:pb-16"
      />

      {/* ── Body ── */}
      <Section className="py-14 md:py-20">
        <Container size="narrow" className="space-y-10">

        {/* Introduction */}
        <section
          id="introduction"
        >
          <h2 className="text-xl font-bold text-text-primary mb-4">Introduction</h2>
          <div className="text-text-secondary space-y-3 leading-relaxed text-sm">
            <p>
              EdPilot, Inc. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates an AI-powered educational platform that gives students a course-specific AI Teaching Assistant and gives professors the tools to manage, distribute, and track their curriculum.
            </p>
            <p>
              This Privacy Policy explains what personal information we collect when you use EdPilot, how we use and protect that information, and what choices you have. It applies to all users — students, professors, and demo visitors.
            </p>
            <p>
              By accessing or using EdPilot you agree to this policy. If you do not agree, please stop using the platform.
            </p>
          </div>
        </section>

        {/* What We Collect */}
        <section
          id="what-we-collect"
        >
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Information we collect</h2>
          </div>

          <div className="space-y-5 text-sm text-text-secondary">
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Account information</h3>
              <p className="leading-relaxed">
                When you register we collect your name, email address, encrypted password, role (student or professor), and institutional affiliation. Professors may provide additional verification during the approval process.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Academic content</h3>
              <p className="leading-relaxed">
                Professors upload course materials — syllabi, lecture slides, assignments, and practice exams — which form the knowledge base for each course&apos;s AI Teaching Assistant. Students generate content through their interactions with the assistant: questions asked, responses received, and study sessions created.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Platform usage data</h3>
              <p className="leading-relaxed">
                We log how you interact with EdPilot: features accessed, time on platform, chat session history, practice quiz attempts, course enrollments, and message frequency. This data drives the engagement analytics professors see in their dashboard.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Technical information</h3>
              <p className="leading-relaxed">
                We collect IP addresses, browser type, device identifiers, operating system, and access timestamps to maintain platform security and optimize performance.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-border-gray" />

        {/* How We Use It */}
        <section
          id="how-we-use"
        >
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">How we use your information</h2>
          </div>

          <div className="space-y-4 text-sm text-text-secondary">
            {[
              {
                title: 'Deliver the AI Teaching Assistant',
                desc: 'Your course enrollment and the materials your professor uploaded let us scope the AI to your specific curriculum — no generic web results.',
              },
              {
                title: 'Personalized learning',
                desc: 'Usage patterns power the learning profile dashboard: study streak, accuracy trends, topic strengths, and Socratic-mode recommendations.',
              },
              {
                title: 'Professor analytics',
                desc: 'Aggregated, course-level engagement data (messages sent, session length, practice performance) gives professors visibility into class-wide learning trends.',
              },
              {
                title: 'Platform communications',
                desc: 'We send account verification, course invitation, and important security emails. Non-essential communications can be opted out of in your account settings.',
              },
              {
                title: 'Academic integrity monitoring',
                desc: 'We flag unusual usage patterns (e.g., high-volume prompting around exam windows) in the professor analytics dashboard. This supports — not replaces — human academic integrity review.',
              },
              {
                title: 'Platform improvement',
                desc: 'Aggregated, anonymized data helps us improve AI response quality, develop new features, and fix bugs. Individual conversations are never used to train public AI models.',
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-semibold text-text-primary mb-1">{item.title}</h3>
                <p className="leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Storage & Security */}
        <section
          id="storage-security"
        >
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Storage &amp; security</h2>
          </div>

          <div className="space-y-5 text-sm text-text-secondary">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'In transit', value: 'TLS 1.3' },
                { label: 'At rest', value: 'AES-256' },
                { label: 'Infrastructure', value: 'AWS (US)' },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-lg border border-border-gray bg-bg-surface text-center">
                  <p className="text-xs text-text-secondary/60 mb-1">{item.label}</p>
                  <p className="text-base font-bold text-text-primary">{item.value}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Role-based access controls</h3>
              <p className="leading-relaxed">
                Students can only access courses they&apos;re enrolled in. Professors can only manage their own courses and see data from enrolled students. Administrative access is limited to essential personnel.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">AI processing</h3>
              <p className="leading-relaxed">
                AI interactions are processed through Amazon Bedrock using Anthropic&apos;s Claude models. Each course has an isolated knowledge base — responses draw only from materials uploaded by that course&apos;s professor. Your conversations are <strong className="text-text-primary">never used to train public AI models</strong>.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Data retention</h3>
              <p className="leading-relaxed">
                Active course data is retained while the course is in session. After account deletion, all personal data is permanently removed within 30 days unless retention is required by law or institutional policy. Demo account data is retained for 90 days then automatically purged.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* FERPA */}
        <section
          id="ferpa"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Student data protection (FERPA)</h2>
          </div>

          <div className="space-y-4 text-sm text-text-secondary">
            <p className="leading-relaxed">
              EdPilot is designed to help educational institutions maintain compliance with the Family Educational Rights and Privacy Act (FERPA). Student education records are treated with strict confidentiality.
            </p>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Strict data segregation</h3>
              <p className="leading-relaxed">
                Student data is isolated at the course level. Professors see only enrolled students. Students see only enrolled courses. No cross-course data sharing occurs without explicit consent.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Institutional agreements</h3>
              <p className="leading-relaxed">
                When partnering with educational institutions we operate within existing data governance frameworks and can execute Data Protection Agreements (DPAs) and Business Associate Agreements (BAAs) as required.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Demo accounts</h3>
              <p className="leading-relaxed">
                Demo accounts provide limited functionality (10 AI message quota) with access only to pre-configured sample materials. Demo usage is anonymized before any aggregation for platform improvement.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Third-Party Services */}
        <section
          id="third-parties"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Third-party services</h2>
          </div>

          <div className="space-y-5 text-sm text-text-secondary">
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">AWS infrastructure we rely on</h3>
              <ul className="space-y-2">
                {[
                  { service: 'AWS Cognito', purpose: 'User authentication & account management' },
                  { service: 'AWS DynamoDB', purpose: 'Database — accounts, courses, sessions' },
                  { service: 'AWS S3', purpose: 'Secure file storage for course materials' },
                  { service: 'AWS Bedrock', purpose: 'AI model hosting (Anthropic Claude)' },
                  { service: 'AWS SES', purpose: 'Transactional email delivery' },
                ].map((item) => (
                  <li key={item.service} className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                    <span>
                      <span className="font-semibold text-text-primary">{item.service}:</span>{' '}
                      {item.purpose}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border-gray bg-bg-surface">
              <p className="font-semibold text-text-primary mb-1">We do not sell your data. Ever.</p>
              <p className="leading-relaxed">
                We never sell, rent, or trade your personal information or educational data to third parties for marketing, advertising, or any other commercial purpose.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Your Rights */}
        <section
          id="your-rights"
        >
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Your rights &amp; controls</h2>
          </div>

          <ul className="space-y-4 text-sm text-text-secondary">
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
                desc: `Email ${SUPPORT_EMAIL} to request account deletion. All personal data is permanently removed within 30 days.`,
              },
              {
                title: 'Export your data',
                desc: `Request a copy of your data in JSON or CSV format by contacting ${SUPPORT_EMAIL}.`,
              },
              {
                title: 'Opt out of emails',
                desc: 'Non-essential email communications can be disabled in your account settings. Security and verification emails cannot be disabled.',
              },
            ].map((item) => (
              <li key={item.title}>
                <span className="font-semibold text-text-primary">{item.title}:</span>{' '}
                <span className="leading-relaxed">{item.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <hr className="border-border-gray" />

        {/* Children's Privacy */}
        <section
          id="children"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Children&apos;s privacy</h2>
          </div>
          <div className="text-sm text-text-secondary space-y-3 leading-relaxed">
            <p>
              EdPilot is built for higher education — college and university students, typically 18 years or older. We do not knowingly collect personal information from anyone under 13.
            </p>
            <p>
              If we discover that we have inadvertently collected data from a child under 13 without verifiable parental consent, we will delete it from our systems immediately.
            </p>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Policy Changes */}
        <section
          id="changes"
        >
          <h2 className="text-xl font-bold text-text-primary mb-4">Policy changes</h2>
          <div className="text-sm text-text-secondary space-y-3 leading-relaxed">
            <p>
              We may update this Privacy Policy to reflect changes in our practices, technology, or legal requirements. When we do, we&apos;ll update the &quot;Last Updated&quot; date at the top of this page.
            </p>
            <p>
              For material changes that affect your rights we&apos;ll also send an email notification to all registered users. We encourage you to review this page periodically.
            </p>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Contact */}
        <section
          id="contact"
        >
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Questions about this policy?</h2>
          </div>
          <div className="text-sm text-text-secondary space-y-2 mb-6">
            <p>
              <span className="font-medium text-text-primary">Privacy inquiries:</span>{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-accent hover:underline">{SUPPORT_EMAIL}</a>
            </p>
            <p>
              <span className="font-medium text-text-primary">General support:</span>{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-accent hover:underline">{SUPPORT_EMAIL}</a>
            </p>
          </div>
          <Button asChild className="bg-accent hover:bg-accent-hover text-white px-6">
            <Link href="/contact">
              Contact Us
            </Link>
          </Button>
        </section>

        </Container>
      </Section>

      <Footer />
    </PageShell>
  )
}
