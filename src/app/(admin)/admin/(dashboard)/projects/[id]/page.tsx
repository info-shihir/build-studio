import ProjectFormPage from "@/features/admin/views/ProjectFormPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <ProjectFormPage projectId={id} />;
}
