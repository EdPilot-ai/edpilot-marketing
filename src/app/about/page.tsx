import Image from 'next/image'
import Link from 'next/link'
import {
  Building2,
  BookOpen,
  Eye,
  GraduationCap,
  Lightbulb,
  Lock,
  Shield,
} from 'lucide-react'
import type { Metadata } from 'next'
import {
  Container,
  Section,
  SectionHeader,
  Hero,
  StatRow,
  CTASection,
  Eyebrow,
} from '@/components/marketing'

export const metadata: Metadata = {
  title: 'About',
  description:
    'EdPilot was founded by practitioners from higher education. Our mission is to ensure AI in classrooms amplifies the professor’s expertise, not replace it.',
}

const FOUNDERS = [
  {
    name: 'David Laszczkowski',
    title: 'Co-Founder',
    image: '/founders/david-laszczkowski.jpg',
    linkedin: 'https://www.linkedin.com/in/david-laszczkowski-70139a19b/',
  },
  {
    name: 'Kelly Wen',
    title: 'Co-Founder',
    image: '/founders/kelly-wen.jpg',
    linkedin: 'https://www.linkedin.com/in/drkwen/',
  },
]

const DIFFERENCES = [
  {
    icon: BookOpen,
    title: 'Course-bound',
    description:
      'Each course gets its own AI, trained on its own materials. Nothing bleeds across courses or departments.',
  },
  {
    icon: GraduationCap,
    title: 'Faculty-governed',
    description:
      'The professor owns the knowledge boundary. Scope, tone, guardrails — all set by the instructor, not a vendor default.',
  },
  {
    icon: Building2,
    title: 'Institutionally designed',
    description:
      'Built for IT, legal, and compliance teams to approve — not for early-adopter faculty to sneak in the back door.',
  },
]

const PRINCIPLES = [
  {
    icon: Lock,
    title: 'Faculty authority',
    description:
      'The instructor defines what the AI knows and what it won’t touch. Those boundaries aren’t suggestions — they’re enforced.',
  },
  {
    icon: Shield,
    title: 'Integrity by design',
    description:
      'EdPilot is designed to make academic shortcuts harder, not easier. It guides students toward the answer. It doesn’t hand it over.',
  },
  {
    icon: Lightbulb,
    title: 'Learning over convenience',
    description:
      'If a student wants a fast answer instead of understanding, EdPilot will frustrate them. That’s intentional.',
  },
  {
    icon: Eye,
    title: 'No black boxes',
    description:
      'We tell you exactly how the models are built, what data goes in, and what we can’t promise. We don’t hide behind vague product language.',
  },
]

const TRUST_ITEMS = [
  {
    label: 'FERPA aligned',
    detail: 'Student data never trains public models. Course data stays inside your institution.',
  },
  { label: 'WCAG & ADA', detail: 'Accessibility is a requirement, not an afterthought.' },
  {
    label: 'Data isolation',
    detail: 'Each deployment is siloed. Nothing crosses institution or course boundaries.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="Our story"
        titleNode={
          <>
            <span className="text-text-primary">The AI should reflect your expertise. </span>
            <span className="text-accent">Not replace it.</span>
          </>
        }
        description="EdPilot builds a course-specific AI from your materials. You define what it knows, how it responds, and where it stops."
      />

      {/* Challenge */}
      <Section surface="sunken" spacing="md">
        <Container size="md" className="text-center">
          <Eyebrow className="mb-3">The challenge</Eyebrow>
          <p className="text-xl md:text-[1.5rem] font-medium text-text-primary leading-[1.45] tracking-[-0.01em] mb-4">
            Your students are using AI to study for your exams right now.
          </p>
          <p className="text-text-secondary text-[15px] leading-relaxed max-w-xl mx-auto">
            Generic AI doesn’t know your syllabus, your framing, or your course standards. It gives
            confident answers that sound right and sometimes directly contradict what you taught.
            You don’t find out until the exam.
          </p>
        </Container>
      </Section>

      {/* How we're different */}
      <Section spacing="lg">
        <Container size="lg">
          <SectionHeader
            eyebrow="How we’re different"
            title="Built at the course level."
            description="Most ed-tech AI is institution-wide and curriculum-agnostic. EdPilot is built one course at a time, around what you actually teach."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {DIFFERENCES.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border-gray bg-bg-surface p-6 transition-all hover:border-[#3f3f46] hover:bg-[#1d1d21]"
              >
                <div className="w-10 h-10 bg-accent/[0.12] rounded-lg flex items-center justify-center mb-4 ring-1 ring-accent/25">
                  <item.icon className="w-4 h-4 text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-[14px] font-semibold text-text-primary mb-1.5 tracking-[-0.005em]">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-[13px] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Mission pull-quote */}
      <Section surface="raised" spacing="md">
        <Container size="md">
          <div className="border-l-2 border-accent pl-7 py-2">
            <Eyebrow className="mb-3">Our mission</Eyebrow>
            <p className="text-xl md:text-[1.5rem] font-medium text-text-primary leading-[1.45] tracking-[-0.01em]">
              AI in education is inevitable. Our mission is to ensure it amplifies the professor’s
              expertise — not replace it.
            </p>
          </div>
        </Container>
      </Section>

      {/* Principles */}
      <Section spacing="lg">
        <Container size="md">
          <SectionHeader eyebrow="Principles" title="How we build." />
          <div className="grid gap-3 md:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="flex items-start gap-4 rounded-2xl border border-border-gray bg-bg-surface p-5 transition-all hover:border-[#3f3f46] hover:bg-[#1d1d21]"
              >
                <div className="w-9 h-9 bg-accent/[0.12] rounded-lg flex items-center justify-center flex-shrink-0 ring-1 ring-accent/25">
                  <p.icon className="w-4 h-4 text-accent" aria-hidden="true" />
                </div>
                <div className="pt-px">
                  <h3 className="text-[14px] font-semibold text-text-primary mb-1 tracking-[-0.005em]">
                    {p.title}
                  </h3>
                  <p className="text-text-secondary text-[13px] leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Founders */}
      <Section surface="sunken" spacing="lg">
        <Container size="md">
          <SectionHeader
            eyebrow="The team"
            title="Founded by practitioners."
            description="Not a tech company that discovered education. Two people who came up through higher ed and got tired of watching it fumble its own AI problem."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {FOUNDERS.map((founder) => (
              <div
                key={founder.name}
                className="flex flex-col items-center text-center rounded-2xl border border-border-gray bg-bg-surface p-8"
              >
                <Image
                  src={founder.image}
                  alt={`${founder.name}, ${founder.title}`}
                  width={120}
                  height={120}
                  className="rounded-full object-cover border-2 border-border-gray mb-5"
                  priority
                />
                <h3 className="text-base font-semibold text-text-primary mb-0.5">
                  {founder.name}
                </h3>
                <p className="text-accent text-[13px] font-medium mb-5">{founder.title}</p>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${founder.name}'s LinkedIn profile`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium border border-[#3d3d45] text-text-secondary transition-all hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <StatRow items={TRUST_ITEMS} />

      <CTASection
        title="See what it looks like on your course."
        description="Send us your materials. We’ll build a live demo and walk you through exactly what your students would see."
        primaryHref="/contact"
        primaryLabel="Contact sales"
      />
    </>
  )
}
