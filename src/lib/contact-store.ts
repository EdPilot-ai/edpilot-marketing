import { type NeonQueryFunction } from "@neondatabase/serverless";
import { getSql, runtimeMigrationsEnabled } from "@/lib/db";

/**
 * Contact form submission storage backed by Vercel Postgres (Neon).
 *
 * NOTE: currently unused. Contact submissions go to the contact-intake service
 * on GCP via src/lib/contact-intake.ts; this module is the retired direct-to-
 * Postgres path. It is kept because the table and its rows still exist. If the
 * intake service stays the system of record, delete this module and drop the
 * table so visitor PII is not sitting in two places — see
 * docs/SECURITY-AUDIT.md.
 */
export interface ContactSubmissionRecord {
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
}

let schemaReady: Promise<void> | null = null;

/**
 * Create the submissions table on first use. Cached for the lifetime of the
 * process so the DDL runs at most once per cold start. CREATE TABLE IF NOT
 * EXISTS is idempotent, so this is safe to run repeatedly.
 *
 * Skipped entirely when MARKETING_DB_AUTO_MIGRATE=false, which lets the
 * database role drop its DDL privileges once db/schema.sql has been applied.
 */
function ensureSchema(sql: NeonQueryFunction<false, false>): Promise<void> {
  if (!runtimeMigrationsEnabled()) return Promise.resolve();
  if (!schemaReady) {
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        role TEXT NOT NULL,
        intent TEXT,
        institution TEXT,
        department TEXT,
        lms TEXT,
        timeline TEXT,
        course_count TEXT,
        message TEXT NOT NULL,
        source TEXT,
        submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `.then(() => undefined);

    // If the DDL fails, clear the cache so a later request can retry.
    schemaReady.catch(() => {
      schemaReady = null;
    });
  }
  return schemaReady;
}

/**
 * Persist a contact form submission. Fields are expected to be already trimmed
 * and validated by the caller.
 *
 * @returns `{ stored: true }` when written to the database, or
 *          `{ stored: false }` in local development with no database configured.
 * @throws  if a database is expected (production) but DATABASE_URL is missing,
 *          or if the insert fails.
 */
export async function saveContactSubmission(
  record: ContactSubmissionRecord,
): Promise<{ stored: boolean }> {
  const sql = getSql();

  if (!sql) {
    // No database configured. In production this is a misconfiguration we must
    // surface: never tell the visitor the message was delivered when it wasn't.
    if (process.env.NODE_ENV === "production") {
      throw new Error("DATABASE_URL is not configured");
    }
    // Development: allow the happy path so the UI can be tested without a DB.
    console.warn("[Contact] No DATABASE_URL set; skipping storage (development mode).");
    return { stored: false };
  }

  await ensureSchema(sql);
  await sql`
    INSERT INTO contact_submissions (
      first_name, last_name, email, role, intent, institution,
      department, lms, timeline, course_count, message, source
    )
    VALUES (
      ${record.firstName}, ${record.lastName}, ${record.email}, ${record.role},
      ${record.intent}, ${record.institution}, ${record.department}, ${record.lms},
      ${record.timeline}, ${record.courseCount}, ${record.message}, ${record.source}
    )
  `;

  return { stored: true };
}
