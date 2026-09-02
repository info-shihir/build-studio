"use client";

import { SiteShell, AnimatedSection } from "@/shared/layout";
import { OverviewLink } from "@/shared/ui";
import { Hero, ContactPreview } from "@/features/home";
import { About } from "@/features/about";
import { Services } from "@/features/services";
import { Projects } from "@/features/projects";
import { Process } from "@/features/process";
import { Team } from "@/features/team";
import { Testimonials } from "@/features/testimonials";
import type {
  AboutSection,
  CompanyMeta,
  HeroSlide,
  ProcessStep,
  ProjectItem,
  ServiceItem,
  TeamDepartment,
  Testimonial,
} from "@/types";

export interface HomePageProps {
  company: CompanyMeta;
  heroSlides: HeroSlide[];
  about: AboutSection;
  services: ServiceItem[];
  projects: ProjectItem[];
  process: ProcessStep[];
  teamDepartments: TeamDepartment[];
  testimonials: Testimonial[];
}

export default function HomePage({
  company,
  heroSlides,
  about,
  services,
  projects,
  process,
  teamDepartments,
  testimonials,
}: HomePageProps) {
  return (
    <SiteShell company={company}>
      <Hero slides={heroSlides} company={company} />
      <AnimatedSection>
        <About about={about} stats={company.stats} company={company} overview />
        <OverviewLink href="/about" label="Learn About Us" />
      </AnimatedSection>
      <AnimatedSection>
        <Services
          services={services}
          eyebrow="Our Divisions"
          intro="Five integrated business verticals under one trusted company."
          contentPanelId="home-services-content-panel"
        />
        <OverviewLink href="/services" label="View All Services" />
      </AnimatedSection>
      <AnimatedSection>
        <Projects projects={projects} limit={3} />
        <OverviewLink href="/projects" label="View All Projects" />
      </AnimatedSection>
      <AnimatedSection>
        <Process steps={process} />
        <OverviewLink href="/process" label="See Our Full Process" />
      </AnimatedSection>
      <AnimatedSection>
        <Team departments={teamDepartments} departmentId="leaders" />
        <OverviewLink href="/team" label="Meet the Full Team" />
      </AnimatedSection>
      <AnimatedSection>
        <Testimonials testimonials={testimonials} />
        <OverviewLink href="/testimonials" label="Read All Testimonials" />
      </AnimatedSection>
      <AnimatedSection>
        <ContactPreview company={company} />
      </AnimatedSection>
    </SiteShell>
  );
}
