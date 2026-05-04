import * as React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from './Container'

export interface CTASectionProps {
  title: React.ReactNode
  description?: React.ReactNode
  primaryHref: string
  primaryLabel: string
  secondaryHref?: string
  secondaryLabel?: string
}

export function CTASection({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0F0F12] via-[#130d1f] to-[#0F0F12]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-700/10 rounded-full blur-[120px]" />

      <Container size="md" className="relative z-10 text-center">
        <h2 className="text-[2rem] md:text-[2.25rem] font-bold text-text-primary tracking-[-0.03em] leading-[1.15]">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-text-secondary text-[15px] leading-relaxed max-w-md mx-auto">
            {description}
          </p>
        )}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href={primaryHref} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 h-11 shadow-[0_0_28px_rgba(139,92,246,0.4)]"
            >
              {primaryLabel}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          {secondaryHref && secondaryLabel && (
            <Link href={secondaryHref} className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-11">
                {secondaryLabel}
              </Button>
            </Link>
          )}
        </div>
      </Container>
    </section>
  )
}
