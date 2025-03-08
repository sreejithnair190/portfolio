"use client";

import React from "react";
import { motion } from "framer-motion";

const HeroMainContentWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
};

export default HeroMainContentWrapper;
