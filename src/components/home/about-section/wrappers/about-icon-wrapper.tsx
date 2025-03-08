"use client";

import React from "react";
import { motion } from "framer-motion";

const AboutIconWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
        className="w-10 h-10 rounded-full bg-cyan-100/20 flex items-center justify-center text-cyan-500 cursor-pointer"
        whileHover={{ scale: 1.1 }}
    >
      {children}
    </motion.div>
  );
};

export default AboutIconWrapper;