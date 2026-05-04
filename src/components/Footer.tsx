import Link from 'next/link'
import { Mail } from 'lucide-react'
import { BrandMark } from '@/components/BrandMark'

const PRODUCT_LINKS = [
  { href: '/products', label: 'All products' },
  { href: '/products/curriculum-intelligence', label: 'Curriculum Intelligence' },
  { href: '/compare', label: 'Compare' },
]

const COMPANY_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
]

const LEGAL_LINKS = [
  { href: '/privacy-policy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/accessibility', label: 'Accessibility' },
]

const SUPPORT_EMAIL = 'support@edpilot.ai'

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string }[]
}) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-primary mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[13px] text-text-secondary hover:text-text-primary transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-border-gray bg-[#0F0F12] mt-auto">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2 group" aria-label="EdPilot home">
              <BrandMark size={24} />
              <span className="text-[15px] font-semibold text-text-primary tracking-[-0.01em]">
                EdPilot
              </span>
            </Link>
            <p className="mt-4 text-text-secondary text-[13px] leading-relaxed max-w-[260px]">
              Course-specific AI for higher education. Built from your syllabus, controlled by your
              faculty.
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-5 inline-flex items-center gap-2 text-[13px] text-text-secondary hover:text-text-primary transition-colors"
            >
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              {SUPPORT_EMAIL}
            </a>
          </div>

          {/* Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <FooterColumn title="Product" links={PRODUCT_LINKS} />
            <FooterColumn title="Company" links={COMPANY_LINKS} />
            <FooterColumn title="Legal" links={LEGAL_LINKS} />
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border-gray flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-text-secondary text-xs">
            © {new Date().getFullYear()} EdPilot, Inc. All rights reserved.
          </p>
          <p className="text-text-secondary text-xs">
            Built for higher education.
          </p>
        </div>
      </div>
    </footer>
  )
}
