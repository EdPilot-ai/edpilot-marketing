import * as React from 'react'
import { Quote as QuoteIcon } from 'lucide-react'
import { Container } from './Container'

export interface QuoteSectionProps {
  quote: React.ReactNode
  authorName: string
  authorTitle: string
  initials?: string
}

export function QuoteSection({ quote, authorName, authorTitle, initials }: QuoteSectionProps) {
  const fallbackInitials = authorName
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')

  return (
    <section className="py-20 bg-[#0F0F12] border-y border-border-gray">
      <Container size="md" className="text-center">
        <QuoteIcon className="w-7 h-7 text-accent/40 mx-auto mb-5" aria-hidden="true" />
        <p className="text-xl md:text-[1.375rem] font-medium text-text-primary leading-[1.55] mb-7">
          {quote}
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
            <span className="text-[11px] font-bold text-accent">{initials ?? fallbackInitials}</span>
          </div>
          <div className="text-left">
            <p className="text-[13px] font-semibold text-text-primary">{authorName}</p>
            <p className="text-[12px] text-text-secondary">{authorTitle}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
