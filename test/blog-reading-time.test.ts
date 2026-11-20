import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { calculateReadingTime } from '@/lib/sanity/utils'

/**
 * **Feature: sanity-blog-integration, Property 5: Reading time calculation**
 * **Validates: Requirements 4.4**
 *
 * For any blog post content, the estimated reading time SHALL equal the word count
 * divided by 200 (average reading speed), rounded to the nearest minute with a
 * minimum of 1 minute.
 */
describe('Reading time calculation', () => {
  it('should return minimum 1 minute for any word count', () => {
    fc.assert(
      fc.property(fc.nat(10000), (wordCount) => {
        const readingTime = calculateReadingTime(wordCount)
        expect(readingTime).toBeGreaterThanOrEqual(1)
      }),
      { numRuns: 100 }
    )
  })

  it('should return 1 minute for word counts less than 100', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 99 }), (wordCount) => {
        const readingTime = calculateReadingTime(wordCount)
        // 0-99 words / 200 = 0-0.495, rounds to 0, but minimum is 1
        expect(readingTime).toBe(1)
      }),
      { numRuns: 100 }
    )
  })

  it('should return 1 minute for word counts between 100 and 299', () => {
    fc.assert(
      fc.property(fc.integer({ min: 100, max: 299 }), (wordCount) => {
        const readingTime = calculateReadingTime(wordCount)
        // 100-299 words / 200 = 0.5-1.495, rounds to 1
        expect(readingTime).toBe(1)
      }),
      { numRuns: 100 }
    )
  })

  it('should return 2 minutes for word counts between 300 and 499', () => {
    fc.assert(
      fc.property(fc.integer({ min: 300, max: 499 }), (wordCount) => {
        const readingTime = calculateReadingTime(wordCount)
        // 300-499 words / 200 = 1.5-2.495, rounds to 2
        expect(readingTime).toBe(2)
      }),
      { numRuns: 100 }
    )
  })

  it('should calculate reading time as round(wordCount / 200) with minimum 1', () => {
    fc.assert(
      fc.property(fc.nat(50000), (wordCount) => {
        const readingTime = calculateReadingTime(wordCount)
        const expected = Math.max(1, Math.round(wordCount / 200))
        expect(readingTime).toBe(expected)
      }),
      { numRuns: 100 }
    )
  })

  it('should increase reading time proportionally with word count', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 200, max: 10000 }),
        fc.integer({ min: 200, max: 10000 }),
        (wordCount1, wordCount2) => {
          // Ensure wordCount2 is significantly larger
          fc.pre(wordCount2 > wordCount1 + 200)

          const readingTime1 = calculateReadingTime(wordCount1)
          const readingTime2 = calculateReadingTime(wordCount2)

          // More words should result in equal or greater reading time
          expect(readingTime2).toBeGreaterThanOrEqual(readingTime1)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should return integer values', () => {
    fc.assert(
      fc.property(fc.nat(50000), (wordCount) => {
        const readingTime = calculateReadingTime(wordCount)
        expect(Number.isInteger(readingTime)).toBe(true)
      }),
      { numRuns: 100 }
    )
  })
})
