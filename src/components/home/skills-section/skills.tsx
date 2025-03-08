"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { gridPatternStyle } from "@/utils/constants";
import { SKILLS } from "@/utils/skills";
import { SectionReveal } from "../../ui/section-reveal";
import SkillCardWrapper from "./wrappers/skill-card-wrapper";
import SkillBadgeWrapper from "./wrappers/skill-badge-wrapper";
import SkillIconWrapper from "./wrappers/skill-icon-wrapper";

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <style jsx>{gridPatternStyle}</style>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

      <div className="container px-4 md:px-6 relative">
        <SectionReveal
          title="Skills & Technologies"
          subtitle="Core competencies and technical expertise that drive my development work"
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill, index) => (
            <ScrollReveal
              key={skill.name}
              delay={index * 0.1}
              direction="up"
              className="h-full"
            >
              <SkillCardWrapper>
                <Card className="h-full backdrop-blur-sm bg-card/95 border border-cyan-100/20 hover:border-cyan-300/30 transition-colors shadow-lg hover:shadow-[0_0_25px_rgba(103,232,249,0.1)]">
                  <CardHeader className="pb-2 relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-gradient-to-br opacity-30 z-0 pointer-events-none rounded-t-lg"
                      style={{
                        background: `linear-gradient(to bottom right, rgba(103, 232, 249, 0.1), transparent)`,
                      }}
                    ></div>

                    <div className="flex items-center space-x-3 relative z-10">
                      <SkillIconWrapper>
                        <skill.icon className="h-6 w-6 text-cyan-500" />
                      </SkillIconWrapper>

                      <CardTitle className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                        {skill.name}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {skill.skills.map((skill, index) => (
                        <SkillBadgeWrapper
                          skill={skill}
                          idx={index}
                          key={index}
                        >
                          <Badge
                            variant="secondary"
                            className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-200/20"
                          >
                            {skill}
                          </Badge>
                        </SkillBadgeWrapper>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </SkillCardWrapper>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
