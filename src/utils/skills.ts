import {
  Code,
  Server,
  Database,
  Network,
} from "lucide-react";

export const SKILLS = [
  {
    name: "Front-end",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Redux",
    ],
    icon: Code,
    bgGradient: "from-cyan-500/5 via-cyan-400/5 to-transparent",
  },
  {
    name: "Back-end",
    skills: ["Java", "Spring Boot", "PHP", "Laravel", "Node.js", "Express.js", "REST APIs"],
    icon: Server,
    bgGradient: "from-cyan-500/5 via-cyan-400/5 to-transparent",
  },
  {
    name: "Databases & persistence",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Flyway", "Hibernate", "Eloquent", "Prisma"],
    icon: Database,
    bgGradient: "from-cyan-500/5 via-cyan-400/5 to-transparent",
  },
  {
    name: "Infrastructure & tools",
    skills: ["RabbitMQ", "Docker Compose", "Amazon S3", "Git", "Postman"],
    icon: Network,
    bgGradient: "from-cyan-500/5 via-cyan-400/5 to-transparent",
  },
];
