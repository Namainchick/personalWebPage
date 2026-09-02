"use client";

import { useEffect } from "react";
import { useOS } from "./StoreProvider";
import { focused } from "./store";
import { Window } from "./Window";
import { APPS } from "@/components/apps/registry";

export function WindowLayer() {
  const { state, close } = useOS();
  const top = focused(state);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !top) return;
      const el = document.activeElement as HTMLElement | null;
      if (el && el.tagName === "INPUT" && (el as HTMLInputElement).value) return;
      close(top.app);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [top, close]);

  return (
    <>
      {state.windows.map((win) => {
        const meta = APPS[win.app];
        const App = meta.component;
        return (
          <Window key={win.app} win={win} meta={meta} isFocused={top?.app === win.app}>
            <App win={win} />
          </Window>
        );
      })}
    </>
  );
}
