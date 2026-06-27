# Frontend Audit

Date: 2026-06-26

Scope read: the public routes under `src/app`, including `/`, `for-universities`, `pricing`,
`products`, `products/curriculum-intelligence`, `how-it-works`, `compare` and its four detail
pages, `blog`, `blog/[slug]`, `about`, `contact`, `faq`, `privacy-policy`, `terms`,
`accessibility`, `not-found`, `error`, `global-error`, plus the extra
`resources/positioning-language` page found in the tree. Also read `src/app/layout.tsx`,
`src/app/globals.css`, `tailwind.config.js`, `src/components/Navbar.tsx`,
`src/components/Footer.tsx`, `src/components/ui/button.tsx`, and `src/components/marketing/*`.

This audit makes no source changes. It documents the current structure, proposed logical order,
site IA, consistency/reuse gaps, and prioritized follow-up tasks.

## Summary

The site already has the right foundation for EdPilot: dark calm academic surfaces, honest social
proof guardrails, a useful shared marketing library, global navbar/footer in the root layout, one
`main` landmark, skip link, `MotionProvider`, and strong bespoke visuals such as
`CourseAssistantMockup`, `InteractiveLaunchpad`, and `RoleExplorer`.

The highest-impact improvement is to sharpen the university-administrator buyer journey:
`For Universities -> Products -> How It Works -> Pricing -> Compare -> Contact`. Today the pages
are good individually, but home, for-universities, products, and curriculum-intelligence repeat the
same "course-grounded / faculty-controlled / institution-ready" proof instead of building one clear
top-to-bottom story.

Hard invariants for every follow-up:

- Preserve hover/focus behavior. Do not add `!important` to the base `bg-*`, `border-*`, or
  `text-*` utility overrides in `src/app/globals.css`.
- Keep internal routes on Next `<Link>`.
- Do not break contact/newsletter server actions or honeypot fields.
- Keep the root `MotionProvider`, skip link, single `<main>`, and branded 404/error routes.
- Do not fabricate logos, testimonials, certifications, customer names, adoption metrics, or a
  `/security` page.

## Per-Page Findings

### `/`

Current order: hero with `CourseAssistantMockup`; problem/stat panel; four-value strip; positioning
quote; workflow; role grid; "Why EdPilot"; featured product panel; institutional proof; CTA band.

Current story: EdPilot is course-grounded, faculty-controlled AI for real courses, with student help
and institutional readiness. The hero and mockup work well.

Gaps: sections 2, 3, 4, 7, and 9 repeat the same pillars; roles list administrators last; "Featured
Product" says AI Teaching Assistant but links to Curriculum Intelligence; the value strip is
hand-rolled.

Proposed order: hero; ungoverned AI problem with true product facts; concise "what EdPilot is";
workflow; admin-first role outcomes; why EdPilot vs generic AI; Curriculum Intelligence led by the
live AI Teaching Assistant; institutional readiness; CTA.

### `/for-universities`

Current order: hero; risk cards; governed-shift cards; signoff/proof panel; rollout/stat section;
CTA.

Current story: administrators inherit unmanaged AI risk unless they create a governed path.

Gaps: no purpose-built admin visual; rollout objection comes after signoff; inline link uses raw
`hover:text-[#A78BFA]`.

Proposed order: hero; unmanaged exposure; governed shift; admin governance/rollout visual; rollout
steps and true facts; IT/legal/privacy/procurement signoff; CTA.

### `/pricing`

Current order: hero; Students, Professor Pilot, Institution tiers; pricing mechanics; CTA.

Current story: free adoption path, custom institutional pricing.

Gaps: first tier is Students even though the primary buyer is institutional; tier cards duplicate
card/checklist/button patterns; no explicit pilot-vs-institution comparison.

Proposed order: hero; buyer framing around free pilot then priced rollout; Professor Pilot and
Institution as primary cards with Students as supporting access; included-capabilities comparison;
scale mechanics; CTA.

### `/products`

