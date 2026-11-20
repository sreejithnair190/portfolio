import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { getSeriesNavigation } from '@/lib/sanity/utils'
import type { SeriesPostItem } from '@/lib/sanity/types'

/**
 * **Feature: sanity-blog-integration, Property 3: Series navigation correctness**
 * **Validates: Requirements 2.4**
 *
 * For any blog post that belongs to a series, the navigation SHALL correctly
 * identify the previous post (orderInSeries - 1) and next post (orderInSeries + 1),
 * returning null for first/last posts respectively.
 */

// Arbitrary for generating a series post item
const seriesPostItemArb = fc.record({
  _id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 100 }),
  slug: fc.record({
    current: fc.string({ minLength: 1, maxLength: 50 }).map((s) =>
      s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'post'
    ),
    _type: fc.constant('slug' as const),
  }),
  orderInSeries: fc.integer({ min: 1, max: 100 }),
})

// Arbitrary for generating a sorted array of series posts
const sortedSeriesPostsArb = fc
  .array(seriesPostItemArb, { minLength: 1, maxLength: 20 })
  .map((posts) => {
    // Assign unique orderInSeries values and sort
    return posts
      .map((post, index) => ({ ...post, orderInSeries: index + 1 }))
      .sort((a, b) => (a.orderInSeries ?? 0) - (b.orderInSeries ?? 0))
  })

describe('Series navigation correctness', () => {
  it('should return null for previousPost when current post is first', () => {
    fc.assert(
      fc.property(sortedSeriesPostsArb, (posts) => {
        const firstPost = posts[0]
        const navigation = getSeriesNavigation(posts, firstPost._id)

        expect(navigation.previousPost).toBeNull()
        expect(navigation.currentIndex).toBe(1)
      }),
      { numRuns: 100 }
    )
  })

  it('should return null for nextPost when current post is last', () => {
    fc.assert(
      fc.property(sortedSeriesPostsArb, (posts) => {
        const lastPost = posts[posts.length - 1]
        const navigation = getSeriesNavigation(posts, lastPost._id)

        expect(navigation.nextPost).toBeNull()
        expect(navigation.currentIndex).toBe(posts.length)
      }),
      { numRuns: 100 }
    )
  })

  it('should return correct previous and next posts for middle posts', () => {
    fc.assert(
      fc.property(
        fc.array(seriesPostItemArb, { minLength: 3, maxLength: 20 }).map((posts) =>
          posts
            .map((post, index) => ({ ...post, orderInSeries: index + 1 }))
            .sort((a, b) => (a.orderInSeries ?? 0) - (b.orderInSeries ?? 0))
        ),
        fc.integer({ min: 1 }),
        (posts, indexOffset) => {
          // Pick a middle post (not first or last)
          const middleIndex = (indexOffset % (posts.length - 2)) + 1
          const currentPost = posts[middleIndex]
          const navigation = getSeriesNavigation(posts, currentPost._id)

          // Previous post should be the one before
          expect(navigation.previousPost).not.toBeNull()
          expect(navigation.previousPost?.slug).toBe(posts[middleIndex - 1].slug.current)
          expect(navigation.previousPost?.title).toBe(posts[middleIndex - 1].title)

          // Next post should be the one after
          expect(navigation.nextPost).not.toBeNull()
          expect(navigation.nextPost?.slug).toBe(posts[middleIndex + 1].slug.current)
          expect(navigation.nextPost?.title).toBe(posts[middleIndex + 1].title)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should return correct totalPosts count', () => {
    fc.assert(
      fc.property(sortedSeriesPostsArb, (posts) => {
        const randomPost = posts[Math.floor(Math.random() * posts.length)]
        const navigation = getSeriesNavigation(posts, randomPost._id)

        expect(navigation.totalPosts).toBe(posts.length)
      }),
      { numRuns: 100 }
    )
  })

  it('should return 1-based currentIndex', () => {
    fc.assert(
      fc.property(
        sortedSeriesPostsArb,
        fc.integer({ min: 0 }),
        (posts, indexOffset) => {
          const index = indexOffset % posts.length
          const currentPost = posts[index]
          const navigation = getSeriesNavigation(posts, currentPost._id)

          // currentIndex should be 1-based (index + 1)
          expect(navigation.currentIndex).toBe(index + 1)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should return -1 currentIndex for non-existent post', () => {
    fc.assert(
      fc.property(sortedSeriesPostsArb, fc.uuid(), (posts, nonExistentId) => {
        // Ensure the ID doesn't exist in posts
        fc.pre(!posts.some((p) => p._id === nonExistentId))

        const navigation = getSeriesNavigation(posts, nonExistentId)

        expect(navigation.currentIndex).toBe(-1)
        expect(navigation.previousPost).toBeNull()
        expect(navigation.nextPost).toBeNull()
      }),
      { numRuns: 100 }
    )
  })

  it('should handle single post series correctly', () => {
    fc.assert(
      fc.property(seriesPostItemArb, (post) => {
        const posts = [{ ...post, orderInSeries: 1 }]
        const navigation = getSeriesNavigation(posts, post._id)

        // Single post should have no previous or next
        expect(navigation.previousPost).toBeNull()
        expect(navigation.nextPost).toBeNull()
        expect(navigation.currentIndex).toBe(1)
        expect(navigation.totalPosts).toBe(1)
      }),
      { numRuns: 100 }
    )
  })
})
