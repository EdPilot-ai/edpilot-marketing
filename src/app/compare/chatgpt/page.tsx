import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/StructuredData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EdPilot vs. ChatGPT for Education - Comparison',
  description:
    'EdPilot vs ChatGPT: Purpose-built university AI with instructor control, course grounding, FERPA compliance, and academic integrity safeguards versus a general-purpose conversational AI.',
  keywords: 'EdPilot vs ChatGPT, ChatGPT for universities, instructor-controlled AI, educational AI',
}

export default function ChatGPTComparisonPage() {
  const breadcrumbItems = [
    { name: 'EdPilot', url: 'https://edpilot.com' },
    { name: 'Compare', url: 'https://edpilot.com/compare' },
    { name: 'vs. ChatGPT', url: 'https://edpilot.com/compare/chatgpt' },
  ]

  const comparisonData = [
    {
      criterion: 'Instructor Control',
      edpilot: 'Full control over all policies, scope, and student access. Professors define rules.',
      chatgpt: 'No instructor control. Vendor (OpenAI) sets all policies. Same for every user.',
    },
    {
      criterion: 'Course Grounding',
      edpilot: 'Responses limited to course materials only. Prevents hallucination.',
      chatgpt:
        'No course grounding. Responds about anything in training data. High hallucination risk.',
    },
    {
      criterion: 'Designed for Education',
      edpilot: 'Purpose-built specifically for university teaching and learning.',
      chatgpt: 'General tool designed for any user and any purpose.',
    },
    {
      criterion: 'Academic Integrity',
      edpilot: 'Built-in plagiarism detection, citation enforcement, homework safeguards.',
      chatgpt: 'No academic integrity protections. Can easily produce undetectable plagiarism.',
    },
    {
      criterion: 'FERPA Compliance',
      edpilot: 'Full FERPA compliance. Student data never trains models. Full audit trails.',
      chatgpt: 'Not designed for FERPA. Student conversations may be used to improve models.',
    },
    {
      criterion: 'LMS Integration',
      edpilot: 'Native integration with Canvas, Blackboard, D2L, Moodle.',
      chatgpt: 'Not designed for LMS integration. Requires external workarounds.',
    },
    {
      criterion: 'Institutional Governance',
      edpilot: 'Data and control remain with the university at all times.',
      chatgpt: 'Data sent to OpenAI servers. University has no governance control.',
    },
    {
      criterion: 'Cost Model',
      edpilot: 'Institutional licensing with volume pricing.',
      chatgpt: 'Per-user subscription or API consumption costs.',
    },
    {
      criterion: 'Multi-Institutional Deployment',
      edpilot: 'Designed for university-wide rollout with department customization.',
      chatgpt: 'Individual accounts. No institutional customization or management.',
    },
    {
      criterion: 'Academic Authenticity',
      edpilot:
        'Encourages deep learning by scoping AI to course materials and enforcing citation.',
      chatgpt:
        'Risk of undermining learning goals by providing off-the-shelf answers to all questions.',
    },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <main id="main-content" className="min-h-screen bg-bg-page">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <Link href="/compare" className="text-accent font-medium hover:underline mb-4 inline-block">
              ← Back to Comparisons
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
              EdPilot vs. ChatGPT for Education
            </h1>
            <p className="text-lg text-text-secondary">
              ChatGPT is a general-purpose tool designed for any user and any task. EdPilot is
              purpose-built for university teaching with instructor control, course grounding, and
              academic integrity safeguards.
            </p>
          </div>

          {/* Quick Summary */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-surface-secondary rounded-lg border border-surface-tertiary">
              <h3 className="font-bold text-text-primary mb-4">ChatGPT</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>✓ Broad knowledge across domains</li>
                <li>✓ Conversational and natural</li>
                <li>✗ No instructor control</li>
                <li>✗ No course grounding</li>
                <li>✗ Plagiarism risk</li>
                <li>✗ No FERPA compliance</li>
                <li>✗ Not designed for universities</li>
              </ul>
            </div>
            <div className="p-6 bg-accent bg-opacity-10 border border-accent rounded-lg">
              <h3 className="font-bold text-accent mb-4">EdPilot</h3>
              <ul className="space-y-2 text-sm text-accent">
                <li>✓ Instructor control</li>
                <li>✓ Course-grounded responses</li>
                <li>✓ Academic integrity built in</li>
                <li>✓ FERPA compliant</li>
                <li>✓ LMS integrated</li>
                <li>✓ Purpose-built for universities</li>
                <li>✓ Institutional governance</li>
              </ul>
            </div>
          </div>

          {/* Detailed Comparison Table */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Detailed Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-tertiary">
                    <th className="text-left py-4 px-4 font-semibold text-text-primary">
                      Criterion
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-text-primary">EdPilot</th>
                    <th className="text-left py-4 px-4 font-semibold text-text-primary">ChatGPT</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="border-b border-surface-tertiary hover:bg-surface-secondary">
                      <td className="py-4 px-4 font-medium text-text-primary">{row.criterion}</td>
                      <td className="py-4 px-4 text-text-secondary">{row.edpilot}</td>
                      <td className="py-4 px-4 text-text-secondary">{row.chatgpt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Key Differences */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6">The Fundamental Difference</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-accent pl-6">
                <h3 className="font-semibold text-text-primary mb-2">ChatGPT is Broad</h3>
                <p className="text-text-secondary">
                  Designed to be useful for writers, developers, marketers, students, researchers,
                  and anyone else. This breadth makes it powerful for general tasks but risky for
                  universities where you need specific safeguards.
                </p>
              </div>
              <div className="border-l-4 border-accent pl-6">
                <h3 className="font-semibold text-text-primary mb-2">EdPilot is Deep</h3>
                <p className="text-text-secondary">
                  Designed to be maximally effective at exactly one thing: supporting university
                  teaching while maintaining institutional control and academic integrity. We
                  sacrifice breadth for depth in education-specific features.
                </p>
              </div>
            </div>
          </section>

          {/* Academic Integrity Section */}
          <section className="mb-16 p-8 bg-surface-secondary rounded-lg border border-surface-tertiary">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Academic Integrity Risk</h2>
            <p className="text-text-secondary mb-4">
              When students use ChatGPT, they can:
            </p>
            <ul className="space-y-2 text-text-secondary mb-6 list-disc list-inside">
              <li>Ask it to write essays or solve homework problems without oversight</li>
              <li>Generate plagiarism-free output that passes plagiarism checkers</li>
              <li>Cite the AI as a source in ways that mask the extent of AI use</li>
              <li>Get answers outside the scope of the course</li>
            </ul>
            <p className="text-text-secondary">
              EdPilot prevents all of this through instructor-defined policies, course grounding,
              and built-in academic integrity safeguards.
            </p>
          </section>

          {/* FERPA Section */}
          <section className="mb-16 p-8 bg-surface-secondary rounded-lg border border-surface-tertiary">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Data Privacy & FERPA</h2>
            <p className="text-text-secondary mb-4">
              When students use ChatGPT, their conversation data is sent to OpenAI servers. This
              creates two risks:
            </p>
            <ul className="space-y-2 text-text-secondary mb-6 list-disc list-inside">
              <li>Student conversations may be used to improve ChatGPT models</li>
              <li>OpenAI may retain data longer than universities retain it</li>
              <li>Personal information in conversations is outside university control</li>
            </ul>
            <p className="text-text-secondary">
              EdPilot&apos;s data architecture ensures student data never leaves your institution and
              never trains external models. All interactions are auditable and remain under
              university control.
            </p>
          </section>

          {/* Use Cases */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6">When Each Makes Sense</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-text-primary mb-3">ChatGPT Makes Sense For:</h3>
                <ul className="space-y-2 text-text-secondary text-sm list-disc list-inside">
                  <li>Individual exploratory learning outside formal courses</li>
                  <li>General research across diverse topics</li>
                  <li>Writing assistance for non-academic purposes</li>
                  <li>Quick information lookups</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-3">EdPilot Makes Sense For:</h3>
                <ul className="space-y-2 text-text-secondary text-sm list-disc list-inside">
                  <li>In-class AI assistance with instructor oversight</li>
                  <li>Homework help that maintains academic integrity</li>
                  <li>Course-specific tutoring</li>
                  <li>Large-enrollment courses needing scaled support</li>
                  <li>Institutions implementing AI literacy programs</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="p-8 bg-accent bg-opacity-10 border border-accent rounded-lg">
            <h3 className="text-xl font-bold text-accent mb-3">See EdPilot in Action</h3>
            <p className="text-text-secondary mb-6">
              Understand how EdPilot brings instructor control, academic integrity, and course
              grounding to university AI.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-opacity-90 transition-all"
            >
              Request a Demo
            </Link>
          </section>
        </div>
      </main>
    </>
  )
}
