import Link from 'next/link'
import type { ElementType, ReactNode } from 'react'
import { ArrowRight, CheckCircle2, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SIGN_UP_URL } from '@/lib/marketing'

type Action = {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

export function PageShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('min-h-screen bg-bg-page text-text-primary', className)}>
      {children}
    </div>
  )
}

export function Section({
  children,
  className,
  surface = 'page',
  id,
}: {
  children: ReactNode
  className?: string
  surface?: 'page' | 'panel' | 'deep'
  id?: string
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden border-border-gray',
        surface === 'panel' && 'border-y bg-bg-surface',
        surface === 'deep' && 'border-y bg-bg-deep',
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />
      {children}
    </section>
  )
}

export function Container({
  children,
  className,
  size = 'default',
}: {
  children: ReactNode
  className?: string
  size?: 'narrow' | 'default' | 'wide'
}) {
  return (
    <div
      className={cn(
        'container mx-auto px-6',
        size === 'narrow' && 'max-w-3xl',
        size === 'default' && 'max-w-5xl',
        size === 'wide' && 'max-w-6xl',
        className
      )}
    >
      {children}
    </div>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'mb-10',
        align === 'center' && 'mx-auto max-w-2xl text-center',
        align === 'left' && 'max-w-2xl',
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-text-primary md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-7 text-text-secondary md:text-base">
          {description}
        </p>
      )}
    </div>
  )
}

