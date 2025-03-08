"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/scroll-reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Briefcase } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Experience = {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
};

const experiences: Experience[] = [
  {
    title: "Senior Software Engineer",
    company: "XYZ Corp",
    period: "Sept, 2020 - Present",
    description: [
      "Led a team of 5 developers in building a microservices architecture",
      "Reduced page load times by 40% through performance optimizations",
      "Implemented CI/CD pipelines that decreased deployment time by 60%",
      "Mentored junior developers and conducted code reviews",
    ],
    technologies: ["React", "Node.js", "AWS", "Docker", "TypeScript"],
  },
  {
    title: "Full-Stack Developer",
    company: "ABC Startup",
    period: "Mar, 2018 - Aug, 2020",
    description: [
      "Developed and maintained multiple client-facing web applications",
      "Built RESTful APIs and integrated third-party services",
      "Collaborated with UX designers to implement responsive designs",
      "Participated in agile development processes and sprint planning",
    ],
    technologies: ["JavaScript", "React", "Express", "MongoDB", "Redis"],
  },
  {
    title: "Front-End Developer",
    company: "Web Solutions Inc",
    period: "May, 2016 - Feb, 2018",
    description: [
      "Created responsive and accessible user interfaces",
      "Converted design mockups into functional web pages",
      "Optimized website performance and SEO",
      "Worked with cross-functional teams to deliver projects on schedule",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap"],
  },
];

const gridPatternStyle = `
    .bg-grid-pattern {
      background-size: 40px 40px;
      background-image: 
        linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
    }
  `;

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.15,
      ease: "backOut",
    },
  }),
};

const techBadgeVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
      delay: 0.4 + i * 0.05,
    },
  }),
};

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const strokeDashoffset = useTransform(pathLength, (value) => 1 - value);

  return (
    <section
      id="experience"
      className="py-16 md:py-24 relative"
      ref={containerRef}
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
            Work Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            My professional journey and the skills I&apos;ve developed along the
            way
          </motion.p>
        </ScrollReveal>

        <div className="relative">
          {/* Animated SVG Timeline */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full hidden md:block"
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="timelineGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="rgb(103, 232, 249)"
                  stopOpacity="1"
                />{" "}
                {/* cyan-300 */}
                <stop
                  offset="100%"
                  stopColor="rgb(6, 182, 212)"
                  stopOpacity="1"
                />{" "}
                {/* cyan-500 */}
              </linearGradient>
            </defs>
            <motion.path
              d="M1 0 V100"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              className="text-primary/20"
            />
            <motion.path
              d="M1 0 V100"
              stroke="url(#timelineGradient)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              style={{
                pathLength,
                strokeDasharray: 1,
                strokeDashoffset,
              }}
            />
          </svg>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative md:w-1/2 md:odd:pr-12 md:even:pl-12 md:even:ml-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
              >
                <motion.div
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.01,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="relative group"
                >
                  <div className="absolute -top-1 md:top-6 md:odd:-right-8 md:even:-left-8 w-14 h-14 rounded-full bg-background border-4 border-cyan-300/30 hidden md:flex items-center justify-center z-10">
                    <Briefcase className="h-6 w-6 text-cyan-500" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-cyan-300/20"
                      initial={{ scale: 1, opacity: 0.3 }}
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-cyan-500/10"
                      initial={{ scale: 1, opacity: 0.1 }}
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.1, 0.5, 0.1],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                    />
                  </div>
                  <Card
                    className={cn(
                      "overflow-visible transition-all duration-300 backdrop-blur-sm bg-card/95 border border-primary/5",
                      "hover:shadow-[0_0_25px_rgba(103,232,249,0.15)] dark:hover:shadow-[0_0_25px_rgba(103,232,249,0.1)]",
                      "hover:border-cyan-300/30"
                    )}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <CardTitle className="text-xl md:text-2xl text-cyan-500">
                            {exp.title}
                          </CardTitle>
                          <CardDescription className="text-lg font-medium">
                            {exp.company}
                          </CardDescription>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.3 + 0.2 }}
                        >
                          <Badge
                            variant="outline"
                            className="w-fit flex items-center gap-1 px-3 py-1.5"
                          >
                            <Calendar className="h-3.5 w-3.5" />
                            {exp.period}
                          </Badge>
                        </motion.div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="list-none pl-0 space-y-3">
                        {exp.description.map((item, i) => (
                          <motion.li
                            key={i}
                            custom={i}
                            variants={listItemVariants}
                            className="flex items-start gap-2 text-muted-foreground"
                          >
                            <motion.span
                              className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ delay: i * 0.1 + 0.2 }}
                            />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            custom={techIndex}
                            variants={techBadgeVariants}
                          >
                            <Badge
                              variant="secondary"
                              className="transform hover:scale-105 transition-transform"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}