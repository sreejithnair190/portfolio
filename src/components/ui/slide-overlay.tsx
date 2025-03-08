"use client";

import { motion } from "framer-motion";

const SlideOverlay = () => {
  return (
    <motion.div
      className="absolute inset-0 bg-primary/20"
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 0.8 }}
    />
  );
};

export default SlideOverlay;