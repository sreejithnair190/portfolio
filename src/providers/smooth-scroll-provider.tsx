"use client"

import { type ReactNode, useEffect } from "react"
import { ReactLenis, useLenis } from "lenis/react"

interface SmoothScrollProviderProps {
  children: ReactNode
}

// Custom hook to handle anchor link clicks with smooth scrolling
function useAnchorScroll() {
  const lenis = useLenis()

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')

      if (anchor) {
        e.preventDefault()
        const targetId = anchor.getAttribute("href")

        if (targetId && targetId !== "#" && lenis) {
          const targetElement = document.querySelector(targetId)
          if (targetElement instanceof HTMLElement) {
            lenis.scrollTo(targetElement, {
              offset: -100,
            })
          }
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)
    return () => document.removeEventListener("click", handleAnchorClick)
  }, [lenis])

  return null
}

// Inner component that uses the lenis context
function AnchorScrollHandler() {
  useAnchorScroll()
  return null
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.5,
      }}
    >
      <AnchorScrollHandler />
      {children}
    </ReactLenis>
  )
}
