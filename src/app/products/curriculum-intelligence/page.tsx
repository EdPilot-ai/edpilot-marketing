import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  ChevronLeft,
  ClipboardCheck,
  FileEdit,
  Lock,
  Plug,
  Shield,
  Target,
  Users,
  Video,
} from 'lucide-react'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import {
  CTABand,
  Container,
  FeatureCard,
  Hero,
  PageShell,
  Section,
  SectionHeader,
  TrustBar,
} from '@/components/marketing'
import { SIGN_UP_URL } from '@/lib/marketing'

const products = [
  {
    id: 'ai-teaching-assistant',
    title: 'AI Teaching Assistant',
    subtitle: 'Course-trained student support',
    icon: Brain,
    description:
      'A tutor that knows your course cold. Students get answers sourced from uploaded materials, with citations and hard stops where policy requires them.',
  },
  {
    id: 'content-generation',
    title: 'Content Generation',
    subtitle: 'Curriculum-aligned material creation',
    icon: FileEdit,
    description:
      'Draft syllabi, quizzes, exams, assignments, and rubrics from existing materials. Faculty review everything before it reaches students.',
  },
  {
    id: 'student-insights',
    title: 'Student Performance Insights',
    subtitle: 'Learning-objective-level analytics',
    icon: BarChart3,
    description:
      'See which objectives are not landing, identify students trending toward failure, and adjust before the exam confirms the problem.',
  },
  {
    id: 'multimedia-generation',
    title: 'Multimedia Generation',
    subtitle: 'Structured visual teaching materials',
    icon: Video,
    description:
      'Turn lecture notes into slide decks, visual explainers, and short concept videos that reinforce the course rather than replace it.',
  },
  {
    id: 'ai-grader',
    title: 'AI Grader',
    subtitle: 'Rubric-enforced, instructor-controlled grading',
    icon: ClipboardCheck,
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
        <Container>
          <SectionHeader
            eyebrow="Five Tools"
            title="One course model."
            description="Each capability draws from the same source of truth, so the experience stays coherent as materials evolve."
          />
          <div className="grid gap-4">
            {products.map((product) => (
              <FeatureCard
                key={product.id}
                icon={product.icon}
                title={product.title}
                className="md:p-6"
              >
                <p className="mt-1 text-xs font-medium text-accent">{product.subtitle}</p>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{product.description}</p>
              </FeatureCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-20 md:py-28" surface="panel">
        <Container>
          <SectionHeader eyebrow="How It Works" title="Four steps. No custom dev work." />
          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Upload',
                description: 'Syllabus, readings, assignments, and rubrics.',
                icon: FileEdit,
              },
              {
                step: '02',
                title: 'Generate & Support',
                description: 'Create aligned materials and grounded student help.',
                icon: Brain,
              },
              {
                step: '03',
                title: 'Assess & Analyze',
                description: 'Grade consistently and track mastery.',
                icon: ClipboardCheck,
              },
              {
                step: '04',
                title: 'Refine',
                description: 'Use performance data to improve the next lecture.',
                icon: BarChart3,
              },
            ].map((item) => (
              <FeatureCard key={item.step} icon={item.icon} title={item.title}>
                <div className="mt-4 flex gap-3 border-t border-border-gray pt-4">
                  <span className="shrink-0 text-xs font-bold text-accent/55">{item.step}</span>
                  <p className="text-[13px] leading-6 text-text-secondary">{item.description}</p>
                </div>
              </FeatureCard>
            ))}
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

      <Footer />
    </PageShell>
  )
}
