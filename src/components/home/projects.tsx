"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Server } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { gridPatternStyle } from "@/utils/constants";

type Project = {
  title: string;
  tagline: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  githubUrl: string;
  icon: typeof Server;
};

const PROJECTS: Project[] = [
  {
    title: "Hortus API",
    tagline: "Plant E-commerce REST API",
    summary:
      "Production-grade REST API for a plant e-commerce platform, built in Spring Boot with PostgreSQL as the primary data store.",
    highlights: [
      "Implemented JWT and Spring Security for authentication and authorization, with separate access and refresh token flows",
      "Managed database schema migrations using Flyway",
      "Integrated Redis for caching high-frequency endpoints and RabbitMQ for async event processing",
      "Wired up AWS S3 for product image uploads and containerized the full stack with Docker Compose",
    ],
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
    githubUrl: "https://github.com/sreejithnair190/hortus-backend",
    icon: Server,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <style jsx>{gridPatternStyle}</style>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="container px-4 md:px-6 relative max-w-5xl mx-auto">
        <SectionReveal
          title="Projects"
          subtitle="Selected work showcasing backend architecture, integrations, and engineering practice"
        />

        <div className="grid grid-cols-1 gap-6">
          {PROJECTS.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
              >
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-2xl border border-cyan-100/20 group-hover:border-cyan-300/40 bg-card/40 backdrop-blur-sm p-6 md:p-8 overflow-hidden transition-colors group-hover:shadow-[0_0_30px_rgba(103,232,249,0.12)]"
                  >
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
                    <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

                    <div className="relative flex items-start justify-between gap-4 mb-5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-cyan-500" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent leading-tight">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {project.tagline}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-cyan-500 opacity-70 group-hover:opacity-100 transition-opacity">
                        <Github className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">View source</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                    <p className="relative text-sm md:text-base text-foreground/80 leading-relaxed mb-5">
                      {project.summary}
                    </p>

                    <ul className="relative space-y-2 mb-6">
                      {project.highlights.map((h, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="relative flex flex-wrap gap-2 pt-5 border-t border-cyan-100/10">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-200/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
