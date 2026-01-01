"use client";

import { cn } from "@/lib/utils";

interface GradientMeshProps {
  className?: string;
}

/**
 * GradientMesh - An animated gradient background component
 * Uses CSS-based animations for GPU acceleration
 * Automatically respects prefers-reduced-motion for accessibility
 */
export default function GradientMesh({ className }: GradientMeshProps) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      {/* Animated gradient mesh */}
      <div className="gradient-mesh absolute inset-0" />
      
      {/* Subtle noise texture overlay for depth */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-noise" />
    </div>
  );
}
