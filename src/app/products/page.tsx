'use client'

import Link from 'next/link'
import {
  GraduationCap,
  Users,
  Briefcase,
  Building2,
  Cpu,
  MonitorPlay,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6] mb-3">
      {children}
    </p>
  )
}

export default function ProductsPage() {
  const comingSoonSuites = [
    {
      id: 'professor-network',
      title: 'Professor Network Hub',
      description:
        'Share materials, co-develop courses, and collaborate with faculty across your institution.',
      icon: Users,
    },
    {
      id: 'student-career',
      title: 'Student Career Network',
      description:
        'Job matching, skill gap analysis, and career recommendations tied to academic performance.',
      icon: Briefcase,
    },
    {
      id: 'university-admin',
      title: 'University Admin Intelligence',
      description:
        'Curriculum compliance tracking, course planning, and department-level analytics.',
      icon: Building2,
    },
    {
      id: 'ai-lab',
      title: 'AI Lab & Tooling Suite',
      description:
        'Custom AI workflows, institutional knowledge bases, safety guardrails, and model evaluation.',
      icon: Cpu,
    },
    {
      id: 'classroom-experience',
      title: 'Classroom Experience Suite',
      description: 'Live lecture support, engagement tracking, and automatic post-class summaries.',
      icon: MonitorPlay,
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
              <span className="text-text-primary">Product </span>
              <span className="text-[#8B5CF6]">Suites.</span>
            </h1>
            <p className="text-[1.0625rem] text-text-secondary leading-[1.7] max-w-[480px] mx-auto">
              One suite is live. The rest are in development.
            </p>
          </div>
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section className="py-16 border-y border-[#27272A] bg-[#18181B]">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Featured Product */}
          <div className="mb-8">
            <SectionLabel>Available Now</SectionLabel>
            <Link href="/products/curriculum-intelligence" className="block group">
              <div className="p-6 md:p-8 rounded-xl border border-[#8B5CF6]/20 bg-[#0F0F12] hover:border-[#8B5CF6]/40 hover:bg-[#0f0f14] transition-all duration-200">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                  <div className="flex items-start gap-5 flex-1">
                    <div className="w-10 h-10 bg-[#7C3AED]/12 rounded-xl flex items-center justify-center flex-shrink-0 ring-1 ring-[#7C3AED]/25">
                      <GraduationCap className="w-5 h-5 text-[#8B5CF6]" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-text-primary group-hover:text-[#8B5CF6] transition-colors mb-1 tracking-[-0.005em]">
                        Curriculum Intelligence Suite
                      </h3>
                      <p className="text-text-secondary text-[13px] leading-relaxed">
                        AI tutor trained on your course. Content generation, rubric-based grading,
                        and student performance analytics, all from the same materials.
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex-shrink-0 px-4 h-9">
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Coming Soon Products */}
          <div className="mb-4">
            <SectionLabel>Coming Soon</SectionLabel>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {comingSoonSuites.map((suite, index) => {
              const Icon = suite.icon
              return (
                <div
                  key={suite.id}
                  className="p-5 rounded-xl border border-[#27272A] bg-[#0F0F12] opacity-60"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#27272A] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-text-secondary" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[13px] font-semibold text-text-secondary mb-1 tracking-[-0.005em]">
                        {suite.title}
                      </h3>
                      <p className="text-text-secondary/70 text-[13px] leading-relaxed">
                        {suite.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
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
              Start with Curriculum Intelligence.
            </h2>
            <p className="text-text-secondary text-sm mb-8 max-w-sm mx-auto leading-relaxed">
              Free to try. Upload your materials and see what it builds.
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
        </div>
      </section>

      <Footer />
    </div>
  )
}
