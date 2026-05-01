'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { m, AnimatePresence } from 'framer-motion'
import { ArrowRight, BookOpen, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer'
import { blogPosts, getFeaturedPost, ALL_CATEGORIES } from '@/lib/blog-data'
import type { BlogCategory } from '@/lib/blog-data'

// ─── Sub-components ──────────────────────────────────────────────────────────

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
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-150 whitespace-nowrap ${
        active
          ? 'bg-accent text-white border-accent'
          : 'bg-transparent text-text-secondary border-border-gray hover:border-accent/50 hover:text-text-primary'
      }`}
    >
      {label}
      <span
        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full transition-colors duration-150 ${
          active ? 'bg-white/20 text-white' : 'bg-border-gray text-text-secondary'
        }`}
      >
        {count}
      </span>
    </button>
  )
}

function AuthorAvatar({ name, size = 'sm' }: { name: string; size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'w-6 h-6 text-[10px]' : 'w-8 h-8 text-xs'
  return (
    <div
      className={`${dim} bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0`}
    >
      <span className="text-accent font-semibold">{name.charAt(0)}</span>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'All'>('All')
  const [query, setQuery] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const featuredPost = getFeaturedPost()

  // Article counts per category (excluding featured)
  const categoryCounts = useMemo(() => {
    const nonFeatured = blogPosts.filter(p => !p.featured)
    const counts: Record<string, number> = { All: nonFeatured.length }
    for (const cat of ALL_CATEGORIES) {
      counts[cat] = nonFeatured.filter(p => p.category === cat).length
    }
    return counts
  }, [])

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      if (post.featured) return false
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory
      const q = query.trim().toLowerCase()
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q)
      return matchesCategory && matchesSearch
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
    <div className="min-h-screen bg-bg-page">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-violet-600/7 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-28 left-[15%] w-[280px] h-[280px] bg-indigo-500/4 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-28 right-[15%] w-[280px] h-[280px] bg-purple-500/4 rounded-full blur-[100px] pointer-events-none" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="text-center max-w-[720px] mx-auto">
            <h1 className="text-5xl md:text-[3.5rem] font-bold mb-5 leading-[1.1] tracking-[-0.03em]">
              <span className="text-text-primary">Insights on AI in </span>
              <span className="text-[#8B5CF6]">Higher Education.</span>
            </h1>
            <p className="text-[1.0625rem] text-text-secondary leading-[1.7] max-w-[480px] mx-auto">
              Perspectives on AI governance, curriculum intelligence, academic integrity, and the
              evolving role of faculty.
            </p>
          </div>
        </div>
      </section>

      {/* ── Sticky filter bar ── */}
      <div className="sticky top-[56px] z-40 bg-bg-page/90 backdrop-blur-xl border-b border-border-gray">
        <div className="container mx-auto px-6 py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex-shrink-0 w-full sm:w-56">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search articles…"
                aria-label="Search articles"
                className="w-full pl-8 pr-8 py-1.5 rounded-lg bg-bg-surface border border-border-gray text-text-primary text-xs placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors duration-150"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div
              className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none flex-1"
              role="group"
              aria-label="Filter articles by category"
            >
              <CategoryPill
                label="All"
                count={categoryCounts['All'] ?? 0}
                active={activeCategory === 'All'}
                onClick={() => setActiveCategory('All')}
              />
              {ALL_CATEGORIES.map(cat => (
                <CategoryPill
                  key={cat}
                  label={cat}
                  count={categoryCounts[cat] ?? 0}
                  active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto px-6 max-w-5xl py-14">
        {/* ── Featured Article ── */}
        {activeCategory === 'All' && !query && (
          <div className="mb-14">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-5">
              Featured
            </p>
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <article className="relative p-7 md:p-9 rounded-2xl border border-border-gray bg-bg-surface hover:border-accent/40 transition-all duration-200 hover:shadow-[0_0_50px_rgba(139,92,246,0.07)] overflow-hidden">
                {/* Subtle accent glow in corner */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[60px] pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative flex flex-col md:flex-row md:gap-10 md:items-start">
                  {/* Left: content */}
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-accent bg-accent/10 rounded-md px-2.5 py-1 mb-4">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-3 leading-snug tracking-tight group-hover:text-accent transition-colors duration-150">
                      {featuredPost.title}
                    </h2>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-xl">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <AuthorAvatar name={featuredPost.author.name} size="md" />
                      <div>
                        <p className="text-text-primary text-sm font-medium leading-none">
                          {featuredPost.author.name}
                        </p>
                        <p className="text-text-secondary text-xs mt-0.5">
                          {featuredPost.author.title}
                        </p>
                      </div>
                      <span className="text-border-gray text-xs" aria-hidden="true">
                        ·
                      </span>
                      <span className="text-text-secondary text-xs">
                        {featuredPost.readingTime} min read
                      </span>
                    </div>
                  </div>

                  {/* Right: CTA */}
                  <div className="mt-7 md:mt-0 md:flex-shrink-0 flex items-center">
                    <Button className="bg-accent hover:bg-accent-hover text-white">
                      Read Article
                      <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* ── Article Grid ── */}
        <div>
          {/* Grid header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-text-secondary text-xs">
              {filteredPosts.length === 0
                ? 'No articles found'
                : filteredPosts.length === 1
                  ? '1 article'
                  : `${filteredPosts.length} articles`}
              {query && (
                <span className="ml-1">
                  for <span className="text-text-primary font-medium">&ldquo;{query}&rdquo;</span>
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
                transition={{ duration: 0.25 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filteredPosts.map(post => (
                  <div key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <article className="h-full flex flex-col p-5 rounded-xl border border-border-gray bg-bg-surface hover:border-accent/35 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(139,92,246,0.06)]">
                        {/* Category tag */}
                        <div className="mb-3.5">
                          <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-accent bg-accent/10 rounded-md px-2 py-0.5">
                            {post.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-[15px] font-semibold text-text-primary mb-2.5 leading-snug tracking-tight group-hover:text-accent transition-colors duration-150 line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
                          {post.excerpt}
                        </p>

                        {/* Footer: author + read time */}
                        <div className="mt-auto flex items-center justify-between pt-3.5 border-t border-border-gray">
                          <div className="flex items-center gap-2 min-w-0">
                            <AuthorAvatar name={post.author.name} />
                            <span className="text-text-primary text-xs font-medium truncate">
                              {post.author.name.split(' ')[0]}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-text-secondary text-xs flex-shrink-0">
                            <span>{post.readingTime} min</span>
                            <ArrowRight
                              className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </article>
                    </Link>
                  </div>
                ))}
              </m.div>
            ) : (
              <m.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-5 h-5 text-accent" aria-hidden="true" />
                </div>
                <p className="text-text-primary font-semibold mb-1.5">No articles found</p>
                <p className="text-text-secondary text-sm max-w-xs">
                  {query
                    ? `No results for "${query}". Try a different search or clear the filter.`
                    : 'Articles in this category are coming soon.'}
                </p>
                {(query || activeCategory !== 'All') && (
                  <button
                    onClick={() => {
                      setQuery('')
                      setActiveCategory('All')
                    }}
                    className="mt-4 text-accent text-sm font-medium hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Newsletter ── */}
      <section className="py-16 border-t border-border-gray">
        <div className="container mx-auto px-6 max-w-xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">
              Stay Ahead of AI in Higher Education
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-7 max-w-sm mx-auto">
              New perspectives delivered to professors and administrators shaping institutional AI
              policy.
            </p>

            {subscribed ? (
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent/10 border border-accent/20 text-accent text-sm font-medium"
              >
                You&apos;re subscribed — thank you.
              </m.div>
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
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@university.edu"
                  required
                  autoComplete="email"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-bg-surface border border-border-gray text-text-primary text-sm placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors duration-150"
                />
                <Button
                  type="submit"
                  className="bg-accent hover:bg-accent-hover text-white whitespace-nowrap flex-shrink-0"
                >
                  Subscribe
                </Button>
              </form>
            )}

            <p className="text-text-secondary text-xs mt-4">No spam. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
