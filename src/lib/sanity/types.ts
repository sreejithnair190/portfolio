import type { PortableTextBlock } from '@portabletext/types'

/**
 * Sanity image asset reference
 */
export interface SanityImage {
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  alt?: string
}

/**
 * Slug type from Sanity
 */
export interface SanitySlug {
  current: string
  _type: 'slug'
}

/**
 * Minimal series reference for blog post listings
 */
export interface BlogSeriesReference {
  _id: string
  title: string
  slug: SanitySlug
}

/**
 * Blog post type for listings (without full content)
 */
export interface BlogPostListItem {
  _id: string
  title: string
  slug: SanitySlug
  excerpt: string | null
  featuredImage: SanityImage | null
  publishedAt: string
  author: string
  estimatedReadingTime: number
  series: BlogSeriesReference | null
}

/**
 * Blog post within a series (for navigation)
 */
export interface SeriesPostItem {
  _id: string
  title: string
  slug: SanitySlug
  orderInSeries: number | null
}

/**
 * Series with posts for navigation context
 */
export interface BlogSeriesWithPosts {
  _id: string
  title: string
  slug: SanitySlug
  description: string | null
  posts: SeriesPostItem[]
}

/**
 * Full blog post type (for individual post pages)
 */
export interface BlogPost {
  _id: string
  title: string
  slug: SanitySlug
  excerpt: string | null
  featuredImage: SanityImage | null
  content: PortableTextBlock[]
  publishedAt: string
  author: string
  orderInSeries: number | null
  estimatedReadingTime: number
  series: BlogSeriesWithPosts | null
}

/**
 * Post item within a series page
 */
export interface SeriesPagePostItem {
  _id: string
  title: string
  slug: SanitySlug
  excerpt: string | null
  featuredImage: SanityImage | null
  publishedAt: string
  orderInSeries: number | null
  estimatedReadingTime: number
}

/**
 * Full blog series type (for series detail pages)
 */
export interface BlogSeries {
  _id: string
  title: string
  slug: SanitySlug
  description: string | null
  coverImage: SanityImage | null
  posts: SeriesPagePostItem[]
  totalReadingTime: number
}

/**
 * Series listing item (for series index page)
 */
export interface BlogSeriesListItem {
  _id: string
  title: string
  slug: SanitySlug
  description: string | null
  coverImage: SanityImage | null
  postCount: number
}

/**
 * Navigation between posts in a series
 */
export interface SeriesNavigation {
  previousPost: {
    title: string
    slug: string
  } | null
  nextPost: {
    title: string
    slug: string
  } | null
  currentIndex: number
  totalPosts: number
}
