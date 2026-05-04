import * as React from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'featured' | 'muted'

const VARIANT_CLASSES: Record<Variant, string> = {
  default:
    'border-border-gray bg-bg-surface hover:border-[#3f3f46] hover:bg-[#1d1d21]',
  featured:
    'border-accent/25 bg-gradient-to-br from-[#1a0f2e] to-[#0F0F12] hover:border-accent/40',
  muted: 'border-border-gray bg-[#0F0F12] opacity-60',
}

export interface FeatureCardProps {
  icon?: LucideIcon
  /** Pill shown next to the title (e.g. "Core", "New"). */
  badge?: string
  title: React.ReactNode
  description?: React.ReactNode
  /** Used by step cards. */
  step?: string
  variant?: Variant
  className?: string
  children?: React.ReactNode
}

export function FeatureCard({
  icon: Icon,
  badge,
  title,
  description,
  step,
  variant = 'default',
  className,
  children,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border p-6 transition-all duration-200',
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {variant === 'featured' && (
        <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-accent/[0.08] rounded-full blur-[80px]" />
      )}

      <div className="relative">
        {(Icon || step) && (
          <div className="flex items-center justify-between mb-5">
            {Icon && (
              <div className="w-11 h-11 bg-accent/[0.12] rounded-xl flex items-center justify-center ring-1 ring-accent/25">
                <Icon className="w-[18px] h-[18px] text-accent" aria-hidden="true" />
              </div>
            )}
            {step && (
              <span className="text-sm font-bold text-accent/50 tabular-nums">{step}</span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="text-[15px] font-semibold text-text-primary tracking-[-0.005em]">
            {title}
          </h3>
          {badge && (
            <span className="text-[10px] font-semibold uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>

        {description && (
          <p className="text-text-secondary text-[14px] leading-relaxed">{description}</p>
        )}

        {children}
      </div>
    </div>
  )
}
