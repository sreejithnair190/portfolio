"use client";

import { motion } from "framer-motion";

interface TerminalCardProps {
  text: string; // Text to display inside the terminal
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TerminalCard = ({ text }: TerminalCardProps) => {
  return (
    <motion.div
      className="relative mx-auto max-w-2xl overflow-hidden rounded-lg bg-foreground/5 p-4 font-mono text-sm"
      variants={itemVariants}
    >
      {/* Animated text */}
      <motion.div
        className="whitespace-pre-wrap text-start"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {text}
      </motion.div>

      {/* Traffic light dots */}
      <div className="absolute top-2 right-2 flex space-x-1">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>
    </motion.div>
  );
};

export default TerminalCard;
