import { SiteShell, PageHero } from "@/shared/layout";
import { Process } from "@/features/process";
import { getCompany, getProcessSteps } from "@/lib/server/siteContent";
import { getPageMeta } from "@/lib/navigation";

export default async function ProcessPage() {
  const [company, steps] = await Promise.all([getCompany(), getProcessSteps()]);
  const meta = getPageMeta("process");

  return (
    <SiteShell company={company}>
      <PageHero
        eyebrow={meta?.eyebrow ?? "Our Process"}
        title={meta?.title ?? "How We Work"}
        description={
          meta?.description ??
          "A structured approach from initial consultation to project handover, ensuring transparency and regulatory compliance at every stage."
        }
        breadcrumbs={[{ label: "How We Work" }]}
      />
      <Process steps={steps} hideHeader />
    </SiteShell>
  );
}
