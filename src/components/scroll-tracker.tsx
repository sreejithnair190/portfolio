"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ScrollTracker() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollPosition = window.scrollY

      if (totalHeight > 0) {
        setScrollProgress((scrollPosition / totalHeight) * 100)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-cyan-900/20">
      <motion.div
        className="h-full relative"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: "0%" }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        {/* Progress bar with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600" />
        
        {/* Sparkles particles */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-300 rounded-full"
            initial={{
              right: '0%',
              opacity: 0,
              scale: 0
            }}
            animate={{
              right: ['0%', `${Math.random() * 20}%`, '0%'],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [-5, Math.random() * 10 - 5, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            style={{
              filter: 'drop-shadow(0 0 2px rgba(34, 211, 238, 0.8))'
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}