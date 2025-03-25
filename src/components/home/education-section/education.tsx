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

        <div className="grid gap-16 grid-cols-1 md:grid-cols-2 lg:gap-24">
          {/* Education */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <EducationIcon />
              </div>
              <TitleWrapper>Academic Background</TitleWrapper>
            </div>

            {ACADEMICS.map((edu, index) => (
              <EducationCardWrapper idx={index} key={index}>
                <Card className="w-full overflow-visible backdrop-blur-sm bg-card/95 border border-cyan-100/20 hover:border-cyan-300/30 transition-colors shadow-lg hover:shadow-[0_0_25px_rgba(103,232,249,0.1)]">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div className="flex-grow">
                        <EducationTitleWrapper>
                          <CardTitle className="text-xl text-cyan-500">
                            {edu.degree}
                          </CardTitle>
                        </EducationTitleWrapper>
                        <EducationDescriptionWrapper>
                          <CardDescription className="text-base font-medium bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent">
                            {edu.institution}
                          </CardDescription>
                        </EducationDescriptionWrapper>
                      </div>
                      <EducationPeriodWrapper>
                        <Badge 
                          variant="secondary" 
                          className="px-3 py-1.5 w-full md:w-auto text-center"
                        >
                          <Calendar className="h-4 w-4 mr-2 text-cyan-500" />
                          {edu.period}
                        </Badge>
                      </EducationPeriodWrapper>
                    </div>
                  </CardHeader>
                  {edu.description && (
                    <CardContent className="text-sm sm:text-base">
                      {edu.description}
                    </CardContent>
                  )}
                </Card>
              </EducationCardWrapper>
            ))}
          </div>

          {/* Certification */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <CertificationIcon />
              </div>
              <TitleWrapper>Certifications</TitleWrapper>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {CERTIFICATIONS.map((cert, index) => (
                <CertificationCardWrapper idx={index} key={index}>
                  <Card className="h-full w-full backdrop-blur-sm bg-card/95 border border-cyan-100/20 hover:border-cyan-300/30 shadow-lg hover:shadow-[0_0_15px_rgba(103,232,249,0.1)]">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <CertificationIconWrapper>
                          <Award className="h-5 w-5 text-cyan-500" />
                        </CertificationIconWrapper>
                        <CardTitle className="text-base sm:text-lg font-semibold truncate">
                          {cert.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-3">
                        <p className="text-xs sm:text-sm font-medium text-cyan-300 truncate">
                          {cert.issuer}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <Badge variant="secondary" className="w-full sm:w-auto text-center">
                            {cert.date}
                          </Badge>
                          {cert.url && (
                            <Button
                              asChild
                              variant="ghost"
                              size="sm"
                              className="text-cyan-500 hover:bg-cyan-500/10 w-full sm:w-auto"
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