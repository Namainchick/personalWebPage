import { experiences } from "@/data/experiences";
import { JobCard } from "@/components/JobCard";
import { SectionHeader } from "@/components/SectionHeader";
import { BackLink } from "@/components/BackLink";

export default function ErfahrungenPage() {
  return (
    <div>
      <BackLink />
      <SectionHeader eyebrow="work" title="Work" sub="Berufliche Stationen & Rollen" />
      <div className="flex flex-col gap-4">
        {experiences.map((exp) => (
          <JobCard key={exp.id} exp={exp} />
        ))}
      </div>
    </div>
  );
}
