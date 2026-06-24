'use client'

import { useEffect } from 'react'

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
          backgroundColor: '#141416',
          color: '#EDEDEF',
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
              color: '#8B5CF6',
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
          <p style={{ margin: '20px 0 0', fontSize: 16, lineHeight: 1.7, color: '#9D9DA8' }}>
            This one is on us. Try reloading the page.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 32,
              cursor: 'pointer',
              borderRadius: 8,
              border: 'none',
              backgroundColor: '#7C3AED',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 500,
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
