"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { AnimatePresence, motion, useAnimationControls } from "framer-motion"

type AnimationContextType = {
  isLoading: boolean
}

const AnimationContext = createContext<AnimationContextType>({
  isLoading: true,
})

export const useAnimation = () => useContext(AnimationContext)

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time with a slightly more random feel
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500 + Math.random() * 500) // Between 1.5 and 2 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimationContext.Provider value={{ isLoading }}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { 
                duration: 0.7, 
                ease: [0.65, 0, 0.35, 1] // Improved easing curve
              }
            }}
          >
            <LoadingAnimation />
          </motion.div>
        ) : (
          <motion.div 
            key="content" 
            initial={{ opacity: 0 }} 
            animate={{ 
              opacity: 1,
              transition: { 
                duration: 0.7,
                delay: 0.2, 
                ease: [0.22, 1, 0.36, 1] 
              }
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </AnimationContext.Provider>
  )
}

function LoadingAnimation() {
  const progressControls = useAnimationControls()
  const [loadingStage, setLoadingStage] = useState(0)
  
  // Text phrases that will cycle (all kept short to ensure single line)
  const loadingPhrases = [
    "Loading Portfolio",
    "Preparing Projects",
    "Fetching Skills",
    "Almost Ready"
  ]

  useEffect(() => {
    // Animate the progress bar with a more natural progression
    progressControls.start({
      width: "100%",
      transition: {
        duration: 1.5,
        ease: [0.34, 1.3, 0.64, 1], // More dynamic feel with slight overshoot
      },
    })
    
    // Change loading text phrases
    const phraseInterval = setInterval(() => {
      setLoadingStage(prev => (prev + 1) % loadingPhrases.length)
    }, 800)
    
    return () => clearInterval(phraseInterval)
  }, [progressControls, loadingPhrases.length])

  return (
    <div className="relative flex flex-col items-center justify-center gap-8 px-4 w-full max-w-md">
      {/* Subtle background pulse */}
      <motion.div 
        className="absolute inset-0 bg-cyan-500/5 rounded-xl"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Improved progress bar */}
      <motion.div
        className="relative w-full max-w-sm overflow-visible"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Progress bar background */}
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
          {/* Enhanced glow effect */}
          <motion.div
            className="absolute inset-0 blur-md bg-cyan-400 opacity-60 rounded-full"
            initial={{ width: 0 }}
            animate={progressControls}
          />

          {/* Main progress bar with gradient */}
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500 rounded-full relative"
            initial={{ width: 0 }}
            animate={progressControls}
          >
            {/* Multiple shimmer effects for more dynamic feel */}
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 w-full"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.2 + i * 0.3,
                  ease: "linear",
                  delay: i * 0.2,
                }}
              >
                <div className="w-1/4 h-full bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Animated percentage indicator with glow effect */}
        <motion.div
          className="absolute -right-2 -top-7 text-sm font-semibold text-cyan-500 flex items-center bg-background dark:bg-gray-900 px-2 py-1 rounded-md shadow-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Counter from={0} to={100} duration={1.5} />
          <span className="ml-0.5">%</span>
        </motion.div>
      </motion.div>

      {/* Enhanced loading text with animation - now with fixed width to prevent layout shifts */}
      <div className="relative h-8 w-full max-w-sm text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={loadingStage}
            className="absolute inset-0 text-lg font-medium text-cyan-500 drop-shadow-sm whitespace-nowrap overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-block">
              {loadingPhrases[loadingStage]}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1,
                  times: [0, 0.5, 1],
                  ease: "easeInOut",
                }}
              >
                ...
              </motion.span>
            </span>
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Simplified pulse indicators */}
      <div className="flex space-x-3 mt-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-cyan-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Enhanced counter component with smoother animation
function Counter({ from, to, duration }: { from: number; to: number; duration: number }) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      // Use easing function for more natural counting
      const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5)
      const easedProgress = easeOutQuint(progress)
      
      setCount(Math.floor(from + easedProgress * (to - from)))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)

    return () => cancelAnimationFrame(animationFrame)
  }, [from, to, duration])

  return <>{count}</>
}