import { SiteShell, PageHero } from "@/shared/layout";
import { Services } from "@/features/services";
import { getCompany, getListedServices } from "@/lib/server/siteContent";
import { getPageMeta } from "@/lib/navigation";

export default async function ServicesPage() {
  const [company, services] = await Promise.all([getCompany(), getListedServices()]);
  const meta = getPageMeta("services");

  return (
    <SiteShell company={company}>
      <PageHero
        eyebrow={meta?.eyebrow ?? "Our Expertise"}
        title={meta?.title ?? "What We Offer"}
        description={
          meta?.description ??
          "Five integrated divisions aligned with our Memorandum of Association — from real estate and construction to infrastructure, trade, and supply."
        }
        breadcrumbs={[{ label: "Services" }]}
      />
      <Services
        services={services}
        hideHeader
        eyebrow={meta?.eyebrow}
        title={meta?.title}
        intro={meta?.description}
      />
    </SiteShell>
  );
}
