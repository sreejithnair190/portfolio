"use client";

import React from "react";
import { motion } from "framer-motion";

const SkillIconWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="bg-cyan-100/20 p-3 rounded-xl"
      whileHover={{ rotate: 10 }}
    >
      {children}
    </motion.div>
  );
};

export default SkillIconWrapper;
