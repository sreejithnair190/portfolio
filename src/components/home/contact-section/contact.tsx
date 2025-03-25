import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { CONTACT } from "@/utils/contact";
import ContactForm from "./contact-form";
import { SectionReveal } from "@/components/ui/section-reveal";
import ContactCardContainerWrapper from "./wrappers/contact-card-container-wrapper";
import ContactCardWrapper from "./wrappers/contact-card-wrapper";
import ContactFormWrapper from "./wrappers/contact-form-wrapper";

export default function Contact() {
  return (
    <section id="contact" className="py-12 md:py-20 lg:py-24 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="container px-4 md:px-6">
        <SectionReveal 
          title="Get In Touch" 
          subtitle="Have a project in mind or want to discuss opportunities? I'd love to hear from you." 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <ContactCardContainerWrapper>
            <Card className="h-full border border-cyan-100/20 bg-card/95 backdrop-blur-sm shadow-lg hover:shadow-[0_0_25px_rgba(103,232,249,0.1)]">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                  Contact Information
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Feel free to reach out through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6">
                {CONTACT.map((item, index) => (
                  <ContactCardWrapper key={index} idx={index}>
                    <div className="bg-cyan-100/20 p-2 md:p-3 rounded-lg flex-shrink-0">
                      <item.icon className="h-4 w-4 md:h-5 md:w-5 text-cyan-500" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium text-sm md:text-base text-cyan-300 truncate">
                        {item.title}
                      </p>
                      {item.href ? (
                        <Link
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs md:text-sm text-muted-foreground hover:text-cyan-400 transition-colors flex items-center gap-1 truncate"
                        >
                          {item.content}
                          <MoveRight className="h-3 w-3 md:h-4 md:w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ) : (
                        <p className="text-xs md:text-sm text-muted-foreground truncate">
                          {item.content}
                        </p>
                      )}
                    </div>
                  </ContactCardWrapper>
                ))}
              </CardContent>
            </Card>
          </ContactCardContainerWrapper>

          {/* Contact Form */}
          <ContactFormWrapper>
            <Card className="border border-cyan-100/20 bg-card/95 backdrop-blur-sm shadow-lg hover:shadow-[0_0_25px_rgba(103,232,249,0.1)]">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                  Send a Message
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Fill out the form below and I&apos;ll get back to you ASAP
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </ContactFormWrapper>
        </div>
      </div>
    </section>
  );
}