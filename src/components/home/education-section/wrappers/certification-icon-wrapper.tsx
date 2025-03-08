"use client";

import React from "react";
import { motion } from "framer-motion";

const CertificationIconWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      className="p-2 bg-cyan-100/20 rounded-lg"
      whileHover={{ rotate: 15 }}
    >
      {children}
    </motion.div>
  );
};

export default CertificationIconWrapper;
