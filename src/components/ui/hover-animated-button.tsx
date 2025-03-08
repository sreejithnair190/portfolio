"use client";

import { motion } from "framer-motion";
import { ReactElement } from "react";

interface AnimatedButtonProps {
  title: string;
  icon: ReactElement;
}

const HoverAnimatedButton = ({ title, icon }: AnimatedButtonProps) => {
  return (
    <>
      <motion.span initial={{ x: 0 }} whileHover={{ x: -4 }}>
        {title}
      </motion.span>

      <motion.div
        className="ml-2 relative"
        whileHover={{
          x: [0, 5, 0],
          transition: {
            repeat: Infinity,
            duration: 1,
          },
        }}
      >
        {icon}
      </motion.div>
    </>
  );
};

export default HoverAnimatedButton;
