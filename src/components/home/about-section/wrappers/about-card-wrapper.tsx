"use client";

import React from "react";
import { motion } from "framer-motion";

const AboutCardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="bg-card p-8 rounded-xl shadow-lg border border-cyan-100/20 hover:border-cyan-300/30 transition-colors duration-300 backdrop-blur-sm"
      whileHover={{ y: -5 }}
    >
      {children}
    </motion.div>
  );
};

export default AboutCardWrapper;
