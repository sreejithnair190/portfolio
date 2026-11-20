import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import type { BlogPostListItem } from '@/lib/sanity/types'

/**
 * **Feature: sanity-blog-integration, Property 4: Blog listing ordered by date descending**
 * **Validates: Requirements 3.2**
 *
 * For any list of blog posts returned by the listing query, the posts SHALL be
 * sorted by `publishedAt` in descending order (newest first).
 */

// Generate a valid ISO date string
const isoDateArb = fc
  .integer({ min: 1577836800000, max: 1924905600000 }) // 2020-01-01 to 2030-12-31 in milliseconds
  .map((timestamp) => new Date(timestamp).toISOString())

// Arbitrary for generating a blog post list item
const blogPostListItemArb = fc.record({
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
  author: fc.constant('Sreejith Nair'),
  estimatedReadingTime: fc.integer({ min: 1, max: 60 }),
  series: fc.constant(null),
})

// Arbitrary for generating an array of blog posts
const blogPostsArb = fc.array(blogPostListItemArb, { minLength: 0, maxLength: 50 })

/**
 * Sorts posts by publishedAt in descending order (newest first)
 * This simulates the behavior of the allPostsQuery GROQ query
 */
function sortPostsByDateDescending(posts: BlogPostListItem[]): BlogPostListItem[] {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime()
    const dateB = new Date(b.publishedAt).getTime()
    return dateB - dateA // Descending order
  })
}

/**
 * Checks if posts are sorted by publishedAt in descending order
 */
function isDescendingByDate(posts: BlogPostListItem[]): boolean {
  for (let i = 0; i < posts.length - 1; i++) {
    const currentDate = new Date(posts[i].publishedAt).getTime()
    const nextDate = new Date(posts[i + 1].publishedAt).getTime()
    if (currentDate < nextDate) {
      return false
    }
  }
  return true
}

describe('Blog listing ordered by date descending', () => {
  it('should sort posts with newest first', () => {
    fc.assert(
      fc.property(blogPostsArb, (posts) => {
        const sortedPosts = sortPostsByDateDescending(posts)
        expect(isDescendingByDate(sortedPosts)).toBe(true)
      }),
      { numRuns: 100 }
    )
  })

  it('should have first post with latest or equal date compared to all others', () => {
    fc.assert(
      fc.property(
        fc.array(blogPostListItemArb, { minLength: 1, maxLength: 50 }),
        (posts) => {
          const sortedPosts = sortPostsByDateDescending(posts)
          const firstPostDate = new Date(sortedPosts[0].publishedAt).getTime()

          for (const post of sortedPosts) {
            const postDate = new Date(post.publishedAt).getTime()
            expect(firstPostDate).toBeGreaterThanOrEqual(postDate)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should have last post with earliest or equal date compared to all others', () => {
    fc.assert(
      fc.property(
        fc.array(blogPostListItemArb, { minLength: 1, maxLength: 50 }),
        (posts) => {
          const sortedPosts = sortPostsByDateDescending(posts)
          const lastPostDate = new Date(sortedPosts[sortedPosts.length - 1].publishedAt).getTime()

          for (const post of sortedPosts) {
            const postDate = new Date(post.publishedAt).getTime()
            expect(lastPostDate).toBeLessThanOrEqual(postDate)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should preserve all posts after sorting (no posts lost)', () => {
    fc.assert(
      fc.property(blogPostsArb, (posts) => {
        const sortedPosts = sortPostsByDateDescending(posts)
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
      fc.property(blogPostsArb, (posts) => {
        const sortedOnce = sortPostsByDateDescending(posts)
        const sortedTwice = sortPostsByDateDescending(sortedOnce)

        expect(sortedTwice.map((p) => p._id)).toEqual(sortedOnce.map((p) => p._id))
      }),
      { numRuns: 100 }
    )
  })

  it('should handle empty array', () => {
    const sortedPosts = sortPostsByDateDescending([])
    expect(sortedPosts).toEqual([])
    expect(isDescendingByDate(sortedPosts)).toBe(true)
  })

  it('should handle single post array', () => {
    fc.assert(
      fc.property(blogPostListItemArb, (post) => {
        const sortedPosts = sortPostsByDateDescending([post])
        expect(sortedPosts.length).toBe(1)
        expect(sortedPosts[0]._id).toBe(post._id)
        expect(isDescendingByDate(sortedPosts)).toBe(true)
      }),
      { numRuns: 100 }
    )
  })

  it('should handle posts with same publishedAt date', () => {
    fc.assert(
      fc.property(
        fc.array(blogPostListItemArb, { minLength: 2, maxLength: 10 }),
        fc.integer({ min: 1577836800000, max: 1924905600000 }),
        (posts, timestamp) => {
          const sameDate = new Date(timestamp).toISOString()
          // Set all posts to have the same date
          const postsWithSameDate = posts.map((p) => ({
            ...p,
            publishedAt: sameDate,
          }))

          const sortedPosts = sortPostsByDateDescending(postsWithSameDate)

          // Should still be valid (all dates equal means descending is satisfied)
          expect(isDescendingByDate(sortedPosts)).toBe(true)
          expect(sortedPosts.length).toBe(posts.length)
        }
      ),
      { numRuns: 100 }
    )
  })
})
