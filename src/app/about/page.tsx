"use client";

import SiteShell from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import About from "../../components/About";
import { content } from "../../lib/content";

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Who We Are"
        title={content.about.title}
        description={content.about.subtitle}
        breadcrumbs={[{ label: "About" }]}
      />
      <About
        about={content.about}
        stats={content.company.stats}
        company={content.company}
        hideHeader
      />
    </SiteShell>
  );
}
