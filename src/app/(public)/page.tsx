import { HomePage } from "@/features/home";
import {
  getAbout,
  getCompany,
  getListedServices,
  getProcessSteps,
  getProjects,
  getSiteContent,
  getTeamDepartments,
  getTestimonials,
} from "@/lib/server/siteContent";

export default async function Page() {
  const [company, content, services] = await Promise.all([
    getCompany(),
    getSiteContent(),
    getListedServices(),
  ]);

  return (
    <HomePage
      company={company}
      heroSlides={content.hero.slides}
      about={content.about}
      services={services}
      projects={content.projects}
      process={content.process}
      teamDepartments={content.teamDepartments}
      testimonials={content.testimonials}
    />
  );
}
