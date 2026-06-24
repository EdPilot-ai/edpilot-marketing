import { FAQSchema, BreadcrumbSchema } from '@/components/StructuredData'
import { Container, FeatureCard, Hero, PageShell, Section, SectionHeader } from '@/components/marketing'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EdPilot Positioning Language - Category Definitions & Standards',
  description:
    'Standard terminology, definitions, and positioning language for EdPilot and instructor-controlled, course-grounded AI teaching assistants.',
  keywords:
    'instructor-controlled AI, course-grounded AI, positioning language, EdPilot terminology, educational AI standards',
}

const definitions = [
  {
    title: 'Instructor-Controlled AI',
    description:
      'An AI system where faculty set and enforce policies governing behavior, including scope boundaries, citation requirements, interaction limits, and student access rules.',
    why: 'Distinguishes EdPilot from consumer AI tools where the vendor controls policy.',
  },
  {
    title: 'Course-Grounded AI',
    description:
      'An AI system that limits responses to course materials: syllabus, readings, lectures, instructor documents, and class context.',
    why: 'Prevents hallucination, reinforces relevance, and keeps learning grounded in curriculum.',
  },
  {
    title: 'Syllabus-Aligned',
    description:
      'AI teaching assistant behavior that reflects the course syllabus, academic integrity policies, and learning objectives defined by the instructor.',
    why: 'Ensures AI reinforces course design instead of undermining it.',
  },
  {
    title: 'Academically Safe AI',
    description:
      'An AI system designed to support learning without circumventing academic integrity, with safeguards, citations, and transparency built in.',
    why: 'Positions AI as an educational support layer, not a shortcut engine.',
  },
]

export default function PositioningLanguagePage() {
  const breadcrumbItems = [
    { name: 'EdPilot', url: 'https://edpilot.ai' },
    { name: 'Resources', url: 'https://edpilot.ai/resources' },
    { name: 'Positioning Language', url: 'https://edpilot.ai/resources/positioning-language' },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema />
      <PageShell>
        <Hero
          eyebrow="Resource"
          title="EdPilot positioning language"
          description="Standard definitions and phrasing for instructor-controlled, course-grounded AI in higher education."
          className="pb-14"
        />

        <Section className="py-20 md:py-28">
          <Container>
            <SectionHeader eyebrow="Core Terminology" title="Use precise language." />
            <div className="grid gap-4 md:grid-cols-2">
              {definitions.map((definition) => (
                <FeatureCard
                  key={definition.title}
                  title={definition.title}
                  description={definition.description}
                >
                  <p className="mt-4 border-t border-border-gray pt-4 text-xs leading-6 text-text-tertiary">
                    <span className="font-semibold text-text-secondary">Why it matters:</span>{' '}
                    {definition.why}
                  </p>
                </FeatureCard>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="py-20 md:py-28" surface="panel">
          <Container size="narrow">
            <SectionHeader
              align="left"
              eyebrow="Primary Description"
              title="Recommended language"
              description="EdPilot is an instructor-controlled AI teaching assistant built specifically for universities. Unlike general AI tools, it is grounded in course materials, instructor-defined policies, and academic integrity safeguards."
            />
            <div className="rounded-lg border border-border-gray bg-bg-deep p-6 text-sm leading-7 text-text-secondary">
              <p>
                Alternative framings include &ldquo;purpose-built AI infrastructure for university
                teaching,&rdquo; &ldquo;a syllabus-aligned AI system that keeps instructors in charge,&rdquo; and
                &ldquo;the instructor-controlled alternative to general AI tools for university courses.&rdquo;
              </p>
            </div>
          </Container>
        </Section>

        <Section className="py-20 md:py-28">
          <Container>
            <SectionHeader eyebrow="Comparative Positioning" title="Make the contrast explicit." />
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                title="vs. General AI Tools"
                description="General tools are broad and vendor-controlled. EdPilot is course-grounded, instructor-controlled, and built for institutional governance."
              />
              <FeatureCard
                title="vs. Tutoring Platforms"
                description="Tutoring services are student-directed. EdPilot gives instructors oversight and aligns support with course expectations."
              />
              <FeatureCard
                title="vs. LMS-Native AI"
                description="LMS-native AI follows a vendor roadmap. EdPilot stays vendor-independent and configurable to institutional policies."
              />
            </div>
          </Container>
        </Section>

        <Section className="py-20 md:py-28" surface="panel">
          <Container>
            <SectionHeader eyebrow="Keywords" title="Semantic associations" />
            <div className="flex flex-wrap gap-2">
              {[
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
                'course-specific AI',
                'AI governance for universities',
              ].map((term) => (
                <span
                  key={term}
                  className="rounded-lg border border-accent/20 bg-accent/10 px-3 py-2 text-sm font-medium text-accent"
                >
                  {term}
                </span>
              ))}
            </div>
          </Container>
        </Section>

      </PageShell>
    </>
  )
}

