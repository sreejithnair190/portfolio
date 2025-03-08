"use client";

import React from "react";
import { motion } from "framer-motion";

const CertificationCardWrapper = ({
  children,
  idx,
}: {
  children: React.ReactNode;
  idx: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: idx * 0.1 }}
      viewport={{ once: true }}
    >
      <motion.div whileHover={{ y: -5 }}>{children}</motion.div>
    </motion.div>
  );
};

export default CertificationCardWrapper;