Current order: hero; Curriculum Intelligence suite card and tool cards; wider platform roadmap;
pilot-to-institution path.

Current story: one course model powers a suite now and a broader platform later.

Gaps: no final `CTABand`; live, beta, and planned features compete visually; roadmap distracts from
what is available now; several bespoke cards duplicate shared components and include raw token-like
colors.

Proposed order: hero; available-now anchor around AI Teaching Assistant; suite capabilities grouped
by status; shared course model; pilot-to-rollout path; quieter roadmap; CTA.

### `/products/curriculum-intelligence`

Current order: hero/back link; trust bar; course model visual; product moment cards; compliance and
integrations; CTA.

Current story: five tools run from one course model.

Gaps: metadata calls this "The AI Teaching Assistant" while hero says "Curriculum Intelligence
Suite"; live product should get more weight than planned tools; local `statusClasses` duplicates
`StatusPill`; several raw hover fills.

Proposed order: hero clarifying AI Teaching Assistant is live now; availability strip; course model
visual; live assistant deep dive; beta/planned roadmap; compliance/integrations with direct upload
now and LMS/SSO status carefully phrased; CTA.

### `/how-it-works`

Current order: hero; interactive launch path; effortless feature grid; role explorer; safe-by-design
panel; CTA.

Current story: a university can start quickly, invite faculty, and keep course data bounded.

Gaps: "safe by design" should appear closer to setup for admins who worry self-serve means
uncontrolled; `InteractiveLaunchpad` and `RoleExplorer` contain reusable tab/status/card primitives.

Proposed order: hero; interactive launch path; safety built into setup; role lanes; lightweight
setup benefits; CTA.

### `/compare`

Current order: hero; four comparison cards; short-version moments; CTA.

Current story: route visitors to the right alternative comparison.

Gaps: no admin decision framing; cards are bespoke; short-version moments repeat the detail-page
scenario pattern; no cross-links to `for-universities` or `pricing`.

Proposed order: hero; "choose your comparison" cards labeled by buyer concern; compact decision
table; related buyer links; CTA.

### `/compare/chatgpt`

Current order: shared `ComparisonDetail` hero/back link; scenarios; comparison grid; detail cards;
CTA.

Current story: ChatGPT is broad and generic; EdPilot is course-grounded and governed.

Gaps: administrators may want the quick comparison grid before scenarios; shared template lacks
related next links.

Proposed order: hero; quick grid; academic moments; detail sections; related links; CTA.

### `/compare/tutoring-platforms`

Current order: shared comparison hero; scenarios; grid; detail cards; CTA.

Current story: tutoring helps students individually, while EdPilot gives course/institution
visibility.

Gaps: oversight should appear earlier; clarify EdPilot is not only a tutoring replacement; link to
`how-it-works` and `for-universities`.

Proposed order: hero; quick grid; role impact for administrators/professors/students; moments;
details; CTA.

### `/compare/lms-native`

Current order: shared comparison hero; scenarios; grid; detail cards; CTA.

Current story: LMS-native AI is convenient but constrained by vendor roadmap.

Gaps: integration status needs careful phrasing so "works alongside any LMS" does not imply full LMS
parity today; implementation concerns should link to `how-it-works`.

Proposed order: hero; current integration-status strip; quick grid; moments; details; CTA.

### `/compare/custom-solutions`

Current order: shared comparison hero; scenarios; grid; detail cards; CTA.

Current story: custom builds carry hidden platform, compliance, staffing, and support costs.

Gaps: cost/time numbers should be sourced, softened, or framed as illustrative; a total-cost visual
would land better than text-only cards.

Proposed order: hero; quick grid; build-cost/timeline risk visual; moments; details; CTA.

### `/blog`

Current order: hero; sticky search bar; featured article; filtered grid/empty state; newsletter.

Current story: responsible AI thought leadership with search and newsletter capture.

Gaps: sticky search appears before the featured content and feels heavy for current volume;
`ArticleCard`/`AuthorBadge` are local but reusable; search excludes category/body; raw hover colors
appear.

