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
  Shield,
  Gavel,
  Bot,
  Plug,
  CreditCard,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container, Hero, PageShell, Section } from '@/components/marketing'
import { SUPPORT_EMAIL, LEGAL_EMAIL, SECURITY_EMAIL } from '@/lib/marketing'

const LAST_UPDATED = 'May 18, 2026'
const VERSION = 'v2.1'

export default function TermsOfServicePage() {
  return (
    <PageShell>

      {/* ── Page Header ── */}
      <Hero
        eyebrow="Legal"
        title="Terms of Service"
        description={`Last updated: ${LAST_UPDATED} · ${VERSION}`}
        className="pb-12 md:pb-16"
      />

      {/* ── Body ── */}
      <Section className="py-14 md:py-20">
        <Container size="narrow" className="space-y-10">

        {/* Agreement */}
        <section id="agreement">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Agreement to these terms</h2>
          </div>
          <div className="text-sm text-text-secondary space-y-3 leading-relaxed">
            <p>
              These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you
              and EdPilot, Inc. (&quot;EdPilot,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing your access to and use
              of the EdPilot platform, including our website, applications, APIs, and related
              services (collectively, the &quot;Services&quot;).
            </p>
            <p>
              By creating an account, accessing the platform, or using any of our services, you agree
              to be bound by these Terms and our{' '}
              <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>.
              If you are using the Services on behalf of an institution or organization, you represent
              that you have authority to bind that entity to these Terms.
            </p>
            <p>
              If you do not agree to these Terms, you must not access or use the Services.
            </p>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Accounts */}
        <section id="accounts">
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
                    'One account per person, no sharing',
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
                Demo accounts provide limited access to pre-configured sample course materials for
                evaluation purposes. Demo accounts cannot access real courses or any real student data.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Acceptable Use */}
        <section id="acceptable-use">
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
        <section id="prohibited">
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="w-5 h-5 text-status-danger flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Prohibited conduct</h2>
          </div>

          <p className="text-sm text-text-secondary mb-4 leading-relaxed">You may not use EdPilot to:</p>
          <ul className="space-y-2 text-sm text-text-secondary">
            {[
              "Violate your institution's academic integrity policies or engage in plagiarism",
              'Use the AI to complete graded assignments, exams, or projects and submit as your own work',
              'Share account credentials or allow unauthorized access',
              'Upload malicious code, viruses, or harmful content',
              'Scrape, data mine, or extract platform content using automated tools',
              'Reverse engineer, decompile, or attempt to derive source code',
              'Circumvent usage limits, security measures, or access controls (including prompt injection)',
              'Harass, abuse, or harm other users',
              'Upload content that infringes copyright or other intellectual property rights',
              "Impersonate another person or misrepresent your institutional affiliation",
              'Use the platform for commercial purposes without authorization',
              "Attempt to access other users' accounts or data",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 leading-relaxed">
                <XCircle className="w-3.5 h-3.5 text-status-danger mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <hr className="border-border-gray" />

        {/* Content Ownership */}
        <section id="content">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Content ownership &amp; licensing</h2>
          </div>

          <div className="space-y-4 text-sm text-text-secondary">
            {[
              {
                title: 'Your content is yours',
                desc: 'You retain full ownership of all content you upload or create: course materials, questions, assignments, and chat messages. By using EdPilot you grant us a limited, non-exclusive, royalty-free license solely to operate, maintain, and deliver the Services to you.',
              },
              {
                title: 'No AI training on your data',
                desc: 'EdPilot does not use your User Content, including student educational records, course materials, and AI conversation history, to train or fine-tune machine learning models without your explicit written consent.',
              },
              {
                title: 'Course materials',
                desc: 'Professors grant enrolled students access to uploaded materials. Students may view and study those materials within the course context but may not redistribute, republish, or use them outside it.',
              },
              {
                title: 'AI-generated responses',
                desc: "AI-generated responses are owned by you, the user who prompted them, to the extent permitted by applicable law. EdPilot does not claim ownership of content generated in response to your prompts. You are responsible for ensuring any use of AI outputs complies with your institution's academic integrity policies.",
              },
              {
                title: 'EdPilot intellectual property',
                desc: "EdPilot's platform, code, design, branding, and proprietary technology are protected by copyright, trademark, and other intellectual property laws. No copying, modification, or derivative works without explicit permission.",
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

        {/* Third-Party Services */}
        <section id="third-parties">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Third-party services</h2>
          </div>

          <div className="space-y-4 text-sm text-text-secondary">
            <p className="leading-relaxed">
              The Services are hosted on Google Cloud Platform (&quot;GCP&quot;) and integrate with the
              following third-party providers:
            </p>
            <ul className="space-y-2">
              {[
                { service: 'Google Firebase', purpose: 'User authentication and real-time data' },
                { service: 'Google Vertex AI', purpose: 'AI model inference and grounding' },
                { service: 'Anthropic', purpose: 'Large language model API (Claude)' },
                { service: 'Google BigQuery', purpose: 'Usage analytics and reporting' },
                { service: 'Google Cloud Storage', purpose: 'Document and file storage' },
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
            <p className="leading-relaxed">
              EdPilot has executed data processing agreements with each sub-processor to ensure
              appropriate safeguards. Anthropic&apos;s usage policies prohibit the use of API
              inputs/outputs to train their models without explicit consent. We do not share
              personally identifiable student data with Anthropic.
            </p>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* LTI & LMS Integration */}
        <section id="lti">
          <div className="flex items-center gap-3 mb-4">
            <Plug className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">LTI &amp; LMS integration</h2>
          </div>

          <div className="space-y-4 text-sm text-text-secondary">
            <p className="leading-relaxed">
              EdPilot supports Learning Tools Interoperability (LTI 1.3) for integration with
              Learning Management Systems such as Canvas, Blackboard, and Moodle. When your
              institution configures an LTI connection:
            </p>
            <ul className="space-y-2">
              {[
                'EdPilot receives a signed LTI launch payload containing your institution-assigned user ID, course context, role (student or instructor), and LMS platform identifier',
                'Names And Roles Provisioning Services (NRPS) may be used to sync course rosters directly from your LMS with no manual enrollment required',
                'Assignment and Grade Services (AGS) may be used to report grades or completion status back to your LMS gradebook, if enabled by your institution',
                'LTI launch data is processed solely to authenticate you, provision your account, and deliver the correct course context, never for advertising or profiling',
                'Institutions control LTI configuration and may revoke access at any time through their LMS administration panel',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 leading-relaxed">
                  <ChevronRight className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="leading-relaxed">
              Data exchanged via LTI constitutes student education records under FERPA. EdPilot
              processes it only as directed by the institution and subject to our FERPA obligations.
            </p>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* FERPA */}
        <section id="ferpa">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">FERPA compliance</h2>
          </div>

          <div className="space-y-4 text-sm text-text-secondary">
            <p className="leading-relaxed">
              EdPilot is committed to compliance with the Family Educational Rights and Privacy Act
              (FERPA), 20 U.S.C. § 1232g, and its implementing regulations at 34 C.F.R. Part 99.
            </p>
            <p className="leading-relaxed">
              When EdPilot provides services to an educational institution, EdPilot acts as a
              &quot;school official&quot; with a legitimate educational interest in student education records,
              as permitted under FERPA. EdPilot will:
            </p>
            <ul className="space-y-2">
              {[
                'Use student education records only as directed by and for the benefit of the educational institution',
                'Not disclose student education records to third parties except as required by law or authorized by the institution',
                'Maintain the confidentiality of student education records with appropriate technical and organizational safeguards',
                'Respond to valid institutional FERPA data requests within five (5) business days',
                "Return or destroy student education records upon termination of the Services relationship, at the institution's direction",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 leading-relaxed">
                  <ChevronRight className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="leading-relaxed">
              Individual students may exercise their FERPA rights, including the right to inspect,
              review, and request amendment of their education records, through their educational
              institution&apos;s registrar.
            </p>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* AI-Specific Terms */}
        <section id="ai-terms">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">AI usage &amp; disclaimers</h2>
          </div>

          <div className="space-y-5 text-sm text-text-secondary">
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">The AI Teaching Assistant is a guide, not an authority</h3>
              <p className="leading-relaxed">
                EdPilot&apos;s AI features are powered by Google Vertex AI and Anthropic Claude. AI-generated
                responses are provided for educational assistance only. They may be incomplete or
                inaccurate. Always verify critical facts with your professor or authoritative sources.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">No training on your data</h3>
              <p className="leading-relaxed">
                EdPilot does not use your conversation history, uploaded documents, or student
                educational records to train or fine-tune any AI model. Queries sent to third-party
                AI providers (Vertex AI, Anthropic) are governed by those providers&apos; usage policies,
                which prohibit use of API inputs/outputs for model training.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Ownership of AI outputs</h3>
              <p className="leading-relaxed">
                AI-generated responses are owned by you, the user who prompted them, to the extent
                permitted by applicable law. EdPilot does not claim ownership of content generated
                in response to your prompts. You are responsible for ensuring any use of AI outputs
                complies with your institution&apos;s academic integrity policies and applicable law.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Academic integrity</h3>
              <p className="leading-relaxed">
                EdPilot is designed to support learning, not to circumvent it. You agree to use AI
                features in accordance with your institution&apos;s academic integrity policies. EdPilot
                is not responsible for consequences arising from misuse of AI-generated content in
                academic submissions.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">AI usage limits</h3>
              <p className="leading-relaxed">
                EdPilot may impose rate limits or usage quotas on AI features to ensure fair access
                and prevent abuse. Systematic attempts to circumvent usage limits, including prompt
                injection, automated scraping, or API abuse, are prohibited and may result in account
                termination.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">No uptime or outcome guarantees</h3>
              <p className="leading-relaxed">
                We do not guarantee uninterrupted access, error-free operation, or specific learning
                outcomes. The Service is provided &quot;as is&quot; without warranties beyond what is required
                by law.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Subscriptions & Payment */}
        <section id="subscriptions">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Subscriptions &amp; payment</h2>
          </div>

          <div className="space-y-4 text-sm text-text-secondary">
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Billing</h3>
              <p className="leading-relaxed">
                Paid subscriptions are billed on a recurring basis (monthly or annually) via Stripe.
                By subscribing you authorize EdPilot to charge your payment method on each renewal
                date until you cancel. All prices are in U.S. dollars.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Free tier &amp; institutional plans</h3>
              <p className="leading-relaxed">
                EdPilot offers a free tier with limited AI usage. Institutional plans are negotiated
                separately under a written order form and are subject to these Terms plus any
                supplemental terms in that order form. In the event of a conflict, the order form
                controls for institutional customers.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Cancellations &amp; refunds</h3>
              <p className="leading-relaxed">
                You may cancel your subscription at any time through your account settings or by
                emailing{' '}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-accent hover:underline">{SUPPORT_EMAIL}</a>.
                Cancellation takes effect at the end of the current billing period. EdPilot does not
                provide prorated refunds for unused time in a billing period except where required
                by applicable law.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Price changes</h3>
              <p className="leading-relaxed">
                We may change subscription pricing with at least 30 days&apos; advance notice by email.
                Continued use of the Service after a price change constitutes acceptance of the new
                pricing.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Limitation of Liability */}
        <section id="liability">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-status-warning flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Limitation of liability</h2>
          </div>
          <div className="rounded-lg border border-border-gray bg-bg-elevated p-4 text-xs leading-6 text-text-secondary space-y-3">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, EDPILOT SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF DATA, LOSS
              OF PROFITS, OR DAMAGES ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE.
            </p>
            <p>
              OUR TOTAL LIABILITY FOR ANY CLAIM ARISING FROM YOUR USE OF THE SERVICE SHALL NOT EXCEED
              THE AMOUNT YOU PAID US (IF ANY) IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR ONE HUNDRED
              U.S. DOLLARS ($100.00), WHICHEVER IS GREATER.
            </p>
          </div>
          <p className="mt-3 text-xs text-text-secondary leading-relaxed opacity-60">
            Some jurisdictions do not allow limitation of liability for certain damages; these
            limitations may not apply to you in full.
          </p>
        </section>

        <hr className="border-border-gray" />

        {/* Dispute Resolution */}
        <section id="disputes">
          <div className="flex items-center gap-3 mb-4">
            <Gavel className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Dispute resolution &amp; arbitration</h2>
          </div>
          <div className="space-y-4 text-sm text-text-secondary">
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Informal resolution first</h3>
              <p className="leading-relaxed">
                Before initiating formal dispute resolution, you agree to contact EdPilot at{' '}
                <a href={`mailto:${LEGAL_EMAIL}`} className="text-accent hover:underline">{LEGAL_EMAIL}</a>{' '}
                and give us 30 days to attempt to resolve the dispute informally.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Consumer arbitration</h3>
              <p className="leading-relaxed">
                If informal resolution fails and you are an individual consumer (not acting on behalf
                of an institution), any dispute arising from these Terms shall be resolved by binding
                arbitration administered by the American Arbitration Association (&quot;AAA&quot;) under its
                Consumer Arbitration Rules, rather than in court, except that either party may bring
                claims in small claims court if they qualify.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Institutional &amp; commercial disputes</h3>
              <p className="leading-relaxed">
                Disputes brought by or on behalf of an educational institution or commercial entity
                shall be resolved by binding arbitration under the AAA Commercial Arbitration Rules.
                Institutions may opt out of arbitration and elect litigation by providing written
                notice to{' '}
                <a href={`mailto:${LEGAL_EMAIL}`} className="text-accent hover:underline">{LEGAL_EMAIL}</a>{' '}
                within 60 days of first accepting these Terms.
              </p>
            </div>
            <div className="rounded-lg border border-border-gray bg-bg-elevated p-4 text-xs leading-6 text-text-secondary">
              CLASS ACTION WAIVER: YOU AND EDPILOT AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER
              ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY
              PURPORTED CLASS OR REPRESENTATIVE ACTION.
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Governing law</h3>
              <p className="leading-relaxed">
                These Terms are governed by the laws of the State of Delaware, United States, without
                regard to conflict-of-law principles. Either party may seek emergency injunctive relief
                from a court of competent jurisdiction to prevent actual or threatened infringement of
                intellectual property rights.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Termination */}
        <section id="termination">
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
                We may suspend or terminate your account without notice if you violate these Terms,
                engage in prohibited conduct, or if your actions pose a risk to the platform or other
                users.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">After termination</h3>
              <p className="leading-relaxed">
                Access ceases immediately. Provisions on intellectual property, disclaimers, liability
                limits, and dispute resolution survive termination.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-border-gray" />

        {/* Contact */}
        <section id="contact">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-accent flex-shrink-0" />
            <h2 className="text-xl font-bold text-text-primary">Questions about these terms?</h2>
          </div>
          <div className="text-sm text-text-secondary space-y-2 mb-6">
            <p>
              <span className="font-medium text-text-primary">Legal inquiries:</span>{' '}
              <a href={`mailto:${LEGAL_EMAIL}`} className="text-accent hover:underline">{LEGAL_EMAIL}</a>
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
