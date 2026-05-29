'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import {
  CheckCircle2,
  GraduationCap,
  Lock,
  Mails,
  Plug,
  Rocket,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const launchSteps = [
  {
    icon: UserPlus,
    title: 'Register your university',
    time: '~2 minutes',
    result: 'Workspace request sent',
    description:
      'A university admin creates an account with their official school email and enters the institution name. EdPilot figures out the rest from your email domain — no forms to chase down, no contracts to sign first.',
    panelTitle: 'Institution request',
    panelLabel: 'admin@university.edu',
    metric: 'Domain detected',
    visual: 'school.edu',
  },
  {
    icon: ShieldCheck,
    title: 'EdPilot approves your institution',
    time: 'Fast review',
    result: 'Institution verified',
    description:
      'We do a quick check to confirm you are a real university and to keep student data safe. The moment you are approved, your admin gets an email and your workspace goes live.',
    panelTitle: 'Verification',
    panelLabel: 'Institution approved',
    metric: 'Workspace live',
    visual: 'verified',
  },
  {
    icon: Mails,
    title: 'Invite your professors',
    time: 'One click each',
    result: 'Faculty links delivered',
    description:
      'From the admin dashboard, invite faculty by email — one at a time or paste a whole department list at once. Each professor gets a single join link and lands in their own dashboard ready to teach.',
    panelTitle: 'Faculty invites',
    panelLabel: '14 professors queued',
    metric: 'Links ready',
    visual: 'invites',
  },
  {
    icon: Plug,
    title: 'Professors connect Canvas — optional',
    time: 'Their choice',
    result: 'Course AI goes live',
    description:
      'Faculty can sync their Canvas roster and course materials in a couple of clicks, or skip Canvas entirely and upload files directly. Either way, the assistant only ever answers from approved course content.',
    panelTitle: 'Course launch',
    panelLabel: 'Canvas optional',
    metric: 'AI ready',
    visual: 'live',
  },
]

const roles = [
  {
    icon: Users,
    title: 'University admin',
    label: 'Admin',
    description:
      'Registers the institution, invites and manages professors, and sees adoption across every course from one dashboard.',
    details: ['Approve the workspace', 'Paste a department list', 'Watch adoption grow'],
  },
  {
    icon: GraduationCap,
    title: 'Professor',
    label: 'Professor',
    description:
      'Accepts an invite, optionally connects Canvas, sets the assistant up for their course, and watches where students get stuck.',
    details: ['Choose Canvas or uploads', 'Set assistant guardrails', 'Review student patterns'],
  },
  {
    icon: Sparkles,
    title: 'Student',
    label: 'Student',
    description:
      'Joins their course and asks questions in plain language — getting answers grounded in the actual syllabus and materials, with citations.',
    details: ['Join the course', 'Ask plain-language questions', 'Get cited answers'],
  },
]

const launchTags = ['No code', 'No ticket queue', 'Canvas optional']

const launchMetrics = ['Verified institution', 'Faculty invited', 'Course AI live']

