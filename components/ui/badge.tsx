import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "font-sans inline-flex items-center gap-[6px] rounded-[var(--radius-pill)] whitespace-nowrap",
        "text-[var(--bright)] text-[11px] font-semibold tracking-[0.3px] px-[11px] py-[4px]",
        "[background:var(--accent)] [box-shadow:rgba(255,255,255,0.18)_0_1px_0_0_inset]",
        className
      )}
    >
      {children}
    </span>
  );
}