Proposed order: hero; featured article; search/filter row; grid/empty state; newsletter.

### `/blog/[slug]`

Current order: progress bar; back bar; article header; body with excerpt and rendered markdown; xl
TOC; share row; related articles.

Current story: focused article reading with metadata, TOC, sharing, and related posts.

Gaps: bypasses `PageShell`, `Hero`, `Section`, and `Container`; custom markdown renderer only
handles current content shapes; progress bar fixed at `top-0` may feel detached from the sticky
navbar; clipboard share has no visible failure fallback.

Proposed order: blog back link; article hero/header using marketing tokens; prose plus TOC; share;
related articles; optional newsletter CTA.

### `/about`

Current order: hero; challenge panel; differentiation grid; mission quote; principles grid; team;
trust bar; CTA.

Current story: why EdPilot exists and who is building it.

Gaps: leans professor-first even though administrators are the primary buyer; challenge,
differentiation, mission, and principles overlap; founder cards should be reusable; LinkedIn action
uses raw brand colors and lacks explicit `focus-ring`.

Proposed order: hero; why now; mission; how EdPilot is different; principles; team; trust posture;
CTA.

### `/contact`

Current order: hero; three routing cards; form section with explanation steps; proof panel.

Current story: route demo, pilot, security/procurement, and general questions to the right next
step.

Gaps: routing cards are bespoke; proof panel sits below the form instead of near the decision point;
`CustomSelect` is strong but local.

Proposed order: hero; request routing cards; form with expectation/proof adjacent; optional proof
panel. Preserve the server action, honeypot, success state, loading state, and error toast.

### `/faq`

Current order: hero; category shortcut buttons; grouped accordion list; CTA.

Current story: common questions for buyers, faculty, students, privacy, pricing, and support.

Gaps: category order puts students before privacy/pricing despite administrator priority; some
answers should be checked against the current pricing story; category buttons use raw hover fill.

Proposed order: hero; shortcuts ordered Getting Started, Privacy & Security, Pricing & Plans,
Professors, Students, Technical Support; accordions in the same order; CTA.

### `/privacy-policy`

Current order: legal hero; long prose covering intro, collection, use, FERPA, AI practices,
infrastructure/security, rights, state/GDPR rights, breach, children, changes, contact.

Current story: comprehensive privacy reference for users and institutional reviewers.

Gaps: bespoke legal prose/card/table patterns instead of shared prose components; Google Vertex AI
and Anthropic claims should stay synchronized with the app/product reality; check/cross glyphs feel
off-system. Do not rearrange legal content without counsel approval.

Proposed order: keep legal order; refactor presentation only into shared `LegalSection`,
`LegalCallout`, `LegalTable`, and `LegalContactBlock`.

### `/terms`

Current order: legal hero; agreement, accounts, acceptable use, prohibited conduct, ownership,
third parties, LTI/LMS, FERPA, AI terms, subscriptions, liability, disputes, termination, contact.

Current story: platform rules and obligations.

Gaps: same legal presentation divergence as privacy; LMS/LTI claims should stay synchronized with
actual product capability; do not change legal copy without counsel.

Proposed order: keep legal order; apply shared legal/prose presentation components.

### `/accessibility`

Current order: hero; commitment, conformance, implemented features, known limitations, technical
specs, grievance process, formal complaints, roadmap.

Current story: procurement-friendly accessibility statement.

Gaps: claims about audits, route announcers, modal traps, high-contrast mode, and CI gates should be
verified against the live app and marketing repo before sales/procurement reliance; prose is denser
than the rest of the site.

Proposed order: keep statement order; add summary/procurement contact, shared prose sections,
limitations, and feedback/grievance presentation.

### `/resources/positioning-language`

Current order: hero; definitions; recommended language; comparative positioning; keywords.

Current story: terminology and SEO positioning reference.

