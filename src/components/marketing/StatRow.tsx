import * as React from 'react'
import type { LucideIcon } from 'lucide-react'
import { Container } from './Container'

export interface StatItem {
  icon?: LucideIcon
  label: string
  detail: string
}

export function StatRow({ items }: { items: StatItem[] }) {
  return (
    <section className="py-14 border-y border-border-gray">
      <Container size="lg">
        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-border-gray gap-8 md:gap-0">
          {items.map((item) => (
            <div key={item.label} className="md:px-8 text-center">
              {item.icon && (
                <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3 ring-1 ring-accent/20">
                  <item.icon className="w-4 h-4 text-accent" aria-hidden="true" />
                </div>
              )}
              <p className="text-[13px] font-semibold text-text-primary mb-1.5">{item.label}</p>
              <p className="text-text-secondary text-[13px] leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
