import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  ChevronLeft,
  ClipboardCheck,
  Database,
  FileEdit,
  Lock,
  Plug,
  Shield,
  Sparkles,
  Target,
  Upload,
  Video,
} from 'lucide-react'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import {
  CTABand,
  Container,
  CourseAssistantMockup,
  FeatureCard,
  Hero,
  PageShell,
  ProofPanel,
  Section,
  SectionHeader,
  StatusPill,
  SuiteMap,
  WorkflowSteps,
} from '@/components/marketing'
import { SIGN_UP_URL } from '@/lib/marketing'

const products = [
  {
    id: 'ai-teaching-assistant',
    title: 'AI Teaching Assistant',
    subtitle: 'Course-trained student support',
    icon: Brain,
    status: 'live' as const,
    preview: 'Student chat with citations, hints, practice prompts, and assessment-safe refusals.',
    description:
      'A tutor that knows your course cold. Students get answers sourced from uploaded materials, with citations and hard stops where policy requires them.',
  },
  {
    id: 'content-generation',
    title: 'Content Generation',
    subtitle: 'Curriculum-aligned material creation',
    icon: FileEdit,
    status: 'beta' as const,
    preview: 'Draft quiz, study guide, and rubric blocks generated from the same week of materials.',
    description:
      'Draft syllabi, quizzes, exams, assignments, and rubrics from existing materials. Faculty review everything before it reaches students.',
  },
  {
    id: 'student-insights',
    title: 'Student Performance Insights',
    subtitle: 'Learning-objective-level analytics',
    icon: BarChart3,
    status: 'beta' as const,
    preview: 'Misconception trends show which concepts need another pass before the exam.',
    description:
      'See which objectives are not landing, identify students trending toward failure, and adjust before the exam confirms the problem.',
  },
  {
    id: 'multimedia-generation',
    title: 'Multimedia Generation',
    subtitle: 'Structured visual teaching materials',
    icon: Video,
    status: 'planned' as const,
    preview: 'Lecture notes become slide outlines and visual explainers for faculty review.',
    description:
      'Turn lecture notes into slide decks, visual explainers, and short concept videos that reinforce the course rather than replace it.',
  },
  {
    id: 'ai-grader',
    title: 'AI Grader',
    subtitle: 'Rubric-enforced, instructor-controlled grading',
    icon: ClipboardCheck,
    status: 'planned' as const,
    preview: 'Rubric rows stay visible so instructors can review every score before release.',
    description:
      'Grade submissions against the same rubric every time. Faculty can review, edit, or override any grade before release.',
  },
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
          { label: 'Book Product Demo', href: '/contact' },
          { label: 'Start Professor Pilot', href: SIGN_UP_URL, variant: 'secondary' },
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
        <CourseAssistantMockup className="mt-12" />
      </Hero>

      <Section className="py-14" surface="panel">
        <Container>
          <ProofPanel
            items={[
              {
                icon: Target,
                label: 'Course-aware',
                detail: 'Trained on your syllabus, readings, assignments, policies, and rubrics.',
              },
              {
                icon: Shield,
                label: 'Grounded answers',
                detail: 'If support is not backed by course materials, the system can say so.',
              },
              {
                icon: BookOpen,
                label: 'Faculty-governed',
                detail: 'Designed around learning objectives, rubrics, assessment boundaries, and instructor review.',
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
          <SuiteMap items={products.map(({ title, status, icon }) => ({ title, status, icon }))} />
        </Container>
      </Section>

      <Section className="py-20 md:py-28" surface="panel">
        <Container>
          <SectionHeader
            eyebrow="Product Moments"
            title="What each tool looks like in practice."
            description="A clearer status and preview for each capability helps buyers separate what is live, what is in beta, and what is planned."
          />
          <div className="grid gap-4">
            {products.map((product) => (
              <FeatureCard
                key={product.id}
                icon={product.icon}
                title={product.title}
                className="md:p-6"
              >
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <p className="text-xs font-medium text-accent">{product.subtitle}</p>
                  <StatusPill tone={product.status}>{product.status}</StatusPill>
                </div>
                <div className="mt-5 grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                  <p className="text-sm leading-7 text-text-secondary">{product.description}</p>
                  <div className="rounded-lg border border-border-gray bg-[#0F0F12] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                      Example interface
                    </p>
                    <p className="mt-3 text-sm leading-7 text-text-primary">{product.preview}</p>
                  </div>
                </div>
              </FeatureCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            eyebrow="How It Works"
            title="Pilot quickly. Deploy responsibly."
            description="A professor-led pilot can start with direct upload, while institutional rollout adds the review layers IT, legal, and academic leaders expect."
          />
          <WorkflowSteps
            steps={[
              {
                step: '01',
                title: 'Upload',
                description: 'Syllabus, readings, assignments, rubrics, and policies form the first course model.',
                icon: Upload,
              },
              {
                step: '02',
                title: 'Configure',
                description: 'Faculty set citation rules, assessment behavior, tone, and course boundaries.',
                icon: Shield,
              },
              {
                step: '03',
                title: 'Pilot',
                description: 'Students use grounded support while faculty inspect answers and interaction patterns.',
                icon: Sparkles,
              },
              {
                step: '04',
                title: 'Review',
                description: 'Institutional teams evaluate privacy, access, retention, LMS, and rollout needs.',
                icon: ClipboardCheck,
              },
            ]}
          />
        </Container>
      </Section>

      <Section className="py-20 md:py-28" surface="panel">
        <Container>
          <SectionHeader
            eyebrow="Compliance & Integrations"
            title="Clear status for institutional teams."
            description="The page now separates what is available from what is being piloted or planned, which gives procurement and IT a cleaner starting point."
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
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container>
          <ProofPanel
            items={[
              {
                icon: Database,
                label: 'Data boundaries',
                detail: 'Institution, course, and student records are treated as scoped deployment data.',
              },
              {
                icon: FileEdit,
                label: 'Faculty review',
                detail: 'Generated materials and grading outputs stay reviewable before they reach students.',
              },
              {
                icon: Shield,
                label: 'Academic integrity',
                detail: 'Assessment-sensitive interactions can be guided, limited, or refused based on policy.',
              },
            ]}
          />
        </Container>
      </Section>

      <CTABand
        title="See it running on your course materials."
        description="We will shape the demo around your syllabus, not a generic sample course."
        actions={[
          { label: 'Book Product Demo', href: '/contact' },
          { label: 'Start Professor Pilot', href: SIGN_UP_URL, variant: 'secondary' },
        ]}
      />

      <Footer />
    </PageShell>
  )
}
