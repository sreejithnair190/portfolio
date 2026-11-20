import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { generateSlug } from '@/lib/sanity/utils'

/**
 * **Feature: sanity-blog-integration, Property 1: Slug URL-friendliness**
 * **Validates: Requirements 1.4**
 *
 * For any blog post title string, the generated slug SHALL contain only
 * lowercase letters, numbers, and hyphens, with no leading/trailing hyphens
 * or consecutive hyphens.
 */
describe('Slug URL-friendliness', () => {
  // Arbitrary for generating various title strings
  const titleArb = fc.string({ minLength: 0, maxLength: 200 })

  it('should contain only lowercase letters, numbers, and hyphens', () => {
    fc.assert(
      fc.property(titleArb, (title) => {
        const slug = generateSlug(title)
        // Slug should only contain lowercase letters, numbers, and hyphens
        const validSlugPattern = /^[a-z0-9-]*$/
        expect(slug).toMatch(validSlugPattern)
      }),
      { numRuns: 100 }
    )
  })

  it('should not have leading hyphens', () => {
    fc.assert(
      fc.property(titleArb, (title) => {
        const slug = generateSlug(title)
        // If slug is non-empty, it should not start with a hyphen
        if (slug.length > 0) {
          expect(slug[0]).not.toBe('-')
        }
      }),
      { numRuns: 100 }
    )
  })

  it('should not have trailing hyphens', () => {
    fc.assert(
      fc.property(titleArb, (title) => {
        const slug = generateSlug(title)
        // If slug is non-empty, it should not end with a hyphen
        if (slug.length > 0) {
          expect(slug[slug.length - 1]).not.toBe('-')
        }
      }),
      { numRuns: 100 }
    )
  })

  it('should not have consecutive hyphens', () => {
    fc.assert(
      fc.property(titleArb, (title) => {
        const slug = generateSlug(title)
        // Slug should not contain consecutive hyphens
        expect(slug).not.toMatch(/--/)
      }),
      { numRuns: 100 }
    )
  })

  it('should convert uppercase to lowercase', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }).filter((s) => /[A-Z]/.test(s)),
        (title) => {
          const slug = generateSlug(title)
          // Slug should not contain any uppercase letters
          expect(slug).not.toMatch(/[A-Z]/)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should convert spaces to hyphens', () => {
    fc.assert(
      fc.property(
        fc.array(fc.stringMatching(/^[a-z]+$/), { minLength: 2, maxLength: 5 }),
        (words) => {
          const title = words.join(' ')
          const slug = generateSlug(title)
          // Words should be joined by hyphens
          expect(slug).toBe(words.join('-'))
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should handle titles with special characters', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }),
        (title) => {
          const slug = generateSlug(title)
          // Result should still be valid (only lowercase, numbers, hyphens)
          expect(slug).toMatch(/^[a-z0-9-]*$/)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should produce empty string for titles with no valid characters', () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[!@#$%^&*()+=\[\]{}|\\:;"'<>,.\/?`~\s]*$/),
        (title) => {
          const slug = generateSlug(title)
          // Should produce empty string when no alphanumeric characters
          expect(slug).toBe('')
        }
      ),
      { numRuns: 100 }
    )
  })
})
