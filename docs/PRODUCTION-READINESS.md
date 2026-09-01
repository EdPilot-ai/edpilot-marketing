# Production Readiness & Legal Risk Audit

Date: 2026-09-01
Scope: every route under `src/app`, every component under `src/components`, `src/lib/*`,
`public/llm.txt`, `public/robots.txt`, `next.config.mjs`, `.github/`, and `db/schema.sql`.

This audit is deliberately adversarial. It is written from the position of the three people most
likely to cost EdPilot money: a university procurement officer who relied on a claim, a plaintiff's
lawyer looking for a provable misstatement, and a competitor's counsel reading the comparison pages.

**Nothing in this document is legal advice.** Every Tier 0 item should be reviewed by counsel before
launch. What this document does is find the specific lines that create exposure and turn each one
into a scoped engineering task.

> **Build verification note:** `npm ci` could not complete in the audit environment — the registry
> proxy returned `403 Forbidden` on `zwitch@2.0.4`, a transitive dependency. Lint, typecheck, tests,
> and build were therefore **not** run. No finding below depends on them.
>
> **Repo state:** audited against `main` @ `d2fdbdf`. A sibling branch,
> `claude/web-app-security-audit-uw5qws` (commit `f5ab773`, unmerged), already implements several
> Tier 1 items — CI, security headers and a CSP, rate limiting, and contact-storage changes. Findings
> P2, P3, P4, and P8 are stated against `main` and are **already addressed on that branch**; the
> corresponding tickets say reconcile, not rebuild. Every Tier 0 finding is untouched by it.

---

## Severity summary

| Tier | Meaning | Count |
| --- | --- | --- |
| **Tier 0** | Ship blocker. Provable misstatement, missing legally required mechanism, or claim the product cannot honor. | 14 |
| **Tier 1** | Production readiness. Real defects, no direct legal exposure. | 13 |

The single most dangerous property of this site is not any one claim. It is that **the site
contradicts itself in writing on capability, compliance, and pricing.** A contradiction is worth more
to an opposing party than an exaggeration, because it proves the company knew.

---

## Tier 0 — Legal exposure

### L1. Canvas LMS is marketed as "Live" while the FAQ says it is not built

| Where | What it says |
| --- | --- |
| `src/app/page.tsx:391-398` | Canvas LMS card, `status: "live"`, green **Live** badge — "Sync courses, rosters, assignments, and due dates directly from Canvas, so the assistant knows what's due and when." |
| `src/components/marketing/ComparisonMatrix.tsx` (LMS-independence row) | "Syncs with Canvas today." |
| `src/app/how-it-works/page.tsx:45-47` | "Canvas connects with a secure token in seconds, not a six-week IT integration." |
| `src/app/faq/page.tsx:156-158` | "Direct file upload is available now. **Canvas developer access and deeper LMS workflows are in progress** for institutional pilots." |

The homepage sells a roster-sync integration with a green **Live** badge. The FAQ, four clicks away,
says Canvas access is still being obtained. Both statements are published simultaneously.

**Exposure.** Material misrepresentation to institutional buyers; rescission and breach claims from
any university that signs on the strength of the integration; state UDAP / deceptive-trade-practices
claims; and, where the buyer is a public institution, a procurement-fraud posture. This is the
highest-probability claim on the site because a plaintiff does not need an expert — they need two
screenshots.

### L2. Terms and Privacy Policy describe LTI 1.3 data flows the homepage calls "Planned"

- `src/app/terms/page.tsx:280-302` — "EdPilot **supports** Learning Tools Interoperability (LTI 1.3)…"
  including NRPS roster sync and AGS grade passback, written as operative contract language.
- `src/app/privacy-policy/page.tsx:93-103` — an entire disclosed collection category for LTI launch
  payloads, "treated as student education records under FERPA."
- `src/app/accessibility/page.tsx:285-288` — "LTI launches from Canvas Mobile and Blackboard Student
  apps are tested for accessibility parity."
- `src/app/page.tsx:405-412` — LTI 1.3 badged **Planned**, "is on the roadmap."

A privacy policy that discloses collection of data you do not collect is a misstatement in the one
document a regulator reads first. A Terms of Service that warrants a capability you do not have is a
misstatement in a binding contract.

