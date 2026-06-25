import { GlassPanel } from "@/components/ui/glass-panel";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

export function StatTile({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <GlassPanel className="rounded-[var(--radius-tile)] p-[18px] pb-4">
      <div
        className={cn(
          "font-serif text-[clamp(40px,6vw,56px)] leading-[0.95] tracking-[-0.6px] tabular-nums",
          accent ? "text-[var(--accent-deep)]" : "text-[var(--ink-strong)]"
        )}
      >
        {value}
      </div>
      <Eyebrow className="mt-[10px] text-[var(--muted-2)]">{label}</Eyebrow>
    </GlassPanel>
  );
}
