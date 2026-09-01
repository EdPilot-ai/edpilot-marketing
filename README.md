# edpilot-marketing

Public marketing site at **edpilot.ai**.

## Scope

This repo is the public site only. **It has no backend, no auth, and no database.** If your change requires a logged-in user, course data, or any product surface, it belongs in [`edpilot-app`](https://github.com/EdPilot-ai/edpilot-app), not here.

- Pages: home, about, products, compare, pricing, blog, faq, contact, legal.
- The contact form is a Next.js server action that POSTs to `CONTACT_FORM_WEBHOOK_URL`
  using the server-only `CONTACT_FORM_WEBHOOK_SECRET` bearer credential. Neither value
  is exposed to browser JavaScript.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Boundaries

ESLint blocks AWS SDKs, auth libs, and any import path under `dashboard/`, `learn/`, `auth/`, or `api/`. Don't disable the rule — move the code to `edpilot-app` instead.

## Security

See [`docs/SECURITY-AUDIT.md`](docs/SECURITY-AUDIT.md) for the full review, including the
GCP and Vercel billing controls that live outside this repo.

The two server actions (`sendContactMessage`, `subscribeToNewsletter`) are unauthenticated
public POST endpoints. Anything added to them must keep three properties:

- **Throttle before doing downstream work.** `checkSubmissionAllowed` in `src/lib/rate-limit.ts`
  runs first, so a flood costs nothing beyond the function invocation. It is a per-instance
  backstop, not a substitute for edge rate limiting.
- **Cap and validate every field server-side.** Limits and select allowlists live in
  `src/lib/contact-options.ts` and are shared with the form, so the two can't drift.
- **Fail closed.** Never report success to the visitor unless the submission was durably
  accepted, and never return internal error detail to the client.

Security response headers (CSP, HSTS, frame/MIME/referrer/permissions policy) are set for
every route in `next.config.mjs`.