### L3. SOC 2 is claimed on the homepage despite the repo's own flag disabling it

- `src/app/page.tsx:465-471` — "**SOC 2 Type II audit in progress.** Procurement-ready notes cover
  data handling, LMS status, retention, and rollout."
- `src/lib/social-proof.ts:101` — `{ id: "soc2", label: "SOC 2 Type II", enabled: false, note: "in progress" }`
- `src/lib/social-proof.ts:87-89` — `TODO(CONFIRM): SOC 2 is disabled until an audit is actually
  underway/complete. Flip enabled: true only when true.`

The data-driven badge is correctly switched **off**. The homepage then states the same claim in
prose, bypassing the control entirely. The file's own comment at `:91-93` warns that this exact
duplication exists and must be kept in sync; it was not.

**Exposure.** Misrepresented security posture is the category the FTC has most actively pursued
against software vendors, and it is the single claim enterprise and .edu procurement verifies first —
by asking for the auditor's name and the report. If no audit is engaged, this line should not exist.

### L4. The accessibility statement asserts audits, CI gating, and test cycles that do not exist here

- `src/app/accessibility/page.tsx:74-79` — "substantially conformant with WCAG 2.2 Level AA across
  all platform surfaces. The following accessibility features have been **engineered, audited, and
  verified**."
- `:322-336` — "Automated axe-core accessibility audit runs **on every pull request via GitHub
  Actions**"; "Pa11y-CI is configured for scheduled scanning against staging deployments"; "the a11y
  audit gate [is] required to pass before code merges to main."
- `:273-276` — "Platform tested with iOS VoiceOver (Safari) and Android TalkBack (Chrome) … as part
  of **each release cycle**."
- `:421-428` — "A VPAT® / Accessibility Conformance Report … is available to institutional
  procurement teams upon request."
- `.github/workflows/` on `main` contains **only `.gitkeep`**. The only checks running on a pull
  request are GitHub's default-setup CodeQL scans, configured in repo settings rather than by a
  committed workflow. There is no axe-core, no Pa11y, and no merge gate anywhere. (The sibling
  branch's `ci.yml` adds lint, typecheck, test, build, and `npm audit` — but no accessibility job, so
  this claim stays false even after it merges.)
- `:371-379` describes "the current CSP includes `'unsafe-inline'` for scripts." On `main` there is
  no CSP at all — `next.config.mjs` sets no headers and there is no middleware. The sibling branch
  adds one that does keep `'unsafe-inline'` in `script-src`, with a documented rationale, so this
  particular sentence becomes true once that branch lands. It is not true today.

The statement also documents surfaces that do not exist on this site at all (XP progress bars, course
leaderboards, session-timeout dialogs, a materials accessibility scanner), which means it cannot have
been verified against the property it is published on.

**Exposure.** ADA Title II/III and Section 508. Universities procure against published conformance
claims and VPATs; plaintiffs' firms specifically target sites that publish a conformance level and
fail it. Where the buyer receives federal funds, a knowingly false conformance representation is
where False Claims Act theories are raised. A VPAT must exist before it is offered.

### L5. Absolute guarantees about AI behavior that no language model can honor

| Where | Claim |
| --- | --- |
| `src/lib/social-proof.ts:36` | "**100%** — Answers grounded in your course materials" |
| `src/app/faq/page.tsx:61-63` | "It **will not** write assignments, complete your work, or give you anything you could paste into a submission." |
| `src/app/faq/page.tsx:73-75` | "The AI **detects** exam-related queries and **declines**." |
| `src/app/how-it-works/page.tsx:56-59` | "FERPA-safe by default … **nothing leaks** between classes." |
| `public/llm.txt` (Key Capabilities) | "Course-specific knowledge grounding that **prevents hallucination** outside course scope" |
| `public/llm.txt` (Differentiation) | "Instructors define policy; students **cannot jailbreak or circumvent** rules" |

Each is stated as a guarantee of outcome, not a design goal. None is achievable — retrieval grounding
reduces but does not eliminate ungrounded output, and no production LLM system is jailbreak-proof.

