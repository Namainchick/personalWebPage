"use client";

import type { ReactNode } from "react";
import { useOS } from "./StoreProvider";
import { DataProvider, type OSData } from "./DataProvider";
import { Menubar } from "./Menubar";
import { Dock } from "./Dock";
import { DesktopIcons } from "./DesktopIcons";
import { WindowLayer } from "./WindowLayer";
import { WALLPAPER_BLUR } from "@/lib/wallpaper";

export function Desktop({ data, children }: { data: OSData; children: ReactNode }) {
  const { state, open } = useOS();
  return (
    <DataProvider value={data}>
      <div className={`os${state.windows.length ? " has-window" : ""}`}>
        <div
          className="os-wallpaper"
          aria-hidden="true"
          style={{ backgroundImage: `url(${WALLPAPER_BLUR})`, backgroundSize: "cover" }}
        >
          {/* Art direction (wide vs. portrait crop) needs <picture>; the files are pre-sized JPEGs. */}
          <picture>
            <source media="(max-width: 767px)" srcSet="/img/wallpaper/shanghai-wide-phone.jpg" />
            <img src="/img/wallpaper/shanghai-wide.jpg" alt="" fetchPriority="high" decoding="async" />
          </picture>
        </div>
        <Menubar />
        <div className="os-area">
          <DesktopIcons />
          <WindowLayer />
        </div>
        <Dock />
        <nav className="os-legal" aria-label="Legal">
          <button type="button" onClick={() => open("text", "impressum")}>
            Impressum
          </button>
          <span aria-hidden="true">·</span>
          <button type="button" onClick={() => open("text", "datenschutz")}>
            Datenschutz
          </button>
        </nav>
        <div hidden>{children}</div>
      </div>
    </DataProvider>
  );
}
