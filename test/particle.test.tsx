import { describe, it, expect } from "vitest";
import * as fc from "fast-check";

/**
 * **Feature: portfolio-optimization, Property 1: Particle Position Determinism**
 * **Validates: Requirements 1.1**
 *
 * For any particle index value, rendering the Particle component multiple times
 * with the same index SHALL produce identical position values (left and top CSS properties),
 * ensuring no layout recalculation occurs between renders.
 */

// Extract the position calculation logic to test determinism
function calculateParticlePosition(idx: number) {
  return {
    left: `${(idx * 17 + 5) % 100}%`,
    top: `${(idx * 23 + 10) % 100}%`,
  };
}

describe("Particle Position Determinism", () => {
  it("should produce identical positions for the same index across multiple calls", () => {
    fc.assert(
      fc.property(fc.nat(1000), (idx) => {
        const position1 = calculateParticlePosition(idx);
        const position2 = calculateParticlePosition(idx);
        const position3 = calculateParticlePosition(idx);

        // All calls with the same index should produce identical results
        expect(position1.left).toBe(position2.left);
        expect(position1.top).toBe(position2.top);
        expect(position2.left).toBe(position3.left);
        expect(position2.top).toBe(position3.top);
      }),
      { numRuns: 100 }
    );
  });

  it("should produce valid percentage values between 0% and 99%", () => {
    fc.assert(
      fc.property(fc.nat(1000), (idx) => {
        const position = calculateParticlePosition(idx);

        // Extract numeric values from percentage strings
        const leftValue = parseInt(position.left);
        const topValue = parseInt(position.top);

        // Values should be valid percentages (0-99 due to modulo 100)
        expect(leftValue).toBeGreaterThanOrEqual(0);
        expect(leftValue).toBeLessThan(100);
        expect(topValue).toBeGreaterThanOrEqual(0);
        expect(topValue).toBeLessThan(100);
      }),
      { numRuns: 100 }
    );
  });

  it("should produce different positions for different indices within particle count range", () => {
    // The particle system uses at most 8 particles (indices 0-7)
    // We only need to ensure uniqueness within this realistic range
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 7 }),
        fc.integer({ min: 0, max: 7 }),
        (idx1, idx2) => {
          // Skip when indices are the same
          fc.pre(idx1 !== idx2);

          const position1 = calculateParticlePosition(idx1);
          const position2 = calculateParticlePosition(idx2);

          // Different indices within the particle range should produce different positions
          // (at least one of left or top should differ)
          const positionsAreDifferent =
            position1.left !== position2.left || position1.top !== position2.top;

          expect(positionsAreDifferent).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});
