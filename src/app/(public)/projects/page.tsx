import { SiteShell, PageHero } from "@/shared/layout";
import { Projects } from "@/features/projects";
import { getCompany, getProjects } from "@/lib/server/siteContent";
import { getPageMeta } from "@/lib/navigation";

export default async function ProjectsPage() {
  const [company, projects] = await Promise.all([getCompany(), getProjects()]);
  const meta = getPageMeta("projects");

  return (
    <SiteShell company={company}>
      <PageHero
        eyebrow={meta?.eyebrow ?? "Our Work"}
        title={meta?.title ?? "Our Projects"}
        description={
          meta?.description ??
          "A portfolio of real estate developments, construction contracts, infrastructure works, trade operations, and government procurement projects."
        }
        breadcrumbs={[{ label: "Projects" }]}
      />
      <Projects projects={projects} hideHeader />
    </SiteShell>
  );
}
