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
    <div className="mx-auto mt-14 max-w-5xl">
      <div className="overflow-hidden rounded-lg border border-border-gray bg-[#0F0F12] shadow-[0_34px_100px_rgba(0,0,0,0.45)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-gray bg-bg-surface px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-text-tertiary">
            <span className="rounded-md border border-border-gray bg-[#0F0F12] px-2 py-1">
              STAT 201
            </span>
            <span>Intro to Statistics</span>
          </div>
        </div>
        <div className="grid md:grid-cols-[230px_1fr_270px]">
          <aside className="border-b border-border-gray bg-bg-surface/70 p-4 md:border-b-0 md:border-r">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              My Classes
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border border-accent/25 bg-accent/10 p-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-accent" aria-hidden="true" />
                  <p className="text-sm font-semibold text-text-primary">STAT 201</p>
                </div>
                <p className="mt-1 text-xs text-text-secondary">Intro to Statistics</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="rounded-md bg-green-500/10 px-2 py-1 text-[11px] font-medium text-green-300">
                    Active
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-border-gray bg-[#0F0F12] px-2 py-1 text-[11px] text-text-secondary">
                    <MessageSquare className="h-3 w-3" aria-hidden="true" />
                    14
                  </span>
                </div>
              </div>
              <div className="rounded-lg border border-border-gray bg-[#0F0F12] p-3 opacity-80">
                <p className="text-sm font-semibold text-text-primary">BIO 110</p>
                <p className="mt-1 text-xs text-text-secondary">Cell Biology</p>
              </div>
            </div>
          </aside>

          <main className="p-4 md:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  AI Teaching Assistant
                </p>
                <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-text-primary">
                  Ask with the course in the room.
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-green-500/20 bg-green-500/10 px-2.5 py-1 text-[11px] font-medium text-green-300">
                <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                Cites sources
              </span>
            </div>

            <div className="space-y-4">
              <div className="ml-auto max-w-md rounded-lg border border-accent/25 bg-accent/15 px-4 py-3 text-sm leading-6 text-text-primary">
                I keep mixing up standard error and standard deviation. Can you explain it using
                our Week 4 materials?
              </div>
              <div className="flex gap-3">
                <IconChip icon={Sparkles} className="mt-1 h-8 w-8" />
                <div className="rounded-lg border border-border-gray bg-bg-surface px-4 py-4 text-sm leading-7 text-text-secondary">
                  Standard deviation describes how spread out individual data points are. Standard
                  error describes how much a sample mean would vary if we repeated the sampling
                  process. In Professor Chen&apos;s coin-flip simulation, larger samples made the mean
                  more stable, which is why the standard error shrinks.
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Week 4 Lecture Notes, slide 14', 'Sampling Lab Handout, p. 2'].map(
                      (source) => (
                        <span
                          key={source}
                          className="inline-flex items-center gap-1.5 rounded-md border border-accent/20 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent"
                        >
                          <FileText className="h-3 w-3" aria-hidden="true" />
                          {source}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pl-11">
                {['Give me a practice question', 'Show the formula', 'Explain it simpler'].map(
                  (chip) => (
                    <button
                      key={chip}
                      type="button"
                      className="rounded-md border border-border-gray bg-[#0F0F12] px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary"
                    >
                      {chip}
                    </button>
                  )
                )}
              </div>
            </div>
          </main>

          <aside className="border-t border-border-gray bg-bg-surface p-4 md:border-l md:border-t-0">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Professor Guardrails
            </p>
            <div className="space-y-3">
              {[
                ['Course boundary', 'Syllabus, lectures, labs'],
                ['Integrity mode', 'Guide, do not complete'],
                ['Citation policy', 'Required'],
                ['Outside knowledge', 'Disabled'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border-gray bg-[#0F0F12] p-3">
                  <p className="text-[11px] text-text-tertiary">{label}</p>
                  <p className="mt-1 text-xs font-medium text-text-primary">{value}</p>
                </div>
              ))}
            </div>
          </aside>
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
