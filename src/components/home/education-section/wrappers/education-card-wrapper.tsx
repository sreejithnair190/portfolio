"use client";

import React from "react";
import { motion } from "framer-motion";

const EducationCardWrapper = ({
  children,
  idx,
}: {
  children: React.ReactNode;
  idx: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.15 }}
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, x: idx % 2 === 0 ? -30 : 30 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.5,
            delay: idx * 0.1,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      <motion.div whileHover={{ y: -8 }} className="relative group">
        {children}
      </motion.div>
    </motion.div>
  );
};

export default EducationCardWrapper;
