import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

/**
 * Shared Postgres client for the marketing site, backed by Vercel Postgres
 * (Neon). The Neon Vercel integration provisions the database and exposes the
 * connection string as DATABASE_URL (POSTGRES_URL is accepted as a fallback for
 * the older Vercel Postgres naming).
 */
const DATABASE_URL = process.env.DATABASE_URL ?? process.env.POSTGRES_URL

let sqlClient: NeonQueryFunction<false, false> | null = null

/**
 * Returns a cached Neon SQL client, or `null` when no database is configured
 * (e.g. local development without DATABASE_URL set). Callers decide how to
 * handle the unconfigured case.
 */
export function getSql(): NeonQueryFunction<false, false> | null {
  if (!DATABASE_URL) return null
  if (!sqlClient) {
    sqlClient = neon(DATABASE_URL)
  }
  return sqlClient
}

/**
 * Whether the app may issue DDL (CREATE TABLE IF NOT EXISTS) at runtime.
 *
 * Defaults to true so existing deployments keep working untouched. Turning it
 * off is the least-privilege posture: run `db/schema.sql` once, revoke DDL
 * from the application's database role, and set
 * `MARKETING_DB_AUTO_MIGRATE=false`. After that a leaked or misused
 * DATABASE_URL can only read and write rows in the two known tables — it
 * cannot create, alter, or drop schema objects.
 */
export function runtimeMigrationsEnabled(): boolean {
  return process.env.MARKETING_DB_AUTO_MIGRATE !== 'false'
}
