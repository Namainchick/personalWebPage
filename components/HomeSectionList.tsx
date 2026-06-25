import Link from "next/link";
import type { HomeSection } from "@/lib/home-teasers";

export function HomeSectionList({ sections }: { sections: HomeSection[] }) {
  return (
    <nav className="mt-12 border-t border-[rgba(55,75,42,0.12)]">
      {sections.map((s) => (
        <Link
          key={s.key}
          href={s.href}
          className="group flex items-baseline gap-4 py-4 border-b border-[rgba(55,75,42,0.12)]"
        >
          <span className="font-sans text-[15px] text-[var(--ink)] w-[120px] shrink-0">{s.label}</span>
          <span className="font-sans text-[14px] text-[var(--muted-2)] flex-1 truncate">{s.teaser}</span>
          <span className="font-mono text-[12px] text-[var(--faint)] group-hover:text-[var(--accent-deep)] transition-colors">[open]</span>
        </Link>
      ))}
    </nav>
  );
}
