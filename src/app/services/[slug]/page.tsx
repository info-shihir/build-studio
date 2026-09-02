import { notFound } from "next/navigation";
import ServicePageClient from "./ServicePageClient";
import { getServiceBySlug, getAllServiceSlugs } from "../../../lib/services";
import { isServiceSlug } from "../../../lib/navigation";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) return { title: "Service Not Found" };
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | Arshia Global BD`,
    description: service.shortDesc,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  return <ServicePageClient service={service} />;
}
