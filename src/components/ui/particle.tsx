"use client";

import React from "react";
import { motion } from "framer-motion";

const Particle = ({ idx }: { idx: number }) => {
  return (
    <motion.div
      key={idx}
      className="absolute bg-cyan-400/20 w-2 h-2 rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        x: [0, (Math.random() - 0.5) * 100],
        y: [0, (Math.random() - 0.5) * 100],
      }}
      transition={{
        duration: 2 + Math.random() * 5,
        repeat: Infinity,
        delay: Math.random() * 5,
      }}
    />
  );
};

export default Particle;
