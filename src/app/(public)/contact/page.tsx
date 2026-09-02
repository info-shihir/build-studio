import { SiteShell, PageHero } from "@/shared/layout";
import { Contact } from "@/features/contact";
import { getCompany } from "@/lib/server/siteContent";
import { getPageMeta } from "@/lib/navigation";

export default async function ContactPage() {
  const company = await getCompany();
  const meta = getPageMeta("contact");

  return (
    <SiteShell company={company}>
      <PageHero
        eyebrow={meta?.eyebrow ?? "Get in Touch"}
        title={meta?.title ?? "Contact Us"}
        description={
          meta?.description ??
          "Ready to start your next project? Fill out the form below or reach out directly — our team is here to help."
        }
        breadcrumbs={[{ label: "Contact" }]}
      />
      <Contact company={company} hideHeader />
    </SiteShell>
  );
}
