import { notFound } from "next/navigation";
import ServicePageClient from "./ServicePageClient";
import { getAllServiceSlugs, getServiceBySlug } from "@/lib/services";
import { isServiceSlug } from "@/lib/navigation";
import { getCompany } from "@/lib/server/siteContent";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) return { title: "Service Not Found" };
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | Arshia Global BD`,
    description: service.shortDesc,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();

  const [company, service] = await Promise.all([getCompany(), getServiceBySlug(slug)]);
  if (!service) notFound();

  return <ServicePageClient company={company} service={service} />;
}
