"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { CodingView } from "@/lib/coding";
import type { TikTokCard } from "@/lib/tiktok";

export type OSData = { grind: CodingView | null; tiktok: TikTokCard[] };

const Ctx = createContext<OSData>({ grind: null, tiktok: [] });

export function DataProvider({ value, children }: { value: OSData; children: ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useOSData(): OSData {
  return useContext(Ctx);
}
