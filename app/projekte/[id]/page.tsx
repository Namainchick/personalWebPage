import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectDetail } from "@/components/ProjectDetail";
import { BackLink } from "@/components/BackLink";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const proj = projects.find((p) => p.id === id);
  if (!proj) notFound();
  return (
    <div>
      <BackLink href="/projekte" label="back to projects" />
      <ProjectDetail project={proj} />
    </div>
  );
}
