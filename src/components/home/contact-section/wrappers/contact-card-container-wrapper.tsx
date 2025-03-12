"use client";

import React from "react";
import { motion } from "framer-motion";

const ContactCardContainerWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default ContactCardContainerWrapper;
