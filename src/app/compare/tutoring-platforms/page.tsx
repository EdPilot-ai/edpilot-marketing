import { BreadcrumbSchema } from '@/components/StructuredData'
import { ComparisonDetail } from '@/components/marketing'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EdPilot vs. Tutoring Platforms - Comparison',
  description:
    'EdPilot vs homework tutoring platforms like Chegg and Tutor.com. Compare institutional oversight, academic integrity, and university integration.',
  keywords: 'EdPilot vs Chegg, EdPilot vs Tutor.com, institutional AI, academic integrity',
}

export default function TutoringPlatformsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'EdPilot', url: 'https://edpilot.ai' },
          { name: 'Compare', url: 'https://edpilot.ai/compare' },
          { name: 'vs. Tutoring Platforms', url: 'https://edpilot.ai/compare/tutoring-platforms' },
        ]}
      />
      <ComparisonDetail
        title="EdPilot vs. Tutoring Platforms"
        description="Tutoring platforms help individual students. EdPilot helps the course get smarter while keeping instructors in the loop."
        competitorName="Tutoring Platforms"
        competitorItems={[
          'One-on-one help can be available',
          'Broad subject coverage',
          'No instructor oversight',
          'Student-facing only',
          'Limited university data governance',
          'May create academic integrity blind spots',
        ]}
        edpilotItems={[
          'Institutional platform with oversight',
          'Instructor-controlled policies',
          'Course-specific expertise',
          'LMS and university workflow alignment',
          'Academic integrity safeguards',
          'Audit trails and learning visibility',
        ]}
        scenarios={[
          {
            setup: 'A student gets stuck at 11:42pm.',
            oldWay: 'They leave the course environment and hope outside help matches the professor’s expectations.',
            edpilot: 'They get support grounded in the actual syllabus, readings, and lecture framing.',
          },
          {
            setup: 'The same misconception appears 80 times.',
            oldWay: 'Tutoring platforms see isolated sessions. The professor sees nothing.',
            edpilot: 'EdPilot turns repeated confusion into an instructional signal.',
          },
          {
            setup: 'A department wants accountability.',
            oldWay: 'Consumer-style help is hard to govern.',
            edpilot: 'Policies, usage patterns, and course boundaries live inside the institutional layer.',
          },
        ]}
        sections={[
          {
            title: 'Oversight model',
            body:
              'Tutoring platforms start with the student. EdPilot starts with the course, the instructor, and the institution responsible for the learning environment.',
          },
          {
            title: 'Academic integrity',
            body:
              'EdPilot is designed to help students learn without completing their work for them. Faculty-defined policy and course grounding make the support environment accountable.',
          },
          {
            title: 'Institutional integration',
            body:
              'Universities need AI support that fits their policies, systems, and privacy expectations. EdPilot is built for that context from the start.',
          },
        ]}
      />
      <Footer />
    </>
  )
}
