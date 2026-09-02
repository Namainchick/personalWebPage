"use client";

import { useOS } from "@/components/os/StoreProvider";
import type { Win } from "@/components/os/store";
import { experiences, work, education } from "@/data/experiences";

export function WorkApp({ win }: { win: Win }) {
  const { open } = useOS();
  const selected = experiences.find((e) => e.id === win.item) ?? experiences[0];
  const hasItem = Boolean(win.item);

  return (
    <div className={`work${hasItem ? " has-item" : ""}`}>
      <aside className="work-list" aria-label="Positions">
        <h3>Work</h3>
        {work.map((e) => (
          <button
            key={e.id}
            type="button"
            className={`work-item${selected.id === e.id && hasItem ? " is-active" : ""}`}
            onClick={() => open("work", e.id)}
            aria-current={selected.id === e.id ? "true" : undefined}
          >
            <div className="org">{e.organization}</div>
            <div className="role">{e.role}</div>
            <div className="period">{e.period}</div>
          </button>
        ))}
        <h3>Education</h3>
        {education.map((e) => (
          <button
            key={e.id}
            type="button"
            className={`work-item${selected.id === e.id && hasItem ? " is-active" : ""}`}
            onClick={() => open("work", e.id)}
          >
            <div className="org">{e.organization}</div>
            <div className="role">{e.role}</div>
            <div className="period">{e.period}</div>
          </button>
        ))}
      </aside>
      <article className="work-detail">
        <button type="button" className="work-back btn btn-ghost" onClick={() => open("work", "")}>
          ‹ all positions
        </button>
        <div className="meta-line">
          {selected.period} · {selected.location}
        </div>
        <h1 className="app-h1 mt-1">{selected.organization}</h1>
        <div className="text-[16px] text-ink-2 mt-1">{selected.role}</div>
        {selected.skills.length ? (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {selected.skills.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        ) : null}
        <p className="mt-5 max-w-[62ch] text-[15.5px] leading-[1.6]">{selected.summary}</p>
        {selected.bullets.length ? (
          <ul className="bullets mt-5 max-w-[66ch]">
            {selected.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        ) : null}
        {selected.url ? (
          <a
            href={selected.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 font-mono text-[13px] text-accent hover:underline"
          >
            {selected.url.replace(/^https?:\/\//, "")} ↗
          </a>
        ) : null}
      </article>
    </div>
  );
}
