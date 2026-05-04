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
  demoUrl?: string
  githubUrl: string
}

const projects: Project[] = [
  {
    title: "Hortus API",
    description:
      "A production-grade REST API for a plant e-commerce platform built with Spring Boot and PostgreSQL. Features JWT and Spring Security with separate access and refresh token flows, Flyway migrations, Redis caching for high-frequency endpoints, RabbitMQ for async event processing, and AWS S3 for product image uploads. Containerized with Docker Compose.",
    technologies: [
      "Spring Boot",
      "PostgreSQL",
      "JWT",
      "Spring Security",
      "Flyway",
      "Redis",
      "RabbitMQ",
      "AWS S3",
      "Docker Compose",
    ],
    imageUrl: "/placeholder.svg?height=400&width=600",
    githubUrl: "https://github.com/sreejithnair190/hortus-backend",
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
                    {project.demoUrl && (
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
                    )}
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

