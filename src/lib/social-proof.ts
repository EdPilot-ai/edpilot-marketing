// Social proof content. Keep everything here TRUE: no fabricated metrics,
// logos, or testimonials. Components that consume empty arrays render nothing,
// so the site never ships placeholder/fake proof.

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  institution: string;
};

/**
 * Real faculty/admin testimonials. Empty until we have signed-off quotes;
 * the <Testimonials /> component renders nothing while this is empty, so no
 * placeholder quotes appear on the live site.
 *
 * To add one:
 *   { quote: '…', name: 'Dr. …', title: 'Professor of …', institution: '… University' }
 */
export const testimonials: Testimonial[] = [];

/**
 * Pilot / customer institution names to show as a logo or wordmark strip.
 * Empty until we have permission to display them.
 */
export const pilotInstitutions: string[] = [];

/**
 * Product facts: these are TRUE today and safe to show as "proof" without a
 * customer reference. Tie to real product behavior, not invented adoption.
 */
export const productFacts: Array<{ value: string; label: string }> = [
  { value: "~2 min", label: "To register your university" },
  { value: "Same week", label: "From sign-up to teaching faculty" },
  { value: "0", label: "Student records used to train public models" },
  { value: "100%", label: "Answers grounded in your course materials" },
];

export type EvidenceStat = { value: string; label: string; source: string };

/**
 * Third-party, sourced evidence about AI use in higher education. Unlike
 * productFacts (claims about EdPilot), these are external research findings and
 * MUST always render their named source inline — that is what makes them
 * defensible to a skeptical administrator.
 *
 * TODO(CONFIRM): keep each figure + citation verified against the primary
 * source before publishing; update the year/label if a newer survey supersedes it.
 */
export const evidenceStats: EvidenceStat[] = [
  {
    value: "95%",
    label: "of undergraduates already use AI",
    source: "Higher Education Policy Institute, Student Generative AI Survey 2026",
  },
  {
    value: "85%",
    label: "of US students used generative AI for coursework last year",
    source: "Inside Higher Ed, Student Voice survey, 2025",
  },
  {
    value: "59%",
    label: "of teens say AI cheating is a regular occurrence at their school",
    source: "Pew Research Center, 2026",
  },
  {
    value: "29%",
    label: "of faculty can reliably identify AI-generated work",
    source: "Frontiers in Education, 2025",
  },
];

export type EvaluatingInstitution = {
  /** Anonymized descriptor, e.g. "Public R1". */
  type: string;
  /** Scale descriptor, e.g. "14,000 students" or "3 campuses". */
  scale: string;
  /** Where they are in evaluation, e.g. "piloting 3 courses". */
  stage: string;
  /** TODO(ASSET): drop in a real logo path + name once permission is granted;
   *  when set, the strip renders the logo instead of the anonymized descriptor. */
  logo?: string;
  name?: string;
};

/**
 * Universities currently evaluating EdPilot. Anonymized on purpose: no client
 * names are approved for display yet, so we show honest institutional
 * descriptors instead of fabricated logos. This is a real pipeline described
 * generically, not invented social proof.
 *
 * TODO(ASSET): replace individual entries with { logo, name } once an
 * institution grants permission — the component upgrades automatically.
 */
export const evaluatingInstitutions: EvaluatingInstitution[] = [
  { type: "Public R1", scale: "14,000 students", stage: "piloting 3 courses" },
  { type: "Private liberal-arts college", scale: "2,100 students", stage: "faculty-led pilot" },
  { type: "Community college district", scale: "3 campuses", stage: "IT review underway" },
];

export type ProcurementBadge = {
  /** Stable id — the component maps this to an icon. */
  id: string;
  label: string;
  /** Legal can toggle a badge off without touching component code. */
  enabled: boolean;
  /** Optional qualifier rendered under the label, e.g. an "in progress" note. */
  note?: string;
};

/**
 * Security & procurement posture shown as compact pills. Data-driven so legal
 * can toggle each claim on/off. Keep every enabled claim TRUE and defensible.
 *
 * TODO(CONFIRM): SOC 2 is disabled until an audit is actually underway/complete.
 * Flip `enabled: true` only when true; keep the "in progress" note honest, or
 * remove the entry entirely if it should not be shown.
 *
 * NOTE: the homepage security panel (src/app/page.tsx, "Compliance status" and
 * neighboring ProofPanel tiles) states these same claims in prose — if legal
 * toggles or rewords a badge here, update that panel's copy in the same change.
 */
export const procurementBadges: ProcurementBadge[] = [
  { id: "ferpa", label: "FERPA-aligned data handling", enabled: true },
  { id: "no-train", label: "Student data never trains public models", enabled: true },
  { id: "scoped", label: "Institution- and course-scoped data", enabled: true },
  { id: "wcag", label: "WCAG 2.2 AA accessibility", enabled: true },
  { id: "encryption", label: "Data encrypted in transit & at rest", enabled: true },
  { id: "soc2", label: "SOC 2 Type II", enabled: false, note: "in progress" },
];
