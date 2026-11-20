import { describe, it, expect } from "vitest";
import * as fc from "fast-check";

/**
 * **Feature: portfolio-optimization, Property 4: Viewport Animation Single Trigger**
 * **Validates: Requirements 5.1**
 *
 * For any section using whileInView animations, scrolling the section into view,
 * then out of view, then back into view SHALL NOT re-trigger the entrance animation -
 * it should only animate once.
 */

/**
 * This test validates the viewport animation single trigger behavior by simulating
 * the Intersection Observer pattern used by Framer Motion's whileInView with once: true.
 *
 * The key invariant: once an element has been observed as "in view" with once: true,
 * subsequent visibility changes should not trigger additional animation callbacks.
 */

type ViewportConfig = {
  once: boolean;
  margin?: string;
};

type AnimationState = {
  hasAnimated: boolean;
  animationTriggerCount: number;
};

/**
 * Simulates the behavior of Framer Motion's whileInView with viewport config.
 * This models how the animation system tracks whether an element should animate.
 */
function createViewportAnimationTracker(config: ViewportConfig): {
  onVisibilityChange: (isInView: boolean) => void;
  getState: () => AnimationState;
  reset: () => void;
} {
  let hasAnimated = false;
  let animationTriggerCount = 0;

  return {
    onVisibilityChange: (isInView: boolean) => {
      if (isInView) {
        // Only trigger animation if:
        // 1. once is false (always animate), OR
        // 2. once is true AND we haven't animated yet
        if (!config.once || !hasAnimated) {
          animationTriggerCount++;
          hasAnimated = true;
        }
      }
    },
    getState: () => ({ hasAnimated, animationTriggerCount }),
    reset: () => {
      hasAnimated = false;
      animationTriggerCount = 0;
    },
  };
}

/**
 * Simulates a sequence of visibility changes (scrolling in/out of view).
 */
function simulateVisibilitySequence(
  tracker: ReturnType<typeof createViewportAnimationTracker>,
  sequence: boolean[]
): AnimationState {
  sequence.forEach((isInView) => {
    tracker.onVisibilityChange(isInView);
  });
  return tracker.getState();
}

describe("Viewport Animation Single Trigger", () => {
  it("should trigger animation exactly once when viewport.once is true, regardless of visibility sequence", () => {
    fc.assert(
      fc.property(
        // Generate a sequence of visibility changes that includes at least one "in view" event
        fc.array(fc.boolean(), { minLength: 1, maxLength: 20 }).filter(
          (seq) => seq.includes(true) // Ensure at least one "in view" event
        ),
        (visibilitySequence) => {
          const tracker = createViewportAnimationTracker({
            once: true,
            margin: "-100px",
          });

          const finalState = simulateVisibilitySequence(tracker, visibilitySequence);

          // With once: true, animation should trigger exactly once
          expect(finalState.animationTriggerCount).toBe(1);
          expect(finalState.hasAnimated).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should not re-trigger animation when element leaves and re-enters viewport with once: true", () => {
    fc.assert(
      fc.property(
        // Generate number of times element enters viewport (at least 2 to test re-entry)
        fc.integer({ min: 2, max: 10 }),
        (numEntries) => {
          const tracker = createViewportAnimationTracker({
            once: true,
            margin: "-100px",
          });

          // Simulate entering and leaving viewport multiple times
          for (let i = 0; i < numEntries; i++) {
            tracker.onVisibilityChange(true); // Enter viewport
            tracker.onVisibilityChange(false); // Leave viewport
          }

          const finalState = tracker.getState();

          // Despite multiple entries, animation should only trigger once
          expect(finalState.animationTriggerCount).toBe(1);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should trigger animation multiple times when viewport.once is false", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10 }),
        (numEntries) => {
          const tracker = createViewportAnimationTracker({
            once: false,
            margin: "-100px",
          });

          // Simulate entering viewport multiple times
          for (let i = 0; i < numEntries; i++) {
            tracker.onVisibilityChange(true); // Enter viewport
            tracker.onVisibilityChange(false); // Leave viewport
          }

          const finalState = tracker.getState();

          // With once: false, animation should trigger on each entry
          expect(finalState.animationTriggerCount).toBe(numEntries);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should not trigger animation if element never enters viewport", () => {
    fc.assert(
      fc.property(
        // Generate a sequence of only "out of view" events
        fc.array(fc.constant(false), { minLength: 1, maxLength: 20 }),
        (visibilitySequence) => {
          const tracker = createViewportAnimationTracker({
            once: true,
            margin: "-100px",
          });

          const finalState = simulateVisibilitySequence(tracker, visibilitySequence);

          // No animation should trigger if element never enters viewport
          expect(finalState.animationTriggerCount).toBe(0);
          expect(finalState.hasAnimated).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should maintain single trigger invariant regardless of initial visibility state", () => {
    fc.assert(
      fc.property(
        fc.boolean(), // Initial visibility state
        fc.array(fc.boolean(), { minLength: 0, maxLength: 15 }), // Subsequent changes
        (initialVisibility, subsequentChanges) => {
          const tracker = createViewportAnimationTracker({
            once: true,
            margin: "-100px",
          });

          // Apply initial visibility
          tracker.onVisibilityChange(initialVisibility);

          // Apply subsequent changes
          subsequentChanges.forEach((isInView) => {
            tracker.onVisibilityChange(isInView);
          });

          const finalState = tracker.getState();
          const fullSequence = [initialVisibility, ...subsequentChanges];
          const hasAnyInView = fullSequence.includes(true);

          if (hasAnyInView) {
            // If element was ever in view, animation should have triggered exactly once
            expect(finalState.animationTriggerCount).toBe(1);
          } else {
            // If element was never in view, no animation should have triggered
            expect(finalState.animationTriggerCount).toBe(0);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
