import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How EdPilot collects, uses, and protects data, including our FERPA posture and institution-bound data boundaries.',
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
