"use client";

import Link from "next/link";
import { useOS } from "./StoreProvider";
import { useOSData } from "./DataProvider";
import { useClock } from "./useClock";
import { focused } from "./store";
import { APPS } from "@/components/apps/registry";
import { site } from "@/data/site";

export function Menubar() {
  const { state, open } = useOS();
  const { grind } = useOSData();
  const clock = useClock();
  const top = focused(state);
  const title = top ? APPS[top.app].title(top.item) : "Desktop";

  return (
    <header className="os-menubar">
      <details className="os-menu">
        <summary className="brand">namOS</summary>
        <ul>
          <li>
            <button type="button" onClick={() => open("text", "about-namos")}>
              About namOS
            </button>
          </li>
          <li className="sep" aria-hidden="true" />
          <li>
            <button type="button" onClick={() => open("text", "impressum")}>
              Impressum
            </button>
          </li>
          <li>
            <button type="button" onClick={() => open("text", "datenschutz")}>
              Datenschutz
            </button>
          </li>
          <li className="sep" aria-hidden="true" />
          <li>
            <Link href={site.cvPath} target="_blank" rel="noopener noreferrer">
              Open CV.pdf ↗
            </Link>
          </li>
        </ul>
      </details>
      <div className="center">{title}</div>
      <div className="right">
        {grind ? (
          <button type="button" className="widget" onClick={() => open("grind")}>
            {grind.list150Solved}/{grind.list150Total} NeetCode
          </button>
        ) : null}
        <span className="loc">{site.location.now}</span>
        <span suppressHydrationWarning>{clock || "--:--"}</span>
      </div>
    </header>
  );
}
