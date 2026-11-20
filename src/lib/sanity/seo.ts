import type { BlogPost, BlogSeries } from './types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sreejithnair.me'
const authorUrl = siteUrl

/**
 * Social meta tags structure for testing
 * **Feature: sanity-blog-integration, Property 7: Social meta tags completeness**
 * **Validates: Requirements 6.1, 6.2, 6.3**
 */
export interface SocialMetaTags {
  title: string
  description: string
  openGraph: {
    title: string
    description: string
    url: string
    type: string
    image: string
  }
  twitter: {
    card: string
    title: string
    description: string
    image: string
  }
}

/**
 * Article JSON-LD schema for blog posts
 * **Feature: sanity-blog-integration, Property 8: Article JSON-LD validity**
 * **Validates: Requirements 6.4**
 */
export interface ArticleJsonLd {
  '@context': 'https://schema.org'
  '@type': 'Article'
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified: string
  author: {
    '@type': 'Person'
    name: string
    url: string
  }
  publisher: {
    '@type': 'Person'
    name: string
  }
  mainEntityOfPage: {
    '@type': 'WebPage'
    '@id': string
  }
}

/**
 * ItemList JSON-LD schema for series pages
 * **Feature: sanity-blog-integration, Property 9: ItemList JSON-LD validity**
 * **Validates: Requirements 6.5**
 */
export interface ItemListJsonLd {
  '@context': 'https://schema.org'
  '@type': 'ItemList'
  name: string
  description: string
  numberOfItems: number
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    url: string
    name: string
  }>
}

/**
 * Generate social meta tags for a blog post
 * @param post - The blog post
 * @param imageUrl - Pre-computed image URL (from urlFor or fallback)
 */
export function generatePostSocialMetaTags(post: BlogPost, imageUrl: string): SocialMetaTags {
  const title = `${post.title} | Sreejith Nair`
  const description = post.excerpt || `Read ${post.title} by ${post.author}`
  const url = `${siteUrl}/blog/${post.slug.current}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      image: imageUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: imageUrl,
    },
  }
}

/**
 * Generate social meta tags for a blog series
 * @param series - The blog series
 * @param imageUrl - Pre-computed image URL (from urlFor or fallback)
 */
export function generateSeriesSocialMetaTags(series: BlogSeries, imageUrl: string): SocialMetaTags {
  const title = `${series.title} | Blog Series | Sreejith Nair`
  const description = series.description || `Read the ${series.title} blog series by Sreejith Nair. ${series.posts.length} posts, ${series.totalReadingTime} min total reading time.`
  const url = `${siteUrl}/blog/series/${series.slug.current}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      image: imageUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: imageUrl,
    },
  }
}

/**
 * Generate Article JSON-LD structured data for a blog post
 * @param post - The blog post
 * @param imageUrl - Pre-computed image URL (from urlFor or fallback)
 */
export function generateArticleJsonLd(post: BlogPost, imageUrl: string): ArticleJsonLd {
  const postUrl = `${siteUrl}/blog/${post.slug.current}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || `Read ${post.title} by ${post.author}`,
    image: imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
      url: authorUrl,
    },
    publisher: {
      '@type': 'Person',
      name: post.author,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  }
}

/**
 * Generate ItemList JSON-LD structured data for a blog series
 */
export function generateItemListJsonLd(series: BlogSeries): ItemListJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: series.title,
    description: series.description || `${series.title} blog series`,
    numberOfItems: series.posts.length,
    itemListElement: series.posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/blog/${post.slug.current}`,
      name: post.title,
    })),
  }
}
