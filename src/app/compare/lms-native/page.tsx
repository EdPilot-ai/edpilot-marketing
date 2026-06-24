import { BreadcrumbSchema } from '@/components/StructuredData'
import { ComparisonDetail } from '@/components/marketing'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EdPilot vs. LMS-Native AI - Comparison',
  description:
    'Compare LMS-native AI approaches with EdPilot: vendor independence, customization, institutional control, and LMS workflow integration.',
  keywords: 'LMS AI comparison, Canvas integration, Blackboard integration, vendor independence',
}

export default function LMSNativePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'EdPilot', url: 'https://edpilot.ai' },
          { name: 'Compare', url: 'https://edpilot.ai/compare' },
          { name: 'vs. LMS-Native AI', url: 'https://edpilot.ai/compare/lms-native' },
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
    </>
  )
}
