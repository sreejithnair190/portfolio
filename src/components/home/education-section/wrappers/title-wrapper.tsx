"use client";

import React from "react";
import { motion } from "framer-motion";

const TitleWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.h3
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-600"
    >
      {children}
    </motion.h3>
  );
};

export default TitleWrapper;
