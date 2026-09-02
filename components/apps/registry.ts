import type { ComponentType } from "react";
import type { AppId, Win } from "@/components/os/store";
import type { Rect } from "@/components/os/useDrag";
import { Terminal } from "./Terminal";
import { WorkApp } from "./WorkApp";
import { FinderApp } from "./FinderApp";
import { GrindApp } from "./GrindApp";
import { ContentApp } from "./ContentApp";
import { MailApp } from "./MailApp";
import { TextApp } from "./TextApp";
import { TrashApp } from "./TrashApp";

export type AppMeta = {
  id: AppId;
  title: (item?: string) => string;
  rect: Rect;
  component: ComponentType<{ win: Win }>;
};

const TEXT_TITLES: Record<string, string> = {
  impressum: "Impressum",
  datenschutz: "Datenschutz",
  "about-namos": "About namOS",
  "404": "Not found",
};

export const APPS: Record<AppId, AppMeta> = {
  terminal: {
    id: "terminal",
    title: () => "about.sh — zsh",
    rect: { x: 64, y: 56, w: 680, h: 440 },
    component: Terminal,
  },
  work: {
    id: "work",
    title: () => "Work",
    rect: { x: 120, y: 72, w: 860, h: 540 },
    component: WorkApp,
  },
  finder: {
    id: "finder",
    title: (item) => (item?.startsWith("projects") ? "Finder — projects" : "Finder — hackathons"),
    rect: { x: 180, y: 84, w: 920, h: 580 },
    component: FinderApp,
  },
  grind: {
    id: "grind",
    title: () => "grind.app",
    rect: { x: 560, y: 64, w: 560, h: 540 },
    component: GrindApp,
  },
  content: {
    id: "content",
    title: () => "Content",
    rect: { x: 300, y: 60, w: 780, h: 580 },
    component: ContentApp,
  },
  mail: {
    id: "mail",
    title: () => "Mail",
    rect: { x: 440, y: 140, w: 460, h: 360 },
    component: MailApp,
  },
  text: {
    id: "text",
    title: (item) => TEXT_TITLES[item ?? ""] ?? "TextEdit",
    rect: { x: 220, y: 100, w: 640, h: 500 },
    component: TextApp,
  },
  trash: {
    id: "trash",
    title: () => "Trash",
    rect: { x: 380, y: 120, w: 660, h: 460 },
    component: TrashApp,
  },
};

export const DOCK_ORDER: AppId[] = ["terminal", "work", "finder", "grind", "content", "mail"];
