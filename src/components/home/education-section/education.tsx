import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ACADEMICS, CERTIFICATIONS } from "@/utils/education";
import { SectionReveal } from "@/components/ui/section-reveal";
import CertificationCardWrapper from "./wrappers/certification-card-wrapper";
import CertificationIconWrapper from "./wrappers/certification-icon-wrapper";
import CertificationIcon from "./certification-icon";
import EducationIcon from "./education-icon";
import TitleWrapper from "./wrappers/title-wrapper";
import EducationCardWrapper from "./wrappers/education-card-wrapper";
import EducationPeriodWrapper from "./wrappers/education-period-wrapper";
import EducationDescriptionWrapper from "./wrappers/education-description-wrapper";
import EducationTitleWrapper from "./wrappers/education-title-wrapper";

export default function Education() {
  return (
    <section id="education" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="container px-4 md:px-6 relative">
        <SectionReveal
          title="Education & Certifications"
          subtitle="Academic journey and professional credentials that shape my expertise"
        />

        <div className="grid gap-12 grid-cols-1 lg:grid-cols-2 lg:gap-16">
          {/* Education */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <EducationIcon />
              </div>
              <TitleWrapper>Academic Background</TitleWrapper>
            </div>

            <div className="space-y-4">
              {ACADEMICS.map((edu, index) => (
                <EducationCardWrapper idx={index} key={index}>
                  <Card className="w-full overflow-visible backdrop-blur-sm bg-card/95 border border-cyan-100/20 hover:border-cyan-300/30 transition-colors shadow-lg hover:shadow-[0_0_25px_rgba(103,232,249,0.1)]">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <EducationTitleWrapper>
                            <CardTitle className="text-lg sm:text-xl text-cyan-500">
                              {edu.degree}
                            </CardTitle>
                          </EducationTitleWrapper>
                          <EducationPeriodWrapper>
                            <Badge 
                              variant="secondary" 
                              className="px-3 py-1.5 shrink-0 w-fit"
                            >
                              <Calendar className="h-4 w-4 mr-2 text-cyan-500" />
                              {edu.period}
                            </Badge>
                          </EducationPeriodWrapper>
                        </div>
                        <EducationDescriptionWrapper>
                          <CardDescription className="text-sm sm:text-base font-medium bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent">
                            {edu.institution}
                          </CardDescription>
                        </EducationDescriptionWrapper>
                      </div>
                    </CardHeader>
                    {edu.description && (
                      <CardContent className="text-sm sm:text-base pt-0">
                        {edu.description}
                      </CardContent>
                    )}
                  </Card>
                </EducationCardWrapper>
              ))}
            </div>
          </div>

          {/* Certification */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <CertificationIcon />
              </div>
              <TitleWrapper>Certifications</TitleWrapper>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((cert, index) => (
                <CertificationCardWrapper idx={index} key={index}>
                  <Card className="h-full w-full backdrop-blur-sm bg-card/95 border border-cyan-100/20 hover:border-cyan-300/30 shadow-lg hover:shadow-[0_0_15px_rgba(103,232,249,0.1)]">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <CertificationIconWrapper>
                          <Award className="h-5 w-5 text-cyan-500 shrink-0" />
                        </CertificationIconWrapper>
                        <CardTitle className="text-sm sm:text-base font-semibold line-clamp-2">
                          {cert.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-col gap-2">
                        <p className="text-xs sm:text-sm font-medium text-cyan-300">
                          {cert.issuer}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {cert.date}
                          </Badge>
                          {cert.url && (
                            <Button
                              asChild
                              variant="ghost"
                              size="sm"
                              className="text-cyan-500 hover:bg-cyan-500/10 h-8 px-3"
                            >
                              <Link href={cert.url} target="_blank">
                                View
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CertificationCardWrapper>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}