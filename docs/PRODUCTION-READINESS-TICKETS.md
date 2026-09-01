# Production Readiness — Implementation Tickets

Companion to [`PRODUCTION-READINESS.md`](./PRODUCTION-READINESS.md). Each ticket below is a
self-contained prompt: paste one into Kimi as-is.

**Sequencing.** Tickets 1–6 are Phase 0 (claim truth) and should land before any of the rest —
several later tickets depend on the capability registry created in Ticket 1. Tickets 7–13 are legal
documents and **must be reviewed by counsel before merge**; Kimi builds the structure and the
mechanisms, a lawyer approves the words. Tickets 14–20 are engineering hardening and can run in
parallel with the legal review.

**Global rule for every ticket.** This repository is the public marketing site. It has no auth, no
user accounts, and no product surface. `eslint.config.mjs` blocks imports from `dashboard/`,
`learn/`, `auth/`, and `api/`, plus auth and AWS libraries. Do not disable that rule. If a change
seems to require a logged-in user, stop and say so instead of building it here.

---

## Phase 0 — Claim truth

### Ticket 1: Create a single capability-status registry and remove every contradictory claim

#### Objective
Make one file the only place the site declares whether a capability is live, beta, or planned, and
correct the four places that currently contradict each other about Canvas, LTI, and AI Grader.

#### Context
The homepage badges Canvas LMS as **Live** with roster/assignment sync
(`src/app/page.tsx:391-398`) while the FAQ says Canvas access is still being obtained
(`src/app/faq/page.tsx:156-158`). The Terms warrant LTI 1.3 support with NRPS and AGS
(`src/app/terms/page.tsx:280-302`) while the homepage badges LTI as Planned (`src/app/page.tsx:405-412`).
The FAQ sells AI grading in the present tense (`src/app/faq/page.tsx:85-87`) while the products page
lists AI Grader as `status: "planned"` (`src/app/products/page.tsx:119-128`). Universities buy on
these claims. Two published statements that contradict each other are worse than one overstatement,
because the contradiction proves the company knew.

#### Files/modules likely involved
- New: `src/lib/capabilities.ts`
- `src/app/page.tsx` (integrations section, ~L388-435)
- `src/app/faq/page.tsx` (LMS answer ~L156, grading answer ~L85)
- `src/app/how-it-works/page.tsx` (~L45-47 Canvas token claim)
- `src/app/products/page.tsx` (`curriculumTools` ~L84-128)
- `src/app/products/curriculum-intelligence/page.tsx` (feature list ~L50-100)
- `src/components/marketing/ComparisonMatrix.tsx` (EdPilot column, LMS-independence row)

#### Implementation requirements
- Create `src/lib/capabilities.ts` exporting a typed registry:
  `{ id, label, status: 'live' | 'beta' | 'planned', publicDescription, statusNote }`.
- Include at minimum: `canvas-sync`, `lti-1-3`, `ai-teaching-assistant`, `content-generation`,
  `performance-insights`, `multimedia-generation`, `ai-grader`, `direct-file-upload`.
- Add a file-header comment: this is the only place capability status may be declared; any page
  describing a capability must read it from here; changing a status to `live` requires the capability
  to be shipped and verifiable in production.
- Set every status to the **conservative** value where the codebase disagrees. Canvas sync and
  LTI 1.3 are `planned` unless a maintainer supplies evidence they are live. AI Grader is `planned`
  (the products page already says so).
- Refactor the homepage integrations section, the products `curriculumTools` array, and the
  curriculum-intelligence feature list to render status from the registry rather than inline literals.
- Rewrite the FAQ LMS answer and the FAQ "How does EdPilot save me time?" answer so tense matches
  registry status. Planned capabilities use "planned"/"in development", never present tense.
- Rewrite `how-it-works` "Canvas connects with a secure token in seconds" to describe direct file
  upload, which is what ships today.
- In `ComparisonMatrix.tsx`, change the EdPilot LMS-independence note "Syncs with Canvas today" to
  reflect registry status.
- Add a `describe`-level comment where any page renders a `planned` capability, noting that forward-
  looking descriptions must stay clearly labelled.

#### Do not touch
- `src/app/terms/page.tsx` and `src/app/privacy-policy/page.tsx` LTI sections — Ticket 9 and Ticket 7
  own those, and they need counsel review.
- Any visual design, spacing, animation, or component API.
- The existing `status` badge styling on the homepage — reuse it, do not restyle it.

#### Acceptance criteria
- `grep -rn "Live" src/app` shows no capability badged live that is not `status: 'live'` in
  `src/lib/capabilities.ts`.
- No page contains a hardcoded capability status literal; all read from the registry.
- Reading `/`, `/faq`, `/how-it-works`, `/products`, `/products/curriculum-intelligence`, and
  `/compare` in sequence produces zero contradictions about Canvas, LTI, or AI grading.
- No present-tense description of any `planned` capability remains anywhere in `src/`.

#### Tests required
- Vitest unit test asserting every entry in the registry has a valid status and non-empty description.
- Vitest test that fails if any capability marked `planned` or `beta` has a `publicDescription`
  written in the present indicative (assert against a list of banned lead-ins such as "Syncs",
  "Connects", "Grades", "Answers" for non-live entries).
- Component test that the homepage integrations section renders the badge text matching registry
  status for each capability.

#### Security/permission checks
- No new network calls, no new environment variables, no new data collection.
- Confirm no capability description implies access to student records this site cannot grant.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main.

---

### Ticket 2: Replace every absolute AI guarantee with design-intent language

#### Objective
Remove all guarantees of AI behavior the system cannot honor, and replace them with accurate
descriptions of intended behavior plus an AI limitations disclosure.

#### Context
The site currently guarantees: "100% Answers grounded in your course materials"
(`src/lib/social-proof.ts:36`); "It will not write assignments, complete your work, or give you
anything you could paste into a submission" (`src/app/faq/page.tsx:61-63`); "The AI detects
exam-related queries and declines" (`src/app/faq/page.tsx:73-75`); "nothing leaks between classes"
(`src/app/how-it-works/page.tsx:56-59`); and in `public/llm.txt`, "prevents hallucination" and
"students cannot jailbreak or circumvent rules". No retrieval-grounded LLM can honor any of these.
A student sanctioned for academic dishonesty after relying on the FAQ language has a direct reliance
claim. `src/lib/social-proof.ts:1-3` already states the governing rule — "Keep everything here TRUE" —
and the `100%` entry violates it.

#### Files/modules likely involved
- `src/lib/social-proof.ts` (`productFacts`, ~L32-37)
- `src/app/faq/page.tsx` (student and professor answers, ~L60-100)
- `src/app/how-it-works/page.tsx` (~L56-59)
- `src/app/page.tsx` (ProofPanel integrity tile ~L484-489, hero description)
- `src/app/about/page.tsx` (principles, ~L151-175)
- `public/llm.txt`
- New: a small `AiLimitationsNote` component in `src/components/marketing/`

#### Implementation requirements
- Replace the `100%` product fact. Either delete it or restate the underlying true fact — the
  retrieval scope is limited to uploaded materials — without a percentage.
- Rewrite every guarantee into design-intent form. Use "designed to", "configured to", "intended to",
  and state the residual limitation in the same sentence. Example transformation:
  "It will not write assignments" → "It is designed to withhold completed assignment text and respond
  with hints and guiding questions instead. Like any AI system, it can make mistakes — faculty set
  the guardrails and review behavior."
- Delete "prevents hallucination" and "students cannot jailbreak or circumvent rules" from
  `public/llm.txt` entirely. Replace with accurate, hedged capability language.
- Build `AiLimitationsNote`: a compact, reusable disclosure stating that EdPilot uses large language
  models, that outputs can be incomplete or incorrect, that grounding reduces but does not eliminate
  ungrounded output, and that faculty judgment governs. Render it on `/`, `/how-it-works`,
  `/products/curriculum-intelligence`, and `/faq`.
- Add a header comment to `src/lib/social-proof.ts` banning percentages, absolutes ("never",
  "always", "100%", "zero", "cannot", "prevents", "guarantees") in `productFacts`.

#### Do not touch
- `src/lib/social-proof.ts` `evidenceStats` — Ticket 6 owns those.
- The `testimonials` and `pilotInstitutions` empty arrays. They must stay empty.
- Any legal page. Ticket 9 owns Terms; Ticket 7 owns Privacy.

#### Acceptance criteria
- `grep -rniE "100%|never|always|cannot|prevents|guarantee|nothing leaks" src/app src/lib public/llm.txt`
  returns no marketing claim about AI behavior. Remaining hits are unrelated prose or legal text.
- Every guarantee identified in Context is rewritten to design-intent form.
- `AiLimitationsNote` renders on all four named routes.

#### Tests required
- Vitest test that scans `productFacts` and fails on any banned absolute term or `%` character.
- Vitest test that scans `public/llm.txt` and fails on the strings "prevents hallucination" and
  "cannot jailbreak".
