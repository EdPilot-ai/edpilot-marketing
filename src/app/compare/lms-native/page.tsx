import { BreadcrumbSchema } from '@/components/StructuredData'
import { ComparisonDetail } from '@/components/marketing'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EdPilot vs. LMS-Native AI - Comparison',
  description:
    'EdPilot vs Canvas AI, Blackboard AI, and other LMS-native solutions. Compare vendor independence, customization, and institutional control.',
  keywords: 'EdPilot vs Canvas AI, EdPilot vs Blackboard, LMS integration, vendor independence',
}

export default function LMSNativePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'EdPilot', url: 'https://edpilot.com' },
          { name: 'Compare', url: 'https://edpilot.com/compare' },
          { name: 'vs. LMS-Native AI', url: 'https://edpilot.com/compare/lms-native' },
        ]}
      />
      <ComparisonDetail
        title="EdPilot vs. LMS-Native AI"
        description="LMS-native AI is convenient. Convenience is lovely until your policy, pedagogy, or timeline does not fit the vendor roadmap."
        competitorName="LMS-Native AI"
        competitorItems={[
          'Integrated into one existing system',
          'Limited by LMS vendor roadmap',
          'One-size-fits-all policy model',
          'Vendor lock-in across LMS changes',
          'Difficult to govern across multiple systems',
          'Early features often remain generic',
        ]}
        edpilotItems={[
          'Works alongside any LMS',
          'Policies configurable to your institution',
          'Faculty-controlled course boundaries',
          'Survives LMS changes',
          'Central governance across courses',
          'Purpose-built AI teaching workflows',
        ]}
        scenarios={[
          {
            setup: 'Faculty wants course-specific guardrails.',
            oldWay: 'The LMS setting is either too broad, too rigid, or “coming soon.”',
            edpilot: 'The course model follows the professor’s materials and boundaries.',
          },
          {
            setup: 'Your institution changes LMS vendors.',
            oldWay: 'The AI strategy packs a tiny suitcase and starts over.',
            edpilot: 'EdPilot stays as the governed AI layer across systems.',
          },
          {
            setup: 'A department needs a pilot this semester.',
            oldWay: 'The roadmap nods sympathetically from next year.',
            edpilot: 'Start with file upload now, deepen integrations as rollout grows.',
          },
        ]}
        sections={[
          {
            title: 'Vendor roadmap',
            body:
              'If an LMS vendor does not prioritize a governance feature, your institution waits. EdPilot is built specifically around the AI governance and course-grounding problem.',
          },
          {
            title: 'Institutional continuity',
            body:
              'Universities change LMSs, consolidate systems, and run multiple platforms. EdPilot keeps AI policy and course intelligence independent from any single LMS vendor.',
          },
          {
            title: 'Integration quality',
            body:
              'EdPilot can integrate with LMS workflows while remaining the source of truth for AI behavior, visibility, and faculty control.',
          },
        ]}
      />
      <Footer />
    </>
  )
}
