import { Pill } from "@/components/ui/pill";
import type { Experience } from "@/data/experiences";

export function JobDetail({ exp }: { exp: Experience }) {
  const paras = (exp.longDescription ?? exp.impact).split("\n\n");
  return (
    <article>
      <div className="font-mono text-[13px] text-[var(--accent-deep)] tabular-nums">
        {exp.period}
      </div>
      <h1 className="mt-1 font-serif text-[clamp(30px,5vw,46px)] tracking-[-0.5px] text-[var(--ink-strong)]">
        {exp.organization}
      </h1>
      <div className="text-[var(--muted)] text-[16px]">{exp.role}</div>
      {exp.skills?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {exp.skills.map((s) => (
            <Pill key={s}>{s}</Pill>
          ))}
        </div>
      ) : null}
      <div className="mt-8 space-y-4 text-[var(--ink)] leading-[1.65] max-w-[62ch]">
        {paras.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {exp.achievements?.length ? (
        <ul className="mt-6 space-y-2 max-w-[62ch]">
          {exp.achievements.map((a) => (
            <li key={a} className="flex gap-3 text-[var(--muted)]">
              <span className="text-[var(--accent)] mt-[2px]">▪</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {exp.url ? (
        <a
          href={exp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block font-mono text-[13px] text-[var(--accent-deep)] hover:underline"
        >
          {exp.url} ↗
        </a>
      ) : null}
    </article>
  );
}
