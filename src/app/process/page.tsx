"use client";

import SiteShell from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import Process from "../../components/Process";
import { content } from "../../lib/content";

export default function ProcessPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Our Process"
        title="How We Work"
        description="A structured approach from initial consultation to project handover, ensuring transparency and regulatory compliance at every stage."
        breadcrumbs={[{ label: "How We Work" }]}
      />
      <Process steps={content.process} hideHeader />
    </SiteShell>
  );
}
