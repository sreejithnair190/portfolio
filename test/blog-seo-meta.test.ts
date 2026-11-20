import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import {
  generatePostSocialMetaTags,
  generateSeriesSocialMetaTags,
  type SocialMetaTags,
} from '@/lib/sanity/seo'
import type { BlogPost, BlogSeries, SeriesPagePostItem } from '@/lib/sanity/types'

/**
 * **Feature: sanity-blog-integration, Property 7: Social meta tags completeness**
 * **Validates: Requirements 6.1, 6.2, 6.3**
 *
 * For any blog post, the generated metadata SHALL include: a meta title containing
 * the post title, a meta description from the excerpt or content, Open Graph tags
 * (og:title, og:description, og:image, og:url, og:type), and Twitter Card tags
 * (twitter:card, twitter:title, twitter:description, twitter:image).
 */

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

// Arbitrary for generating blog post titles
const titleArb = fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0)

// Arbitrary for generating image URLs
const imageUrlArb = fc.webUrl()

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

// Arbitrary for generating blog posts (without featuredImage to avoid Sanity client calls)
const blogPostArb: fc.Arbitrary<BlogPost> = fc.record({
  _id: fc.uuid(),
  title: titleArb,
  slug: fc.record({
    current: slugArb,
    _type: fc.constant('slug' as const),
  }),
  excerpt: fc.option(fc.string({ minLength: 10, maxLength: 200 }), { nil: null }),
  featuredImage: fc.constant(null),
  content: fc.constant([]),
  publishedAt: isoDateArb,
  author: fc.constant('Sreejith Nair'),
  orderInSeries: fc.option(fc.integer({ min: 1, max: 100 }), { nil: null }),
  estimatedReadingTime: fc.integer({ min: 1, max: 60 }),
  series: fc.constant(null),
})

// Arbitrary for series post items
const seriesPostItemArb: fc.Arbitrary<SeriesPagePostItem> = fc.record({
  _id: fc.uuid(),
  title: titleArb,
  slug: fc.record({
    current: slugArb,
    _type: fc.constant('slug' as const),
  }),
  excerpt: fc.option(fc.string({ minLength: 10, maxLength: 200 }), { nil: null }),
  featuredImage: fc.constant(null),
  publishedAt: isoDateArb,
  orderInSeries: fc.option(fc.integer({ min: 1, max: 100 }), { nil: null }),
  estimatedReadingTime: fc.integer({ min: 1, max: 60 }),
})

// Arbitrary for blog series
const blogSeriesArb: fc.Arbitrary<BlogSeries> = fc.record({
  _id: fc.uuid(),
  title: titleArb,
  slug: fc.record({
    current: slugArb,
    _type: fc.constant('slug' as const),
  }),
  description: fc.option(fc.string({ minLength: 10, maxLength: 300 }), { nil: null }),
  coverImage: fc.constant(null),
  posts: fc.array(seriesPostItemArb, { minLength: 1, maxLength: 10 }),
  totalReadingTime: fc.integer({ min: 1, max: 300 }),
})

