"use client";

import React from "react";
import { motion } from "framer-motion";

const SkillCardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

export default SkillCardWrapper;
