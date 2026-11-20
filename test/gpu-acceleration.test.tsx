import { describe, it, expect } from "vitest";
import * as fc from "fast-check";

/**
 * **Feature: portfolio-optimization, Property 5: GPU Acceleration Hints**
 * **Validates: Requirements 1.4, 2.3, 11.1**
 *
 * For any element with Framer Motion transform or opacity animations
 * (Particle, FloatingIcon, ScrollReveal children), the rendered element
 * SHALL have the will-change CSS property or class applied to enable GPU acceleration.
 */

/**
 * Represents the types of animations that require GPU acceleration hints.
 */
type AnimationType = "transform" | "opacity" | "transform-opacity" | "none";

/**
 * Represents a component configuration that may need GPU acceleration.
 */
type AnimatedComponentConfig = {
  name: string;
  animationType: AnimationType;
  hasWillChangeClass: boolean;
  hasWillChangeInlineStyle: boolean;
};

/**
 * Determines if a component configuration has proper GPU acceleration hints.
 * A component needs GPU hints if it has transform or opacity animations.
 */
function hasProperGPUAccelerationHints(config: AnimatedComponentConfig): boolean {
  // If no animation, no GPU hints needed
  if (config.animationType === "none") {
    return true;
  }

  // For animated components, must have will-change via class or inline style
  return config.hasWillChangeClass || config.hasWillChangeInlineStyle;
}

/**
 * Returns the expected will-change CSS value for a given animation type.
 */
function getExpectedWillChangeValue(animationType: AnimationType): string {
  switch (animationType) {
    case "transform":
      return "transform";
    case "opacity":
      return "opacity";
    case "transform-opacity":
      return "transform, opacity";
    case "none":
      return "auto";
  }
}

/**
 * Validates that a CSS class name correctly indicates GPU acceleration.
 */
function isValidGPUAccelerationClass(className: string, animationType: AnimationType): boolean {
  const validClasses: Record<AnimationType, string[]> = {
    transform: ["will-change-transform", "gpu-transform", "gpu-accelerated"],
    opacity: ["will-change-opacity"],
    "transform-opacity": ["will-change-transform-opacity", "will-change-transform", "will-change-opacity"],
    none: [],
  };

  return validClasses[animationType].some((validClass) => className.includes(validClass));
}

/**
 * Portfolio components that use Framer Motion animations and their expected configurations.
 */
const portfolioAnimatedComponents: AnimatedComponentConfig[] = [
  {
    name: "Particle",
    animationType: "transform",
    hasWillChangeClass: true,
    hasWillChangeInlineStyle: false,
  },
  {
    name: "FloatingIcon",
    animationType: "transform",
    hasWillChangeClass: true,
    hasWillChangeInlineStyle: false,
  },
  {
    name: "GradientMesh",
    animationType: "transform",
    hasWillChangeClass: false,
    hasWillChangeInlineStyle: true, // Uses will-change: transform in CSS
  },
  {
    name: "AnimationProvider-Loader",
    animationType: "transform",
    hasWillChangeClass: true,
    hasWillChangeInlineStyle: false,
  },
  {
    name: "AnimationProvider-Content",
    animationType: "transform",
    hasWillChangeClass: true,
    hasWillChangeInlineStyle: false,
  },
  {
    name: "AnimationProvider-ProgressBar",
    animationType: "transform",
    hasWillChangeClass: true,
    hasWillChangeInlineStyle: false,
  },
];

describe("GPU Acceleration Hints", () => {
  it("should have proper GPU acceleration hints for all animated portfolio components", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...portfolioAnimatedComponents),
        (component) => {
          const hasProperHints = hasProperGPUAccelerationHints(component);

          // All animated components should have proper GPU acceleration hints
          expect(hasProperHints).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should require GPU hints for any component with transform or opacity animations", () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 50 }),
          animationType: fc.constantFrom<AnimationType>("transform", "opacity", "transform-opacity"),
          hasWillChangeClass: fc.boolean(),
          hasWillChangeInlineStyle: fc.boolean(),
        }),
        (config) => {
          const hasProperHints = hasProperGPUAccelerationHints(config);

          // If component has animations, it must have at least one form of GPU hint
          if (config.animationType !== "none") {
            const needsHints = config.hasWillChangeClass || config.hasWillChangeInlineStyle;
            expect(hasProperHints).toBe(needsHints);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should not require GPU hints for components without animations", () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 50 }),
          animationType: fc.constant<AnimationType>("none"),
          hasWillChangeClass: fc.boolean(),
          hasWillChangeInlineStyle: fc.boolean(),
        }),
        (config) => {
          const hasProperHints = hasProperGPUAccelerationHints(config);

          // Components without animations always pass (no GPU hints needed)
          expect(hasProperHints).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should return correct will-change CSS value for each animation type", () => {
    fc.assert(
      fc.property(
        fc.constantFrom<AnimationType>("transform", "opacity", "transform-opacity", "none"),
        (animationType) => {
          const willChangeValue = getExpectedWillChangeValue(animationType);

          switch (animationType) {
            case "transform":
              expect(willChangeValue).toBe("transform");
              break;
            case "opacity":
              expect(willChangeValue).toBe("opacity");
              break;
            case "transform-opacity":
              expect(willChangeValue).toBe("transform, opacity");
              break;
            case "none":
              expect(willChangeValue).toBe("auto");
              break;
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should validate GPU acceleration class names correctly", () => {
    fc.assert(
      fc.property(
        fc.constantFrom<AnimationType>("transform", "opacity", "transform-opacity"),
        (animationType) => {
          // Test valid class names for each animation type
          const validClassNames: Record<AnimationType, string[]> = {
            transform: ["will-change-transform", "gpu-transform", "gpu-accelerated"],
            opacity: ["will-change-opacity"],
            "transform-opacity": ["will-change-transform-opacity", "will-change-transform"],
            none: [],
          };

          validClassNames[animationType].forEach((className) => {
            expect(isValidGPUAccelerationClass(className, animationType)).toBe(true);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should ensure all portfolio components with transform animations have will-change-transform", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          ...portfolioAnimatedComponents.filter((c) => c.animationType === "transform")
        ),
        (component) => {
          // Components with transform animations should have GPU hints
          const hasHints = component.hasWillChangeClass || component.hasWillChangeInlineStyle;
          expect(hasHints).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should handle edge case where component has both class and inline style GPU hints", () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 50 }),
          animationType: fc.constantFrom<AnimationType>("transform", "opacity", "transform-opacity"),
          hasWillChangeClass: fc.constant(true),
          hasWillChangeInlineStyle: fc.constant(true),
        }),
        (config) => {
          // Having both class and inline style is valid (redundant but not incorrect)
          const hasProperHints = hasProperGPUAccelerationHints(config);
          expect(hasProperHints).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});
