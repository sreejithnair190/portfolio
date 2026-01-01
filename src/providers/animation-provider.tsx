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

// Fixed loading duration per Requirements 4.1
const LOADING_DURATION = 1.5

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fixed 1.5s duration (Requirements 4.1)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, LOADING_DURATION * 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimationContext.Provider value={{ isLoading }}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex items-center justify-center bg-background will-change-transform"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { 
                duration: 0.5, 
                ease: [0.65, 0, 0.35, 1]
              }
            }}
          >
            <LoadingAnimation duration={LOADING_DURATION} />
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            className="will-change-transform"
            initial={{ opacity: 0 }} 
            animate={{ 
              opacity: 1,
              transition: { 
                duration: 0.5,
                delay: 0.1, 
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


interface LoadingAnimationProps {
  duration: number
}

function LoadingAnimation({ duration }: LoadingAnimationProps) {
  const progressControls = useAnimationControls()
  const [loadingStage, setLoadingStage] = useState(0)
  
  // Text phrases that will cycle
  const loadingPhrases = [
    "Loading Portfolio",
    "Preparing Projects",
    "Fetching Skills",
    "Almost Ready"
  ]

  useEffect(() => {
    // Animate the progress bar
    progressControls.start({
      width: "100%",
      transition: {
        duration: duration,
        ease: [0.34, 1.3, 0.64, 1],
      },
    })
    
    // Change loading text phrases
    const phraseInterval = setInterval(() => {
      setLoadingStage(prev => (prev + 1) % loadingPhrases.length)
    }, (duration * 1000) / loadingPhrases.length)
    
    return () => clearInterval(phraseInterval)
  }, [progressControls, duration, loadingPhrases.length])

  return (
    <div className="relative flex flex-col items-center justify-center gap-8 px-4 w-full max-w-md">
      {/* Progress bar - simplified, no infinite animations (Requirements 4.2) */}
      <motion.div
        className="relative w-full max-w-sm overflow-visible will-change-transform"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Progress bar background */}
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
          {/* Glow effect - follows progress, no infinite animation */}
          <motion.div
            className="absolute inset-0 blur-md bg-cyan-400 opacity-60 rounded-full will-change-transform"
            initial={{ width: 0 }}
            animate={progressControls}
          />

          {/* Main progress bar with gradient (Requirements 4.3 - GPU accelerated) */}
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500 rounded-full relative will-change-transform"
            initial={{ width: 0 }}
            animate={progressControls}
          />
        </div>

        {/* Percentage indicator */}
        <motion.div
          className="absolute -right-2 -top-7 text-sm font-semibold text-cyan-500 flex items-center bg-background dark:bg-gray-900 px-2 py-1 rounded-md shadow-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <Counter from={0} to={100} duration={duration} />
          <span className="ml-0.5">%</span>
        </motion.div>
      </motion.div>

      {/* Loading text - simplified animation, no infinite loops */}
      <div className="relative h-8 w-full max-w-sm text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={loadingStage}
            className="absolute inset-0 text-lg font-medium text-cyan-500 drop-shadow-sm whitespace-nowrap overflow-hidden will-change-transform"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {loadingPhrases[loadingStage]}...
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

// Counter component with proper cleanup (Requirements 4.4)
function Counter({ from, to, duration }: { from: number; to: number; duration: number }) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      // Easing function for natural counting
      const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5)
      const easedProgress = easeOutQuint(progress)
      
      setCount(Math.floor(from + easedProgress * (to - from)))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)

    // Cleanup animation frame on unmount (Requirements 4.4)
    return () => cancelAnimationFrame(animationFrame)
  }, [from, to, duration])

  return <>{count}</>
}
