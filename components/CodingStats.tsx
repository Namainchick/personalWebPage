import { StatTile } from "@/components/ui/stat-tile";
import { ProgressBar } from "@/components/ui/progress-bar";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Pill } from "@/components/ui/pill";
import type { CodingView } from "@/lib/coding";

export function CodingStats({ v }: { v: CodingView }) {
  const diffs = [
    { key: "easy", label: "Easy", count: v.easy, tone: "easy" as const, max: Math.max(v.easy, v.medium, v.hard, 1) },
    { key: "medium", label: "Medium", count: v.medium, tone: "medium" as const, max: Math.max(v.easy, v.medium, v.hard, 1) },
    { key: "hard", label: "Hard", count: v.hard, tone: "hard" as const, max: Math.max(v.easy, v.medium, v.hard, 1) },
  ];
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatTile label="total solved" value={String(v.total)} />
        <StatTile label="current streak" value={`${v.streak}d`} accent />
        <StatTile label="NeetCode (recent)" value={`${v.neetcodeSolved}/${v.neetcodeTotal}`} />
      </div>
      <GlassPanel className="p-5">
        <div className="flex flex-col gap-4">
          {diffs.map((d) => (
            <div key={d.key} className="flex items-center gap-4">
              <div className="w-[90px]"><Pill tone={d.tone}>{d.label}</Pill></div>
              <div className="flex-1"><ProgressBar value={d.count} max={d.max} label={d.label} /></div>
              <div className="font-mono text-[14px] text-[var(--ink)] tabular-nums w-[48px] text-right">{d.count}</div>
            </div>
          ))}
        </div>
      </GlassPanel>
      {v.recent.length ? (
        <GlassPanel className="p-5">
          <div className="flex flex-col divide-y divide-[rgba(55,75,42,0.10)]">
            {v.recent.slice(0, 10).map((r) => (
              <div key={r.slug} className="flex items-center gap-3 py-2.5">
                <span className="flex-1 text-[var(--ink)] text-[14px] capitalize truncate">{r.title}</span>
                {r.difficulty !== "unknown" ? <Pill tone={r.difficulty}>{r.difficulty}</Pill> : null}
              </div>
            ))}
          </div>
        </GlassPanel>
      ) : null}
    </div>
  );
}
