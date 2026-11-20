"use client";

import React from "react";
import { motion } from "framer-motion";

const Particle = ({ idx }: { idx: number }) => {
  return (
    <motion.div
      key={idx}
      className="absolute bg-cyan-400/20 w-2 h-2 rounded-full"
      style={{
        left: `${(idx * 37 + 11) % 100}%`,
        top: `${(idx * 61 + 7) % 100}%`,
      }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        x: [0, (idx * 23) % 100 - 50],
        y: [0, (idx * 41) % 100 - 50],
      }}
      transition={{
        duration: 2 + (idx % 5),
        repeat: Infinity,
        delay: (idx * 0.7) % 5,
      }}
    />
  );
};

export default Particle;
