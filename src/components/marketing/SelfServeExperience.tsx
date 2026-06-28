'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
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

function MiniVisual({ visual }: { visual: string }) {
  if (visual === 'school.edu') {
    return (
      <div className="min-h-[118px] rounded-lg border border-border-gray bg-bg-surface p-3">
        <div className="mb-3 h-2 w-24 rounded-full bg-accent/50" />
        <div className="rounded-md border border-border-gray bg-bg-deep px-3 py-3 text-sm font-medium text-text-primary">
          admin@<span className="text-accent">school.edu</span>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-text-secondary">
          <CheckCircle2 className="h-4 w-4 text-status-success" aria-hidden="true" />
          Official domain recognized
        </div>
      </div>
    )
  }

  if (visual === 'verified') {
    return (
      <div className="grid min-h-[118px] gap-2 rounded-lg border border-border-gray bg-bg-surface p-3">
        {['University record', 'Admin email', 'Data boundary'].map((item) => (
          <div key={item} className="flex items-center justify-between rounded-md bg-bg-deep px-3 py-2">
            <span className="text-xs text-text-secondary">{item}</span>
            <CheckCircle2 className="h-4 w-4 text-status-success" aria-hidden="true" />
          </div>
        ))}
      </div>
    )
  }

  if (visual === 'invites') {
    return (
      <div className="min-h-[118px] rounded-lg border border-border-gray bg-bg-surface p-3">
        <div className="space-y-2">
          {['professor@school.edu', 'department-list.csv', '+ 12 more'].map((item, index) => (
            <m.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center gap-2 rounded-md bg-bg-deep px-3 py-2 text-xs text-text-secondary"
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
      <div className="surface-gradient-featured min-h-[118px] rounded-lg border border-accent/20 p-3">
      <div className="flex items-center justify-between rounded-md border border-border-gray bg-bg-deep px-3 py-3">
        <div>
          <p className="text-sm font-semibold text-text-primary">Course AI</p>
          <p className="mt-1 text-xs text-text-secondary">Grounded in approved content</p>
        </div>
        <span className="rounded-md bg-status-success/15 px-2 py-1 text-[11px] font-medium text-status-success-soft">
          Live
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border-gray">
        <m.div
          className="accent-path-gradient h-full rounded-full"
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

  return (
    <div className="relative">
      <div className="launchpad-border-gradient absolute -inset-px rounded-lg opacity-80" />
      <div className="relative overflow-hidden rounded-lg border border-border-gray bg-bg-deep shadow-2xl">
        <div className="flex items-center justify-between border-b border-border-gray px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-status-success" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-soft" />
            <span className="h-2.5 w-2.5 rounded-full bg-status-info" />
          </div>
      <span className="rounded-md border border-accent/15 bg-accent/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
            Launchpad
          </span>
        </div>

        <div className="surface-gradient-panel p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
                Guided setup
              </p>
            </div>
            <p className="text-xs font-medium text-text-secondary">
              Step {activeStep + 1} of {launchSteps.length}
            </p>
          </div>
          <div className="mb-4 h-1 overflow-hidden rounded-full bg-bg-surface">
            <m.div
              className="accent-path-gradient-short h-full rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            />
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
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
                    'group min-h-[78px] rounded-lg border p-2.5 text-left transition duration-150 focus-ring',
                    isActive
                        ? 'border-accent/30 bg-accent/5 shadow-lg'
                        : 'border-border-gray bg-bg-deep hover:border-accent/25 hover:bg-bg-surface'
                  )}
                >
                  <span className="mb-3 flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-semibold',
                        isActive
                      ? 'border-accent/25 bg-accent/5 text-accent'
                          : 'border-border-gray bg-bg-surface text-text-secondary'
                      )}
                    >
                      {index + 1}
                    </span>
                    <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  </span>
                  <span className="block text-[13px] font-semibold leading-5 text-text-primary">
                    {step.title}
                  </span>
                  <span className="mt-1 block text-xs text-text-secondary">{step.time}</span>
                </button>
              )
            })}
          </div>

          <div key={active.title} className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="rounded-lg border border-border-gray bg-bg-deep p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    {active.panelTitle}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-text-primary">
                    {active.result}
                  </h3>
                </div>
                <span className="shrink-0 rounded-md border border-accent/15 bg-accent/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                  Self-serve
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-text-secondary">
                {active.description}
              </p>
            </div>

            <div className="rounded-lg border border-border-gray bg-bg-deep p-4">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
                    Result preview
                  </p>
                  <p className="mt-2 break-words text-sm font-semibold leading-5 text-text-primary">
                    {active.panelLabel}
                  </p>
                </div>
                <Rocket className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              </div>
              <MiniVisual visual={active.visual} />
              <div className="mt-3 rounded-md border border-border-gray bg-bg-surface px-3 py-2 text-xs font-medium text-text-secondary">
                {active.metric}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function RoleExplorer() {
  const [activeRole, setActiveRole] = useState(0)
  const active = roles[activeRole]
  const ActiveIcon = active.icon

  return (
    <div className="role-explorer overflow-hidden rounded-lg border border-border-gray bg-bg-deep">
      <div className="surface-gradient-panel border-b border-border-gray p-3">
        <div className="mb-3 flex items-center justify-between gap-4 px-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            Choose a lane
          </p>
          <p className="hidden text-xs text-text-secondary sm:block">
            {active.label} details shown below
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3" role="tablist" aria-label="Role lanes">
          {roles.map((item, index) => {
            const RoleIcon = item.icon
            const isActive = index === activeRole

            return (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="role-panel"
                onClick={() => setActiveRole(index)}
                className={cn(
                  'group flex min-h-[92px] items-center justify-between gap-3 rounded-lg border px-4 py-4 text-left transition duration-150 focus-ring',
                  isActive
                        ? 'border-accent/30 bg-accent/5 text-text-primary shadow-lg'
                        : 'border-border-gray bg-bg-deep text-text-secondary hover:border-accent/25 hover:bg-bg-surface hover:text-text-primary'
                )}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition',
                      isActive
                      ? 'border-accent/25 bg-accent/5 text-accent'
                        : 'border-border-gray bg-bg-surface text-text-tertiary group-hover:text-accent'
                    )}
                  >
                    <RoleIcon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-text-tertiary">
                      {item.details[0]}
                    </span>
                  </span>
                </span>
                <span
                  className={cn(
                    'shrink-0 rounded-md border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]',
                    isActive
                        ? 'border-accent/25 bg-accent/5 text-accent'
                      : 'border-border-gray bg-bg-surface text-text-tertiary'
                  )}
                >
                  {isActive ? 'Open' : 'View'}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div
        id="role-panel"
        role="tabpanel"
        className="grid gap-px bg-border-gray md:grid-cols-[0.95fr_1.05fr]"
      >
        <div className="bg-bg-deep p-6 md:p-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-accent/15 bg-accent/5 text-accent">
            <ActiveIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-text-primary">
            {active.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-text-secondary">{active.description}</p>
        </div>
        <div className="surface-gradient-panel p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            What they do
          </p>
          <div className="mt-5 grid gap-3">
            {active.details.map((detail, index) => (
              <div
                key={detail}
                className="flex items-center gap-3 rounded-lg border border-border-gray bg-bg-deep p-3"
              >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-accent/15 bg-accent/5 text-xs font-semibold text-accent">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-text-primary">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
