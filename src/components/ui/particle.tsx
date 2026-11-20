"use client";

import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";

interface ParticleProps {
  idx: number;
}

const Particle = memo(({ idx }: ParticleProps) => {
  // Use deterministic values based on index instead of Math.random()
  const styles = useMemo(
    () => ({
      left: `${(idx * 17 + 5) % 100}%`,
      top: `${(idx * 23 + 10) % 100}%`,
    }),
    [idx]
  );

  const animation = useMemo(
    () => ({
      scale: [0, 1, 0],
      opacity: [0, 0.6, 0],
    }),
    []
  );

  const transition = useMemo(
    () => ({
      duration: 3 + (idx % 3),
      repeat: Infinity,
      delay: idx * 0.5,
      ease: "easeInOut" as const,
    }),
    [idx]
  );

  return (
    <motion.div
      className="absolute bg-cyan-400/20 w-2 h-2 rounded-full will-change-transform"
      style={styles}
      animate={animation}
      transition={transition}
    />
  );
});

Particle.displayName = "Particle";

export default Particle;
