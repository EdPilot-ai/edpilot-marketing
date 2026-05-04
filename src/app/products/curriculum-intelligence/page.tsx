import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  ClipboardCheck,
  FileEdit,
  Lock,
  Plug,
  Shield,
  Target,
  Users,
  Video,
} from 'lucide-react'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import {
  Container,
  Section,
  SectionHeader,
  Hero,
  FeatureCard,
  CTASection,
} from '@/components/marketing'

export const metadata: Metadata = {
  title: 'Curriculum Intelligence',
  description:
    'Five tools that all run from the same course model: AI Teaching Assistant, content generation, performance analytics, multimedia generation, and rubric-enforced grading.',
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.edpilot.com'

const PRODUCTS = [
  {
    icon: Brain,
    title: 'AI Teaching Assistant',
    subtitle: 'Course-trained student support',
    description:
      'A tutor that knows your course cold. Students ask questions and get answers sourced from your uploaded materials, with citations — never guesses. Adapts to each student’s performance, generates practice questions tied to your objectives, and hard-stops on anything it shouldn’t touch.',
  },
  {
    icon: FileEdit,
    title: 'Content Generation',
    subtitle: 'Curriculum-aligned material creation',
    description:
      'Drafts syllabi, quizzes, exams, assignments, and rubrics from your existing materials. Outputs are aligned to your learning objectives and Bloom’s Taxonomy levels — not generic templates. You review and edit everything before it reaches a single student.',
  },
  {
    icon: BarChart3,
    title: 'Student Performance Insights',
    subtitle: 'Learning-objective-level analytics',
    description:
      'Grade distributions tell you who failed. This tells you why. See exactly which learning objectives aren’t landing, identify students heading toward failure before the exam, and walk into your next lecture knowing where the class is actually confused.',
  },
  {
    icon: Video,
    title: 'Multimedia Generation',
    subtitle: 'Structured visual teaching materials',
    description:
      'Turn lecture notes into slide decks, visual explainers, and short concept videos. Structured to reinforce your lecture, not replace it. Every output is editable and requires your sign-off before students see it.',
  },
  {
    icon: ClipboardCheck,
    title: 'AI Grader',
    subtitle: 'Rubric-enforced, instructor-controlled grading',
    description:
      'Grades every submission against your rubric — the same rubric, applied the same way, every time. Per-criterion feedback tells students exactly where they lost points and why. You review, edit, or override any grade. Nothing is final until you say so.',
  },
]

const HIGHLIGHTS = [
  {
    icon: Target,
    title: 'Course-aware',
    description:
      'Trained on your syllabus, readings, and rubrics. Every answer is grounded in what you assigned.',
  },
  {
    icon: Shield,
    title: 'No hallucinations',
    description: 'Refuses to answer from memory or the internet. If it’s not in your materials, it says so.',
  },
  {
    icon: BookOpen,
    title: 'Built for higher ed',
    description:
      'Designed around Bloom’s Taxonomy, learning objectives, and rubrics — not repurposed from a consumer chatbot.',
  },
  {
    icon: Users,
    title: 'Cuts repetitive work',
    description:
      'The same question for the 40th time. Grading 120 papers to a rubric. All reduced.',
  },
]

const STEPS = [
  { step: '01', title: 'Upload', description: 'Syllabus, readings, assignments, rubrics.', icon: FileEdit },
  {
    step: '02',
    title: 'Generate & support',
    description: 'Create aligned materials. Provide grounded student help.',
    icon: Brain,
  },
  {
    step: '03',
    title: 'Assess & analyze',
    description: 'Grade consistently. Track mastery at the objective level.',
    icon: ClipboardCheck,
  },
  {
    step: '04',
    title: 'Refine',
    description: 'Use performance data to fix lectures, assignments, and assessments.',
    icon: BarChart3,
  },
]

export default function CurriculumIntelligencePage() {
  return (
    <>
      <Hero
        eyebrow="Product suite"
        titleNode={
          <>
            <span className="text-text-primary">Curriculum </span>
            <span className="text-accent">Intelligence</span>
            <span className="text-text-primary">.</span>
          </>
        }
        description="Five tools that all run from the same course model. Upload your materials once. The AI tutor, the grader, the content generator — every one of them reflects what you actually teach."
        actions={
          <>
            <Link href={`${APP_URL}/register`} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 h-11 shadow-[0_0_28px_rgba(139,92,246,0.4)]"
              >
                Get started free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-11">
                Contact sales
              </Button>
            </Link>
          </>
        }
      />

      <Container size="lg" className="-mt-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-text-secondary hover:text-accent text-[13px] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to products
        </Link>
      </Container>

      {/* Highlights */}
      <Section surface="raised" spacing="md">
        <Container size="lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="text-center">
                <div className="w-9 h-9 bg-accent/[0.12] rounded-lg flex items-center justify-center mx-auto mb-3 ring-1 ring-accent/25">
                  <h.icon className="w-4 h-4 text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-[13px] font-semibold text-text-primary mb-1 tracking-[-0.005em]">
                  {h.title}
                </h3>
                <p className="text-[12px] text-text-secondary leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Five tools */}
      <Section spacing="lg">
        <Container size="lg">
          <SectionHeader
            eyebrow="Five tools"
            title="One course model."
            description="Every tool draws from the same uploaded course model. Update your syllabus and all five tools update with it — no re-configuration."
          />

          <div className="space-y-3">
            {PRODUCTS.map((product) => {
              const Icon = product.icon
              return (
                <div
                  key={product.title}
                  className="flex flex-col md:flex-row items-start gap-5 rounded-2xl border border-border-gray bg-bg-surface p-6 transition-all hover:border-[#3f3f46] hover:bg-[#1d1d21]"
                >
                  <div className="w-10 h-10 bg-accent/[0.12] rounded-lg flex items-center justify-center flex-shrink-0 ring-1 ring-accent/25">
                    <Icon className="w-[18px] h-[18px] text-accent" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                      <h3 className="text-[15px] font-semibold text-text-primary tracking-[-0.005em]">
                        {product.title}
                      </h3>
                      <span className="text-[12px] text-text-secondary">{product.subtitle}</span>
                    </div>
                    <p className="text-text-secondary text-[14px] leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section surface="sunken" spacing="lg">
        <Container size="lg">
          <SectionHeader
            eyebrow="How it works"
            title="Four steps. No custom dev work."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STEPS.map((s) => (
              <FeatureCard
                key={s.step}
                icon={s.icon}
                step={s.step}
                title={s.title}
                description={s.description}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Built for institutions */}
      <Section spacing="lg">
        <Container size="lg">
          <SectionHeader
            eyebrow="Compliance & integrations"
            title="Built for institutions."
            description="Most AI tools in education are consumer tools with an edu discount. This one was built for procurement, IT, and legal from the start."
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border-gray bg-bg-surface p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-accent/[0.12] rounded-lg flex items-center justify-center ring-1 ring-accent/25">
                  <Lock className="w-4 h-4 text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-[14px] font-semibold text-text-primary tracking-[-0.005em]">
                  Compliance & security
                </h3>
              </div>
              <ul className="space-y-2 text-[13px] text-text-secondary">
                {[
                  'FERPA-compliant data handling',
                  'Student data is never used to train public models',
                  'Course data remains institution-bound',
                  'Encrypted storage and transmission',
                  'Instructors retain full ownership of all content',
                ].map((item) => (
                  <li key={item} className="leading-relaxed">— {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border-gray bg-bg-surface p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-accent/[0.12] rounded-lg flex items-center justify-center ring-1 ring-accent/25">
                  <Plug className="w-4 h-4 text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-[14px] font-semibold text-text-primary tracking-[-0.005em]">
                  Integrations
                </h3>
              </div>
              <ul className="space-y-2 text-[13px] text-text-secondary">
                {[
                  { name: 'Direct file upload', status: 'Available now' },
                  { name: 'Canvas', status: 'Coming soon' },
                  { name: 'Blackboard', status: 'Coming soon' },
                  { name: 'Moodle', status: 'Coming soon' },
                  { name: 'Google Drive', status: 'Coming soon' },
                ].map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-2 leading-relaxed">
                    <span>{item.name}</span>
                    <span className="text-[11px] uppercase tracking-widest text-text-secondary/60">
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <CTASection
        title="See it running on your course materials."
        description="We’ll build a live demo from your syllabus. No generic demo — your course, your content."
        primaryHref="/contact"
        primaryLabel="Contact sales"
        secondaryHref={`${APP_URL}/register`}
        secondaryLabel="Get started free"
      />
    </>
  )
}
