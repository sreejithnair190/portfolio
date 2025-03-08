"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Download, Code, Server, Globe, Terminal, Database, Cpu, GitBranch, Brackets } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const floatingAnimation = (delay = 0) => ({
    y: [0, -15, 0],
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 4 + Math.random() * 2,
      repeat: Infinity,
      repeatType: "reverse" as const,
      delay: delay
    }
  })

  const techIcons = [
    { icon: <Terminal size={32} />, className: "top-1/4 left-1/5" },
    { icon: <Database size={32} />, className: "bottom-1/3 right-1/4" },
    { icon: <Cpu size={32} />, className: "top-1/3 right-1/5" },
    { icon: <GitBranch size={32} />, className: "bottom-1/4 left-1/3" },
    { icon: <Brackets size={32} />, className: "top-40 left-40" },
    { icon: <Code size={32} />, className: "bottom-20 left-40" },
    { icon: <Globe size={32} />, className: "bottom-56 left-40" },
    { icon: <Server size={32} />, className: "bottom-40 right-40" },
  ]

  const nameLetters = "Sreejith Nair".split("")

  return (
    <section className="py-24 md:py-32 min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Tech icons with dynamic animations */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
        {techIcons.map(({ icon, className }, index) => (
          <motion.div
            key={index}
            className={`absolute ${className} dark:text-cyan-300 text-cyan-600`}
            animate={floatingAnimation(index * 0.5)}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="container px-4 md:px-6 z-10">
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Name with gradient hover effect */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter relative"
            variants={itemVariants}
          >
            <div className="relative inline-block">
              <span className="relative z-10">
                Hi, I&apos;m{" "}
                <span className="dark:text-cyan-400 text-cyan-600 inline-flex">
                  {nameLetters.map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.8 + index * 0.05,
                        duration: 0.3
                      }}
                      whileHover={{ 
                        scale: 1.2,
                        color: "#00FFFF",
                        transition: { duration: 0.2 } 
                      }}
                      className="inline-block origin-bottom relative"
                    >
                      {letter === " " ? "\u00A0" : letter}
                      <motion.span
                        className="absolute inset-x-0 -bottom-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.span>
                  ))}
                </span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1.5 } }}
              />
            </div>
          </motion.h1>

          {/* Animated code snippet */}
          <motion.div
            className="relative mx-auto max-w-2xl overflow-hidden rounded-lg bg-foreground/5 p-4 font-mono text-sm"
            variants={itemVariants}
          >
            <motion.div
              className="whitespace-pre-wrap"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {`Full-Stack Developer specializing \n in building exceptional digital experiences`}
            </motion.div>
            <div className="absolute top-2 right-2 flex space-x-1">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
          </motion.div>

          {/* Enhanced buttons with particle effects */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
            variants={itemVariants}
          >
            <Button asChild size="lg" className="group relative overflow-hidden bg-cyan-400 hover:bg-cyan-300">
              <Link href="#projects" className="flex items-center">
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: -4 }}
                >
                  View My Work
                </motion.span>
                <motion.div
                  className="ml-2 relative"
                  whileHover={{
                    x: [0, 5, 0],
                    transition: { 
                      repeat: Infinity,
                      duration: 1
                    }
                  }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 bg-primary/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild className="group relative overflow-hidden">
              <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <span>Download Resume</span>
                <motion.div
                  className="ml-2"
                  whileHover={{ 
                    y: [0, -3, 0],
                    transition: { 
                      repeat: Infinity,
                      duration: 1
                    }
                  }}
                >
                  <Download className="h-4 w-4" />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 bg-primary/10"
                  initial={{ y: "-100%" }}
                  whileHover={{ y: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Dynamic particle background */}
      <div className="absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-cyan-400/20 w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: 2 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </section>
  )
}