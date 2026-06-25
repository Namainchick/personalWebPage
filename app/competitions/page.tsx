import { projects } from "@/data/projects";
import { CompetitionCard } from "@/components/CompetitionCard";
import { SectionHeader } from "@/components/SectionHeader";
import { BackLink } from "@/components/BackLink";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Competitions – Namanh Bui Vu" };

export default function CompetitionsPage() {
  const comps = projects.filter((p) => p.award);
  return (
    <div>
      <BackLink />
      <SectionHeader
        eyebrow="competitions"
        title="Competitions"
        sub="Hackathons & Wettbewerbe"
      />
      <div className="flex flex-col gap-4">
        {comps.map((p) => (
          <CompetitionCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
