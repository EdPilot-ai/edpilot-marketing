import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  ClipboardCheck,
  Cpu,
  FileEdit,
  GraduationCap,
  MonitorPlay,
  Shield,
  Sparkles,
  Users,
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
  Section,
  SectionHeader,
  StatusPill,
  SuiteMap,
} from '@/components/marketing'
import { SIGN_UP_URL } from '@/lib/marketing'

const suiteMapItems = [
  { title: 'AI Teaching Assistant', status: 'live' as const, icon: Sparkles },
  { title: 'Content Generation', status: 'beta' as const, icon: FileEdit },
  { title: 'Student Insights', status: 'beta' as const, icon: BarChart3 },
  { title: 'Multimedia Generation', status: 'planned' as const, icon: Video },
  { title: 'AI Grader', status: 'planned' as const, icon: ClipboardCheck },
]

const roadmapSuites = [
  {
    id: 'professor-network',
    title: 'Professor Network Hub',
    description: 'Share materials, co-develop courses, and collaborate with faculty across your institution.',
    icon: Users,
  },
  {
    id: 'student-career',
    title: 'Student Career Network',
    description: 'Job matching and career recommendations tied to academic performance.',
    icon: Briefcase,
  },
  {
    id: 'university-admin',
    title: 'University Admin Intelligence',
    description: 'Curriculum compliance tracking, course planning, and department analytics.',
    icon: Building2,
  },
  {
    id: 'ai-lab',
    title: 'AI Lab & Tooling Suite',
    description: 'Custom AI workflows, institutional knowledge bases, and model evaluation.',
    icon: Cpu,
  },
  {
    id: 'classroom-experience',
    title: 'Classroom Experience Suite',
    description: 'Live lecture support, engagement tracking, and post-class summaries.',
    icon: MonitorPlay,
  },
]

export default function ProductsPage() {
  return (
    <PageShell>
      <Hero
        eyebrow="Products"
        title="Start with the course model."
        description="Curriculum Intelligence is the live EdPilot platform: one governed course model powering student support, faculty controls, content workflows, and learning signals."
        actions={[
          { label: 'Explore Curriculum Intelligence', href: '/products/curriculum-intelligence' },
          { label: 'Book Demo', href: '/contact', variant: 'secondary' },
        ]}
      >
        <CourseAssistantMockup className="mt-14" />
      </Hero>

      <Section className="py-20 md:py-28" surface="panel">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <SectionHeader
              align="left"
              eyebrow="Available Now"
              title="Curriculum Intelligence Suite"
              description="Lead with the product that is real today, then expand from the same foundation as pilots mature."
              className="mb-0"
            />
            <Link href="/products/curriculum-intelligence" className="group block">
              <div className="rounded-lg border border-accent/30 bg-[linear-gradient(135deg,rgba(139,92,246,0.14),rgba(15,15,18,1)_45%,rgba(24,24,27,1))] p-6 transition duration-200 hover:border-accent/55 md:p-8">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <StatusPill>live suite</StatusPill>
                </div>
                <h3 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary group-hover:text-accent">
                  Five tools, one course source of truth.
                </h3>
                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  AI tutor, content generation, rubric workflows, multimedia materials, and
                  performance analytics all draw from the same governed course model.
                </p>
                <Button variant="outline" className="mt-7">
                  Learn More
                  <ArrowRight aria-hidden="true" />
                </Button>
              </div>
            </Link>
          </div>
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container size="wide">
          <SectionHeader
            eyebrow="Suite Map"
            title="One model connects every capability."
            description="Status labels keep the product story clear: what teams can use now, what is in pilot, and what is planned next."
          />
          <SuiteMap items={suiteMapItems} />
        </Container>
      </Section>

      <Section className="py-20 md:py-28" surface="panel">
        <Container>
          <SectionHeader
            eyebrow="Roadmap"
            title="A quieter view of what comes next."
            description="Future suites are framed as a roadmap, not equal products, so buyers can understand the platform direction without losing sight of the live suite."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roadmapSuites.map((suite) => (
              <FeatureCard
                key={suite.id}
                icon={suite.icon}
                title={suite.title}
                description={suite.description}
                className="opacity-85"
              >
                <div className="mt-5">
                  <StatusPill tone="planned">planned</StatusPill>
                </div>
              </FeatureCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container>
          <div className="rounded-lg border border-border-gray bg-bg-surface p-6 md:p-8">
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <div>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                  <Shield className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
                  Built to graduate from pilot to institution.
                </h2>
              </div>
              <p className="text-sm leading-7 text-text-secondary">
                The product path starts with direct course-material upload and professor-led pilots,
                then expands into LMS, SSO, accessibility, procurement, and multi-course rollout
                conversations as institutions are ready.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <CTABand
        title="Start with the suite that is ready now."
        description="Upload real materials and see how course-grounded AI changes the student support layer."
        actions={[
          { label: 'Book Demo', href: '/contact' },
          { label: 'Start Professor Pilot', href: SIGN_UP_URL, variant: 'secondary' },
        ]}
      />

      <Footer />
    </PageShell>
  )
}
