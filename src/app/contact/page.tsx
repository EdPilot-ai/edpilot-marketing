'use client'

import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  ChevronDown,
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
  Hero,
  IconChip,
  PageShell,
  ProofPanel,
  Section,
  SectionHeader,
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

const intentOptions = [
  { value: 'book-demo', label: 'Book a university demo', detail: 'For teams evaluating rollout.' },
  { value: 'start-pilot', label: 'Start a professor pilot', detail: 'For a real course-material test.' },
  {
    value: 'security-procurement',
    label: 'Security or procurement',
    detail: 'For IT, legal, privacy, or accessibility questions.',
  },
  { value: 'general-question', label: 'General question', detail: 'For anything else.' },
]

const roleOptions = [
  { value: 'professor', label: 'Professor / Instructor' },
  { value: 'department-head', label: 'Department Head' },
  { value: 'administrator', label: 'University Administrator' },
  { value: 'it-staff', label: 'IT / LMS Staff' },
  { value: 'student', label: 'Student' },
  { value: 'partner', label: 'Partner / Vendor' },
  { value: 'other', label: 'Other' },
]

const lmsOptions = [
  { value: 'canvas', label: 'Canvas' },
  { value: 'blackboard', label: 'Blackboard' },
  { value: 'moodle', label: 'Moodle' },
  { value: 'brightspace', label: 'D2L Brightspace' },
  { value: 'none', label: 'Not sure / none' },
  { value: 'other', label: 'Other' },
]

const timelineOptions = [
  { value: 'this-month', label: 'This month' },
  { value: 'this-term', label: 'This term' },
  { value: 'next-term', label: 'Next term' },
  { value: 'exploring', label: 'Just exploring' },
]

type SelectOption = {
  value: string
  label: string
  detail?: string
}

