import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { experiences } from "@/data/experiences";
import { OpenApp } from "@/components/os/OpenApp";

export function generateStaticParams() {
  return experiences.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const exp = experiences.find((e) => e.id === id);
  return exp
    ? { title: `${exp.organization} · Work`, description: exp.summary }
    : { title: "Work" };
}

export default async function WorkItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!experiences.some((e) => e.id === id)) notFound();
  return <OpenApp app="work" item={id} />;
}
