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
  Bot,
  MapPin,
  Globe,
  Bell,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container, Hero, PageShell, Section } from '@/components/marketing'
import { SUPPORT_EMAIL, LEGAL_EMAIL, SECURITY_EMAIL } from '@/lib/marketing'

const LAST_UPDATED = 'May 18, 2026'
const VERSION = 'v2.1'

export default function PrivacyPolicyPage() {
  return (
    <PageShell>

      {/* ── Page Header ── */}
      <Hero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${LAST_UPDATED} · ${VERSION}`}
        className="pb-12 md:pb-16"
      />

      {/* ── Body ── */}
      <Section className="py-14 md:py-20">
        <Container size="narrow" className="space-y-10">

        {/* Introduction */}
        <section id="introduction">
          <h2 className="text-xl font-bold text-text-primary mb-4">Introduction</h2>
          <div className="text-text-secondary space-y-3 leading-relaxed text-sm">
            <p>
              EdPilot, Inc. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates an AI-powered educational platform that
              gives students a course-specific AI Teaching Assistant and gives professors the tools to
              manage, distribute, and track their curriculum.
            </p>
            <p>
              This Privacy Policy explains what personal information we collect when you use EdPilot,
              how we use and protect that information, and what choices you have. It applies to all
              users — students, professors, and demo visitors.
            </p>
            <p>
              By accessing or using EdPilot you agree to this policy. If you do not agree, please stop
              using the platform.
            </p>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* What We Collect */}
        <section id="what-we-collect">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Information we collect</h2>
          </div>

          <div className="space-y-5 text-sm text-text-secondary">
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Account information</h3>
              <p className="leading-relaxed">
                When you register we collect your name, email address, encrypted password, role
                (student or professor), and institutional affiliation. Professors may provide
                additional verification during the approval process.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Academic content</h3>
              <p className="leading-relaxed">
                Professors upload course materials — syllabi, lecture slides, assignments, and practice
                exams — which form the knowledge base for each course&apos;s AI Teaching Assistant.
                Students generate content through their interactions with the assistant: questions
                asked, responses received, and study sessions created.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">LTI launch data</h3>
              <p className="leading-relaxed">
                When you access EdPilot through an LMS integration (Canvas, Blackboard, Moodle, etc.),
                we receive a signed LTI launch payload from your institution. This payload includes
                your institution-assigned user ID, course context ID, role (student or instructor),
                LMS platform identifier, and — where enabled — NRPS roster data and AGS grade
                passback configuration. This data is processed exclusively to authenticate you,
                provision your account, and scope the correct course context. LTI launch data is
                treated as student education records under FERPA.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Platform usage data</h3>
              <p className="leading-relaxed">
                We log how you interact with EdPilot: features accessed, time on platform, chat
                session history, practice quiz attempts, course enrollments, and message frequency.
                This data drives the engagement analytics professors see in their dashboard.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Session tokens</h3>
              <p className="leading-relaxed">
                EdPilot uses server-side session tokens (stored in HTTP-only, Secure cookies) solely
                to authenticate your logged-in session. We do not use third-party advertising cookies,
                behavioral tracking pixels, or cross-site tracking technologies. We do not use Google
                Analytics or any advertising network.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Technical information</h3>
              <p className="leading-relaxed">
                We collect IP addresses, browser type, device identifiers, operating system, and
                access timestamps to maintain platform security and optimize performance.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* How We Use It */}
        <section id="how-we-use">
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
                desc: 'Aggregated, anonymized data helps us improve AI response quality and develop new features. Individual conversations are never used to train AI models.',
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

        {/* FERPA */}
        <section id="ferpa">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">FERPA and educational records</h2>
          </div>

          <div className="space-y-4 text-sm text-text-secondary">
            <p className="leading-relaxed">
              EdPilot is subject to the Family Educational Rights and Privacy Act (FERPA),
              20 U.S.C. § 1232g, with respect to student education records maintained on behalf of
              educational institutions.
            </p>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">What counts as an education record in EdPilot</h3>
              <p className="leading-relaxed">
                Student chat history within a course, help request submissions, engagement analytics
                associated with a named student, LTI launch data, and any documents a student uploads
                to a course.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Who can access student education records</h3>
              <ul className="space-y-2">
                {[
                  'The student themselves (via their account)',
                  'Professors and TAs enrolled in the same course, for the purpose of supporting learning',
                  "Authorized administrators of the student's institution",
                  'EdPilot personnel, only as needed to operate and support the Services',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 leading-relaxed">
                    <ChevronRight className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">What we do NOT do with education records</h3>
              <ul className="space-y-2">
                {[
                  'Share student education records with third parties for commercial purposes',
                  'Use student education records to train AI models',
                  'Disclose student records to parents (unless the student is a dependent minor and the institution has authorized disclosure)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 leading-relaxed">
                    <ChevronRight className="w-3.5 h-3.5 text-status-danger mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="leading-relaxed">
              <span className="font-semibold text-text-primary">Your FERPA rights:</span> Students
              have the right to inspect their education records, request amendments to inaccurate
              records, and consent to disclosures not permitted by FERPA. Exercise these rights
              through your institution&apos;s registrar — EdPilot will respond to all valid institutional
              FERPA requests within five (5) business days.
            </p>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* AI Data Practices */}
        <section id="ai-data">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">How we use AI and what data AI systems see</h2>
          </div>

          <div className="space-y-5 text-sm text-text-secondary">
            <p className="leading-relaxed">
              When you interact with EdPilot&apos;s AI chat or ask for help, your message and relevant
              course context (syllabus excerpts, course documents, course description) are sent to AI
              model providers (Google Vertex AI and Anthropic) to generate a response.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border-gray bg-bg-surface p-4">
                <h3 className="text-sm font-semibold text-text-primary mb-3">What AI providers see ✓</h3>
                <ul className="space-y-2">
                  {[
                    'Your question or message text',
                    'Excerpts from course materials relevant to your question',
                    'Your selected course name and subject',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 leading-relaxed">
                      <ChevronRight className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-border-gray bg-bg-surface p-4">
                <h3 className="text-sm font-semibold text-text-primary mb-3">What AI providers do NOT see ✗</h3>
                <ul className="space-y-2">
                  {[
                    'Your full name or email address',
                    'Your grade history or performance data',
                    "Documents from other students",
                    "Content from other courses",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 leading-relaxed">
                    <ChevronRight className="w-3.5 h-3.5 text-status-danger mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border-gray bg-bg-surface">
              <p className="font-semibold text-text-primary mb-1">No training on your data. Ever.</p>
              <p className="leading-relaxed">
                Neither Google Vertex AI nor Anthropic use EdPilot API inputs or outputs to train
                their models. EdPilot does not use student conversation data to fine-tune any model.
                Conversation history is stored in EdPilot&apos;s database and is accessible to you and
                your course instructors.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Storage & Security */}
        <section id="storage-security">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Infrastructure &amp; security</h2>
          </div>

          <div className="space-y-5 text-sm text-text-secondary">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'In transit', value: 'TLS 1.2+' },
                { label: 'At rest', value: 'AES-256' },
                { label: 'Infrastructure', value: 'GCP (US)' },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-lg border border-border-gray bg-bg-surface text-center">
                  <p className="text-xs text-text-secondary/60 mb-1">{item.label}</p>
                  <p className="text-base font-bold text-text-primary">{item.value}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Google Cloud Platform sub-processors</h3>
              <ul className="space-y-2">
                {[
                  { service: 'Google Firebase', purpose: 'User authentication and real-time data' },
                  { service: 'Google Cloud Firestore', purpose: 'Database — accounts, courses, sessions' },
                  { service: 'Google Cloud Storage', purpose: 'Secure file storage for course materials' },
                  { service: 'Google Vertex AI', purpose: 'AI model inference and grounding' },
                  { service: 'Anthropic (Claude API)', purpose: 'Large language model responses' },
                  { service: 'Google BigQuery', purpose: 'Usage analytics and reporting' },
                  { service: 'Stripe', purpose: 'Payment processing and subscription management' },
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

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Role-based access controls</h3>
              <p className="leading-relaxed">
                Students can only access courses they&apos;re enrolled in. Professors can only manage
                their own courses and see data from enrolled students. Administrative access is
                limited to essential personnel.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">Data retention schedule</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border border-border-gray rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-bg-elevated">
                      <th className="text-left px-4 py-2.5 font-semibold text-text-primary border-b border-border-gray">Data type</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-text-primary border-b border-border-gray">Retention period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: 'Active course chat history', period: 'Duration of enrollment + 1 year' },
                      { type: 'LTI launch records', period: '90 days after last launch' },
                      { type: 'Usage analytics (aggregated)', period: '3 years' },
                      { type: 'Help request records', period: '2 years' },
                      { type: 'Account data after deletion', period: 'Deleted within 30 days' },
                      { type: 'Backup snapshots', period: 'Overwritten within 90 days' },
                      { type: 'Security / audit logs', period: '1 year' },
                    ].map((row, i) => (
                      <tr key={row.type} className={i % 2 === 0 ? 'bg-bg-page' : 'bg-bg-surface'}>
                        <td className="px-4 py-2.5 text-text-secondary border-b border-border-gray/50">{row.type}</td>
                        <td className="px-4 py-2.5 text-text-secondary border-b border-border-gray/50">{row.period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 leading-relaxed opacity-70">
                Retention may be extended where required by applicable law or institutional policy.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Your Rights */}
        <section id="your-rights">
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

        {/* CCPA / California */}
        <section id="ccpa">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">California privacy rights (CCPA/CPRA)</h2>
          </div>

          <div className="space-y-4 text-sm text-text-secondary">
            <p className="leading-relaxed">
              If you are a California resident, the California Consumer Privacy Act (CCPA) as amended
              by the California Privacy Rights Act (CPRA) grants you the following rights:
            </p>
            <ul className="space-y-3">
              {[
                {
                  title: 'Right to Know',
                  desc: 'Request disclosure of the categories and specific pieces of personal information we have collected about you, the sources, the business purpose, and the third parties with whom we share it.',
                },
                {
                  title: 'Right to Delete',
                  desc: 'Request deletion of personal information we have collected, subject to exceptions for legal compliance, fraud prevention, and completing transactions.',
                },
                {
                  title: 'Right to Correct',
                  desc: 'Request correction of inaccurate personal information.',
                },
                {
                  title: 'Right to Opt-Out of Sale',
                  desc: 'EdPilot does not sell personal information. We do not share personal information for cross-context behavioral advertising.',
                },
                {
                  title: 'Right to Non-Discrimination',
                  desc: 'We will not discriminate against you for exercising your CCPA rights.',
                },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-2 leading-relaxed">
                  <ChevronRight className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-semibold text-text-primary">{item.title}:</span>{' '}
                    {item.desc}
                  </span>
                </li>
              ))}
            </ul>
            <p className="leading-relaxed">
              To submit a California privacy request, email{' '}
              <a
                href={`mailto:${LEGAL_EMAIL}?subject=California%20Privacy%20Request`}
                className="text-accent hover:underline"
              >
                {LEGAL_EMAIL}
              </a>{' '}
              with subject line &quot;California Privacy Request.&quot; We will respond within 45 days as
              required by law.
            </p>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Virginia & Colorado */}
        <section id="state-rights">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Virginia &amp; Colorado privacy rights</h2>
          </div>

          <div className="space-y-4 text-sm text-text-secondary">
            <p className="leading-relaxed">
              Residents of Virginia (VCDPA) and Colorado (CPA) have substantially similar privacy
              rights regarding personal data we control:
            </p>
            <ul className="space-y-3">
              {[
                {
                  title: 'Right to Access',
                  desc: 'Confirm whether we process your personal data and obtain a copy.',
                },
                {
                  title: 'Right to Correct',
                  desc: 'Request correction of inaccurate personal data.',
                },
                {
                  title: 'Right to Delete',
                  desc: 'Request deletion of personal data we hold about you.',
                },
                {
                  title: 'Right to Data Portability',
                  desc: 'Obtain a copy of your personal data in a portable, machine-readable format.',
                },
                {
                  title: 'Right to Opt-Out',
                  desc: 'Opt out of targeted advertising, sale of personal data, or profiling for significant decisions. EdPilot does not engage in any of these activities.',
                },
                {
                  title: 'Right to Appeal',
                  desc: 'If we decline to act on your request, you may appeal by emailing us and we will respond within 60 days.',
                },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-2 leading-relaxed">
                  <ChevronRight className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-semibold text-text-primary">{item.title}:</span>{' '}
                    {item.desc}
                  </span>
                </li>
              ))}
            </ul>
            <p className="leading-relaxed">
              Submit Virginia or Colorado privacy requests to{' '}
              <a
                href={`mailto:${LEGAL_EMAIL}?subject=State%20Privacy%20Request`}
                className="text-accent hover:underline"
              >
                {LEGAL_EMAIL}
              </a>.
              We will respond within 45 days (extendable by an additional 45 days with notice).
            </p>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* GDPR */}
        <section id="gdpr">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">European users (GDPR)</h2>
          </div>

          <div className="space-y-4 text-sm text-text-secondary">
            <p className="leading-relaxed">
              If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland,
              the General Data Protection Regulation (GDPR) and its local implementations give you
              additional rights regarding your personal data.
            </p>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Legal bases for processing</h3>
              <ul className="space-y-2">
                {[
                  { basis: 'Contract', desc: 'To deliver the Services you signed up for' },
                  { basis: 'Legitimate interests', desc: 'Platform security, fraud prevention, and product improvement (with appropriate safeguards)' },
                  { basis: 'Legal obligation', desc: 'Compliance with FERPA, tax laws, and court orders' },
                  { basis: 'Consent', desc: 'For any processing beyond these bases — you may withdraw consent at any time' },
                ].map((item) => (
                  <li key={item.basis} className="flex items-start gap-2 leading-relaxed">
                    <ChevronRight className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                    <span>
                      <span className="font-semibold text-text-primary">{item.basis}:</span>{' '}
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Your GDPR rights</h3>
              <ul className="space-y-2">
                {[
                  'Access, rectification, and erasure of your personal data',
                  'Restriction of processing and the right to object',
                  'Data portability in a machine-readable format',
                  'Withdraw consent at any time without affecting prior lawful processing',
                  'Lodge a complaint with your national data protection authority',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 leading-relaxed">
                    <ChevronRight className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">International transfers</h3>
              <p className="leading-relaxed">
                EdPilot&apos;s infrastructure is hosted in the United States (Google Cloud Platform,
                us-central1). Transfers of personal data from the EEA to the US are conducted under
                Standard Contractual Clauses (SCCs) incorporated into our data processing agreements
                with sub-processors.
              </p>
            </div>

            <p className="leading-relaxed">
              Submit GDPR requests to{' '}
              <a href={`mailto:${LEGAL_EMAIL}?subject=GDPR%20Request`} className="text-accent hover:underline">
                {LEGAL_EMAIL}
              </a>.
              We will respond within 30 days as required by GDPR Article 12.
            </p>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Data Breach Notification */}
        <section id="breach">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Data breach notification</h2>
          </div>

          <div className="space-y-4 text-sm text-text-secondary">
            <p className="leading-relaxed">
              In the event of a security incident involving unauthorized access to or disclosure of
              personal data, EdPilot will:
            </p>
            <ul className="space-y-2">
              {[
                'Notify affected educational institutions within 72 hours of confirming a breach involving student education records, consistent with FERPA and applicable state breach notification laws',
                'Notify affected individual users via email without undue delay where required by applicable law',
                'Provide information about the nature of the incident, data categories affected, likely consequences, and remediation measures taken',
                'Cooperate with institutional data protection officers and regulatory authorities as required',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 leading-relaxed">
                  <ChevronRight className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="leading-relaxed">
              To report a security vulnerability or suspected breach, contact{' '}
              <a href={`mailto:${SECURITY_EMAIL}`} className="text-accent hover:underline">
                {SECURITY_EMAIL}
              </a>{' '}
              immediately.
            </p>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Children's Privacy */}
        <section id="children">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Children&apos;s privacy</h2>
          </div>
          <div className="text-sm text-text-secondary space-y-3 leading-relaxed">
            <p>
              EdPilot is built for higher education — college and university students, typically 18
              years or older. We do not knowingly collect personal information from anyone under 13.
            </p>
            <p>
              If we discover that we have inadvertently collected data from a child under 13 without
              verifiable parental consent, we will delete it from our systems immediately.
            </p>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Policy Changes */}
        <section id="changes">
          <h2 className="text-xl font-bold text-text-primary mb-4">Policy changes</h2>
          <div className="text-sm text-text-secondary space-y-3 leading-relaxed">
            <p>
              We may update this Privacy Policy to reflect changes in our practices, technology, or
              legal requirements. When we do, we&apos;ll update the &quot;Last Updated&quot; date at the top of
              this page.
            </p>
            <p>
              For material changes that affect your rights we&apos;ll also send an email notification to
              all registered users. We encourage you to review this page periodically.
            </p>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Contact */}
        <section id="contact">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Questions about this policy?</h2>
          </div>
          <div className="text-sm text-text-secondary space-y-2 mb-6">
            <p>
              <span className="font-medium text-text-primary">Privacy &amp; legal inquiries:</span>{' '}
              <a href={`mailto:${LEGAL_EMAIL}?subject=Privacy%20Inquiry`} className="text-accent hover:underline">{LEGAL_EMAIL}</a>
            </p>
            <p>
              <span className="font-medium text-text-primary">Security concerns:</span>{' '}
              <a href={`mailto:${SECURITY_EMAIL}`} className="text-accent hover:underline">{SECURITY_EMAIL}</a>
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

    </PageShell>
  )
}
