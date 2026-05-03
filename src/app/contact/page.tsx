'use client'

import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
// m/AnimatePresence used only for form success state transition
import { Mail, CheckCircle, Loader2, ArrowRight, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer'
import { sendContactMessage } from './actions'
import toast from 'react-hot-toast'
import Link from 'next/link'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6] mb-3">
      {children}
    </p>
  )
}

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await sendContactMessage(formData)

      if (result.success) {
        setShowSuccess(true)
        setFormData({ firstName: '', lastName: '', email: '', role: '', message: '' })
        toast.success('Message sent successfully!')
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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
              <span className="text-text-primary">Talk to </span>
              <span className="text-[#8B5CF6]">the team.</span>
            </h1>
            <p className="text-[1.0625rem] text-text-secondary leading-[1.7] max-w-[480px] mx-auto">
              Faculty, administrators, IT staff, partners: tell us what you&apos;re trying to solve.
              We reply within one business day. No sales runaround.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ Callout ── */}
      <section className="py-12 border-y border-[#27272A] bg-[#18181B]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-[#7C3AED]/12 rounded-lg flex items-center justify-center flex-shrink-0 ring-1 ring-[#7C3AED]/25">
                <HelpCircle className="w-4 h-4 text-[#8B5CF6]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Quick question?</p>
                <p className="text-text-secondary text-[13px]">
                  Check the FAQ first, it may already be answered.
                </p>
              </div>
            </div>
            <Link href="/faq">
              <Button variant="outline" size="sm" className="px-5 h-9">
                Browse FAQ
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section id="contact-form" className="py-20 md:py-24 scroll-mt-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-5 gap-12 items-start">
            {/* Left column — context */}
            <div className="md:col-span-2">
              <SectionLabel>Get in Touch</SectionLabel>
              <h2 className="text-[1.875rem] font-bold text-text-primary tracking-[-0.025em] mb-3">
                Send a Message
              </h2>
              <p className="text-text-secondary text-[13px] leading-relaxed mb-8">
                Tell us what you&apos;re working with. We read and respond to every message.
              </p>

              <a
                href="mailto:support@edpilot.ai"
                className="flex items-center gap-3 text-text-secondary hover:text-[#8B5CF6] transition-colors text-[13px] group"
              >
                <div className="w-8 h-8 bg-[#7C3AED]/12 rounded-lg flex items-center justify-center flex-shrink-0 ring-1 ring-[#7C3AED]/25 group-hover:bg-[#7C3AED]/20 transition-colors">
                  <Mail className="w-4 h-4 text-[#8B5CF6]" aria-hidden="true" />
                </div>
                support@edpilot.ai
              </a>
            </div>

            {/* Right column — form card */}
            <div className="md:col-span-3">
              <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {showSuccess ? (
                    <m.div
                      key="success"
                      role="status"
                      aria-live="polite"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-12 text-center"
                    >
                      <m.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.6 }}
                        className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-5"
                        aria-hidden="true"
                      >
                        <CheckCircle className="w-7 h-7 text-green-500" aria-hidden="true" />
                      </m.div>
                      <h3 className="text-xl font-bold text-text-primary mb-2">Message sent!</h3>
                      <p className="text-text-secondary text-[13px] mb-6">
                        We&apos;ll reply within one business day.
                      </p>
                      <Button onClick={() => setShowSuccess(false)}>Send Another Message</Button>
                    </m.div>
                  ) : (
                    <m.form
                      key="form"
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {/* Name row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="contact-first-name"
                            className="block text-[13px] font-medium text-text-primary mb-1.5"
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
                            className="w-full px-3.5 py-2.5 bg-[#0F0F12] border border-[#27272A] rounded-lg text-text-primary placeholder-[#9898A3]/40 focus:outline-none focus:border-[#8B5CF6] transition-colors text-[13px]"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="contact-last-name"
                            className="block text-[13px] font-medium text-text-primary mb-1.5"
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
                            className="w-full px-3.5 py-2.5 bg-[#0F0F12] border border-[#27272A] rounded-lg text-text-primary placeholder-[#9898A3]/40 focus:outline-none focus:border-[#8B5CF6] transition-colors text-[13px]"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-[13px] font-medium text-text-primary mb-1.5"
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
                          className="w-full px-3.5 py-2.5 bg-[#0F0F12] border border-[#27272A] rounded-lg text-text-primary placeholder-[#9898A3]/40 focus:outline-none focus:border-[#8B5CF6] transition-colors text-[13px]"
                          placeholder="you@university.edu"
                        />
                      </div>

                      {/* Role */}
                      <div>
                        <label
                          htmlFor="contact-role"
                          className="block text-[13px] font-medium text-text-primary mb-1.5"
                        >
                          I am a...
                        </label>
                        <select
                          id="contact-role"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          required
                          className="w-full px-3.5 py-2.5 bg-[#0F0F12] border border-[#27272A] rounded-lg text-text-primary focus:outline-none focus:border-[#8B5CF6] transition-colors text-[13px] appearance-none"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239898A3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                          }}
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

                      {/* Message */}
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
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-3.5 py-2.5 bg-[#0F0F12] border border-[#27272A] rounded-lg text-text-primary placeholder-[#9898A3]/40 focus:outline-none focus:border-[#8B5CF6] resize-none transition-colors text-[13px]"
                          placeholder="Your institution, what you're trying to solve, any questions."
                        />
                      </div>

                      <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </>
                        )}
                      </Button>

                      <p className="text-text-secondary text-[11px] text-center">
                        By submitting, you agree to our{' '}
                        <Link
                          href="/privacy-policy"
                          className="text-[#8B5CF6] hover:text-[#7C3AED] transition-colors"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </m.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
