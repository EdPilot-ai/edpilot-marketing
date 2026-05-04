'use client'

import { use, useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Clock,
  Link2,
  Linkedin,
  List,
  Share2,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/marketing'
import { getBlogPost, getRelatedPosts } from '@/lib/blog-data'
import { cn } from '@/lib/utils'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

interface TocEntry {
  id: string
  text: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

function extractToc(content: string): TocEntry[] {
  return content
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => {
      const text = line.replace('## ', '').trim()
      return { id: slugify(text), text }
    })
}

function renderInline(text: string): React.ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
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

    if (line.startsWith('## ')) {
      const text = line.replace('## ', '').trim()
      nodes.push(
        <h2
          key={`h-${i}`}
          id={slugify(text)}
          className="scroll-mt-32 text-2xl font-bold text-text-primary tracking-[-0.015em] leading-snug mt-12 mb-4"
        >
          {text}
        </h2>
      )
      i++
      continue
    }

    if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      nodes.push(
        <p key={`b-${i}`} className="font-semibold text-text-primary mt-6 mb-1 text-base">
          {renderInline(line)}
        </p>
      )
      i++
      continue
    }

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
              className="text-text-secondary leading-relaxed text-[16px] list-disc marker:text-accent"
            >
              {renderInline(item)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    if (line.trim() === '') {
      i++
      continue
    }

    nodes.push(
      <p key={`p-${i}`} className="text-text-secondary leading-[1.8] text-[16px]">
        {renderInline(line)}
      </p>
    )
    i++
  }

  return nodes
}

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
      className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent"
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