function CustomSelect({
  id,
  label,
  value,
  options,
  placeholder,
  required,
  open,
  onOpenChange,
  onValueChange,
}: {
  id: string
  label: string
  value: string
  options: SelectOption[]
  placeholder: string
  required?: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
  onValueChange: (value: string) => void
}) {
  const selected = options.find((option) => option.value === value)

  return (
    <div className="relative">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text-primary">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
        className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-border-gray bg-[#0F0F12] px-3.5 py-2 text-left text-sm text-text-primary transition-colors hover:border-border-strong focus:border-accent focus:outline-none"
      >
        <span className={selected ? 'text-text-primary' : 'text-text-tertiary'}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-text-tertiary transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div
          role="listbox"
          aria-labelledby={id}
          className="absolute z-40 mt-2 max-h-72 w-full overflow-hidden rounded-lg border border-border-gray bg-[#0F0F12] p-1 shadow-[0_22px_70px_rgba(0,0,0,0.45)]"
        >
          {options.map((option) => {
            const active = option.value === value

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onValueChange(option.value)
                  onOpenChange(false)
                }}
                className={`w-full rounded-md px-3 py-2.5 text-left transition-colors ${
                  active ? 'bg-accent/15 text-text-primary' : 'text-text-secondary hover:bg-bg-surface hover:text-text-primary'
                }`}
              >
                <span className="block text-sm font-medium">{option.label}</span>
                {option.detail && (
                  <span className="mt-0.5 block text-xs leading-5 text-text-tertiary">
                    {option.detail}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [openSelect, setOpenSelect] = useState<string | null>(null)

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
    'h-11 w-full rounded-lg border border-border-gray bg-[#0F0F12] px-3.5 text-sm text-text-primary placeholder:text-text-tertiary transition-colors hover:border-border-strong focus:border-accent focus:outline-none'

  const setFieldValue = (name: keyof typeof initialFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <PageShell>
      <Hero
        eyebrow="Contact"
        title="Tell us what you want to launch."
        accent="We will route the rest."
        description="Demo, professor pilot, security review, or procurement question: send the context once and we will come back with the right next step."
        actions={[
          { label: 'Start the Form', href: '#contact-form' },
          { label: 'Email Support', href: `mailto:${SUPPORT_EMAIL}`, variant: 'secondary' },
        ]}
        className="pb-14 md:pb-20"
      />

      <Section className="py-14" surface="panel">
        <Container size="wide">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: CalendarCheck,
                title: 'Book a demo',
                description:
                  'For administrators, departments, IT, and teams evaluating a university rollout.',
                meta: 'University fit',
              },
              {
                icon: Rocket,
                title: 'Start a pilot',
                description:
                  'For professors who want to test EdPilot with real course materials and faculty controls.',
                meta: 'Course sample',
              },
              {
                icon: HelpCircle,
                title: 'Ask a question',
                description:
                  'For privacy, procurement, accessibility, LMS, partnership, or support questions.',
                meta: 'Routed reply',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border-gray bg-[linear-gradient(180deg,rgba(34,34,40,0.72),rgba(15,15,18,0.94))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.2)]"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <IconChip icon={item.icon} className="h-10 w-10" />
                  <span className="rounded-md border border-border-gray bg-[#0F0F12] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-tertiary">
                    {item.meta}
                  </span>
                </div>
                <h2 className="text-base font-semibold text-text-primary">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="contact-form" className="py-20 md:py-24">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Next Step"
                title="A cleaner path to the right conversation."
                description="The form is structured around the details that actually change the next step: role, institution, LMS, timeline, and pilot size."
                className="mb-8"
              />
              <div className="overflow-hidden rounded-lg border border-border-gray bg-[#0F0F12]">
                {[
                  {
                    title: 'We read the context',
                    description:
                      'Your role, institution, timeline, and LMS help us route the right response.',
                    icon: MessageSquare,
                  },
                  {
                    title: 'We propose a useful next step',
                    description:
                      'That may be a demo, course-material pilot, privacy conversation, or FAQ follow-up.',
                    icon: Shield,
                  },
                  {
                    title: 'You see the product on real material',
                    description:
                      'For pilots, the most useful demo is usually built around your syllabus or course sample.',
                    icon: Building2,
                  },
                ].map((item, index) => (
                  <div key={item.title} className="border-b border-border-gray p-5 last:border-b-0">
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent">
                        <item.icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                          Step {String(index + 1).padStart(2, '0')}
                        </p>
                        <h3 className="mt-1 text-sm font-semibold text-text-primary">{item.title}</h3>
                        <p className="mt-1 text-[13px] leading-6 text-text-secondary">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="mt-6 inline-flex items-center gap-3 rounded-lg border border-border-gray bg-bg-surface px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-accent/45 hover:bg-accent/10 hover:text-text-primary focus-ring"
              >
                <IconChip icon={Mail} className="h-8 w-8" />
                {SUPPORT_EMAIL}
              </a>
            </div>

            <div className="overflow-visible rounded-lg border border-border-gray bg-[linear-gradient(180deg,rgba(24,24,27,0.98),rgba(15,15,18,0.96))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.32)] md:p-7">
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
                  <CustomSelect
                    id="contact-intent"
                    label="What do you want to do?"
                    value={formData.intent}
                    options={intentOptions}
                    placeholder="Choose a request type"
                    required
                    open={openSelect === 'intent'}
                    onOpenChange={(open) => setOpenSelect(open ? 'intent' : null)}
                    onValueChange={(value) => setFieldValue('intent', value)}
                  />

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
                      <CustomSelect
                        id="contact-role"
                        label="Role"
                        value={formData.role}
                        options={roleOptions}
                        placeholder="Select your role"
                        required
                        open={openSelect === 'role'}
                        onOpenChange={(open) => setOpenSelect(open ? 'role' : null)}
                        onValueChange={(value) => setFieldValue('role', value)}
                      />
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
                      <CustomSelect
                        id="contact-lms"
                        label="LMS"
                        value={formData.lms}
                        options={lmsOptions}
                        placeholder="Select one"
                        open={openSelect === 'lms'}
                        onOpenChange={(open) => setOpenSelect(open ? 'lms' : null)}
                        onValueChange={(value) => setFieldValue('lms', value)}
                      />
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
                      <CustomSelect
                        id="contact-timeline"
                        label="Timeline"
                        value={formData.timeline}
                        options={timelineOptions}
                        placeholder="Select one"
                        open={openSelect === 'timeline'}
                        onOpenChange={(open) => setOpenSelect(open ? 'timeline' : null)}
                        onValueChange={(value) => setFieldValue('timeline', value)}
                      />
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
