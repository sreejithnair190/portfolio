"use client";

import React from "react";
import { motion } from "framer-motion";

const EducationPeriodWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default EducationPeriodWrapper;
