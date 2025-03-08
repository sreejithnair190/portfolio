"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, type Variant } from "framer-motion"

type ScrollRevealProps = {
  children: React.ReactNode
  width?: "fit-content" | "100%"
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  once?: boolean
  className?: string
}

export default function ScrollReveal({
  children,
  width = "fit-content",
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 50,
  once = true,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-100px 0px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Define variants based on direction
  const getDirectionalVariants = () => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    }

    const variants: { hidden: Variant; visible: Variant } = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    }

    switch (direction) {
      case "up":
        variants.hidden = { ...variants.hidden, y: distance }
        variants.visible = { ...variants.visible, y: 0 }
        break
      case "down":
        variants.hidden = { ...variants.hidden, y: -distance }
        variants.visible = { ...variants.visible, y: 0 }
        break
      case "left":
        variants.hidden = { ...variants.hidden, x: distance }
        variants.visible = { ...variants.visible, x: 0 }
        break
      case "right":
        variants.hidden = { ...variants.hidden, x: -distance }
        variants.visible = { ...variants.visible, x: 0 }
        break
      case "none":
      default:
        break
    }

    return variants
  }

  const variants = getDirectionalVariants()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, delay, ease: "easeOut" }}
      style={{ width }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

