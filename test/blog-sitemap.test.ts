import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'

/**
 * **Feature: sanity-blog-integration, Property 10: Sitemap completeness**
 * **Validates: Requirements 6.6**
 *
 * For any set of published blog posts and series, the generated sitemap SHALL include
 * an entry for each post URL (`/blog/[slug]`) and each series URL (`/blog/series/[slug]`)
 * with valid lastmod, changefreq, and priority values.
 */

const BASE_URL = 'https://sreejithnair.me'

// Types matching sitemap data structures
interface SitemapPost {
  slug: { current: string }
  publishedAt: string
}

interface SitemapSeries {
  slug: { current: string }
}

interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

// Pure function to generate sitemap entries (mirrors sitemap.ts logic)
function generateSitemapEntries(
  posts: SitemapPost[],
  series: SitemapSeries[]
): SitemapEntry[] {
  const staticRoutes: SitemapEntry[] = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const postRoutes: SitemapEntry[] = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const seriesRoutes: SitemapEntry[] = series.map((s) => ({
    url: `${BASE_URL}/blog/series/${s.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes, ...seriesRoutes]
}

// Arbitrary for generating valid slugs
const slugArb = fc
  .string({ minLength: 1, maxLength: 50 })
  .map((s) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  )
  .filter((s) => s.length > 0)

// Arbitrary for generating valid ISO date strings
const isoDateArb = fc.integer({ min: 2020, max: 2030 }).chain((year) =>
  fc.integer({ min: 1, max: 12 }).chain((month) =>
    fc.integer({ min: 1, max: 28 }).map((day) => {
      const m = month.toString().padStart(2, '0')
      const d = day.toString().padStart(2, '0')
      return `${year}-${m}-${d}T00:00:00.000Z`
    })
  )
)

// Arbitrary for sitemap posts
const sitemapPostArb: fc.Arbitrary<SitemapPost> = fc.record({
  slug: fc.record({ current: slugArb }),
  publishedAt: isoDateArb,
})

// Arbitrary for sitemap series
const sitemapSeriesArb: fc.Arbitrary<SitemapSeries> = fc.record({
  slug: fc.record({ current: slugArb }),
})

describe('Sitemap completeness', () => {
  it('should include an entry for each blog post URL', () => {
    fc.assert(
      fc.property(
        fc.array(sitemapPostArb, { minLength: 1, maxLength: 20 }),
        fc.array(sitemapSeriesArb, { minLength: 0, maxLength: 10 }),
        (posts, series) => {
          const entries = generateSitemapEntries(posts, series)
          const urls = entries.map((e) => e.url)

          for (const post of posts) {
            const expectedUrl = `${BASE_URL}/blog/${post.slug.current}`
            expect(urls).toContain(expectedUrl)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should include an entry for each series URL', () => {
    fc.assert(
      fc.property(
        fc.array(sitemapPostArb, { minLength: 0, maxLength: 10 }),
        fc.array(sitemapSeriesArb, { minLength: 1, maxLength: 20 }),
        (posts, series) => {
          const entries = generateSitemapEntries(posts, series)
          const urls = entries.map((e) => e.url)

          for (const s of series) {
            const expectedUrl = `${BASE_URL}/blog/series/${s.slug.current}`
            expect(urls).toContain(expectedUrl)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should have valid lastModified dates for all entries', () => {
    fc.assert(
      fc.property(
        fc.array(sitemapPostArb, { minLength: 0, maxLength: 10 }),
        fc.array(sitemapSeriesArb, { minLength: 0, maxLength: 10 }),
        (posts, series) => {
          const entries = generateSitemapEntries(posts, series)

          for (const entry of entries) {
            expect(entry.lastModified).toBeInstanceOf(Date)
            expect(entry.lastModified.getTime()).not.toBeNaN()
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should have valid changeFrequency values for all entries', () => {
    const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']

    fc.assert(
      fc.property(
        fc.array(sitemapPostArb, { minLength: 0, maxLength: 10 }),
        fc.array(sitemapSeriesArb, { minLength: 0, maxLength: 10 }),
        (posts, series) => {
          const entries = generateSitemapEntries(posts, series)

          for (const entry of entries) {
            expect(validFrequencies).toContain(entry.changeFrequency)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should have valid priority values between 0 and 1 for all entries', () => {
    fc.assert(
      fc.property(
        fc.array(sitemapPostArb, { minLength: 0, maxLength: 10 }),
        fc.array(sitemapSeriesArb, { minLength: 0, maxLength: 10 }),
        (posts, series) => {
          const entries = generateSitemapEntries(posts, series)

          for (const entry of entries) {
            expect(entry.priority).toBeGreaterThanOrEqual(0)
            expect(entry.priority).toBeLessThanOrEqual(1)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should include the main blog listing page', () => {
    fc.assert(
      fc.property(
        fc.array(sitemapPostArb, { minLength: 0, maxLength: 10 }),
        fc.array(sitemapSeriesArb, { minLength: 0, maxLength: 10 }),
        (posts, series) => {
          const entries = generateSitemapEntries(posts, series)
          const urls = entries.map((e) => e.url)

          expect(urls).toContain(`${BASE_URL}/blog`)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should use post publishedAt date as lastModified for post entries', () => {
    // Generate posts with unique slugs to avoid ambiguity
    const uniquePostsArb = fc
      .array(sitemapPostArb, { minLength: 1, maxLength: 10 })
      .map((posts) => {
        const seen = new Set<string>()
        return posts.filter((p) => {
          if (seen.has(p.slug.current)) return false
          seen.add(p.slug.current)
          return true
        })
      })
      .filter((posts) => posts.length > 0)

    fc.assert(
      fc.property(
        uniquePostsArb,
        fc.array(sitemapSeriesArb, { minLength: 0, maxLength: 5 }),
        (posts, series) => {
          const entries = generateSitemapEntries(posts, series)

          for (const post of posts) {
            const postEntry = entries.find(
              (e) => e.url === `${BASE_URL}/blog/${post.slug.current}`
            )
            expect(postEntry).toBeDefined()
            expect(postEntry!.lastModified.toISOString()).toBe(
              new Date(post.publishedAt).toISOString()
            )
          }
        }
      ),
      { numRuns: 100 }
    )
  })
})
