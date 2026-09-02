"use client";

import SiteShell from "../../../components/SiteShell";
import PageHero from "../../../components/PageHero";
import ServiceDetailView from "../../../components/ServiceDetailView";
import { ServiceItem } from "../../../types";

interface ServicePageClientProps {
  service: ServiceItem;
}

export default function ServicePageClient({ service }: ServicePageClientProps) {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Services"
        title={service.title}
        description={service.shortDesc}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />
      <ServiceDetailView service={service} />
    </SiteShell>
  );
}
