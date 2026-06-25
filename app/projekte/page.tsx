import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { BackLink } from "@/components/BackLink";

export default function ProjektePage() {
  return (
    <div>
      <BackLink />
      <SectionHeader eyebrow="projects" title="Projects" sub="Was ich gebaut habe" />
      <div className="flex flex-col gap-4">
        {projects.map((proj) => (
          <ProjectCard key={proj.id} project={proj} />
        ))}
      </div>
    </div>
  );
}
