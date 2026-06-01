'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, m } from 'framer-motion'
import { ArrowRight, BookOpen, Search, X } from 'lucide-react'
import toast from 'react-hot-toast'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Container, Hero, PageShell, Section, SectionHeader } from '@/components/marketing'
import { ALL_CATEGORIES, blogPosts, getFeaturedPost } from '@/lib/blog-data'
import type { BlogCategory, BlogPost } from '@/lib/blog-data'
import { subscribeToNewsletter } from './actions'

type ActiveCategory = BlogCategory | 'All'

function CategoryButton({
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
      className={`inline-flex min-w-max items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors focus-ring ${
        active
          ? 'border-accent bg-accent text-white'
          : 'border-border-gray bg-[#0F0F12] text-text-secondary hover:border-border-strong hover:text-text-primary'
      }`}
    >
      {label}
      <span
        className={`rounded-md px-1.5 py-0.5 text-[10px] ${
          active ? 'bg-white/20 text-white' : 'bg-bg-surface text-text-tertiary'
        }`}
      >
        {count}
      </span>
    </button>
  )
}

function AuthorBadge({ post }: { post: BlogPost }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-xs font-semibold text-accent">
        {post.author.name.charAt(0)}
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-text-primary">{post.author.name}</p>
        <p className="text-[11px] text-text-tertiary">{post.readingTime} min read</p>
      </div>
    </div>
  )
}