describe('Social meta tags completeness', () => {
  describe('Blog Post Meta Tags', () => {
    it('should include title containing the post title', () => {
      fc.assert(
        fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
          const meta = generatePostSocialMetaTags(post, imageUrl)
          expect(meta.title).toContain(post.title)
        }),
        { numRuns: 100 }
      )
    })

    it('should include a non-empty description', () => {
      fc.assert(
        fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
          const meta = generatePostSocialMetaTags(post, imageUrl)
          expect(meta.description.length).toBeGreaterThan(0)
        }),
        { numRuns: 100 }
      )
    })

    it('should include Open Graph title', () => {
      fc.assert(
        fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
          const meta = generatePostSocialMetaTags(post, imageUrl)
          expect(meta.openGraph.title).toBeDefined()
          expect(meta.openGraph.title.length).toBeGreaterThan(0)
        }),
        { numRuns: 100 }
      )
    })

    it('should include Open Graph description', () => {
      fc.assert(
        fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
          const meta = generatePostSocialMetaTags(post, imageUrl)
          expect(meta.openGraph.description).toBeDefined()
          expect(meta.openGraph.description.length).toBeGreaterThan(0)
        }),
        { numRuns: 100 }
      )
    })

    it('should include Open Graph URL containing the slug', () => {
      fc.assert(
        fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
          const meta = generatePostSocialMetaTags(post, imageUrl)
          expect(meta.openGraph.url).toContain(post.slug.current)
          expect(meta.openGraph.url).toContain('/blog/')
        }),
        { numRuns: 100 }
      )
    })

    it('should include Open Graph type as article', () => {
      fc.assert(
        fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
          const meta = generatePostSocialMetaTags(post, imageUrl)
          expect(meta.openGraph.type).toBe('article')
        }),
        { numRuns: 100 }
      )
    })

    it('should include Open Graph image URL', () => {
      fc.assert(
        fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
          const meta = generatePostSocialMetaTags(post, imageUrl)
          expect(meta.openGraph.image).toBe(imageUrl)
        }),
        { numRuns: 100 }
      )
    })

    it('should include Twitter card type', () => {
      fc.assert(
        fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
          const meta = generatePostSocialMetaTags(post, imageUrl)
          expect(meta.twitter.card).toBe('summary_large_image')
        }),
        { numRuns: 100 }
      )
    })

    it('should include Twitter title', () => {
      fc.assert(
        fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
          const meta = generatePostSocialMetaTags(post, imageUrl)
          expect(meta.twitter.title).toBeDefined()
          expect(meta.twitter.title.length).toBeGreaterThan(0)
        }),
        { numRuns: 100 }
      )
    })

    it('should include Twitter description', () => {
      fc.assert(
        fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
          const meta = generatePostSocialMetaTags(post, imageUrl)
          expect(meta.twitter.description).toBeDefined()
          expect(meta.twitter.description.length).toBeGreaterThan(0)
        }),
        { numRuns: 100 }
      )
    })

    it('should include Twitter image URL', () => {
      fc.assert(
        fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
          const meta = generatePostSocialMetaTags(post, imageUrl)
          expect(meta.twitter.image).toBe(imageUrl)
        }),
        { numRuns: 100 }
      )
    })
  })

  describe('Blog Series Meta Tags', () => {
    it('should include title containing the series title', () => {
      fc.assert(
        fc.property(blogSeriesArb, imageUrlArb, (series, imageUrl) => {
          const meta = generateSeriesSocialMetaTags(series, imageUrl)
          expect(meta.title).toContain(series.title)
        }),
        { numRuns: 100 }
      )
    })

    it('should include all required Open Graph tags', () => {
      fc.assert(
        fc.property(blogSeriesArb, imageUrlArb, (series, imageUrl) => {
          const meta = generateSeriesSocialMetaTags(series, imageUrl)
          expect(meta.openGraph.title.length).toBeGreaterThan(0)
          expect(meta.openGraph.description.length).toBeGreaterThan(0)
          expect(meta.openGraph.url).toContain(series.slug.current)
          expect(meta.openGraph.type).toBe('website')
          expect(meta.openGraph.image).toBe(imageUrl)
        }),
        { numRuns: 100 }
      )
    })

    it('should include all required Twitter Card tags', () => {
      fc.assert(
        fc.property(blogSeriesArb, imageUrlArb, (series, imageUrl) => {
          const meta = generateSeriesSocialMetaTags(series, imageUrl)
          expect(meta.twitter.card).toBe('summary_large_image')
          expect(meta.twitter.title.length).toBeGreaterThan(0)
          expect(meta.twitter.description.length).toBeGreaterThan(0)
          expect(meta.twitter.image).toBe(imageUrl)
        }),
        { numRuns: 100 }
      )
    })
  })
})
