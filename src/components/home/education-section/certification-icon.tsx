"use client";

import React from "react";
import { Award, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
const CertificationIcon = () => {
  return (
    <>
      <motion.div
        className="bg-cyan-100/20 p-3 rounded-xl"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Award className="h-7 w-7 text-cyan-500" />
      </motion.div>
      <motion.div
        className="absolute -right-2 -top-2 bg-background p-1 rounded-full border"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <BookOpen className="h-4 w-4 text-cyan-400" />
      </motion.div>
    </>
  );
};

export default CertificationIcon;