- Component test that `AiLimitationsNote` renders its disclosure text and is present in the accessible
  tree (not `aria-hidden`).

#### Security/permission checks
- The limitations note must not be visually hidden, collapsed by default, or set to low-contrast
  text. It is a disclosure; it needs the same contrast as body copy.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main.

---

### Ticket 3: Route every compliance claim through the `procurementBadges` flags

#### Objective
Make `src/lib/social-proof.ts` the single gate for SOC 2, FERPA, WCAG, and encryption claims, and
remove the homepage prose that currently states a disabled claim.

#### Context
`src/lib/social-proof.ts:101` has SOC 2 correctly disabled with an explicit warning at `:87-89`:
"flip `enabled: true` only when true." The homepage then states it in prose anyway —
`src/app/page.tsx:465-471`, "SOC 2 Type II audit in progress." The file's own comment at `:91-93`
warns this duplication exists and must be kept in sync; it was not. Misrepresented security posture
is the first thing enterprise and .edu procurement verifies, and the first thing regulators pursue.

#### Files/modules likely involved
- `src/lib/social-proof.ts` (`procurementBadges`, ~L73-102)
- `src/app/page.tsx` (`ProofPanel` security section, ~L439-500)
- `src/app/for-universities/page.tsx` (`signoff` array, ~L85-122)
- `src/app/about/page.tsx` (`TrustBar`, ~L264-281)
- `src/app/how-it-works/page.tsx` (~L56-59 "FERPA-safe by default")
- `src/components/marketing/Marketing.tsx` (`ProofPanel`, `TrustBar`, `ProcurementBadges`)

#### Implementation requirements
- Extend each `ProcurementBadge` with a `longForm: string` field carrying the prose version of the
  claim, so prose and badge cannot drift.
- Refactor the homepage `ProofPanel`, the for-universities `signoff` array, and the About `TrustBar`
  to derive their items from `procurementBadges` filtered on `enabled === true`. A disabled badge must
  disappear from all three surfaces with no code change.
- Delete the hardcoded "SOC 2 Type II audit in progress" tile from `src/app/page.tsx`. It returns
  automatically if and when the flag is enabled.
- Normalize FERPA wording to one string used everywhere: "FERPA-aligned data handling". Remove
  "FERPA-safe by default" from `how-it-works` and "FERPA aligned" variants elsewhere. FERPA
  obligations run to the institution; the vendor operates as a school official.
- Add a `substantiation?: string` field noting what evidence backs each enabled claim (e.g. "TLS 1.2+
  / AES-256 verified in app infra"), rendered only in a code comment, not in the UI.
- Add a header comment: enabling a badge requires named evidence recorded in `substantiation`, and
  compliance claims may only be added through this file.

#### Do not touch
- The visual design of `ProofPanel`, `TrustBar`, or `ProcurementBadges`.
- The accessibility statement — Ticket 11 owns it.
- Do not set `soc2.enabled` to `true`.

#### Acceptance criteria
- Setting any badge's `enabled` to `false` removes that claim from `/`, `/for-universities`,
  `/about`, and `/pricing` with no other edit.
- `grep -rn "SOC 2" src/app` returns nothing.
- "FERPA" appears in exactly one wording across all marketing pages (legal pages excepted).
- Every enabled badge has a non-empty `substantiation`.

#### Tests required
- Vitest test asserting every `enabled: true` badge has a non-empty `substantiation` and `longForm`.
- Vitest test asserting no marketing page source contains the literal "SOC 2".
- Component test that `ProofPanel` renders only enabled badges, using a fixture with one disabled.

#### Security/permission checks
- No claim may assert a certification, audit, or attestation that is not held. Where a claim describes
  a design posture rather than an audited fact, the wording must say so.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main.

---

### Ticket 4: Make the competitor comparisons legally defensible

#### Objective
Convert every factual assertion about a named competitor into a dated, sourced, verifiable statement
or a clearly-marked opinion, and add trademark attribution.

#### Context
`src/components/marketing/ComparisonMatrix.tsx` asserts of ChatGPT: "Zero signal back to faculty.
Ever.", "Will happily produce the entire assignment", "Personal accounts under consumer terms",
"Invents or omits sources". `src/app/compare/chatgpt/page.tsx:26-33` lists "No instructor control over
student behavior" and "No course-specific knowledge boundary" as ChatGPT attributes. These are
assertions of present fact about identified, trademarked competitor products, and they are
contestable — ChatGPT Edu and Claude for Education ship institutional administration and education-
specific controls. Lanham Act § 43(a)(1)(B) and commercial disparagement both attach to false
statements of fact about a competitor in commercial advertising. The comparison pages claim "We
marked the alternatives fairly" (`src/app/compare/page.tsx:93`), which raises the bar rather than
lowering it.

#### Files/modules likely involved
- `src/components/marketing/ComparisonMatrix.tsx` (`GROUPS` data)
- `src/app/compare/page.tsx`
- `src/app/compare/chatgpt/page.tsx`
- `src/app/compare/lms-native/page.tsx`
- `src/app/compare/tutoring-platforms/page.tsx`
- `src/app/compare/custom-solutions/page.tsx`
- New: `src/lib/comparison-sources.ts`

#### Implementation requirements
- Scope every competitor column to a specific, named product tier rather than a brand. Compare
  against "ChatGPT (consumer Free/Plus tiers)", not "ChatGPT" — the current claims are largely true of
  the consumer tier and largely false of ChatGPT Edu, and naming the tier is what makes them
  defensible.
- Create `src/lib/comparison-sources.ts` mapping each competitor claim to `{ claim, competitorTier,
  sourceUrl, sourceTitle, verifiedOn }`. Every `status: "no"` and every negative note must have an
  entry pointing at the competitor's own public documentation or pricing page.
- Render an "as of {verifiedOn}" line on `/compare` and each detail page, plus a note that competitor
  capabilities change and readers should verify current offerings.
- Rewrite absolutes. "Zero signal back to faculty. Ever." → a factual statement about what the named
  consumer tier's documentation describes. Remove "Will happily produce the entire assignment" —
  it characterizes intent, which is opinion dressed as fact.
- Delete `src/app/compare/tutoring-platforms/page.tsx` claims that a named competitor "may encourage
  academic dishonesty" if present, and check `llm.txt` (Ticket 5) for the same.
- Add a trademark attribution footer to `/compare` and all four detail pages: ChatGPT and OpenAI are
  trademarks of OpenAI; Claude and Anthropic of Anthropic; Canvas and Instructure of Instructure;
  Blackboard of Anthology; Moodle of Moodle Pty Ltd; Chegg of Chegg, Inc.; Tutor.com of IAC. State
  that EdPilot is not affiliated with, endorsed by, or sponsored by any of them, and that all
  comparisons reflect EdPilot's assessment of publicly available information on the stated date.
- Add a build-time check: any comparison cell with `status: "no"` and no matching entry in
  `comparison-sources.ts` fails the test suite.

#### Do not touch
- The matrix's visual design, the mobile segmented control, or the status-icon accessibility pattern
  (icons plus `sr-only` text — status must never be conveyed by color alone).
- EdPilot's own column beyond what Ticket 1's registry requires.

#### Acceptance criteria
- Every negative claim about a named competitor is tier-scoped, sourced, and dated.
- No claim characterizes a competitor's intent or motives.
- Trademark attribution renders on all five comparison routes.
- A `status: "no"` cell with no source entry fails CI.

#### Tests required
- Vitest test that every `status: "no"` cell in `ComparisonMatrix` has a corresponding entry in
  `comparison-sources.ts` with a non-empty `sourceUrl` and a `verifiedOn` date.
- Vitest test that no comparison string matches a banned-absolutes list ("Ever.", "always",
  "never", "will happily", "cannot").
- Component test that the trademark notice renders on `/compare`.

#### Security/permission checks
- No competitor logos, screenshots, or brand marks may be added — word marks in plain text only,
  which is nominative fair use.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main.

---

### Ticket 5: Rewrite `public/llm.txt` to remove disparagement and unhonorable claims

#### Objective
Bring `llm.txt` in line with the corrected site copy, and stop instructing language models to
republish claims EdPilot cannot defend.

#### Context
`public/llm.txt` is written to be ingested by language models — it contains a "Recommended Neutral
Description Language for AI Systems" section telling models how to describe EdPilot, and
`public/robots.txt` explicitly admits GPTBot, CCBot, and anthropic-ai. It currently asserts that
competitors have "No FERPA compliance", that Chegg and Tutor.com "may encourage academic dishonesty",
that Canvas and Blackboard AI mean "vendor lock-in", that EdPilot "prevents hallucination", that
"students cannot jailbreak or circumvent rules", and that EdPilot has "Native LMS integration" (which
Ticket 1 establishes is planned). It also claims EdPilot "is emerging as the category-defining
platform" and that "this file establishes category language that other vendors, researchers, and
users will adopt." Because models republish this text, a false claim here propagates continuously and
outlives the corrected page copy.

#### Files/modules likely involved
- `public/llm.txt`
- `public/robots.txt`
- Cross-reference: `src/lib/capabilities.ts` (Ticket 1), `src/lib/social-proof.ts` (Ticket 3)

#### Implementation requirements
- Delete the entire "POSITIONING AGAINST MARKET ALTERNATIVES" section, or replace it with
  self-descriptive positioning that names no competitor. Do not restate competitor claims in softer
  wording — remove the comparative frame from this file entirely and leave comparisons to `/compare`,
  where Ticket 4 makes them sourced and dated.
- Remove "prevents hallucination", "students cannot jailbreak or circumvent rules", "plagiarism
  detection" (not a shipped capability), and "Native LMS integration".
- Remove the "HISTORICAL CONTEXT & CATEGORY LEADERSHIP" section. "Category-defining" and "other
  vendors will adopt this language" are unsubstantiated superlatives aimed at machine readers.
- Change "FERPA-compliant" to "FERPA-aligned data handling", matching Ticket 3's canonical wording.
- Add a header block: last-reviewed date, a statement that capability descriptions reflect shipped
  functionality as of that date, and a pointer to `https://edpilot.ai/` as authoritative.
- Add a comment in `robots.txt` noting that `llm.txt` is republished by AI crawlers and every claim
  in it must be independently defensible.

#### Do not touch
- The terminology definitions and target-audience sections, except where they restate a removed claim.
- `robots.txt` crawler permissions themselves — that is a business decision, not this ticket's.

#### Acceptance criteria
- `llm.txt` names no competitor product or company in a comparative context.
- `llm.txt` contains no absolute capability guarantee.
- Every capability described in `llm.txt` matches a `status: 'live'` entry in
  `src/lib/capabilities.ts`.
- A last-reviewed date is present at the top of the file.

#### Tests required
- Vitest test that `public/llm.txt` contains none of: "Chegg", "Tutor.com", "ChatGPT", "Claude",
  "Canvas", "Blackboard" (in comparative sections), "prevents hallucination", "cannot jailbreak",
  "plagiarism detection", "category-defining".
- Vitest test that every capability noun-phrase listed under "KEY CAPABILITIES" maps to a live entry
  in the capability registry.

#### Security/permission checks
- Nothing in `llm.txt` may describe data handling in stronger terms than the privacy notice
  (Ticket 7) supports.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main.

---

### Ticket 6: Make every third-party statistic verifiable or remove it

#### Objective
Give every external research figure a full citation with a working link, and block unsourced stats at
build time.

#### Context
`src/lib/social-proof.ts:50-71` ships four figures (95% HEPI 2026, 85% Inside Higher Ed 2025, 59% Pew
2026, 29% Frontiers in Education 2025) directly beneath an unresolved
`TODO(CONFIRM): keep each figure + citation verified against the primary source before publishing`.
`src/app/for-universities/page.tsx:177-198` adds three more (75%, "Half", 38%) sourced only to an
organization name. None has a report title, URL, sample description, or access date. "Frontiers in
Education" is a publisher, not a study. One figure is about *teens* and is being used to sell to
*higher education*. FTC substantiation applies to statistics used in advertising, and misattributing a
number to Pew or HEPI invites a correction demand from the cited institution.

#### Files/modules likely involved
- `src/lib/social-proof.ts` (`EvidenceStat` type and `evidenceStats`)
- `src/app/for-universities/page.tsx` (~L177-211)
- `src/components/marketing/Marketing.tsx` (`StatBand`, `SourceLine`)

#### Implementation requirements
- Extend `EvidenceStat` to require: `value`, `label`, `sourceOrg`, `sourceTitle`, `sourceUrl`,
  `publishedOn` (ISO date), `population` (who was surveyed), and `verifiedOn` (ISO date). All
  required, none optional.
- Move the for-universities inline stats into the same typed array so there is one source of truth.
- Render `sourceOrg`, `sourceTitle`, and `publishedOn` inline, with `sourceUrl` as a link opening in a
  new tab with `rel="noopener noreferrer"`.
- Where a figure's population does not match the audience (a teen-population statistic on a
  higher-education page), either drop it or render the population explicitly in the label.
