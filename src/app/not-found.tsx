import Link from 'next/link'
import { ArrowRight, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container, PageShell, Section } from '@/components/marketing'

const quickLinks = [
  { href: '/products', label: 'Products' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function NotFound() {
  return (
    <PageShell>
      <Section className="pt-28 pb-24 md:pt-36 md:pb-32">
        <div
          className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          aria-hidden="true"
        />
        <Container size="narrow" className="relative z-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">404</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] text-text-primary md:text-5xl">
            This page took an unapproved path.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-8 text-text-secondary">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back
            to something grounded.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 px-7">
              <Link href="/">
                <Home aria-hidden="true" />
                Back to home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-7">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
          <div className="mt-12 border-t border-border-gray pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Popular pages
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-border-gray bg-bg-surface px-3.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent/30 hover:bg-bg-elevated hover:text-text-primary focus-ring"
                >
                  {link.label}
                  <ArrowRight className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  )
}
