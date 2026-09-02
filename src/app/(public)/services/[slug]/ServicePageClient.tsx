"use client";

import { SiteShell, PageHero } from "@/shared/layout";
import { ServiceDetailView } from "@/features/services";
import type { CompanyMeta, ServiceItem } from "@/types";

interface ServicePageClientProps {
  company: CompanyMeta;
  service: ServiceItem;
}

export default function ServicePageClient({ company, service }: ServicePageClientProps) {
  return (
    <SiteShell company={company}>
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
