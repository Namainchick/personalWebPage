import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  max,
  label,
  className,
}: {
  value: number;
  max: number;
  label?: string;
  className?: string;
}) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className={cn("w-full", className)}
    >
      <div className="h-[10px] rounded-[var(--radius-pill)] [background:var(--well-fill)] [box-shadow:var(--well-inset)] overflow-hidden">
        <div
          style={{ width: `${pct}%` }}
          className="h-full rounded-[var(--radius-pill)] [background:linear-gradient(90deg,var(--accent),var(--accent-bright))] [box-shadow:rgba(255,255,255,0.4)_0_1px_0_0_inset]"
        />
      </div>
    </div>
  );
}
