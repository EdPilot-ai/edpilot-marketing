'use client'

import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { ArrowRight, CheckCircle, HelpCircle, Loader2, Mail, MessageSquare, Shield } from 'lucide-react'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { sendContactMessage } from './actions'
import {
  Container,
  FeatureCard,
  Hero,
  IconChip,
  PageShell,
  Section,
  SectionHeader,
} from '@/components/marketing'
import { SUPPORT_EMAIL } from '@/lib/marketing'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    message: '',
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await sendContactMessage(formData)

      if (result.success) {
        setShowSuccess(true)
        setFormData({ firstName: '', lastName: '', email: '', role: '', message: '' })
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
        title="Tell us what you are trying"
        accent="to solve."
        description="Faculty, administrators, IT teams, and partners all start in the same place: one clear note to the EdPilot team."
        actions={[{ label: 'Email Support', href: `mailto:${SUPPORT_EMAIL}` }]}
        className="pb-14 md:pb-20"
      />

      <Section className="py-12" surface="panel">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={MessageSquare}
              title="One inbox, no maze"
              description={`Reach us at ${SUPPORT_EMAIL}. No department guessing game.`}
            />
            <FeatureCard
              icon={Shield}
              title="University-ready questions welcome"
              description="Ask about pilots, procurement, privacy, accessibility, Canvas access, LMS plans, or course setup."
            />
            <FeatureCard
              icon={HelpCircle}
              title="Need the quick version?"
              description="The FAQ answers the common questions; the form is for everything else."
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
        <Container>
          <div className="grid gap-10 md:grid-cols-[0.82fr_1.18fr] md:items-start">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Get in Touch"
                title="Send the note. We will route it."
                description="Tell us your institution, your role, and the problem you want EdPilot to help solve. A useful message beats a long message."
                className="mb-8"
              />
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="inline-flex items-center gap-3 rounded-lg border border-border-gray bg-bg-surface px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-accent/45 hover:bg-accent/10 hover:text-text-primary focus-ring"
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
                    We will reply within one business day.
                  </p>
                  <Button onClick={() => setShowSuccess(false)} className="mt-6">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-first-name"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        First Name
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
                        Last Name
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

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-sm font-medium text-text-primary"
                    >
                      Email
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
                      I am a...
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

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-sm font-medium text-text-primary"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full resize-none rounded-lg border border-border-gray bg-[#0F0F12] px-3.5 py-3 text-sm text-text-primary placeholder:text-text-tertiary transition-colors focus:border-accent focus:outline-none"
                      placeholder="What are you trying to solve? Course support, AI governance, a pilot, Canvas access, LMS rollout..."
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
                        Send Message
                        <ArrowRight aria-hidden="true" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs leading-5 text-text-tertiary">
                    By submitting, you agree to our{' '}
                    <Link href="/privacy-policy" className="text-accent hover:text-[#A78BFA]">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </PageShell>
  )
}
