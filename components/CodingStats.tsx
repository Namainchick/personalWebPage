import { StatTile } from "@/components/ui/stat-tile";
import { ProgressBar } from "@/components/ui/progress-bar";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Pill } from "@/components/ui/pill";
import type { CodingView } from "@/lib/coding";

const TONE = { E: "easy", M: "medium", H: "hard" } as const;

export function CodingStats({ v }: { v: CodingView }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatTile label="NeetCode 150" value={`${v.list150Solved}/${v.list150Total}`} accent />
        <StatTile label="total solved" value={String(v.totalSolved)} />
        <StatTile label="completion" value={`${v.completionPct}%`} />
      </div>

      <GlassPanel className="p-5">
        <div className="flex flex-col gap-4">
          {v.byDifficulty.map((d) => (
            <div key={d.key} className="flex items-center gap-4">
              <div className="w-[88px]">
                <Pill tone={TONE[d.key]}>{d.label}</Pill>
              </div>
              <div className="flex-1">
                <ProgressBar value={d.solved} max={d.total} label={d.label} />
              </div>
              <div className="font-mono text-[14px] text-[var(--ink)] tabular-nums w-[56px] text-right">
                {d.solved}/{d.total}
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>

      <GlassPanel className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {v.byCategory.map((c) => (
            <div key={c.name} className="flex items-center gap-3">
              <span className="flex-1 text-[var(--muted)] text-[13px] truncate">{c.name}</span>
              <div className="w-[72px]">
                <ProgressBar value={c.solved} max={c.total} label={c.name} />
              </div>
              <span className="font-mono text-[12px] text-[var(--muted-2)] tabular-nums w-[42px] text-right">
                {c.solved}/{c.total}
              </span>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
