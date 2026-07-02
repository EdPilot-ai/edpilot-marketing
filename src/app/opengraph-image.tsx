import { ImageResponse } from 'next/og'
import { designTokens } from '@/lib/design-tokens'

export const alt = 'EdPilot: Faculty-controlled AI teaching assistants for real courses'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background:
          `radial-gradient(1000px 600px at 78% -10%, rgba(139,92,246,0.30), transparent 60%), ${designTokens.bgPage}`,
        padding: '72px 80px',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Brand lockup */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <svg width="56" height="50" viewBox="0 0 100 90" fill="none">
          <path d="M90 8 L48 48 L50 80 Z" fill={designTokens.brandMarkFuse} />
          <path d="M90 8 L8 36 L48 48 Z" fill={designTokens.accent} />
        </svg>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: designTokens.textPrimary,
            letterSpacing: '-0.01em',
          }}
        >
          EdPilot
        </div>
      </div>

      {/* Headline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: designTokens.textPrimary,
            maxWidth: 980,
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          Faculty-controlled AI teaching assistants&nbsp;
          <span style={{ color: designTokens.accent }}>for real courses.</span>
        </div>
        <div
          style={{
            fontSize: 30,
            lineHeight: 1.35,
            color: designTokens.textSecondary,
            maxWidth: 920,
          }}
        >
          AI support grounded in course materials, governed by faculty, and ready for institutional
          review.
        </div>
      </div>

      {/* Footer row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          fontSize: 24,
          color: designTokens.textTertiary,
          borderTop: `1px solid ${designTokens.borderGray}`,
          paddingTop: 28,
        }}
      >
        <span style={{ color: designTokens.textSecondary }}>edpilot.ai</span>
        <span>·</span>
        <span>Course-grounded</span>
        <span>·</span>
        <span>FERPA-aware</span>
        <span>·</span>
        <span>Cites sources</span>
      </div>
    </div>,
    { ...size },
  )
}
