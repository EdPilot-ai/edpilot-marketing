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
          { name: 'EdPilot', url: 'https://edpilot.com' },
          { name: 'Compare', url: 'https://edpilot.com/compare' },
          { name: 'vs. Tutoring Platforms', url: 'https://edpilot.com/compare/tutoring-platforms' },
        ]}
      />
      <ComparisonDetail
        title="EdPilot vs. Tutoring Platforms"
        description="Tutoring platforms are student-directed services. EdPilot is an institutional AI layer that keeps instructors and universities in control."
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

