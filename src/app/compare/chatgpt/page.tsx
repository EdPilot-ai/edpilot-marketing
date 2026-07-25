import { BreadcrumbSchema } from '@/components/StructuredData'
import { ComparisonDetail } from '@/components/marketing'
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
          { name: 'EdPilot', url: 'https://edpilot.ai' },
          { name: 'Compare', url: 'https://edpilot.ai/compare' },
          { name: 'vs. ChatGPT', url: 'https://edpilot.ai/compare/chatgpt' },
        ]}
      />
      <ComparisonDetail
        title="EdPilot vs. ChatGPT for Education"
        description="ChatGPT is impressive. It is also a stranger to your syllabus. EdPilot is the course-aware option for universities that need answers, boundaries, and receipts."
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
        scenarios={[
          {
            setup: 'A student asks, “What will be on the midterm?”',
            oldWay: 'ChatGPT invents a confident study plan from thin air.',
            edpilot: 'EdPilot points to the actual review sheet, covered topics, and faculty-approved limits.',
            citations: ['Week 7 review sheet', 'Syllabus: assessment policy'],
          },
          {
            setup: 'A student asks for help on a graded assignment.',
            oldWay: 'The line between coaching and completion gets blurry fast.',
            edpilot: 'EdPilot nudges, questions, and explains without handing over the submission.',
            citations: ['Assignment brief, Week 8', 'Rubric: criterion 2'],
          },
          {
            setup: 'A professor asks, “Where did that answer come from?”',
            oldWay: 'Good luck reverse-engineering the magic.',
            edpilot: 'The answer cites course materials by design.',
            citations: ['Week 6 slides, frames 18–21', 'Case note: beta blockers, p. 3'],
          },
        ]}
        sections={[
          {
            title: 'The fundamental difference',
            body:
              'ChatGPT is broad: great for brainstorming, less great as the official learning layer of a course. EdPilot is deep: scoped to course materials, tuned by faculty, and built for the rules universities actually live with.',
          },
          {
            title: 'Academic integrity risk',
            body:
              'General AI can produce finished-looking work without faculty visibility. EdPilot is designed to make the useful path the honest path: guide the student, cite the course, and stop before it becomes outsourcing.',
          },
          {
            title: 'Data privacy and governance',
            body:
              'Universities need a governed learning environment, not a patchwork of personal accounts. EdPilot keeps course data institution-bound and gives faculty visibility into what students are actually struggling with.',
          },
        ]}
      />
    </>
  )
}
