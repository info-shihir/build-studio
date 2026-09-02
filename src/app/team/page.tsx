"use client";

import SiteShell from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import Team from "../../components/Team";
import { content } from "../../lib/content";

export default function TeamPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Team"
        title="Meet Our Team"
        description="Leadership and departmental teams supporting real estate, construction, trade, accounts, admin, HR, and IT operations."
        breadcrumbs={[{ label: "Team" }]}
      />
      <Team departments={content.teamDepartments} hideHeader />
    </SiteShell>
  );
}
