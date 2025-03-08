"use client";

import Image from "next/image";
import ScrollReveal from "@/components/scroll-reveal";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container px-4 md:px-8 max-w-6xl mx-auto">
        <ScrollReveal width="100%" className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold tracking-tighter md:text-5xl mb-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Full-stack developer passionate about creating elegant solutions to
            complex problems way
          </motion.p>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <ScrollReveal direction="right" className="order-2 lg:order-1">
            <div className="space-y-8">
              <motion.div
                className="bg-card p-8 rounded-xl shadow-lg border border-cyan-100/20 hover:border-cyan-300/30 transition-colors duration-300 backdrop-blur-sm"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-100/20 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-cyan-500"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                    Who I Am
                  </h3>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I&apos;m a passionate full-stack developer with 2 years of
                  experience building web applications. I have experience
                  working with React, Next.js, Node.js, Laravel, and Spring
                  Boot, allowing me to develop both frontend and backend
                  solutions efficiently.
                </p>
              </motion.div>

              <motion.div
                className="bg-card p-8 rounded-xl shadow-lg border border-cyan-100/20 hover:border-cyan-300/30 transition-colors duration-300 backdrop-blur-sm"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-100/20 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-cyan-500"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                    My Approach
                  </h3>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  My approach combines clean code principles with user-centered
                  design to create applications that are both technically
                  excellent and delightful to use. I&apos;m constantly learning
                  and exploring new technologies to stay at the forefront of web
                  development.
                </p>
              </motion.div>

              <motion.div
                className="bg-card p-8 rounded-xl shadow-lg border border-cyan-100/20 hover:border-cyan-300/30 transition-colors duration-300 backdrop-blur-sm"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-100/20 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-cyan-500"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                    Beyond Coding
                  </h3>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  When I&apos;m not coding, you can find me binge-watching
                  series, watching documentaries, or reading tech blogs. I enjoy
                  diving into different stories and ideas, whether through
                  entertainment or technology, and believe in maintaining a
                  balance between work and relaxation.
                </p>
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal
            direction="left"
            className="order-1 lg:order-2 flex justify-center"
          >
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96 overflow-hidden rounded-2xl border-4 border-cyan-500/30 group">
                <div className="w-full h-full relative overflow-hidden">
                  <Image
                    src="/profile.jpg"
                    alt="Sreejith Nair"
                    fill
                    className="object-cover transition-filter duration-500 ease-in-out filter grayscale group-hover:filter-none"
                    priority
                  />
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-card p-4 rounded-xl shadow-lg border border-cyan-100/20 backdrop-blur-sm">
                <div className="flex gap-4">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-cyan-100/20 flex items-center justify-center text-cyan-500 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </motion.div>
                  <motion.div
                    className="w-10 h-10 rounded-full bg-cyan-100/20 flex items-center justify-center text-cyan-500 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </motion.div>
                  <motion.div
                    className="w-10 h-10 rounded-full bg-cyan-100/20 flex items-center justify-center text-cyan-500 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </motion.div>
                </div>
              </div>

              <div className="absolute -bottom-3 -left-3 bg-cyan-500 px-4 py-2 rounded-lg shadow-lg">
                <p className="font-medium text-cyan-50">2+ Years Experience</p>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
