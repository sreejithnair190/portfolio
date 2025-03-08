"use client";

import React from "react";
import { motion } from "framer-motion";

const AboutImageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AboutImageWrapper;
