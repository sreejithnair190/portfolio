"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/scroll-reveal";

interface SectionRevealProps {
  title: string;
  subtitle: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const SectionReveal = ({
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}: SectionRevealProps) => {
  return (
    <ScrollReveal width="100%" className={`text-center mb-16 ${className}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`text-3xl font-bold tracking-tighter md:text-5xl mb-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent ${titleClassName}`}
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className={`text-muted-foreground text-lg max-w-2xl mx-auto ${subtitleClassName}`}
      >
        {subtitle}
      </motion.p>
    </ScrollReveal>
  );
};