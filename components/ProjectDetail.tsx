import Image from "next/image";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

export function ProjectDetail({ project }: { project: Project }) {
  const paras = (project.longDescription ?? project.description).split("\n\n");
  return (
    <article>
      <h1 className="font-serif text-[clamp(30px,5vw,46px)] tracking-[-0.5px] text-[var(--ink-strong)]">
        {project.title}
      </h1>
      <p className="mt-2 text-[var(--muted)] text-[16px] max-w-[62ch]">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((t) => (
          <Pill key={t}>{t}</Pill>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        {project.demoUrl ? (
          <Button
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Demo ↗
          </Button>
        ) : null}
        {project.repoUrl ? (
          <Button
            href={project.repoUrl}
            variant="ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code ↗
          </Button>
        ) : null}
      </div>
      <div className="mt-8 space-y-4 text-[var(--ink)] leading-[1.65] max-w-[62ch]">
        {paras.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {project.highlights?.length ? (
        <ul className="mt-6 space-y-2 max-w-[62ch]">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="flex gap-3 text-[var(--muted)]"
            >
              <span className="text-[var(--accent)] mt-[2px]">▪</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {project.learnings ? (
        <p className="mt-6 text-[var(--muted)] italic leading-[1.65] max-w-[62ch]">
          {project.learnings}
        </p>
      ) : null}
      {project.images?.length ? (
        <div className="mt-8 flex flex-col gap-4">
          {project.images.map((src, i) => (
            <div
              key={src}
              className="rounded-[var(--radius-tile)] overflow-hidden border border-[var(--glass-border)]"
            >
              <Image
                src={src}
                alt={`${project.title} – ${i + 1}`}
                width={1200}
                height={750}
                sizes="(max-width: 768px) 100vw, 760px"
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}
