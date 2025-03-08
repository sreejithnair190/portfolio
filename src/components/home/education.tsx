"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, Award, Calendar, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/scroll-reveal";
import Link from "next/link";
import { ACADEMICS, CERTIFICATIONS } from "@/utils/education";
import { gridPatternStyle } from "@/utils/constants";

export default function Education() {
  return (
    <section id="education" className="py-20 md:py-28 relative">
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
            Education & Certifications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Academic journey and professional credentials that shape my
            expertise
          </motion.p>
        </ScrollReveal>

        <div className="grid gap-16 md:grid-cols-2">
          {/* Education Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <motion.div
                  className="bg-cyan-100/20 p-3 rounded-xl"
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <GraduationCap className="h-7 w-7 text-cyan-500" />
                </motion.div>
                <motion.div
                  className="absolute -right-2 -top-2 bg-background p-1 rounded-full border"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <BookOpen className="h-4 w-4 text-cyan-400" />
                </motion.div>
              </div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-600"
              >
                Academic Background
              </motion.h3>
            </div>

            {ACADEMICS.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
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
                <motion.div whileHover={{ y: -8 }} className="relative group">
                  <Card className="overflow-visible backdrop-blur-sm bg-card/95 border border-cyan-100/20 hover:border-cyan-300/30 transition-colors shadow-lg hover:shadow-[0_0_25px_rgba(103,232,249,0.1)]">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <CardTitle className="text-xl md:text-xl text-cyan-500">
                              {edu.degree}
                            </CardTitle>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <CardDescription className="text-lg font-medium bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent">
                              {edu.institution}
                            </CardDescription>
                          </motion.div>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Badge variant="secondary" className="px-3 py-1.5">
                            <Calendar className="h-4 w-4 mr-2 text-cyan-500" />
                            {edu.period}
                          </Badge>
                        </motion.div>
                      </div>
                    </CardHeader>
                    {edu.description && (
                      <CardContent>
                        <motion.p
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          className="text-muted-foreground leading-relaxed"
                        >
                          {edu.description}
                        </motion.p>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Certifications Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <motion.div
                  className="bg-cyan-100/20 p-3 rounded-xl"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Award className="h-7 w-7 text-cyan-500" />
                </motion.div>
                <motion.div
                  className="absolute -right-2 -top-2 bg-background p-1 rounded-full border"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <BookOpen className="h-4 w-4 text-cyan-400" />
                </motion.div>
              </div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-600"
              >
                Professional Credentials
              </motion.h3>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {CERTIFICATIONS.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div whileHover={{ y: -5 }}>
                    <Card className="h-full backdrop-blur-sm bg-card/95 border border-cyan-100/20 hover:border-cyan-300/30 shadow-lg hover:shadow-[0_0_15px_rgba(103,232,249,0.1)]">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="p-2 bg-cyan-100/20 rounded-lg"
                            whileHover={{ rotate: 15 }}
                          >
                            <Award className="h-5 w-5 text-cyan-500" />
                          </motion.div>
                          <CardTitle className="text-lg font-semibold">
                            {cert.name}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-3">
                          <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-sm font-medium text-cyan-300"
                          >
                            {cert.issuer}
                          </motion.p>
                          <div className="flex justify-between items-center">
                            <Badge variant="secondary">{cert.date}</Badge>
                            {cert.url && (
                              <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="text-cyan-500 hover:bg-cyan-500/10"
                              >
                                <Link href={cert.url} target="_blank">
                                  View
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}