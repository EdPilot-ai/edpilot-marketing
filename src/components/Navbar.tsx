'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { BrandMark } from '@/components/BrandMark'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/compare', label: 'Compare' },
  { href: '/faq', label: 'FAQ' },
]

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.edpilot.com'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname?.startsWith(href))

  return (
    <header className="sticky top-0 z-40 border-b border-border-gray bg-[#0F0F12]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[#0F0F12]/70">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-text-primary"
          aria-label="EdPilot home"
        >
          <BrandMark size={24} />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">EdPilot</span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'text-[13px] transition-colors',
                  isActive(link.href)
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`${APP_URL}/signin`}
            className="text-[13px] text-text-secondary hover:text-text-primary transition-colors"
          >
            Sign in
          </a>
          <a href={`${APP_URL}/register`}>
            <Button size="sm">Get Started</Button>
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-text-primary p-1.5 -mr-1.5"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border-gray bg-[#0F0F12] md:hidden">
          <ul className="space-y-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block py-2 text-sm transition-colors',
                    isActive(link.href)
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={`${APP_URL}/signin`}
                className="block py-2 text-sm text-text-secondary hover:text-text-primary"
              >
                Sign in
              </a>
            </li>
            <li>
              <a href={`${APP_URL}/register`} className="block pt-2">
                <Button size="sm" className="w-full">
                  Get Started
                </Button>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
