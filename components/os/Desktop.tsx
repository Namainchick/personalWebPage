"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useOS } from "./StoreProvider";
import { DataProvider, type OSData } from "./DataProvider";
import { Menubar } from "./Menubar";
import { Dock } from "./Dock";
import { DesktopIcons } from "./DesktopIcons";
import { WindowLayer } from "./WindowLayer";
import { WALLPAPER_BLUR } from "@/lib/wallpaper";

export function Desktop({ data, children }: { data: OSData; children: ReactNode }) {
  const { state } = useOS();
  return (
    <DataProvider value={data}>
      <div className={`os${state.windows.length ? " has-window" : ""}`}>
        <div className="os-wallpaper" aria-hidden="true">
          <Image
            src="/img/wallpaper/shanghai.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={WALLPAPER_BLUR}
          />
        </div>
        <Menubar />
        <div className="os-area">
          <DesktopIcons />
          <WindowLayer />
        </div>
        <Dock />
        <div hidden>{children}</div>
      </div>
    </DataProvider>
  );
}
