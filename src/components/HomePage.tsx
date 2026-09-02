"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import SiteShell from "./SiteShell";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Projects from "./Projects";
import Process from "./Process";
import Team from "./Team";
import Testimonials from "./Testimonials";
import ContactPreview from "./home/ContactPreview";
import OverviewLink from "./OverviewLink";
import { content } from "../lib/content";
import { getListedServices } from "../lib/services";

function AnimatedSection({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <SiteShell>
      <Hero slides={content.hero.slides} company={content.company} />
      <AnimatedSection>
        <About
          about={content.about}
          stats={content.company.stats}
          company={content.company}
          overview
        />
        <OverviewLink href="/about" label="Learn About Us" />
      </AnimatedSection>
      <AnimatedSection>
        <Services
          services={getListedServices()}
          eyebrow="Our Divisions"
          intro="Five integrated business verticals under one trusted company."
          contentPanelId="home-services-content-panel"
        />
        <OverviewLink href="/services" label="View All Services" />
      </AnimatedSection>
      <AnimatedSection>
        <Projects projects={content.projects} limit={3} />
        <OverviewLink href="/projects" label="View All Projects" />
      </AnimatedSection>
      <AnimatedSection>
        <Process steps={content.process} />
        <OverviewLink href="/process" label="See Our Full Process" />
      </AnimatedSection>
      <AnimatedSection>
        <Team departments={content.teamDepartments} departmentId="leaders" />
        <OverviewLink href="/team" label="Meet the Full Team" />
      </AnimatedSection>
      <AnimatedSection>
        <Testimonials testimonials={content.testimonials} />
        <OverviewLink href="/testimonials" label="Read All Testimonials" />
      </AnimatedSection>
      <AnimatedSection>
        <ContactPreview company={content.company} />
      </AnimatedSection>
    </SiteShell>
  );
}
