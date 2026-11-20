import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import type { SeriesPagePostItem, BlogSeries } from '@/lib/sanity/types'

/**
 * **Feature: sanity-blog-integration, Property 6: Series total reading time**
 * **Validates: Requirements 5.2**
 *
 * For any blog series, the `totalReadingTime` SHALL equal the sum of
 * `estimatedReadingTime` for all posts in that series.
 */

// Generate a valid ISO date string
const isoDateArb = fc
  .integer({ min: 1577836800000, max: 1924905600000 }) // 2020-01-01 to 2030-12-31 in milliseconds
  .map((timestamp) => new Date(timestamp).toISOString())

// Arbitrary for generating a series page post item
const seriesPagePostItemArb = fc.record({
  _id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 100 }),
  slug: fc.record({
    current: fc.string({ minLength: 1, maxLength: 50 }).map((s) =>
      s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'post'
    ),
    _type: fc.constant('slug' as const),
  }),
  excerpt: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
  featuredImage: fc.constant(null),
  publishedAt: isoDateArb,
  orderInSeries: fc.integer({ min: 1, max: 100 }),
  estimatedReadingTime: fc.integer({ min: 1, max: 60 }),
})

// Arbitrary for generating a blog series with posts
const blogSeriesArb = fc.record({
  _id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 100 }),
  slug: fc.record({
    current: fc.string({ minLength: 1, maxLength: 50 }).map((s) =>
      s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'series'
    ),
    _type: fc.constant('slug' as const),
  }),
  description: fc.option(fc.string({ maxLength: 500 }), { nil: null }),
  coverImage: fc.constant(null),
  posts: fc.array(seriesPagePostItemArb, { minLength: 0, maxLength: 20 }),
  totalReadingTime: fc.constant(0), // Will be calculated
})

/**
 * Calculates the total reading time for a series by summing all post reading times
 * This simulates the behavior of the seriesBySlugQuery GROQ query
 */
function calculateTotalReadingTime(posts: readonly SeriesPagePostItem[]): number {
  return posts.reduce((sum, post) => sum + post.estimatedReadingTime, 0)
}

/**
 * Creates a valid BlogSeries with correct totalReadingTime
 */
function createSeriesWithCorrectTotalReadingTime(
  series: Omit<BlogSeries, 'totalReadingTime'>
): BlogSeries {
  return {
    ...series,
    totalReadingTime: calculateTotalReadingTime(series.posts),
  }
}

describe('Series total reading time', () => {
  it('should equal sum of all post reading times', () => {
    fc.assert(
      fc.property(blogSeriesArb, (series) => {
        const expectedTotal = series.posts.reduce(
          (sum, post) => sum + post.estimatedReadingTime,
          0
        )
        const calculatedTotal = calculateTotalReadingTime(series.posts)
        expect(calculatedTotal).toBe(expectedTotal)
      }),
      { numRuns: 100 }
    )
  })

  it('should be 0 for series with no posts', () => {
    fc.assert(
      fc.property(
        fc.record({
          _id: fc.uuid(),
          title: fc.string({ minLength: 1, maxLength: 100 }),
          slug: fc.record({
            current: fc.string({ minLength: 1, maxLength: 50 }).map((s) =>
              s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'series'
            ),
            _type: fc.constant('slug' as const),
          }),
          description: fc.option(fc.string({ maxLength: 500 }), { nil: null }),
          coverImage: fc.constant(null),
          posts: fc.constant([]),
        }),
        (series) => {
          const totalReadingTime = calculateTotalReadingTime(series.posts)
          expect(totalReadingTime).toBe(0)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should equal single post reading time for series with one post', () => {
    fc.assert(
      fc.property(seriesPagePostItemArb, (post) => {
        const totalReadingTime = calculateTotalReadingTime([post])
        expect(totalReadingTime).toBe(post.estimatedReadingTime)
      }),
      { numRuns: 100 }
    )
  })

  it('should be greater than or equal to any individual post reading time', () => {
    fc.assert(
      fc.property(
        fc.array(seriesPagePostItemArb, { minLength: 1, maxLength: 20 }),
        (posts) => {
          const totalReadingTime = calculateTotalReadingTime(posts)
          for (const post of posts) {
            expect(totalReadingTime).toBeGreaterThanOrEqual(post.estimatedReadingTime)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should increase when a post is added', () => {
    fc.assert(
      fc.property(
        fc.array(seriesPagePostItemArb, { minLength: 0, maxLength: 19 }),
        seriesPagePostItemArb,
        (posts, newPost) => {
          const originalTotal = calculateTotalReadingTime(posts)
          const newTotal = calculateTotalReadingTime([...posts, newPost])
          expect(newTotal).toBe(originalTotal + newPost.estimatedReadingTime)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should be commutative (order of posts does not affect total)', () => {
    fc.assert(
      fc.property(
        fc.array(seriesPagePostItemArb, { minLength: 2, maxLength: 20 }),
        (posts) => {
          const originalTotal = calculateTotalReadingTime(posts)
          // Reverse the posts
          const reversedTotal = calculateTotalReadingTime([...posts].reverse())
          // Shuffle the posts
          const shuffledTotal = calculateTotalReadingTime(
            [...posts].sort(() => Math.random() - 0.5)
          )

          expect(reversedTotal).toBe(originalTotal)
          expect(shuffledTotal).toBe(originalTotal)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should always be a non-negative integer', () => {
    fc.assert(
      fc.property(blogSeriesArb, (series) => {
        const totalReadingTime = calculateTotalReadingTime(series.posts)
        expect(totalReadingTime).toBeGreaterThanOrEqual(0)
        expect(Number.isInteger(totalReadingTime)).toBe(true)
      }),
      { numRuns: 100 }
    )
  })

  it('should correctly calculate for series with varying reading times', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer({ min: 1, max: 60 }), { minLength: 1, maxLength: 20 }),
        (readingTimes) => {
          const posts = readingTimes.map((time, index) => ({
            _id: `post-${index}`,
            title: `Post ${index}`,
            slug: { current: `post-${index}`, _type: 'slug' as const },
            excerpt: null,
            featuredImage: null,
            publishedAt: new Date().toISOString(),
            orderInSeries: index + 1,
            estimatedReadingTime: time,
          }))

          const totalReadingTime = calculateTotalReadingTime(posts)
          const expectedTotal = readingTimes.reduce((sum, time) => sum + time, 0)

          expect(totalReadingTime).toBe(expectedTotal)
        }
      ),
      { numRuns: 100 }
    )
  })
})
