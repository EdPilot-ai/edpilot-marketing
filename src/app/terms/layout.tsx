import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: "The terms that govern your use of EdPilot's website and services.",
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