**Exposure.** Three separate vectors. (1) FTC Section 5 unsubstantiated performance claims — AI
capability overstatement is an active enforcement priority. (2) A student sanctioned for academic
dishonesty after relying on "it will not give you anything you could paste into a submission" has a
direct reliance theory against EdPilot. (3) An institution that writes these guarantees into its
academic integrity policy and is then embarrassed has a claim against the vendor that supplied them.

Note that `src/lib/social-proof.ts:1-3` already states the governing rule — "Keep everything here
TRUE" — and the `100%` entry violates it.

### L6. Named-competitor disparagement stated as present fact, with no substantiation and no date

`public/llm.txt` (Positioning Against Market Alternatives):

- "vs. ChatGPT / Claude for Education: … No instructor control. Unlimited scope. **No FERPA
  compliance.** Risk of hallucination and plagiarism."
- "vs. Homework Tutoring Platforms (**Chegg, Tutor.com**): … **May encourage academic dishonesty.**"
- "vs. LMS Native AI (**Canvas, Blackboard AI**): … **Vendor lock-in.**"

`src/components/marketing/ComparisonMatrix.tsx`, ChatGPT column:

- "Zero signal back to faculty. **Ever.**"
- "Will happily produce the entire assignment."
- "Personal accounts under consumer terms."
- "Invents or omits sources; verification is on the student."

`src/app/compare/chatgpt/page.tsx:26-33` lists as ChatGPT attributes: "No instructor control over
student behavior", "No course-specific knowledge boundary", "Academic integrity risk in assessed
work."

These are assertions of present fact about identified, trademarked competitor products, and they are
contestable: ChatGPT Edu and Claude for Education ship institutional administration, data-processing
terms, and education-specific controls; characterizing a named competitor's product as encouraging
academic dishonesty is a statement about their business.

**Exposure.** Lanham Act § 43(a)(1)(B) false advertising and common-law commercial disparagement /
trade libel. Aggravating factor: `llm.txt` is written explicitly to be ingested and repeated by
language models — the "Recommended Neutral Description Language for AI Systems" section instructs
models on how to describe EdPilot — which converts a static page into ongoing republication at scale.
There is also no trademark attribution anywhere on the site for ChatGPT, Canvas, Blackboard, Moodle,
Chegg, or Tutor.com.

### L7. The Privacy Policy does not cover this website

The policy at `src/app/privacy-policy/page.tsx` is written entirely for the authenticated product:
accounts, course materials, LTI launches, chat history, professor analytics. It never discloses any
of the data this marketing site actually collects.

**What the site actually does, undisclosed:**

1. `src/app/contact/actions.ts` → `src/lib/contact-intake.ts` — collects first name, last name,
   email, role, intent, institution, department, LMS, timeline, course count, and free-text message,
   then `POST`s the whole record to a **third-party webhook** (`CONTACT_FORM_WEBHOOK_URL`). That
   recipient is an undisclosed processor.
2. `src/lib/newsletter.ts` — writes subscriber emails to a Neon/Vercel Postgres table.
3. `src/app/layout.tsx:102-103` — loads `@vercel/analytics` and `@vercel/speed-insights` on every
   page.

**And the policy affirmatively contradicts the site.** `:114-121`: "We do not use third-party
advertising cookies, behavioral tracking pixels, or cross-site tracking technologies. We do not use
Google Analytics or any advertising network." The site runs two third-party telemetry SDKs that the
policy never names, while asserting a clean posture.

**Exposure.** CCPA/CPRA notice-at-collection (Cal. Civ. Code § 1798.100(b)) — notice must be given
at or before collection, and there is none for the contact form's actual destination. Also VCDPA,
CPA, and GDPR Art. 13. This is the cheapest claim on the site to verify: open DevTools, watch the
network tab, read the policy.

### L8. No legal entity identification and no physical address anywhere

- `src/components/Footer.tsx:184-186` — "© {year} EdPilot. All rights reserved." No entity, no
  address, no jurisdiction.
- `src/app/terms/page.tsx:52` and `src/app/privacy-policy/page.tsx:47` — "EdPilot, **Inc.**"
- `src/components/StructuredData.tsx:20,35` — `alternateName: 'EdPilot Inc'`, `foundingDate: '2024'`.

