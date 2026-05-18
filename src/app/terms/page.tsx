'use client'

import {
  Scale,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Mail,
  ChevronRight,
  Users,
  BookOpen,
} from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Container, Hero, PageShell, Section } from '@/components/marketing'
import { SUPPORT_EMAIL } from '@/lib/marketing'

const LAST_UPDATED = 'March 21, 2026'

export default function TermsOfServicePage() {
  return (
    <PageShell>

      {/* ── Page Header ── */}
      <Hero
        eyebrow="Legal"
        title="Terms of Service"
        description={`Last updated: ${LAST_UPDATED}`}
        className="pb-12 md:pb-16"
      />

      {/* ── Body ── */}
      <Section className="py-14 md:py-20">
        <Container size="narrow" className="space-y-10">

        {/* Agreement */}
        <section
          id="agreement"
        >
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Agreement to these terms</h2>
          </div>
          <div className="text-sm text-text-secondary space-y-3 leading-relaxed">
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of EdPilot&apos;s AI-powered educational platform (&quot;Service&quot;), operated by EdPilot, Inc. (&quot;EdPilot,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
            </p>
            <p>
              By creating an account, accessing the platform, or using any of our services, you agree to be bound by these Terms and our{' '}
              <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>.
              If you do not agree, you must not use the Service.
            </p>
            <p>
              We reserve the right to modify these Terms at any time. Continued use of the Service after changes are posted constitutes acceptance.
            </p>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Accounts */}
        <section
          id="accounts"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Account registration &amp; responsibilities</h2>
          </div>

          <div className="space-y-5 text-sm text-text-secondary">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-3">Students</h3>
                <ul className="space-y-2">
                  {[
                    'Provide accurate registration information',
                    'Maintain the confidentiality of your password',
                    'Be enrolled at a higher education institution or authorized for demo access',
                    'One account per person — no sharing',
                    'Responsible for all activity under your account',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 leading-relaxed">
                      <ChevronRight className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-3">Professors</h3>
                <ul className="space-y-2">
                  {[
                    'Provide proof of academic affiliation during registration',
                    'Accounts require administrative approval before full access',
                    'Responsible for accuracy and appropriateness of uploaded materials',
                    'Must respect student privacy and comply with FERPA',
                    'May only invite students with proper institutional authorization',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 leading-relaxed">
                      <ChevronRight className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Demo accounts</h3>
              <p className="leading-relaxed">
                Demo accounts provide limited access (10 AI messages) to pre-configured sample course materials for evaluation purposes. Demo accounts cannot access real courses or any real student data.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Acceptable Use */}
        <section
          id="acceptable-use"
        >
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Acceptable use</h2>
          </div>

          <p className="text-sm text-text-secondary mb-4 leading-relaxed">
            EdPilot is an educational tool. Acceptable uses include:
          </p>
          <ul className="space-y-2 text-sm text-text-secondary">
            {[
              { icon: BookOpen, text: 'Learning course material and preparing for assessments' },
              { icon: CheckCircle2, text: 'Asking the AI Teaching Assistant for conceptual explanations and guidance' },
              { icon: Users, text: 'Managing courses and distributing materials (professors)' },
              { icon: BookOpen, text: 'Using practice mode to test your understanding' },
              { icon: CheckCircle2, text: 'Reviewing your learning progress and analytics' },
              { icon: Users, text: 'Inviting students and collaborating within institutional guidelines' },
            ].map((item) => (
              <li key={item.text} className="flex items-start gap-2.5 leading-relaxed">
                <item.icon className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                {item.text}
              </li>
            ))}
          </ul>
        </section>

        <hr className="border-border-gray" />

        {/* Prohibited Conduct */}
        <section
          id="prohibited"
        >
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Prohibited conduct</h2>
          </div>

          <p className="text-sm text-text-secondary mb-4 leading-relaxed">You may not use EdPilot to:</p>
          <ul className="space-y-2 text-sm text-text-secondary">
            {[
              'Violate your institution\'s academic integrity policies or engage in plagiarism',
              'Use the AI to complete graded assignments, exams, or projects and submit as your own work',
              'Share account credentials or allow unauthorized access',
              'Upload malicious code, viruses, or harmful content',
              'Scrape, data mine, or extract platform content using automated tools',
              'Reverse engineer, decompile, or attempt to derive source code',
              'Circumvent usage limits, security measures, or access controls',
              'Harass, abuse, or harm other users',
              'Upload content that infringes copyright or other intellectual property rights',
              'Impersonate another person or misrepresent your institutional affiliation',
              'Use the platform for commercial purposes without authorization',
              'Attempt to access other users\' accounts or data',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 leading-relaxed">
                <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <hr className="border-border-gray" />

        {/* AI Disclaimer */}
        <section
          id="ai-disclaimer"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">AI usage &amp; disclaimers</h2>
          </div>

          <div className="space-y-5 text-sm text-text-secondary">
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">The AI Teaching Assistant is a guide, not an authority</h3>
              <p className="leading-relaxed">
                Our AI is scoped to your course materials and designed to help you think — not to think for you. While we work hard to ensure accuracy, the AI may occasionally provide incomplete or incorrect information. Always verify critical facts with your professor or authoritative sources.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">You remain responsible for your own learning</h3>
              <p className="leading-relaxed">
                Using the AI to generate answers you submit as your own work violates these Terms and almost certainly your institution&apos;s academic integrity policy. EdPilot is designed to support understanding — the Socratic approach and practice mode exist specifically to reinforce your own thinking.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Professors are responsible for their materials</h3>
              <p className="leading-relaxed">
                The AI responds based on what professors upload. Professors are responsible for ensuring uploaded content is accurate, current, and appropriately licensed. EdPilot is not liable for errors in professor-provided content.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">No uptime or outcome guarantees</h3>
              <p className="leading-relaxed">
                We do not guarantee uninterrupted access, error-free operation, or specific learning outcomes. The Service is provided &quot;as is&quot; without warranties of any kind beyond what is required by law.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Content Ownership */}
        <section
          id="content"
        >
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Content ownership &amp; licensing</h2>
          </div>

          <div className="space-y-4 text-sm text-text-secondary">
            {[
              {
                title: 'Your content is yours',
                desc: 'You retain ownership of all content you upload or create — course materials, questions, and assignments. By using EdPilot you grant us a limited license to store, process, and display your content solely to provide the Service.',
              },
              {
                title: 'Course materials',
                desc: 'Professors grant enrolled students access to uploaded materials. Students may view and study those materials within the course context but may not redistribute, republish, or use them outside it.',
              },
              {
                title: 'AI-generated responses',
                desc: 'Responses from the AI Teaching Assistant are for educational use. You may use them to learn but may not submit them as your own original work or use them to violate academic integrity policies.',
              },
              {
                title: 'EdPilot intellectual property',
                desc: 'EdPilot\'s platform, code, design, branding, and proprietary technology are protected by copyright, trademark, and other intellectual property laws. No copying, modification, or derivative works without explicit permission.',
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

        {/* Limitation of Liability */}
        <section
          id="liability"
        >
          <h2 className="text-xl font-bold text-text-primary mb-4">Limitation of liability</h2>
          <div className="text-sm text-text-secondary space-y-3 leading-relaxed">
            <p>
              To the maximum extent permitted by law, EdPilot shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of data, loss of profits, or damages arising from your use of or inability to use the Service.
            </p>
            <p>
              Our total liability for any claim arising from your use of the Service shall not exceed the amount you paid us (if any) in the twelve months preceding the claim.
            </p>
            <p className="text-text-secondary/60">
              Some jurisdictions do not allow limitation of liability for certain damages; these limitations may not apply to you in full.
            </p>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Termination */}
        <section
          id="termination"
        >
          <h2 className="text-xl font-bold text-text-primary mb-5">Termination</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-sm text-text-secondary">
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">By you</h3>
              <p className="leading-relaxed">
                You may close your account at any time by emailing{' '}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-accent hover:underline">{SUPPORT_EMAIL}</a>.
                Your data will be deleted per our Privacy Policy.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">By us</h3>
              <p className="leading-relaxed">
                We may suspend or terminate your account without notice if you violate these Terms, engage in prohibited conduct, or if your actions pose a risk to the platform or other users.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">After termination</h3>
              <p className="leading-relaxed">
                Access ceases immediately. Provisions on intellectual property, disclaimers, liability limits, and dispute resolution survive termination.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Governing Law */}
        <section
          id="governing-law"
        >
          <h2 className="text-xl font-bold text-text-primary mb-4">Governing law &amp; disputes</h2>
          <div className="text-sm text-text-secondary space-y-3 leading-relaxed">
            <p>
              These Terms are governed by the laws of the State of California, United States, without regard to conflict-of-law principles.
            </p>
            <p>
              Any disputes arising from these Terms or your use of the Service shall be resolved exclusively in the state or federal courts of San Francisco County, California. You consent to the personal jurisdiction of those courts.
            </p>
            <p>
              If any provision of these Terms is found unenforceable, the remaining provisions continue in full effect.
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
            <h2 className="text-xl font-bold text-text-primary">Questions about these terms?</h2>
          </div>
          <div className="text-sm text-text-secondary space-y-2 mb-6">
            <p>
              <span className="font-medium text-text-primary">Legal inquiries:</span>{' '}
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
