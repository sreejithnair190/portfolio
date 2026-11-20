import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { generateArticleJsonLd, type ArticleJsonLd } from '@/lib/sanity/seo'
import type { BlogPost } from '@/lib/sanity/types'

/**
 * **Feature: sanity-blog-integration, Property 8: Article JSON-LD validity**
 * **Validates: Requirements 6.4**
 *
 * For any blog post, the generated JSON-LD SHALL be a valid Article schema containing:
 * @context, @type="Article", headline, description, image, datePublished,
 * author with @type="Person", and mainEntityOfPage.
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

// Arbitrary for generating blog posts
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

describe('Article JSON-LD validity', () => {
  it('should include @context as https://schema.org', () => {
    fc.assert(
      fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
        const jsonLd = generateArticleJsonLd(post, imageUrl)
        expect(jsonLd['@context']).toBe('https://schema.org')
      }),
      { numRuns: 100 }
    )
  })

  it('should include @type as Article', () => {
    fc.assert(
      fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
        const jsonLd = generateArticleJsonLd(post, imageUrl)
        expect(jsonLd['@type']).toBe('Article')
      }),
      { numRuns: 100 }
    )
  })

  it('should include headline matching post title', () => {
    fc.assert(
      fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
        const jsonLd = generateArticleJsonLd(post, imageUrl)
        expect(jsonLd.headline).toBe(post.title)
      }),
      { numRuns: 100 }
    )
  })

  it('should include non-empty description', () => {
    fc.assert(
      fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
        const jsonLd = generateArticleJsonLd(post, imageUrl)
        expect(jsonLd.description).toBeDefined()
        expect(jsonLd.description.length).toBeGreaterThan(0)
      }),
      { numRuns: 100 }
    )
  })

  it('should include image URL', () => {
    fc.assert(
      fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
        const jsonLd = generateArticleJsonLd(post, imageUrl)
        expect(jsonLd.image).toBe(imageUrl)
      }),
      { numRuns: 100 }
    )
  })

  it('should include datePublished matching post publishedAt', () => {
    fc.assert(
      fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
        const jsonLd = generateArticleJsonLd(post, imageUrl)
        expect(jsonLd.datePublished).toBe(post.publishedAt)
      }),
      { numRuns: 100 }
    )
  })

  it('should include dateModified', () => {
    fc.assert(
      fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
        const jsonLd = generateArticleJsonLd(post, imageUrl)
        expect(jsonLd.dateModified).toBeDefined()
        expect(jsonLd.dateModified.length).toBeGreaterThan(0)
      }),
      { numRuns: 100 }
    )
  })

  it('should include author with @type Person', () => {
    fc.assert(
      fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
        const jsonLd = generateArticleJsonLd(post, imageUrl)
        expect(jsonLd.author).toBeDefined()
        expect(jsonLd.author['@type']).toBe('Person')
        expect(jsonLd.author.name).toBe(post.author)
        expect(jsonLd.author.url).toBeDefined()
      }),
      { numRuns: 100 }
    )
  })

  it('should include publisher with @type Person', () => {
    fc.assert(
      fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
        const jsonLd = generateArticleJsonLd(post, imageUrl)
        expect(jsonLd.publisher).toBeDefined()
        expect(jsonLd.publisher['@type']).toBe('Person')
        expect(jsonLd.publisher.name).toBe(post.author)
      }),
      { numRuns: 100 }
    )
  })

  it('should include mainEntityOfPage with @type WebPage', () => {
    fc.assert(
      fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
        const jsonLd = generateArticleJsonLd(post, imageUrl)
        expect(jsonLd.mainEntityOfPage).toBeDefined()
        expect(jsonLd.mainEntityOfPage['@type']).toBe('WebPage')
        expect(jsonLd.mainEntityOfPage['@id']).toContain(post.slug.current)
      }),
      { numRuns: 100 }
    )
  })

  it('should produce valid JSON when stringified', () => {
    fc.assert(
      fc.property(blogPostArb, imageUrlArb, (post, imageUrl) => {
        const jsonLd = generateArticleJsonLd(post, imageUrl)
        const jsonString = JSON.stringify(jsonLd)
        const parsed = JSON.parse(jsonString)
        expect(parsed).toEqual(jsonLd)
      }),
      { numRuns: 100 }
    )
  })
})
