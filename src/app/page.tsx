import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  Database,
  Eye,
  FileText,
  Lock,
  Quote,
  Shield,
  Sparkles,
  Upload,
} from 'lucide-react'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import {
  CTABand,
  CheckList,
  Container,
  FeatureCard,
  Hero,
  IconChip,
  PageShell,
  Section,
  SectionHeader,
  TrustBar,
} from '@/components/marketing'
import { SIGN_UP_URL } from '@/lib/marketing'

function ProductPreview() {
  return (
    <div className="mx-auto mt-14 max-w-4xl">
      <div className="overflow-hidden rounded-lg border border-border-gray bg-[#0F0F12] shadow-[0_34px_100px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between border-b border-border-gray bg-bg-surface px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="hidden text-[11px] font-medium text-text-tertiary sm:block">
            EdPilot: Intro to Statistics
          </span>
        </div>
        <div className="grid gap-0 md:grid-cols-[1fr_320px]">
          <div className="p-5 md:p-7">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Course-trained AI Teaching Assistant
            </div>
            <div className="space-y-4">
              <div className="ml-auto max-w-sm rounded-lg border border-accent/20 bg-accent/15 px-4 py-3 text-sm text-text-primary">
                Can you explain the central limit theorem using our Week 4 example?
              </div>
              <div className="flex max-w-xl gap-3">
                <IconChip icon={Sparkles} className="mt-1 h-8 w-8" />
                <div className="rounded-lg border border-border-gray bg-bg-surface px-4 py-4 text-sm leading-7 text-text-secondary">
                  The CLT says that as sample size grows, the sampling distribution of the mean
                  approaches normal. In Professor Chen&apos;s coin-flip simulation, each larger sample
                  makes the average more stable around the expected value.
                  <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-accent/20 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
                    <FileText className="h-3 w-3" aria-hidden="true" />
                    Week 4 lecture notes, slide 14
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border-gray bg-bg-surface p-5 md:border-l md:border-t-0">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Instructor View
            </p>
            <div className="space-y-3">
              {[
                ['Course boundary', 'Syllabus, lectures, readings'],
                ['Integrity mode', 'Guide, do not complete'],
                ['Citation policy', 'Required on every answer'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border-gray bg-[#0F0F12] p-3">
                  <p className="text-[11px] text-text-tertiary">{label}</p>
                  <p className="mt-1 text-xs font-medium text-text-primary">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <PageShell>
      <Hero
        title="The AI that actually knows"
        accent="what you teach."
        description="Built from your syllabus. Controlled by your faculty. Every answer comes from your course, not the open internet."
        actions={[
          { label: 'Get Started Free', href: SIGN_UP_URL },
          { label: 'Talk to Sales', href: '/contact', variant: 'secondary' },
        ]}
      >
        <ProductPreview />
      </Hero>

      <Section className="py-10" surface="deep">
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary">
            Built for research universities, state systems, community colleges, and teaching teams
          </p>
        </Container>
      </Section>

      <Section className="py-16" surface="panel">
        <Container size="narrow" className="text-center">
          <p className="text-xl font-medium leading-9 tracking-[-0.015em] text-text-primary md:text-2xl">
            Students are already using AI to study. The one they are using right now has never read
            your syllabus.
          </p>
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            eyebrow="Why EdPilot"
            title="Built for one purpose. Yours."
            description="Other AI tools are built for everyone. EdPilot is scoped to a course, governed by faculty, and ready for institutional review."
          />
          <div className="grid gap-4 md:grid-cols-4">
            <FeatureCard
              featured
              icon={BookOpen}
              title="Course-specific by default"
              description="Every answer is grounded in uploaded course materials: not other courses, not the internet, not model guesswork."
              className="md:col-span-2"
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
              icon={Building2}
              title="Institution-ready"
              description="Built for legal, IT, procurement, and multi-department rollout."
            />
            <FeatureCard
              icon={BarChart3}
              title="Insight-rich"
              description="Show where students are confused before that confusion becomes an exam result."
              className="md:col-span-2"
            />
          </div>
        </Container>
      </Section>

      <Section className="py-16" surface="deep">
        <Container size="narrow" className="text-center">
          <Quote className="mx-auto mb-5 h-7 w-7 text-accent/55" aria-hidden="true" />
          <p className="text-xl font-medium leading-9 text-text-primary">
            &ldquo;I uploaded my syllabus on a Monday. By Wednesday my students were getting answers
            that cited my lecture slides.&rdquo;
          </p>
          <p className="mt-5 text-sm text-text-secondary">Dr. Sarah Chen, Statistics</p>
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-center">
            <SectionHeader
              align="left"
              eyebrow="Featured Product"
              title="AI Teaching Assistant"
              description="A TA that answers student questions at 2am using your materials, your terminology, and your standards."
              className="mb-0"
            />
            <div className="rounded-lg border border-border-gray bg-bg-surface p-6 md:p-8">
              <CheckList
                items={[
                  'Cites your readings instead of random internet sources.',
                  'Catches misconceptions before they reach the exam.',
                  'Adjusts difficulty based on student performance.',
                  'Follows the guardrails and knowledge boundary you set.',
                ]}
              />
              <Button asChild variant="outline" className="mt-7">
                <Link href="/products/curriculum-intelligence">
                  Learn More
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-20 md:py-28" surface="panel">
        <Container>
          <SectionHeader
            eyebrow="How It Works"
            title="From syllabus to working AI in three steps."
            description="No IT project required for the first pilot."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Upload,
                step: '01',
                title: 'Upload materials',
                description: 'Syllabi, slides, readings, rubrics, and assessments become the course model.',
              },
              {
                icon: Sparkles,
                step: '02',
                title: 'Students get grounded help',
                description: 'Responses cite the course, follow policy, and refuse unsupported questions.',
              },
              {
                icon: BarChart3,
                step: '03',
                title: 'Faculty see the gaps',
                description: 'Concept-level patterns show what needs attention before the next assessment.',
              },
            ].map((item) => (
              <FeatureCard key={item.step} icon={item.icon} title={item.title}>
                <span className="absolute right-5 top-5 text-xs font-bold text-accent/45">
                  {item.step}
                </span>
                <p className="mt-2 text-[13px] leading-6 text-text-secondary">{item.description}</p>
              </FeatureCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-16">
        <Container>
          <TrustBar
            items={[
              {
                icon: Lock,
                label: 'FERPA aligned',
                detail: 'Student data never trains public models. Course data stays institution-bound.',
              },
              {
                icon: Shield,
                label: 'WCAG & ADA',
                detail: 'Accessibility is treated as infrastructure, not a final pass.',
              },
              {
                icon: Database,
                label: 'Data isolation',
                detail: 'Each deployment is siloed across institution and course boundaries.',
              },
            ]}
          />
        </Container>
      </Section>

      <CTABand
        title="Stop hoping students use AI responsibly."
        description="Give them one that actually knows your course."
        actions={[
          { label: 'Get Started Free', href: SIGN_UP_URL },
          { label: 'Contact Sales', href: '/contact', variant: 'secondary' },
        ]}
      />

      <Footer />
    </PageShell>
  )
}

