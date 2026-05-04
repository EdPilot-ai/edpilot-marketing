import Link from 'next/link'
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileText,
  Mail,
  Scale,
  Users,
  XCircle,
} from 'lucide-react'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Container, PageHeader } from '@/components/marketing'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'EdPilot terms of service — accounts, acceptable use, AI disclaimers, content ownership, liability, and termination.',
}

const LAST_UPDATED = 'March 21, 2026'

function LegalSection({
  id,
  icon: Icon,
  iconClassName,
  title,
  children,
}: {
  id: string
  icon?: React.ComponentType<{ className?: string }>
  iconClassName?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <Icon className={`w-5 h-5 flex-shrink-0 ${iconClassName ?? 'text-accent'}`} aria-hidden="true" />
        )}
        <h2 className="text-xl font-semibold text-text-primary tracking-[-0.015em]">{title}</h2>
      </div>
      <div className="space-y-4 text-[14px] text-text-secondary leading-relaxed">{children}</div>
    </section>
  )
}

export default function TermsOfServicePage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        meta={`Last updated: ${LAST_UPDATED}`}
      />

      <Container size="lg" className="py-14 space-y-12">
        <LegalSection id="agreement" icon={Scale} title="Agreement to these terms">
          <p>
            These Terms of Service (“Terms”) govern your access to and use of EdPilot’s AI-powered
            educational platform (“Service”), operated by EdPilot, Inc. (“EdPilot,” “we,” “us,” or
            “our”).
          </p>
          <p>
            By creating an account, accessing the platform, or using any of our services, you agree
            to be bound by these Terms and our{' '}
            <Link href="/privacy-policy" className="text-accent hover:underline">
              Privacy Policy
            </Link>
            . If you do not agree, you must not use the Service.
          </p>
          <p>
            We reserve the right to modify these Terms at any time. Continued use of the Service
            after changes are posted constitutes acceptance.
          </p>
        </LegalSection>

        <LegalSection id="accounts" icon={Users} title="Account registration & responsibilities">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[14px] font-semibold text-text-primary mb-3">Students</h3>
              <ul className="space-y-2">
                {[
                  'Provide accurate registration information',
                  'Maintain the confidentiality of your password',
                  'Be enrolled at a higher education institution or authorized for demo access',
                  'One account per person — no sharing',
                  'Responsible for all activity under your account',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-accent mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-text-primary mb-3">Professors</h3>
              <ul className="space-y-2">
                {[
                  'Provide proof of academic affiliation during registration',
                  'Accounts require administrative approval before full access',
                  'Responsible for accuracy and appropriateness of uploaded materials',
                  'Must respect student privacy and comply with FERPA',
                  'May only invite students with proper institutional authorization',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-accent mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary mb-1.5">Demo accounts</h3>
            <p>
              Demo accounts provide limited access (10 AI messages) to pre-configured sample course
              materials for evaluation purposes. Demo accounts cannot access real courses or any
              real student data.
            </p>
          </div>
        </LegalSection>

        <LegalSection id="acceptable-use" icon={CheckCircle2} title="Acceptable use">
          <p>EdPilot is an educational tool. Acceptable uses include:</p>
          <ul className="space-y-2">
            {[
              { icon: BookOpen, text: 'Learning course material and preparing for assessments' },
              {
                icon: CheckCircle2,
                text: 'Asking the AI Teaching Assistant for conceptual explanations and guidance',
              },
              { icon: Users, text: 'Managing courses and distributing materials (professors)' },
              { icon: BookOpen, text: 'Using practice mode to test your understanding' },
              { icon: CheckCircle2, text: 'Reviewing your learning progress and analytics' },
              { icon: Users, text: 'Inviting students and collaborating within institutional guidelines' },
            ].map((item) => (
              <li key={item.text} className="flex items-start gap-2.5">
                <item.icon className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection
          id="prohibited"
          icon={XCircle}
          iconClassName="text-red-400"
          title="Prohibited conduct"
        >
          <p>You may not use EdPilot to:</p>
          <ul className="space-y-2">
            {[
              'Violate your institution’s academic integrity policies or engage in plagiarism',
              'Use the AI to complete graded assignments, exams, or projects and submit as your own',
              'Share account credentials or allow unauthorized access',
              'Upload malicious code, viruses, or harmful content',
              'Scrape, data mine, or extract platform content using automated tools',
              'Reverse engineer, decompile, or attempt to derive source code',
              'Circumvent usage limits, security measures, or access controls',
              'Harass, abuse, or harm other users',
              'Upload content that infringes copyright or other intellectual property rights',
              'Impersonate another person or misrepresent your institutional affiliation',
              'Use the platform for commercial purposes without authorization',
              'Attempt to access other users’ accounts or data',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <XCircle className="w-3.5 h-3.5 text-red-400 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection
          id="ai-disclaimer"
          icon={AlertTriangle}
          iconClassName="text-amber-400"
          title="AI usage & disclaimers"
        >
          {[
            {
              title: 'The AI Teaching Assistant is a guide, not an authority',
              desc: 'Our AI is scoped to your course materials and designed to help you think — not to think for you. Always verify critical facts with your professor or authoritative sources.',
            },
            {
              title: 'You remain responsible for your own learning',
              desc: 'Using the AI to generate answers you submit as your own work violates these Terms and almost certainly your institution’s academic integrity policy.',
            },
            {
              title: 'Professors are responsible for their materials',
              desc: 'The AI responds based on what professors upload. Professors are responsible for ensuring uploaded content is accurate, current, and appropriately licensed.',
            },
            {
              title: 'No uptime or outcome guarantees',
              desc: 'We do not guarantee uninterrupted access, error-free operation, or specific learning outcomes. The Service is provided “as is.”',
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-[14px] font-semibold text-text-primary mb-1.5">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </LegalSection>

        <LegalSection id="content" icon={FileText} title="Content ownership & licensing">
          {[
            {
              title: 'Your content is yours',
              desc: 'You retain ownership of all content you upload or create. By using EdPilot you grant us a limited license to store, process, and display your content solely to provide the Service.',
            },
            {
              title: 'Course materials',
              desc: 'Professors grant enrolled students access to uploaded materials. Students may view and study them within the course context but may not redistribute or republish.',
            },
            {
              title: 'AI-generated responses',
              desc: 'Responses from the AI Teaching Assistant are for educational use. You may use them to learn but may not submit them as your own original work.',
            },
            {
              title: 'EdPilot intellectual property',
              desc: 'EdPilot’s platform, code, design, branding, and proprietary technology are protected by copyright, trademark, and other intellectual property laws.',
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-[14px] font-semibold text-text-primary mb-1">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </LegalSection>

        <LegalSection id="liability" title="Limitation of liability">
          <p>
            To the maximum extent permitted by law, EdPilot shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages — including loss of data, loss
            of profits, or damages arising from your use of or inability to use the Service.
          </p>
          <p>
            Our total liability for any claim arising from your use of the Service shall not exceed
            the amount you paid us (if any) in the twelve months preceding the claim.
          </p>
          <p className="text-text-secondary/70">
            Some jurisdictions do not allow limitation of liability for certain damages; these
            limitations may not apply to you in full.
          </p>
        </LegalSection>

        <LegalSection id="termination" title="Termination">
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <h3 className="text-[14px] font-semibold text-text-primary mb-2">By you</h3>
              <p>
                You may close your account at any time by emailing{' '}
                <a href="mailto:support@edpilot.ai" className="text-accent hover:underline">
                  support@edpilot.ai
                </a>
                . Your data will be deleted per our Privacy Policy.
              </p>
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-text-primary mb-2">By us</h3>
              <p>
                We may suspend or terminate your account without notice if you violate these Terms,
                engage in prohibited conduct, or pose a risk to the platform or other users.
              </p>
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-text-primary mb-2">After termination</h3>
              <p>
                Access ceases immediately. Provisions on intellectual property, disclaimers,
                liability limits, and dispute resolution survive termination.
              </p>
            </div>
          </div>
        </LegalSection>

        <LegalSection id="governing-law" title="Governing law & disputes">
          <p>
            These Terms are governed by the laws of the State of California, United States, without
            regard to conflict-of-law principles.
          </p>
          <p>
            Any disputes arising from these Terms or your use of the Service shall be resolved
            exclusively in the state or federal courts of San Francisco County, California.
          </p>
          <p>
            If any provision of these Terms is found unenforceable, the remaining provisions
            continue in full effect.
          </p>
        </LegalSection>

        <LegalSection id="contact" icon={Mail} title="Questions about these terms?">
          <div className="space-y-2 mb-6">
            <p>
              <span className="font-medium text-text-primary">Legal inquiries:</span>{' '}
              <a href="mailto:legal@edpilot.ai" className="text-accent hover:underline">
                legal@edpilot.ai
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
