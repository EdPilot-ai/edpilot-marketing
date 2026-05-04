import * as React from 'react'
import { cn } from '@/lib/utils'

export function Eyebrow({
  className,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-[11px] font-semibold uppercase tracking-[0.18em] text-accent',
        className
      )}
      {...rest}
    />
  )
}