function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full rounded-lg focus-ring">
      <article className="flex h-full flex-col rounded-lg border border-border-gray bg-bg-surface p-5 transition duration-200 hover:border-accent/35 hover:bg-[#1d1d22]">
        <span className="mb-4 w-fit rounded-md border border-accent/20 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
          {post.category}
        </span>
        <h3 className="line-clamp-2 text-base font-semibold leading-6 tracking-[-0.015em] text-text-primary transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-text-secondary">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-border-gray pt-4">
          <AuthorBadge post={post} />
          <ArrowRight
            className="h-4 w-4 text-accent opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>
      </article>
    </Link>
  )
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('All')
  const [query, setQuery] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)
  const featuredPost = getFeaturedPost()

  const categoryCounts = useMemo(() => {
    const nonFeatured = blogPosts.filter((post) => !post.featured)
    const counts: Partial<Record<ActiveCategory, number>> = { All: nonFeatured.length }
    for (const category of ALL_CATEGORIES) {
      counts[category] = nonFeatured.filter((post) => post.category === category).length
    }
    return counts
  }, [])

  const visibleCategories = useMemo(
    () =>
      ALL_CATEGORIES.map((category) => ({
        label: category,
        count: categoryCounts[category] ?? 0,
      })).filter((category) => category.count > 0),
    [categoryCounts]
  )

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return blogPosts.filter((post) => {
      if (post.featured) return false
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory
      const matchesSearch =
        !normalizedQuery ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery) ||
        post.author.name.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, query])

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!email.trim()) return

    setIsSubscribing(true)
    const result = await subscribeToNewsletter({ email })
    setIsSubscribing(false)

    if (result.success) {
      setSubscribed(true)
      setEmail('')
      return
    }

    toast.error(result.error || 'We could not receive your subscription. Please try again.')
  }

  return (
    <PageShell>
      <Hero
        eyebrow="Insights"
        title="AI in higher education,"
        accent="without the noise."
        description="Perspectives on AI governance, curriculum intelligence, academic integrity, and the evolving role of faculty."
        className="pb-14 md:pb-20"
      />

      <Section className="sticky top-16 z-30 py-3 backdrop-blur-xl" surface="deep">
        <Container size="wide">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative w-full md:w-72">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search articles"
                aria-label="Search articles"
                className="h-10 w-full rounded-lg border border-border-gray bg-bg-surface px-9 text-sm text-text-primary placeholder:text-text-tertiary transition-colors focus:border-accent focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md text-text-secondary transition-colors hover:text-text-primary focus-ring"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <div
              className="flex flex-1 items-center gap-2 overflow-x-auto pb-0.5"
              role="group"
              aria-label="Filter articles by category"
            >
              <CategoryButton
                label="All"
                count={categoryCounts.All ?? 0}
                active={activeCategory === 'All'}
                onClick={() => setActiveCategory('All')}
              />
              {visibleCategories.map((category) => (
                <CategoryButton
                  key={category.label}
                  label={category.label}
                  count={category.count}
                  active={activeCategory === category.label}
                  onClick={() => setActiveCategory(category.label)}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-20">
        <Container size="wide">
          {activeCategory === 'All' && !query && (
            <div className="mb-14">
              <SectionHeader align="left" eyebrow="Featured" title="Start here" />
              <Link href={`/blog/${featuredPost.slug}`} className="group block rounded-lg focus-ring">
                <article className="rounded-lg border border-border-gray bg-[linear-gradient(135deg,rgba(139,92,246,0.12),rgba(24,24,27,0.96)_42%,rgba(15,15,18,1))] p-6 transition duration-200 hover:border-accent/45 md:p-8">
                  <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                    <div>
                      <span className="mb-4 inline-flex rounded-md border border-accent/20 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                        {featuredPost.category}
                      </span>
                      <h2 className="max-w-3xl text-2xl font-semibold leading-tight tracking-[-0.025em] text-text-primary transition-colors group-hover:text-accent md:text-3xl">
                        {featuredPost.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
                        {featuredPost.excerpt}
                      </p>
                      <div className="mt-6">
                        <AuthorBadge post={featuredPost} />
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                      Read Article
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </article>
              </Link>
            </div>
          )}

          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-text-secondary">
              {filteredPosts.length === 0
                ? 'No articles found'
                : filteredPosts.length === 1
                  ? '1 article'
                  : `${filteredPosts.length} articles`}
              {query && (
                <span>
                  {' '}
                  for <span className="font-medium text-text-primary">&ldquo;{query}&rdquo;</span>
                </span>
              )}
            </p>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {filteredPosts.length > 0 ? (
              <m.div
                key={`${activeCategory}-${query}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredPosts.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </m.div>
            ) : (
              <m.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-lg border border-border-gray bg-bg-surface px-6 py-20 text-center"
              >
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-accent/20 bg-accent/10">
                  <BookOpen className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <p className="font-semibold text-text-primary">No articles found</p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text-secondary">
                  {query
                    ? `No results for "${query}". Try a different search or clear the filter.`
                    : 'Articles in this category are coming soon.'}
                </p>
                {(query || activeCategory !== 'All') && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('')
                      setActiveCategory('All')
                    }}
                    className="mt-5 rounded-md text-sm font-semibold text-accent hover:text-[#A78BFA] focus-ring"
                  >
                    Clear filters
                  </button>
                )}
              </m.div>
            )}
          </AnimatePresence>
        </Container>
      </Section>

      <Section className="py-16 md:py-20" surface="panel">
        <Container size="narrow">
          <div className="text-center">
            <SectionHeader
              eyebrow="Newsletter"
              title="Stay ahead of AI in higher education."
              description="New perspectives delivered to professors and administrators shaping institutional AI policy."
            />
            {subscribed ? (
              <m.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                role="status"
                aria-live="polite"
                className="inline-flex rounded-lg border border-accent/20 bg-accent/10 px-5 py-3 text-sm font-medium text-accent"
              >
                Your email was received. Thank you for subscribing.
              </m.div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
                aria-label="Newsletter subscription"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="your@university.edu"
                  required
                  autoComplete="email"
                  className="h-11 flex-1 rounded-lg border border-border-gray bg-[#0F0F12] px-4 text-sm text-text-primary placeholder:text-text-tertiary transition-colors focus:border-accent focus:outline-none"
                />
                <Button type="submit" className="h-11 px-6" disabled={isSubscribing}>
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            )}
            <p className="mt-4 text-xs text-text-tertiary">No spam. Unsubscribe at any time.</p>
          </div>
        </Container>
      </Section>

      <Footer />
    </PageShell>
  )
}
