"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ScrollReveal from "@/components/scroll-reveal"
import { motion } from "framer-motion"
import { Code, Server, Database, Terminal } from "lucide-react"

type SkillCategory = {
  name: string
  skills: string[]
  icon: React.ReactNode
  bgGradient: string
}

const skillCategories: SkillCategory[] = [
  {
    name: "Front-end",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Redux"],
    icon: <Code className="h-6 w-6 text-cyan-500" />,
    bgGradient: "from-cyan-500/5 via-cyan-400/5 to-transparent",
  },
  {
    name: "Back-end",
    skills: ["Node.js", "Express", "NestJS", "REST APIs", "GraphQL", "WebSockets"],
    icon: <Server className="h-6 w-6 text-cyan-500" />,
    bgGradient: "from-cyan-500/5 via-cyan-400/5 to-transparent",
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Prisma", "Mongoose"],
    icon: <Database className="h-6 w-6 text-cyan-500" />,
    bgGradient: "from-cyan-500/5 via-cyan-400/5 to-transparent",
  },
  {
    name: "DevOps & Tools",
    skills: ["Git", "GitHub", "Docker", "CI/CD", "AWS", "Vercel", "Jest", "Cypress"],
    icon: <Terminal className="h-6 w-6 text-cyan-500" />,
    bgGradient: "from-cyan-500/5 via-cyan-400/5 to-transparent",
  },
]

const gridPatternStyle = `
  .bg-grid-pattern {
    background-size: 40px 40px;
    background-image: 
      linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  }
`

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 md:py-28 relative"
    >
      <style jsx>{gridPatternStyle}</style>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="container px-4 md:px-6 relative">
        <ScrollReveal width="100%" className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold tracking-tighter md:text-5xl mb-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent"
          >
            Skills & Technologies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Core competencies and technical expertise that drive my development work
          </motion.p>
        </ScrollReveal>

        {/* Skill Categories */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, index) => (
            <ScrollReveal key={category.name} delay={index * 0.1} direction="up" className="h-full">
              <motion.div 
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.2 } 
                }}
                className="h-full"
              >
                <Card className="h-full backdrop-blur-sm bg-card/95 border border-cyan-100/20 hover:border-cyan-300/30 transition-colors shadow-lg hover:shadow-[0_0_25px_rgba(103,232,249,0.1)]">
                  <CardHeader className="pb-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br opacity-30 z-0 pointer-events-none rounded-t-lg" style={{ background: `linear-gradient(to bottom right, rgba(103, 232, 249, 0.1), transparent)` }}></div>
                    
                    <div className="flex items-center space-x-3 relative z-10">
                      <motion.div 
                        className="bg-cyan-100/20 p-3 rounded-xl"
                        whileHover={{ rotate: 10 }}
                      >
                        {category.icon}
                      </motion.div>
                      
                      <CardTitle className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                        {category.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            delay: 0.1 + skillIndex * 0.05, 
                            duration: 0.3,
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                          }}
                          whileHover={{ 
                            scale: 1.05, 
                            y: -2,
                            transition: { duration: 0.2 } 
                          }}
                        >
                          <Badge 
                            variant="secondary" 
                            className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-200/20"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}