import { Eyebrow } from "@/components/ui/eyebrow";

export function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <header className="mb-10">
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <h1 className="font-serif text-[clamp(34px,5vw,52px)] leading-[1.04] tracking-[-0.5px] text-[var(--ink-strong)]">
        {title}
      </h1>
      {sub ? <p className="mt-3 text-[var(--muted)] max-w-[60ch]">{sub}</p> : null}
    </header>
  );
}
