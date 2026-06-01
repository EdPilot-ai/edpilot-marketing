import { ImageResponse } from 'next/og'

// Apple touch icon (home-screen / bookmark icon on iOS & macOS Safari).
// Same artwork as icon.tsx, rendered at 180x180 PNG. Kept in sync with
// edpilot-app/src/app/apple-icon.tsx.

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

const ICON_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none" shape-rendering="geometricPrecision" role="img" aria-label="EdPilot">` +
  `<defs><linearGradient id="edpilot-favicon-tile" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">` +
  `<stop stop-color="#8B5CF6"/><stop offset="1" stop-color="#6D28D9"/></linearGradient></defs>` +
  `<rect width="64" height="64" rx="15" fill="url(#edpilot-favicon-tile)"/>` +
  `<g transform="translate(13 17) scale(0.38)">` +
  `<path d="M90 8 L8 36 L48 48 Z" fill="white" stroke-linejoin="round"/>` +
  `<path d="M90 8 L48 48 L50 80 Z" fill="white" opacity="0.7" stroke-linejoin="round"/>` +
  `<path d="M90 8 L48 48 L50 80" stroke="rgba(255,255,255,0.28)" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` +
  `</g></svg>`

export default function AppleIcon() {
  return new ImageResponse(
    (
      <img
        width={size.width}
        height={size.height}
        src={`data:image/svg+xml;base64,${Buffer.from(ICON_SVG).toString('base64')}`}
        alt=""
      />
    ),
    { ...size },
  )
}
