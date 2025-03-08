import {
  Code,
  Server,
  Database,
  // Terminal
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
    skills: ["Node.js", "Express.js", "Springboot", "Laravel", "REST APIs"],
    icon: Server,
    bgGradient: "from-cyan-500/5 via-cyan-400/5 to-transparent",
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
    icon: Database,
    bgGradient: "from-cyan-500/5 via-cyan-400/5 to-transparent",
  },
  //   {
  //     name: "DevOps & Tools",
  //     skills: [
  //       "Git",
  //       "GitHub",
  //       "Docker",
  //       "CI/CD",
  //       "AWS",
  //       "Vercel",
  //       "Jest",
  //       "Cypress",
  //     ],
  //     icon: Terminal,
  //     bgGradient: "from-cyan-500/5 via-cyan-400/5 to-transparent",
  //   },
];
