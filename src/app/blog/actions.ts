"use server";

import { saveNewsletterSubscriber } from "@/lib/newsletter";
import { NEWSLETTER_EMAIL_MAX_LENGTH } from "@/lib/contact-options";
import { NEWSLETTER_LIMITS, checkSubmissionAllowed } from "@/lib/rate-limit";

interface NewsletterSubscriptionData {
  email: string;
  // Honeypot: a hidden field real users never fill. Bots that auto-complete
  // every input will populate it, letting us drop the request. It only stops
  // naive form-fillers; the rate limit below is what a scripted caller hits.
  company?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Public, unauthenticated entry point. Each accepted call is a Postgres write,
 * so this throttles first and caps the address length before touching the
 * database.
 */
export async function subscribeToNewsletter(data: NewsletterSubscriptionData) {
  try {
    // Honeypot tripped: pretend success so bots don't learn they were caught.
    if (data.company && data.company.trim() !== "") {
      return { success: true };
    }

    const verdict = await checkSubmissionAllowed("newsletter", NEWSLETTER_LIMITS);
    if (!verdict.allowed) {
      return {
        success: false,
        error: "Too many attempts from this connection. Please wait a moment and try again.",
      };
    }

    const email = data.email?.trim().toLowerCase() ?? "";

    if (!email) {
      return { success: false, error: "Please enter an email address." };
    }

    // The regex alone accepts an arbitrarily long string, which would land in
    // Postgres as an unbounded TEXT value on a UNIQUE index. Cap it first.
    if (email.length > NEWSLETTER_EMAIL_MAX_LENGTH || !EMAIL_REGEX.test(email)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    await saveNewsletterSubscriber(email, "edpilot-marketing-blog-newsletter");

    return { success: true };
  } catch (error) {
    // Log the failure reason only. The subscriber address is PII and does not
    // belong in application logs.
    console.error(
      "[Newsletter] Error processing subscription:",
      error instanceof Error ? error.message : String(error),
    );
    return {
      success: false,
      error: "Failed to subscribe. Please try again.",
    };
  }
}
