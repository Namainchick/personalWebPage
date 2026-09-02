"use client";

import { useOS } from "./StoreProvider";
import { focused } from "./store";
import { AppIcon } from "./icons";
import { APPS, DOCK_ORDER } from "@/components/apps/registry";
import { site } from "@/data/site";

export function Dock() {
  const { state, open } = useOS();
  const top = focused(state);
  const openApps = new Set(state.windows.map((w) => w.app));

  return (
    <nav className="os-dock" aria-label="Apps">
      {DOCK_ORDER.map((id) => {
        const meta = APPS[id];
        const isOpen = openApps.has(id);
        const isFocused = top?.app === id;
        return (
          <button
            key={id}
            type="button"
            className={`dock-item${isOpen ? " is-open" : ""}${isFocused ? " is-focused" : ""}`}
            onClick={() => open(id)}
            aria-label={meta.title()}
            aria-pressed={isFocused}
          >
            <AppIcon id={id} />
            <span className="dock-label">{meta.title()}</span>
            <span className="dock-dot" aria-hidden="true" />
          </button>
        );
      })}
      <a
        className="dock-item phone-only"
        href={site.cvPath}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open CV as PDF"
      >
        <AppIcon id="cv" />
        <span className="dock-label">CV.pdf</span>
        <span className="dock-dot" aria-hidden="true" />
      </a>
      <span className="dock-sep" aria-hidden="true" />
      <button
        type="button"
        className={`dock-item${openApps.has("trash") ? " is-open" : ""}${top?.app === "trash" ? " is-focused" : ""}`}
        onClick={() => open("trash")}
        aria-label="Trash"
      >
        <AppIcon id="trash" />
        <span className="dock-label">Trash</span>
        <span className="dock-dot" aria-hidden="true" />
      </button>
    </nav>
  );
}
