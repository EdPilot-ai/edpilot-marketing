import * as React from 'react'
import { cn } from '@/lib/utils'
import { Container } from './Container'
import { Eyebrow } from './Eyebrow'

export interface HeroProps {
  eyebrow?: React.ReactNode
  /** Plain string title — last word(s) accented automatically. Use `titleNode` for full control. */
  title?: string
  /** Number of trailing words to render in accent. Default: 1. */
  accentWords?: number
  /** Pre-built JSX title — overrides `title`. */
  titleNode?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  /** Optional content rendered below the actions (e.g. product preview, image). */
  children?: React.ReactNode
  align?: 'center' | 'left'
  className?: string
}

function AccentTitle({ title, accentWords = 1 }: { title: string; accentWords?: number }) {
  const words = title.split(' ')
  const cut = Math.max(0, words.length - accentWords)
  const lead = words.slice(0, cut).join(' ')
  const tail = words.slice(cut).join(' ')
  return (
    <>
      {lead && <span className="text-text-primary">{lead} </span>}
      <span className="text-accent">{tail}</span>
    </>
  )
}

export function Hero({
  eyebrow,
  title,
  titleNode,
  accentWords = 1,
  description,
  actions,
  children,
  align = 'center',
  className,
}: HeroProps) {
  return (
    <section className={cn('relative overflow-hidden pt-24 pb-20', className)}>
      {/* Ambient glow — single-source so every page has the same depth */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/[0.07] rounded-full blur-[130px]" />
        <div className="absolute top-32 left-[15%] w-[300px] h-[300px] bg-indigo-500/[0.04] rounded-full blur-[100px]" />
        <div className="absolute top-32 right-[15%] w-[300px] h-[300px] bg-purple-500/[0.04] rounded-full blur-[100px]" />
      </div>

      <Container size="xl" className="relative z-10">
        <div
          className={cn(
            'max-w-[720px]',
            align === 'center' ? 'mx-auto text-center' : ''
          )}
        >
          {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}

          <h1 className="text-4xl md:text-[3.5rem] lg:text-[3.75rem] font-bold leading-[1.05] tracking-[-0.03em]">
            {titleNode ?? (title ? <AccentTitle title={title} accentWords={accentWords} /> : null)}
          </h1>

          {description && (
            <p
              className={cn(
                'mt-6 text-[1.0625rem] text-text-secondary leading-[1.7] max-w-[520px]',
                align === 'center' && 'mx-auto'
              )}
            >
              {description}
            </p>
          )}

          {actions && (
            <div
              className={cn(
                'mt-8 flex flex-col sm:flex-row items-center gap-3',
                align === 'center' && 'justify-center'
              )}
            >
              {actions}
            </div>
          )}
        </div>

        {children && <div className="relative">{children}</div>}
      </Container>
    </section>
  )
}
