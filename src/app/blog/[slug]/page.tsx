'use client'

import { use, useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Share2,
  Linkedin,
  Link2,
  List,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge, Container, PageShell, Section } from '@/components/marketing'
import { getBlogPost, getRelatedPosts } from '@/lib/blog-data'
import toast from 'react-hot-toast'

// ─── Types ───────────────────────────────────────────────────────────────────

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

interface TocEntry {
  id: string
  text: string
}

// ─── Markdown parser ─────────────────────────────────────────────────────────

/**
 * Extract all ## headings from markdown content and return slug-safe IDs.
 */
function extractToc(content: string): TocEntry[] {
  return content
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => {
      const text = line.replace('## ', '').trim()
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
      return { id, text }
    })
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

function renderContent(content: string): React.ReactNode[] {
  const lines = content.split('\n')
  const nodes: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // H2 heading
    if (line.startsWith('## ')) {
      const text = line.replace('## ', '').trim()
      const id = slugifyHeading(text)
      nodes.push(
        <h2
          key={`h-${i}`}
          id={id}
          className="scroll-mt-36 text-xl md:text-2xl font-bold text-text-primary mt-12 mb-4 tracking-tight leading-snug"
        >
          {text}
        </h2>
      )
      i++
      continue
    }

    // Bold standalone paragraph (numbered list item labels like **1. Foo**)
    if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      nodes.push(
        <p key={`b-${i}`} className="font-semibold text-text-primary mt-6 mb-1 text-base">
          {renderInline(line)}
        </p>
      )
      i++
      continue
    }

    // Unordered list (collect contiguous `- ` lines)
    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      nodes.push(
        <ul key={`ul-${i}`} className="my-5 space-y-2 pl-5">
          {items.map((item, j) => (
            <li
              key={j}
              className="text-text-secondary leading-relaxed text-[17px] list-disc marker:text-accent"
            >
              {renderInline(item)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Empty line — skip (paragraph spacing handled by wrapper)
    if (line.trim() === '') {
      i++
      continue
    }

    // Regular paragraph
    nodes.push(
      <p key={`p-${i}`} className="text-text-secondary leading-[1.85] text-[17px]">
        {renderInline(line)}
      </p>
    )
    i++
  }

  return nodes
}

// ─── Reading progress bar ─────────────────────────────────────────────────────

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-gradient-to-r from-accent to-accent-hover transition-[width] duration-75 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// ─── Table of contents ────────────────────────────────────────────────────────

function TableOfContents({ entries, activeId }: { entries: TocEntry[]; activeId: string }) {
  if (entries.length === 0) return null

  return (
    <nav aria-label="Table of contents" className="hidden xl:block">
      <div className="sticky top-36 w-52">
        <div className="flex items-center gap-1.5 text-text-secondary text-xs font-semibold uppercase tracking-widest mb-4">
          <List className="w-3.5 h-3.5" aria-hidden="true" />
          Contents
        </div>
        <ol className="space-y-1">
          {entries.map((entry) => (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={`flex items-start gap-1.5 text-xs leading-snug py-1 transition-colors duration-150 ${
                  activeId === entry.id
                    ? 'text-accent font-medium'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {activeId === entry.id && (
                  <ChevronRight className="w-3 h-3 flex-shrink-0 mt-0.5 text-accent" aria-hidden="true" />
                )}
                <span className={activeId === entry.id ? '' : 'pl-[18px]'}>{entry.text}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

// ─── Share row ────────────────────────────────────────────────────────────────

function ShareRow({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const copyLink = () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      toast.success('Link copied')
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const shareLinkedIn = () => {
    const url =
      typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const shareTwitter = () => {
    const url =
      typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''
    const text = encodeURIComponent(title)
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const btnBase =
    'inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-border-gray px-3 text-text-secondary text-xs font-medium transition-all duration-150 focus-ring'

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 text-text-secondary text-xs mr-1">
        <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="font-medium">Share</span>
      </div>
      <button
        onClick={shareTwitter}
        aria-label="Share on Twitter / X"
        className={`${btnBase} hover:text-text-primary hover:border-text-secondary`}
      >
        {/* X / Twitter icon */}
        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Twitter / X
      </button>
      <button
        onClick={shareLinkedIn}
        aria-label="Share on LinkedIn"
        className={`${btnBase} hover:border-brand-linkedin hover:text-brand-linkedin`}
      >
        <Linkedin className="w-3 h-3" aria-hidden="true" />
        LinkedIn
      </button>
      <button
        onClick={copyLink}
        aria-label="Copy article link"
        className={`${btnBase} hover:text-text-primary hover:border-text-secondary`}
      >
        <Link2 className="w-3 h-3" aria-hidden="true" />
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}

// ─── Author avatar ────────────────────────────────────────────────────────────

function AuthorAvatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const cls = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
  }[size]
  return (
    <div
      className={`${cls} bg-accent/5 rounded-lg border border-accent/15 flex items-center justify-center flex-shrink-0`}
    >
      <span className="text-accent font-semibold">{name.charAt(0)}</span>
    </div>
  )
}

// ─── Page shell ───────────────────────────────────────────────────────────────

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params)
  const post = getBlogPost(slug)

  if (!post) notFound()

  const relatedPosts = getRelatedPosts(slug)
  const toc = extractToc(post.content)

  return (
    <PageShell>
      <ReadingProgressBar />
      <ArticleBody post={post} toc={toc} relatedPosts={relatedPosts} />
    </PageShell>
  )
}

// ─── Article body (needs useState, so separate component) ────────────────────

function ArticleBody({
  post,
  toc,
  relatedPosts,
}: {
  post: NonNullable<ReturnType<typeof getBlogPost>>
  toc: TocEntry[]
  relatedPosts: NonNullable<ReturnType<typeof getBlogPost>>[]
}) {
  const [activeId, setActiveId] = useState('')
  const articleRef = useRef<HTMLDivElement>(null)

  // Intersection observer to track active TOC section
  const updateActive = useCallback(() => {
    if (!articleRef.current) return
    const headings = articleRef.current.querySelectorAll('h2[id]')
    let current = ''
    headings.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 160) current = el.id
    })
    setActiveId(current)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', updateActive, { passive: true })
    return () => window.removeEventListener('scroll', updateActive)
  }, [updateActive])

  useEffect(() => {
    updateActive()
  // Run once on mount to set initial active heading
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* ── Breadcrumb bar — sits flush below Navbar ── */}
      <Section className="border-b border-border-gray/60 bg-bg-page/80 py-0 backdrop-blur-sm">
        <Container className="flex h-11 items-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 rounded-md text-xs font-medium text-text-secondary transition-colors duration-150 hover:text-accent focus-ring"
          >
            <ArrowLeft
              className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-150"
              aria-hidden="true"
            />
            All Articles
          </Link>
        </Container>
      </Section>

      {/* ── Article header ── */}
      <Section className="border-b border-border-gray pt-16 pb-12">
        <div
          className="hero-glow-subtle pointer-events-none absolute inset-x-0 top-0 h-[360px]"
          aria-hidden="true"
        />

        <Container size="narrow" className="relative z-10">
          {/* Category */}
          <div className="mb-5">
            <Badge>{post.category}</Badge>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 leading-[1.2] tracking-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 flex-wrap">
            <AuthorAvatar name={post.author.name} size="md" />
            <div>
              <p className="text-text-primary text-sm font-semibold leading-none">
                {post.author.name}
              </p>
              <p className="text-text-secondary text-xs mt-0.5">{post.author.title}</p>
            </div>
            <span className="text-border-gray text-xs" aria-hidden="true">·</span>
            <div className="flex items-center gap-1 text-text-secondary text-xs">
              <Clock className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Article body + TOC layout ── */}
      <Container>
        <div className="flex gap-16 py-14">

          {/* Main column */}
          <div className="flex-1 min-w-0 max-w-3xl">
            <div
              ref={articleRef}
            >
              {/* Lead / excerpt callout */}
              <div className="border-l-2 border-accent pl-5 mb-10">
                <p className="text-text-secondary text-lg leading-relaxed font-medium">
                  {post.excerpt}
                </p>
              </div>

              {/* Prose content */}
              <div className="space-y-5">
                {renderContent(post.content)}
              </div>
            </div>

            {/* Share */}
            <div className="mt-14 pt-8 border-t border-border-gray">
              <ShareRow title={post.title} />
            </div>
          </div>

          {/* TOC sidebar — xl screens only */}
          <aside className="flex-shrink-0">
            <TableOfContents entries={toc} activeId={activeId} />
          </aside>
        </div>
      </Container>

      {/* ── Related articles ── */}
      {relatedPosts.length > 0 && (
        <Section className="py-16" surface="panel">
          <Container size="narrow">
            <div
              className="mb-8"
            >
              <h2 className="text-xl font-bold text-text-primary tracking-tight">
                Continue Reading
              </h2>
            </div>

            <div className="space-y-4">
              {relatedPosts.map((related) => (
                <div
                  key={related.slug}
                >
                  <Link href={`/blog/${related.slug}`} className="group block rounded-lg focus-ring">
                    <article className="flex items-start gap-4 p-5 rounded-lg border border-border-gray bg-bg-page hover:border-accent/25 transition-all duration-200">
                      {/* Color swatch accent */}
                      <div className="w-1 self-stretch rounded-full bg-accent/30 flex-shrink-0 group-hover:bg-accent transition-colors duration-150" />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                            {related.category}
                          </span>
                          <span className="text-border-gray text-xs" aria-hidden="true">·</span>
                          <span className="text-text-secondary text-xs">{related.readingTime} min read</span>
                        </div>
                        <h3 className="text-sm font-semibold text-text-primary leading-snug group-hover:text-accent transition-colors duration-150 line-clamp-1">
                          {related.title}
                        </h3>
                        <p className="text-text-secondary text-xs leading-relaxed mt-1 line-clamp-2">
                          {related.excerpt}
                        </p>
                      </div>

                      <ArrowRight
                        className="w-4 h-4 text-text-secondary group-hover:text-accent flex-shrink-0 mt-1 transition-colors duration-150"
                        aria-hidden="true"
                      />
                    </article>
                  </Link>
                </div>
              ))}
            </div>

            <div
              className="mt-8"
            >
              <Button asChild variant="outline" className="border-border-gray hover:border-text-secondary">
                <Link href="/blog">
                  View All Articles
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Container>
        </Section>
      )}

    </>
  )
}