export function Hero({
  eyebrow,
  title,
  accent,
  description,
  actions,
  children,
  className,
  align = 'center',
}: {
  eyebrow?: string
  title: ReactNode
  accent?: ReactNode
  description?: ReactNode
  actions?: Action[]
  children?: ReactNode
  className?: string
  align?: 'left' | 'center'
}) {
  return (
    <Section className={cn('pt-24 pb-16 md:pt-32 md:pb-24', className)}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.18),rgba(20,20,22,0)_60%)]"
        aria-hidden="true"
      />
      <Container size="wide" className="relative z-10">
        <div
          className={cn(
            align === 'center' && 'mx-auto max-w-3xl text-center',
            align === 'left' && 'max-w-3xl'
          )}
        >
          {eyebrow && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </p>
          )}
          <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-text-primary md:text-7xl">
            {title}
            {accent && <span className="text-accent"> {accent}</span>}
          </h1>
          {description && (
            <p
              className={cn(
                'mt-6 text-base leading-8 text-text-secondary md:text-lg',
                align === 'center' && 'mx-auto max-w-2xl'
              )}
            >
              {description}
            </p>
          )}
          {actions && actions.length > 0 && (
            <div
              className={cn(
                'mt-9 flex flex-col gap-3 sm:flex-row',
                align === 'center' && 'items-center justify-center',
                align === 'left' && 'items-stretch sm:items-center'
              )}
            >
              {actions.map((action) => (
                <Button
                  key={action.href + action.label}
                  asChild
                  size="lg"
                  variant={action.variant === 'secondary' ? 'outline' : 'default'}
                  className="h-11 px-7"
                >
                  <Link href={action.href}>
                    {action.label}
                    {action.variant !== 'secondary' && <ArrowRight aria-hidden="true" />}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
        {children}
      </Container>
    </Section>
  )
}

export function IconChip({
  icon: Icon,
  className,
}: {
  icon: ElementType
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent',
        className
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </div>
  )
}

export function FeatureCard({
  icon,
  title,
  description,
  children,
  className,
  featured = false,
}: {
  icon?: ElementType
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  className?: string
  featured?: boolean
}) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg border border-border-gray bg-bg-surface p-4 transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-[#1d1d22] hover:shadow-[0_18px_50px_rgba(0,0,0,0.24)] md:p-5',
        featured && 'border-accent/30 bg-[linear-gradient(135deg,rgba(139,92,246,0.14),rgba(24,24,27,0.96)_48%,rgba(15,15,18,1))]',
        className
      )}
    >
      <div className={cn('flex items-start gap-3', !icon && 'block')}>
        {icon && <IconChip icon={icon} className="h-9 w-9" />}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold leading-6 tracking-[-0.01em] text-text-primary">
            {title}
          </h3>
          {description && (
            <p className="mt-1.5 text-[13px] leading-6 text-text-secondary">{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3 text-sm leading-6 text-text-secondary">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function TrustBar({
  items,
  className,
}: {
  items: Array<{ icon?: ElementType; label: string; detail: string }>
  className?: string
}) {
  return (
    <div className={cn('grid gap-4 md:grid-cols-3', className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-lg border border-border-gray bg-bg-deep p-4 transition-colors hover:border-border-strong md:p-5"
        >
          <div className="flex items-start gap-3">
            {item.icon && <IconChip icon={item.icon} className="h-9 w-9" />}
            <div className={cn('min-w-0 flex-1', !item.icon && 'text-center')}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-primary">
                {item.label}
              </p>
              <p className="mt-2 text-xs leading-5 text-text-secondary">{item.detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function StatusPill({
  children,
  tone = 'live',
}: {
  children: ReactNode
  tone?: 'live' | 'beta' | 'planned'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]',
        tone === 'live' && 'border-green-400/20 bg-green-400/10 text-green-300',
        tone === 'beta' && 'border-amber-300/20 bg-amber-300/10 text-amber-200',
        tone === 'planned' && 'border-border-gray bg-bg-deep text-text-tertiary'
      )}
    >
      {children}
    </span>
  )
}

export function CourseAssistantMockup({ className }: { className?: string }) {
  return (
    <div className={cn('mx-auto max-w-6xl', className)}>
      <div className="overflow-hidden rounded-lg border border-border-gray bg-bg-deep shadow-[0_34px_100px_rgba(0,0,0,0.45)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-gray bg-bg-surface px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-text-tertiary">
            <span className="rounded-md border border-border-gray bg-bg-deep px-2 py-1">
              BIO 214
            </span>
            <span>Cell Signaling and Disease</span>
          </div>
        </div>
        <div className="grid lg:grid-cols-[260px_minmax(0,1fr)_280px]">
          <aside className="border-b border-border-gray bg-bg-surface/70 p-4 lg:border-b-0 lg:border-r">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Course Model
            </p>
            <div className="space-y-3">
              {[
                ['Syllabus', '12 policies indexed'],
                ['Week 6 slides', '48 concepts mapped'],
                ['Rubric', '4 criteria active'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border-gray bg-bg-deep p-3">
                  <p className="text-xs font-semibold text-text-primary">{label}</p>
                  <p className="mt-1 text-[11px] text-text-secondary">{value}</p>
                </div>
              ))}
            </div>
          </aside>

          <div className="min-w-0 p-4 md:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  Student Workspace
                </p>
                <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-text-primary">
                  The answer stays inside the course.
                </h3>
              </div>
              <StatusPill>Cites sources</StatusPill>
            </div>
            <div className="space-y-4">
              <div className="ml-auto max-w-md rounded-lg border border-accent/25 bg-accent/15 px-4 py-3 text-sm leading-6 text-text-primary">
                Why does receptor desensitization matter in long-term treatment?
              </div>
              <div className="rounded-lg border border-border-gray bg-bg-surface px-4 py-4 text-sm leading-7 text-text-secondary">
                Receptor desensitization means the cell responds less after repeated exposure to a
                signal. In this course, Professor Rivera connects it to dosage planning: the same
                signal can produce a weaker effect over time, so treatment has to account for
                changing responsiveness.
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {['Week 6 slides, frames 18-21', 'Case note: beta blockers, p. 3'].map(
                    (source, index) => (
                      <span
                        key={source}
                        className="inline-flex max-w-full items-center gap-2 rounded-md border border-accent/20 bg-accent/10 px-2.5 py-1.5 text-[11px] font-medium text-accent"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-accent/20 text-[10px]">
                          {index + 1}
                        </span>
                        <span className="truncate">{source}</span>
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {['Ask a follow-up', 'Generate practice', 'Show misconception'].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className="rounded-md border border-border-gray bg-bg-deep px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="border-t border-border-gray bg-bg-surface p-4 lg:border-l lg:border-t-0">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Faculty Controls
            </p>
            <div className="space-y-3">
              {[
                ['Integrity mode', 'Guide, do not complete'],
                ['Outside knowledge', 'Off for students'],
                ['Citation policy', 'Required'],
                ['Assessment help', 'Hints only'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border-gray bg-bg-deep p-3">
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

export function RoleValueGrid({
  items,
  className,
}: {
  items: Array<{ role: string; promise: string; detail: string; icon?: ElementType }>
  className?: string
}) {
  return (
    <div className={cn('grid gap-4 md:grid-cols-3', className)}>
      {items.map((item) => (
        <div key={item.role} className="rounded-lg border border-border-gray bg-bg-surface p-5">
          <div className="flex items-center gap-3">
            {item.icon && <IconChip icon={item.icon} className="h-9 w-9" />}
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {item.role}
            </p>
          </div>
          <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-text-primary">
            {item.promise}
          </h3>
          <p className="mt-3 text-sm leading-7 text-text-secondary">{item.detail}</p>
        </div>
      ))}
    </div>
  )
}

export function WorkflowSteps({
  steps,
  className,
}: {
  steps: Array<{ step: string; title: string; description: string; icon?: ElementType }>
  className?: string
}) {
  return (
    <div className={cn('grid gap-3 md:grid-cols-4', className)}>
      {steps.map((item) => (
        <div key={item.step} className="relative rounded-lg border border-border-gray bg-bg-deep p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-accent/70">{item.step}</span>
            {item.icon && <IconChip icon={item.icon} className="h-8 w-8" />}
          </div>
          <h3 className="text-sm font-semibold leading-6 text-text-primary">{item.title}</h3>
          <p className="mt-2 text-[13px] leading-6 text-text-secondary">{item.description}</p>
        </div>
      ))}
    </div>
  )
}

export function ProofPanel({
  items,
  className,
}: {
  items: Array<{ label: string; detail: string; icon?: ElementType }>
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border-gray bg-[linear-gradient(135deg,rgba(255,255,255,0.035),rgba(15,15,18,0.96))] p-5 md:p-7',
        className
      )}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="flex gap-3">
            {item.icon && <IconChip icon={item.icon} className="h-9 w-9" />}
            <div>
              <p className="text-sm font-semibold text-text-primary">{item.label}</p>
              <p className="mt-1 text-[13px] leading-6 text-text-secondary">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SuiteMap({
  items,
  className,
}: {
  items: Array<{ title: string; status: 'live' | 'beta' | 'planned'; icon?: ElementType }>
  className?: string
}) {
  return (
    <div className={cn('rounded-lg border border-border-gray bg-bg-deep p-5 md:p-7', className)}>
      <div className="grid gap-4 lg:grid-cols-[1fr_220px_1fr] lg:items-center">
        <div className="grid gap-3">
          {items.slice(0, 3).map((item) => (
            <FeatureCard key={item.title} icon={item.icon} title={item.title} className="bg-bg-surface">
              <div className="mt-4">
                <StatusPill tone={item.status}>{item.status}</StatusPill>
              </div>
            </FeatureCard>
          ))}
        </div>
        <div className="rounded-lg border border-accent/30 bg-accent/10 p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            One Course Model
          </p>
          <p className="mt-3 text-sm leading-6 text-text-primary">
            Syllabus, lectures, readings, rubrics, policies, and outcomes stay synchronized.
          </p>
        </div>
        <div className="grid gap-3">
          {items.slice(3).map((item) => (
            <FeatureCard key={item.title} icon={item.icon} title={item.title} className="bg-bg-surface">
              <div className="mt-4">
                <StatusPill tone={item.status}>{item.status}</StatusPill>
              </div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CTABand({
  title,
  description,
  actions,
}: {
  title: ReactNode
  description: ReactNode
  actions: Action[]
}) {
  return (
    <Section className="py-20 md:py-28" surface="deep">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,15,18,1),rgba(25,18,38,0.74),rgba(15,15,18,1))]"
        aria-hidden="true"
      />
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl rounded-lg border border-border-gray bg-bg-surface/75 px-7 py-12 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur md:px-12">
          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.025em] text-text-primary md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-text-secondary md:text-base">
            {description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {actions.map((action) => (
              <Button
                key={action.href + action.label}
                asChild
                size="lg"
                variant={action.variant === 'secondary' ? 'outline' : 'default'}
                className="h-11 px-7"
              >
                <Link href={action.href}>
                  {action.label}
                  {action.variant !== 'secondary' && <ArrowRight aria-hidden="true" />}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export function ComparisonGrid({
  leftTitle,
  rightTitle,
  leftItems,
  rightItems,
}: {
  leftTitle: string
  rightTitle: string
  leftItems: string[]
  rightItems: string[]
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-border-gray bg-bg-surface p-6">
        <h3 className="mb-4 text-base font-semibold text-text-primary">{leftTitle}</h3>
        <ul className="space-y-3 text-sm leading-6 text-text-secondary">
          {leftItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-accent/35 bg-accent/10 p-6">
        <h3 className="mb-4 text-base font-semibold text-accent">{rightTitle}</h3>
        <ul className="space-y-3 text-sm leading-6 text-text-primary">
          {rightItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-lg border border-border-gray bg-bg-surface px-3.5 py-2 text-sm font-medium text-text-secondary transition-all hover:border-accent/45 hover:bg-accent/10 hover:text-text-primary focus-ring"
    >
      <ChevronLeft className="h-4 w-4 text-accent" aria-hidden="true" />
      {children}
    </Link>
  )
}

export function ComparisonDetail({
  eyebrow = 'Comparison',
  title,
  description,
  competitorName,
  competitorItems,
  edpilotItems,
  sections,
  scenarios,
}: {
  eyebrow?: string
  title: string
  description: string
  competitorName: string
  competitorItems: string[]
  edpilotItems: string[]
  sections: Array<{ title: string; body: ReactNode }>
  scenarios?: Array<{ setup: string; oldWay: string; edpilot: string }>
}) {
  return (
    <PageShell>
      <Hero
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={[
          { label: 'Request Demo', href: '/contact' },
          { label: 'Get Started Free', href: SIGN_UP_URL, variant: 'secondary' },
        ]}
        className="pb-14 md:pb-20"
      >
        <div className="mt-8 text-center">
          <BackLink href="/compare">Back to comparisons</BackLink>
        </div>
      </Hero>

      {scenarios && scenarios.length > 0 && (
        <Section className="py-16">
          <Container>
            <SectionHeader
              eyebrow="Real Moments"
              title="Where the difference becomes obvious."
              description="The best comparison is not a feature checklist. It is what happens on a Tuesday night before an exam."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.setup}
                  className="rounded-lg border border-border-gray bg-bg-surface p-5"
                >
                  <p className="text-sm font-semibold leading-6 text-text-primary">
                    {scenario.setup}
                  </p>
                  <div className="mt-4 space-y-3 text-[13px] leading-6">
                    <p className="rounded-lg border border-border-gray bg-bg-deep p-3 text-text-secondary">
                      <span className="font-semibold text-text-tertiary">Old way:</span>{' '}
                      {scenario.oldWay}
                    </p>
                    <p className="rounded-lg border border-accent/25 bg-accent/10 p-3 text-text-primary">
                      <span className="font-semibold text-accent">EdPilot:</span>{' '}
                      {scenario.edpilot}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section className="py-16" surface="panel">
        <Container>
          <ComparisonGrid
            leftTitle={competitorName}
            rightTitle="EdPilot"
            leftItems={competitorItems}
            rightItems={edpilotItems}
          />
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container size="narrow">
          <div className="space-y-5">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-lg border border-border-gray bg-bg-surface p-6"
              >
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-text-primary">
                  {section.title}
                </h2>
                <div className="mt-3 text-sm leading-7 text-text-secondary">{section.body}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        title="Bring institutional control to AI-assisted learning."
        description="See how EdPilot grounds AI in your courses, your policies, and your faculty governance."
        actions={[
          { label: 'Request Demo', href: '/contact' },
          { label: 'Get Started Free', href: SIGN_UP_URL, variant: 'secondary' },
        ]}
      />
    </PageShell>
  )
}

export function ProsePage({
  title,
  description,
  eyebrow,
  children,
}: {
  title: string
  description?: ReactNode
  eyebrow?: string
  children: ReactNode
}) {
  return (
    <PageShell>
      <Hero eyebrow={eyebrow} title={title} description={description} className="pb-12 md:pb-16" />
      <Container size="narrow" className="pb-20">
        <div className="prose-marketing">{children}</div>
      </Container>
    </PageShell>
  )
}
