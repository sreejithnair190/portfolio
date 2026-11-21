import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight, Download, Mouse } from "lucide-react";
import { FiGithub as Github, FiLinkedin as Linkedin } from "react-icons/fi";
import { github_url, linkedIn_url, resumeUrl } from "@/utils/constants";
import { EXPERIENCE } from "@/utils/experience";
import ComputerViewer from "../computer-viewer";

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-stage">
        <div className="stage-atmosphere" aria-hidden="true" />
        <div className="shell stage-inner">
          <div className="stage-lens" aria-hidden="true">
            <Image src="/studio/optical-glass.webp" alt="" width={1440} height={810} sizes="(max-width: 760px) 160vw, 100vw" loading="eager" />
          </div>
          <div className="stage-copy hero-intro">
            <p className="eyebrow">
              <span className="orange-line" />
              {EXPERIENCE[0].title}
            </p>
            <h1>
              <span className="given-name">Sreejith</span>{" "}
              <em>
                Nair<span>.</span>
              </em>
            </h1>
            <p className="hero-lead">
              I have 4+ years of full-stack experience building APIs with Laravel, Spring Boot, and Node.js, and web interfaces with React and Next.js.
            </p>
            <div className="hero-actions">
              <Link href="#projects" className="button primary">
                Explore my work <ArrowDownRight aria-hidden="true" size={17} />
              </Link>
              <a href={resumeUrl} download className="button secondary">
                <Download size={15} /> Résumé
              </a>
            </div>
          </div>
          <ComputerViewer />
          <div className="stage-footer">
            <div className="stage-location">
              <span className="status-dot" /> Mumbai, India{" "}
              <span className="stage-availability">
                {" "}
                / Open to opportunities
              </span>
            </div>
            <a href="#projects" className="scroll-cue">
              <Mouse size={15} />
              <span>Scroll to explore</span>
            </a>
            <div className="meta-social">
              <a href={github_url} aria-label="Sreejith on GitHub">
                <Github size={16} />
              </a>
              <a href={linkedIn_url} aria-label="Sreejith on LinkedIn">
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
