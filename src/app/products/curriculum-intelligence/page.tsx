import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  ChevronLeft,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileEdit,
  FileStack,
  Gauge,
  Layers3,
  Lock,
  MessageCircle,
  Plug,
  Shield,
  Sparkles,
  Target,
  Users,
  Video,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  CTABand,
  Container,
  FeatureCard,
  Hero,
  IconChip,
  MarketingCard,
  PageShell,
  Section,
  SectionHeader,
  StatusPill,
  TrustBar,
} from '@/components/marketing'
import { SIGN_UP_URL } from '@/lib/marketing'

export const metadata: Metadata = {
  title: 'Curriculum Intelligence: The AI Teaching Assistant',
  description:
    'A teaching assistant that answers student questions using your course materials, your terminology, and your standards. Cites your readings, flags misconceptions, and follows the guardrails faculty set.',
  keywords:
    'AI teaching assistant, curriculum intelligence, course-grounded AI, RAG for higher education, citations, academic integrity AI, Canvas integration',
}

const products = [
  {
    id: 'ai-teaching-assistant',
    title: 'AI Teaching Assistant',
    subtitle: 'Course-trained student support',
    icon: Brain,
    status: 'Live',
    preview: 'Student chat with citations, hints, practice prompts, and assessment-safe refusals.',
    description:
      'A tutor that knows your course cold. Students get answers sourced from uploaded materials, with citations and hard stops where policy requires them.',
  },
  {
    id: 'content-generation',
    title: 'Content Generation',
    subtitle: 'Curriculum-aligned material creation',
    icon: FileEdit,
    status: 'Beta',
    preview:
      'Draft quiz, study guide, and rubric blocks generated from the same week of materials.',
    description:
      'Draft syllabi, quizzes, exams, assignments, and rubrics from existing materials. Faculty review everything before it reaches students.',
  },
  {
    id: 'student-insights',
    title: 'Student Performance Insights',
    subtitle: 'Learning-objective-level analytics',
    icon: BarChart3,
    status: 'Beta',
    preview: 'Misconception trends show which concepts need another pass before the exam.',
    description:
      'See which objectives are not landing, identify students trending toward failure, and adjust before the exam confirms the problem.',
  },
  {
    id: 'multimedia-generation',
    title: 'Multimedia Generation',
    subtitle: 'Structured visual teaching materials',
    icon: Video,
    status: 'Planned',
    preview: 'Lecture notes become slide outlines and visual explainers for faculty review.',
    description:
      'Turn lecture notes into slide decks, visual explainers, and short concept videos that reinforce the course rather than replace it.',
  },
  {
    id: 'ai-grader',
    title: 'AI Grader',
    subtitle: 'Rubric-enforced, instructor-controlled grading',
    icon: ClipboardCheck,
    status: 'Planned',
    preview: 'Rubric rows stay visible so instructors can review every score before release.',
    description:
      'Grade submissions against the same rubric every time. Faculty can review, edit, or override any grade before release.',
  },
]

const courseModelInputs = [
  { label: 'Syllabus', detail: 'Policies, outcomes, schedule', icon: FileStack },
  { label: 'Lectures', detail: 'Slides, notes, transcripts', icon: MessageCircle },
  { label: 'Readings', detail: 'Articles, chapters, cases', icon: BookOpen },
  { label: 'Rubrics', detail: 'Criteria, weights, feedback', icon: ClipboardCheck },
]

const courseModelSignals = [
  { label: 'Objectives mapped', value: '42', icon: Target },
  { label: 'Policies indexed', value: '12', icon: Shield },
  { label: 'Rubrics active', value: '8', icon: Gauge },
]

