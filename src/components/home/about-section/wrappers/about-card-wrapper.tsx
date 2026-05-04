"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const AboutCardWrapper = ({ children, className }: Props) => {
  return (
    <motion.div
      className={cn(
        "bg-card p-8 rounded-xl shadow-lg border border-cyan-100/20 hover:border-cyan-300/30 transition-colors duration-300 backdrop-blur-sm",
        className
      )}
      whileHover={{ y: -5 }}
    >
      {children}
    </motion.div>
  );
};

export default AboutCardWrapper;
