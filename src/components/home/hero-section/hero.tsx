import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  Code,
  Terminal,
  Database,
  Cpu,
  GitBranch,
  Brackets,
} from "lucide-react";
import FloatingIcon from "@/components/ui/floating-icon";
import Particle from "@/components/ui/particle";
import HeroMainContentWrapper from "./wrappers/hero-main-content-wrapper";
import HeadingWrapper from "./wrappers/heading-wrapper";
import GradientOverlay from "@/components/ui/gradient-overlay";
import HoverAnimatedLetter from "@/components/ui/hover-animated-letter";
import HeroButtonWrapper from "./wrappers/hero-button-wrapper";
import SlideOverlay from "@/components/ui/slide-overlay";
import HoverAnimatedButton from "@/components/ui/hover-animated-button";
import TerminalCard from "@/components/ui/terminal-card";

export default function Hero() {
  const techIcons = [
    { id: 1, icon: <Terminal size={32} />, className: "top-1/4 left-1/5" },
    { id: 2, icon: <Database size={32} />, className: "bottom-1/3 right-1/4" },
    { id: 3, icon: <Cpu size={32} />, className: "top-1/3 right-1/5" },
    { id: 4, icon: <GitBranch size={32} />, className: "bottom-1/4 left-1/3" },
    { id: 5, icon: <Brackets size={32} />, className: "top-40 left-40" },
    { id: 6, icon: <Code size={32} />, className: "bottom-20 left-40" },
  ];

  const nameLetters = "Sreejith Nair".split("");
  const codeTerminalText = `I'm a passionate full-stack developer with 3 years of \nexperience building web applications.\n\nI have experience working with React, Next.js, Node.js, Laravel, and Spring Boot,\nallowing me to develop both frontend and backend solutions efficiently.`;

  return (
    <section className="py-24 md:py-32 min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
        {techIcons.map(({ icon, className, id }, index) => (
          <FloatingIcon
            icon={icon}
            className={className}
            idx={index}
            key={id}
          />
        ))}
      </div>

      <div className="container px-4 md:px-6 z-10">
        <HeroMainContentWrapper>
          <HeadingWrapper>
            <div className="relative inline-block">
              <span className="relative z-10">
                Hi, I&apos;m{" "}
                <span className="dark:text-cyan-400 text-cyan-600 inline-flex">
                  {nameLetters.map((letter, index) => (
                    <HoverAnimatedLetter
                      letter={letter}
                      idx={index}
                      key={index}
                    />
                  ))}
                </span>
              </span>
              <GradientOverlay />
            </div>
          </HeadingWrapper>

          <TerminalCard text={codeTerminalText} />

          <HeroButtonWrapper>
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-cyan-400 hover:bg-cyan-300"
            >
              <Link href="#projects" className="flex items-center">
                <HoverAnimatedButton
                  title="View My Work"
                  icon={<ArrowRight className="h-4 w-4" />}
                />
                <SlideOverlay />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="group relative overflow-hidden"
            >
              <Link
                href="/resume/070925.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <HoverAnimatedButton
                  title="Download Resume"
                  icon={<Download className="h-4 w-4" />}
                />
                <SlideOverlay />
              </Link>
            </Button>
          </HeroButtonWrapper>
        </HeroMainContentWrapper>
      </div>

      <div className="absolute inset-0 -z-10">
        {[...Array(6)].map((_, i) => (
          <Particle idx={i} key={i} />
        ))}
      </div>
    </section>
  );
}