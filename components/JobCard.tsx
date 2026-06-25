import Link from "next/link";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Pill } from "@/components/ui/pill";
import type { Experience } from "@/data/experiences";

export function JobCard({ exp }: { exp: Experience }) {
  return (
    <Link href={`/erfahrungen/${exp.id}`} className="block group">
      <GlassPanel className="p-5 transition-transform duration-200 group-hover:-translate-y-px">
        <div className="font-mono text-[12.5px] text-[var(--accent-deep)] tabular-nums">
          {exp.period}
        </div>
        <h3 className="mt-1 font-serif text-[22px] tracking-[-0.3px] text-[var(--ink-strong)]">
          {exp.organization}
        </h3>
        <div className="text-[var(--muted)] text-[14px]">{exp.role}</div>
        {exp.skills?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {exp.skills.slice(0, 6).map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
        ) : null}
      </GlassPanel>
    </Link>
  );
}
