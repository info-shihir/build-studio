"use client";

import SiteShell from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import Projects from "../../components/Projects";
import { content } from "../../lib/content";

export default function ProjectsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Our Work"
        title="Our Projects"
        description="A portfolio of real estate developments, construction contracts, infrastructure works, trade operations, and government procurement projects."
        breadcrumbs={[{ label: "Projects" }]}
      />
      <Projects projects={content.projects} hideHeader />
    </SiteShell>
  );
}
