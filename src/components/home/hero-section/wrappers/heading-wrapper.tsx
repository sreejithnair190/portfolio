"use client";

import React from "react";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";

const HeadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.h1
      className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter relative"
      variants={itemVariants}
    >
      <Balancer>{children}</Balancer>
    </motion.h1>
  );
};

export default HeadingWrapper;
