-- Newsletter subscriber storage (Vercel Postgres / Neon).
--
-- The application creates this table automatically on first use via
-- src/lib/newsletter.ts (CREATE TABLE IF NOT EXISTS). This file is the
-- canonical reference and can be run manually against the database, e.g.:
--
--   psql "$DATABASE_URL" -f db/schema.sql

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email           TEXT NOT NULL UNIQUE,
  source          TEXT,
  subscribed_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);
