import { notFound } from "next/navigation";
import { experiences } from "@/data/experiences";
import { JobDetail } from "@/components/JobDetail";
import { BackLink } from "@/components/BackLink";
import type { Metadata } from "next";

export function generateStaticParams() {
  return experiences.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const exp = experiences.find((e) => e.id === id);
  return { title: exp ? `${exp.role} – Namanh Bui Vu` : "Erfahrungen – Namanh Bui Vu" };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exp = experiences.find((e) => e.id === id);
  if (!exp) notFound();
  return (
    <div>
      <BackLink href="/erfahrungen" label="back to work" />
      <JobDetail exp={exp} />
    </div>
  );
}
