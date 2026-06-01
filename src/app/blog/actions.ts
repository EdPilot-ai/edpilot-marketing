'use server'

interface NewsletterSubscriptionData {
  email: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CONTACT_FORM_WEBHOOK_URL = process.env.CONTACT_FORM_WEBHOOK_URL

export async function subscribeToNewsletter(data: NewsletterSubscriptionData) {
  try {
    const email = data.email?.trim().toLowerCase() ?? ''

    if (!email) {
      return { success: false, error: 'Please enter an email address.' }
    }

    if (!EMAIL_REGEX.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' }
    }

    if (CONTACT_FORM_WEBHOOK_URL) {
      const response = await fetch(CONTACT_FORM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Newsletter',
          lastName: 'Subscriber',
          email,
          role: 'newsletter-subscriber',
          intent: 'newsletter-subscribe',
          institution: 'Not provided',
          department: '',
          lms: '',
          timeline: '',
          courseCount: '',
          message: 'Blog newsletter subscription.',
          source: 'edpilot-marketing-blog-newsletter',
          submittedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        return {
          success: false,
          error: 'We could not receive your subscription. Please try again.',
        }
      }

      return { success: true }
    }

    if (process.env.NODE_ENV === 'production') {
      console.error(
        '[Newsletter] CONTACT_FORM_WEBHOOK_URL is not set — a subscription could not be stored.',
      )
      return {
        success: false,
        error: 'Newsletter subscriptions are not accepting emails right now. Please try again later.',
      }
    }

    console.warn('[Newsletter] No CONTACT_FORM_WEBHOOK_URL set; skipping storage (development mode).')
    return { success: true }
  } catch (error) {
    console.error(
      '[Newsletter] Error processing subscription:',
      error instanceof Error ? error.message : String(error),
    )
    return {
      success: false,
      error: 'Failed to subscribe. Please try again.',
    }
  }
}
