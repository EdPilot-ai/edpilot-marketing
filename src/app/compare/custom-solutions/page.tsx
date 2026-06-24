import { BreadcrumbSchema } from '@/components/StructuredData'
import { ComparisonDetail } from '@/components/marketing'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EdPilot vs. Custom In-House Solutions - Comparison',
  description:
    'EdPilot vs building your own AI infrastructure. Compare costs, time-to-market, expertise, and ongoing maintenance for university AI.',
  keywords: 'EdPilot vs custom AI, build vs buy, AI infrastructure costs, institutional AI',
}

export default function CustomSolutionsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'EdPilot', url: 'https://edpilot.ai' },
          { name: 'Compare', url: 'https://edpilot.ai/compare' },
          { name: 'vs. Custom Solutions', url: 'https://edpilot.ai/compare/custom-solutions' },
        ]}
      />
      <ComparisonDetail
        title="EdPilot vs. Custom In-House Solutions"
        description="Building your own AI stack sounds powerful until the prototype becomes a product, a support queue, a compliance project, and someone’s weekend."
        competitorName="Build Custom"
        competitorItems={[
          'Complete control over design',
          '6 to 18 months before launch',
          '$500k to $2M+ development cost',
          'Requires specialized AI, security, and platform teams',
          'Compliance and accessibility burden stays with you',
          'Ongoing maintenance never ends',
        ]}
        edpilotItems={[
          'Deployable in weeks, not months',
          'No internal ML team required',
          'Institutional licensing model',
          'Compliance, support, and improvements included',
          'Course-grounded architecture already built',
          'Faculty governance workflows included',
        ]}
        scenarios={[
          {
            setup: 'Your prototype works in the demo.',
            oldWay: 'Now it needs permissions, citations, logging, audits, support, onboarding, and a roadmap.',
            edpilot: 'Those unglamorous-but-critical pieces are already part of the product.',
          },
          {
            setup: 'The lead AI engineer leaves.',
            oldWay: 'The institutional strategy goes with their laptop stickers.',
            edpilot: 'The platform, support, and product improvements keep moving.',
          },
          {
            setup: 'Legal asks about student data.',
            oldWay: 'The team opens twelve tabs and starts a spreadsheet.',
            edpilot: 'You start from an education-specific governance model.',
          },
        ]}
        sections={[
          {
            title: 'Total cost of ownership',
            body:
              'Custom AI requires engineering, model operations, security review, infrastructure, UX, faculty workflows, and ongoing support. EdPilot lets institutions deploy AI-assisted teaching without becoming an AI infrastructure company.',
          },
          {
            title: 'Hidden implementation risk',
            body:
              'Most internal AI builds start as prototypes and become products only after months of hard platform work. The risky parts are not the demo; they are governance, scale, permissions, audits, and support.',
          },
          {
            title: 'The real decision',
            body:
              'This is less build versus buy than infrastructure versus educational outcome. If the goal is better teaching support, EdPilot gets you there faster.',
          },
        ]}
      />
    </>
  )
}
