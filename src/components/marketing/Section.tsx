import * as React from 'react'
import { cn } from '@/lib/utils'

type Surface = 'page' | 'sunken' | 'raised'
type Spacing = 'sm' | 'md' | 'lg' | 'xl'

const SURFACE_CLASSES: Record<Surface, string> = {
  page: '',
  sunken: 'bg-[#0F0F12] border-y border-border-gray',
  raised: 'bg-bg-surface border-y border-border-gray',
}

const SPACING_CLASSES: Record<Spacing, string> = {
  sm: 'py-12',
  md: 'py-16 md:py-20',
  lg: 'py-20 md:py-24',
  xl: 'py-24 md:py-32',
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  surface?: Surface
  spacing?: Spacing
}

export function Section({
  surface = 'page',
  spacing = 'lg',
  className,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(SURFACE_CLASSES[surface], SPACING_CLASSES[spacing], className)}
      {...rest}
    />
  )
}
