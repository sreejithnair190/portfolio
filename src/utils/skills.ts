import {
  Code,
  Server,
  Database,
  Cloud,
  Wrench,
  Sparkles,
} from "lucide-react";

export const SKILLS = [
  {
    name: "Programming",
    skills: ["Java", "JavaScript", "TypeScript", "PHP", "SQL"],
    icon: Code,
    bgGradient: "from-cyan-500/5 via-cyan-400/5 to-transparent",
  },
  {
    name: "Frameworks & Libraries",
    skills: [
      "Spring Boot",
      "Node.js",
      "Laravel",
      "React.js",
      "Next.js",
      "jQuery",
      "Tailwind CSS",
      "React Bootstrap",
      "Shadcn UI",
    ],
    icon: Server,
    bgGradient: "from-cyan-500/5 via-cyan-400/5 to-transparent",
  },
  {
    name: "Databases & ORM",
    skills: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Mongoose",
      "Hibernate",
      "Eloquent",
      "Prisma",
    ],
    icon: Database,
    bgGradient: "from-cyan-500/5 via-cyan-400/5 to-transparent",
  },
  {
    name: "Infrastructure",
    skills: ["RabbitMQ", "Redis", "Docker", "AWS"],
    icon: Cloud,
    bgGradient: "from-cyan-500/5 via-cyan-400/5 to-transparent",
  },
  {
    name: "Tools",
    skills: ["Postman", "Git", "GitHub"],
    icon: Wrench,
    bgGradient: "from-cyan-500/5 via-cyan-400/5 to-transparent",
  },
  {
    name: "AI Tools",
    skills: ["Claude Code", "GitHub Copilot", "Kiro"],
    icon: Sparkles,
    bgGradient: "from-cyan-500/5 via-cyan-400/5 to-transparent",
  },
];
