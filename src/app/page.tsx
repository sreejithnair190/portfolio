import type { Metadata } from "next";
import Hero from "@/components/home/hero-section/hero";
import Projects from "@/components/home/projects";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, BriefcaseBusiness, Code2, Download, GraduationCap, Mail, Layers3 } from "lucide-react";
import { EXPERIENCE } from "@/utils/experience";
import { SKILLS } from "@/utils/skills";
import { ACADEMICS, CERTIFICATIONS } from "@/utils/education";
import { email, resumeUrl, siteUrl, github_url, linkedIn_url, portfolioDescription as description } from "@/utils/constants";
import ContactForm from "@/components/home/contact-section/contact-form";
import { series } from "@/lib/journal";
import { journalEnabled } from "@/lib/features";
import SmoothScrollProvider from "@/providers/smooth-scroll-provider";
import "./motion-studio.css";

const title = "Sreejith Nair | Full Stack Software Engineer in Mumbai";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile", firstName: "Sreejith", lastName: "Nair",
    siteName: "Sreejith Nair", url: "/", title, description,
    images: [{ url: "/profile.webp", alt: "Sreejith Nair" }],
  },
  twitter: { card: "summary", title, description, images: ["/profile.webp"] },
};

const profile = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: siteUrl + "/",
  name: title,
  mainEntity: {
    "@type": "Person",
    "@id": siteUrl + "/#person",
    name: "Sreejith Nair",
    jobTitle: EXPERIENCE[0].title,
    description,
    url: siteUrl + "/",
    image: siteUrl + "/profile.webp",
    homeLocation: { "@type": "Place", name: "Mumbai, India" },
    sameAs: [linkedIn_url, github_url],
  },
};

export default function Home() {
  const collection = series[0];
  return (
    <SmoothScrollProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profile).replace(/</g, "\\u003c") }} />
      <Hero />
      <Projects />
      <section className="about-section" id="about">
        <div className="shell about-layout">
          <div className="about-pin" data-enter>
            <p className="eyebrow">
              <span className="orange-line" />
              About me
            </p>
            <h2>
              Behind the
              <br /> <em>screen.</em>
            </h2>
            <div className="portrait-mount" data-surface>
              <figure className="about-portrait">
                <Image
                  src="/profile.webp"
                  alt="Sreejith Nair"
                  width={360}
                  height={480}
                  sizes="(max-width: 760px) 96px, 212px"
                />
                <figcaption>
                  <strong>Sreejith Nair</strong>
                  <p>Mumbai, India</p>
                </figcaption>
              </figure>
            </div>
            <a className="plain-link" href={resumeUrl} download>
              <Download size={16} /> Download résumé
            </a>
          </div>
          <div className="about-detail" data-enter>
            <p className="about-intro">
              I’m a software engineer in Mumbai with 4+ years of experience
              building web applications in Java, PHP, and JavaScript.
            </p>
            <p>
              At ThirstyFish, I built the booking engine for 4Rooms. Guests book
              through a Next.js frontend that connects to a Laravel CMS,
              PostgreSQL, and Stripe. I also work on the tools hotel staff use
              to manage reservations and shifts.
            </p>
            <details id="experience" open>
              <summary><BriefcaseBusiness size={19} aria-hidden="true" />Experience</summary>
              {EXPERIENCE.map((job) => (
                <details className="job-entry" key={job.company}>
                  <summary className="detail-row">
                    <span>
                      <strong>{job.company}</strong>
                      <span className="job-role">{job.title}</span>
                    </span>
                    <small>{job.period}</small>
                  </summary>
                  <ul>
                    {job.description.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <p className="job-tools">{job.technologies.join(" · ")}</p>
                </details>
              ))}
            </details>
            <details id="skills">
              <summary><Code2 size={19} aria-hidden="true" />Technical skills</summary>
              {SKILLS.map((group) => (
                <div className="detail-row stacked" key={group.name}>
                  <strong>{group.name}</strong>
                  <p>{group.skills.join(" · ")}</p>
                </div>
              ))}
            </details>
            <details id="education">
              <summary><GraduationCap size={19} aria-hidden="true" />Education &amp; certifications</summary>
              {ACADEMICS.map((item) => (
                <div className="detail-row stacked" key={item.degree}>
                  <strong>{item.degree}</strong>
                  <p>
                    {item.institution} · {item.period}
                  </p>
                  <p>{item.description}</p>
                </div>
              ))}
              {CERTIFICATIONS.map((item) => (
                <a
                  className="detail-row stacked inline-link"
                  href={item.url}
                  key={item.name}
                >
                  {item.name}
                  <small>
                    {item.issuer} · {item.date}
                  </small>
                </a>
              ))}
            </details>
          </div>
        </div>
      </section>
      {journalEnabled && (
        <section className="journal-section section-block shell" id="journal">
          <div className="section-heading" data-enter>
            <div>
              <p className="eyebrow">
                <span className="orange-line" />
                Journal
              </p>
              <h2>
                Studio <em>notes.</em>
              </h2>
            </div>
            <Link href="/blog" className="plain-link">
              <BookOpen size={16} /> View journal
            </Link>
          </div>
          <Link
            className="series-feature"
            data-enter
            href={`/blog/series/${collection.slug}`}
          >
            <div className="series-icon">
              <Layers3 size={36} />
            </div>
            <div>
              <p className="micro">{collection.posts.length} parts · Series</p>
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
            </div>
            <div className="journal-object" aria-hidden="true" />
          </Link>
        </section>
      )}
      <section className="contact-section" id="contact">
        <div className="shell contact-layout">
          <div className="contact-copy" data-enter data-surface>
            <p className="eyebrow">
              <span className="orange-line" />
              Contact
            </p>
            <h2>
              Let’s <em>talk.</em>
            </h2>
            <p>Have a project in mind or a role to discuss?</p>
            <a href={`mailto:${email}`} className="plain-link">
              <Mail size={17} />
              {email}
            </a>
            <div className="contact-flight" aria-hidden="true">
              <Image src="/studio/paper-plane.webp" alt="" width={640} height={328} sizes="(max-width: 760px) 110px, 340px" />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </SmoothScrollProvider>
  );
}
