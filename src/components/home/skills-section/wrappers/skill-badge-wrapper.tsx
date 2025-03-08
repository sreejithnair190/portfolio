"use client";

import React from "react";
import { motion } from "framer-motion";

const SkillBadgeWrapper = ({
  children,
  skill,
  idx,
}: {
  children: React.ReactNode;
  skill: string;
  idx: number;
}) => {
  return (
    <motion.div
      key={skill}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.1 + idx * 0.05,
        duration: 0.3,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      whileHover={{
        scale: 1.05,
        y: -2,
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default SkillBadgeWrapper;
