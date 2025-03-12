"use client";

import React from "react";
import { motion } from "framer-motion";

const ContactCardWrapper = ({
  children,
  idx,
}: {
  children: React.ReactNode;
  idx: number;
}) => {
  return (
    <motion.div
      key={idx}
      className="flex items-center gap-4 p-4 rounded-lg bg-background/5 hover:bg-background/10 transition-colors group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 + 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default ContactCardWrapper;
