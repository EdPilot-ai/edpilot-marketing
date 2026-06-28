import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base: font-medium (500) instead of font-semibold — less heavy for button labels.
  // tracking-[0.01em]: slight positive tracking improves legibility on small caps.
  // active:scale/translate: tactile press feedback without layout disruption.
  // transition-all at 150ms covers color, shadow, scale, translate in one declaration.
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg',
    'text-sm font-medium tracking-[0.01em]',
    'ring-offset-background',
    'transition-all duration-150 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.98] active:translate-y-px',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    'select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        // Primary — edpilot violet.
        default: 'bg-accent-hover text-white hover:bg-accent shadow-sm shadow-violet-900/30',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/85 shadow-sm',
        outline:
          'border border-border-strong bg-transparent text-text-primary hover:bg-bg-elevated hover:border-accent/30',
        secondary:
          'bg-bg-elevated text-text-primary border border-border-gray hover:bg-bg-surface hover:border-border-strong',
        ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-4 py-2',
        sm: 'h-11 rounded-lg px-4 text-sm',
        lg: 'h-11 rounded-lg px-7 text-sm',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
