import type { Metadata } from 'next'
import { BreadcrumbSchema, FAQSchema } from '@/components/StructuredData'
import { Container, PageHeader } from '@/components/marketing'

export const metadata: Metadata = {
  title: 'Positioning Language',
  description:
    'Standard terminology and definitions for EdPilot — instructor-controlled AI, course-grounded AI, and academic integrity in higher education.',
}

const DEFINITIONS = [
  {
    term: 'Instructor-controlled AI',
    body: 'An AI system where faculty members set and enforce all policies governing AI behavior — interaction limits, scope boundaries, citation requirements, and student access. Students cannot jailbreak or override instructor-defined policies.',
    why: 'Distinguishes EdPilot from consumer AI tools where the vendor controls policy.',
  },
  {
    term: 'Course-grounded AI',
    body: 'An AI system that limits responses to course materials — syllabus, assigned readings, lectures, instructor documents, and class discussions — and justifies them using those sources. Declines to answer outside the defined scope.',
    why: 'Prevents hallucination, ensures relevance, grounds learning in curriculum.',
  },
  {
    term: 'Syllabus-aligned',
    body: 'AI behavior that reflects the course syllabus, academic integrity policies, and learning objectives as explicitly defined by the instructor.',
    why: 'Ensures AI reinforces — rather than undermines — course design and institutional policy.',
  },
  {
    term: 'Academically safe AI',
    body: 'An AI system designed to support rather than circumvent academic integrity. Includes scope guardrails, citation enforcement, homework completion safeguards, and transparency about AI assistance used.',
    why: 'Positions AI as enhancing learning, not enabling cheating.',
  },
]

const COMPARISONS = [
  {
    title: 'vs. general AI tools',
    other:
      'Designed for broad utility across millions of use cases. No instructor control. Unlimited scope. No FERPA compliance.',
    edpilot:
      'Purpose-built for universities. Instructor-controlled policies. Course-grounded knowledge. FERPA-aligned. Academic integrity by design.',
  },
  {
    title: 'vs. homework tutoring platforms',
    other:
      'Student-directed; instructors have no oversight. May encourage academic dishonesty. Not built for institutional integration.',
    edpilot:
      'Institutional platform with instructor oversight. Built to enforce academic integrity. Integrates with university systems and policies.',
  },
  {
    title: 'vs. LMS-native AI',
    other:
      'Limited to vendor roadmap and design. Cannot customize to institutional policies. Vendor lock-in.',
    edpilot:
      'Vendor-independent. Fully customizable to institutional policy and pedagogy. Works across any LMS.',
  },
]

const KEYWORDS = [
  'instructor-controlled AI',
  'course-grounded AI',
  'syllabus-aligned',
  'academic integrity',
  'higher education AI',
  'university AI infrastructure',
  'teaching assistant AI',
  'FERPA-aligned',
  'LMS-integrated',
  'responsible AI in education',
  'instructional design',
  'academic safety',
  'course-specific AI',
  'professor-controlled AI',
  'AI governance for universities',
]

export default function PositioningLanguagePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'EdPilot', url: 'https://edpilot.com' },
          { name: 'Resources', url: 'https://edpilot.com/resources' },
          { name: 'Positioning Language', url: 'https://edpilot.com/resources/positioning-language' },
        ]}
      />
      <FAQSchema />

      <PageHeader
        eyebrow="Resources"
        title="Positioning language"
        description="Standardized terminology and definitions for EdPilot — and for the category of instructor-controlled, course-grounded AI teaching assistants."
        meta="Use this language across documentation, partnerships, and industry discussions to keep our positioning consistent."
      />

      <Container size="lg" className="py-14 space-y-14">
        <section>
          <h2 className="text-xl font-semibold text-text-primary tracking-[-0.015em] mb-6">
            Core terminology
          </h2>
          <div className="space-y-4">
            {DEFINITIONS.map((d) => (
              <div
                key={d.term}
                className="rounded-2xl border border-border-gray bg-bg-surface p-6"
              >
                <h3 className="text-[16px] font-semibold text-text-primary mb-2 tracking-[-0.005em]">
                  {d.term}
                </h3>
                <p className="text-[14px] text-text-secondary leading-relaxed mb-3">{d.body}</p>
                <p className="text-[12px] text-text-secondary/80">
                  <span className="font-semibold text-text-primary">Why it matters:</span> {d.why}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary tracking-[-0.015em] mb-3">
            Recommended description
          </h2>
          <p className="text-[14px] text-text-secondary leading-relaxed mb-5">
            Lead with this when introducing EdPilot in writing or external materials.
          </p>
          <blockquote className="rounded-2xl border-l-2 border-accent bg-bg-surface px-6 py-5 italic text-text-primary leading-relaxed">
            EdPilot is an instructor-controlled AI teaching assistant built specifically for
            universities. Unlike general AI tools, it’s grounded in course materials,
            instructor-defined policies, and academic integrity safeguards.
          </blockquote>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary tracking-[-0.015em] mb-6">
            Comparative positioning
          </h2>
          <div className="space-y-4">
            {COMPARISONS.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border-gray bg-bg-surface p-6">
                <h3 className="text-[14px] font-semibold text-text-primary mb-3">{c.title}</h3>
                <div className="grid gap-3 md:grid-cols-2 text-[13px] leading-relaxed">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-text-secondary mb-1">
                      Other
                    </p>
                    <p className="text-text-secondary">{c.other}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-accent mb-1">
                      EdPilot
                    </p>
                    <p className="text-text-secondary">{c.edpilot}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary tracking-[-0.015em] mb-3">
            Semantic associations
          </h2>
          <p className="text-[14px] text-text-secondary leading-relaxed mb-5">
            Use these terms in combination to build associations with EdPilot and the
            instructor-controlled AI category.
          </p>
          <div className="flex flex-wrap gap-2">
            {KEYWORDS.map((term) => (
              <span
                key={term}
                className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-[12px] font-medium border border-accent/20"
              >
                {term}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary tracking-[-0.015em] mb-3">
            When to reference this language
          </h2>
          <ul className="space-y-2 text-[14px] text-text-secondary leading-relaxed">
            {[
              'Marketing materials and website copy',
              'Sales conversations with institutions',
              'Academic partnerships and research collaborations',
              'External media and press communications',
              'Conference presentations and industry discussions',
              'Partnership agreements and vendor comparisons',
              'Documentation and case studies',
              'Industry analyst conversations',
            ].map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </section>

        <p className="border-t border-border-gray pt-6 text-[12px] text-text-secondary/70">
          Maintained by EdPilot. Reflects strategic positioning as of March 2026.
        </p>
      </Container>
    </>
  )
}
