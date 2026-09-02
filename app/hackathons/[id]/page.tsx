import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hackathons } from "@/data/hackathons";
import { OpenApp } from "@/components/os/OpenApp";

export function generateStaticParams() {
  return hackathons.map((h) => ({ id: h.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const h = hackathons.find((x) => x.id === id);
  return h
    ? {
        title: `${h.project} · ${h.event}`,
        description: `${h.placement}. ${h.oneLiner}`,
        openGraph: { images: [{ url: h.photos[0].src, alt: h.photos[0].alt }] },
      }
    : { title: "Hackathons" };
}

export default async function HackathonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!hackathons.some((h) => h.id === id)) notFound();
  return <OpenApp app="finder" item={`hackathons/${id}`} />;
}
