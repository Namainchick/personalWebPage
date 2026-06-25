import Link from "next/link";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";

export function CompetitionCard({ project }: { project: Project }) {
  const a = project.award!;
  return (
    <Link href={`/projekte/${project.id}`} className="block group">
      <GlassPanel className="p-5 transition-transform duration-200 group-hover:-translate-y-px">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[12.5px] text-[var(--muted-2)] tabular-nums">
            {a.date}
          </span>
          <span className="font-sans text-[14px] text-[var(--ink)]">{a.event}</span>
        </div>
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <Badge>{a.prize ? `${a.placement} · ${a.prize}` : a.placement}</Badge>
        </div>
        <div className="mt-3 font-serif text-[19px] text-[var(--ink-strong)]">
          {project.title}{" "}
          <span className="font-sans text-[13px] text-[var(--accent-deep)]">→</span>
        </div>
      </GlassPanel>
    </Link>
  );
}
