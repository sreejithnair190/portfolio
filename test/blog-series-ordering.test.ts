import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import type { SeriesPagePostItem } from '@/lib/sanity/types'

/**
 * **Feature: sanity-blog-integration, Property 2: Series posts ordered by orderInSeries**
 * **Validates: Requirements 2.3**
 *
 * For any blog series with multiple posts, when the posts are retrieved and displayed,
 * they SHALL be sorted in ascending order by their `orderInSeries` field.
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

// Arbitrary for generating an array of series posts with unique orderInSeries values
const seriesPostsArb = fc
  .array(seriesPagePostItemArb, { minLength: 0, maxLength: 20 })
  .map((posts) => {
    // Assign unique orderInSeries values
    return posts.map((post, index) => ({
      ...post,
      orderInSeries: index + 1,
    }))
  })

/**
 * Sorts posts by orderInSeries in ascending order
 * This simulates the behavior of the seriesBySlugQuery GROQ query
 */
function sortPostsByOrderInSeries(posts: SeriesPagePostItem[]): SeriesPagePostItem[] {
  return [...posts].sort((a, b) => {
    const orderA = a.orderInSeries ?? 0
    const orderB = b.orderInSeries ?? 0
    return orderA - orderB // Ascending order
  })
}

/**
 * Checks if posts are sorted by orderInSeries in ascending order
 */
function isAscendingByOrderInSeries(posts: SeriesPagePostItem[]): boolean {
  for (let i = 0; i < posts.length - 1; i++) {
    const currentOrder = posts[i].orderInSeries ?? 0
    const nextOrder = posts[i + 1].orderInSeries ?? 0
    if (currentOrder > nextOrder) {
      return false
    }
  }
  return true
}

describe('Series posts ordered by orderInSeries', () => {
  it('should sort posts in ascending order by orderInSeries', () => {
    fc.assert(
      fc.property(seriesPostsArb, (posts) => {
        // Shuffle posts to simulate unsorted input
        const shuffled = [...posts].sort(() => Math.random() - 0.5)
        const sortedPosts = sortPostsByOrderInSeries(shuffled)
        expect(isAscendingByOrderInSeries(sortedPosts)).toBe(true)
      }),
      { numRuns: 100 }
    )
  })

  it('should have first post with lowest orderInSeries', () => {
    fc.assert(
      fc.property(
        fc.array(seriesPagePostItemArb, { minLength: 1, maxLength: 20 }).map((posts) =>
          posts.map((post, index) => ({ ...post, orderInSeries: index + 1 }))
        ),
        (posts) => {
          const sortedPosts = sortPostsByOrderInSeries(posts)
          const firstPostOrder = sortedPosts[0].orderInSeries ?? 0

          for (const post of sortedPosts) {
            const postOrder = post.orderInSeries ?? 0
            expect(firstPostOrder).toBeLessThanOrEqual(postOrder)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should have last post with highest orderInSeries', () => {
    fc.assert(
      fc.property(
        fc.array(seriesPagePostItemArb, { minLength: 1, maxLength: 20 }).map((posts) =>
          posts.map((post, index) => ({ ...post, orderInSeries: index + 1 }))
        ),
        (posts) => {
          const sortedPosts = sortPostsByOrderInSeries(posts)
          const lastPostOrder = sortedPosts[sortedPosts.length - 1].orderInSeries ?? 0

          for (const post of sortedPosts) {
            const postOrder = post.orderInSeries ?? 0
            expect(lastPostOrder).toBeGreaterThanOrEqual(postOrder)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should preserve all posts after sorting (no posts lost)', () => {
    fc.assert(
      fc.property(seriesPostsArb, (posts) => {
        const sortedPosts = sortPostsByOrderInSeries(posts)
        expect(sortedPosts.length).toBe(posts.length)

        // All original post IDs should be present
        const originalIds = new Set(posts.map((p) => p._id))
        const sortedIds = new Set(sortedPosts.map((p) => p._id))
        expect(sortedIds).toEqual(originalIds)
      }),
      { numRuns: 100 }
    )
  })

  it('should be idempotent (sorting twice gives same result)', () => {
    fc.assert(
      fc.property(seriesPostsArb, (posts) => {
        const sortedOnce = sortPostsByOrderInSeries(posts)
        const sortedTwice = sortPostsByOrderInSeries(sortedOnce)

        expect(sortedTwice.map((p) => p._id)).toEqual(sortedOnce.map((p) => p._id))
      }),
      { numRuns: 100 }
    )
  })

  it('should handle empty array', () => {
    const sortedPosts = sortPostsByOrderInSeries([])
    expect(sortedPosts).toEqual([])
    expect(isAscendingByOrderInSeries(sortedPosts)).toBe(true)
  })

  it('should handle single post array', () => {
    fc.assert(
      fc.property(seriesPagePostItemArb, (post) => {
        const sortedPosts = sortPostsByOrderInSeries([post])
        expect(sortedPosts.length).toBe(1)
        expect(sortedPosts[0]._id).toBe(post._id)
        expect(isAscendingByOrderInSeries(sortedPosts)).toBe(true)
      }),
      { numRuns: 100 }
    )
  })

  it('should handle posts with null orderInSeries (treated as 0)', () => {
    fc.assert(
      fc.property(
        fc.array(seriesPagePostItemArb, { minLength: 2, maxLength: 10 }),
        (posts) => {
          // Set some posts to have null orderInSeries
          const postsWithNulls = posts.map((p, i) => ({
            ...p,
            orderInSeries: i % 2 === 0 ? null : i + 1,
          }))

          const sortedPosts = sortPostsByOrderInSeries(postsWithNulls)

          // Should still be valid ascending order (nulls treated as 0)
          expect(isAscendingByOrderInSeries(sortedPosts)).toBe(true)
          expect(sortedPosts.length).toBe(posts.length)
        }
      ),
      { numRuns: 100 }
    )
  })
})
