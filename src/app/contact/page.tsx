'use client'

import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  CheckCircle,
  HelpCircle,
  Loader2,
  Mail,
  MessageSquare,
  Rocket,
  Shield,
} from 'lucide-react'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { sendContactMessage } from './actions'
import {
  Container,
  FeatureCard,
  Hero,
  IconChip,
  PageShell,
  ProofPanel,
  Section,
  SectionHeader,
  WorkflowSteps,
} from '@/components/marketing'
import { SUPPORT_EMAIL } from '@/lib/marketing'

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  intent: 'book-demo',
  institution: '',
  department: '',
  lms: '',
  timeline: '',
  courseCount: '',
  message: '',
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState(initialFormData)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await sendContactMessage(formData)

      if (result.success) {
        setShowSuccess(true)
        setFormData(initialFormData)
        toast.success('Message sent successfully.')
      } else {
        toast.error(result.error || 'Failed to send message')
      }
    } catch {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const inputClass =
    'h-11 w-full rounded-lg border border-border-gray bg-[#0F0F12] px-3.5 text-sm text-text-primary placeholder:text-text-tertiary transition-colors focus:border-accent focus:outline-none'

  return (
    <PageShell>
      <Hero
        eyebrow="Contact"
        title="Book a demo or start a pilot."
        description="Tell us who you are, what you are evaluating, and what course or rollout context matters. We will route the next step without making you decode a sales funnel."
        actions={[{ label: 'Email Support', href: `mailto:${SUPPORT_EMAIL}` }]}
        className="pb-14 md:pb-20"
      />

      <Section className="py-12" surface="panel">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={CalendarCheck}
              title="Book a demo"
              description="Best for administrators, departments, IT, and teams evaluating a university rollout."
            />
            <FeatureCard
              icon={Rocket}
              title="Start a pilot"
              description="Best for professors who want to test EdPilot with real course materials."
            />
            <FeatureCard
              icon={HelpCircle}
              title="Ask a question"
              description="Use the same form for privacy, procurement, accessibility, LMS, or partnership questions."
            >
              <Button asChild variant="outline" size="sm" className="mt-4">
                <Link href="/faq">
                  Browse FAQ
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </FeatureCard>
          </div>
        </Container>
      </Section>

      <Section id="contact-form" className="py-20 md:py-24">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Next Step"
                title="A form built for university context."
                description="Add the details that help us prepare: institution, role, LMS, timeline, and how many courses might be involved."
                className="mb-8"
              />
              <WorkflowSteps
                className="grid-cols-1 md:grid-cols-1"
                steps={[
                  {
                    step: '01',
                    title: 'We read the context',
                    description: 'Your role, institution, timeline, and LMS help us route the right response.',
                    icon: MessageSquare,
                  },
                  {
                    step: '02',
                    title: 'We propose a useful next step',
                    description: 'That may be a demo, course-material pilot, privacy conversation, or FAQ follow-up.',
                    icon: Shield,
                  },
                  {
                    step: '03',
                    title: 'You see the product on real material',
                    description: 'For pilots, the most useful demo is usually built around your syllabus or course sample.',
                    icon: Building2,
                  },
                ]}
              />
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="mt-6 inline-flex items-center gap-3 rounded-lg border border-border-gray bg-bg-surface px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-accent/45 hover:bg-accent/10 hover:text-text-primary focus-ring"
              >
                <IconChip icon={Mail} className="h-8 w-8" />
                {SUPPORT_EMAIL}
              </a>
            </div>

            <div className="rounded-lg border border-border-gray bg-bg-surface p-5 shadow-[0_24px_80px_rgba(0,0,0,0.25)] md:p-7">
              {showSuccess ? (
                <div role="status" aria-live="polite" className="py-12 text-center">
                  <div
                    className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg border border-green-500/20 bg-green-500/10"
                    aria-hidden="true"
                  >
                    <CheckCircle className="h-7 w-7 text-green-400" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-semibold text-text-primary">Message sent.</h2>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text-secondary">
                    We will reply within one business day with a useful next step.
                  </p>
                  <Button onClick={() => setShowSuccess(false)} className="mt-6">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="contact-intent"
                      className="mb-1.5 block text-sm font-medium text-text-primary"
                    >
                      What do you want to do? *
                    </label>
                    <select
                      id="contact-intent"
                      name="intent"
                      value={formData.intent}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="book-demo">Book a university demo</option>
                      <option value="start-pilot">Start a professor pilot</option>
                      <option value="security-procurement">Ask about security or procurement</option>
                      <option value="general-question">Ask a general question</option>
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-first-name"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        First name *
                      </label>
                      <input
                        id="contact-first-name"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        autoComplete="given-name"
                        className={inputClass}
                        placeholder="Ada"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-last-name"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        Last name *
                      </label>
                      <input
                        id="contact-last-name"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        autoComplete="family-name"
                        className={inputClass}
                        placeholder="Lovelace"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        Work email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        className={inputClass}
                        placeholder="you@university.edu"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-role"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        Role *
                      </label>
                      <select
                        id="contact-role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      >
                        <option value="" disabled>
                          Select your role
                        </option>
                        <option value="professor">Professor / Instructor</option>
                        <option value="department-head">Department Head</option>
                        <option value="administrator">University Administrator</option>
                        <option value="it-staff">IT / LMS Staff</option>
                        <option value="student">Student</option>
                        <option value="partner">Partner / Vendor</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-institution"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        Institution *
                      </label>
                      <input
                        id="contact-institution"
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="State University"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-department"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        Department
                      </label>
                      <input
                        id="contact-department"
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Biology, Online Learning, IT..."
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="contact-lms"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        LMS
                      </label>
                      <select
                        id="contact-lms"
                        name="lms"
                        value={formData.lms}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select one</option>
                        <option value="canvas">Canvas</option>
                        <option value="blackboard">Blackboard</option>
                        <option value="moodle">Moodle</option>
                        <option value="brightspace">D2L Brightspace</option>
                        <option value="none">Not sure / none</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="contact-course-count"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        Courses
                      </label>
                      <input
                        id="contact-course-count"
                        type="text"
                        name="courseCount"
                        value={formData.courseCount}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="1, 5, 50..."
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-timeline"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        Timeline
                      </label>
                      <select
                        id="contact-timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select one</option>
                        <option value="this-month">This month</option>
                        <option value="this-term">This term</option>
                        <option value="next-term">Next term</option>
                        <option value="exploring">Just exploring</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-sm font-medium text-text-primary"
                    >
                      What should we know? *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full resize-none rounded-lg border border-border-gray bg-[#0F0F12] px-3.5 py-3 text-sm text-text-primary placeholder:text-text-tertiary transition-colors focus:border-accent focus:outline-none"
                      placeholder="Tell us about the course, rollout, privacy question, or demo scenario you want to explore."
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending
                      </>
                    ) : (
                      <>
                        Send Request
                        <ArrowRight aria-hidden="true" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs leading-5 text-text-tertiary">
                    By submitting, you agree to our{' '}
                    <Link href="/privacy-policy" className="text-accent hover:text-[#A78BFA]">
                      Privacy Policy
                    </Link>
                    . Required fields are marked with *.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16" surface="panel">
        <Container>
          <ProofPanel
            items={[
              {
                icon: Shield,
                label: 'No commitment required',
                detail: 'The first conversation can be exploratory, procurement-focused, or course-specific.',
              },
              {
                icon: MessageSquare,
                label: 'Response in one business day',
                detail: 'We route messages to the right product, security, or pilot contact.',
              },
              {
                icon: Building2,
                label: 'Course-material demo option',
                detail: 'When helpful, demos can be shaped around your syllabus rather than a generic sample.',
              },
            ]}
          />
        </Container>
      </Section>

      <Footer />
    </PageShell>
  )
}
