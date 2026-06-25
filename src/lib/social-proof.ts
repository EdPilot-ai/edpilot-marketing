// Social proof content. Keep everything here TRUE — no fabricated metrics,
// logos, or testimonials. Components that consume empty arrays render nothing,
// so the site never ships placeholder/fake proof.

export type Testimonial = {
  quote: string
  name: string
  title: string
  institution: string
}

/**
 * Real faculty/admin testimonials. Empty until we have signed-off quotes —
 * the <Testimonials /> component renders nothing while this is empty, so no
 * placeholder quotes appear on the live site.
 *
 * To add one:
 *   { quote: '…', name: 'Dr. …', title: 'Professor of …', institution: '… University' }
 */
export const testimonials: Testimonial[] = []

/**
 * Pilot / customer institution names to show as a logo or wordmark strip.
 * Empty until we have permission to display them.
 */
export const pilotInstitutions: string[] = []

/**
 * Product facts — these are TRUE today and safe to show as "proof" without a
 * customer reference. Tie to real product behavior, not invented adoption.
 */
export const productFacts: Array<{ value: string; label: string }> = [
  { value: '~2 min', label: 'To register your university' },
  { value: 'Same week', label: 'From sign-up to teaching faculty' },
  { value: '0', label: 'Student records used to train public models' },
  { value: '100%', label: 'Answers grounded in your course materials' },
]
