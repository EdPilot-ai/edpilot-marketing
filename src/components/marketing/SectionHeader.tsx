import * as React from 'react'
import { cn } from '@/lib/utils'
import { Eyebrow } from './Eyebrow'

type Align = 'left' | 'center'

export interface SectionHeaderProps {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  align?: Align
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl',
        className
      )}
    >
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <h2 className="text-3xl md:text-[2.25rem] font-bold text-text-primary tracking-[-0.025em] leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-text-secondary leading-relaxed text-[15px]',
            align === 'center' && 'mx-auto max-w-lg'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
