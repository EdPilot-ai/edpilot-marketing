import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

/**
 * Newsletter subscriber storage backed by Vercel Postgres (Neon).
 *
 * The Neon Vercel integration provisions the database and exposes the
 * connection string as DATABASE_URL (POSTGRES_URL is accepted as a fallback
 * for the older Vercel Postgres naming).
 */
const DATABASE_URL = process.env.DATABASE_URL ?? process.env.POSTGRES_URL

let sqlClient: NeonQueryFunction<false, false> | null = null
let schemaReady: Promise<void> | null = null

function getSql(): NeonQueryFunction<false, false> | null {
  if (!DATABASE_URL) return null
  if (!sqlClient) {
    sqlClient = neon(DATABASE_URL)
  }
  return sqlClient
}

/**
 * Create the subscribers table on first use. Cached for the lifetime of the
 * process so the DDL runs at most once per cold start. CREATE TABLE IF NOT
 * EXISTS is idempotent, so this is safe to run repeatedly.
 */
function ensureSchema(sql: NeonQueryFunction<false, false>): Promise<void> {
  if (!schemaReady) {
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        source TEXT,
        subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        unsubscribed_at TIMESTAMPTZ
      )
    `.then(() => undefined)

    // If the DDL fails, clear the cache so a later request can retry.
    schemaReady.catch(() => {
      schemaReady = null
    })
  }
  return schemaReady
}

/**
 * Persist a newsletter subscriber. The email is expected to be already
 * trimmed/lowercased and validated by the caller. Re-subscribing with an email
 * that already exists is a no-op (idempotent), not an error.
 *
 * @returns `{ stored: true }` when written to the database, or
 *          `{ stored: false }` in local development with no database configured.
 * @throws  if a database is expected (production) but DATABASE_URL is missing,
 *          or if the insert fails.
 */
export async function saveNewsletterSubscriber(
  email: string,
  source: string,
): Promise<{ stored: boolean }> {
  const sql = getSql()

  if (!sql) {
    // No database configured. In production this is a misconfiguration we must
    // surface — never pretend a subscription was stored when it wasn't.
    if (process.env.NODE_ENV === 'production') {
      throw new Error('DATABASE_URL is not configured')
    }
    // Development: allow the happy path so the UI can be tested without a DB.
    console.warn('[Newsletter] No DATABASE_URL set; skipping storage (development mode).')
    return { stored: false }
  }

  await ensureSchema(sql)
  await sql`
    INSERT INTO newsletter_subscribers (email, source)
    VALUES (${email}, ${source})
    ON CONFLICT (email) DO NOTHING
  `

  return { stored: true }
}
