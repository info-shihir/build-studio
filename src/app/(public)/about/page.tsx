import { SiteShell, PageHero } from "@/shared/layout";
import { About } from "@/features/about";
import { getAbout, getCompany } from "@/lib/server/siteContent";
import { getPageMeta } from "@/lib/navigation";

export default async function AboutPage() {
  const [company, about] = await Promise.all([getCompany(), getAbout()]);
  const meta = getPageMeta("about");

  return (
    <SiteShell company={company}>
      <PageHero
        eyebrow={meta?.eyebrow ?? "Who We Are"}
        title={meta?.title ?? about.title}
        description={meta?.description ?? about.subtitle}
        breadcrumbs={[{ label: "About" }]}
      />
      <About about={about} stats={company.stats} company={company} hideHeader />
    </SiteShell>
  );
}
