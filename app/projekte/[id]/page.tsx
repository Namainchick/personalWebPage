import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectDetail } from "@/components/ProjectDetail";
import { BackLink } from "@/components/BackLink";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const proj = projects.find((p) => p.id === id);
  return { title: proj ? `${proj.title} – Namanh Bui Vu` : "Projekte – Namanh Bui Vu" };
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
