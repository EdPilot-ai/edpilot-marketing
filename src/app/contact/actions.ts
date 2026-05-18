"use server";

import { SUPPORT_EMAIL } from "@/lib/marketing";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  message: string;
}

const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_FORM_WEBHOOK_URL = process.env.CONTACT_FORM_WEBHOOK_URL;

export async function sendContactMessage(data: ContactFormData) {
  try {
    // Trim all fields so whitespace-only strings are treated as empty
    const firstName = data.firstName?.trim() ?? "";
    const lastName = data.lastName?.trim() ?? "";
    const email = data.email?.trim() ?? "";
    const role = data.role?.trim() ?? "";
    const message = data.message?.trim() ?? "";

    if (!firstName || !lastName || !email || !role || !message) {
      return { success: false, error: "All fields are required" };
    }

    if (!EMAIL_REGEX.test(email)) {
      return { success: false, error: "Invalid email address" };
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return { success: false, error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer` };
    }

    if (CONTACT_FORM_WEBHOOK_URL) {
      const response = await fetch(CONTACT_FORM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          role,
          message,
          source: "edpilot-marketing",
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        return {
          success: false,
          error: `We could not send the message. Please email ${SUPPORT_EMAIL}.`,
        };
      }
    }

    return {
      success: true,
      message: "Message sent successfully",
    };
  } catch (error) {
    // Log server-side without exposing internals to the client
    console.error(
      "[Contact] Error processing contact form:",
      error instanceof Error ? error.message : String(error),
    );
    return {
      success: false,
      error: "Failed to send message. Please try again.",
    };
  }
}