function TableOfContents({ entries, activeId }: { entries: TocEntry[]; activeId: string }) {
  if (entries.length === 0) return null
  return (
    <nav aria-label="Table of contents" className="hidden xl:block">
      <div className="sticky top-28 w-56">
        <div className="flex items-center gap-1.5 text-text-secondary text-[11px] font-semibold uppercase tracking-[0.18em] mb-4">
          <List className="w-3.5 h-3.5" aria-hidden="true" />
          Contents
        </div>
        <ol className="space-y-1.5">
          {entries.map((entry) => (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={cn(
                  'flex items-start gap-1.5 text-[12px] leading-snug py-1 transition-colors',
                  activeId === entry.id
                    ? 'text-accent font-medium'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {activeId === entry.id ? (
                  <ChevronRight className="w-3 h-3 flex-shrink-0 mt-0.5 text-accent" />
                ) : (
                  <span className="w-3 flex-shrink-0" />
                )}
                <span>{entry.text}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

function ShareRow({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      toast.success('Link copied')
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const shareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const shareTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(title)
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const btn =
    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-gray text-text-secondary text-[12px] font-medium transition-all'

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 text-text-secondary text-[12px] mr-1">
        <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="font-medium">Share</span>
      </div>
      <button
        type="button"
        onClick={shareTwitter}
        aria-label="Share on Twitter / X"
        className={cn(btn, 'hover:text-text-primary hover:border-text-secondary')}
      >
        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Twitter / X
      </button>
      <button
        type="button"
        onClick={shareLinkedIn}
        aria-label="Share on LinkedIn"
        className={cn(btn, 'hover:text-[#0A66C2] hover:border-[#0A66C2]')}
      >
        <Linkedin className="w-3 h-3" aria-hidden="true" />
        LinkedIn
      </button>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy article link"
        className={cn(btn, 'hover:text-text-primary hover:border-text-secondary')}
      >
        <Link2 className="w-3 h-3" aria-hidden="true" />
        {copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  )
}

function AuthorAvatar({ name }: { name: string }) {
  return (
    <div className="w-9 h-9 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
      <span className="text-accent font-semibold text-[12px]">{name.charAt(0)}</span>
    </div>
  )
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params)
  const post = getBlogPost(slug)

  if (!post) notFound()

  const relatedPosts = getRelatedPosts(slug)
  const toc = extractToc(post.content)

  return (
    <>
      <ReadingProgressBar />
      <ArticleBody
        post={post}
        toc={toc}
        related={relatedPosts}
      />
    </>
  )
}

function ArticleBody({
  post,
  toc,
  related,
}: {
  post: NonNullable<ReturnType<typeof getBlogPost>>
  toc: TocEntry[]
  related: NonNullable<ReturnType<typeof getBlogPost>>[]
}) {
  const [activeId, setActiveId] = useState('')
  const articleRef = useRef<HTMLDivElement>(null)

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
    updateActive()
    return () => window.removeEventListener('scroll', updateActive)
  }, [updateActive])

  return (
    <>
      <div className="border-b border-border-gray bg-bg-page/80 backdrop-blur-sm">
        <Container size="lg">
          <Link
            href="/blog"
            className="h-11 inline-flex items-center gap-1.5 text-text-secondary hover:text-accent text-[12px] font-medium transition-colors group"
          >
            <ArrowLeft
              className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
            All articles
          </Link>
        </Container>
      </div>

      <header className="relative overflow-hidden pt-16 pb-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-24 left-1/3 w-[420px] h-[420px] bg-accent/[0.06] rounded-full blur-[100px]" />
        </div>
        <Container size="md" className="relative z-10">
          <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-accent bg-accent/10 rounded-md px-2.5 py-1 mb-5">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-[2.5rem] font-bold text-text-primary leading-[1.15] tracking-[-0.025em] mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <AuthorAvatar name={post.author.name} />
            <div>
              <p className="text-text-primary text-[13px] font-semibold leading-none">
                {post.author.name}
              </p>
              <p className="text-text-secondary text-[12px] mt-0.5">{post.author.title}</p>
            </div>
            <span className="text-border-gray" aria-hidden="true">·</span>
            <div className="flex items-center gap-1 text-text-secondary text-[12px]">
              <Clock className="w-3 h-3" aria-hidden="true" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </Container>
      </header>

      <div className="border-t border-border-gray" />

      <Container size="lg">
        <div className="flex gap-16 py-14">
          <main className="flex-1 min-w-0 max-w-3xl">
            <div ref={articleRef}>
              <div className="border-l-2 border-accent pl-5 mb-10">
                <p className="text-text-secondary text-[18px] leading-relaxed font-medium">
                  {post.excerpt}
                </p>
              </div>
              <div className="space-y-5">{renderContent(post.content)}</div>
            </div>

            <div className="mt-14 pt-8 border-t border-border-gray">
              <ShareRow title={post.title} />
            </div>
          </main>

          <aside className="flex-shrink-0">
            <TableOfContents entries={toc} activeId={activeId} />
          </aside>
        </div>
      </Container>

      {related.length > 0 && (
        <section className="border-t border-border-gray bg-bg-surface py-16">
          <Container size="md">
            <h2 className="text-xl font-semibold text-text-primary tracking-[-0.015em] mb-8">
              Continue reading
            </h2>

            <div className="space-y-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                  <article className="flex items-start gap-4 rounded-xl border border-border-gray bg-bg-page p-5 transition-all hover:border-accent/35">
                    <div className="w-1 self-stretch rounded-full bg-accent/30 flex-shrink-0 group-hover:bg-accent transition-colors" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                          {r.category}
                        </span>
                        <span className="text-border-gray" aria-hidden="true">·</span>
                        <span className="text-text-secondary text-[12px]">
                          {r.readingTime} min read
                        </span>
                      </div>
                      <h3 className="text-[14px] font-semibold text-text-primary leading-snug group-hover:text-accent transition-colors line-clamp-1">
                        {r.title}
                      </h3>
                      <p className="text-text-secondary text-[12px] leading-relaxed mt-1 line-clamp-2">
                        {r.excerpt}
                      </p>
                    </div>
                    <ArrowRight
                      className="w-4 h-4 text-text-secondary group-hover:text-accent flex-shrink-0 mt-1 transition-colors"
                      aria-hidden="true"
                    />
                  </article>
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/blog">
                <Button variant="outline">
                  View all articles
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
