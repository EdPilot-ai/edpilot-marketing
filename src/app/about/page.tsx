'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Shield,
  BookOpen,
  Lightbulb,
  Lock,
  Eye,
  ArrowRight,
  GraduationCap,
  Building2,
} from 'lucide-react'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6] mb-3">
      {children}
    </p>
  )
}

export default function AboutPage() {
  const founders = [
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

  const principles = [
    {
      icon: Lock,
      title: 'Faculty Authority',
      description:
        "The instructor defines what the AI knows and what it won't touch. Those boundaries aren't suggestions. They're enforced.",
    },
    {
      icon: Shield,
      title: 'Integrity by Design',
      description:
        "We designed EdPilot to make academic shortcuts harder, not easier. It guides students toward the answer. It doesn't hand it over.",
    },
    {
      icon: Lightbulb,
      title: 'Learning Over Convenience',
      description:
        "If a student wants a fast answer instead of understanding, EdPilot will frustrate them. That's intentional.",
    },
    {
      icon: Eye,
      title: 'No Black Boxes',
      description:
        "We'll tell you exactly how the models are built, what data goes in, and what we can't promise. We don't hide behind vague product language.",
    },
  ]

  return (
    <div className="min-h-screen bg-bg-page">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-violet-600/7 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-28 left-[15%] w-[280px] h-[280px] bg-indigo-500/4 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-28 right-[15%] w-[280px] h-[280px] bg-purple-500/4 rounded-full blur-[100px] pointer-events-none" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="text-center max-w-[720px] mx-auto">
            <h1 className="text-5xl md:text-[3.5rem] font-bold mb-5 leading-[1.1] tracking-[-0.03em]">
              <span className="text-text-primary">The AI should reflect your expertise. </span>
              <span className="text-[#8B5CF6]">Not replace it.</span>
            </h1>
            <p className="text-[1.0625rem] text-text-secondary leading-[1.7] max-w-[480px] mx-auto">
              EdPilot builds a course-specific AI from your materials. You define what it knows, how
              it responds, and where it stops.
            </p>
          </div>
        </div>
      </section>

      {/* ── The Challenge ── */}
      <section className="py-16 border-y border-[#27272A] bg-[#0F0F12]">
        <div className="container mx-auto px-6 max-w-xl">
          <div className="text-center">
            <SectionLabel>The Challenge</SectionLabel>
            <p className="text-xl md:text-[1.375rem] font-medium text-text-primary leading-[1.55] mb-4">
              Your students are using AI to study for your exams right now.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              Generic AI doesn&apos;t know your syllabus, your framing, or your course standards. It
              gives confident answers that sound right and sometimes directly contradict what you
              taught. You don&apos;t find out until the exam.
            </p>
          </div>
        </div>
      </section>

      {/* ── How We're Different ── */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <SectionLabel>How We&apos;re Different</SectionLabel>
            <h2 className="text-[1.875rem] font-bold text-text-primary mb-3 tracking-[-0.025em]">
              Built at the Course Level
            </h2>
            <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed">
              Most ed-tech AI is institution-wide and curriculum-agnostic. EdPilot is built one
              course at a time, around what you actually teach.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: BookOpen,
                label: 'Course-Bound',
                description:
                  'Each course gets its own AI, trained on its own materials. Nothing bleeds across courses or departments.',
              },
              {
                icon: GraduationCap,
                label: 'Faculty-Governed',
                description:
                  'The professor owns the knowledge boundary. Scope, tone, guardrails: all set by the instructor, not a vendor default.',
              },
              {
                icon: Building2,
                label: 'Institutionally Designed',
                description:
                  'Built for IT, legal, and compliance teams to approve, not just for early-adopter faculty to sneak in the back door.',
              },
            ].map((item, index) => (
              <div
                key={item.label}
                className="p-5 rounded-xl border border-[#27272A] bg-[#18181B] hover:border-[#3f3f46] hover:bg-[#1d1d21] transition-all duration-200"
              >
                <div className="w-8 h-8 bg-[#7C3AED]/12 rounded-lg flex items-center justify-center mb-4 ring-1 ring-[#7C3AED]/25">
                  <item.icon className="w-4 h-4 text-[#8B5CF6]" aria-hidden="true" />
                </div>
                <h3 className="text-[13px] font-semibold text-text-primary mb-1.5 tracking-[-0.005em]">
                  {item.label}
                </h3>
                <p className="text-text-secondary text-[13px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission Pull-Quote ── */}
      <section className="py-16 border-y border-[#27272A] bg-[#18181B]">
        <div className="container mx-auto px-6 max-w-2xl">
          <div>
            <div className="border-l-2 border-[#8B5CF6] pl-8 py-2">
              <p className="text-xl md:text-[1.375rem] font-medium text-text-primary leading-[1.55] mb-4">
                AI in education is inevitable. Our mission is to ensure it amplifies the
                professor&apos;s expertise, not replace it.
              </p>
              <SectionLabel>Our Mission</SectionLabel>
            </div>
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <SectionLabel>Principles</SectionLabel>
            <h2 className="text-[1.875rem] font-bold text-text-primary tracking-[-0.025em]">
              How we build
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {principles.map((principle, index) => (
              <div
                key={principle.title}
                className="flex items-start gap-4 p-5 rounded-xl border border-[#27272A] bg-[#18181B] hover:border-[#3f3f46] hover:bg-[#1d1d21] transition-all duration-200"
              >
                <div className="w-8 h-8 bg-[#7C3AED]/12 rounded-lg flex items-center justify-center flex-shrink-0 ring-1 ring-[#7C3AED]/25">
                  <principle.icon className="w-4 h-4 text-[#8B5CF6]" aria-hidden="true" />
                </div>
                <div className="pt-px">
                  <h3 className="text-[13px] font-semibold text-text-primary mb-1 tracking-[-0.005em]">
                    {principle.title}
                  </h3>
                  <p className="text-text-secondary text-[13px] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founders ── */}
      <section className="py-20 md:py-24 border-y border-[#27272A] bg-[#18181B]">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <SectionLabel>The Team</SectionLabel>
            <h2 className="text-[1.875rem] font-bold text-text-primary mb-3 tracking-[-0.025em]">
              Founded by Practitioners
            </h2>
            <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed">
              Not a tech company that discovered education. Two people who came up through higher ed
              and got tired of watching it fumble its own AI problem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {founders.map((founder, index) => (
              <div
                key={founder.name}
                className="flex flex-col items-center text-center p-8 rounded-xl border border-[#27272A] bg-[#0F0F12]"
              >
                <div className="relative w-28 h-28 mx-auto mb-5">
                  <Image
                    src={founder.image}
                    alt={`${founder.name}, ${founder.title}`}
                    width={112}
                    height={112}
                    className="rounded-full object-cover border-2 border-[#27272A]"
                    priority
                  />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-0.5">{founder.name}</h3>
                <p className="text-[#8B5CF6] text-sm font-medium mb-6">{founder.title}</p>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${founder.name}'s LinkedIn profile`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-[#3d3d45] text-text-secondary bg-transparent hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 flex-shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="py-12 border-b border-[#27272A]">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="grid md:grid-cols-3 md:divide-x divide-[#27272A] gap-8 md:gap-0">
            {[
              {
                label: 'FERPA Aligned',
                detail:
                  'Student data never trains public models. Course data stays inside your institution.',
              },
              {
                label: 'WCAG & ADA',
                detail: 'Accessibility is a requirement, not an afterthought.',
              },
              {
                label: 'Data Isolation',
                detail:
                  'Each deployment is siloed. Nothing crosses institution or course boundaries.',
              },
            ].map((item, index) => (
              <div key={item.label} className="md:px-8 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8B5CF6] mb-2">
                  {item.label}
                </p>
                <p className="text-text-secondary text-[13px] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F12] via-[#130d1f] to-[#0F0F12] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-violet-700/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container relative z-10 mx-auto px-6 max-w-2xl">
          <div className="border border-[#27272A] bg-[#18181B]/80 rounded-2xl px-8 py-14 md:px-14 text-center">
            <h2 className="text-[1.875rem] font-bold text-text-primary mb-3 tracking-[-0.025em]">
              See what it looks like on your course.
            </h2>
            <p className="text-text-secondary text-sm mb-8 max-w-sm mx-auto leading-relaxed">
              Send us your materials. We&apos;ll build a live demo and walk you through exactly what
              your students would see.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-8 h-11 shadow-[0_0_28px_rgba(139,92,246,0.4)]"
                >
                  Contact Sales
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-11">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
