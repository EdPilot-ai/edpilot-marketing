import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Higher education AI, done responsibly',
  description:
    'Essays on course-grounded AI, academic integrity, faculty control, and what AI infrastructure should look like inside the university.',
  keywords:
    'EdPilot blog, higher education AI, academic integrity, course-grounded AI, faculty AI policy',
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
