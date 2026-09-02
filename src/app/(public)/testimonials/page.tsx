import { SiteShell, PageHero } from "@/shared/layout";
import { Testimonials } from "@/features/testimonials";
import { getCompany, getTestimonials } from "@/lib/server/siteContent";
import { getPageMeta } from "@/lib/navigation";

export default async function TestimonialsPage() {
  const [company, testimonials] = await Promise.all([getCompany(), getTestimonials()]);
  const meta = getPageMeta("testimonials");

  return (
    <SiteShell company={company}>
      <PageHero
        eyebrow={meta?.eyebrow ?? "Client Feedback"}
        title={meta?.title ?? "What Our Clients Say"}
        description={
          meta?.description ??
          "Trusted by property investors, developers, contractors, and trade partners across Bangladesh."
        }
        breadcrumbs={[{ label: "Testimonials" }]}
      />
      <Testimonials testimonials={testimonials} hideHeader />
    </SiteShell>
  );
}
