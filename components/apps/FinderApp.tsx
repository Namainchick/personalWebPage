"use client";

import Image from "next/image";
import { useOS } from "@/components/os/StoreProvider";
import type { Win } from "@/components/os/store";
import { AppIcon } from "@/components/os/icons";
import { hackathons, type Hackathon } from "@/data/hackathons";
import { projects, type Project } from "@/data/projects";

type Folder = "hackathons" | "projects";

function parse(item?: string): { folder: Folder; id?: string } {
  const [f, id] = (item ?? "hackathons").split("/");
  const folder: Folder = f === "projects" ? "projects" : "hackathons";
  return id ? { folder, id } : { folder };
}

export function FinderApp({ win }: { win: Win }) {
  const { open } = useOS();
  const { folder, id } = parse(win.item);
  const hack = folder === "hackathons" && id ? hackathons.find((h) => h.id === id) : undefined;
  const proj = folder === "projects" && id ? projects.find((p) => p.id === id) : undefined;

  return (
    <div className="finder">
      <aside className="finder-side" aria-label="Folders">
        <h3>Favourites</h3>
        <button
          type="button"
          className={`folder-btn${folder === "hackathons" ? " is-active" : ""}`}
          onClick={() => open("finder", "hackathons")}
        >
          🏆 hackathons <span className="count">{hackathons.length}</span>
        </button>
        <button
          type="button"
          className={`folder-btn${folder === "projects" ? " is-active" : ""}`}
          onClick={() => open("finder", "projects")}
        >
          📁 projects <span className="count">{projects.length}</span>
        </button>
      </aside>
      <main className="finder-main">
        <div className="finder-crumb">
          <span>~</span>
          <span>/</span>
          <button type="button" onClick={() => open("finder", folder)}>
            {folder}
          </button>
          {id ? (
            <>
              <span>/</span>
              <span>{id}</span>
            </>
          ) : null}
        </div>
        {hack ? (
          <HackathonLook h={hack} />
        ) : proj ? (
          <ProjectLook p={proj} />
        ) : folder === "hackathons" ? (
          <>
            <p className="text-[14px] text-muted mb-4 max-w-[60ch]">
              Wins only, newest first. One hackathon a month, roughly. Click one for the photos.
            </p>
            <div className="finder-grid">
              {hackathons.map((h) => (
                <HackathonCard key={h.id} h={h} onOpen={() => open("finder", `hackathons/${h.id}`)} />
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-[14px] text-muted mb-4 max-w-[60ch]">
              Builds that outlived the weekend. Hackathon projects live in the other folder.
            </p>
            <div className="finder-grid">
              {projects.map((p) => (
                <ProjectCard key={p.id} p={p} onOpen={() => open("finder", `projects/${p.id}`)} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function feature(h: Hackathon) {
  return h.photos.find((p) => p.feature) ?? h.photos[0];
}

function HackathonCard({ h, onOpen }: { h: Hackathon; onOpen: () => void }) {
  const photo = feature(h);
  return (
    <button type="button" className="hack-card" onClick={onOpen}>
      <div className="pic">
        <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 767px) 50vw, 260px" />
        <span className="badge">{h.placement.split(" · ")[0]}</span>
      </div>
      <div className="txt">
        <div className="ev">{h.event}</div>
        <div className="pr">{h.project}</div>
        <div className="mt">
          {h.dateLabel} · {h.city}
          {h.participants ? ` · ${h.participants}` : ""}
        </div>
      </div>
    </button>
  );
}

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <button type="button" className="proj-card" onClick={onOpen}>
      <AppIcon id="finder" size={36} />
      <div>
        <div className="ti">{p.title}</div>
        <div className="tg">{p.tagline}</div>
      </div>
      <div className="flex flex-wrap gap-1">
        {p.stack.slice(0, 4).map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>
    </button>
  );
}

function HackathonLook({ h }: { h: Hackathon }) {
  return (
    <article>
      <div className="meta-line">
        {h.dateLabel} · {h.city}
        {h.participants ? ` · ${h.participants}` : ""}
      </div>
      <h1 className="app-h1 mt-1">{h.project}</h1>
      <div className="text-[16px] text-ink-2 mt-1">{h.event}</div>
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="badge">{h.placement}</span>
        {h.prize ? <span className="chip">{h.prize}</span> : null}
      </div>
      <p className="mt-5 max-w-[62ch] text-[15.5px] leading-[1.6]">{h.oneLiner}</p>
      <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.6] text-ink-2">{h.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-4">
        {h.stack.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>
      {h.links?.length ? (
        <div className="flex flex-wrap gap-2 mt-5">
          {h.links.map((l) => (
            <a key={l.href} className="btn btn-ghost" href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} ↗
            </a>
          ))}
        </div>
      ) : null}
      <div className="gallery">
        {[feature(h), ...h.photos.filter((p) => p !== feature(h))].map((p) => (
          <div key={p.src} className="shot">
            <Image src={p.src} alt={p.alt} fill sizes="(max-width: 767px) 100vw, 640px" />
          </div>
        ))}
      </div>
    </article>
  );
}

function ProjectLook({ p }: { p: Project }) {
  return (
    <article>
      <div className="meta-line">{p.year}</div>
      <h1 className="app-h1 mt-1">{p.title}</h1>
      <div className="text-[16px] text-ink-2 mt-1">{p.tagline}</div>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {p.stack.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-5">
        {p.demoUrl ? (
          <a className="btn" href={p.demoUrl} target="_blank" rel="noopener noreferrer">
            Demo ↗
          </a>
        ) : null}
        {p.repoUrl ? (
          <a className="btn btn-ghost" href={p.repoUrl} target="_blank" rel="noopener noreferrer">
            Code ↗
          </a>
        ) : null}
      </div>
      <p className="mt-5 max-w-[62ch] text-[15.5px] leading-[1.6]">{p.description}</p>
      <ul className="bullets mt-5 max-w-[66ch]">
        {p.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    </article>
  );
}
