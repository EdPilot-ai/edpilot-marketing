'use server'

import { saveNewsletterSubscriber } from '@/lib/newsletter'

interface NewsletterSubscriptionData {
  email: string
  // Honeypot: a hidden field real users never fill. Bots that auto-complete
  // every input will populate it, letting us drop the request.
  company?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function subscribeToNewsletter(data: NewsletterSubscriptionData) {
  try {
    // Honeypot tripped — pretend success so bots don't learn they were caught.
    if (data.company && data.company.trim() !== '') {
      return { success: true }
    }

    const email = data.email?.trim().toLowerCase() ?? ''

    if (!email) {
      return { success: false, error: 'Please enter an email address.' }
    }

    if (!EMAIL_REGEX.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' }
    }

    await saveNewsletterSubscriber(email, 'edpilot-marketing-blog-newsletter')

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
