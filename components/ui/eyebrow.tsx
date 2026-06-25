import { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  as: Tag = "span",
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "block font-sans uppercase tracking-[2.3px] text-[11.5px] font-medium text-[var(--muted)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
