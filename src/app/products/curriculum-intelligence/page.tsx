'use client'

import Link from 'next/link'
import {
  ChevronLeft,
  Brain,
  ArrowRight,
  FileEdit,
  BarChart3,
  Video,
  ClipboardCheck,
  Target,
  Shield,
  Users,
  BookOpen,
  Lock,
  Plug,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6] mb-3">
      {children}
    </p>
  )
}

export default function CurriculumIntelligencePage() {
  const products = [
    {
      id: 'ai-teaching-assistant',
      title: 'AI Teaching Assistant',
      subtitle: 'Course-trained student support',
      icon: Brain,
      description:
        "A tutor that knows your course cold. Students ask questions and get answers sourced from your uploaded materials, with citations, never guesses. It adapts to each student's demonstrated performance, generates practice questions tied to your objectives, and hard-stops on anything it shouldn't touch.",
    },
    {
      id: 'content-generation',
      title: 'Content Generation',
      subtitle: 'Curriculum-aligned material creation',
      icon: FileEdit,
      description:
        "Drafts syllabi, quizzes, exams, assignments, and rubrics from your existing materials. Outputs are aligned to your learning objectives and Bloom's Taxonomy levels, not generic templates. You review and edit everything before it reaches a single student.",
    },
    {
      id: 'student-insights',
      title: 'Student Performance Insights',
      subtitle: 'Learning-objective-level analytics',
      icon: BarChart3,
      description:
        "Grade distributions tell you who failed. This tells you why. See exactly which learning objectives aren't landing, identify students heading toward failure before the exam, and walk into your next lecture knowing where the class is actually confused.",
    },
    {
      id: 'multimedia-generation',
      title: 'Multimedia Generation',
      subtitle: 'Structured visual teaching materials',
      icon: Video,
      description:
        'Turn lecture notes into slide decks, visual explainers, and short concept videos. Structured to reinforce your lecture, not replace it. Every output is editable and requires your sign-off before students see it.',
    },
    {
      id: 'ai-grader',
      title: 'AI Grader',
      subtitle: 'Rubric-enforced, instructor-controlled grading',
      icon: ClipboardCheck,
      description:
        'Grades every submission against your rubric: the same rubric, applied the same way, every time. Per-criterion feedback tells students exactly where they lost points and why. You review, edit, or override any grade. Nothing is final until you say so.',
    },
  ]

  const highlights = [
    {
      icon: Target,
      title: 'Course-Aware',
      description:
        'Trained on your syllabus, readings, and rubrics. Every answer is grounded in what you actually assigned.',
    },
    {
      icon: Shield,
      title: 'No Hallucinations',
      description:
        "Refuses to answer from memory or the internet. If it's not in your materials, it says so.",
    },
    {
      icon: BookOpen,
      title: 'Built for Higher Ed',
      description:
        "Designed around Bloom's Taxonomy, learning objectives, and rubrics. Not repurposed from a consumer chatbot.",
    },
    {
      icon: Users,
      title: 'Cuts Repetitive Work',
      description:
        'The same question for the 40th time. Grading 120 papers to a rubric. Rebuilding materials every semester. All reduced.',
    },
  ]

  return (
    <div className="min-h-screen bg-bg-page">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-violet-600/7 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-28 left-[15%] w-[280px] h-[280px] bg-indigo-500/4 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-28 right-[15%] w-[280px] h-[280px] bg-purple-500/4 rounded-full blur-[100px] pointer-events-none" />
        <div className="container relative z-10 mx-auto px-6">
          <div>
            <Link
              href="/products"
              className="inline-flex items-center text-text-secondary hover:text-[#8B5CF6] transition-colors mb-8 text-[13px] group"
            >
              <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-0.5 transition-transform" />
              Back to Products
            </Link>
          </div>

          <div className="text-center max-w-[720px] mx-auto">
            <SectionLabel>Product Suite</SectionLabel>
            <h1 className="text-5xl md:text-[3.5rem] font-bold mb-5 leading-[1.1] tracking-[-0.03em]">
              <span className="text-text-primary">Curriculum </span>
              <span className="text-[#8B5CF6]">Intelligence</span>
              <span className="text-text-primary"> Suite.</span>
            </h1>
            <p className="text-[1.0625rem] text-text-secondary leading-[1.7] max-w-[520px] mx-auto mb-9">
              Five tools that all run from the same course model. Upload your materials once. The AI
              tutor, the grader, the content generator: all of them reflect what you actually teach.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto px-8 h-11">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-11">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights Bar ── */}
      <section className="py-12 border-y border-[#27272A] bg-[#18181B]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((h, i) => (
              <div key={h.title} className="text-center">
                <div className="w-8 h-8 bg-[#7C3AED]/12 rounded-lg flex items-center justify-center mx-auto mb-3 ring-1 ring-[#7C3AED]/25">
                  <h.icon className="w-4 h-4 text-[#8B5CF6]" aria-hidden="true" />
                </div>
                <h3 className="text-[13px] font-semibold text-text-primary mb-1 tracking-[-0.005em]">
                  {h.title}
                </h3>
                <p className="text-[12px] text-text-secondary leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <SectionLabel>Five Tools</SectionLabel>
            <h2 className="text-[1.875rem] font-bold text-text-primary mb-3 tracking-[-0.025em]">
              One course model.
            </h2>
            <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed">
              Every tool draws from the same uploaded course model. Update your syllabus and all
              five tools update with it, no re-configuration.
            </p>
          </div>

          <div className="space-y-3">
            {products.map((product, index) => {
              const Icon = product.icon
              return (
                <div
                  key={product.id}
                  className="flex flex-col md:flex-row items-start gap-5 p-5 rounded-xl border border-[#27272A] bg-[#18181B] hover:border-[#3f3f46] hover:bg-[#1d1d21] transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-[#7C3AED]/12 rounded-lg flex items-center justify-center flex-shrink-0 ring-1 ring-[#7C3AED]/25">
                    <Icon className="w-4 h-4 text-[#8B5CF6]" aria-hidden="true" />
                  </div>
                  <div className="flex-1 pt-px">
                    <div className="flex items-baseline gap-3 mb-1">
                      <h3 className="text-[13px] font-semibold text-text-primary tracking-[-0.005em]">
                        {product.title}
                      </h3>
                      <span className="text-[11px] text-text-secondary hidden md:inline">
                        {product.subtitle}
                      </span>
                    </div>
                    <p className="text-text-secondary text-[13px] leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 md:py-24 border-y border-[#27272A] bg-[#18181B]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-[1.875rem] font-bold text-text-primary mb-3 tracking-[-0.025em]">
              Four steps. No custom dev work.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Upload',
                description: 'Syllabus, readings, assignments, rubrics.',
                icon: FileEdit,
              },
              {
                step: '02',
                title: 'Generate & Support',
                description: 'Create aligned materials. Provide grounded student help.',
                icon: Brain,
              },
              {
                step: '03',
                title: 'Assess & Analyze',
                description: 'Grade consistently. Track mastery at the objective level.',
                icon: ClipboardCheck,
              },
              {
                step: '04',
                title: 'Refine',
                description: 'Use performance data to fix lectures, assignments, and assessments.',
                icon: BarChart3,
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="relative p-5 rounded-xl border border-[#27272A] bg-[#0F0F12] text-center"
              >
                <span className="absolute top-4 right-4 text-[11px] font-mono font-bold text-[#3a3a44] tabular-nums">
                  {item.step}
                </span>
                <div className="w-8 h-8 bg-[#7C3AED]/12 rounded-lg flex items-center justify-center mx-auto mb-3 ring-1 ring-[#7C3AED]/25">
                  <item.icon className="w-4 h-4 text-[#8B5CF6]" aria-hidden="true" />
                </div>
                <h3 className="text-[13px] font-semibold text-text-primary mb-1 tracking-[-0.005em]">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-[12px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built for Institutions ── */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <SectionLabel>Compliance & Integrations</SectionLabel>
            <h2 className="text-[1.875rem] font-bold text-text-primary mb-3 tracking-[-0.025em]">
              Built for Institutions.
            </h2>
            <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed">
              Most AI tools in education are consumer tools with an edu discount. This one was built
              for procurement, IT, and legal from the start.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-5 rounded-xl border border-[#27272A] bg-[#18181B] hover:border-[#3f3f46] hover:bg-[#1d1d21] transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#7C3AED]/12 rounded-lg flex items-center justify-center flex-shrink-0 ring-1 ring-[#7C3AED]/25">
                  <Lock className="w-4 h-4 text-[#8B5CF6]" aria-hidden="true" />
                </div>
                <h3 className="text-[13px] font-semibold text-text-primary tracking-[-0.005em]">
                  Compliance & Security
                </h3>
              </div>
              <ul className="space-y-2 text-[13px] text-text-secondary">
                <li>FERPA-compliant data handling</li>
                <li>Student data is never used to train public models</li>
                <li>Course data remains institution-bound</li>
                <li>Encrypted storage and transmission</li>
                <li>Instructors retain full ownership of all content</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-[#27272A] bg-[#18181B] hover:border-[#3f3f46] hover:bg-[#1d1d21] transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#7C3AED]/12 rounded-lg flex items-center justify-center flex-shrink-0 ring-1 ring-[#7C3AED]/25">
                  <Plug className="w-4 h-4 text-[#8B5CF6]" aria-hidden="true" />
                </div>
                <h3 className="text-[13px] font-semibold text-text-primary tracking-[-0.005em]">
                  Integrations
                </h3>
              </div>
              <ul className="space-y-2 text-[13px] text-text-secondary">
                <li>
                  Canvas{' '}
                  <span className="text-[11px] text-text-secondary/50 ml-1">Coming Soon</span>
                </li>
                <li>
                  Blackboard{' '}
                  <span className="text-[11px] text-text-secondary/50 ml-1">Coming Soon</span>
                </li>
                <li>
                  Moodle{' '}
                  <span className="text-[11px] text-text-secondary/50 ml-1">Coming Soon</span>
                </li>
                <li>
                  Google Drive{' '}
                  <span className="text-[11px] text-text-secondary/50 ml-1">Coming Soon</span>
                </li>
                <li>Direct file upload, available now</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F12] via-[#130d1f] to-[#0F0F12] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-violet-700/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container relative z-10 mx-auto px-6 max-w-2xl">
          <div className="border border-[#27272A] bg-[#18181B]/80 rounded-2xl px-8 py-14 md:px-14 text-center">
            <h2 className="text-[1.875rem] font-bold text-text-primary mb-3 tracking-[-0.025em]">
              See it running on your course materials.
            </h2>
            <p className="text-text-secondary text-sm mb-8 max-w-sm mx-auto leading-relaxed">
              We&apos;ll build a live demo from your syllabus. No generic demo. Your course, your
              content.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-8 h-11 shadow-[0_0_28px_rgba(139,92,246,0.4)]"
                >
                  Contact Sales
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-11">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
