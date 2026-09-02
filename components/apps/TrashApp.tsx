"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AppIcon } from "@/components/os/icons";
import { trash, type TrashItem } from "@/data/trash";

export function TrashApp() {
  const [selected, setSelected] = useState<TrashItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(t);
  }, [toast]);

  return (
    <div className="app relative min-h-full">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="app-eyebrow">{trash.length} items</div>
          <h1 className="app-h1 mt-1">Previous versions of this site.</h1>
        </div>
        <button type="button" className="btn btn-ghost" onClick={() => setToast("Nope. These are load-bearing.")}>
          Empty Trash
        </button>
      </div>

      {selected ? (
        <div className="mt-4">
          <button type="button" className="btn btn-ghost" onClick={() => setSelected(null)}>
            ‹ back
          </button>
          <div className="mt-3 rounded-[10px] overflow-hidden border border-line bg-white">
            {selected.src ? (
              <Image
                src={selected.src}
                alt={`Screenshot of ${selected.name}`}
                width={1200}
                height={750}
                sizes="(max-width: 767px) 100vw, 640px"
                className="w-full h-auto"
              />
            ) : (
              <div className="grid place-items-center h-[220px] text-muted">no screenshot survived</div>
            )}
          </div>
          <p className="mt-3 text-ink-2 max-w-[56ch]">{selected.note}</p>
          <p className="meta-line mt-1">deleted {selected.deletedAt}</p>
        </div>
      ) : (
        <div className="mt-4 grid gap-1">
          {trash.map((t) => (
            <button key={t.id} type="button" className="trash-row" onClick={() => setSelected(t)}>
              <span className="thumb">
                {t.src ? (
                  <Image src={t.src} alt="" fill sizes="64px" />
                ) : (
                  <span className="grid place-items-center h-full">
                    <AppIcon id="text" size={28} />
                  </span>
                )}
              </span>
              <span>
                <span className="block font-medium text-[14px]">{t.name}</span>
                <span className="block text-[13px] text-muted">{t.note}</span>
              </span>
              <span className="meta-line">{t.deletedAt}</span>
            </button>
          ))}
        </div>
      )}

      {toast ? (
        <div className="toast" role="status">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
