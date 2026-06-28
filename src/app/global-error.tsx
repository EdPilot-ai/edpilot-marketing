'use client'

import { useEffect } from 'react'
import { designTokens } from '@/lib/design-tokens'

/**
 * global-error replaces the root layout when an error is thrown in the layout
 * itself, so it must render its own <html>/<body> and cannot rely on the
 * Tailwind globals (those are imported by the root layout it replaces).
 * Styles are inlined to stay on-brand without that stylesheet.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: designTokens.bgPage,
          color: designTokens.textPrimary,
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: 460, textAlign: 'center' }}>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: designTokens.accent,
            }}
          >
            Something went wrong
          </p>
          <h1
            style={{
              margin: '16px 0 0',
              fontSize: 32,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              fontWeight: 600,
            }}
          >
            We hit an unexpected error.
          </h1>
          <p
            style={{
              margin: '20px 0 0',
              fontSize: 16,
              lineHeight: 1.7,
              color: designTokens.textSecondary,
            }}
          >
            This one is on us. Try reloading the page.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            onBlur={(event) => {
              event.currentTarget.style.outline = '2px solid transparent'
            }}
            onFocus={(event) => {
              event.currentTarget.style.outline = `2px solid ${designTokens.accent}`
            }}
            style={{
              marginTop: 32,
              cursor: 'pointer',
              borderRadius: 8,
              border: 'none',
              backgroundColor: designTokens.accentHover,
              color: designTokens.white,
              fontSize: 14,
              fontWeight: 500,
              minHeight: 44,
              outline: '2px solid transparent',
              outlineOffset: 3,
              padding: '12px 28px',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
