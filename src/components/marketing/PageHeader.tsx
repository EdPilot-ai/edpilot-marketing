import * as React from 'react'
import { Container } from './Container'

export interface PageHeaderProps {
  /** Small label rendered above the title (e.g. "Legal", "Resources"). */
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  meta?: React.ReactNode
}

/**
 * Compact page header used by legal, resource, and other long-form content
 * pages — flush against the navbar, no hero glow.
 */
export function PageHeader({ eyebrow, title, description, meta }: PageHeaderProps) {
  return (
    <header className="border-b border-border-gray pt-20 pb-12">
      <Container size="lg">
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl md:text-[2.5rem] font-bold text-text-primary tracking-[-0.025em] leading-[1.15]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-text-secondary text-[15px] leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
        {meta && <div className="mt-4 text-text-secondary text-sm">{meta}</div>}
      </Container>
    </header>
  )
}
