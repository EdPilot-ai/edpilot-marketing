"use server";

import { SUPPORT_EMAIL } from "@/lib/marketing";
import { submitContactIntake } from "@/lib/contact-intake";
import {
  CONTACT_FIELD_LIMITS,
  INTENT_VALUES,
  LMS_VALUES,
  ROLE_VALUES,
  TIMELINE_VALUES,
} from "@/lib/contact-options";
import { CONTACT_LIMITS, checkSubmissionAllowed } from "@/lib/rate-limit";

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
  // every input populate it, letting us drop the submission. Note this only
  // catches naive form-fillers — anything posting the action directly just
  // omits the field, which is why the rate limits below are the real control.
  company?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Public, unauthenticated entry point. Every accepted submission costs a
 * request to the contact-intake service on GCP, so this validates hard and
 * fails closed: unknown select values and oversized text are rejected rather
 * than forwarded.
 */
export async function sendContactMessage(data: ContactFormData) {
  try {
    // Honeypot tripped: pretend success so bots don't learn they were caught.
    if (data.company && data.company.trim() !== "") {
      return { success: true, message: "Message sent successfully" };
    }

    // Throttle before doing any downstream work, so a flood costs us nothing
    // beyond the function invocation itself.
    const verdict = await checkSubmissionAllowed("contact", CONTACT_LIMITS);
    if (!verdict.allowed) {
      return {
        success: false,
        error: `Too many submissions from this connection. Please wait a moment and try again, or email us at ${SUPPORT_EMAIL}.`,
      };
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

    // Length ceilings on every free-text field. Without these the only limit
    // is the server-action body size, which is far more than a lead form needs.
    const tooLong = (
      [
        ["firstName", firstName],
        ["lastName", lastName],
        ["email", email],
        ["institution", institution],
        ["department", department],
        ["courseCount", courseCount],
        ["message", message],
      ] as const
    ).find(([field, value]) => value.length > CONTACT_FIELD_LIMITS[field]);

    if (tooLong) {
      const [field] = tooLong;
      return {
        success: false,
        error:
          field === "message"
            ? `Message must be ${CONTACT_FIELD_LIMITS.message} characters or fewer`
            : "One of the fields is too long. Please shorten it and try again.",
      };
    }

    // Select fields must carry a value the form actually offers. These are
    // forwarded to GCP and stored, so an arbitrary string here is untrusted
    // data we have no reason to accept.
    if (!ROLE_VALUES.has(role) || !INTENT_VALUES.has(intent)) {
      return { success: false, error: "Please complete the required fields" };
    }

    if (lms && !LMS_VALUES.has(lms)) {
      return { success: false, error: "Please choose an LMS from the list." };
    }

    if (timeline && !TIMELINE_VALUES.has(timeline)) {
      return { success: false, error: "Please choose a timeline from the list." };
    }

    await submitContactIntake({
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
      submittedAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Message sent successfully",
    };
  } catch (error) {
    // Log server-side without exposing internals to the client. A thrown error
    // here means contact-intake did not confirm durable storage, so never report
    // success. Point the visitor at email so a real lead is not lost.
    // The message is logged but the submitted fields are not: they are visitor
    // PII and logs are a lower-trust store than the intake service.
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
