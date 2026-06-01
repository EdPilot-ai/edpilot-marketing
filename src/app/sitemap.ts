import type { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data'

const SITE_URL = process.env.NEXT_PUBLIC_MARKETING_URL ?? 'https://edpilot.ai'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: Array<{
    path: string
    priority: number
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  }> = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/products', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/products/curriculum-intelligence', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/how-it-works', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/compare', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/compare/chatgpt', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/compare/lms-native', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/compare/tutoring-platforms', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/compare/custom-solutions', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/resources/positioning-language', priority: 0.4, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/accessibility', priority: 0.3, changeFrequency: 'yearly' },
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticEntries, ...blogEntries]
}
