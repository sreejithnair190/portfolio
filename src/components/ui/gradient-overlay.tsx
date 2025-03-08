"use client";

import { motion } from "framer-motion";

const GradientOverlay = () => {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 blur-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 1.5 } }}
    />
  );
};

export default GradientOverlay;