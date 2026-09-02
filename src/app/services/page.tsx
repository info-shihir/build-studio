"use client";

import SiteShell from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import Services from "../../components/Services";
import { getListedServices } from "../../lib/services";

export default function ServicesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Our Expertise"
        title="What We Offer"
        description="Five integrated divisions aligned with our Memorandum of Association — from real estate and construction to infrastructure, trade, and supply."
        breadcrumbs={[{ label: "Services" }]}
      />
      <Services services={getListedServices()} hideHeader />
    </SiteShell>
  );
}
