import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import {
  Mail,
  MapPin,
  Briefcase,
  Sparkles,
  Coffee,
  Code2,
} from "lucide-react";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { SectionReveal } from "../../ui/section-reveal";
import AboutIconWrapper from "./wrappers/about-icon-wrapper";
import AboutCardWrapper from "./wrappers/about-card-wrapper";
import ImageLoader from "@/components/image-loader";
import { email, github_url, linkedIn_url } from "@/utils/constants";

const TECH_FOCUS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Laravel",
  "Spring Boot",
  "PostgreSQL",
  "AWS",
];

export default function About() {
  return (
    <section id="about" className="py-12 md:py-24 relative">
      <div className="container px-4 md:px-8 max-w-6xl mx-auto">
        <SectionReveal
          title="About Me"
          subtitle="Full-stack developer passionate about creating elegant solutions to complex problems"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
          {/* Profile — image + identity */}
          <ScrollReveal
            direction="up"
            width="100%"
            className="md:col-span-2"
          >
            <AboutCardWrapper className="h-full p-5 md:p-6">
              <div className="flex items-center gap-5">
                <div className="relative w-28 h-28 md:w-32 md:h-32 shrink-0 overflow-hidden rounded-xl border-2 border-cyan-500/30 group">
                  <Suspense fallback={<ImageLoader />}>
                    <Image
                      src="/profile.webp"
                      alt="Sreejith Nair"
                      fill
                      sizes="128px"
                      className="object-cover transition-all duration-500 ease-in-out grayscale sm:group-hover:grayscale-0"
                      priority
                    />
                  </Suspense>
                </div>
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 rounded-full mb-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[11px] font-medium">Open to work</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent leading-tight">
                    Sreejith Nair
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1.5 mt-1.5">
                    <Briefcase className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Senior SWE @ ThirstyFish</span>
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    India
                  </p>
                </div>
              </div>
            </AboutCardWrapper>
          </ScrollReveal>

          {/* Bio */}
          <ScrollReveal
            direction="up"
            delay={0.1}
            width="100%"
            className="md:col-span-2"
          >
            <AboutCardWrapper className="h-full p-5 md:p-6">
              <span className="text-xs font-mono text-cyan-500/70">
                // who I am
              </span>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground mt-2">
                I build dynamic web applications across React, Next.js, Node.js,
                Laravel, and Spring Boot — focused on enhancing user experience
                and system efficiency. I pair clean code principles with
                user-centered design to ship things that feel right.
              </p>
            </AboutCardWrapper>
          </ScrollReveal>

          {/* Years */}
          <ScrollReveal
            direction="up"
            delay={0.15}
            width="100%"
            className="md:col-span-1"
          >
            <AboutCardWrapper className="h-full p-5 md:p-6 flex flex-col justify-center items-center text-center">
              <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent leading-none">
                3.5+
              </span>
              <span className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">
                Years
              </span>
            </AboutCardWrapper>
          </ScrollReveal>

          {/* Stack */}
          <ScrollReveal
            direction="up"
            delay={0.2}
            width="100%"
            className="md:col-span-1"
          >
            <AboutCardWrapper className="h-full p-5 md:p-6 flex flex-col justify-center">
              <Code2 className="w-7 h-7 text-cyan-500 mb-2" />
              <p className="text-sm font-semibold">Full-Stack</p>
              <p className="text-xs text-muted-foreground mt-1">
                Java · PHP · JS / TS
              </p>
            </AboutCardWrapper>
          </ScrollReveal>

          {/* Beyond Code */}
          <ScrollReveal
            direction="up"
            delay={0.25}
            width="100%"
            className="md:col-span-2"
          >
            <AboutCardWrapper className="h-full p-5 md:p-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Coffee className="w-4 h-4 text-cyan-500" />
                <h3 className="text-sm font-semibold">Beyond Code</h3>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Documentaries, tech blogs, and the occasional binge-watch. I
                believe in keeping a healthy balance between work and play.
              </p>
            </AboutCardWrapper>
          </ScrollReveal>

          {/* Tech focus chips */}
          <ScrollReveal
            direction="up"
            delay={0.3}
            width="100%"
            className="md:col-span-2"
          >
            <AboutCardWrapper className="h-full p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-cyan-500" />
                <h3 className="text-sm font-semibold">
                  Currently working with
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {TECH_FOCUS.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </AboutCardWrapper>
          </ScrollReveal>

          {/* Connect */}
          <ScrollReveal
            direction="up"
            delay={0.35}
            width="100%"
            className="md:col-span-2"
          >
            <AboutCardWrapper className="h-full p-5 md:p-6">
              <div className="flex items-center justify-between flex-wrap gap-4 h-full">
                <div>
                  <p className="text-sm md:text-base font-semibold">
                    Let&apos;s connect
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    Open to new projects and conversations.
                  </p>
                </div>
                <div className="flex gap-3">
                  <AboutIconWrapper>
                    <Link
                      href={`mailto:${email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Email"
                    >
                      <Mail size={20} />
                    </Link>
                  </AboutIconWrapper>
                  <AboutIconWrapper>
                    <Link
                      href={linkedIn_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <FiLinkedin size={20} />
                    </Link>
                  </AboutIconWrapper>
                  <AboutIconWrapper>
                    <Link
                      href={github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <FiGithub size={20} />
                    </Link>
                  </AboutIconWrapper>
                </div>
              </div>
            </AboutCardWrapper>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
