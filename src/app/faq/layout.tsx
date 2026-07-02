import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ: Common questions about EdPilot',
  description:
    'Answers to common questions about EdPilot: how course-grounded AI works, FERPA and data handling, faculty controls, Canvas and LMS integration, pilots, and rollout.',
  keywords:
    'EdPilot FAQ, course-grounded AI questions, FERPA AI, faculty controls, Canvas integration FAQ',
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children
}
