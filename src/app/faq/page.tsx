'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronDown,
  CreditCard,
  GraduationCap,
  HelpCircle,
  Settings,
  Shield,
  Users,
} from 'lucide-react'
import { Container, Section, Hero, CTASection } from '@/components/marketing'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const FAQ_CATEGORIES = [
  { icon: HelpCircle, label: 'Getting started', id: 'getting-started' },
  { icon: GraduationCap, label: 'For students', id: 'students' },
  { icon: Users, label: 'For professors', id: 'professors' },
  { icon: Shield, label: 'Privacy & security', id: 'privacy' },
  { icon: CreditCard, label: 'Pricing & plans', id: 'pricing' },
  { icon: Settings, label: 'Technical support', id: 'technical' },
] as const

const FAQS: FAQItem[] = [
  {
    category: 'getting-started',
    question: 'What is EdPilot?',
    answer:
      'EdPilot is course-specific AI for higher education. The tutor only knows what the professor uploaded. The grader uses the professor’s rubric. The analytics show which learning objectives aren’t landing — not just which grades are low. It’s not a general-purpose chatbot with an edu skin on it.',
  },
  {
    category: 'getting-started',
    question: 'How do I create an account?',
    answer:
      'Click “Get Started” and select your role. Enter your institutional email and create a password. If your institution has an existing partnership, you may be able to sign in with your school credentials.',
  },
  {
    category: 'getting-started',
    question: 'Is there a free trial?',
    answer:
      'Yes. The demo lets you try AI-assisted conversations as a student and generate sample course materials as a professor. Contact us for full access.',
  },
  {
    category: 'students',
    question: 'Will the AI do my homework for me?',
    answer:
      'No. It’s designed specifically to prevent that. It guides you through problems with questions and hints — not answers. It won’t write your assignments, complete your work, or give you anything you could paste into a submission.',
  },
  {
    category: 'students',
    question: 'How does the AI help without just giving me answers?',
    answer:
      'It uses guiding questions, targeted explanations, and hints when you’re stuck. It shows you where your reasoning breaks down without handing you the solution.',
  },
  {
    category: 'students',
    question: 'Can I use EdPilot during exams?',
    answer:
      'No. The AI detects exam-related queries and declines. It will tell you when a question looks assessment-related.',
  },
  {
    category: 'students',
    question: 'What subjects does EdPilot support?',
    answer:
      'Any subject your professor uploads materials for — STEM, humanities, social sciences. It only knows what your professor gave it.',
  },
  {
    category: 'professors',
    question: 'How does EdPilot save me time?',
    answer:
      'It drafts syllabi, quizzes, assignments, and rubrics from your existing materials. It grades against your rubric and handles repetitive student questions. You review everything before it goes anywhere.',
  },
  {
    category: 'professors',
    question: 'Can I customize the AI for my course?',
    answer:
      'That’s the whole model. Upload your syllabus, readings, and notes. The AI works from those materials and matches your terminology and objectives.',
  },
  {
    category: 'professors',
    question: 'How do you prevent cheating?',
    answer:
      'The AI is built to not answer assignment or exam questions — not just instructed to avoid them. Every student interaction is logged and available for your review. If a student tries to use it to get around your assessment, you’ll see the attempt.',
  },
  {
    category: 'professors',
    question: 'Will this replace me?',
    answer:
      'No. EdPilot handles the parts that eat your time but don’t require your expertise: answering the same question for the 40th student, grading 120 papers to your rubric, rebuilding materials from scratch each semester. The teaching, the intellectual judgment, the course design stay entirely with you.',
  },
  {
    category: 'privacy',
    question: 'How is my data protected?',
    answer:
      'AES-256 encryption at rest and in transit. Infrastructure on AWS with regular security audits. FERPA and GDPR compliant.',
  },
  {
    category: 'privacy',
    question: 'Who can see my interactions with the AI?',
    answer:
      'Students: your professor can review interactions to monitor learning progress. Professors: only you and authorized administrators can access course data.',
  },
  {
    category: 'privacy',
    question: 'Do you sell user data?',
    answer:
      'No. We don’t sell or share individual user data. Anonymized, aggregated usage data may inform platform improvements. Personal data stays private.',
  },
  {
    category: 'pricing',
    question: 'How much does EdPilot cost?',
    answer:
      'Students get free access to core features. Professors and institutions get custom pricing based on scale and features. Contact sales for a quote.',
  },
  {
    category: 'pricing',
    question: 'Do you offer institutional pricing?',
    answer:
      'Yes. Volume pricing for multi-department and multi-campus deployments. Contact us to talk through options.',
  },
  {
    category: 'pricing',
    question: 'Can I cancel anytime?',
    answer:
      'Yes — anytime, no penalties. Access continues until the end of your billing period.',
  },
  {
    category: 'technical',
    question: 'What devices and browsers work?',
    answer:
      'Desktop, laptop, tablet, and mobile. Current versions of Chrome, Firefox, Safari, and Edge.',
  },
  {
    category: 'technical',
    question: 'What if I hit a technical issue?',
    answer:
      'Email support@edpilot.ai or use the contact page. We typically respond within one business day.',
  },
  {
    category: 'technical',
    question: 'How do I integrate with my LMS?',
    answer:
      'Canvas, Blackboard, and Moodle integrations are in progress. Direct file upload is available now. Contact us for setup guidance and a timeline.',
  },
]

