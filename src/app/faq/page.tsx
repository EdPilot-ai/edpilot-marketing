'use client'

import { useState } from 'react'
import {
  ChevronDown,
  CreditCard,
  GraduationCap,
  HelpCircle,
  Settings,
  Shield,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  CTABand,
  Container,
  Hero,
  IconChip,
  PageShell,
  Section,
  SectionHeader,
} from '@/components/marketing'
import { SIGN_UP_URL, SUPPORT_EMAIL } from '@/lib/marketing'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqCategories = [
  { icon: HelpCircle, label: 'Getting Started', id: 'getting-started' },
  { icon: GraduationCap, label: 'For Students', id: 'students' },
  { icon: Users, label: 'For Professors', id: 'professors' },
  { icon: Shield, label: 'Privacy & Security', id: 'privacy' },
  { icon: CreditCard, label: 'Pricing & Plans', id: 'pricing' },
  { icon: Settings, label: 'Technical Support', id: 'technical' },
]

const faqs: FAQItem[] = [
  {
    category: 'getting-started',
    question: 'What is EdPilot?',
    answer:
      "EdPilot is course-specific AI for higher education. The tutor only knows what the professor uploaded. The grader uses the professor's rubric. The analytics show which learning objectives are not landing, not just which grades are low.",
  },
  {
    category: 'getting-started',
    question: 'How do I create an account?',
    answer:
      'Click Get Started and select your role. Enter your institutional email and create a password. If your institution has a partnership, you may be able to sign in with school credentials.',
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
      "No. It guides you through problems with questions and hints, not answers. It will not write assignments, complete your work, or give you anything you could paste into a submission.",
  },
  {
    category: 'students',
    question: 'How does the AI help without just giving me answers?',
    answer:
      "It uses guiding questions, targeted explanations, and hints when you are stuck. It shows where your reasoning breaks down without handing you the solution.",
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
      'Any subject your professor uploads materials for: STEM, humanities, social sciences, business, and more. It only knows what your professor gave it.',
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
      'Yes. Upload your syllabus, readings, and notes. The AI works from those materials and matches your terminology, objectives, and boundaries.',
  },
  {
    category: 'professors',
    question: 'How do you prevent cheating?',
    answer:
      'The AI is built to decline assignment and exam completion requests. Student interactions are logged so instructors can review patterns and identify misuse attempts.',
  },
  {
    category: 'professors',
    question: 'Will this replace me?',
    answer:
      'No. EdPilot handles repetitive support work so faculty can focus on teaching, judgment, course design, and student relationships.',
  },
  {
    category: 'privacy',
    question: 'How is my data protected?',
    answer:
      'Data is encrypted at rest and in transit. EdPilot is designed around FERPA-aligned data handling and institutional access controls.',
  },
  {
    category: 'privacy',
    question: 'Who can see my interactions with the AI?',
    answer:
      'Students can be reviewed by the professor for learning progress and integrity monitoring. Professors and authorized administrators can access course data according to institutional policy.',
  },
  {
    category: 'privacy',
    question: 'Do you sell user data?',
    answer:
      'No. We do not sell or share individual user data. Aggregated usage data may inform platform improvements, but personal data stays private.',
  },
  {
    category: 'pricing',
    question: 'How much does EdPilot cost?',
    answer:
      'Students get free access to core features. Professors and institutions receive custom pricing based on scale and features. Contact sales for a quote.',
  },
  {
    category: 'pricing',
    question: 'Do you offer institutional pricing?',
    answer:
      'Yes. We support volume pricing for multi-department and multi-campus deployments. Contact us to talk through options.',
  },
  {
    category: 'pricing',
    question: 'Can I cancel anytime?',
    answer: 'Yes. Access continues until the end of your billing period.',
  },
  {
    category: 'technical',
    question: 'What devices and browsers work?',
    answer:
      'Desktop, laptop, tablet, and mobile. Current versions of Chrome, Firefox, Safari, and Edge are supported.',
  },
  {
    category: 'technical',
    question: 'What if I hit a technical issue?',
    answer:
      `Email ${SUPPORT_EMAIL} or use the Contact page. We typically respond within one business day.`,
  },
  {
    category: 'technical',
    question: 'How do I integrate with my LMS?',
    answer:
      'Direct file upload is available now. Canvas developer access and deeper LMS workflows are in progress for institutional pilots. Contact us for setup guidance and timeline.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const groupedFAQs = faqCategories.map((category) => ({
    ...category,
    questions: faqs.filter((faq) => faq.category === category.id),
  }))

  const scrollToCategory = (categoryId: string) => {
    document.getElementById(categoryId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <PageShell>
      <Hero
        eyebrow="FAQ"
        title="Straight answers for"
        accent="institutional buyers."
        description="The questions we hear most from faculty, students, IT teams, and university administrators."
        className="pb-14 md:pb-20"
      />

      <Section className="py-12" surface="panel">
        <Container>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => scrollToCategory(category.id)}
                className="group rounded-lg border border-border-gray bg-bg-deep p-4 text-center transition duration-200 hover:border-border-strong hover:bg-bg-elevated focus-ring"
              >
                <IconChip icon={category.icon} className="mx-auto mb-3 h-9 w-9" />
                <span className="text-xs font-semibold leading-5 text-text-secondary transition-colors group-hover:text-text-primary">
                  {category.label}
                </span>
              </button>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container size="narrow">
          <SectionHeader
            eyebrow="Answers"
            title="What people ask before they pilot EdPilot."
            description="Use the category shortcuts above or scan the full list below."
          />
          <div className="space-y-12">
            {groupedFAQs.map((category, categoryIndex) => (
              <div key={category.id} id={category.id} className="scroll-mt-28">
                <div className="mb-5 flex items-center gap-3">
                  <IconChip icon={category.icon} className="h-9 w-9" />
                  <h2 className="text-lg font-semibold tracking-[-0.02em] text-text-primary">
                    {category.label}
                  </h2>
                </div>
                <div className="space-y-2">
                  {category.questions.map((faq, index) => {
                    const globalIndex = categoryIndex * 100 + index
                    const isOpen = openIndex === globalIndex

                    return (
                      <div
                        key={faq.question}
                        className={`rounded-lg border transition duration-200 ${
                          isOpen
                            ? 'border-accent/20 bg-bg-surface'
                            : 'border-border-gray bg-bg-surface hover:border-border-strong'
                        }`}
                      >
                        <button
                          id={`faq-question-${globalIndex}`}
                          type="button"
                          onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                          className="flex w-full items-center justify-between gap-5 rounded-lg px-5 py-4 text-left focus-ring"
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${globalIndex}`}
                        >
                          <span className="text-sm font-semibold leading-6 text-text-primary">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 text-text-secondary transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-accent' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                        {isOpen && (
                          <div
                            id={`faq-answer-${globalIndex}`}
                            role="region"
                            aria-labelledby={`faq-question-${globalIndex}`}
                            className="border-t border-border-gray px-5 py-4"
                          >
                            <p className="text-sm leading-7 text-text-secondary">{faq.answer}</p>
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

      <CTABand
        title="Still have questions?"
        description="We respond to every message, whether you are evaluating a pilot or trying to understand the product."
        actions={[
          { label: 'Contact Us', href: '/contact' },
          { label: 'Get Started Free', href: SIGN_UP_URL, variant: 'secondary' },
        ]}
      />

    </PageShell>
  )
}
