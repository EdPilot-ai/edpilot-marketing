import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  CheckCircle2,
  Database,
  Eye,
  FileText,
  Lock,
  MessageSquare,
  Shield,
  Sparkles,
  Upload,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  CTABand,
  CheckList,
  Container,
  CourseAssistantMockup,
  FeatureCard,
  Hero,
  PageShell,
  ProofPanel,
  RoleValueGrid,
  Section,
  SectionHeader,
  StatBand,
  ValueStrip,
  WorkflowSteps,
} from '@/components/marketing'
import { SIGN_UP_URL } from '@/lib/marketing'
import { productFacts } from '@/lib/social-proof'

const homeSignals = [
  { label: 'Course-grounded', detail: 'Answers come from uploaded materials.' },
  { label: 'Faculty-controlled', detail: 'Boundaries, tone, and policies stay instructor-led.' },
  { label: 'Institution-ready', detail: 'Built for privacy, rollout, and procurement questions.' },
  { label: 'Cites sources', detail: 'Students can see what course material supports an answer.' },
]

export default function HomePage() {
  return (
    <PageShell>
      <Hero
        title="Adopt campus AI on purpose."
        accent="Not by accident."
        description="Students are already using AI on your courses. EdPilot gives universities a governed path to launch course-grounded support faculty can control and administrators can stand behind."
        actions={[
          { label: 'Book University Demo', href: '/contact' },
          { label: 'Start Professor Pilot', href: SIGN_UP_URL, variant: 'secondary' },
        ]}
      >
        <CourseAssistantMockup className="mt-14" />
      </Hero>

      <Section className="py-16 md:py-20" surface="panel">
        <Container size="wide">
          <SectionHeader
            eyebrow="The exposure you already have"
            title="Your students are already using AI on your courses."
            description={
              <>
                Right now you can&apos;t see it, shape it, or stand behind it. EdPilot turns campus AI
                into something faculty govern and administrators can answer for &mdash; not something
                that happens to you.
              </>
            }
            className="mb-0"
          />
          <StatBand items={productFacts} className="mt-10" />
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            eyebrow="Who It Helps"
            title="One platform, three clear experiences."
            description="The product story changes by role, but the core promise stays the same: governed AI support inside the academic boundary."
          />
          <RoleValueGrid
            items={[
              {
                icon: Building2,
                role: 'Administrators',
                promise: 'A governed path for campus AI adoption.',
                detail: 'Pilot course-grounded AI with privacy posture, rollout controls, and faculty ownership built into the experience.',
              },
              {
                icon: BookOpen,
                role: 'Professors',
                promise: 'Fewer repetitive questions, more useful signals.',
                detail: 'Set the knowledge boundary, review source-backed answers, and see where students are struggling before office hours fill up.',
              },
              {
                icon: Sparkles,
                role: 'Students',
                promise: '24/7 help that speaks the language of the class.',
                detail: 'Get explanations, practice prompts, and citations from the actual syllabus, slides, readings, and rubrics.',
              },
            ]}
          />
        </Container>
      </Section>

      <Section className="py-12" surface="deep">
        <Container>
          <ValueStrip items={homeSignals} />
          <p className="mx-auto mt-7 max-w-2xl text-center text-sm leading-7 text-text-secondary">
            Planning an institutional rollout? Start with the{' '}
            <Link href="/for-universities" className="font-semibold text-accent hover:text-accent-soft focus-ring">
              university view
            </Link>{' '}
            and the{' '}
            <Link href="/pricing" className="font-semibold text-accent hover:text-accent-soft focus-ring">
              pricing path
            </Link>
            .
          </p>
        </Container>
      </Section>

      <Section className="py-16" surface="panel">
        <Container size="narrow" className="text-center">
          <p className="text-xl font-medium leading-9 tracking-[-0.015em] text-text-primary md:text-2xl">
            EdPilot gives students a tutor that knows the course, follows faculty rules, and shows
            its work &mdash; and gives your institution a way to adopt AI on purpose, not by accident.
          </p>
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            eyebrow="Product In Action"
            title="The course model powers every answer."
            description="Upload materials once, set the boundaries, then give students support that reflects the class they are actually taking."
          />
          <WorkflowSteps
            steps={[
              {
                icon: Upload,
                step: '01',
                title: 'Upload course materials',
                description: 'Syllabi, lectures, readings, rubrics, policies, and assignments become the source of truth.',
              },
              {
                icon: Shield,
                step: '02',
                title: 'Configure guardrails',
                description: 'Faculty choose citation rules, assessment boundaries, tone, and what the assistant can answer.',
              },
              {
                icon: MessageSquare,
                step: '03',
                title: 'Students ask safely',
                description: 'The assistant gives grounded explanations, practice prompts, and hints without completing work.',
              },
              {
                icon: BarChart3,
                step: '04',
                title: 'Faculty see patterns',
                description: 'Confusion, misuse attempts, and concept gaps become visible before the next assessment.',
              },
            ]}
          />
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <SectionHeader
              align="left"
              eyebrow="Why EdPilot"
              title="Built for higher education, not generic chat."
              description="Other AI tools are built for everyone. EdPilot is scoped to a course, governed by faculty, and designed for institutional review."
              className="mb-0"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureCard
                featured
                icon={BookOpen}
                title="Course-specific by default"
                description="Every answer is grounded in uploaded course materials, not a generic web-scale guess."
              />
              <FeatureCard
                icon={Eye}
                title="Faculty-controlled"
                description="Instructors define what the AI knows, how it responds, and where it stops."
              />
              <FeatureCard
                icon={Shield}
                title="Integrity-first"
                description="Designed to guide students toward understanding instead of completing assessed work."
              />
              <FeatureCard
                icon={BarChart3}
                title="Insight-rich"
                description="Show where students are confused before confusion becomes an exam result."
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-20 md:py-28" surface="panel">
        <Container>
          <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start">
            <SectionHeader
              align="left"
              eyebrow="Featured Product"
              title="AI Teaching Assistant"
              description="A teaching assistant that answers student questions at 2am using your materials, your terminology, and your standards."
              className="mb-0"
            />
            <div className="rounded-lg border border-border-gray bg-bg-deep p-6 md:p-8">
              <CheckList
                items={[
                  'Cites your readings instead of random internet sources.',
                  'Flags misconceptions before they reach the exam.',
                  'Follows the guardrails and knowledge boundary you set.',
                  'Separates fast pilots from responsible institutional rollout.',
                ]}
              />
              <Button asChild variant="outline" className="mt-7">
                <Link href="/products/curriculum-intelligence">
                  Explore Curriculum Intelligence
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            eyebrow="Institutional Proof"
            title="Prepared for the questions buyers actually ask."
            description="EdPilot makes the academic, privacy, and implementation posture visible before a pilot turns into a procurement surprise."
          />
          <ProofPanel
            items={[
              {
                icon: Lock,
                label: 'FERPA posture',
                detail: 'Built around institution-bound course and student data, with public model training off the table.',
              },
              {
                icon: Database,
                label: 'Data boundaries',
                detail: 'Course materials, student interactions, and deployments are scoped by institution and course.',
              },
              {
                icon: FileText,
                label: 'Procurement-ready notes',
                detail: 'Clear answers for data handling, accessibility, LMS status, retention, and pilot rollout.',
              },
              {
                icon: CheckCircle2,
                label: 'Accessible by design',
                detail: 'Interaction patterns and content flows are designed with accessibility review in mind.',
              },
              {
                icon: Users,
                label: 'Faculty ownership',
                detail: 'Course control stays with the instructor instead of moving into a generic AI layer.',
              },
              {
                icon: Shield,
                label: 'Integrity controls',
                detail: 'Assessment and homework requests can be routed toward hints, practice, or refusal states.',
              },
            ]}
          />
        </Container>
      </Section>

      <CTABand
        title="See EdPilot on your course materials."
        description="Book a demo for a university rollout or start a professor-led pilot with real syllabus content."
        actions={[
          { label: 'Book University Demo', href: '/contact' },
          { label: 'Start Professor Pilot', href: SIGN_UP_URL, variant: 'secondary' },
        ]}
      />

    </PageShell>
  )
}
