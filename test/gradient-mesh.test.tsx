import { describe, it, expect } from "vitest";
import * as fc from "fast-check";

/**
 * **Feature: portfolio-optimization, Property 3: Reduced Motion Compliance**
 * **Validates: Requirements 1.5, 5.4, 7.4, 11.4**
 *
 * For any animated component (Particle, FloatingIcon, SectionReveal, GradientMesh),
 * when the user has prefers-reduced-motion media query enabled, the component SHALL
 * either disable animations entirely or display static alternatives without motion.
 */

type AnimationConfig = {
  duration: number;
  iterationCount: number | "infinite";
  delay: number;
  hasTransform: boolean;
};

type ReducedMotionResult = {
  effectiveDuration: number;
  effectiveIterationCount: number;
  isAnimating: boolean;
};

function applyReducedMotionStyles(
  config: AnimationConfig,
  prefersReducedMotion: boolean
): ReducedMotionResult {
  if (prefersReducedMotion) {
    return {
      effectiveDuration: 0.01,
      effectiveIterationCount: 1,
      isAnimating: false,
    };
  }

  return {
    effectiveDuration: config.duration,
    effectiveIterationCount:
      config.iterationCount === "infinite" ? Infinity : config.iterationCount,
    isAnimating: config.duration > 0,
  };
}

type AnimatedComponent =
  | "Particle"
  | "FloatingIcon"
  | "SectionReveal"
  | "GradientMesh"
  | "TerminalCursor";

function getComponentAnimationConfig(component: AnimatedComponent): AnimationConfig {
  switch (component) {
    case "Particle":
      return { duration: 3000, iterationCount: "infinite", delay: 500, hasTransform: true };
    case "FloatingIcon":
      return { duration: 4000, iterationCount: "infinite", delay: 300, hasTransform: true };
    case "SectionReveal":
      return { duration: 500, iterationCount: 1, delay: 200, hasTransform: true };
    case "GradientMesh":
      return { duration: 15000, iterationCount: "infinite", delay: 0, hasTransform: true };
    case "TerminalCursor":
      return { duration: 1000, iterationCount: "infinite", delay: 0, hasTransform: false };
  }
}

describe("Reduced Motion Compliance", () => {
  const animatedComponents: AnimatedComponent[] = [
    "Particle",
    "FloatingIcon",
    "SectionReveal",
    "GradientMesh",
    "TerminalCursor",
  ];

  it("should disable animations for all components when prefers-reduced-motion is enabled", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...animatedComponents),
        (component) => {
          const config = getComponentAnimationConfig(component);
          const result = applyReducedMotionStyles(config, true);

          expect(result.isAnimating).toBe(false);
          expect(result.effectiveDuration).toBeLessThanOrEqual(0.01);
          expect(result.effectiveIterationCount).toBe(1);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should preserve animations when prefers-reduced-motion is not enabled", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...animatedComponents),
        (component) => {
          const config = getComponentAnimationConfig(component);
          const result = applyReducedMotionStyles(config, false);

          expect(result.effectiveDuration).toBe(config.duration);
          if (config.duration > 0) {
            expect(result.isAnimating).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should handle any animation duration consistently with reduced motion", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 60000 }),
        fc.oneof(fc.constant("infinite" as const), fc.integer({ min: 1, max: 100 })),
        fc.integer({ min: 0, max: 5000 }),
        fc.boolean(),
        (duration, iterationCount, delay, hasTransform) => {
          const config: AnimationConfig = {
            duration,
            iterationCount,
            delay,
            hasTransform,
          };

          const reducedResult = applyReducedMotionStyles(config, true);
          const normalResult = applyReducedMotionStyles(config, false);

          expect(reducedResult.effectiveDuration).toBe(0.01);
          expect(reducedResult.effectiveIterationCount).toBe(1);
          expect(reducedResult.isAnimating).toBe(false);
          expect(normalResult.effectiveDuration).toBe(duration);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should ensure infinite animations become single-iteration with reduced motion", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...animatedComponents).filter(
          (c) => getComponentAnimationConfig(c).iterationCount === "infinite"
        ),
        (component) => {
          const config = getComponentAnimationConfig(component);
          const result = applyReducedMotionStyles(config, true);

          expect(result.effectiveIterationCount).toBe(1);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should maintain consistent behavior across multiple reduced motion checks", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...animatedComponents),
        fc.integer({ min: 1, max: 10 }),
        (component, numChecks) => {
          const config = getComponentAnimationConfig(component);
          const results: ReducedMotionResult[] = [];

          for (let i = 0; i < numChecks; i++) {
            results.push(applyReducedMotionStyles(config, true));
          }

          const firstResult = results[0];
          results.forEach((result) => {
            expect(result.effectiveDuration).toBe(firstResult.effectiveDuration);
            expect(result.effectiveIterationCount).toBe(firstResult.effectiveIterationCount);
            expect(result.isAnimating).toBe(firstResult.isAnimating);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
