"use server";

import { SUPPORT_EMAIL } from "@/lib/marketing";
import { saveContactSubmission } from "@/lib/contact-store";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  intent?: string;
  institution?: string;
  department?: string;
  lms?: string;
  timeline?: string;
  courseCount?: string;
  message: string;
  // Honeypot: hidden field real users never fill. Bots that auto-complete
  // every input populate it, letting us drop the submission.
  company?: string;
}

const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(data: ContactFormData) {
  try {
    // Honeypot tripped: pretend success so bots don't learn they were caught.
    if (data.company && data.company.trim() !== "") {
      return { success: true, message: "Message sent successfully" };
    }

    // Trim all fields so whitespace-only strings are treated as empty
    const firstName = data.firstName?.trim() ?? "";
    const lastName = data.lastName?.trim() ?? "";
    const email = data.email?.trim() ?? "";
    const role = data.role?.trim() ?? "";
    const intent = data.intent?.trim() ?? "";
    const institution = data.institution?.trim() ?? "";
    const department = data.department?.trim() ?? "";
    const lms = data.lms?.trim() ?? "";
    const timeline = data.timeline?.trim() ?? "";
    const courseCount = data.courseCount?.trim() ?? "";
    const message = data.message?.trim() ?? "";

    if (!firstName || !lastName || !email || !role || !intent || !institution || !message) {
      return { success: false, error: "Please complete the required fields" };
    }

    if (!EMAIL_REGEX.test(email)) {
      return { success: false, error: "Invalid email address" };
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return { success: false, error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer` };
    }

    await saveContactSubmission({
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
      source: "edpilot-marketing",
    });

    return {
      success: true,
      message: "Message sent successfully",
    };
  } catch (error) {
    // Log server-side without exposing internals to the client. A thrown error
    // here means the submission was NOT stored (e.g. missing DATABASE_URL in
    // production), so never report success. Point the visitor at email so a
    // real lead is not lost.
    console.error(
      "[Contact] Error processing contact form:",
      error instanceof Error ? error.message : String(error),
    );
    return {
      success: false,
      error: `We couldn't submit your message right now. Please email us directly at ${SUPPORT_EMAIL} and we'll respond quickly.`,
    };
  }
}
