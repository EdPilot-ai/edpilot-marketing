/**
 * Canonical option sets for the contact form.
 *
 * These live outside the page component so the client form and the server
 * action share one source of truth. The server action validates submitted
 * values against the derived `*_VALUES` sets, so a select field can only ever
 * carry a value the UI actually offers. Keeping both sides on this module is
 * what stops the allowlist from drifting when the marketing copy changes.
 */

export interface ContactSelectOption {
  value: string;
  label: string;
  detail?: string;
}

export const INTENT_OPTIONS: ContactSelectOption[] = [
  { value: "book-demo", label: "Book a university demo", detail: "For teams evaluating rollout." },
  {
    value: "start-pilot",
    label: "Plan a university pilot",
    detail: "For a university-owned course-material evaluation.",
  },
  {
    value: "security-procurement",
    label: "Security or procurement",
    detail: "For IT, legal, privacy, or accessibility questions.",
  },
  { value: "general-question", label: "General question", detail: "For anything else." },
];

export const ROLE_OPTIONS: ContactSelectOption[] = [
  { value: "professor", label: "Professor / Instructor" },
  { value: "department-head", label: "Department Head" },
  { value: "administrator", label: "University Administrator" },
  { value: "it-staff", label: "IT / LMS Staff" },
  { value: "student", label: "Student" },
  { value: "partner", label: "Partner / Vendor" },
  { value: "other", label: "Other" },
];

export const LMS_OPTIONS: ContactSelectOption[] = [
  { value: "canvas", label: "Canvas" },
  { value: "blackboard", label: "Blackboard" },
  { value: "moodle", label: "Moodle" },
  { value: "brightspace", label: "D2L Brightspace" },
  { value: "none", label: "Not sure / none" },
  { value: "other", label: "Other" },
];

export const TIMELINE_OPTIONS: ContactSelectOption[] = [
  { value: "this-month", label: "This month" },
  { value: "this-term", label: "This term" },
  { value: "next-term", label: "Next term" },
  { value: "exploring", label: "Just exploring" },
];

function valuesOf(options: ContactSelectOption[]): ReadonlySet<string> {
  return new Set(options.map((option) => option.value));
}

export const INTENT_VALUES = valuesOf(INTENT_OPTIONS);
export const ROLE_VALUES = valuesOf(ROLE_OPTIONS);
export const LMS_VALUES = valuesOf(LMS_OPTIONS);
export const TIMELINE_VALUES = valuesOf(TIMELINE_OPTIONS);

/**
 * Maximum accepted length for each free-text field, enforced server-side.
 *
 * Without these the only ceiling is the Next.js server-action body limit
 * (1 MB by default), so a single scripted request could push most of a
 * megabyte of attacker-controlled text through the contact webhook and into
 * downstream storage. The values are generous for real leads and cheap to
 * enforce. `email` is the RFC 5321 maximum.
 */
export const CONTACT_FIELD_LIMITS = {
  firstName: 100,
  lastName: 100,
  email: 254,
  institution: 200,
  department: 200,
  courseCount: 32,
  message: 5000,
} as const;

/** Maximum accepted length for a newsletter email address (RFC 5321). */
export const NEWSLETTER_EMAIL_MAX_LENGTH = 254;