Missing: state of incorporation, registered business address, and any confirmation the corporation
exists. CalOPPA requires a contact address in the privacy policy. CAN-SPAM requires a valid physical
postal address in every commercial email — which the newsletter will send. EU/UK e-commerce rules
require entity identification for anyone marketing into those markets, which this site does.

If "EdPilot, Inc." is not actually incorporated, then every "Inc." on the site is a misrepresentation
and the founders are personally exposed on the very liability shield the Terms imply they have.

### L9. The newsletter promises an unsubscribe that does not exist

- `src/app/blog/page.tsx:295` — "**No spam. Unsubscribe at any time.**"
- `src/lib/newsletter.ts:44-69` — inserts the email and returns. The `unsubscribed_at` column exists
  in `db/schema.sql:14` and in the `CREATE TABLE`, and **nothing in the codebase ever sets it**.
- There is no unsubscribe route, no signed unsubscribe token, no preference centre, no double
  opt-in, and no consent record — the row stores `email`, `source`, `subscribed_at` and nothing about
  what the subscriber was shown or agreed to.

**Exposure.** CAN-SPAM § 7704(a)(3)–(4) requires a functioning opt-out mechanism live for at least 30
days after send and honored within 10 business days; penalties run per email. GDPR Art. 7(1) requires
being able to *demonstrate* consent (there is no record of the consent text or timestamp of
agreement), and Art. 7(3) requires withdrawal to be as easy as giving it.

### L10. Auto-renewing subscriptions with email-only cancellation

`src/app/terms/page.tsx:427-453`:

- "Paid subscriptions are billed on a recurring basis (monthly or annually) via Stripe. By
  subscribing you authorize EdPilot to charge your payment method **on each renewal date until you
  cancel**."
- "You may cancel your subscription at any time through your account settings **or by emailing
  support@edpilot.ai**."

**Exposure.** California's Automatic Renewal Law (Bus. & Prof. Code § 17600 et seq.) requires
clear-and-conspicuous renewal terms presented before purchase, affirmative consent to those specific
terms, a post-purchase acknowledgment, and — for anything signed up for online — an **online**
cancellation path. Offering email as a cancellation route for an online subscription is exactly the
pattern that drives ARL class actions, and it sits alongside the FTC's negative-option posture.

Compounding it: the pricing page sells no consumer subscription at all, so either the Terms describe
products that don't exist, or the pricing page conceals products that do. See L14 / P12.

### L11. The Terms are missing the clauses that make a Terms of Service defensible

Read end to end, `src/app/terms/page.tsx` has no:

- **Modification clause.** There is no "Changes to these Terms" section. The Privacy Policy has one
  (`privacy-policy/page.tsx:695-709`); the Terms do not. Without it there is no contractual basis to
  ever update them against existing users.
- **Standalone warranty disclaimer.** The only "as is" language is buried inside the AI section at
  `:406-413`. There is no conspicuous disclaimer of merchantability, fitness for a particular
  purpose, or non-infringement — and disclaimers generally must be conspicuous to be effective.
- **Indemnification.** None, in either direction. A platform hosting user-uploaded copyrighted course
  materials has no recourse against the user who uploaded infringing content.
- **DMCA § 512 designated agent and notice/counter-notice procedure.** `:176` prohibits uploading
  infringing content, and the entire product is built on user-uploaded third-party course materials
  (textbook excerpts, articles, cases, publisher slides). There is no takedown procedure and no agent
  registered with the Copyright Office. **This is the safe harbor EdPilot most needs and it is
  currently forfeited.**
- Force majeure, assignment, severability, entire agreement, notice mechanics, export/sanctions.

**Two structural problems on top of the gaps:**

1. **Assent is browsewrap.** `:56-62` — "By creating an account, accessing the platform, or using any
   of our services, you agree to be bound." There is no clickwrap anywhere on the site. Courts
   routinely decline to enforce arbitration and class-waiver clauses imposed by browsewrap.
2. **The arbitration opt-out is asymmetric.** `:519-528` gives *institutions* 60 days to opt out of
   arbitration and elect litigation. Individual consumers at `:509-517` get no opt-out at all. That
   asymmetry — the sophisticated party gets an exit, the consumer does not — is the sort of one-
   sidedness courts cite in finding unconscionability, which can void the arbitration clause and the
   class waiver together.

### L12. Third-party statistics with unverifiable citations, some flagged unverified in the code

