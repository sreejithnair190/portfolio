import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { generateItemListJsonLd, type ItemListJsonLd } from '@/lib/sanity/seo'
import type { BlogSeries, SeriesPagePostItem } from '@/lib/sanity/types'

/**
 * **Feature: sanity-blog-integration, Property 9: ItemList JSON-LD validity**
 * **Validates: Requirements 6.5**
 *
 * For any blog series, the generated JSON-LD SHALL be a valid ItemList schema containing:
 * @context, @type="ItemList", name, numberOfItems matching post count, and
 * itemListElement array with ListItem entries for each post.
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

describe('ItemList JSON-LD validity', () => {
  it('should include @context as https://schema.org', () => {
    fc.assert(
      fc.property(blogSeriesArb, (series) => {
        const jsonLd = generateItemListJsonLd(series)
        expect(jsonLd['@context']).toBe('https://schema.org')
      }),
      { numRuns: 100 }
    )
  })

  it('should include @type as ItemList', () => {
    fc.assert(
      fc.property(blogSeriesArb, (series) => {
        const jsonLd = generateItemListJsonLd(series)
        expect(jsonLd['@type']).toBe('ItemList')
      }),
      { numRuns: 100 }
    )
  })

  it('should include name matching series title', () => {
    fc.assert(
      fc.property(blogSeriesArb, (series) => {
        const jsonLd = generateItemListJsonLd(series)
        expect(jsonLd.name).toBe(series.title)
      }),
      { numRuns: 100 }
    )
  })

  it('should include non-empty description', () => {
    fc.assert(
      fc.property(blogSeriesArb, (series) => {
        const jsonLd = generateItemListJsonLd(series)
        expect(jsonLd.description).toBeDefined()
        expect(jsonLd.description.length).toBeGreaterThan(0)
      }),
      { numRuns: 100 }
    )
  })

  it('should include numberOfItems matching post count', () => {
    fc.assert(
      fc.property(blogSeriesArb, (series) => {
        const jsonLd = generateItemListJsonLd(series)
        expect(jsonLd.numberOfItems).toBe(series.posts.length)
      }),
      { numRuns: 100 }
    )
  })

  it('should include itemListElement array with correct length', () => {
    fc.assert(
      fc.property(blogSeriesArb, (series) => {
        const jsonLd = generateItemListJsonLd(series)
        expect(jsonLd.itemListElement).toBeDefined()
        expect(Array.isArray(jsonLd.itemListElement)).toBe(true)
        expect(jsonLd.itemListElement.length).toBe(series.posts.length)
      }),
      { numRuns: 100 }
    )
  })

  it('should include ListItem entries with @type ListItem', () => {
    fc.assert(
      fc.property(blogSeriesArb, (series) => {
        const jsonLd = generateItemListJsonLd(series)
        jsonLd.itemListElement.forEach((item) => {
          expect(item['@type']).toBe('ListItem')
        })
      }),
      { numRuns: 100 }
    )
  })

  it('should include ListItem entries with sequential positions starting at 1', () => {
    fc.assert(
      fc.property(blogSeriesArb, (series) => {
        const jsonLd = generateItemListJsonLd(series)
        jsonLd.itemListElement.forEach((item, index) => {
          expect(item.position).toBe(index + 1)
        })
      }),
      { numRuns: 100 }
    )
  })

  it('should include ListItem entries with valid URLs', () => {
    fc.assert(
      fc.property(blogSeriesArb, (series) => {
        const jsonLd = generateItemListJsonLd(series)
        jsonLd.itemListElement.forEach((item, index) => {
          expect(item.url).toContain('/blog/')
          expect(item.url).toContain(series.posts[index].slug.current)
        })
      }),
      { numRuns: 100 }
    )
  })

  it('should include ListItem entries with names matching post titles', () => {
    fc.assert(
      fc.property(blogSeriesArb, (series) => {
        const jsonLd = generateItemListJsonLd(series)
        jsonLd.itemListElement.forEach((item, index) => {
          expect(item.name).toBe(series.posts[index].title)
        })
      }),
      { numRuns: 100 }
    )
  })

  it('should produce valid JSON when stringified', () => {
    fc.assert(
      fc.property(blogSeriesArb, (series) => {
        const jsonLd = generateItemListJsonLd(series)
        const jsonString = JSON.stringify(jsonLd)
        const parsed = JSON.parse(jsonString)
        expect(parsed).toEqual(jsonLd)
      }),
      { numRuns: 100 }
    )
  })
})
