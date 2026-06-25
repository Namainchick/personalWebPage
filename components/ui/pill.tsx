import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "glass" | "easy" | "medium" | "hard";

const glassBase =
  "[background:var(--glass-grad)] [backdrop-filter:blur(14px)_saturate(1.4)] [-webkit-backdrop-filter:blur(14px)_saturate(1.4)] [box-shadow:var(--glass-inset)]";

const tones: Record<Tone, string> = {
  glass: `${glassBase} border border-[var(--glass-border)] text-[var(--muted)]`,
  easy: `${glassBase} border border-[rgba(93,138,87,0.30)] text-[var(--accent-deep)]`,
  medium: `${glassBase} border border-[rgba(194,168,119,0.40)] text-[#9A7B33]`,
  hard: `${glassBase} border border-[rgba(194,120,110,0.40)] text-[#A85A4E]`,
};

export function Pill({
  children,
  tone = "glass",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-sans text-[12.5px] inline-flex items-center gap-[6px] whitespace-nowrap px-[12px] py-[5px] rounded-[var(--radius-pill)]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
