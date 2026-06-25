import { cn } from "@/lib/utils";

type Elevation = "card" | "heavy";

const elevations: Record<Elevation, string> = {
  card: [
    "[background:var(--glass-grad)]",
    "[backdrop-filter:blur(22px)_saturate(1.5)] [-webkit-backdrop-filter:blur(22px)_saturate(1.5)]",
    "border border-[var(--glass-border)]",
    "[box-shadow:var(--glass-inset),var(--glass-drop)]",
    "rounded-[var(--radius-panel)]",
  ].join(" "),
  heavy: [
    "[background:var(--glass-grad)]",
    "[backdrop-filter:blur(30px)_saturate(1.68)] [-webkit-backdrop-filter:blur(30px)_saturate(1.68)]",
    "border border-[var(--glass-border)]",
    "[box-shadow:var(--glass-inset),var(--glass-drop-heavy)]",
    "rounded-[var(--radius-panel)]",
  ].join(" "),
};

export function GlassPanel({
  children,
  className,
  elevation = "card",
}: {
  children: React.ReactNode;
  className?: string;
  elevation?: Elevation;
}) {
  return <div className={cn(elevations[elevation], className)}>{children}</div>;
}
