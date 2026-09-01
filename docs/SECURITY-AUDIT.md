# Security Audit — edpilot-marketing

**Scope:** the public marketing site at `edpilot.ai` (this repository) and the boundary
where it touches GCP.
**Date:** 2026-09-01
**Overall verdict:** **Medium risk before this change, Low risk after** — for the code in
this repository. Two things keep that from being the whole picture: the dependency tree
carries six high-severity advisories that need one `npm audit fix` (finding 8), and the
GCP billing exposure is **unresolved and cannot be fixed from this repository** — see
[GCP](#gcp-what-i-could-not-audit-and-what-you-must-do) below.

---

## Summary

This repo is a static-ish Next.js marketing site. It has no login, no session, no user
accounts, no file uploads, no API routes, and no product data. That removes most of the
classic web attack surface before we start: there is no authorization model to get wrong,
no tenant boundary to cross, and no student record within reach of this codebase.

The realistic threats are therefore narrow and specific:

1. **Abuse of the two public server actions to run up a bill.** This was the real finding.
2. **Missing browser-level hardening headers.**
3. **Standing visitor PII in Postgres with no retention or deletion path.**
4. **Known-vulnerable dependencies**, including three Next.js advisories that land on the
   exact server-action surface finding 1 is about.

There was no injection, XSS, SSRF, path traversal, secret leak, or authentication flaw.
All page content is compiled-in constants; the blog renders from a TypeScript array, not
from user or remote input; SQL uses parameterized tagged templates throughout; the webhook
URL comes from an environment variable and is never influenced by request data.

---

## Sensitive data involved

| Data | Where it lives | Notes |
| --- | --- | --- |
| Lead name, work email, institution, department, free-text message | POSTed to the contact-intake service on GCP | The system of record for contact submissions. |
| Same fields | `contact_submissions` table in Neon Postgres | **Retired path.** `src/lib/contact-store.ts` is no longer called — rows here are stale but still present. |
| Newsletter email | `newsletter_subscribers` table in Neon Postgres | Written on every blog signup. |
| Visitor analytics | Vercel Analytics / Speed Insights | No cookies, no cross-site identifiers. |

No student records, course materials, grades, or FERPA-covered education records are
handled by this repository. Contact submissions are ordinary business-contact PII —
lower sensitivity, but a professor's name plus institution plus a free-text message about
their AI policy is still information a university would not want casually exposed.

---

## Findings

### 1. Both server actions were unthrottled — HIGH (fixed here)

`sendContactMessage` and `subscribeToNewsletter` are `"use server"` actions. That makes
them unauthenticated public POST endpoints: anything the browser form can send, a script
can send in a loop. The honeypot field only catches naive form-filling bots — a caller
posting the action directly just omits the field.

Each accepted contact submission spends a request against the contact-intake service on
GCP. Each accepted newsletter signup spends a Postgres write. With no ceiling, a single
laptop could have driven Cloud Run scaling, GCP egress, Vercel function invocations, and
Neon compute for as long as it cared to — which is precisely the bill you're worried about.

**Fixed:** `src/lib/rate-limit.ts` adds a per-address limit (5 per 10 minutes) and a
per-instance global ceiling (60/min contact, 120/min newsletter) that still applies when
an attacker rotates source addresses. The check runs *before* any downstream work, so a
rejected flood costs only the function invocation.

> **This is a floor, not the control.** It is in-memory and per-instance, so on serverless
> the effective ceiling is (instances x limit). It blunts the cheap single-source flood.
> A distributed flood needs an edge rate limit — see [Required fixes](#required-fixes).

### 2. No length caps on most form fields — HIGH (fixed here)

Only `message` was capped (5000 chars). `firstName`, `lastName`, `email`, `institution`,
`department`, and `courseCount` had no server-side limit, and the newsletter email regex
`/^[^\s@]+@[^\s@]+\.[^\s@]+$/` accepts an arbitrarily long string. The only ceiling was
the Next.js server-action body limit (1 MB by default), so one request could push most of
a megabyte of attacker-controlled text through the GCP webhook and into storage.

**Fixed:** `CONTACT_FIELD_LIMITS` in `src/lib/contact-options.ts`, enforced server-side in
both actions and mirrored as `maxLength` on the inputs for UX.

### 3. Select fields accepted arbitrary values — MEDIUM (fixed here)

`role`, `intent`, `lms`, and `timeline` are dropdowns in the UI but were accepted as free
strings by the server action and forwarded to GCP verbatim. Not exploitable on its own —
nothing renders these back as HTML — but it meant untrusted strings landing in a field
every downstream consumer would reasonably assume was constrained.

**Fixed:** the option lists moved to `src/lib/contact-options.ts`, which the page and the
action both import. The server now validates against the same set the UI renders, so the
allowlist cannot drift from the form.

### 4. No security response headers — MEDIUM (fixed here)

The site shipped with no CSP, no `X-Content-Type-Options`, no `Referrer-Policy`, no
frame-ancestor restriction, and no `Permissions-Policy`. `poweredByHeader: false` was the
only hardening present. The site was framable (clickjacking a "Book a demo" CTA), leaked
full referrer URLs to outbound link targets, and had no defense-in-depth if a dependency
were ever compromised.

**Fixed:** `next.config.mjs` now sets CSP, `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`, and HSTS on every route.

> **CSP caveat, stated plainly:** `script-src` keeps `'unsafe-inline'`. Removing it
> requires a per-request nonce, which means nonce-issuing middleware and dynamic rendering
> on every page — that would drop this site's static generation and cost real money and
> latency, to defend a surface that renders no user-supplied HTML. What the policy does buy
> is origin control: an injected `<script src>` or a hijacked dependency cannot load code
> from, or beacon data out to, a host that isn't listed. Revisit the nonce approach if this
> site ever renders remote or visitor-authored content.

> **HSTS caveat:** `includeSubDomains` is set, which covers `app.edpilot.ai` and every
> other `*.edpilot.ai` host. Confirm they are all HTTPS-only before this ships. `preload`
> is deliberately omitted — the browser preload list is effectively a one-way door.

### 5. Application role holds DDL privileges in production — MEDIUM (lever added here)

`ensureSchema()` in both `newsletter.ts` and `contact-store.ts` ran `CREATE TABLE IF NOT
EXISTS` on every cold start, which means the database role in `DATABASE_URL` must hold
DDL rights. A leaked connection string then buys an attacker `DROP TABLE`, not just row
access. It also costs an extra round trip per cold start.

**Lever added:** `MARKETING_DB_AUTO_MIGRATE=false` skips the runtime DDL. It defaults to
`true` so nothing breaks on deploy. To close this out, apply `db/schema.sql` once, revoke
DDL from the app role, then set the flag. See [Required fixes](#required-fixes).

### 6. Retired contact-storage path still holds PII — MEDIUM (flagged, needs a decision)

`src/lib/contact-store.ts` and the `contact_submissions` table are dead: contact
submissions now go to the intake service on GCP. The module is unreferenced, but the table
and its rows still exist, so visitor PII is sitting in a second location that nothing reads
and nobody is monitoring. Data you don't use is pure liability in a security review.

**Needs your call:** if the intake service is the system of record, delete the module,
drop the table, and remove it from `db/schema.sql`. I left it in place because dropping a
table with real rows in it is your decision, not mine.

### 7. No data retention or deletion path — MEDIUM (flagged)

`newsletter_subscribers` has an `unsubscribed_at` column that nothing ever writes: there
is no unsubscribe route, no retention window, and no documented process for honoring a
deletion request. Your privacy policy is a public commitment; a university procurement
reviewer will ask how a subscriber exercises it. This is a gap between the policy page and
the implementation, and it will come up in a security questionnaire.

### 8. Six high-severity advisories in the dependency tree — HIGH (found by the new CI gate; the fix is one command, but see below)

The `npm audit` gate added in this change failed on its first run. That is the gate working:
these advisories are all present on `main` today. Three of them land **directly on the
surface this audit is about**:

| Advisory | Why it matters here |
| --- | --- |
| [Unauthenticated disclosure of internal Server Function endpoints](https://github.com/advisories/GHSA-955p-x3mx-jcvp) | The two forms in finding 1 *are* server functions. |
| [Denial of Service in App Router using Server Actions](https://github.com/advisories/GHSA-m99w-x7hq-7vfj) | The same abuse path the rate limiter addresses, one layer lower. |
| [Unbounded Server Action payload](https://github.com/advisories/GHSA-4c39-4ccg-62r3) | The 1 MB body ceiling finding 2 relies on. |

Also flagged: `postcss` (XSS via unescaped `</style>`, arbitrary file read via
attacker-controlled `sourceMappingURL`), `sharp` (inherited libvips CVEs), plus `js-yaml`,
`nanoid`, and `brace-expansion`.

**The fix is `npm audit fix`.** The site runs `next@16.2.10`; the advisories are fixed in
`16.3.0`, and `package.json` already declares `^16.2.4`, which permits it — so **only the
lockfile needs regenerating**, not the manifest.

**Not fixed here, and this is a real gap in this PR:** the npm registry is blocked by
network policy in the environment this audit ran in, so the lockfile could not be
regenerated. Hand-editing `package-lock.json` is not a safe substitute and was not
attempted. Run `npm audit fix` on a machine with registry access and push the lockfile;
the `audit` job goes green on its own.

### 9. Ten unused production dependencies — MEDIUM (flagged)

Declared in `package.json` and never imported anywhere in `src/`:

`gray-matter` · `next-mdx-remote` · `remark-gfm` · `rehype-slug` ·
`rehype-autolink-headings` · `zod` · `@radix-ui/react-dialog` · `@radix-ui/react-tabs` ·
`@radix-ui/react-tooltip` · `@radix-ui/react-separator`

(Of the Radix packages only `react-slot` is actually used, by `button.tsx`.)

Each is install-time script execution on every CI run and every deploy, and one more
package that can be compromised upstream — for a marketing site that imports none of them.
`gray-matter` is the direct source of the `js-yaml` advisory above, so dropping it removes
that finding outright rather than patching it.

Removing them also requires regenerating the lockfile, so it is blocked by the same
network restriction as finding 8.

### 10. No CI — LOW (fixed here)

`.github/workflows/` contained only a `.gitkeep`. Nothing ran lint, typecheck, tests, or a
dependency vulnerability scan on a pull request, so a vulnerable transitive dependency
could land silently. **Fixed:** `.github/workflows/ci.yml`.

### 11. `JSON.stringify` into a `<script>` tag — LOW (no action needed today)

`src/components/StructuredData.tsx` injects JSON-LD via `dangerouslySetInnerHTML` without
escaping `<` or `&`. Every input is a compiled-in constant, so this is **not exploitable**.
It is noted only because it becomes a real XSS sink the moment any of that schema data
becomes dynamic. If that ever happens, escape `<`, `>`, and `&` before injection.

### 12. `robots.txt` advertises paths that don't exist — INFORMATIONAL

`Disallow: /admin/`, `/api/`, `/.next/` — none of these exist in this repo. Harmless, but
it invites scanners to try them. Cosmetic; left alone.

---

## Things I specifically checked and found clean

- **SQL injection** — all queries use Neon's tagged-template parameterization. No string concatenation into SQL anywhere.
- **XSS** — no `innerHTML`, no `eval`, no `new Function`. The only `dangerouslySetInnerHTML` is finding 9 (static data). The blog's hand-rolled markdown renderer produces React nodes, not HTML strings, so it escapes by construction.
- **Path traversal** — the `/blog/[slug]` route looks the slug up in a static array. No filesystem access from a request parameter.
- **SSRF** — the only outbound fetch is `submitContactIntake`, whose URL comes from an env var. Request data never influences the destination. HTTPS is enforced in production, the query string and fragment are stripped, and there's a 10s timeout.
- **Secret handling** — `CONTACT_FORM_WEBHOOK_SECRET` and `DATABASE_URL` are server-only; nothing sensitive is `NEXT_PUBLIC_`-prefixed. No secrets committed; `.env*` is gitignored.
- **Error handling** — both actions fail closed. A failed intake POST is never reported to the visitor as success. Internal error details are logged server-side, never returned to the client.
- **Logging hygiene** — the catch blocks log the error message only, not the submitted fields. Visitor PII stays out of application logs. (I tightened the comments here so it stays that way.)
- **CSRF** — Next.js server actions verify `Origin` against `Host` by default, which covers the cross-site case.
- **Auth / roles / tenant isolation** — not applicable. This repo has no authentication, no roles, and no tenant-scoped data. The ESLint boundary rule (`no-restricted-imports` blocking `iron-session`, `jose`, and `**/auth/**`) is a good guard that keeps it that way; don't disable it.

---

## GCP: what I could not audit, and what you must do

**I could not audit your GCP project.** This repository contains zero GCP code — no
Terraform, no service definitions, no IAM policy, no `gcloud` config. The only GCP
touchpoint is a single outbound POST to `CONTACT_FORM_WEBHOOK_URL` carrying a bearer
token. Everything below is a checklist you or someone with console access has to verify;
I am not able to confirm any of it from here, and you should not treat it as verified.

Your stated fear — a runaway bill — is **almost entirely a GCP-side configuration problem,
not a code problem.** The rate limits I added help, but they are not the control.

### Billing — do these first

1. **A GCP budget alert does not cap spend. It only emails you.** This is the single most
   misunderstood thing about GCP billing. To get a real ceiling you must wire the budget's
   Pub/Sub topic to a Cloud Function that calls `projects.updateBillingInfo` to detach the
   billing account. Set this up, and *test it* in a scratch project. Without it, "budget
   alert configured" is not protection.
2. **Set a budget with thresholds at 50 / 90 / 100% of what you can actually afford**, and
   route the alerts to a channel someone reads at 2am, not just email.
3. **Cap Vertex AI**. It isn't called from this repo, but it's the highest per-request cost
   in your stack and your privacy policy lists it. Set per-project quota overrides on
   requests-per-minute for every Vertex model you use. Quotas are a hard ceiling; budgets
   are not.

### The contact-intake service

4. **Set `--max-instances` to a small number** (3–5 is plenty for a contact form). Cloud
   Run defaults to a high cap; that default is what turns a form flood into a bill.
5. **Set `--min-instances=0`** so an idle form costs nothing.
6. **Put a rate limit in front of it.** Cloud Armor rate-limiting rules if it sits behind
   an HTTPS load balancer. This is the control that actually stops a distributed flood —
   my in-process limiter cannot.
7. **Verify the bearer check is constant-time and rejects before doing any work.** A
   `===` string comparison on a secret is timing-attackable; use `crypto.timingSafeEqual`.
   Reject unauthorized requests before touching Firestore, GCS, or any billable service.
8. **Confirm the service is not reachable except at the intake path**, and that its service
   account holds only the permissions the intake flow needs — not project Editor.
9. **Store `CONTACT_FORM_WEBHOOK_SECRET` in Secret Manager** on the GCP side (Vercel env
   var on this side), and rotate it. Support two valid secrets during a rotation window so
   rotation isn't an outage.

### Logging and observability

10. **Cloud Logging ingestion is billed by volume.** A request flood becomes a logging bill
    on top of a compute bill. Set log exclusion filters for high-volume noise and cut
    retention to what you actually need.
11. **Alert on request-rate anomalies** on the intake service, not just on cost — cost
    alerts arrive after the money is spent.

### Vercel and Neon (not GCP, same failure mode)

12. **Enable Vercel Firewall rate limiting** on the contact and newsletter POST paths. This
    is the proper home for finding 1 and makes the in-process limiter a backstop rather
    than the front line.
13. **Turn on Vercel Spend Management with a hard pause** at a threshold you choose.
14. **Cap Neon autoscaling** and confirm compute autosuspend is enabled, so a write flood
    can't scale compute indefinitely.

---

## Required fixes

Shipped in this change:

- [x] Rate limit both public server actions, per address and per instance
- [x] Length caps on every free-text field, server-side
- [x] Allowlist validation for the four select fields, sharing one source of truth with the UI
- [x] CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
- [x] `MARKETING_DB_AUTO_MIGRATE` lever for a non-DDL database role
- [x] CI running lint, typecheck, tests, and `npm audit`

Yours to do, in priority order:

- [ ] **Run `npm audit fix` and push the lockfile.** One command, clears six high advisories including three Next.js server-action ones. Blocked in the audit environment, not in yours.
- [ ] **Drop the ten unused production dependencies** (finding 9) in the same pass.
- [ ] **Wire a GCP budget to a billing-disable function.** Highest impact for your stated concern.
- [ ] **Cap `--max-instances` on the contact-intake Cloud Run service.**
- [ ] **Add Vercel Firewall rate limiting** on the two action paths.
- [ ] **Enable Vercel Spend Management** with a hard pause.
- [ ] **Cloud Armor rate limiting** in front of contact-intake.
- [ ] **Verify the intake bearer check is constant-time** and rejects before billable work.
- [ ] **Apply `db/schema.sql`, revoke DDL from the app database role, set `MARKETING_DB_AUTO_MIGRATE=false`.**
- [ ] **Decide on `contact_submissions`:** drop the table and delete `src/lib/contact-store.ts`, or wire it back up. Don't leave PII in a table nothing reads.
- [ ] **Define a retention window and a deletion path** for `newsletter_subscribers`, and build the unsubscribe route that `unsubscribed_at` is waiting for.
- [ ] **Confirm every `*.edpilot.ai` host is HTTPS-only** before the `includeSubDomains` HSTS header reaches production.
- [ ] **Rotate `CONTACT_FORM_WEBHOOK_SECRET`** if it has ever been pasted into a chat, ticket, or shared doc.

---

## Verification note

`npm ci` is blocked by the network egress policy in the environment where this audit was
performed, so nothing could be executed locally. CI on PR #23 was the first real run:

- **`verify` (lint, typecheck, tests, build): passing.**
- **CodeQL: passing.**
- **Vercel preview: deployed successfully**, which confirms the new CSP and header config
  builds and serves.
- **`audit`: failing**, on the six pre-existing advisories in finding 8. That failure is
  the gate doing its job on a tree that was already vulnerable, and it clears with
  `npm audit fix` run somewhere with registry access.
