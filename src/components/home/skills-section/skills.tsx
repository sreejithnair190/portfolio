"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";
import { gridPatternStyle } from "@/utils/constants";
import { SKILLS } from "@/utils/skills";
import { SectionReveal } from "../../ui/section-reveal";
import SkillCardWrapper from "./wrappers/skill-card-wrapper";
import SkillBadgeWrapper from "./wrappers/skill-badge-wrapper";
import { cn } from "@/lib/utils";

const SPANS: Record<string, string> = {
  Programming: "lg:col-span-1",
  "Frameworks & Libraries": "lg:col-span-2",
  "Databases & ORM": "lg:col-span-2",
  Infrastructure: "lg:col-span-1",
  Tools: "lg:col-span-1",
  "AI Tools": "lg:col-span-2",
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <style jsx>{gridPatternStyle}</style>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

      <div className="container px-4 md:px-6 relative max-w-6xl mx-auto">
        <SectionReveal
          title="Skills & Technologies"
          subtitle="Core competencies and technical expertise that drive my development work"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            const isFeatured = skill.name === "AI Tools";
            return (
              <ScrollReveal
                key={skill.name}
                delay={index * 0.08}
                direction="up"
                width="100%"
                className={cn("h-full", SPANS[skill.name] ?? "")}
              >
                <SkillCardWrapper>
                  <div
                    className={cn(
                      "relative h-full bg-card border rounded-xl shadow-lg p-5 md:p-6 backdrop-blur-sm overflow-hidden",
                      isFeatured
                        ? "border-cyan-300/40"
                        : "border-cyan-100/20"
                    )}
                  >
                    {/* corner gradient accent */}
                    <div
                      className={cn(
                        "absolute top-0 right-0 w-40 h-40 pointer-events-none rounded-bl-full",
                        isFeatured
                          ? "bg-gradient-to-bl from-cyan-500/15 via-cyan-400/5 to-transparent"
                          : "bg-gradient-to-bl from-cyan-500/10 to-transparent"
                      )}
                    />

                    <div className="relative flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 shrink-0 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-cyan-500" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-lg md:text-xl bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent leading-tight truncate">
                            {skill.name}
                          </h3>
                          <p className="text-[11px] font-mono text-cyan-500/60 mt-0.5">
                            {String(skill.skills.length).padStart(2, "0")} ·
                            entries
                          </p>
                        </div>
                      </div>
                      {isFeatured && (
                        <span className="shrink-0 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-500 border border-cyan-500/30">
                          New
                        </span>
                      )}
                    </div>

                    <div className="relative flex flex-wrap gap-2">
                      {skill.skills.map((s, i) => (
                        <SkillBadgeWrapper skill={s} idx={i} key={s}>
                          <span className="inline-flex items-center px-3 py-1 text-xs md:text-sm font-medium rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200/20 transition-colors cursor-default">
                            {s}
                          </span>
                        </SkillBadgeWrapper>
                      ))}
                    </div>
                  </div>
                </SkillCardWrapper>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
