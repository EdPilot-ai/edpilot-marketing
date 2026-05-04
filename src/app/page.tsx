import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Shield,
  Eye,
  Building2,
  Upload,
  Sparkles,
  BarChart3,
  Lock,
  Database,
  FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Container,
  Section,
  SectionHeader,
  Hero,
  FeatureCard,
  CTASection,
  StatRow,
  QuoteSection,
} from '@/components/marketing'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.edpilot.com'

const PILLARS = [
  {
    icon: Eye,
    title: 'Faculty-controlled',
    description:
      'You define what the AI knows, how it responds, and where it stops. No one else sets those defaults.',
  },
  {
    icon: Shield,
    title: 'Integrity-first',
    description:
      'Designed to make students think harder, not less. Won’t touch assignments, exam questions, or anything that shortcuts learning.',
  },
  {
    icon: Building2,
    title: 'Institution-ready',
    description:
      'FERPA-aligned, multi-department, LMS-compatible. Built for procurement teams, not just early adopters.',
  },
]

const STEPS = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload your materials',
    description:
      'Syllabus, slides, readings, assessments. EdPilot builds a course model from what you actually teach.',
  },
  {
    icon: Sparkles,
    step: '02',
    title: 'Students get answers that are right',
    description:
      'Sourced from your materials. Available around the clock. No hallucinations. No contradicting your lecture.',
  },
  {
    icon: BarChart3,
    step: '03',
    title: 'You see the gaps before the exam does',
    description:
      'Which concepts aren’t landing, where students disconnect, and what to address before it costs them a grade.',
  },
]

const FEATURED_BULLETS = [
  'Cites your readings, not random internet sources.',
  'Catches misconceptions before they hit the exam.',
  'Adjusts difficulty based on each student’s performance.',
  'You set the guardrails. You own the knowledge boundary.',
]

const TRUST_ITEMS = [
  {
    icon: Lock,
    label: 'FERPA aligned',
    detail:
      'Student data never trains public models. Course data stays inside your institution.',
  },
  {
    icon: Shield,
    label: 'WCAG & ADA',
    detail: 'Accessibility is a requirement, not an afterthought.',
  },
  {
    icon: Database,
    label: 'Data isolation',
    detail:
      'Each deployment is siloed. Nothing crosses institution or course boundaries.',
  },
]

function ProductPreview() {
  return (
    <div className="relative mx-auto max-w-2xl mt-16">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-accent/20 to-transparent blur-sm pointer-events-none" />
      <div className="relative rounded-2xl border border-border-gray bg-[#0F0F12] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border-gray bg-bg-surface">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-3 text-[11px] text-text-muted font-medium">
            EdPilot · Intro to Statistics — AI Teaching Assistant
          </span>
        </div>
        <div className="p-6 space-y-4 text-[13px]">
          <div className="flex justify-end">
            <div className="bg-accent/15 border border-accent/20 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-xs text-text-primary">
              Can you explain the central limit theorem?
            </div>
          </div>
          <div className="flex gap-3 max-w-lg">
            <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
            </div>
            <div>
              <div className="bg-bg-surface border border-border-gray rounded-2xl rounded-tl-sm px-4 py-3 text-text-secondary leading-relaxed mb-2">
                The CLT states that as sample size grows, the sampling distribution of the mean
                approaches normal — regardless of the population’s shape. Professor Chen covers
                this in Week 4 with the coin-flip simulation on slide 14.
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20 text-[11px] text-accent">
                <FileText className="w-3 h-3" />
                Week 4 lecture notes · slide 14
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero
        titleNode={
          <>
            <span className="text-text-primary">The AI that actually knows </span>
            <span className="text-accent">what you teach.</span>
          </>
        }
        description="Built from your syllabus. Controlled by your faculty. Every answer comes from your course — not the internet."
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
                Talk to sales
              </Button>
            </Link>
          </>
        }
      >
        <ProductPreview />
      </Hero>

      {/* Logo strip — placeholder institution types until real logos land */}
      <section className="py-10 border-y border-border-gray bg-[#0F0F12]/40">
        <Container size="lg">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary/70 mb-7">
            Built for institutions like yours
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              'Research University',
              'State University',
              'Community College',
              'Liberal Arts College',
              'Technical Institute',
            ].map((name) => (
              <span
                key={name}
                className="text-[13px] font-semibold text-text-secondary/60 tracking-tight transition-colors hover:text-text-secondary"
              >
                {name}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* The problem — compressed pull statement */}
      <Section surface="sunken" spacing="md">
        <Container size="md" className="text-center">
          <p className="text-xl md:text-[1.5rem] font-medium leading-[1.45] tracking-[-0.01em]">
            <span className="text-text-primary">
              Your students are already using AI to study.{' '}
            </span>
            <span className="text-text-secondary">
              The one they’re using right now has never read your syllabus.
            </span>
          </p>
        </Container>
      </Section>

      {/* Why EdPilot — pillars */}
      <Section spacing="lg">
        <Container size="lg">
          <SectionHeader
            eyebrow="Why EdPilot"
            title="Built for one purpose. Yours."
            description="Other AI tools are built for everyone. That means they work well for no one in particular."
          />

          <div className="space-y-4">
            <FeatureCard
              variant="featured"
              icon={BookOpen}
              badge="Core"
              title="Course-specific"
              description="Scoped to one course. Every answer comes from your uploaded materials — not the internet, not other courses, not what the model guesses. ChatGPT answers from everywhere and nowhere."
            />

            <div className="grid gap-4 md:grid-cols-3">
              {PILLARS.map((pillar) => (
                <FeatureCard
                  key={pillar.title}
                  icon={pillar.icon}
                  title={pillar.title}
                  description={pillar.description}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <QuoteSection
        quote="“I uploaded my syllabus on a Monday. By Wednesday my students were getting answers that actually cited my lecture slides. I hadn’t touched a thing after setup.”"
        authorName="Dr. Sarah Chen"
        authorTitle="Statistics, State University"
        initials="SC"
      />

      {/* Featured product */}
      <Section spacing="lg">
        <Container size="md" className="text-center">
          <SectionHeader
            eyebrow="Featured product"
            title="AI Teaching Assistant"
            description="A TA that never calls in sick. Answers student questions at 2am, using your materials, your terminology, your standards."
          />

          <div className="mx-auto grid max-w-2xl gap-x-6 gap-y-3 text-left sm:grid-cols-2 mb-9">
            {FEATURED_BULLETS.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 text-accent flex-shrink-0 mt-[3px]"
                  aria-hidden="true"
                />
                <span className="text-text-secondary text-[14px] leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          <Link href="/products/curriculum-intelligence">
            <Button variant="outline" size="default">
              Explore the product
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </Container>
      </Section>

      {/* How it works */}
      <Section surface="sunken" spacing="lg">
        <Container size="lg">
          <SectionHeader
            eyebrow="How it works"
            title="From syllabus to working AI in three steps."
            description="No IT project required."
          />

          <div className="relative grid gap-4 md:grid-cols-3">
            {/* Connector line — desktop only */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-[2.75rem] left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-px border-t border-dashed border-accent/25"
            />
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

      <StatRow items={TRUST_ITEMS} />

      <CTASection
        title="Stop hoping students use AI responsibly."
        description="Give them one that actually knows your course."
        primaryHref={`${APP_URL}/register`}
        primaryLabel="Get started free"
        secondaryHref="/contact"
        secondaryLabel="Contact sales"
      />
    </>
  )
}
