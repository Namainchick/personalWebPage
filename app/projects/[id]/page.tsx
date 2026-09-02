import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { OpenApp } from "@/components/os/OpenApp";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = projects.find((x) => x.id === id);
  return p ? { title: `${p.title} · Projects`, description: p.tagline } : { title: "Projects" };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!projects.some((p) => p.id === id)) notFound();
  return <OpenApp app="finder" item={`projects/${id}`} />;
}
