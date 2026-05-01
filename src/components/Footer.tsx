'use client'

import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { BrandMark } from '@/components/BrandMark'

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-[#27272A] bg-[#0F0F12]">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-5 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <BrandMark
                size={28}
                className="group-hover:scale-105 transition-transform duration-150"
              />
              <span className="text-sm font-semibold text-text-primary tracking-[-0.01em]">
                EdPilot
              </span>
            </Link>
            <p className="text-text-secondary text-xs leading-relaxed max-w-[180px]">
              AI-powered tools for professors and students.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-text-secondary hover:text-text-primary transition-colors duration-150 text-xs"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products/curriculum-intelligence"
                  className="text-text-secondary hover:text-text-primary transition-colors duration-150 text-xs"
                >
                  Curriculum Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-4">
              Learn
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/learn"
                  className="text-text-secondary hover:text-text-primary transition-colors duration-150 text-xs"
                >
                  All Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/learn/statistics-101"
                  className="text-text-secondary hover:text-text-primary transition-colors duration-150 text-xs"
                >
                  Statistics 101
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
                { href: '/blog', label: 'Blog' },
                { href: '/faq', label: 'FAQ' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary transition-colors duration-150 text-xs"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@empowered.ai"
                  className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors duration-150 text-xs"
                >
                  <Mail className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                  support@empowered.ai
                </a>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors duration-150 text-xs"
                >
                  <Phone className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                  (555) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#27272A] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#9898A3] text-xs">
            &copy; {new Date().getFullYear()} EdPilot. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { href: '/privacy-policy', label: 'Privacy' },
              { href: '/terms', label: 'Terms' },
              { href: '/accessibility', label: 'Accessibility' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#9898A3] hover:text-text-primary transition-colors duration-150 text-xs"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
