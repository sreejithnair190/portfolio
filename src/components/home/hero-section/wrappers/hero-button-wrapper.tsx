"use client";

import React from "react";
import { motion } from "framer-motion";

const HeroButtonWrapper = ({ children }: { children: React.ReactNode }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
      variants={itemVariants}
    >
      {children}
    </motion.div>
  );
};

export default HeroButtonWrapper;
