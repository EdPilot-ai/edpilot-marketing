"use server";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  message: string;
}

const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    // TODO: forward to CONTACT_FORM_WEBHOOK_URL or an email provider.

    // Dev-only: surface submissions without logging PII to production stdout
    if (process.env.NODE_ENV !== "production") {
      console.log("[Contact] Form submission received", {
        role,
        messageLength: message.length,
        timestamp: new Date().toISOString(),
      });
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
