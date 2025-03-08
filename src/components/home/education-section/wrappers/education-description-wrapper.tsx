"use client";

import React from "react";
import { motion } from "framer-motion";

const EducationDescriptionWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default EducationDescriptionWrapper;
