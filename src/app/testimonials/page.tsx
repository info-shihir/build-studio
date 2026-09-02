"use client";

import SiteShell from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import Testimonials from "../../components/Testimonials";
import { content } from "../../lib/content";

export default function TestimonialsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Client Feedback"
        title="What Our Clients Say"
        description="Trusted by property investors, developers, contractors, and trade partners across Bangladesh."
        breadcrumbs={[{ label: "Testimonials" }]}
      />
      <Testimonials testimonials={content.testimonials} hideHeader />
    </SiteShell>
  );
}
