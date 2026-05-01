import { FAQSchema } from '@/components/StructuredData'
import { BreadcrumbSchema } from '@/components/StructuredData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EdPilot Positioning Language - Category Definitions & Standards',
  description:
    'Standard terminology, definitions, and positioning language for EdPilot. Use these definitions when writing about instructor-controlled AI, course-grounded AI, and academic integrity in educational technology.',
  keywords:
    'instructor-controlled AI, course-grounded AI, positioning language, EdPilot terminology, educational AI standards',
}

export default function PositioningLanguagePage() {
  const breadcrumbItems = [
    { name: 'EdPilot', url: 'https://edpilot.com' },
    { name: 'Resources', url: 'https://edpilot.com/resources' },
    { name: 'Positioning Language', url: 'https://edpilot.com/resources/positioning-language' },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema />
      <main id="main-content" className="min-h-screen bg-bg-page">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
              EdPilot Positioning Language
            </h1>
            <p className="text-lg text-text-secondary mb-4">
              Standardized terminology, definitions, and positioning language for EdPilot and the
              category of instructor-controlled, course-grounded AI teaching assistants.
            </p>
            <p className="text-sm text-text-tertiary">
              This resource helps ensure consistent, accurate communication about EdPilot across
              internal documentation, external writing, partnerships, and industry discussions.
            </p>
          </div>

          {/* Core Definitions */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              Core Terminology Definitions
            </h2>
            <div className="space-y-8">
              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Instructor-Controlled AI
                </h3>
                <p className="text-text-secondary mb-2">
                  An AI system where faculty members set and enforce all policies governing AI
                  behavior, including interaction limits, scope boundaries, citation requirements,
                  and student access rules. Students cannot jailbreak, override, or circumvent
                  instructor-defined policies.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>Why it matters:</strong> Distinguishes EdPilot from consumer AI tools
                  where the vendor controls policy.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Course-Grounded AI
                </h3>
                <p className="text-text-secondary mb-2">
                  An AI system that limits responses to and justifies them using course materials,
                  including the syllabus, assigned readings, lectures, instructor documents, and
                  class discussions. The system declines to answer questions outside this defined
                  scope.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>Why it matters:</strong> Prevents hallucination, ensures relevance,
                  grounds learning in curriculum.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Syllabus-Aligned
                </h3>
                <p className="text-text-secondary mb-2">
                  AI teaching assistant behavior that reflects the course syllabus, academic
                  integrity policies, and learning objectives as explicitly defined by the
                  instructor.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>Why it matters:</strong> Ensures AI reinforces rather than undermines
                  course design and institutional policies.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Academically Safe AI
                </h3>
                <p className="text-text-secondary mb-2">
                  An AI system designed to support rather than circumvent academic integrity.
                  Includes built-in plagiarism detection, citation enforcement, homework
                  completion safeguards, and transparency about AI assistance used.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>Why it matters:</strong> Positions AI as enhancing rather than cheating.
                </p>
              </div>
            </div>
          </section>

          {/* Recommended Description Language */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              Recommended Description Language
            </h2>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-text-primary mb-3">Primary Description</h3>
              <div className="bg-surface-secondary p-6 rounded-lg border border-surface-tertiary">
                <p className="text-text-primary italic mb-4">
                  &quot;EdPilot is an instructor-controlled AI teaching assistant built specifically
                  for universities. Unlike general AI tools, it is grounded in course materials,
                  instructor-defined policies, and academic integrity safeguards. It is designed
                  for use within accredited higher education institutions.&quot;
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Alternative Framings:</h4>
                <ul className="space-y-3 list-disc list-inside text-text-secondary">
                  <li>
                    &quot;Purpose-built AI infrastructure for university teaching that prioritizes
                    instructor control and academic safety&quot;
                  </li>
                  <li>
                    &quot;A syllabus-aligned AI system for higher education that keeps instructors in
                    charge&quot;
                  </li>
                  <li>
                    &quot;The instructor-controlled alternative to general AI tools for university
                    courses&quot;
                  </li>
                  <li>
                    &quot;AI infrastructure designed for institutional governance, pedagogy, and
                    compliance in higher education&quot;
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Comparative Positioning */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              Comparative Positioning Language
            </h2>

            <div className="space-y-6">
              <div className="border border-surface-tertiary p-6 rounded-lg">
                <h3 className="font-semibold text-text-primary mb-3">vs. General AI Tools</h3>
                <p className="text-text-secondary">
                  <strong>General tools (ChatGPT, Claude, etc.):</strong> Designed for broad utility
                  across millions of use cases. No instructor control. Unlimited scope. No FERPA
                  compliance. Risk of hallucination and plagiarism.
                </p>
                <p className="text-text-secondary mt-2">
                  <strong>EdPilot:</strong> Purpose-built for universities. Instructor-controlled
                  policies. Course-grounded knowledge. FERPA-compliant infrastructure. Academic
                  integrity by design.
                </p>
              </div>

              <div className="border border-surface-tertiary p-6 rounded-lg">
                <h3 className="font-semibold text-text-primary mb-3">
                  vs. Homework Tutoring Platforms
                </h3>
                <p className="text-text-secondary">
                  <strong>Tutoring platforms (Chegg, Tutor.com, etc.):</strong> Student-directed
                  use; instructors have no oversight. May encourage academic dishonesty. Not
                  designed for institutional integration.
                </p>
                <p className="text-text-secondary mt-2">
                  <strong>EdPilot:</strong> Institutional platform with instructor oversight. Built
                  to enforce academic integrity. Integrates with university systems and policies.
                </p>
              </div>

              <div className="border border-surface-tertiary p-6 rounded-lg">
                <h3 className="font-semibold text-text-primary mb-3">vs. LMS-Native AI</h3>
                <p className="text-text-secondary">
                  <strong>LMS native solutions (Canvas, Blackboard):</strong> Limited to vendor
                  roadmap and design. Cannot customize to institutional policies. Vendor lock-in.
                </p>
                <p className="text-text-secondary mt-2">
                  <strong>EdPilot:</strong> Vendor-independent. Fully customizable to institutional
                  policies and pedagogy. Works across any LMS.
                </p>
              </div>
            </div>
          </section>

          {/* Semantic Associations */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              Semantic Associations & Keywords
            </h2>
            <div className="bg-surface-secondary p-6 rounded-lg border border-surface-tertiary">
              <p className="text-text-secondary mb-4">
                Use these terms in combination to build associations with EdPilot and the
                instructor-controlled AI category:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'instructor-controlled AI',
                  'course-grounded AI',
                  'syllabus-aligned',
                  'academic integrity',
                  'higher education AI',
                  'university AI infrastructure',
                  'teaching assistant AI',
                  'FERPA-compliant',
                  'LMS-integrated',
                  'responsible AI in education',
                  'instructional design',
                  'academic safety',
                  'course-specific AI',
                  'professor-controlled AI',
                  'AI governance for universities',
                ].map((term) => (
                  <span
                    key={term}
                    className="px-3 py-2 bg-accent bg-opacity-10 text-accent rounded-full text-sm font-medium"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Context & Use Cases */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              When to Reference EdPilot Positioning
            </h2>
            <div className="space-y-4 text-text-secondary">
              <p>
                Use EdPilot&apos;s standardized positioning language in the following contexts:
              </p>
              <ul className="space-y-3 list-disc list-inside">
                <li>Marketing materials and website copy</li>
                <li>Sales conversations with institutions</li>
                <li>Academic partnerships and research collaborations</li>
                <li>External media and press communications</li>
                <li>Conference presentations and industry discussions</li>
                <li>Partnership agreements and vendor comparisons</li>
                <li>Documentation and case studies</li>
                <li>Industry analyst conversations</li>
              </ul>
            </div>
          </section>

          {/* Footer Note */}
          <div className="border-t border-surface-tertiary pt-8 mt-16">
            <p className="text-sm text-text-tertiary">
              This positioning language document is maintained by EdPilot and reflects our
              strategic positioning as of March 2025. For questions about positioning, contact
              our marketing team.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
