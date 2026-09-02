"use client";

import { useOSData } from "@/components/os/DataProvider";

export function GrindApp() {
  const { grind: v } = useOSData();

  if (!v) {
    return (
      <div className="app">
        <div className="app-eyebrow">NeetCode 150</div>
        <h1 className="app-h1 mt-1">The grind continues offline.</h1>
        <p className="mt-3 text-ink-2 max-w-[50ch]">
          Couldn&apos;t reach GitHub right now. The numbers sync hourly from the public
          neetcode-submissions repo, try again in a bit.
        </p>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-eyebrow">NeetCode 150 · one hour a day · FAANG summer 2027</div>
      <div className="stat-row mt-3">
        <div className="stat">
          <div className="v">
            {v.list150Solved}
            <small> / {v.list150Total}</small>
          </div>
          <div className="k">NeetCode 150</div>
        </div>
        <div className="stat">
          <div className="v">{v.completionPct}%</div>
          <div className="k">of the list</div>
        </div>
        <div className="stat">
          <div className="v">{v.totalSolved}</div>
          <div className="k">solved total</div>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {v.byDifficulty.map((d) => (
          <div key={d.key} className="grid grid-cols-[80px_1fr_64px] items-center gap-3">
            <span className="text-[13px] font-medium">{d.label}</span>
            <div className={`track${d.key === "H" ? " accent" : ""}`}>
              <b style={{ width: `${d.total ? (d.solved / d.total) * 100 : 0}%` }} />
            </div>
            <span className="meta-line text-right">
              {d.solved}/{d.total}
            </span>
          </div>
        ))}
      </div>

      <h2 className="app-eyebrow mt-7">by pattern</h2>
      <div className="mt-2 grid gap-y-2.5">
        {v.byCategory.map((c) => (
          <div key={c.name} className="grid grid-cols-[1fr_120px_48px] items-center gap-3">
            <span className="text-[13px] text-ink-2">{c.name}</span>
            <div className="track">
              <b style={{ width: `${c.total ? (c.solved / c.total) * 100 : 0}%` }} />
            </div>
            <span className="meta-line text-right">
              {c.solved}/{c.total}
            </span>
          </div>
        ))}
      </div>

      <p className="meta-line mt-7">
        synced hourly from{" "}
        <a
          className="text-accent hover:underline"
          href="https://github.com/Namainchick/neetcode-submissions"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/Namainchick/neetcode-submissions
        </a>
      </p>
    </div>
  );
}
