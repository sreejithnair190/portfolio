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
      className="h-full [&>*]:transition-[border-color,box-shadow] [&>*]:duration-300 [&>*]:hover:border-cyan-300/40 [&>*]:hover:shadow-[0_0_25px_rgba(103,232,249,0.15)] dark:[&>*]:hover:border-cyan-300/30 dark:[&>*]:hover:shadow-[0_0_25px_rgba(103,232,249,0.1)]"
    >
      {children}
    </motion.div>
  );
};

export default SkillCardWrapper;
