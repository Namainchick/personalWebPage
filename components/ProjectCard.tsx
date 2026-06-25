import Link from "next/link";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Pill } from "@/components/ui/pill";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projekte/${project.id}`} className="block group">
      <GlassPanel className="p-5 transition-transform duration-200 group-hover:-translate-y-px">
        <h3 className="font-serif text-[22px] tracking-[-0.3px] text-[var(--ink-strong)]">
          {project.title}
        </h3>
        <p className="mt-1 text-[var(--muted)] text-[14px] line-clamp-2">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.techStack.slice(0, 6).map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
        <div className="mt-3 flex gap-4 font-mono text-[12.5px] text-[var(--accent-deep)]">
          {project.demoUrl ? <span>demo ↗</span> : null}
          {project.repoUrl ? <span>code ↗</span> : null}
        </div>
      </GlassPanel>
    </Link>
  );
}
