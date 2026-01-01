"use client";

import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";

interface FloatingIconProps {
  idx: number;
  icon: React.ReactNode;
  className: string;
}

const FloatingIcon = memo(({ idx, icon, className }: FloatingIconProps) => {
  // Memoize animation configuration - simplified y-axis movement only (no rotation)
  const animation = useMemo(
    () => ({
      y: [0, -10, 0],
    }),
    []
  );

  // Memoize transition configuration with deterministic duration based on index
  const transition = useMemo(
    () => ({
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      delay: idx * 0.3,
      ease: "easeInOut",
    }),
    [idx]
  );

  return (
    <motion.div
      className={`absolute ${className} dark:text-cyan-300 text-cyan-600 will-change-transform`}
      animate={animation}
      transition={transition}
    >
      {icon}
    </motion.div>
  );
});

FloatingIcon.displayName = "FloatingIcon";

export default FloatingIcon;
