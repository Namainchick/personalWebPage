"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Berlin",
});

const day = new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: "Europe/Berlin" });

/** Berlin wall clock, client-only. Server renders a placeholder so hydration matches. */
export function useClock(): string {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () => setNow(`${day.format(new Date())} ${fmt.format(new Date())}`);
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}
