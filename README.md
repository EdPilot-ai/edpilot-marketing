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