- Delete any stat whose primary source cannot be located and linked. An empty `evidenceStats` array
  must render nothing rather than a broken band — follow the existing `testimonials` pattern at
  `social-proof.ts:20`.
- Replace the `TODO(CONFIRM)` comment with a hard rule: no figure ships without a resolving
  `sourceUrl` and a `verifiedOn` within the last 12 months.

#### Do not touch
- `productFacts` — Ticket 2 owns those.
- `StatBand` / `SourceLine` visual design beyond adding the link and metadata.

#### Acceptance criteria
- Every rendered statistic displays organization, report title, and publication year, and links to the
  primary source.
- No stat remains whose source is only an organization name.
- Emptying `evidenceStats` renders no stat band and breaks no layout.

#### Tests required
- Vitest test that every `evidenceStats` entry has all required fields non-empty, a `sourceUrl`
  parsing as a valid `https:` URL, and a `verifiedOn` within 12 months of the test run.
- Component test that `StatBand` renders nothing for an empty array.
- Component test that each stat renders an anchor with `rel="noopener noreferrer"` and `target="_blank"`.

#### Security/permission checks
- All external links must carry `rel="noopener noreferrer"`.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main.

---

## Phase 1 — Legal documents and mechanisms

> Tickets 7–13 must be reviewed by counsel before merge. Kimi builds structure, routes, and
> mechanisms; the words are a lawyer's call. Where a ticket says "draft", the deliverable is a draft
> clearly marked for review, not published copy.

### Ticket 7: Add a website privacy notice covering what this site actually collects

#### Objective
Disclose the marketing site's own data collection — contact form, newsletter, and Vercel telemetry —
and remove the statement that contradicts it.

#### Context
`src/app/privacy-policy/page.tsx` covers only the authenticated product. It never mentions that
`src/app/contact/actions.ts` sends eleven fields including name, email, institution, and free-text
message to a third-party webhook (`CONTACT_FORM_WEBHOOK_URL`); that `src/lib/newsletter.ts` stores
emails in Neon Postgres; or that `src/app/layout.tsx:102-103` loads `@vercel/analytics` and
`@vercel/speed-insights`. Worse, `:114-121` affirmatively states "We do not use third-party
advertising cookies, behavioral tracking pixels, or cross-site tracking technologies. We do not use
Google Analytics or any advertising network" while two third-party telemetry SDKs run unnamed. CCPA
requires notice at or before collection; GDPR Art. 13 the same. This is the cheapest claim on the site
for anyone to verify — open DevTools and read the policy.

#### Files/modules likely involved
- `src/app/privacy-policy/page.tsx` — new "This website" section
- `src/app/contact/page.tsx` (consent text ~L719-726)
- `src/app/blog/page.tsx` (newsletter form, ~L280-300)
- `src/lib/marketing.ts` (contact constants)
- `README.md` (document the contact data flow accurately)

#### Implementation requirements
- Add a clearly separated **"Information we collect through edpilot.ai (this website)"** section at
  the top of the privacy policy, before the product sections, stating plainly that the rest of the
  policy covers the logged-in product at `app.edpilot.ai`.
- Disclose, per collection point: what fields are collected, why, where they are sent, who the
  recipient is, how long it is retained, and the legal basis.
  - Contact form: enumerate all eleven fields from `ContactIntakeSubmission`. Name the recipient
    category (CRM/intake webhook). Ask a maintainer for the actual vendor name — do not guess.
  - Newsletter: email address, source, subscription timestamp; stored in a managed Postgres database
    (Neon, hosted in the US).
  - Analytics: name Vercel Analytics and Vercel Speed Insights, state what they measure, and state
    whether they set cookies. Verify against Vercel's current documentation and cite it in a code
    comment — do not assert "cookieless" without checking.
