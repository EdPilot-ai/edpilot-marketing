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
        surface === 'deep' && 'border-y bg-[#0F0F12]',
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
          className="rounded-lg border border-border-gray bg-[#0F0F12] p-4 transition-colors hover:border-border-strong md:p-5"
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
                    <p className="rounded-lg border border-border-gray bg-[#0F0F12] p-3 text-text-secondary">
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
