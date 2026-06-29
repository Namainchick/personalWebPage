import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { BackLink } from "@/components/BackLink";

export default function ProjektePage() {
  return (
    <div>
      <BackLink />
      <SectionHeader eyebrow="projects" title="Projects" sub="Things I've built" />
      <div className="flex flex-col gap-4">
        {projects
          .filter((p) => !p.award)
          .map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
      </div>
    </div>
  );
}
