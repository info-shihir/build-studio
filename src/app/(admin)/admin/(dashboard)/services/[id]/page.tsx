import ServiceFormPage from "@/features/admin/views/ServiceFormPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <ServiceFormPage serviceId={id} />;
}
