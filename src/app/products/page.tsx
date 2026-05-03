import Link from 'next/link'
import {
  ArrowRight,
  Briefcase,
  Building2,
  Cpu,
  GraduationCap,
  MonitorPlay,
  Users,
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
} from '@/components/marketing'
import { SIGN_UP_URL } from '@/lib/marketing'

const comingSoonSuites = [
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
        title="AI product suites for"
        accent="higher education."
        description="One suite is live today. The rest are being shaped around the same principle: institutional AI should be governed, grounded, and useful."
      />

      <Section className="py-20 md:py-28" surface="panel">
        <Container>
          <SectionHeader eyebrow="Available Now" title="Start with Curriculum Intelligence." />
          <Link href="/products/curriculum-intelligence" className="group block">
            <div className="rounded-lg border border-accent/30 bg-[linear-gradient(135deg,rgba(139,92,246,0.14),rgba(15,15,18,1)_45%,rgba(24,24,27,1))] p-6 transition duration-200 hover:border-accent/55 md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-text-primary group-hover:text-accent">
                      Curriculum Intelligence Suite
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-text-secondary">
                      AI tutor, content generation, rubric-based grading, multimedia materials, and
                      performance analytics, all powered by the same course model.
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="shrink-0">
                  Learn More
                  <ArrowRight aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Link>
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            eyebrow="Coming Soon"
            title="A broader institutional platform."
            description="Future suites extend the same design system into collaboration, analytics, and AI governance."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {comingSoonSuites.map((suite) => (
              <FeatureCard
                key={suite.id}
                icon={suite.icon}
                title={suite.title}
                description={suite.description}
                className="opacity-80"
              >
                <span className="mt-5 inline-flex rounded-md border border-border-gray bg-[#0F0F12] px-2.5 py-1 text-[11px] font-medium text-text-tertiary">
                  In development
                </span>
              </FeatureCard>
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        title="Start with the suite that is ready now."
        description="Upload your materials and see how course-grounded AI changes the student support layer."
        actions={[
          { label: 'Get Started Free', href: SIGN_UP_URL },
          { label: 'Contact Sales', href: '/contact', variant: 'secondary' },
        ]}
      />

      <Footer />
    </PageShell>
  )
}

