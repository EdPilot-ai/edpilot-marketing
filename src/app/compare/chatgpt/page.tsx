import { BreadcrumbSchema } from '@/components/StructuredData'
import { ComparisonDetail } from '@/components/marketing'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EdPilot vs. ChatGPT for Education - Comparison',
  description:
    'EdPilot vs ChatGPT: purpose-built university AI with instructor control, course grounding, FERPA alignment, and academic integrity safeguards.',
  keywords: 'EdPilot vs ChatGPT, ChatGPT for universities, instructor-controlled AI, educational AI',
}

export default function ChatGPTComparisonPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'EdPilot', url: 'https://edpilot.com' },
          { name: 'Compare', url: 'https://edpilot.com/compare' },
          { name: 'vs. ChatGPT', url: 'https://edpilot.com/compare/chatgpt' },
        ]}
      />
      <ComparisonDetail
        title="EdPilot vs. ChatGPT for Education"
        description="ChatGPT is a powerful general-purpose tool. EdPilot is built for university teaching, where instructor control, course grounding, and integrity safeguards matter."
        competitorName="ChatGPT"
        competitorItems={[
          'Broad knowledge across domains',
          'Natural conversational interface',
          'No instructor control over student behavior',
          'No course-specific knowledge boundary',
          'Academic integrity risk in assessed work',
          'Not designed around university governance',
        ]}
        edpilotItems={[
          'Instructor-defined policies and boundaries',
          'Responses grounded in course materials',
          'Academic integrity safeguards by design',
          'Institutional data and governance model',
          'Course-level visibility for faculty',
          'Purpose-built for higher education',
        ]}
        sections={[
          {
            title: 'The fundamental difference',
            body:
              'ChatGPT is broad: useful for many users and many tasks. EdPilot is deep: optimized for a governed university course where faculty define scope, tone, policy, and acceptable use.',
          },
          {
            title: 'Academic integrity risk',
            body:
              'General AI can produce finished-looking work without faculty visibility. EdPilot is configured to guide learning, cite course sources, and decline requests that bypass understanding.',
          },
          {
            title: 'Data privacy and governance',
            body:
              'Universities need a controlled learning environment, not disconnected individual accounts. EdPilot keeps course data institution-bound and gives faculty visibility into usage patterns.',
          },
        ]}
      />
      <Footer />
    </>
  )
}