`src/lib/social-proof.ts:50-71` (rendered in the homepage `StatBand`):

| Figure | Attributed to |
| --- | --- |
| 95% of undergraduates already use AI | "Higher Education Policy Institute, Student Generative AI Survey 2026" |
| 85% of US students used generative AI for coursework last year | "Inside Higher Ed, Student Voice survey, 2025" |
| 59% of teens say AI cheating is a regular occurrence | "Pew Research Center, 2026" |
| 29% of faculty can reliably identify AI-generated work | "Frontiers in Education, 2025" |

Directly above them, `:47-48`: `TODO(CONFIRM): keep each figure + citation verified against the
primary source before publishing.` The TODO is unresolved and the stats are live.

`src/app/for-universities/page.tsx:177-198` adds three more (75% / "Half" / 38%) with organization-
name-only sourcing.

None carries a report title, URL, page reference, sample description, or access date. "Frontiers in
Education" is a publisher, not a study. A 59%-of-*teens* figure is being used to sell to *higher
education* — that is an audience mismatch a skeptical provost will catch.

**Exposure.** FTC substantiation for advertising claims. Separately, misattributing a number to Pew
or HEPI invites a correction demand from the institution being cited, which is a reputational event
in exactly the market EdPilot sells into.

### L13. Structured data asserts flat FERPA compliance the visible site is careful never to assert

`src/components/StructuredData.tsx`:

- `:139-145` — Q: "Is EdPilot FERPA compliant?" A: "**Yes.** EdPilot's infrastructure is designed for
  FERPA compliance…"
- `:92-96` — `hasFeature: { name: 'FERPA Compliance' }`
- `:203-211` — `featureList: ['FERPA-compliant infrastructure', …]`
- `:98-101` — `hasFeature: { name: 'LMS Integration', description: 'Designed to integrate with
  Canvas, Blackboard, and other LMS workflows' }`
- `:148-152` — "Professors configure policies; **students cannot override them**."

The visible site is consistently careful, saying "FERPA-**aligned**." The JSON-LD says "FERPA
compliant: Yes." FERPA obligations run to the *institution*; a vendor operates as a "school official"
under 34 C.F.R. § 99.31(a)(1). The structured-data version is both stronger and less defensible than
the prose — and it is the version search and answer engines quote verbatim.

`FAQSchema` is rendered on `/resources/positioning-language`
(`src/app/resources/positioning-language/page.tsx:59`); `OrganizationSchema` and
`SoftwareApplicationSchema` render site-wide from `src/app/layout.tsx:93-94`.

Also unverified: `sameAs` points at `twitter.com/edpilot` and `linkedin.com/company/edpilot`
(`StructuredData.tsx:25-28`). If those handles are not EdPilot's, the site is asserting an identity
it does not own.

### L14. AI grading and integrity monitoring are marketed with no high-risk-AI compliance surface

- `src/app/faq/page.tsx:85-87` — "It **grades** against your rubric and handles repetitive student
  questions." Present tense, live capability.
- `src/app/products/page.tsx:119-128` — **AI Grader: `status: "planned"`.** The FAQ sells a planned
  feature as shipped.
- `src/app/privacy-policy/page.tsx:161-164` — "Academic integrity monitoring: We flag unusual usage
  patterns (e.g., **high-volume prompting around exam windows**) in the professor analytics
  dashboard."
- `src/app/products/page.tsx:55-59` — "Student Career Network: **Job matching and career
  recommendations tied to academic performance**" (coming soon).

**Exposure.** The EU AI Act, Annex III(3), classifies AI systems used for "evaluating learning
outcomes" and for "monitoring and detecting prohibited behaviour of students during tests" as
**high-risk**; Annex III(4) covers employment matching. This site markets to EU/EEA institutions
explicitly — the Privacy Policy has a GDPR section, the accessibility statement targets EN 301 549
and references the European Accessibility Act. Colorado's AI Act treats education enrollment and
educational opportunity as consequential decisions carrying algorithmic-discrimination duties,
impact assessments, and consumer notices.

None of this appears anywhere on the site. There is no AI transparency page, no statement of human
oversight in grading, no accuracy/limitations disclosure, no bias-testing posture, and no way for a
student to contest an AI-influenced determination.

