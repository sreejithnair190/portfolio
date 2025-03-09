import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { SectionReveal } from "../../ui/section-reveal";
import AboutCardWrapper from "./wrappers/about-card-wrapper";
import Link from "next/link";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import { email, github_url, linkedIn_url } from "@/utils/constants";
import { Mail } from "lucide-react";
import AboutIconWrapper from "./wrappers/about-icon-wrapper";
import AboutImageWrapper from "./wrappers/about-image-wrapper";
import { Suspense } from 'react'
import ImageLoader from "@/components/image-loader";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container px-4 md:px-8 max-w-6xl mx-auto">
        <SectionReveal
          title="About Me"
          subtitle="Full-stack developer passionate about creating elegant solutions to
            complex problems way"
        />
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <ScrollReveal direction="right" className="order-2 lg:order-1">
            <div className="space-y-8">
              <AboutCardWrapper>
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
              </AboutCardWrapper>

              <AboutCardWrapper>
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
              </AboutCardWrapper>

              <AboutCardWrapper>
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
              </AboutCardWrapper>
            </div>
          </ScrollReveal>

          <ScrollReveal
            direction="left"
            className="order-1 lg:order-2 flex justify-center"
          >
            <AboutImageWrapper>
              <div className="relative w-72 h-72 md:w-96 md:h-96 overflow-hidden rounded-2xl border-4 border-cyan-500/30 group">
                <div className="w-full h-full relative overflow-hidden">
                <Suspense fallback={<ImageLoader />}>
                  <Image
                    src="/profile.webp"
                    alt="Sreejith Nair"
                    fill
                    className="object-cover transition-filter duration-500 ease-in-out sm:filter sm:grayscale sm:group-hover:filter-none"
                    priority
                  />
                </Suspense>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-card p-4 rounded-xl shadow-lg border border-cyan-100/20 backdrop-blur-sm">
                <div className="flex gap-4">
                  <AboutIconWrapper>
                    <Link
                      href={`mailto:${email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Mail size={20} />
                    </Link>
                  </AboutIconWrapper>
                  <AboutIconWrapper>
                    <Link
                      href={linkedIn_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiLinkedin size={20} />
                    </Link>
                  </AboutIconWrapper>
                  <AboutIconWrapper>
                    <Link
                      href={github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiGithub size={20} />
                    </Link>
                  </AboutIconWrapper>
                </div>
              </div>

              <div className="absolute hidden md:block -bottom-3 -left-3 bg-cyan-500 px-4 py-2 rounded-lg shadow-lg">
                <p className="font-medium text-cyan-50">2+ Years Experience</p>
              </div>
            </AboutImageWrapper>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