Gaps: no `/resources` index and no nav/footer path; includes `FAQSchema` without page-specific FAQ
content. Decide whether this is public or internal.

Proposed order if public: hero; recommended description; definitions; comparisons; keywords;
related links to Compare/Blog. If internal, remove from public IA or noindex.

### `not-found.tsx`

Current order: branded 404 hero; home/contact actions; popular-page links.

Current story: calm recovery.

Gaps: quick links omit `for-universities` and `pricing`; repeated structure with `error.tsx`.

Proposed order: branded error; recovery actions; buyer-priority links to For Universities,
Products, Pricing, Contact.

### `error.tsx`

Current order: branded error hero; optional digest; retry/home actions.

Current story: recoverable route error.

Gaps: no contact/support path if retry fails; duplicate 404 structure.

Proposed order: branded error; digest; retry, home, contact support.

### `global-error.tsx`

Current order: inline root fallback with label, headline, description, reset button.

Current story: on-brand even when root layout fails.

Gaps: raw hex is necessary here because Tailwind globals may not load, but values must be manually
kept in sync; button uses `#7C3AED` while the canonical accent is `#8B5CF6`.

Proposed order: keep structure; only add a home/contact fallback if safe in root-error context.

## Site-Wide IA Recommendation

Current navbar: Products, For Universities, How It Works, Pricing, Compare, About, Contact, plus
external Sign in and Get Started.

Recommended navbar: For Universities, Products, How It Works, Pricing, Compare, Resources/Blog,
Contact. Move About to footer unless founder credibility is intentionally top-level.

Current footer: Product, Compare, Company, Contact, Legal. It omits two comparison detail pages and
does not expose Resources.

Recommended footer:

- For Universities: Governed AI, How It Works, Pricing, Contact.
- Products: Curriculum Intelligence, AI Teaching Assistant anchor, Roadmap if retained.
- Compare: ChatGPT, Tutoring Platforms, LMS-Native AI, Custom Solutions.
- Resources: Blog, FAQ, Positioning Language if public.
- Company: About, Contact.
- Legal: Privacy, Terms, Accessibility.

Cross-link gaps:

- Home should explicitly route to For Universities, Curriculum Intelligence, Pricing, and Contact.
- For Universities should route to How It Works, Pricing, and Curriculum Intelligence.
- Pricing should route back to For Universities and How It Works.
- Products should end with a CTA and route to Pricing.
- Comparison detail pages should include next links to For Universities, Products, and Pricing.
- Blog articles should include a newsletter or relevant buyer-page next step.
- 404 quick links should prioritize buyer routes.

## Consistency and Component Reuse

Token/raw-color clusters spotted:

- `Navbar` and `Footer` use raw border/text colors such as `border-[#27272A]`,
  `text-[#9898A3]`, and `hover:text-[#A78BFA]`.
- `Button` variants use raw violet/border colors despite existing tokens.
- `Marketing.tsx`, `SelfServeExperience.tsx`, and several pages use repeated arbitrary gradients,
  shadows, traffic-light colors, `hover:bg-[#1d1d22]`, and `border-[#3d3d45]`.
- `global-error.tsx` uses inline raw hex by necessity; keep it manually synchronized.

Extract or extend:

- `ValueStrip` / `SignalStrip` for compact four-column value rows.
- `MarketingCard` or `FeatureCard` variants for linked, compact, pricing, highlighted, dashed, and
  metric cards.
- Expanded `StatusPill` for `live`, `beta`, `planned`, `popular`, and `roadmap`.
- `PricingTierCard`.
- `LinkedFeatureCard` for Products and Compare hub.
- `ArticleCard`, `AuthorBadge`, `RelatedArticleCard`.
- `PersonCard` for founders.
- `RoutingCard` for Contact.
- `LegalSection`, `LegalCallout`, `LegalTable`, `LegalContactBlock`.
- `ErrorStatePage` shared by 404 and route error.

Keep bespoke:

- `CourseAssistantMockup`.
- `InteractiveLaunchpad` and `RoleExplorer`, while extracting only lower-level primitives if reused.

