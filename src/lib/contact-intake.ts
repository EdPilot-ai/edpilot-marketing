export interface ContactIntakeSubmission {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  intent: string;
  institution: string;
  department: string;
  lms: string;
  timeline: string;
  courseCount: string;
  message: string;
  source: string;
  submittedAt: string;
}

interface ContactIntakeOptions {
  endpoint?: string;
  secret?: string;
  nodeEnv?: string;
  fetchImpl?: typeof fetch;
}

const REQUEST_TIMEOUT_MS = 10_000;

export function resolveContactIntakeEndpoint(rawEndpoint: string, nodeEnv: string): string {
  let endpoint: URL;
  try {
    endpoint = new URL(rawEndpoint);
  } catch {
    throw new Error("CONTACT_FORM_WEBHOOK_URL is invalid");
  }

  if (nodeEnv === "production" && endpoint.protocol !== "https:") {
    throw new Error("CONTACT_FORM_WEBHOOK_URL must use HTTPS in production");
  }

  if (endpoint.pathname === "/") endpoint.pathname = "/submit";
  endpoint.search = "";
  endpoint.hash = "";
  return endpoint.toString();
}

export async function submitContactIntake(
  submission: ContactIntakeSubmission,
  options: ContactIntakeOptions = {},
): Promise<void> {
  const rawEndpoint = options.endpoint ?? process.env.CONTACT_FORM_WEBHOOK_URL?.trim() ?? "";
  const secret = options.secret ?? process.env.CONTACT_FORM_WEBHOOK_SECRET?.trim() ?? "";
  const nodeEnv = options.nodeEnv ?? process.env.NODE_ENV ?? "development";

  if (!rawEndpoint) throw new Error("CONTACT_FORM_WEBHOOK_URL is not configured");
  if (!secret) throw new Error("CONTACT_FORM_WEBHOOK_SECRET is not configured");

  const endpoint = resolveContactIntakeEndpoint(rawEndpoint, nodeEnv);
  const response = await (options.fetchImpl ?? fetch)(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submission),
    cache: "no-store",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`contact-intake rejected the submission with HTTP ${response.status}`);
  }
}