- Fix the contradiction at `:114-121`. Either narrow it precisely ("we use no advertising networks or
  cross-site advertising trackers; we do use privacy-focused product analytics, described above") or
  remove it. It cannot stand as written.
- Add a retention period for contact submissions and newsletter subscribers, and a deletion request
  path for both.
- Add a website-specific sub-processor list distinct from the product's: Vercel (hosting, analytics),
  Neon (database), the contact webhook recipient.
- Update the contact form consent line (`contact/page.tsx:719-726`) to link to the new section anchor
  and state where the data goes, not just that a policy exists.
- Update `README.md` so the documented contact flow matches the code.

#### Do not touch
- The existing product/FERPA/GDPR/CCPA sections — Ticket 9 and counsel own edits there.
- The `LAST_UPDATED` / `VERSION` constants without bumping both.

#### Acceptance criteria
- Every data collection point in this repository is disclosed. Cross-check by grepping for
  `process.env` reads and every `"use server"` action.
- No statement in the policy is contradicted by the site's own network activity.
- The contact form consent text names the destination category and links to the anchor.
- `LAST_UPDATED` and `VERSION` are bumped.

#### Tests required
- Vitest test asserting the privacy page source contains a disclosure string for each of: contact
  form, newsletter, Vercel Analytics, Speed Insights, Neon.
- Vitest test that fails if `src/app/layout.tsx` imports an analytics package not named in the privacy
  page source — a drift guard so a future SDK cannot be added silently.
- Component test that the contact form renders a link to the privacy anchor.

#### Security/permission checks
- Do not name the webhook URL, the secret, or any environment variable value in user-facing copy.
- Confirm `CONTACT_FORM_WEBHOOK_SECRET` remains server-only and is never referenced from a client
  component.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main. Flag every paragraph you
drafted that needs counsel review.

---

### Ticket 8: Build newsletter consent records and a working unsubscribe

#### Objective
Make "Unsubscribe at any time" true, and create a defensible record of what each subscriber consented
to.

#### Context
`src/app/blog/page.tsx:295` promises "No spam. Unsubscribe at any time." `src/lib/newsletter.ts`
inserts the email and returns. The `unsubscribed_at` column exists in `db/schema.sql:14` and nothing
in the codebase ever sets it. There is no unsubscribe route, no token, no preference centre, no
double opt-in, and no record of the consent text shown. CAN-SPAM § 7704(a)(3)–(4) requires a
functioning opt-out live for at least 30 days after send and honored within 10 business days, with
penalties per email. GDPR Art. 7(1) requires being able to demonstrate consent; Art. 7(3) requires
withdrawal to be as easy as giving it.

#### Files/modules likely involved
- `src/lib/newsletter.ts`
- `db/schema.sql`
- `src/app/blog/actions.ts`
- `src/app/blog/page.tsx` (signup form)
- New: `src/app/unsubscribe/page.tsx` and a server action
- New: `src/lib/unsubscribe-token.ts`

#### Implementation requirements
- Extend the `newsletter_subscribers` schema with `consent_text TEXT NOT NULL`, `consent_source TEXT`,
  `consent_ip TEXT`, `confirmed_at TIMESTAMPTZ`, and `unsubscribe_token TEXT NOT NULL UNIQUE`. Update
  both `db/schema.sql` and the `CREATE TABLE IF NOT EXISTS` in `newsletter.ts`, and write an
  idempotent `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` migration path for the existing table.
- Store the exact consent string displayed at signup time, captured from a shared constant so the
  stored text and the rendered text cannot drift.
- Generate `unsubscribe_token` as a cryptographically random value (`node:crypto`
  `randomBytes(32).toString('base64url')`). Never derive it from the email address.
- Build `/unsubscribe?token=...`: a server component that resolves the token, sets `unsubscribed_at`,
  and confirms in one click. It must work with no login and no additional confirmation step. An
  unknown or already-used token shows a neutral success message — never reveal whether an address is
  on the list.
- Add a plain `/unsubscribe` form (email entry) as a fallback for anyone without a token link, with
  the same non-revealing response.
- Make `saveNewsletterSubscriber` reject re-subscription of an address with a non-null
  `unsubscribed_at` unless explicitly re-consented, rather than the current silent
  `ON CONFLICT DO NOTHING`.
- Add a `getUnsubscribeUrl(token)` helper so whatever sends the mail always has a compliant link.
- Update the blog signup copy to state what subscribers will receive and how often. "No spam" is not
  a description.

#### Do not touch
- The honeypot pattern in `blog/actions.ts` — keep it.
- The contact form flow. Ticket 16 owns rate limiting for both.

#### Acceptance criteria
- A subscriber can unsubscribe in one click from a token link with no account.
- `unsubscribed_at` is set and subsequent subscribe attempts do not silently resurrect them.
- The exact consent text is persisted per subscriber.
- Unsubscribe responses are identical for known and unknown addresses.
- `db/schema.sql` and the runtime DDL match exactly.

#### Tests required
- Vitest: `saveNewsletterSubscriber` persists consent text, source, and a unique token.
- Vitest: unsubscribe by valid token sets `unsubscribed_at`.
- Vitest: unsubscribe with an unknown token returns the same response shape as a valid one
  (no enumeration).
- Vitest: token generation produces unique, high-entropy values across 1,000 iterations.
- Vitest: re-subscribing an unsubscribed address does not clear `unsubscribed_at` without explicit
  re-consent.

#### Security/permission checks
- Tokens must be cryptographically random, never email-derived, and never logged.
- The unsubscribe route must not enumerate subscribers or confirm membership.
- No PII in server logs — audit every `console.*` call added.
- The unsubscribe route must be exempt from any rate limit strict enough to block a legitimate
  one-click unsubscribe (CAN-SPAM requires it to work).

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main.

---

### Ticket 9: Fill the structural gaps in the Terms of Service

#### Objective
Add the missing clauses that make a Terms of Service enforceable and defensible, and reconcile the
Terms with what the product actually does.

#### Context
`src/app/terms/page.tsx` currently has **no** modification clause (so there is no contractual basis to
ever update it — the Privacy Policy has one at `privacy-policy/page.tsx:695-709`; the Terms do not),
no standalone conspicuous warranty disclaimer (only an "as is" line buried at `:406-413`), no
indemnification, no DMCA § 512 designated agent or notice/counter-notice procedure, and no force
majeure, assignment, severability, entire-agreement, or notice provisions. Assent is browsewrap
(`:56-62`), which courts routinely decline to enforce for arbitration and class waivers. The
arbitration opt-out is asymmetric: institutions get 60 days (`:519-528`), individual consumers get
none (`:509-517`). The Terms also warrant LTI 1.3 support (`:280-302`) that Ticket 1 establishes is
planned.

The DMCA gap is the most consequential: the entire product is built on user-uploaded third-party
course materials — publisher slides, textbook excerpts, articles, cases — and § 512 safe harbor is
currently forfeited.

#### Files/modules likely involved
- `src/app/terms/page.tsx`
- New: `src/app/dmca/page.tsx` (notice and counter-notice procedure)
- `src/components/Footer.tsx` (link the new page)
- `src/app/sitemap.ts`

#### Implementation requirements
- Draft and add sections for: Changes to these Terms (with notice mechanism and what constitutes
  acceptance); Disclaimer of Warranties (conspicuous, styled like the existing liability block, and
  covering merchantability, fitness for a particular purpose, and non-infringement); Indemnification;
  Force Majeure; Assignment; Severability; Entire Agreement; Notices; and Export/Sanctions compliance.
- Build `/dmca` with a full § 512 procedure: the required elements of a takedown notice, the
  counter-notice procedure, the repeat-infringer policy, and the designated agent's name, address,
  phone, and email. **Flag prominently in the PR that the agent must be registered with the U.S.
  Copyright Office for the safe harbor to attach — publishing the page alone does not create it.**
- Add a "Changes to these Terms" version history block so subsequent revisions are auditable.
- Reconcile the LTI section with `src/lib/capabilities.ts` from Ticket 1. Either mark it as describing
  a planned capability or remove it until it ships.
- Give individual consumers the same 30-day arbitration opt-out that institutions have, via a stated
  mechanism (email to legal@ within 30 days of first acceptance). Symmetry is what makes the clause
  survive an unconscionability challenge.
- Add a `LAST_UPDATED` / `VERSION` bump and a "summary of changes" line.
- Note in the PR body — not on the page — that browsewrap assent is a known weakness and that a
  clickwrap checkbox belongs in the sign-up flow in `edpilot-app`, not here.

#### Do not touch
- The limitation-of-liability and class-action-waiver blocks. Counsel owns those.
- The FERPA section — coordinate with Ticket 3's canonical wording but do not rewrite the legal
  substance.
- Do not add a clickwrap to this repository. There is no account creation here.

#### Acceptance criteria
- All nine named clause types are present.
- `/dmca` is reachable from the footer, is in the sitemap, and states a complete notice and
  counter-notice procedure.
- The Terms contain no capability warranty contradicting `src/lib/capabilities.ts`.
- Consumers and institutions have symmetric arbitration opt-out rights.
- `LAST_UPDATED` and `VERSION` are bumped.

#### Tests required
- Vitest test asserting the Terms page source contains a section heading for each required clause.
- Vitest test that `/dmca` is present in `sitemap.ts` and linked from `Footer.tsx`.
- Vitest test that no string in the Terms describes a non-live capability in the present tense
  (reuse Ticket 1's registry).

#### Security/permission checks
- The designated agent's contact details are published deliberately; confirm with a maintainer which
  address to use before committing a physical address.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main. Mark every drafted clause
as requiring counsel review in the PR description.

---

### Ticket 10: Reconcile the pricing story and fix the auto-renewal disclosure

#### Objective
Make the site tell one consistent story about what is free, what is paid, and how to cancel — and
bring the subscription disclosure in line with automatic-renewal law.

#### Context
Four pages disagree. `pricing/page.tsx:40-72` sells only a "No-cost" pilot and a "Custom" rollout.
`terms/page.tsx:427-462` describes recurring monthly/annual Stripe billing and a free tier with
limited AI usage. `faq/page.tsx:126-142` says "Students get free access to core features" and "Can I
cancel anytime? Yes. Access continues until the end of your billing period." `about/page.tsx:289` and
`products/curriculum-intelligence/page.tsx:125` both CTA "Get Started Free". A buyer cannot determine
what they are purchasing.

Separately, `terms/page.tsx:445-453` offers **email** as a cancellation route for an online
subscription. California's ARL (Bus. & Prof. Code § 17600 et seq.) requires an online cancellation
mechanism for anything signed up for online, plus clear-and-conspicuous renewal terms before purchase,
affirmative consent to those terms, and a post-purchase acknowledgment. This is a heavily litigated
class-action area.

#### Files/modules likely involved
- `src/app/pricing/page.tsx`
- `src/app/faq/page.tsx` (pricing category, ~L126-142)
- `src/app/terms/page.tsx` (subscriptions section, ~L419-464)
- `src/app/about/page.tsx` (~L284-291)
- `src/app/products/curriculum-intelligence/page.tsx` (~L120-130)
- New: `src/lib/pricing.ts`

#### Implementation requirements
- First, establish ground truth with a maintainer: does a paid consumer subscription exist today, or
  is everything institutional? **Do not guess.** Every downstream edit depends on this answer.
- Create `src/lib/pricing.ts` as the single source: tiers, what is included, what is free, whether
  billing recurs, and the cancellation method. Every pricing statement on every page reads from it.
- If no consumer subscription exists: remove the recurring-billing section from the Terms entirely,
  correct the FAQ answers, and change "Get Started Free" to language matching the actual motion
  ("Start a pilot", "Request access").
- If one does exist: add the ARL-required disclosures at the point of purchase — renewal frequency,
  amount, how to cancel, and the cancellation deadline — and change the Terms so cancellation is
  available online in-account, not by email. Email may be offered *in addition*, never *instead*.
- Remove the "Most popular" badge at `pricing/page.tsx:107`. There is no disclosed adoption data to
  support a popularity claim.
- Make the pilot's terms explicit: what "No-cost" covers, its duration, what happens at the end, and
  whether it converts to anything. An open-ended free offer with no stated end is its own problem.

#### Do not touch
- The pricing page's visual design or tier-card layout.
- The `ProcurementBadges` block — Ticket 3 owns it.

#### Acceptance criteria
- Reading `/pricing`, `/faq`, `/terms`, `/about`, and `/products/curriculum-intelligence` in sequence
  yields one consistent answer to: what is free, what recurs, and how to cancel.
- No page states a billing model absent from `src/lib/pricing.ts`.
- "Most popular" is gone.
- If recurring billing is retained, an online cancellation method is stated.

#### Tests required
- Vitest test that every pricing/billing claim string in the four pages maps to a field in
  `src/lib/pricing.ts`.
- Vitest test that fails on the literal "Most popular".
- Vitest test that if any tier has `recurring: true`, the Terms source contains an online cancellation
  method string.

#### Security/permission checks
- No payment collection, Stripe keys, or checkout flow belongs in this repository.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main. If the maintainer has not
answered the consumer-subscription question, stop and ask rather than assuming.

---

### Ticket 11: Rewrite the accessibility statement to describe what is actually true

#### Objective
Reduce the accessibility statement to verified claims about the surfaces it covers, and separate the
marketing site's conformance from the product's.

#### Context
`src/app/accessibility/page.tsx:74-79` claims features "engineered, **audited, and verified**" and
"substantially conformant with WCAG 2.2 Level AA **across all platform surfaces**". `:322-336` claims
axe-core runs "on every pull request via GitHub Actions", Pa11y-CI scans staging, and an a11y gate
blocks merges to main — **`.github/workflows/` contains only `.gitkeep`; there is no CI in this
repository.** `:273-276` claims VoiceOver and TalkBack testing "as part of each release cycle".
`:371-379` describes a CSP with `'unsafe-inline'` — there is no CSP; `next.config.mjs` sets no
headers. `:421-428` offers a VPAT on request. The statement also documents surfaces that do not exist
here at all (XP progress bars, course leaderboards, session-timeout dialogs, a materials accessibility
scanner), so it cannot have been verified against the property it is published on.

Universities procure against published conformance claims. A false conformance representation to a
federally funded institution is where False Claims Act theories are raised, and plaintiffs' firms
specifically target sites that publish a conformance level and fail it.

#### Files/modules likely involved
- `src/app/accessibility/page.tsx`
- `src/lib/social-proof.ts` (the `wcag` badge)
- Coordinate with Ticket 18 (CI) and Ticket 15 (CSP)

#### Implementation requirements
- Split the statement into two clearly labelled scopes: **edpilot.ai (this marketing site)** and
  **the EdPilot platform (app.edpilot.ai)**. Only make claims about the marketing site that are
  verifiable in this repository.
- Remove or qualify every claim that is not currently true:
  - "audited, and verified" → describe the actual process. If no third-party audit exists, say
    "self-assessed against WCAG 2.2 AA" and name the tools used.
  - The CI section: remove it, or land Ticket 18 first and describe only what that workflow actually
    runs. Do not describe a Pa11y schedule that does not exist.
  - Screen-reader testing: state what was actually tested, on what date, on what surfaces. Remove
    "each release cycle" unless a release process enforces it.
  - The CSP paragraph: remove it, or land Ticket 15 first and describe the CSP that exists.
  - LTI/Canvas Mobile testing claims: remove — Ticket 1 establishes LTI is planned.
  - Product-only features (XP bars, leaderboards, materials scanner, session timeout) move to the
    platform scope and are marked as claims about `app.edpilot.ai`, or are removed until verified.
- Replace "substantially conformant" with the standard, defensible phrasing: "partially conformant"
  plus an explicit, honest known-limitations list. Under WCAG-EM, "partially conformant" with candid
  limitations is stronger in a procurement review than an overstated claim that fails on inspection.
- Gate the VPAT offer behind a real document. If none exists, replace with: an accessibility
  conformance report is in preparation, and here is how to request current status.
- Keep and strengthen the grievance mechanism, response commitments, and DOJ/EU escalation paths.
  Those are the parts of the page that are working.
- Run an actual audit of this site's own pages and record the findings as the known-limitations list.

#### Do not touch
- The grievance/complaint sections' substance.
- The `wcag` badge in `social-proof.ts` — but if this ticket concludes the site is not AA-conformant,
  flag that badge for the maintainer rather than silently flipping it.

#### Acceptance criteria
- Every claim on the page is verifiable against this repository or explicitly scoped to
  `app.edpilot.ai`.
- No claim describes CI, tooling, or a CSP that does not exist.
- The known-limitations list reflects a real audit of this site.
- The VPAT offer matches whether a VPAT exists.

#### Tests required
- Vitest test that fails if the accessibility page claims GitHub Actions accessibility CI while
  `.github/workflows/` contains no workflow referencing axe or pa11y.
- Vitest test that fails if the page describes a CSP while `next.config.mjs` defines no
  `Content-Security-Policy` header.
- These two tests are the point of the ticket: they make the claim and the reality impossible to
  drift apart.

#### Security/permission checks
- Do not overstate. Understating conformance is safe; overstating is the entire exposure here.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main.

---

### Ticket 12: Add an AI transparency and governance page

#### Objective
Publish the disclosures a university's AI governance committee, DPO, and legal counsel will ask for
before a pilot — and that EU and Colorado law increasingly require.

#### Context
The site markets AI that supports grading (`faq/page.tsx:85-87`), flags academic integrity anomalies
(`privacy-policy/page.tsx:161-164`, "high-volume prompting around exam windows"), and, on the roadmap,
matches students to jobs based on academic performance (`products/page.tsx:55-59`). The EU AI Act,
Annex III(3), classifies AI used for "evaluating learning outcomes" and for "monitoring and detecting
prohibited behaviour of students during tests" as **high-risk**; Annex III(4) covers employment
matching. This site markets to EU/EEA institutions explicitly — the Privacy Policy has a GDPR section
and the accessibility statement targets EN 301 549 and the European Accessibility Act. Colorado's AI
Act treats educational opportunity as a consequential decision with algorithmic-discrimination duties.

None of this appears anywhere. There is no AI transparency page, no statement of human oversight in
grading, no accuracy or limitations disclosure, no bias-testing posture, and no route for a student to
contest an AI-influenced determination.

#### Files/modules likely involved
- New: `src/app/ai-transparency/page.tsx`
- `src/components/Footer.tsx`
- `src/app/sitemap.ts`
- `src/app/for-universities/page.tsx` (link it from the procurement section)
- `src/app/privacy-policy/page.tsx` (cross-link the integrity-monitoring paragraph)

#### Implementation requirements
- Build `/ai-transparency` covering: which models are used and for what (Vertex AI and Anthropic are
  already named in the Terms and Privacy Policy — stay consistent); what data reaches them; the role
  of retrieval grounding and its limits; where a human must remain in the loop; known failure modes;
  and how faculty configure and override behavior.
- Add a **human oversight** section stating explicitly that AI-assisted grading output is a draft for
  instructor review and is never released to a student without faculty approval, and that integrity
  flags are signals for human review and are never determinations of misconduct. Coordinate the
  wording with `privacy-policy/page.tsx:161-164`, which already says "This supports human academic
  integrity review; it does not replace it" — reuse that framing.
- Add a **contest and appeal** section: how a student or instructor raises a concern about an
  AI-influenced output, who reviews it, and the response commitment.
- Add an **accuracy and limitations** section reusing Ticket 2's `AiLimitationsNote` content in
  expanded form.
- Add a **regulatory posture** section naming the frameworks EdPilot tracks — EU AI Act, Colorado AI
  Act, FERPA, state student-privacy laws — and stating current status honestly. "Tracking and
  preparing" is a defensible position. Silence is not, and a compliance claim would be worse.
- Link the page from the footer, the sitemap, `/for-universities`, and the privacy policy's integrity
  paragraph.
- Reconcile the grading tense with Ticket 1: if AI Grader is `planned`, this page describes the
  intended design and says so.

#### Do not touch
- Do not claim EU AI Act conformity, a completed conformity assessment, or CE marking. Describe
  posture, never compliance.
- The existing FERPA sections' legal substance.

#### Acceptance criteria
- `/ai-transparency` covers models, data flows, human oversight, limitations, contest/appeal, and
  regulatory posture.
- The page is linked from the footer, the sitemap, `/for-universities`, and the privacy policy.
- No sentence claims regulatory compliance or certification.
- Grading tense matches `src/lib/capabilities.ts`.

#### Tests required
- Vitest test that `/ai-transparency` is in `sitemap.ts` and linked from `Footer.tsx`.
- Vitest test asserting the page source contains a heading for each of the six required sections.
- Vitest test that fails on the strings "AI Act compliant", "fully compliant", or "certified".

#### Security/permission checks
- Every data-flow description must match the privacy notice from Ticket 7. If the two disagree, the
  privacy notice wins and this page changes.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main. Flag the regulatory
section for counsel review.

---

### Ticket 13: Publish legal entity identification and a business address

#### Objective
Identify the contracting entity and its address everywhere the law expects to find them.

#### Context
`src/components/Footer.tsx:184-186` says only "© {year} EdPilot. All rights reserved." — no entity, no
address, no jurisdiction. The Terms (`:52`) and Privacy Policy (`:47`) both say "EdPilot, **Inc.**"
and `src/components/StructuredData.tsx:20` sets `alternateName: 'EdPilot Inc'` with
`foundingDate: '2024'`. No state of incorporation and no registered address appear anywhere.

CalOPPA requires a contact address in the privacy policy. CAN-SPAM requires a valid physical postal
address in every commercial email, which the newsletter will send. EU/UK e-commerce rules require
entity identification for anyone marketing into those markets, which this site does. And if
"EdPilot, Inc." is not actually incorporated, every "Inc." on the site is a misrepresentation and the
founders are personally exposed on the very liability shield the Terms imply.

#### Files/modules likely involved
- `src/lib/marketing.ts` (add entity constants)
- `src/components/Footer.tsx`
- `src/app/privacy-policy/page.tsx` (contact section)
- `src/app/terms/page.tsx` (contact section)
- `src/components/StructuredData.tsx` (`OrganizationSchema`)

#### Implementation requirements
- **First, confirm with a maintainer:** the exact registered entity name, state of incorporation, and
  the registered/business address to publish. Do not invent, guess, or placeholder any of these. If
  the entity is not incorporated, stop and report that — every "Inc." on the site is then a defect,
  not a formatting issue.
- Add `LEGAL_ENTITY_NAME`, `LEGAL_ENTITY_JURISDICTION`, and `LEGAL_ENTITY_ADDRESS` to
  `src/lib/marketing.ts` alongside the existing email constants.
- Render the entity name and address in the footer bottom bar and in the contact sections of both the
  Terms and the Privacy Policy.
- Update `OrganizationSchema` to include a proper `PostalAddress` and the correct `legalName`, and
  verify `foundingDate` is accurate.
- Verify the `sameAs` URLs at `StructuredData.tsx:25-28` (`twitter.com/edpilot`,
  `linkedin.com/company/edpilot`) actually belong to EdPilot. Remove any that do not — asserting an
  identity you do not own is its own problem.
- Ensure every user-facing "EdPilot, Inc." string derives from the constant so a future entity change
  is one edit.

#### Do not touch
- Do not publish a founder's home address. If no commercial address exists, escalate to the
  maintainer — a registered agent address or a virtual office is the normal answer, and that is a
  business decision, not an engineering one.

#### Acceptance criteria
- Entity name, jurisdiction, and address appear in the footer and both legal pages.
- `OrganizationSchema` carries a valid `PostalAddress` and `legalName`.
- No hardcoded entity-name string remains outside `src/lib/marketing.ts`.
- Every `sameAs` URL is confirmed or removed.

#### Tests required
- Vitest test that the entity constants are non-empty and that no page source contains a hardcoded
  "EdPilot, Inc." literal.
- Vitest test that `OrganizationSchema` output parses as valid JSON and includes `address` and
  `legalName`.

#### Security/permission checks
- Confirm the published address is a commercial or registered-agent address, never a residence.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main. If entity details are
unavailable, stop and ask — do not commit placeholders.

---

## Phase 2 — Engineering hardening

### Ticket 14: Fix the site-wide canonical URL bug and add per-page metadata

#### Objective
Give every route its own canonical URL, Open Graph metadata, and sitemap entry.

#### Context
`src/app/layout.tsx:52` sets `alternates: { canonical: "/" }` on the **root layout**. Next.js metadata
is inherited, and the only override in the codebase is `src/app/blog/[slug]/layout.tsx:19`. So
`/pricing`, `/for-universities`, `/products`, `/how-it-works`, `/compare` and its four detail pages,
`/about`, `/contact`, `/faq`, `/terms`, `/privacy-policy`, `/accessibility`, and
`/resources/positioning-language` **all emit `<link rel="canonical" href="https://edpilot.ai/">`** —
every page tells Google it is a duplicate of the homepage. This will strip the site's inner pages out
of the index. It is a launch blocker and a one-line-per-page fix.

Also: no page below the root defines `openGraph` or `twitter` metadata, so sharing any inner page
renders the homepage card. `/for-universities` is missing from `src/app/sitemap.ts` entirely.
`src/app/resources/positioning-language/page.tsx:52` emits a breadcrumb for
`https://edpilot.ai/resources`, which 404s.

#### Files/modules likely involved
- `src/app/layout.tsx`
- Every `page.tsx` / `layout.tsx` with a `metadata` export
- `src/app/sitemap.ts`
- `src/app/resources/positioning-language/page.tsx`
- New: `src/lib/seo.ts`

#### Implementation requirements
- Remove `alternates: { canonical: "/" }` from the root layout, or scope it so it cannot be inherited.
- Add `src/lib/seo.ts` with a `buildMetadata({ path, title, description, keywords })` helper that
  returns canonical, Open Graph, and Twitter metadata derived from `NEXT_PUBLIC_MARKETING_URL`.
- Apply it to every route with a `metadata` export. Client-component pages that cannot export
  metadata (`privacy-policy`, `terms`, `faq`, `contact`, `blog`, `accessibility`) already have
  `layout.tsx` files or need one — follow the existing pattern.
- Add `/for-universities` to `sitemap.ts`, and add any route created by Tickets 8, 9, and 12
  (`/unsubscribe` should be `noindex`, not sitemapped).
- Fix the `/resources` breadcrumb: either create the index page or drop that breadcrumb level.
- Add a per-page OG image or, at minimum, ensure the root `opengraph-image.tsx` is correctly
  referenced by each page's metadata.

#### Do not touch
- `src/app/blog/[slug]/layout.tsx` — its canonical is already correct.
- The `robots` metadata block in the root layout. Ticket 17 owns environment-conditional indexing.

#### Acceptance criteria
- Every route emits a canonical URL matching its own path.
- Every route defines its own `openGraph.title`, `description`, and `url`.
- Every public route is in `sitemap.ts`; `/unsubscribe` is not.
- No breadcrumb points at a 404.

#### Tests required
- Vitest test that iterates every route in `sitemap.ts`, imports its metadata, and asserts
  `alternates.canonical` equals the route's own path.
- Vitest test that every route in `sitemap.ts` resolves to a real `page.tsx` on disk.
- Vitest test that every route with a `metadata` export defines `openGraph`.

#### Security/permission checks
- Canonical and OG URLs must derive from `NEXT_PUBLIC_MARKETING_URL`, never be hardcoded, so preview
  deployments do not emit production canonicals.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main.

---

### Ticket 15: Add security response headers and a Content-Security-Policy

#### Objective
Ship the baseline response headers the site currently has none of.

#### Context
`next.config.mjs` defines no `headers()` and there is no `middleware.ts`. The site ships with no CSP,
no HSTS, no `X-Content-Type-Options`, no `frame-ancestors`, no `Referrer-Policy`, and no
`Permissions-Policy`. `poweredByHeader: false` is the only hardening present. Separately,
`src/app/accessibility/page.tsx:371-379` publicly describes a CSP configuration that does not exist —
Ticket 11 removes that claim, and this ticket makes a version of it true.

#### Files/modules likely involved
- `next.config.mjs`
- New: `src/middleware.ts` (only if nonce-based CSP is chosen)
- `src/app/accessibility/page.tsx` (coordinate with Ticket 11)

#### Implementation requirements
- Add a `headers()` function to `next.config.mjs` applying to all routes:
  `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `X-Frame-Options: DENY`, and a `Permissions-Policy` denying camera, microphone, geolocation, and
  interest-cohort.
- Add a Content-Security-Policy. Enumerate what the site actually loads first: `next/font` (Inter,
  Plus Jakarta Sans — self-hosted at build time, so no `fonts.gstatic.com` origin needed), Vercel
  Analytics and Speed Insights endpoints, and the site's own assets. Do not copy a generic policy.
- Start in `Content-Security-Policy-Report-Only` mode, verify zero violations across every route, then
  switch to enforcing in a follow-up commit. Note this two-step in the PR.
- Include `frame-ancestors 'none'`, `base-uri 'self'`, `object-src 'none'`, and `form-action 'self'`.
- If `'unsafe-inline'` is unavoidable for scripts, document exactly why in a code comment and open a
  follow-up for nonce-based CSP via middleware. Do not silently ship `'unsafe-inline'`.
- Note the JSON-LD `<script type="application/ld+json">` blocks in `StructuredData.tsx` — they are
  inline and must be accounted for in `script-src`.

#### Do not touch
- Do not add middleware unless the nonce approach is chosen; a static header config is simpler and
  sufficient for a static marketing site.
- Do not weaken the policy to make a third-party script work without first asking whether that script
  should be there.

#### Acceptance criteria
- All six header categories are present on every route.
- CSP is enumerated from actual site behavior, not copied.
- No console CSP violations on `/`, `/pricing`, `/contact`, `/blog`, `/compare`, or any legal page.
- Any `'unsafe-inline'` is documented with a reason and a follow-up.

#### Tests required
- Vitest test asserting `next.config.mjs` exports a `headers()` returning each required header.
- Integration test (or a documented manual verification step in the PR) that a production build
  responds with the headers on at least three routes.

#### Security/permission checks
- HSTS `preload` is effectively irreversible for the domain. Confirm with a maintainer that
  `edpilot.ai` and all subdomains are HTTPS-only before including `preload`.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main.

---

### Ticket 16: Rate limit both server actions

#### Objective
Stop unauthenticated abuse of the contact and newsletter endpoints.

#### Context
`sendContactMessage` (`src/app/contact/actions.ts`) and `subscribeToNewsletter`
(`src/app/blog/actions.ts`) are publicly invocable POST endpoints protected only by a honeypot field.
`sendContactMessage` additionally fans out to a third-party webhook carrying a bearer secret on every
invocation (`src/lib/contact-intake.ts`). Unthrottled, that is a request-amplification path against a
partner endpoint, an unbounded insert path, and a way to flood the sales inbox.

#### Files/modules likely involved
- New: `src/lib/rate-limit.ts`
- `src/app/contact/actions.ts`
- `src/app/blog/actions.ts`
- `.env.example`

#### Implementation requirements
- Implement a rate limiter keyed on a hashed client IP (from the `x-forwarded-for` header via
  `next/headers`), with an in-memory fallback and a documented path to a durable store. On serverless
  the in-memory limiter is per-instance and therefore best-effort — state that limitation in a code
  comment rather than implying stronger protection than exists.
- Apply conservative limits: contact form 5 per IP per hour; newsletter 5 per IP per hour. Return the
  same generic error shape as existing validation failures — never reveal that a limit was hit in a
  way that helps an attacker tune.
- Hash IPs before use as keys. Never log or store a raw IP.
- Add a minimum-time-on-page check to complement the honeypot: reject submissions arriving under two
  seconds after form render, via a signed timestamp field.
- **Exempt the unsubscribe route from Ticket 8** — CAN-SPAM requires one-click unsubscribe to work,
  and a rate limit that blocks it creates a worse problem than it solves.
- Add a maximum length check on every contact field, not just `message`. `institution`, `department`,
  and the rest are currently unbounded and go straight into the webhook payload and the database.

#### Do not touch
- The honeypot behavior — a tripped honeypot must keep returning a fake success.
- The error-path behavior in `contact/actions.ts:78-90`, which correctly refuses to report success
  when durable storage was not confirmed. Preserve that exactly.

#### Acceptance criteria
- Both actions enforce a per-IP limit.
- All string fields have maximum lengths enforced server-side.
- Rate-limited responses are indistinguishable from ordinary validation failures.
- No raw IP is logged or persisted.
- The limiter's per-instance limitation is documented in a comment.

#### Tests required
- Vitest: the sixth submission from one IP within the window is rejected.
- Vitest: the limiter keys on a hash, and the raw IP never appears in the key or in any log call.
- Vitest: over-length values in every field are rejected.
- Vitest: a tripped honeypot still returns `{ success: true }`.
- Vitest: a submission under the minimum time threshold is rejected.

#### Security/permission checks
- `CONTACT_FORM_WEBHOOK_SECRET` must remain server-only and never reach a client component.
- Rate-limit state must not be keyed on anything user-controllable other than the derived IP hash.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main.

---

### Ticket 17: Prevent preview deployments from being indexed

#### Objective
Keep unreleased copy out of search engines and AI crawlers.

#### Context
`public/robots.txt` is a static `Allow: /` that additionally admits GPTBot, CCBot, anthropic-ai,
Diffbot, Omgilibot, and AdsBot-Google. Vercel preview URLs serve that same file, so unreleased copy is
crawled and indexed alongside production. Combined with `public/llm.txt` — which is written to be
ingested and repeated by language models — a stale preview's claims can be republished by answer
engines long after the production copy is corrected. Given that Tickets 1–6 exist specifically to
remove indefensible claims, letting previews propagate the old ones defeats the point.

#### Files/modules likely involved
- New: `src/app/robots.ts` (replacing static `public/robots.txt`)
- `next.config.mjs` (headers) or `src/middleware.ts`
- `src/app/layout.tsx` (`robots` metadata block, ~L70-74)
- `public/robots.txt` (delete after migration)

#### Implementation requirements
- Replace the static `public/robots.txt` with a dynamic `src/app/robots.ts` that returns
  `Disallow: /` when `process.env.VERCEL_ENV !== 'production'` and the current permissive rules when
  it is. Keep the existing crawler list and sitemap reference for production.
- Add an `X-Robots-Tag: noindex, nofollow` response header for all non-production environments via
  `next.config.mjs` headers, conditioned on `VERCEL_ENV`. Headers are the reliable control; robots.txt
  is advisory.
- Make the root layout's `robots` metadata (`layout.tsx:70-74`) environment-conditional so preview
  builds emit `noindex`.
- Serve `llm.txt` only in production, or add a non-production banner line at the top of the file
  stating it is a preview build and not authoritative.
- Set `/unsubscribe` to `noindex` in all environments.

#### Do not touch
- Production crawler permissions. Whether to admit GPTBot is a business decision, not this ticket's.

#### Acceptance criteria
- A non-production build serves `Disallow: /` and `X-Robots-Tag: noindex`.
- A production build serves the existing rules unchanged.
- `/unsubscribe` is `noindex` everywhere.
- `public/robots.txt` is removed once `src/app/robots.ts` covers it.

#### Tests required
- Vitest: `robots.ts` returns `Disallow: /` when `VERCEL_ENV` is `preview` or `development`.
- Vitest: `robots.ts` returns the production rules and the sitemap URL when `VERCEL_ENV` is
  `production`.
- Vitest: the root layout's `robots` metadata is `noindex` in non-production.

#### Security/permission checks
- Confirm no preview URL currently appears in the production sitemap.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main.

---

### Ticket 18: Stand up CI

#### Objective
Run lint, typecheck, tests, build, and an accessibility scan on every pull request.

#### Context
`.github/workflows/` contains only `.gitkeep` — nothing runs on a PR. Meanwhile
`src/app/accessibility/page.tsx:322-336` publicly claims axe-core runs on every pull request via
GitHub Actions and gates merges to main. Ticket 11 removes that claim; this ticket makes a version of
it true, after which Ticket 11's copy can describe what actually runs.

Note for context: `npm ci` failed during the audit with `403 Forbidden` on `zwitch@2.0.4` from a
registry proxy. Verify a clean install succeeds in CI and investigate if it does not.

#### Files/modules likely involved
- New: `.github/workflows/ci.yml`
- `package.json` (scripts)
- New: `.github/workflows/a11y.yml` or an added CI job
- `docs/PRODUCTION-READINESS.md` (update the build-verification note)

#### Implementation requirements
- Create `.github/workflows/ci.yml` running on `pull_request` and on push to `main`, with Node 20+,
  `npm ci`, then `npm run lint`, `npm run type-check`, `npm test`, and `npm run build` as separate
  named steps so a failure is legible.
- Add an accessibility job running axe-core against a production build of the public routes. Start it
  as non-blocking, record the baseline, then make it blocking in a follow-up once the baseline is
  clean. Do not claim a merge gate exists until it does.
- Cache `~/.npm` keyed on `package-lock.json`.
- Add a job that runs the claim-guard tests introduced by Tickets 1–6 and 11 as a distinct named step
  ("claim integrity"), so a copy change that reintroduces a banned claim fails visibly rather than
  being buried in a general test run.
- Fix the `type-check` script if the TypeScript version pinned in `package.json` errors on
  `tsconfig.json`'s `baseUrl` — the audit environment's global `tsc` reported `TS5101`, which may not
  reproduce with the pinned 5.7.x. Verify against the pinned version before changing anything.
- Add a status-badge line to `README.md`.

#### Do not touch
- Do not add deployment, release, or publish steps. This is CI only.
- Do not add secrets. Every check must run without them.

#### Acceptance criteria
- A PR runs lint, typecheck, tests, build, claim integrity, and a11y.
- Failures are attributable to a named step.
- The workflow runs green on the current `main`.
- Ticket 11's accessibility copy can now describe what the workflow actually does.

#### Tests required
- The workflow is itself the test. Verify by opening a draft PR and confirming all jobs run.
- Add one deliberately failing claim-guard fixture locally to confirm the claim-integrity job catches
  it, then remove it.

#### Security/permission checks
- Pin action versions to a full commit SHA, not a floating tag.
- Set `permissions: contents: read` at the workflow level.
- Do not enable `pull_request_target`.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main.

---

### Ticket 19: Add publication dates and Article structured data to the blog

#### Objective
Date every post and make posts eligible for article rich results.

#### Context
`BlogPost` in `src/lib/blog-data.ts:8-20` has no `publishedAt` or `updatedAt` field, so none of the
fifteen posts renders a date. Undated thought-leadership reads as abandoned to the exact buyer being
courted, and no post can earn an `Article` rich result. Every post is bylined only "Co-Founder,
EdPilot" with no named person, while `src/app/about/page.tsx:38-55` names both founders.

#### Files/modules likely involved
- `src/lib/blog-data.ts`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/blog/[slug]/layout.tsx`
- `src/components/StructuredData.tsx` (new `ArticleSchema`)
- `src/app/sitemap.ts`

#### Implementation requirements
- Add required `publishedAt` and optional `updatedAt` ISO date fields to `BlogPost`. Get real dates
  from a maintainer or from git history — **do not backfill invented dates.** An honestly recent date
  beats a fabricated old one.
- Render the date on both the index cards and the post header, using `<time dateTime="...">`.
- Give `author` a real `name` alongside the existing `title`, matching the About page.
- Add an `ArticleSchema` component emitting `headline`, `datePublished`, `dateModified`, `author`,
  `publisher`, and `mainEntityOfPage`, rendered from `blog/[slug]/layout.tsx`.
- Use `publishedAt` for `lastModified` in `sitemap.ts` instead of the current `new Date()`, which
  reports every post as modified on every build — a signal search engines discount.
- Sort the blog index by `publishedAt` descending.

#### Do not touch
- The hand-rolled markdown renderer at `blog/[slug]/page.tsx:70-140`. Ticket 20 handles the unused
  MDX dependency question separately.
- Post content.

#### Acceptance criteria
- Every post has a real `publishedAt` and renders a visible date.
- Each post emits valid `Article` JSON-LD.
- `sitemap.ts` uses per-post dates.
- The index is sorted newest first.

#### Tests required
- Vitest: every `blogPosts` entry has a `publishedAt` parsing as a valid date not in the future.
- Vitest: `ArticleSchema` output parses as JSON and contains `headline`, `datePublished`, and
  `author.name`.
- Vitest: sitemap blog entries use `publishedAt`/`updatedAt`, not the build time.

#### Security/permission checks
- None — public content only.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main. If real publication dates
are unavailable, stop and ask rather than inventing them.

---

### Ticket 20: Clear the dead code, unused dependencies, and unresolved placeholders

#### Objective
Remove everything shipping that should not be, and resolve the `TODO`s currently live in production.

#### Context
Four separate items. (1) `src/lib/contact-store.ts` fully implements `saveContactSubmission` and
`db/schema.sql:18-33` documents `contact_submissions` as created by it — but nothing imports it;
`contact/actions.ts` uses the webhook path instead, so the documented data flow and the real one
disagree, which matters directly for the privacy notice in Ticket 7. (2) `next-mdx-remote`,
`gray-matter`, `remark-gfm`, `rehype-slug`, and `rehype-autolink-headings` are installed but the blog
uses a hand-rolled parser. (3) `src/app/about/page.tsx:42` and `:50` carry unresolved
`TODO(CONFIRM)` markers on both founders' biographies, under a header claiming "Founded by
practitioners", next to real names linked to real LinkedIn profiles. (4) `src/app/about/page.tsx:286`
solicits "Send us your materials" with no upload terms.

#### Files/modules likely involved
- `src/lib/contact-store.ts`
- `db/schema.sql`
- `package.json`
- `src/app/about/page.tsx`
- `src/app/contact/page.tsx`
- `README.md`

#### Implementation requirements
- **Contact storage:** confirm the intended flow with a maintainer. Either wire `saveContactSubmission`
  in as a durable fallback alongside the webhook, or delete `contact-store.ts` and remove
  `contact_submissions` from `db/schema.sql`. Do not leave a documented table that nothing writes to.
  Whatever is decided must match the Ticket 7 privacy disclosure exactly.
- **Dependencies:** confirm the five markdown packages are genuinely unused
  (`grep -rn "next-mdx-remote\|gray-matter\|remark-gfm\|rehype-" src/`), then remove them from
  `package.json` and regenerate `package-lock.json` with `npm install`. If a migration to MDX is
  planned, open a follow-up issue and leave a comment rather than leaving five unused packages
  installed on a site whose selling point is governance.
- **Founder bios:** get verified one-line backgrounds from each founder and replace both
  `TODO(CONFIRM)` markers. If not available, replace with a factual, non-credentialing line (role and
  what they work on) and remove the `TODO`. An implicit credential claim about a named, identifiable
  person should be accurate and specific, or absent.
- **Materials solicitation:** add a short, visible note wherever course materials are requested
  (`about/page.tsx:284-290`, `contact/page.tsx:757-761`) stating that submitters should send only
  materials they have the right to share, should not include student personal information or graded
  student work, and describing what EdPilot does with them and how long they are kept. Link it to the
  Ticket 7 privacy section.
- Delete the empty `.gitkeep` placeholder directories under `src/components/` that now contain real
  files (`blog/`, `layout/`, `marketing/`, `seo/`, `ui/`), and `src/content/blog/.gitkeep` if the
  markdown-file blog approach is confirmed abandoned.

#### Do not touch
- The honeypot fields.
- The `testimonials` / `pilotInstitutions` empty arrays and the comments explaining why they must stay
  empty.
- Do not remove a dependency without grepping for it first.

#### Acceptance criteria
- No exported function in `src/lib/` is unreferenced.
- `db/schema.sql` documents only tables the code actually writes.
- No unused dependency remains in `package.json`.
- No `TODO(CONFIRM)` remains in any file rendered to users.
- Both places that solicit course materials carry an upload note.

#### Tests required
- Vitest test that fails if any file under `src/app/` or `src/components/` contains "TODO(CONFIRM)"
  or "TODO(ASSET)" in a string rendered to the page.
- Vitest test that every table in `db/schema.sql` has a corresponding writer in `src/lib/`.
- Build must pass after dependency removal — this is the real check.

#### Security/permission checks
- If `contact-store.ts` is wired in, contact submissions become PII at rest in Postgres and must be
  disclosed in the Ticket 7 privacy notice with a retention period, before that code ships.

#### Final Kimi instructions
Before editing, inspect the existing code structure and reuse existing patterns. Touch the fewest
files possible. Add or update tests. Run lint, typecheck, tests, and build using the commands in
package.json. Summarize all changed files and do not push directly to main.
