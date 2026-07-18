import { describe, expect, it, vi } from "vitest";
import {
  resolveContactIntakeEndpoint,
  submitContactIntake,
  type ContactIntakeSubmission,
} from "./contact-intake";

const submission: ContactIntakeSubmission = {
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.edu",
  role: "Professor",
  intent: "Pilot",
  institution: "Example University",
  department: "Computer Science",
  lms: "Canvas",
  timeline: "Fall",
  courseCount: "3",
  message: "I want to learn more.",
  source: "edpilot-marketing",
  submittedAt: "2026-07-18T12:00:00.000Z",
};

describe("contact-intake bridge", () => {
  it("adds the submit path to a service root URL", () => {
    expect(resolveContactIntakeEndpoint("https://contact.example.com", "production")).toBe(
      "https://contact.example.com/submit",
    );
  });

  it("requires HTTPS in production", () => {
    expect(() => resolveContactIntakeEndpoint("http://contact.example.com/submit", "production"))
      .toThrow("must use HTTPS");
  });

  it("posts the complete submission with a server-side bearer secret", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 200 }));

    await submitContactIntake(submission, {
      endpoint: "https://contact.example.com",
      secret: "shared-secret",
      nodeEnv: "production",
      fetchImpl,
    });

    expect(fetchImpl).toHaveBeenCalledOnce();
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe("https://contact.example.com/submit");
    expect(init?.headers).toEqual({
      Authorization: "Bearer shared-secret",
      "Content-Type": "application/json",
    });
    expect(JSON.parse(String(init?.body))).toEqual(submission);
  });

  it("fails closed when the URL or secret is missing", async () => {
    await expect(
      submitContactIntake(submission, { endpoint: "", secret: "secret" }),
    ).rejects.toThrow("URL is not configured");
    await expect(
      submitContactIntake(submission, {
        endpoint: "https://contact.example.com/submit",
        secret: "",
      }),
    ).rejects.toThrow("SECRET is not configured");
  });

  it("does not treat a rejected intake request as success", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response("Unauthorized", { status: 401 }));

    await expect(
      submitContactIntake(submission, {
        endpoint: "https://contact.example.com/submit",
        secret: "wrong-secret",
        nodeEnv: "production",
        fetchImpl,
      }),
    ).rejects.toThrow("HTTP 401");
  });
});
