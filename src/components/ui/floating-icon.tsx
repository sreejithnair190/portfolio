"use client";

import React from "react";
import { motion } from "framer-motion";

const floatingAnimation = (delay = 0) => ({
  y: [0, -15, 0],
  rotate: [0, -5, 5, 0],
  transition: {
    duration: 4 + Math.random() * 2,
    repeat: Infinity,
    repeatType: "reverse" as const,
    delay: delay,
  },
});

interface FloatingIconType {
  idx: number;
  icon: React.ReactNode;
  className: string;
}

const FloatingIcon = ({ idx, icon, className }: FloatingIconType) => {
  return (
    <motion.div
      className={`absolute ${className} dark:text-cyan-300 text-cyan-600`}
      animate={floatingAnimation(idx * 0.5)}
    >
      {icon}
    </motion.div>
  );
};

export default FloatingIcon;