export default function CurriculumIntelligencePage() {
  return (
    <PageShell>
      <Hero
        eyebrow="Product Suite"
        title="Curriculum Intelligence"
        accent="Suite."
        description="Five tools that run from the same course model. Upload materials once; the tutor, grader, content generator, and analytics all reflect what you actually teach."
        actions={[
          { label: 'Get Started Free', href: SIGN_UP_URL },
          { label: 'Contact Sales', href: '/contact', variant: 'secondary' },
        ]}
        className="pt-20"
      >
        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-accent"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Back to Products
          </Link>
        </div>
      </Hero>

      <Section className="py-14" surface="panel">
        <Container>
          <TrustBar
            items={[
              {
                icon: Target,
                label: 'Course-aware',
                detail: 'Trained on your syllabus, readings, assignments, and rubrics.',
              },
              {
                icon: Shield,
                label: 'Grounded answers',
                detail: 'If it is not in the course materials, the system says so.',
              },
              {
                icon: BookOpen,
                label: 'Built for higher ed',
                detail: 'Designed around learning objectives, rubrics, and faculty governance.',
              },
            ]}
          />
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container size="wide">
          <SectionHeader
            eyebrow="Course Model"
            title="Upload once. Power every workflow."
            description="The course model is the product center: it keeps student support, faculty workflows, and analytics aligned as materials change."
          />
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.25fr_0.9fr] lg:items-center">
            <div className="grid gap-3">
              {courseModelInputs.map((input) => (
                <MarketingCard
                  key={input.label}
                  interactive
                  className="p-4 hover:border-accent/25"
                >
                  <div className="flex items-center gap-3">
                    <IconChip icon={input.icon} className="h-9 w-9" />
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">{input.label}</h3>
                      <p className="mt-1 text-xs leading-5 text-text-secondary">{input.detail}</p>
                    </div>
                  </div>
                </MarketingCard>
              ))}
            </div>

            <div className="surface-gradient-featured relative overflow-hidden rounded-lg border border-accent/20 p-6 shadow-2xl md:p-8">
              <div
                className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent"
                aria-hidden="true"
              />
              <IconChip icon={Database} className="mx-auto h-16 w-16 [&_svg]:h-7 [&_svg]:w-7" />
              <div className="mt-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  One Course Model
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-text-primary md:text-3xl">
                  Syllabus, lectures, readings, rubrics, policies, and outcomes stay synchronized.
                </h3>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {courseModelSignals.map((signal) => (
                  <div key={signal.label} className="border-t border-border-gray pt-4 text-center">
                    <signal.icon className="mx-auto h-4 w-4 text-accent" aria-hidden="true" />
                    <p className="mt-2 text-xl font-semibold text-text-primary">{signal.value}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-text-tertiary">
                      {signal.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              {products.map((product) => {
                const Icon = product.icon

                return (
                  <MarketingCard
                    key={product.id}
                    surface="deep"
                    interactive
                    className="p-4 hover:border-accent/25"
                  >
                    <div className="flex items-start gap-3">
                      <IconChip icon={Icon} className="h-9 w-9" />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold text-text-primary">
                            {product.title}
                          </h3>
                          <StatusPill tone={product.status.toLowerCase() as 'live' | 'beta' | 'planned'}>
                            {product.status}
                          </StatusPill>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-text-secondary">
                          {product.subtitle}
                        </p>
                      </div>
                    </div>
                  </MarketingCard>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-20 md:py-28" surface="panel">
        <Container size="wide">
          <SectionHeader
            eyebrow="Product Moments"
            title="What each tool looks like in practice."
            description="A clearer status and preview for each capability helps buyers separate what is live, what is in beta, and what is planned."
          />
          <div className="grid gap-4 lg:grid-cols-2">
            {products.map((product) => {
              const Icon = product.icon

              return (
                <div
                  key={product.id}
                  className="surface-gradient-panel group overflow-hidden rounded-lg border border-border-gray p-5 transition duration-200 hover:-translate-y-px hover:border-accent/25 hover:shadow-lg md:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <IconChip icon={Icon} className="h-10 w-10 [&_svg]:h-5 [&_svg]:w-5" />
                      <div>
                        <h3 className="text-base font-semibold tracking-[-0.01em] text-text-primary">
                          {product.title}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-accent">{product.subtitle}</p>
                      </div>
                    </div>
                    <StatusPill
                      tone={product.status.toLowerCase() as 'live' | 'beta' | 'planned'}
                    >
                      {product.status}
                    </StatusPill>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-text-secondary">
                    {product.description}
                  </p>
                  <div className="mt-6 border-t border-border-gray pt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                      Example Interface
                    </p>
                    <div className="mt-3 flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border-gray bg-bg-deep text-accent">
                        {product.status === 'Live' ? (
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        ) : product.status === 'Beta' ? (
                          <Sparkles className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <Layers3 className="h-4 w-4" aria-hidden="true" />
                        )}
                      </div>
                      <p className="text-[13px] leading-6 text-text-secondary">{product.preview}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            eyebrow="Compliance & Integrations"
            title="Built for institutions."
            description="Designed for procurement, IT, and legal from the start, not retrofitted from a consumer chatbot."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <FeatureCard icon={Lock} title="Compliance & Security">
              <ul className="mt-4 space-y-2 text-sm leading-6 text-text-secondary">
                <li>FERPA-aligned data handling</li>
                <li>Student data never trains public models</li>
                <li>Course data remains institution-bound</li>
                <li>Encrypted storage and transmission</li>
                <li>Instructors retain ownership of content</li>
              </ul>
            </FeatureCard>
            <FeatureCard icon={Plug} title="Integrations">
              <ul className="mt-4 space-y-2 text-sm leading-6 text-text-secondary">
                <li>Direct file upload, available now</li>
                <li>Canvas developer access path and LMS workflow integrations in progress</li>
                <li>SSO and deeper LMS rollout support planned for institutional pilots</li>
              </ul>
            </FeatureCard>
          </div>
          <p className="mt-6 text-center text-sm text-text-secondary">
            For setup details, visit{' '}
            <Link href="/how-it-works" className="font-semibold text-accent hover:text-accent-soft focus-ring">
              How It Works
            </Link>
            . For rollout cost, see{' '}
            <Link href="/pricing" className="font-semibold text-accent hover:text-accent-soft focus-ring">
              Pricing
            </Link>
            .
          </p>
        </Container>
      </Section>

      <CTABand
        title="See it running on your course materials."
        description="We will build a live demo from your syllabus. No generic demo, just your course and your content."
        actions={[
          { label: 'Contact Sales', href: '/contact' },
          { label: 'Get Started Free', href: SIGN_UP_URL, variant: 'secondary' },
        ]}
      />

    </PageShell>
  )
}
