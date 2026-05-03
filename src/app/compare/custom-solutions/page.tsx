import { BreadcrumbSchema } from '@/components/StructuredData'
import { ComparisonDetail } from '@/components/marketing'
import Footer from '@/components/Footer'
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
          { name: 'EdPilot', url: 'https://edpilot.com' },
          { name: 'Compare', url: 'https://edpilot.com/compare' },
          { name: 'vs. Custom Solutions', url: 'https://edpilot.com/compare/custom-solutions' },
        ]}
      />
      <ComparisonDetail
        title="EdPilot vs. Custom In-House Solutions"
        description="Building AI infrastructure can sound appealing, but the hidden cost is time, talent, compliance, maintenance, and long-term product ownership."
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
      <Footer />
    </>
  )
}

