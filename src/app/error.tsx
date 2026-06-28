'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Home, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container, PageShell, Section } from '@/components/marketing'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Surface the error for monitoring without exposing internals to the user.
    console.error(error)
  }, [error])

  return (
    <PageShell>
      <Section className="pt-28 pb-24 md:pt-36 md:pb-32">
        <div
          className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          aria-hidden="true"
        />
        <Container size="narrow" className="relative z-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Something went wrong
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] text-text-primary md:text-5xl">
            We hit an unexpected error.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-8 text-text-secondary">
            This one is on us. Try again, and if it keeps happening, let us know and we&apos;ll take
            a look.
          </p>
          {error.digest && (
            <p className="mt-4 font-mono text-xs text-text-tertiary">Reference: {error.digest}</p>
          )}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={() => reset()} size="lg" className="h-11 px-7">
              <RotateCcw aria-hidden="true" />
              Try again
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-7">
              <Link href="/">
                <Home aria-hidden="true" />
                Back to home
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </PageShell>
  )
}
