import Image from "next/image";
import { Fragment, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { FiGithub as Github } from "react-icons/fi";
import { github_url } from "@/utils/constants";

const projects = [
  {
    title: "4Rooms",
    website: "https://4rooms.services/4rooms-tech/en",
    category: "Hospitality / ThirstyFish",
    image: "/studio/4rooms-hotel.webp",
    className: "rooms-project",
    stack: ["Next.js", "Laravel", "PostgreSQL", "Stripe"],
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
    stack: ["Spring Boot", "Next.js", "PostgreSQL", "Zoom API"],
    description:
      "I built tools for companies to manage their teams, find available developers, and schedule interviews through Zoom.",
  },
  {
    title: "ABS Group",
    website: "https://absgroupglobal.com/",
    category: "Industrial engineering / ThirstyFish",
    image: "/studio/abs-group.webp",
    className: "abs-project",
    stack: ["PHP", "Laravel", "MySQL", "Stripe"],
    description:
      "I built the routing that gives each region its own product catalog, news, and job listings across the ABS Group sites.",
  },
  {
    title: "Arch Education",
    category: "Education / ThirstyFish",
    image: "/studio/arch-education.webp",
    className: "arch-project",
    stack: ["Node.js", "Next.js"],
    description:
      "I built the booking flow students use to register for mock tests and the scheduling tools staff use to manage available slots.",
  },
  {
    title: "BiryaniBowl",
    category: "Commerce / ThirstyFish",
    image: "/studio/biryani.webp",
    className: "biryani-project",
    stack: ["Laravel", "MySQL", "Stripe"],
    description:
      "An ordering platform where customers choose a pickup slot and the kitchen can plan for the rush.",
  },
  {
    title: "Hortus API",
    category: "Backend engineering / Personal",
    image: "/studio/hortus.webp",
    className: "hortus-project",
    stack: ["Spring Boot", "PostgreSQL", "Redis", "RabbitMQ"],
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
              <p className="eyebrow"><span className="orange-line" />Portfolio</p>
              <h2>Selected <em>work.</em></h2>
            </div>
            <div className="work-tools">
              <nav className="project-picker" aria-label="Jump to a project">
                {projects.map((project) => (
                  <a href={`#${project.className}`} key={project.title} aria-label={project.title}>
                    <Image src={project.image} alt="" width={80} height={56} sizes="46px" />
                    <span className="project-tip" aria-hidden="true">{project.title}</span>
                  </a>
                ))}
              </nav>
              <a target="_blank" rel="noopener noreferrer" href={github_url} className="plain-link">
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="project-deck">
          {projects.map((project, index) => (
            <Fragment key={project.title}>
              {/* Shares the card's grid row and stays in flow while the card is pinned. */}
              <span id={project.className} className="project-stop" style={{ gridRow: index + 1 }} aria-hidden="true" />
              <article
                className={`project-slide ${project.className}`}
                data-surface
                style={{ "--stack-index": index, gridRow: index + 1 } as CSSProperties}
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
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    )}
                    {project.source && (
                      <a target="_blank" rel="noopener noreferrer" className="project-source" href={project.source}>
                        <Github size={15} /> View source
                      </a>
                    )}
                    <ul className="project-stack" aria-label="Technologies">
                      {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
                    </ul>
                  </div>
                </div>
              </article>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
