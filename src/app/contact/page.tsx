"use client";

import SiteShell from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import Contact from "../../components/Contact";
import { content } from "../../lib/content";

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        description="Ready to start your next project? Fill out the form below or reach out directly — our team is here to help."
        breadcrumbs={[{ label: "Contact" }]}
      />
      <Contact company={content.company} hideHeader />
    </SiteShell>
  );
}
