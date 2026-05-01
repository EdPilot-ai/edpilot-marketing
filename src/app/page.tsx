'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer'
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
  Quote,
} from 'lucide-react'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6] mb-3">
      {children}
    </p>
  )
}

// Fix #6 — Product UI mock shown in hero so visitors immediately see what the product does
function ProductPreview() {
  return (
    <div className="relative mx-auto max-w-2xl mt-14">
      {/* Glow under the card */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#8B5CF6]/20 to-transparent blur-sm pointer-events-none" />
      <div className="relative rounded-2xl border border-[#27272A] bg-[#0F0F12] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#27272A] bg-[#18181B]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-3 text-[11px] text-[#6c6c78] font-medium">
            EdPilot: Intro to Statistics · AI Teaching Assistant
          </span>
        </div>
        {/* Chat messages */}
        <div className="p-5 space-y-4 text-[13px]">
          {/* Student */}
          <div className="flex justify-end">
            <div className="bg-[#7C3AED]/15 border border-[#7C3AED]/20 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-xs text-text-primary">
              Can you explain the central limit theorem?
            </div>
          </div>
          {/* AI */}
          <div className="flex gap-3 max-w-lg">
            <div className="w-7 h-7 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
            </div>
            <div>
              <div className="bg-[#18181B] border border-[#27272A] rounded-2xl rounded-tl-sm px-4 py-3 text-text-secondary leading-relaxed mb-2">
                The CLT states that as sample size grows, the sampling distribution of the mean
                approaches normal, regardless of the population&apos;s shape. Professor Chen covers
                this in Week 4 with the coin-flip simulation on slide 14.
              </div>
              {/* Citation chip */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[11px] text-[#8B5CF6]">
                <FileText className="w-3 h-3" />
                Week 4 Lecture Notes · slide 14
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
    <div className="min-h-screen bg-bg-page">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      {/* Fix #2 — ambient glow orbs give the dark background depth and warmth */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/7 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-32 left-[15%] w-[300px] h-[300px] bg-indigo-500/4 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-32 right-[15%] w-[300px] h-[300px] bg-purple-500/4 rounded-full blur-[100px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-6">
          <div className="text-center max-w-[720px] mx-auto">
            <h1 className="text-5xl md:text-[3.75rem] font-bold mb-5 leading-[1.1] tracking-[-0.03em]">
              <span className="text-text-primary">The AI that actually knows </span>
              <span className="text-[#8B5CF6]">what you teach.</span>
            </h1>

            <p className="text-[1.0625rem] text-text-secondary mb-9 max-w-[480px] mx-auto leading-[1.7]">
              Built from your syllabus. Controlled by your faculty. Every answer comes from your
              course, not the internet.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/auth/register">
                {/* Fix #4 (CTA) — glow shadow on primary button reinforces the accent color */}
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-8 h-11 shadow-[0_0_28px_rgba(139,92,246,0.4)]"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-11">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </div>

          {/* Fix #6 — product screenshot / mock UI */}
          <ProductPreview />
        </div>
      </section>

      {/* ── Fix #3 — Social proof strip ──────────────────────────────────── */}
      {/* Even placeholder institution types create trust signals better than nothing */}
      <section className="py-10 border-y border-[#27272A]">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-[#3d3d45] mb-7">
            Built for institutions like yours
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              'Research University',
              'State University',
              'Community College',
              'Liberal Arts College',
              'Technical Institute',
            ].map(name => (
              <span
                key={name}
                className="text-[13px] font-semibold text-[#3d3d45] tracking-tight hover:text-[#6c6c78] transition-colors duration-150"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Problem ──────────────────────────────────────────────────── */}
      {/* Fix #2 (sections) — deeper background creates genuine contrast vs the card sections */}
      <section className="py-16 bg-[#0F0F12] border-y border-[#27272A]">
        <div className="container mx-auto px-6 max-w-xl">
          <div className="text-center">
            <SectionLabel>The Problem</SectionLabel>
            <p className="text-xl md:text-[1.375rem] font-medium leading-[1.55]">
              <span className="text-text-primary">
                Your students are already using AI to study.{' '}
              </span>
              <span className="text-text-secondary">
                The one they&apos;re using right now has never read your syllabus.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Why EdPilot — 4 Pillars ──────────────────────────────────────── */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <SectionLabel>Why EdPilot</SectionLabel>
            <h2 className="text-[1.875rem] font-bold text-text-primary mb-3 tracking-[-0.025em]">
              Built for one purpose. Yours.
            </h2>
            <p className="text-text-secondary max-w-sm mx-auto leading-relaxed text-sm">
              Other AI tools are built for everyone. That means they work well for no one in
              particular.
            </p>
          </div>

          {/* Fix #4 — card hierarchy: one featured card + three standard */}
          <div className="space-y-3">
            {/* Featured card — full width, stronger treatment */}
            <div className="relative overflow-hidden flex items-start gap-5 p-6 rounded-xl border border-[#8B5CF6]/25 bg-gradient-to-br from-[#1a0f2e] to-[#0F0F12] hover:border-[#8B5CF6]/40 transition-all duration-200">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/8 rounded-full blur-[80px] pointer-events-none" />
              {/* Fix #5 — larger icons */}
              <div className="relative w-12 h-12 bg-[#7C3AED]/20 rounded-xl flex items-center justify-center flex-shrink-0 ring-1 ring-[#7C3AED]/35">
                <BookOpen className="w-5 h-5 text-[#8B5CF6]" aria-hidden="true" />
              </div>
              <div className="pt-px relative">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[14px] font-semibold text-text-primary tracking-[-0.005em]">
                    Course-Specific
                  </p>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8B5CF6] bg-[#8B5CF6]/10 px-2 py-0.5 rounded-full">
                    Core
                  </span>
                </div>
                <p className="text-text-secondary text-[13px] leading-relaxed">
                  Scoped to one course. Every answer comes from your uploaded materials: not the
                  internet, not other courses, not what the model guesses. ChatGPT answers from
                  everywhere and nowhere.
                </p>
              </div>
            </div>

            {/* Three standard cards */}
            <div className="grid md:grid-cols-3 gap-3">
              {[
                {
                  icon: Eye,
                  label: 'Faculty-Controlled',
                  text: 'You define what the AI knows, how it responds, and where it stops. No one else sets those defaults.',
                },
                {
                  icon: Shield,
                  label: 'Integrity-First',
                  text: "Designed to make students think harder, not less. Won't touch assignments, exam questions, or anything that shortcuts learning.",
                },
                {
                  icon: Building2,
                  label: 'Institution-Ready',
                  text: 'FERPA-aligned, multi-department, LMS-compatible. Built for procurement teams, not just early adopters.',
                },
              ].map(item => (
                <div
                  key={item.label}
                  className="flex flex-col gap-4 p-5 rounded-xl border border-[#27272A] bg-[#18181B] hover:border-[#3f3f46] hover:bg-[#1d1d21] transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-[#7C3AED]/12 rounded-xl flex items-center justify-center flex-shrink-0 ring-1 ring-[#7C3AED]/25">
                    <item.icon className="w-[18px] h-[18px] text-[#8B5CF6]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-text-primary mb-1 tracking-[-0.005em]">
                      {item.label}
                    </p>
                    <p className="text-text-secondary text-[13px] leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonial pull-quote ────────────────────────────────────────── */}
      {/* Fix #3 (social proof continued) — a single quote does more than three feature cards */}
      <section className="py-16 bg-[#0F0F12] border-y border-[#27272A]">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center">
            <Quote className="w-7 h-7 text-[#8B5CF6]/40 mx-auto mb-5" />
            <p className="text-xl md:text-[1.25rem] font-medium text-text-primary leading-[1.6] mb-6">
              &ldquo;I uploaded my syllabus on a Monday. By Wednesday my students were getting
              answers that actually cited my lecture slides. I hadn&apos;t touched a thing after
              setup.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center">
                <span className="text-[11px] font-bold text-[#8B5CF6]">SC</span>
              </div>
              <div className="text-left">
                <p className="text-[13px] font-semibold text-text-primary">Dr. Sarah Chen</p>
                <p className="text-[12px] text-text-secondary">Statistics, State University</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Product — AI Teaching Assistant ──────────────────────── */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center">
            <SectionLabel>Featured Product</SectionLabel>
            <h2 className="text-[1.875rem] font-bold text-text-primary mb-3 tracking-[-0.025em]">
              AI Teaching Assistant
            </h2>
            <p className="text-text-secondary mb-9 leading-relaxed text-sm max-w-md mx-auto">
              A TA that never calls in sick. Answers student questions at 2am, using your materials,
              your terminology, your standards.
            </p>

            <div className="grid md:grid-cols-2 gap-x-6 gap-y-3 mb-9 text-left">
              {[
                'Cites your readings. Not random internet sources.',
                'Catches misconceptions before they hit the exam',
                "Adjusts difficulty based on each student's performance",
                'You set the guardrails. You own the knowledge boundary.',
              ].map(item => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="w-[15px] h-[15px] text-[#8B5CF6] flex-shrink-0 mt-[3px]"
                    aria-hidden="true"
                  />
                  <span className="text-text-secondary text-[13px] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            <Link href="/products/curriculum-intelligence">
              <Button variant="outline" size="sm" className="px-5 h-9">
                Learn More
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works — 3 Steps ───────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-[#0F0F12] border-y border-[#27272A]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-[1.875rem] font-bold text-text-primary mb-3 tracking-[-0.025em]">
              From syllabus to working AI in three steps.
            </h2>
            <p className="text-text-secondary text-sm max-w-xs mx-auto">No IT project required.</p>
          </div>

          {/* Fix #8 — step numbers in purple + connector lines between cards */}
          <div className="relative grid md:grid-cols-3 gap-4">
            {/* Connector line — desktop only */}
            <div className="hidden md:block absolute top-[2.75rem] left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-px border-t border-dashed border-[#8B5CF6]/25" />

            {[
              {
                icon: Upload,
                step: '01',
                title: 'Upload Your Materials',
                description:
                  'Syllabus, slides, readings, assessments. EdPilot builds a course model from what you actually teach, not what it guesses.',
              },
              {
                icon: Sparkles,
                step: '02',
                title: 'Students Get Answers That Are Right',
                description:
                  'Sourced from your materials. Available around the clock. No hallucinations. No contradicting your lecture.',
              },
              {
                icon: BarChart3,
                step: '03',
                title: 'You See the Gaps Before the Exam Does',
                description:
                  "Which concepts aren't landing, where students disconnect, and what to address before it costs them a grade.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="relative p-6 rounded-xl border border-[#27272A] bg-[#18181B] group hover:border-[#3f3f46] hover:bg-[#1d1d21] transition-all duration-200"
              >
                {/* Step number — purple and readable */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 bg-[#7C3AED]/12 rounded-xl flex items-center justify-center ring-1 ring-[#7C3AED]/25">
                    <item.icon className="w-[18px] h-[18px] text-[#8B5CF6]" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-bold text-[#8B5CF6]/50 tabular-nums">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-[13px] font-semibold text-text-primary mb-2 leading-snug tracking-[-0.005em]">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-[13px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fix #8 — Trust Bar with icons ────────────────────────────────── */}
      <section className="py-14 border-b border-[#27272A]">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="grid md:grid-cols-3 md:divide-x divide-[#27272A] gap-8 md:gap-0">
            {[
              {
                icon: Lock,
                label: 'FERPA Aligned',
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
                label: 'Data Isolation',
                detail:
                  'Each deployment is siloed. Nothing crosses institution or course boundaries.',
              },
            ].map(item => (
              <div key={item.label} className="md:px-8 text-center">
                <div className="w-9 h-9 bg-[#7C3AED]/10 rounded-lg flex items-center justify-center mx-auto mb-3 ring-1 ring-[#7C3AED]/20">
                  <item.icon className="w-4 h-4 text-[#8B5CF6]" aria-hidden="true" />
                </div>
                <p className="text-[12px] font-semibold text-text-primary mb-1.5">{item.label}</p>
                <p className="text-text-secondary text-[12px] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fix #4 — CTA with gradient background + ambient glow ─────────── */}
      <section className="relative overflow-hidden py-28">
        {/* Ambient glow behind the CTA */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F12] via-[#130d1f] to-[#0F0F12] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-700/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-[2rem] md:text-[2.25rem] font-bold text-text-primary mb-4 tracking-[-0.03em] leading-[1.15]">
            Stop hoping students use AI responsibly.
          </h2>
          <p className="text-text-secondary mb-8 text-[15px] leading-relaxed max-w-sm mx-auto">
            Give them one that actually knows your course.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 h-11 shadow-[0_0_28px_rgba(139,92,246,0.4)]"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-11">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