function MiniVisual({ visual }: { visual: string }) {
  if (visual === 'school.edu') {
    return (
      <div className="rounded-lg border border-border-gray bg-bg-surface p-4">
        <div className="mb-3 h-2 w-24 rounded-full bg-accent/50" />
        <div className="rounded-md border border-border-gray bg-[#0F0F12] px-3 py-3 text-sm font-medium text-text-primary">
          admin@<span className="text-accent">school.edu</span>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-text-secondary">
          <CheckCircle2 className="h-4 w-4 text-[#22C55E]" aria-hidden="true" />
          Official domain recognized
        </div>
      </div>
    )
  }

  if (visual === 'verified') {
    return (
      <div className="grid gap-3 rounded-lg border border-border-gray bg-bg-surface p-4">
        {['University record', 'Admin email', 'Data boundary'].map((item) => (
          <div key={item} className="flex items-center justify-between rounded-md bg-[#0F0F12] px-3 py-2">
            <span className="text-xs text-text-secondary">{item}</span>
            <CheckCircle2 className="h-4 w-4 text-[#22C55E]" aria-hidden="true" />
          </div>
        ))}
      </div>
    )
  }

  if (visual === 'invites') {
    return (
      <div className="rounded-lg border border-border-gray bg-bg-surface p-4">
        <div className="space-y-2">
          {['professor@school.edu', 'department-list.csv', '+ 12 more'].map((item, index) => (
            <m.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center gap-2 rounded-md bg-[#0F0F12] px-3 py-2 text-xs text-text-secondary"
            >
              <Mails className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              {item}
            </m.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-accent/30 bg-[linear-gradient(135deg,rgba(139,92,246,0.16),rgba(15,15,18,1))] p-4">
      <div className="flex items-center justify-between rounded-md border border-border-gray bg-[#0F0F12] px-3 py-3">
        <div>
          <p className="text-sm font-semibold text-text-primary">Course AI</p>
          <p className="mt-1 text-xs text-text-secondary">Grounded in approved content</p>
        </div>
        <span className="rounded-md bg-[#22C55E]/15 px-2 py-1 text-[11px] font-medium text-[#86EFAC]">
          Live
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border-gray">
        <m.div
          className="h-full rounded-full bg-[linear-gradient(90deg,#8B5CF6,#38BDF8,#22C55E)]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export function InteractiveLaunchpad() {
  const [activeStep, setActiveStep] = useState(0)
  const active = launchSteps[activeStep]
  const progress = ((activeStep + 1) / launchSteps.length) * 100

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % launchSteps.length)
    }, 5200)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="relative">
      <div className="absolute -inset-px rounded-lg bg-[linear-gradient(135deg,rgba(139,92,246,0.78),rgba(56,189,248,0.28),rgba(34,197,94,0.24))] opacity-80" />
      <div className="relative overflow-hidden rounded-lg border border-border-gray bg-[#0F0F12] shadow-[0_34px_100px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between border-b border-border-gray px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#A78BFA]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#38BDF8]" />
          </div>
          <span className="rounded-md border border-accent/25 bg-accent/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
            Launchpad
          </span>
        </div>

        <div className="grid gap-px bg-border-gray lg:grid-cols-[0.86fr_1.14fr]">
          <div className="bg-[#0F0F12] p-4 md:p-5">
            <div className="mb-4 h-1 overflow-hidden rounded-full bg-bg-surface">
              <m.div
                className="h-full rounded-full bg-[linear-gradient(90deg,#8B5CF6,#38BDF8)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
            <div className="grid gap-2">
              {launchSteps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === activeStep
                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    aria-pressed={isActive}
                    className={cn(
                      'group grid grid-cols-[auto_1fr] gap-3 rounded-lg border p-3 text-left transition duration-200 focus-ring',
                      isActive
                        ? 'border-accent/55 bg-accent/10 shadow-[0_18px_45px_rgba(124,58,237,0.18)]'
                        : 'border-transparent bg-transparent hover:border-border-gray hover:bg-bg-surface'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold',
                        isActive
                          ? 'border-accent/35 bg-accent/15 text-accent'
                          : 'border-border-gray bg-bg-surface text-text-secondary'
                      )}
                    >
                      {index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-text-primary">
                        {step.title}
                      </span>
                      <span className="mt-1 flex items-center gap-2 text-xs text-text-secondary">
                        <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                        {step.time}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {launchMetrics.map((metric, index) => (
                <div
                  key={metric}
                  className={cn(
                    'rounded-md border px-2 py-2 text-center transition',
                    index < activeStep
                      ? 'border-[#22C55E]/25 bg-[#22C55E]/10 text-[#86EFAC]'
                      : index === activeStep
                        ? 'border-accent/30 bg-accent/10 text-accent'
                        : 'border-border-gray bg-bg-surface text-text-tertiary'
                  )}
                >
                  <CheckCircle2 className="mx-auto h-3.5 w-3.5" aria-hidden="true" />
                  <p className="mt-1 text-[10px] font-medium leading-4">{metric}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(24,24,27,0.98),rgba(15,15,18,1))] p-5 md:p-7">
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.08),rgba(56,189,248,0.04),transparent_60%)]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
              aria-hidden="true"
            />
            <AnimatePresence mode="wait">
              <m.div
                key={active.title}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                className="relative z-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                      {active.panelTitle}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-text-primary">
                      {active.result}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-7 text-text-secondary">
                      {active.description}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md border border-border-gray bg-[#0F0F12] px-2.5 py-1 text-xs font-medium text-text-secondary">
                    {active.metric}
                  </span>
                </div>

                <div className="mt-7 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                  <MiniVisual visual={active.visual} />
                  <div className="rounded-lg border border-border-gray bg-[#0F0F12] p-4 md:w-40">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
                      Current state
                    </p>
                    <p className="mt-2 text-sm font-semibold text-text-primary">{active.panelLabel}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {launchTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border-gray bg-[#0F0F12] px-3 py-1.5 text-xs font-medium text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ScrollStepPath() {
  const [activeStep, setActiveStep] = useState(0)
  const itemRefs = useRef<Array<HTMLLIElement | null>>([])
  const progress = (activeStep / (launchSteps.length - 1)) * 100

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target instanceof HTMLElement) {
          setActiveStep(Number(visible.target.dataset.stepIndex ?? 0))
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.2, 0.45, 0.7] }
    )

    const refs = itemRefs.current
    refs.forEach((item) => {
      if (item) observer.observe(item)
    })

    return () => {
      refs.forEach((item) => {
        if (item) observer.unobserve(item)
      })
    }
  }, [])

  return (
    <ol className="relative grid gap-4 lg:grid-cols-4">
      <div
        className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden h-px bg-border-gray lg:block"
        aria-hidden="true"
      />
      <m.div
        className="pointer-events-none absolute left-0 top-[3.25rem] hidden h-px bg-[linear-gradient(90deg,#8B5CF6,#38BDF8,#22C55E)] lg:block"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        aria-hidden="true"
      />
      {launchSteps.map((step, index) => {
        const Icon = step.icon
        const isActive = index <= activeStep
        return (
          <li
            key={step.title}
            ref={(node) => {
              itemRefs.current[index] = node
            }}
            data-step-index={index}
            className={cn(
              'group relative overflow-hidden rounded-lg border p-5 transition duration-300 md:p-6',
              isActive
                ? 'border-accent/35 bg-[linear-gradient(180deg,rgba(139,92,246,0.1),rgba(15,15,18,1)_42%)] shadow-[0_20px_60px_rgba(0,0,0,0.22)]'
                : 'border-border-gray bg-[#0F0F12]'
            )}
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <div
                className={cn(
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border text-base font-semibold transition',
                  isActive
                    ? 'border-accent/35 bg-accent/15 text-accent'
                    : 'border-border-gray bg-bg-surface text-text-secondary'
                )}
              >
                {index + 1}
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-border-gray bg-bg-surface px-2.5 py-1 text-[11px] font-medium text-text-secondary">
                <Icon className="h-3 w-3 text-accent" aria-hidden="true" />
                {step.time}
              </span>
            </div>
            <h3 className="text-base font-semibold tracking-[-0.01em] text-text-primary">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-text-secondary">{step.description}</p>
            <div className="mt-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-text-tertiary">
              <CheckCircle2
                className={cn('h-4 w-4', isActive ? 'text-[#22C55E]' : 'text-text-tertiary')}
                aria-hidden="true"
              />
              {step.result}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export function RoleExplorer() {
  return (
    <div className="role-explorer overflow-hidden rounded-lg border border-border-gray bg-[#0F0F12]">
      {roles.map((role, index) => (
        <input
          key={role.label}
          className="role-input"
          type="radio"
          name="role-explorer"
          id={`role-${index}`}
          defaultChecked={index === 0}
        />
      ))}

      <div className="role-tabs grid gap-px bg-border-gray sm:grid-cols-3">
        {roles.map((item, index) => {
          const RoleIcon = item.icon
          return (
            <label
              key={item.title}
              htmlFor={`role-${index}`}
              className="role-tab flex cursor-pointer items-center gap-3 bg-[#0F0F12] px-4 py-4 text-left text-text-secondary transition hover:text-text-primary"
            >
              <span className="role-tab-icon flex h-9 w-9 items-center justify-center rounded-lg border border-border-gray bg-bg-surface text-text-tertiary transition">
                <RoleIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold">{item.label}</span>
            </label>
          )
        })}
      </div>

      <div className="role-panels">
        {roles.map((role, roleIndex) => {
          const Icon = role.icon
          return (
            <div
              key={role.title}
              className={cn(
                'role-panel gap-px bg-border-gray md:grid-cols-[0.95fr_1.05fr]',
                `role-panel-${roleIndex}`
              )}
            >
              <div className="bg-[#0F0F12] p-6 md:p-8">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-text-primary">
                  {role.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-text-secondary">{role.description}</p>
              </div>
              <div className="bg-[linear-gradient(180deg,rgba(24,24,27,0.98),rgba(15,15,18,1))] p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  What they do
                </p>
                <div className="mt-5 grid gap-3">
                  {role.details.map((detail, index) => (
                    <div
                      key={detail}
                      className="flex items-center gap-3 rounded-lg border border-border-gray bg-[#0F0F12] p-3"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/10 text-xs font-semibold text-accent">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-text-primary">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .role-input {
          position: absolute;
          width: 1px;
          height: 1px;
          opacity: 0;
          pointer-events: none;
        }

        .role-tab:focus-visible {
          outline: 2px solid var(--accent-hex);
          outline-offset: -2px;
        }

        #role-0:focus-visible ~ .role-tabs label[for='role-0'],
        #role-1:focus-visible ~ .role-tabs label[for='role-1'],
        #role-2:focus-visible ~ .role-tabs label[for='role-2'] {
          outline: 2px solid var(--accent-hex);
          outline-offset: -2px;
        }

        .role-panel {
          display: none;
        }

        #role-0:checked ~ .role-tabs label[for='role-0'],
        #role-1:checked ~ .role-tabs label[for='role-1'],
        #role-2:checked ~ .role-tabs label[for='role-2'] {
          color: var(--text-primary);
        }

        #role-0:checked ~ .role-tabs label[for='role-0'] .role-tab-icon,
        #role-1:checked ~ .role-tabs label[for='role-1'] .role-tab-icon,
        #role-2:checked ~ .role-tabs label[for='role-2'] .role-tab-icon {
          border-color: rgba(139, 92, 246, 0.35);
          background: rgba(139, 92, 246, 0.15);
          color: var(--accent-hex);
        }

        #role-0:checked ~ .role-panels .role-panel-0,
        #role-1:checked ~ .role-panels .role-panel-1,
        #role-2:checked ~ .role-panels .role-panel-2 {
          display: grid;
        }
      `}</style>
    </div>
  )
}
