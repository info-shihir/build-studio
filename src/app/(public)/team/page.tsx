import { SiteShell, PageHero } from "@/shared/layout";
import { Team } from "@/features/team";
import { getCompany, getTeamDepartments } from "@/lib/server/siteContent";
import { getPageMeta } from "@/lib/navigation";

export default async function TeamPage() {
  const [company, departments] = await Promise.all([getCompany(), getTeamDepartments()]);
  const meta = getPageMeta("team");

  return (
    <SiteShell company={company}>
      <PageHero
        eyebrow={meta?.eyebrow ?? "Team"}
        title={meta?.title ?? "Meet Our Team"}
        description={
          meta?.description ??
          "Leadership and departmental teams supporting real estate, construction, trade, accounts, admin, HR, and IT operations."
        }
        breadcrumbs={[{ label: "Team" }]}
      />
      <Team departments={departments} hideHeader />
    </SiteShell>
  );
}
