'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, HelpCircle, Loader2, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Container, Section, Hero, Eyebrow } from '@/components/marketing'
import { sendContactMessage } from './actions'

const ROLES = [
  { value: 'professor', label: 'Professor / Instructor' },
  { value: 'department-head', label: 'Department Head' },
  { value: 'administrator', label: 'University Administrator' },
  { value: 'it-staff', label: 'IT / LMS Staff' },
  { value: 'student', label: 'Student' },
  { value: 'partner', label: 'Partner / Vendor' },
  { value: 'other', label: 'Other' },
]

const FIELD_CLASS =
  'w-full px-3.5 py-2.5 bg-[#0F0F12] border border-border-gray rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent transition-colors text-[13px]'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  message: '',
}

export default function ContactPage() {
  const [data, setData] = useState(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const result = await sendContactMessage(data)
      if (result.success) {
        setShowSuccess(true)
        setData(initialState)
        toast.success('Message sent successfully.')
      } else {
        toast.error(result.error ?? 'Failed to send message.')
      }
    } catch {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Hero
        eyebrow="Contact"
        titleNode={
          <>
            <span className="text-text-primary">Talk to </span>
            <span className="text-accent">the team.</span>
          </>
        }
        description="Faculty, administrators, IT staff, partners — tell us what you’re trying to solve. We reply within one business day. No sales runaround."
      />

      {/* FAQ callout strip */}
      <Section surface="raised" spacing="sm">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 bg-accent/[0.12] rounded-lg flex items-center justify-center flex-shrink-0 ring-1 ring-accent/25">
                <HelpCircle className="w-4 h-4 text-accent" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-text-primary">Quick question?</p>
                <p className="text-text-secondary text-[13px]">
                  Check the FAQ first — it may already be answered.
                </p>
              </div>
            </div>
            <Link href="/faq">
              <Button variant="outline" size="default">
                Browse FAQ
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Contact form */}
      <Section spacing="lg">
        <Container size="lg">
          <div className="grid gap-12 md:grid-cols-5 md:items-start">
            <div className="md:col-span-2">
              <Eyebrow className="mb-3">Get in touch</Eyebrow>
              <h2 className="text-3xl font-bold text-text-primary tracking-[-0.025em] mb-4">
                Send a message
              </h2>
              <p className="text-text-secondary text-[14px] leading-relaxed mb-8">
                Tell us what you’re working with. We read and respond to every message.
              </p>

              <a
                href="mailto:support@edpilot.ai"
                className="inline-flex items-center gap-3 text-text-secondary hover:text-accent transition-colors text-[13px] group"
              >
                <div className="w-9 h-9 bg-accent/[0.12] rounded-lg flex items-center justify-center ring-1 ring-accent/25 group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-4 h-4 text-accent" aria-hidden="true" />
                </div>
                support@edpilot.ai
              </a>
            </div>

            <div className="md:col-span-3">
              <div className="rounded-2xl border border-border-gray bg-bg-surface p-6 md:p-8">
                {showSuccess ? (
                  <div role="status" aria-live="polite" className="py-12 text-center">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-7 h-7 text-emerald-500" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">Message sent.</h3>
                    <p className="text-text-secondary text-[13px] mb-6">
                      We’ll reply within one business day.
                    </p>
                    <Button onClick={() => setShowSuccess(false)}>Send another message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-first-name"
                          className="block text-[13px] font-medium text-text-primary mb-1.5"
                        >
                          First name
                        </label>
                        <input
                          id="contact-first-name"
                          name="firstName"
                          type="text"
                          value={data.firstName}
                          onChange={handleChange}
                          required
                          autoComplete="given-name"
                          className={FIELD_CLASS}
                          placeholder="Jane"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-last-name"
                          className="block text-[13px] font-medium text-text-primary mb-1.5"
                        >
                          Last name
                        </label>
                        <input
                          id="contact-last-name"
                          name="lastName"
                          type="text"
                          value={data.lastName}
                          onChange={handleChange}
                          required
                          autoComplete="family-name"
                          className={FIELD_CLASS}
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[13px] font-medium text-text-primary mb-1.5"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        className={FIELD_CLASS}
                        placeholder="you@university.edu"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-role"
                        className="block text-[13px] font-medium text-text-primary mb-1.5"
                      >
                        I am a…
                      </label>
                      <select
                        id="contact-role"
                        name="role"
                        value={data.role}
                        onChange={handleChange}
                        required
                        className={`${FIELD_CLASS} appearance-none`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239D9DA8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 12px center',
                        }}
                      >
                        <option value="" disabled>
                          Select your role
                        </option>
                        {ROLES.map((role) => (
                          <option key={role.value} value={role.value}>
                            {role.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-[13px] font-medium text-text-primary mb-1.5"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={data.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className={`${FIELD_CLASS} resize-none`}
                        placeholder="Your institution, what you’re trying to solve, any questions."
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </>
                      )}
                    </Button>

                    <p className="text-text-secondary text-[11px] text-center">
                      By submitting, you agree to our{' '}
                      <Link
                        href="/privacy-policy"
                        className="text-accent hover:text-accent-hover transition-colors"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
