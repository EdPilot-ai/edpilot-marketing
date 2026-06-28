/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        // Edpilot Color Palette — Deep Charcoal + Violet Accent
        // Matches CSS variables in globals.css — keep in sync.
        // Canonical values from design-system SKILL.md (page/surface/border).
        'bg-page': '#141416',
        'bg-surface': '#18181B',
        'bg-elevated': '#222228',
        // Deepest surface — recessed panels, rails, and inset wells. Sits below
        // bg-page. Previously hardcoded as the `[#0F0F12]` arbitrary value in
        // 40+ places; promoted to a token to match the rest of the scale.
        'bg-deep': '#0F0F12',
        'border-gray': '#27272A',
        'border-strong': '#3d3d45',
        'text-primary': '#EDEDEF',
        'text-secondary': '#9D9DA8',
        'text-tertiary': '#6c6c78',
        'accent-soft': '#A78BFA',
        'accent-hover': '#7C3AED',
        'accent-press': '#6D28D9',
        'brand-mark-wing-light': '#C4B5FD',
        'brand-mark-fuse': '#4C1D95',
        'brand-mark-fuse-deep': '#2E1065',
        'brand-linkedin': '#0A66C2',
        'status-success': '#22C55E',
        'status-success-soft': '#86EFAC',
        'status-info': '#38BDF8',
        'status-warning': '#FBBF24',
        'status-warning-soft': '#FDE68A',
        'status-danger': '#F87171',
        'window-close': '#FF5F57',
        'window-minimize': '#FEBC2E',
        'window-maximize': '#28C840',

        // shadcn default colors (required)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        '2xl': 'calc(var(--radius) + 8px)',
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        // Inner fallback (ui-sans-serif) guards against an undefined --font-sans
        // making the whole declaration invalid before next/font hydrates.
        sans: ['var(--font-sans, ui-sans-serif)', 'Plus Jakarta Sans', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
