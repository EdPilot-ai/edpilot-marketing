'use server'

import { SUPPORT_EMAIL } from '@/lib/marketing'

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  role: string
  intent?: string
  institution?: string
  department?: string
  lms?: string
  timeline?: string
  courseCount?: string
  message: string
}

const MAX_MESSAGE_LENGTH = 5000
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CONTACT_FORM_WEBHOOK_URL = process.env.CONTACT_FORM_WEBHOOK_URL

export async function sendContactMessage(data: ContactFormData) {
  try {
    // Trim all fields so whitespace-only strings are treated as empty
    const firstName = data.firstName?.trim() ?? ''
    const lastName = data.lastName?.trim() ?? ''
    const email = data.email?.trim() ?? ''
    const role = data.role?.trim() ?? ''
    const intent = data.intent?.trim() ?? ''
    const institution = data.institution?.trim() ?? ''
    const department = data.department?.trim() ?? ''
    const lms = data.lms?.trim() ?? ''
    const timeline = data.timeline?.trim() ?? ''
    const courseCount = data.courseCount?.trim() ?? ''
    const message = data.message?.trim() ?? ''

    if (!firstName || !lastName || !email || !role || !intent || !institution || !message) {
      return { success: false, error: 'Please complete the required fields' }
    }

    if (!EMAIL_REGEX.test(email)) {
      return { success: false, error: 'Invalid email address' }
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return { success: false, error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer` }
    }

    if (CONTACT_FORM_WEBHOOK_URL) {
      const response = await fetch(CONTACT_FORM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          role,
          intent,
          institution,
          department,
          lms,
          timeline,
          courseCount,
          message,
          source: 'edpilot-marketing',
          submittedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        return {
          success: false,
          error: `We could not send the message. Please email ${SUPPORT_EMAIL}.`,
        }
      }

      return {
        success: true,
        message: 'Message sent successfully',
      }
    }

    // No delivery channel is configured. Never tell the visitor the message was
    // sent when it would silently go nowhere — that loses real leads.
    if (process.env.NODE_ENV === 'production') {
      console.error(
        '[Contact] CONTACT_FORM_WEBHOOK_URL is not set — a submission could not be delivered.',
      )
      return {
        success: false,
        error: `Our contact form isn't accepting messages right now. Please email us directly at ${SUPPORT_EMAIL} and we'll respond quickly.`,
      }
    }

    // Development only: no webhook is expected locally, so allow the happy path
    // for UI testing without pretending a real delivery happened in production.
    console.warn('[Contact] No CONTACT_FORM_WEBHOOK_URL set; skipping delivery (development mode).')
    return {
      success: true,
      message: 'Message sent successfully',
    }
  } catch (error) {
    // Log server-side without exposing internals to the client
    console.error(
      '[Contact] Error processing contact form:',
      error instanceof Error ? error.message : String(error),
    )
    return {
      success: false,
      error: 'Failed to send message. Please try again.',
    }
  }
}
