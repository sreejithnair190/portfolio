import Hero from "@/components/home/hero-section/hero"
import About from "@/components/home/about-section/about"
import Skills from "@/components/home/skills-section/skills"
// import Projects from "@/components/home/projects"
import Experience from "@/components/home/experience"
import Education from "@/components/home/education-section/education"
import Contact from "@/components/home/contact-section/contact"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      {/* <Projects /> */}
      <Experience />
      <Education />
      <Contact />
    </>
  )
}

