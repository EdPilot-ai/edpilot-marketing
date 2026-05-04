'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container, Section, Hero, Eyebrow } from '@/components/marketing'
import { ALL_CATEGORIES, blogPosts, getFeaturedPost } from '@/lib/blog-data'
import type { BlogCategory } from '@/lib/blog-data'
import { cn } from '@/lib/utils'

function CategoryPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full border transition-all whitespace-nowrap',
        active
          ? 'bg-accent text-white border-accent'
          : 'bg-transparent text-text-secondary border-border-gray hover:border-accent/40 hover:text-text-primary'
      )}
    >
      {label}
      <span
        className={cn(
          'text-[10px] font-semibold px-1.5 py-0.5 rounded-full transition-colors',
          active ? 'bg-white/20 text-white' : 'bg-bg-elevated text-text-secondary'
        )}
      >
        {count}
      </span>
    </button>
  )
}

function AuthorAvatar({ name, size = 'sm' }: { name: string; size?: 'sm' | 'md' }) {
  const dims = size === 'sm' ? 'w-6 h-6 text-[10px]' : 'w-9 h-9 text-xs'
  return (
    <div
      className={cn(
        'bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0',
        dims
      )}
    >
      <span className="text-accent font-semibold">{name.charAt(0)}</span>
    </div>
  )
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'All'>('All')
  const [query, setQuery] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const featured = getFeaturedPost()

  const counts = useMemo(() => {
    const nonFeatured = blogPosts.filter((p) => !p.featured)
    const map: Record<string, number> = { All: nonFeatured.length }
    for (const cat of ALL_CATEGORIES) {
      map[cat] = nonFeatured.filter((p) => p.category === cat).length
    }
    return map
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return blogPosts.filter((post) => {
      if (post.featured) return false
      if (activeCategory !== 'All' && post.category !== activeCategory) return false
      if (!q) return true
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q)
      )
    })
  }, [activeCategory, query])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <>
      <Hero
        eyebrow="Blog"
        titleNode={
          <>
            <span className="text-text-primary">Insights on AI in </span>
            <span className="text-accent">higher education.</span>
          </>
        }
        description="Perspectives on AI governance, curriculum intelligence, academic integrity, and the evolving role of faculty."
      />

      {/* Sticky filter bar */}
      <div className="sticky top-14 z-30 bg-bg-page/85 backdrop-blur-md border-y border-border-gray">
        <Container size="lg" className="py-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative w-full sm:w-64 flex-shrink-0">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles…"
                aria-label="Search articles"
                className="w-full pl-8 pr-8 py-2 rounded-lg bg-bg-surface border border-border-gray text-text-primary text-[13px] placeholder:text-text-secondary/60 focus:outline-none focus:border-accent transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div
              className="flex items-center gap-2 overflow-x-auto pb-0.5 flex-1"
              role="group"
              aria-label="Filter articles by category"
            >
              <CategoryPill
                label="All"
                count={counts.All ?? 0}
                active={activeCategory === 'All'}
                onClick={() => setActiveCategory('All')}
              />
              {ALL_CATEGORIES.map((cat) => (
                <CategoryPill
                  key={cat}
                  label={cat}
                  count={counts[cat] ?? 0}
                  active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                />
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Featured post — only when no filter active */}
      <Container size="lg" className="pt-14">
        {activeCategory === 'All' && !query && (
          <div className="mb-14">
            <Eyebrow className="mb-5">Featured</Eyebrow>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <article className="relative overflow-hidden rounded-2xl border border-border-gray bg-bg-surface p-8 md:p-10 transition-all hover:border-accent/40">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 right-0 w-72 h-72 bg-accent/[0.05] rounded-full blur-[80px]"
                />
                <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-accent bg-accent/10 rounded-md px-2.5 py-1 mb-4">
                      {featured.category}
                    </span>
                    <h2 className="text-2xl md:text-[1.625rem] font-semibold text-text-primary leading-snug tracking-[-0.015em] group-hover:text-accent transition-colors mb-3">
                      {featured.title}
                    </h2>
                    <p className="text-text-secondary text-[14px] leading-relaxed mb-6 max-w-xl">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <AuthorAvatar name={featured.author.name} size="md" />
                      <div>
                        <p className="text-text-primary text-[13px] font-semibold leading-none">
                          {featured.author.name}
                        </p>
                        <p className="text-text-secondary text-[12px] mt-0.5">
                          {featured.author.title}
                        </p>
                      </div>
                      <span className="text-border-gray" aria-hidden="true">
                        ·
                      </span>
                      <span className="text-text-secondary text-[12px]">
                        {featured.readingTime} min read
                      </span>
                    </div>
                  </div>

                  <Button>
                    Read article
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* Article grid */}
        <div className="pb-16">
          <p className="text-text-secondary text-[12px] mb-6">
            {filtered.length === 0
              ? 'No articles found'
              : filtered.length === 1
                ? '1 article'
                : `${filtered.length} articles`}
            {query && (
              <span className="ml-1">
                for <span className="text-text-primary font-medium">“{query}”</span>
              </span>
            )}
          </p>

          {filtered.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="h-full flex flex-col rounded-2xl border border-border-gray bg-bg-surface p-6 transition-all hover:border-accent/35">
                    <span className="self-start inline-block text-[10px] font-semibold uppercase tracking-widest text-accent bg-accent/10 rounded-md px-2 py-0.5 mb-4">
                      {post.category}
                    </span>
                    <h3 className="text-[15px] font-semibold text-text-primary leading-snug tracking-[-0.005em] group-hover:text-accent transition-colors line-clamp-2 mb-2.5">
                      {post.title}
                    </h3>
                    <p className="text-text-secondary text-[13px] leading-relaxed line-clamp-3 flex-1 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-border-gray">
                      <div className="flex items-center gap-2 min-w-0">
                        <AuthorAvatar name={post.author.name} />
                        <span className="text-text-primary text-[12px] font-medium truncate">
                          {post.author.name.split(' ')[0]}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-text-secondary text-[12px] flex-shrink-0">
                        <span>{post.readingTime} min</span>
                        <ArrowRight
                          className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-5 h-5 text-accent" aria-hidden="true" />
              </div>
              <p className="text-text-primary font-semibold mb-1.5">No articles found</p>
              <p className="text-text-secondary text-[13px] max-w-xs">
                {query
                  ? `No results for “${query}”. Try a different search or clear the filter.`
                  : 'Articles in this category are coming soon.'}
              </p>
              {(query || activeCategory !== 'All') && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setActiveCategory('All')
                  }}
                  className="mt-4 text-accent text-[13px] font-medium hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </Container>

      {/* Newsletter */}
      <Section surface="sunken" spacing="md">
        <Container size="sm" className="text-center">
          <h2 className="text-2xl md:text-[1.75rem] font-bold text-text-primary tracking-[-0.025em] mb-3">
            Stay ahead of AI in higher education.
          </h2>
          <p className="text-text-secondary text-[14px] leading-relaxed mb-7 max-w-md mx-auto">
            New perspectives delivered to professors and administrators shaping institutional AI
            policy.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent/10 border border-accent/20 text-accent text-[13px] font-medium">
              You’re subscribed — thank you.
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2.5 max-w-sm mx-auto"
              aria-label="Newsletter subscription"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@university.edu"
                required
                autoComplete="email"
                className="flex-1 px-4 py-2.5 rounded-lg bg-bg-surface border border-border-gray text-text-primary text-[13px] placeholder:text-text-secondary/60 focus:outline-none focus:border-accent transition-colors"
              />
              <Button type="submit" className="whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          )}

          <p className="text-text-secondary text-[11px] mt-4">No spam. Unsubscribe at any time.</p>
        </Container>
      </Section>
    </>
  )
}