Spacing/type/icon notes:

- Standardize major sections to `py-20 md:py-28`, compact sections to `py-14 md:py-20`, and utility
  bars to smaller spacing.
- Prefer `SectionHeader` for all non-legal major sections.
- Keep current hero and section type scale; normalize legal/blog prose headings.
- Prefer `IconChip` or card variants for icon squares.

Responsive/accessibility code risks to preview:

- Seven-link navbar plus CTAs at medium widths.
- Blog sticky search at `top-16`.
- Blog article progress bar fixed at `top-0`.
- Pricing tier wrapping on small screens.
- FAQ category grid label wrapping and tap targets.
- Contact custom select popover clipping.
- `CourseAssistantMockup` mobile stacking.
- FAQ JS `scrollIntoView({ behavior: "smooth" })` should respect reduced motion.
- Contact custom select should be keyboard/screen-reader tested.
- Clipboard share should handle permission failure.
- `global-error` needs a focus-visible style without relying on Tailwind.

## Prioritized Task List

1. Reorder navbar/footer for the administrator buyer journey.
   - Files: `src/components/Navbar.tsx`, `src/components/Footer.tsx`.
   - Preserve: `<Link>` for internal routes, external app auth URLs, mobile menu behavior,
     focus rings.

2. Tighten the homepage story and make administrators first.
   - Files: `src/app/page.tsx`, possibly `src/components/marketing/Marketing.tsx`.
   - Preserve: `CourseAssistantMockup`, true product facts, CTAs, hover/focus states.

3. Clarify live/beta/planned product availability.
   - Files: `src/app/products/page.tsx`,
     `src/app/products/curriculum-intelligence/page.tsx`, `src/components/marketing/Marketing.tsx`.
   - Preserve: honest roadmap/LMS/SSO wording and no invented availability.

4. Add an administrator governance visual to `for-universities`.
   - Files: `src/app/for-universities/page.tsx`, optional marketing visual component.
   - Preserve: single accent, no fake institutions/logos/metrics.

5. Extract repeated card/status patterns.
   - Files: `src/components/marketing/Marketing.tsx` and only the pages needed to adopt each
     component.
   - Preserve: hover/focus behavior and existing surface rhythm.

6. Reframe Pricing around pilot-to-institution buying.
   - Files: `src/app/pricing/page.tsx`, optional `PricingTierCard`.
   - Preserve: free student/professor-pilot truth and custom institutional pricing.

7. Improve `ComparisonDetail` once for all four subpages.
   - Files: `src/components/marketing/Marketing.tsx`; subpage copy only where needed.
   - Preserve: routes, back link, CTA, careful competitor claims.

8. Normalize blog listing/article components.
   - Files: `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, marketing blog components.
   - Preserve: newsletter action, honeypot, empty state, progress/share behavior.

9. Refactor legal/prose presentation without legal copy changes.
   - Files: `privacy-policy`, `terms`, `accessibility`, shared marketing legal components.
   - Preserve: dates, versions, mailto contacts, and counsel-controlled copy.

10. Token cleanup and hover QA.
    - Files: `button.tsx`, navbar, footer, selected page files.
    - Preserve: `globals.css` specificity model and no base utility `!important`.

11. Error/404 recovery polish.
    - Files: `not-found.tsx`, `error.tsx`, maybe shared `ErrorStatePage`.
    - Preserve: branded route errors and root `global-error` independence.

12. Manual Vercel preview QA.
    - Scope: desktop/mobile hovers, forms, newsletter, navbar, contact selects, FAQ, blog, and mockups.
    - Preserve: reduced motion, focus rings, landmarks, and loading/empty/error states.

## Required Verification For Future Source Changes

Run:

```bash
npm run lint
npm run type-check
npm run build
```

Then use the Vercel preview to verify hovers still render, especially background and border hover
states on cards, buttons, navbar, footer, FAQ, pricing, and blog components.
