import Link from 'next/link'
import {
  ArrowRight,
  GraduationCap,
  Users,
  Briefcase,
  Building2,
  Cpu,
  MonitorPlay,
} from 'lucide-react'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import {
  Container,
  Section,
  SectionHeader,
  Hero,
  Eyebrow,
  CTASection,
} from '@/components/marketing'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'EdPilot product suites — Curriculum Intelligence is live; the rest of the platform is in development.',
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.edpilot.com'

const COMING_SOON = [
  {
    title: 'Professor Network Hub',
    description:
      'Share materials, co-develop courses, and collaborate with faculty across your institution.',
    icon: Users,
  },
  {
    title: 'Student Career Network',
    description:
      'Job matching, skill-gap analysis, and career recommendations tied to academic performance.',
    icon: Briefcase,
  },
  {
    title: 'University Admin Intelligence',
    description:
      'Curriculum compliance tracking, course planning, and department-level analytics.',
    icon: Building2,
  },
  {
    title: 'AI Lab & Tooling Suite',
    description:
      'Custom AI workflows, institutional knowledge bases, safety guardrails, and model evaluation.',
    icon: Cpu,
  },
  {
    title: 'Classroom Experience Suite',
    description:
      'Live lecture support, engagement tracking, and automatic post-class summaries.',
    icon: MonitorPlay,
  },
]

export default function ProductsPage() {
  return (
    <>
      <Hero
        eyebrow="Platform"
        title="Product suites."
        description="One suite is live today. The rest of the platform is in development — building outward from the classroom."
      />

      <Section spacing="lg">
        <Container size="lg">
          {/* Featured suite */}
          <div className="mb-14">
            <Eyebrow className="mb-5">Available now</Eyebrow>
            <Link
              href="/products/curriculum-intelligence"
              className="group relative block overflow-hidden rounded-2xl border border-accent/25 bg-gradient-to-br from-[#1a0f2e] to-[#0F0F12] p-8 md:p-10 transition-all hover:border-accent/50"
            >
              <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 bg-accent/[0.08] rounded-full blur-[80px]" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-5 max-w-2xl">
                  <div className="w-12 h-12 bg-accent/[0.15] rounded-xl flex items-center justify-center flex-shrink-0 ring-1 ring-accent/30">
                    <GraduationCap className="w-5 h-5 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-text-primary group-hover:text-accent transition-colors mb-2 tracking-[-0.01em]">
                      Curriculum Intelligence
                    </h3>
                    <p className="text-text-secondary text-[14px] leading-relaxed">
                      An AI tutor trained on your course, alongside content generation,
                      rubric-based grading, and student performance analytics — all from the same
                      uploaded materials.
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="default" className="self-start md:self-center">
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Link>
          </div>

          {/* Coming soon */}
          <div>
            <Eyebrow className="mb-5">Coming soon</Eyebrow>
            <div className="grid gap-3 md:grid-cols-2">
              {COMING_SOON.map((suite) => {
                const Icon = suite.icon
                return (
                  <div
                    key={suite.title}
                    className="rounded-2xl border border-border-gray bg-bg-surface p-6 opacity-70"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-bg-elevated rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-text-secondary" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[14px] font-semibold text-text-primary mb-1.5 tracking-[-0.005em]">
                          {suite.title}
                        </h3>
                        <p className="text-text-secondary text-[13px] leading-relaxed">
                          {suite.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>

      <CTASection
        title="Start with Curriculum Intelligence."
        description="Free to try. Upload your materials and see what it builds."
        primaryHref={`${APP_URL}/register`}
        primaryLabel="Get started free"
        secondaryHref="/contact"
        secondaryLabel="Contact sales"
      />
    </>
  )
}
