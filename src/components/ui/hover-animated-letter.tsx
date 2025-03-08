"use client";

import { motion } from "framer-motion";

const HoverAnimatedLetter = ({ letter, idx } : { letter: string, idx: number}) => {
  return (
    <motion.span
      key={idx}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.8 + idx * 0.05,
        duration: 0.3,
      }}
      whileHover={{
        scale: 1.2,
        color: "#00FFFF",
        transition: { duration: 0.2 },
      }}
      className="inline-block origin-bottom relative"
    >
      {letter === " " ? "\u00A0" : letter}
      <motion.span
        className="absolute inset-x-0 -bottom-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.span>
  );
};

export default HoverAnimatedLetter;