'use client'

import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  Users,
  GraduationCap,
  Shield,
  CreditCard,
  Settings,
  HelpCircle,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer'
import Link from 'next/link'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6] mb-3">
      {children}
    </p>
  )
}

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
  // Getting Started
  {
    category: 'getting-started',
    question: 'What is EdPilot?',
    answer:
      "EdPilot is course-specific AI for higher education. The tutor only knows what the professor uploaded. The grader uses the professor's rubric. The analytics show which learning objectives aren't landing, not just which grades are low. It's not a general-purpose chatbot with an edu skin on it.",
  },
  {
    category: 'getting-started',
    question: 'How do I create an account?',
    answer:
      'Click "Get Started" and select your role. Enter your institutional email and create a password. If your institution has an existing partnership, you may be able to sign in with your school credentials.',
  },
  {
    category: 'getting-started',
    question: 'Is there a free trial?',
    answer:
      'Yes. The demo lets you try AI-assisted conversations as a student and generate sample course materials as a professor. Contact us for full access.',
  },

  // For Students
  {
    category: 'students',
    question: 'Will the AI do my homework for me?',
    answer:
      "No. It's designed specifically to prevent that. It guides you through problems with questions and hints, not answers. It won't write your assignments, complete your work, or give you anything you could paste into a submission.",
  },
  {
    category: 'students',
    question: 'How does the AI help without just giving me answers?',
    answer:
      "It uses guiding questions, targeted explanations, and hints when you're stuck. It shows you where your reasoning breaks down without handing you the solution.",
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
      'Any subject your professor uploads materials for: STEM, humanities, social sciences. It only knows what your professor gave it.',
  },

  // For Professors
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
      "That's the whole model. Upload your syllabus, readings, and notes. The AI works from those materials and matches your terminology and objectives.",
  },
  {
    category: 'professors',
    question: 'How do you prevent cheating?',
    answer:
      "The AI is built to not answer assignment or exam questions, not just instructed to avoid them. Every student interaction is logged and available for your review. If a student tries to use it to get around your assessment, you'll see the attempt.",
  },
  {
    category: 'professors',
    question: 'Will this replace me?',
    answer:
      "No. EdPilot handles the parts that eat your time but don't require your expertise: answering the same question for the 40th student, grading 120 papers to your rubric, rebuilding materials from scratch each semester. The teaching, the intellectual judgment, the course design stays entirely with you. EdPilot has no opinion on any of it.",
  },

  // Privacy & Security
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
      "No. We don't sell or share individual user data. Anonymized, aggregated usage data may inform platform improvements. Personal data stays private.",
  },

  // Pricing & Plans
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
    answer: 'Yes, anytime, no penalties. Access continues until the end of your billing period.',
  },

  // Technical Support
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
      'Email support@empowered.ai or use the Contact page. We typically respond within one business day.',
  },
  {
    category: 'technical',
    question: 'How do I integrate with my LMS?',
    answer:
      'Canvas, Blackboard, and Moodle integrations are in progress. Direct file upload is available now. Contact us for setup guidance and a timeline.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const groupedFAQs = faqCategories.map(category => ({
    ...category,
    questions: faqs.filter(faq => faq.category === category.id),
  }))

  return (
    <div className="min-h-screen bg-bg-page">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-violet-600/7 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-28 left-[15%] w-[280px] h-[280px] bg-indigo-500/4 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-28 right-[15%] w-[280px] h-[280px] bg-purple-500/4 rounded-full blur-[100px] pointer-events-none" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="text-center max-w-[720px] mx-auto">
            <h1 className="text-5xl md:text-[3.5rem] font-bold mb-5 leading-[1.1] tracking-[-0.03em]">
              <span className="text-text-primary">Frequently Asked </span>
              <span className="text-[#8B5CF6]">Questions.</span>
            </h1>
            <p className="text-[1.0625rem] text-text-secondary leading-[1.7] max-w-[480px] mx-auto">
              Straight answers to the questions we get most. If yours isn&apos;t here, message us
              directly.
            </p>
          </div>
        </div>
      </section>

      {/* ── Category Navigation ── */}
      <section className="py-12 border-y border-[#27272A] bg-[#18181B]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {faqCategories.map(category => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className="group flex flex-col items-center gap-2.5 p-4 rounded-xl border border-[#27272A] bg-[#0F0F12] hover:border-[#3f3f46] hover:bg-[#1d1d21] transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-[#7C3AED]/12 rounded-lg flex items-center justify-center ring-1 ring-[#7C3AED]/25">
                    <Icon className="w-4 h-4 text-[#8B5CF6]" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-semibold text-text-secondary group-hover:text-text-primary transition-colors text-center leading-tight">
                    {category.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ Content ── */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-14">
            {groupedFAQs.map((category, categoryIndex) => (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#7C3AED]/12 rounded-lg flex items-center justify-center flex-shrink-0 ring-1 ring-[#7C3AED]/25">
                    <category.icon className="w-4 h-4 text-[#8B5CF6]" aria-hidden="true" />
                  </div>
                  <h2 className="text-lg font-bold text-text-primary tracking-[-0.02em]">
                    {category.label}
                  </h2>
                </div>

                {/* Accordion items */}
                <div className="space-y-2">
                  {category.questions.map((faq, index) => {
                    const globalIndex = categoryIndex * 100 + index
                    const isOpen = openIndex === globalIndex

                    return (
                      <div
                        key={globalIndex}
                        className={`rounded-xl border transition-all duration-200 ${
                          isOpen
                            ? 'border-[#8B5CF6]/20 bg-[#18181B]'
                            : 'border-[#27272A] bg-[#18181B] hover:border-[#3f3f46]'
                        }`}
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                          className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 group"
                          aria-expanded={isOpen}
                        >
                          <span className="text-[13px] font-semibold text-text-primary group-hover:text-[#8B5CF6] transition-colors">
                            {faq.question}
                          </span>
                          <m.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown className="w-4 h-4 text-text-secondary group-hover:text-[#8B5CF6] transition-colors" />
                          </m.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <m.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 pt-0">
                                <div className="border-t border-[#27272A] pt-4">
                                  <p className="text-[13px] text-text-secondary leading-relaxed">
                                    {faq.answer}
                                  </p>
                                </div>
                              </div>
                            </m.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-[#27272A]">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="border border-[#27272A] bg-[#18181B] rounded-2xl px-8 py-14 md:px-14 text-center">
            <h2 className="text-[1.875rem] font-bold text-text-primary mb-3 tracking-[-0.025em]">
              Still have questions?
            </h2>
            <p className="text-text-secondary text-sm mb-8 max-w-sm mx-auto leading-relaxed">
              We respond to every message.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto px-8 h-11">
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-11">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