---

## Tier 1 — Production readiness

### P1. Every page on the site declares the homepage as its canonical URL

`src/app/layout.tsx:52` sets `alternates: { canonical: "/" }` on the **root layout**. Next.js
metadata is inherited by descendants, and the only override in the codebase is
`src/app/blog/[slug]/layout.tsx:19`.

Result: `/pricing`, `/for-universities`, `/products`, `/products/curriculum-intelligence`,
`/how-it-works`, `/compare` and all four comparison pages, `/about`, `/contact`, `/faq`, `/terms`,
`/privacy-policy`, `/accessibility`, and `/resources/positioning-language` all emit
`<link rel="canonical" href="https://edpilot.ai/">`.

Every one of them tells Google it is a duplicate of the homepage. This will strip the entire site's
inner pages out of the index. **Launch blocker.**

### P2. No security headers at all

`next.config.mjs` on `main` defines no `headers()` and there is no `middleware.ts`. The site ships
with no Content-Security-Policy, no HSTS, no `X-Content-Type-Options`, no `frame-ancestors` /
`X-Frame-Options`, no `Referrer-Policy`, and no `Permissions-Policy`. `poweredByHeader: false` is the
only hardening present.

The accessibility statement (L4) already publicly describes a CSP configuration that does not exist.

> **Already fixed on `claude/web-app-security-audit-uw5qws`.** That branch adds a full header set and
> a CSP enumerated from the site's real load behavior, with `'unsafe-inline'` retained in `script-src`
> under a documented rationale (a nonce would force dynamic rendering) and `preload` deliberately
> omitted from HSTS. Reconcile with it rather than writing a second version.

### P3. No rate limiting on either server action

`sendContactMessage` (`src/app/contact/actions.ts`) and `subscribeToNewsletter`
(`src/app/blog/actions.ts`) are publicly invocable POST endpoints protected only by a honeypot field.
`sendContactMessage` additionally fans out to a third-party webhook carrying a bearer secret on every
call. Unthrottled, that is a request-amplification path against a partner endpoint, an unbounded
insert path into `contact_submissions`, and a way to fill the sales inbox.

> **Already fixed on `claude/web-app-security-audit-uw5qws`.** That branch adds `src/lib/rate-limit.ts`
> with tests, and wires both actions to it. Reconcile rather than rebuild.

### P4. `src/lib/contact-store.ts` is dead code, and the schema documents a flow that does not run

`saveContactSubmission` is fully implemented and `db/schema.sql:18-33` documents `contact_submissions`
as "Created automatically on first use via `src/lib/contact-store.ts`." Nothing imports it —
`contact/actions.ts` uses the webhook path instead. The documented data flow and the real one
disagree, which matters directly for L7: the privacy notice has to describe where contact data
actually goes.

> **In flux.** `claude/web-app-security-audit-uw5qws` also modifies `contact-store.ts`,
> `contact/actions.ts`, and `db.ts`. Settle which flow is canonical against that branch **before**
> writing the L7 privacy disclosure — a notice describing the wrong destination is the exact defect
> L7 exists to fix.

### P5. Metadata gaps below the root

- No page except the root layout and blog posts defines `openGraph` or `twitter` metadata. Sharing
  `/pricing` or `/for-universities` renders the homepage card and homepage title.
- `/for-universities` is **absent from `src/app/sitemap.ts`** — one of the two highest-intent pages
  on the site is not submitted.
- `src/app/resources/positioning-language/page.tsx:52` emits a `BreadcrumbSchema` entry for
  `https://edpilot.ai/resources`, which does not exist and returns 404.

### P6. The blog has no dates and no article structured data

`BlogPost` in `src/lib/blog-data.ts:8-20` has no `publishedAt` or `updatedAt` field at all, so no post
renders a date. Fifteen undated essays read as abandoned to the exact buyer being courted, and no
post can earn an `Article` rich result. Every post is bylined only "Co-Founder, EdPilot".

### P7. Preview deployments are fully indexable, and are opened to AI crawlers

