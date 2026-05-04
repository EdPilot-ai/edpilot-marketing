import * as React from 'react'
import { cn } from '@/lib/utils'

type Size = 'sm' | 'md' | 'lg' | 'xl'

const SIZE_TO_MAX_WIDTH: Record<Size, string> = {
  sm: 'max-w-2xl',
  md: 'max-w-3xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
}

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size
  as?: keyof React.JSX.IntrinsicElements
}

export function Container({
  size = 'lg',
  as: Tag = 'div',
  className,
  ...rest
}: ContainerProps) {
  const Component = Tag as React.ElementType
  return (
    <Component
      className={cn('mx-auto w-full px-6', SIZE_TO_MAX_WIDTH[size], className)}
      {...rest}
    />
  )
}
