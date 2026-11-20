"use client";

import { BadgeCheck, ExternalLink, GraduationCap, ScrollText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ACADEMICS, CERTIFICATIONS } from "@/utils/education";
import { SectionReveal } from "@/components/ui/section-reveal";
import { gridPatternStyle } from "@/utils/constants";

function extractCgpa(description?: string) {
  if (!description) return null;
  const match = description.match(/(\d+\.\d+)\/(\d+)/);
  if (!match) return null;
  return { score: match[1], outOf: match[2] };
}

export default function Education() {
  return (
    <section id="education" className="py-20 md:py-28 relative">
      <style jsx>{gridPatternStyle}</style>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="container px-4 md:px-6 relative max-w-6xl mx-auto">
        <SectionReveal
          title="Education & Certifications"
          subtitle="Academic journey and professional credentials that shape my expertise"
        />

        {/* split-pane layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 md:gap-6">
          {/* Academic Foundation panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative rounded-2xl border border-cyan-100/20 bg-card/40 backdrop-blur-sm p-5 md:p-7 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
            <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

            <div className="relative flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-cyan-500" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight">
                    Academic Foundation
                  </h3>
                  <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">
                    Formal Education
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/30">
                {ACADEMICS.length} Records
              </span>
            </div>

            <div className="relative space-y-4">
              {ACADEMICS.map((a, i) => {
                const cgpa = extractCgpa(a.description);
                return (
                  <motion.div
                    key={a.degree}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -2 }}
                    className="group flex items-start justify-between gap-4 md:gap-5 p-4 rounded-xl bg-background/50 border border-cyan-100/10 hover:border-cyan-300/40 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-cyan-500/80 mb-2 px-2 py-0.5 rounded-full border border-cyan-500/20 bg-cyan-500/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                        {a.period}
                      </div>
                      <h4 className="text-base md:text-lg font-bold text-foreground leading-snug group-hover:text-cyan-500 transition-colors">
                        {a.degree}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1 leading-snug">
                        {a.institution}
                      </p>
                    </div>
                    {cgpa && (
                      <div className="shrink-0 text-right">
                        <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent leading-none">
                          {cgpa.score}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1 font-mono">
                          / {cgpa.outOf} CGPA
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Certifications panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative rounded-2xl border border-cyan-100/20 bg-card/40 backdrop-blur-sm p-5 md:p-7 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
            <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

            <div className="relative flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <ScrollText className="h-5 w-5 text-cyan-500" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight">
                    Certifications
                  </h3>
                  <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">
                    Credentials
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/30">
                {CERTIFICATIONS.length} Earned
              </span>
            </div>

            <div className="relative space-y-3.5">
              {CERTIFICATIONS.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="relative rounded-xl bg-background/50 border border-cyan-100/10 group-hover:border-cyan-300/40 transition-colors p-4 pr-5 overflow-hidden">
                      {/* ribbon corner */}
                      <div className="absolute top-0 right-0 w-14 h-14 pointer-events-none overflow-hidden">
                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[56px] border-l-[56px] border-t-cyan-500/20 border-l-transparent" />
                        <BadgeCheck className="absolute top-1.5 right-1.5 h-3.5 w-3.5 text-cyan-500" />
                      </div>

                      <div className="text-[10px] font-mono text-cyan-500/80 mb-2 uppercase tracking-wider">
                        {c.date} · {c.issuer}
                      </div>
                      <h4 className="text-sm md:text-base font-bold leading-snug pr-8 text-foreground group-hover:text-cyan-500 transition-colors">
                        {c.name}
                      </h4>

                      <div className="mt-3 pt-3 border-t border-cyan-100/10 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                          Verified
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-500 transition-transform group-hover:translate-x-0.5">
                          View certificate
                          <ExternalLink className="h-3 w-3" />
                        </span>
                      </div>

                      {/* perforated edge effect */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-background border border-cyan-100/20" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-background border border-cyan-100/20" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
