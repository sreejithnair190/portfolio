import type { SeriesNavigation, SeriesPostItem } from './types'

/**
 * Generates a URL-friendly slug from a title string.
 * 
 * Property 1: Slug URL-friendliness
 * - Contains only lowercase letters, numbers, and hyphens
 * - No leading/trailing hyphens
 * - No consecutive hyphens
 * 
 * @param title - The title to convert to a slug
 * @returns A URL-friendly slug string
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // Remove all characters except lowercase letters, numbers, and hyphens
    .replace(/[^a-z0-9-]/g, '')
    // Replace consecutive hyphens with a single hyphen
    .replace(/-+/g, '-')
    // Remove leading hyphens
    .replace(/^-+/, '')
    // Remove trailing hyphens
    .replace(/-+$/, '')
}

/**
 * Calculates the estimated reading time for content.
 * 
 * Property 5: Reading time calculation
 * - Based on word count divided by 200 (average reading speed)
 * - Minimum of 1 minute
 * 
 * @param wordCount - The number of words in the content
 * @returns Estimated reading time in minutes (minimum 1)
 */
export function calculateReadingTime(wordCount: number): number {
  const readingTime = Math.round(wordCount / 200)
  return Math.max(1, readingTime)
}

/**
 * Gets the navigation information for a post within a series.
 * 
 * Property 3: Series navigation correctness
 * - Previous post is the one with orderInSeries - 1
 * - Next post is the one with orderInSeries + 1
 * - Returns null for first/last posts respectively
 * 
 * @param posts - Array of posts in the series, sorted by orderInSeries
 * @param currentPostId - The ID of the current post
 * @returns Navigation object with previous/next posts and position info
 */
export function getSeriesNavigation(
  posts: SeriesPostItem[],
  currentPostId: string
): SeriesNavigation {
  const currentIndex = posts.findIndex((post) => post._id === currentPostId)

  if (currentIndex === -1) {
    return {
      previousPost: null,
      nextPost: null,
      currentIndex: -1,
      totalPosts: posts.length,
    }
  }

  const previousPost =
    currentIndex > 0
      ? {
          title: posts[currentIndex - 1].title,
          slug: posts[currentIndex - 1].slug.current,
        }
      : null

  const nextPost =
    currentIndex < posts.length - 1
      ? {
          title: posts[currentIndex + 1].title,
          slug: posts[currentIndex + 1].slug.current,
        }
      : null

  return {
    previousPost,
    nextPost,
    currentIndex: currentIndex + 1, // 1-based index for display
    totalPosts: posts.length,
  }
}