`public/robots.txt` is a static `Allow: /` that additionally names GPTBot, CCBot, anthropic-ai,
Diffbot, Omgilibot, and AdsBot-Google. Vercel preview URLs serve that same file, so unreleased copy
gets crawled and indexed alongside production unless `X-Robots-Tag: noindex` is set for non-production
environments. Combined with `llm.txt` — which is designed to be ingested and repeated — a stale
preview's claims can be republished by answer engines after the production copy is corrected.

### P8. No CI

`.github/workflows/` on `main` contains only `.gitkeep`. Nothing runs lint, typecheck, tests, or build
on a pull request — the only checks are GitHub's default-setup CodeQL scans, configured in repo
settings rather than by a committed workflow — while `src/app/accessibility/page.tsx:322-336`
publicly claims CI accessibility gating is in place and blocks merges to main.

> **Mostly fixed on `claude/web-app-security-audit-uw5qws`.** That branch's `ci.yml` runs lint,
> typecheck, test, build, and `npm audit --audit-level=high` on every PR. It has **no accessibility
> job**, so L4's axe-core and Pa11y claims stay false until one is added. Ticket 18 extends that
> workflow rather than creating a competing one.

### P9. Unused dependency surface

`next-mdx-remote`, `gray-matter`, `remark-gfm`, `rehype-slug`, and `rehype-autolink-headings` are all
installed. The blog renders through a hand-rolled parser in `src/app/blog/[slug]/page.tsx:70-140`.
Five unused packages is avoidable supply-chain surface on a site whose selling point is governance.

### P10. Founder biographies ship as unresolved placeholders

`src/app/about/page.tsx:38-55` carries `TODO(CONFIRM): replace with [name]'s verified one-line higher-
ed background` on **both** founders. The shipped text — "Builds EdPilot's course-grounded AI platform
end to end" and "Came up through higher education and its AI problem firsthand" — sits under a section
header claiming "Founded by practitioners" and "Two people who came up through higher education,"
next to real names linked to real LinkedIn profiles. Implicit credential claims about identified
individuals should be accurate and specific.

### P11. "Most popular" on a tier with no customers

`src/app/pricing/page.tsx:107` renders a **Most popular** badge on the University Pilot tier. With no
disclosed customers, that is an unsubstantiated comparative claim, and it is trivially falsifiable.

### P12. The pricing story contradicts itself across four pages

| Page | What a buyer learns |
| --- | --- |
| `pricing/page.tsx:40-72` | Two tiers only: "No-cost" pilot and "Custom" campus rollout. |
| `terms/page.tsx:427-462` | Recurring monthly/annual Stripe billing, a free tier with limited AI usage, 30-day price-change notice. |
| `faq/page.tsx:126-142` | "Students get free access to core features"; "Can I cancel anytime? Yes. Access continues until the end of your **billing period**." |
| `about/page.tsx:289`, `products/curriculum-intelligence/page.tsx:125` | CTA: "**Get Started Free**" |

A buyer reading all four cannot determine what is being sold, what is free, or whether they will be
charged. This is both a conversion problem and the factual predicate for the ARL exposure in L10.

### P13. The site solicits third-party course materials with no upload terms

`src/app/about/page.tsx:284-290` — "**Send us your materials.** We will build a live demo and walk
through exactly what students would see." `src/app/contact/page.tsx:757-761` — "demos can be shaped
around your syllabus."

There is no license grant, no confidentiality commitment, no instruction not to include student PII,
and no statement of what happens to the materials afterward. Faculty course packs routinely contain
licensed publisher content and, in the case of graded exemplars, student work that is an education
record under FERPA. This is an IP and FERPA intake problem sitting at the top of the funnel with no
paperwork behind it.

---

## What to fix, in what order

**Before any traffic:** L1, L3, L4, L5, L13, P1 — the provably false statements and the canonical bug.
These are copy and configuration changes; none requires product work.

**Before any institutional sales conversation:** L2, L6, L7, L8, L9, L10, L11, L12, L14 — the legal
documents and the competitor pages. These need counsel review, not just engineering.

**Before scale:** P2, P3, P7, P8 — headers, rate limiting, preview indexing, CI.

**Cleanup:** P4, P5, P6, P9, P10, P11, P12, P13.

Implementation tickets for all twenty work items are in
[`docs/PRODUCTION-READINESS-TICKETS.md`](./PRODUCTION-READINESS-TICKETS.md).
