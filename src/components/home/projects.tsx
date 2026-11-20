import Image from "next/image";
import type { CSSProperties } from "react";
import { FiGithub as Github } from "react-icons/fi";
import { github_url } from "@/utils/constants";

const projects = [
  {
    title: "4Rooms",
    website: "https://4rooms.services/4rooms-tech/en",
    category: "Hospitality / ThirstyFish",
    image: "/studio/4rooms-hotel.webp",
    className: "rooms-project",
    stack: "Next.js · Laravel · PostgreSQL · Stripe",
    description:
      "I built the booking engine that connects a guest’s reservation to the tools hotel staff use behind the desk.",
  },
  {
    title: "ResourceQueue",
    website: "https://www.linkedin.com/company/resourcequeue/",
    linkLabel: "ResourceQueue on LinkedIn",
    category: "Developer hiring / ZedexInfo",
    image: "/studio/resourcequeue.webp",
    className: "resourcequeue-project",
    stack: "Organization management · Developer search · Zoom API",
    description:
      "I built tools for companies to manage their teams, find available developers, and schedule interviews through Zoom.",
  },
  {
    title: "ABS Group",
    website: "https://absgroupglobal.com/",
    category: "Industrial engineering / ThirstyFish",
    image: "/studio/abs-group.webp",
    className: "abs-project",
    stack: "Laravel · Regional domains",
    description:
      "I built the routing that gives each region its own product catalog, news, and job listings across the ABS Group sites.",
  },
  {
    title: "Arch Education",
    category: "Education / ThirstyFish",
    image: "/studio/arch-education.webp",
    className: "arch-project",
    stack: "Laravel · Mock-test scheduling",
    description:
      "I built the booking flow students use to register for mock tests and the scheduling tools staff use to manage available slots.",
  },
  {
    title: "BiryaniBowl",
    category: "Commerce / ThirstyFish",
    image: "/studio/biryani.webp",
    className: "biryani-project",
    stack: "Laravel · MySQL · Stripe",
    description:
      "An ordering platform where customers choose a pickup slot and the kitchen can plan for the rush.",
  },
  {
    title: "Hortus API",
    category: "Backend engineering / Personal",
    image: "/studio/hortus.webp",
    className: "hortus-project",
    stack: "Spring Boot · PostgreSQL · Redis · RabbitMQ",
    description:
      "A plant shop API with a cached product catalog, image storage, and a queue for background events.",
    source: `${github_url}/hortus-backend`,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="work-section">
      <div className="shell">
        <div className="work-heading-track">
        <div className="section-heading work-heading">
          <div>
            <p className="eyebrow">
              <span className="orange-line" />
              Portfolio
            </p>
            <h2>
              Selected <em>work.</em>
            </h2>
          </div>
          <a target="_blank" rel="noopener noreferrer" href={github_url} className="plain-link">
            <Github size={16} /> GitHub
          </a>
        </div>
        </div>
        <div className="project-deck">
          {projects.map((project, index) => (
            <article
              className={`project-slide ${project.className}`}
              key={project.title}
              style={{ "--stack-index": index } as CSSProperties}
            >
              <div className="project-frame">
                <div className="project-art">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 100vw, 63vw"
                  />
                </div>
                <div className="project-info">
                  <p className="micro">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  {project.website && (
                    <a target="_blank" rel="noopener noreferrer" className="project-source" href={project.website}>
                      {project.linkLabel ?? `Visit ${project.title}`}
                    </a>
                  )}
                  {project.source && (
                    <a target="_blank" rel="noopener noreferrer" className="project-source" href={project.source}>
                      <Github size={15} /> View source
                    </a>
                  )}
                  <p className="project-stack">{project.stack}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
