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
        // Primary — edpilot violet. Hover lightens to #8B5CF6.
        default: 'bg-[#7C3AED] text-white hover:bg-[#8B5CF6] shadow-sm shadow-violet-900/30',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/85 shadow-sm',
        // Outline — explicit border so it's always visible against dark backgrounds.
        // #3d3d45 is intentionally lighter than border-gray (#27272A) for contrast.
        outline:
          'border border-[#3d3d45] bg-transparent text-text-primary hover:bg-bg-elevated hover:border-[#55566a]',
        // Secondary — low-contrast surface fill for supporting actions.
        secondary:
          'bg-bg-elevated text-text-primary border border-border-gray hover:bg-[#2a2a30] hover:border-[#3f3f46]',
        ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-lg px-3 text-xs',
        lg: 'h-11 rounded-lg px-7 text-sm',
        icon: 'h-9 w-9',
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