export default function FAQPage() {
  const [openKey, setOpenKey] = useState<string | null>(null)

  const groups = FAQ_CATEGORIES.map((c) => ({
    ...c,
    questions: FAQS.filter((q) => q.category === c.id),
  }))

  return (
    <>
      <Hero
        eyebrow="Help center"
        titleNode={
          <>
            <span className="text-text-primary">Frequently asked </span>
            <span className="text-accent">questions.</span>
          </>
        }
        description="Straight answers to the questions we get most. If yours isn’t here, message us directly."
      />

      {/* Category nav */}
      <Section surface="raised" spacing="sm">
        <Container size="lg">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {FAQ_CATEGORIES.map((cat) => {
              const Icon = cat.icon
              return (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="group flex flex-col items-center gap-2.5 rounded-xl border border-border-gray bg-bg-page p-4 transition-all hover:border-[#3f3f46] hover:bg-[#1d1d21]"
                >
                  <div className="w-9 h-9 bg-accent/[0.12] rounded-lg flex items-center justify-center ring-1 ring-accent/25">
                    <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
                  </div>
                  <span className="text-[12px] font-medium text-text-secondary group-hover:text-text-primary transition-colors text-center leading-tight">
                    {cat.label}
                  </span>
                </a>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* FAQ content */}
      <Section spacing="lg">
        <Container size="md">
          <div className="space-y-14">
            {groups.map((group) => (
              <div key={group.id} id={group.id} className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-accent/[0.12] rounded-lg flex items-center justify-center flex-shrink-0 ring-1 ring-accent/25">
                    <group.icon className="w-4 h-4 text-accent" aria-hidden="true" />
                  </div>
                  <h2 className="text-lg font-semibold text-text-primary tracking-[-0.015em]">
                    {group.label}
                  </h2>
                </div>

                <div className="space-y-2">
                  {group.questions.map((faq, i) => {
                    const key = `${group.id}-${i}`
                    const isOpen = openKey === key
                    return (
                      <div
                        key={key}
                        className={cn(
                          'rounded-xl border bg-bg-surface transition-colors',
                          isOpen
                            ? 'border-accent/25'
                            : 'border-border-gray hover:border-[#3f3f46]'
                        )}
                      >
                        <button
                          onClick={() => setOpenKey(isOpen ? null : key)}
                          className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 group"
                          aria-expanded={isOpen}
                        >
                          <span className="text-[14px] font-medium text-text-primary group-hover:text-accent transition-colors">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={cn(
                              'w-4 h-4 text-text-secondary transition-transform duration-200 flex-shrink-0',
                              isOpen && 'rotate-180 text-accent'
                            )}
                            aria-hidden="true"
                          />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5">
                            <div className="border-t border-border-gray pt-4">
                              <p className="text-[13px] text-text-secondary leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title="Still have questions?"
        description="We respond to every message."
        primaryHref="/contact"
        primaryLabel="Contact us"
        secondaryHref={process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.edpilot.com'}
        secondaryLabel="Get started free"
      />
    </>
  )
}
