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

-- Contact form submissions. Created automatically on first use via
-- src/lib/contact-store.ts.
CREATE TABLE IF NOT EXISTS contact_submissions (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name   TEXT NOT NULL,
  last_name    TEXT NOT NULL,
  email        TEXT NOT NULL,
  role         TEXT NOT NULL,
  intent       TEXT,
  institution  TEXT,
  department   TEXT,
  lms          TEXT,
  timeline     TEXT,
  course_count TEXT,
  message      TEXT NOT NULL,
  source       TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
