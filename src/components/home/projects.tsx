"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import ScrollReveal from "@/components/ui/scroll-reveal"
import { motion } from "framer-motion"

type Project = {
  title: string
  description: string
  technologies: string[]
  imageUrl: string
  demoUrl: string
  githubUrl: string
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product listings, shopping cart, user authentication, and payment processing.",
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Stripe"],
    imageUrl: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com/demo1",
    githubUrl: "https://github.com/johndoe/ecommerce",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop interface, and team collaboration features.",
    technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    imageUrl: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com/demo2",
    githubUrl: "https://github.com/johndoe/task-manager",
  },
  {
    title: "Weather Dashboard",
    description:
      "A weather dashboard that displays current conditions and forecasts for multiple locations with interactive maps and charts.",
    technologies: ["JavaScript", "Chart.js", "Weather API", "Mapbox"],
    imageUrl: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com/demo3",
    githubUrl: "https://github.com/johndoe/weather-app",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <ScrollReveal width="100%" className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight mb-8">Featured Projects</h2>
        </ScrollReveal>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.2} direction="up">
              <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                <Card className="flex flex-col h-full overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }}>
                      <Image
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <motion.div key={tech} whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                          <Badge variant="secondary">{tech}</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button asChild variant="outline" size="sm">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Link>
                      </motion.div>
                    </Button>
                    <Button asChild size="sm">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Link>
                      </motion.div>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

