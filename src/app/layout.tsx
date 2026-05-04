import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { OrganizationSchema, SoftwareApplicationSchema } from '@/components/StructuredData'
import './globals.css'

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'EdPilot — Course-specific AI for higher education',
    template: '%s · EdPilot',
  },
  description:
    'EdPilot is the course-specific AI teaching assistant built from your syllabus and controlled by your faculty. Trusted by professors, designed for institutions.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_MARKETING_URL ?? 'https://edpilot.com'),
  openGraph: {
    title: 'EdPilot — Course-specific AI for higher education',
    description:
      'Built from your syllabus. Controlled by your faculty. Every answer comes from your course, not the internet.',
    type: 'website',
    siteName: 'EdPilot',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="flex min-h-screen flex-col bg-bg-page">
        <OrganizationSchema />
        <SoftwareApplicationSchema />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
