'use server'

import { saveNewsletterSubscriber } from '@/lib/newsletter'

interface NewsletterSubscriptionData {
  email: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function subscribeToNewsletter(data: NewsletterSubscriptionData) {
  try {
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
