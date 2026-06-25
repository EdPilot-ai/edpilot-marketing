import { Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Testimonial } from '@/lib/social-proof'

/**
 * A row of headline numbers. Pass only TRUE product facts (see
 * lib/social-proof.ts) — this is honest proof that doesn't require a customer
 * reference.
 */
export function StatBand({
  items,
  className,
}: {
  items: Array<{ value: string; label: string }>
  className?: string
}) {
  return (
    <dl
      className={cn(
        'grid gap-px overflow-hidden rounded-lg border border-border-gray bg-border-gray sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="bg-bg-deep p-6 text-center">
          <dt className="sr-only">{item.label}</dt>
          <dd className="text-3xl font-semibold tracking-[-0.03em] text-text-primary md:text-4xl">
            {item.value}
          </dd>
          <p className="mt-2 text-[11px] font-medium uppercase leading-5 tracking-[0.14em] text-text-tertiary">
            {item.label}
          </p>
        </div>
      ))}
    </dl>
  )
}

/**
 * An honest horizontal strip of positioning statements — used in place of
 * customer logos until real ones exist. These are claims about how the product
 * is built, not fabricated social proof.
 */
export function TrustStrip({ items, className }: { items: string[]; className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center',
        className
      )}
    >
      {items.map((item) => (
        <span
          key={item}
          className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

/**
 * Renders real testimonials. Returns null when there are none, so the live
 * site never shows placeholder quotes.
 */
export function Testimonials({
  quotes,
  className,
}: {
  quotes: Testimonial[]
  className?: string
}) {
  if (!quotes || quotes.length === 0) return null

  return (
    <div
      className={cn(
        'grid gap-4',
        quotes.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : 'mx-auto max-w-2xl',
        className
      )}
    >
      {quotes.map((quote) => (
        <figure
          key={`${quote.name}-${quote.institution}`}
          className="flex h-full flex-col rounded-lg border border-border-gray bg-bg-surface p-6"
        >
          <Quote className="h-5 w-5 text-accent" aria-hidden="true" />
          <blockquote className="mt-4 flex-1 text-sm leading-7 text-text-primary">
            {quote.quote}
          </blockquote>
          <figcaption className="mt-5 border-t border-border-gray pt-4">
            <p className="text-sm font-semibold text-text-primary">{quote.name}</p>
            <p className="mt-0.5 text-xs text-text-secondary">
              {quote.title}, {quote.institution}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
