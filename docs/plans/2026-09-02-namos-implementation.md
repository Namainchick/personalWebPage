# namOS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Greenhouse portfolio with namOS: a lean desktop-OS shell (menubar, dock, draggable windows, phone mode) hosting six apps fed by updated content.

**Architecture:** The root layout (server) fetches live data and renders a client `Desktop` shell that owns window state in a reducer store. Route pages render only `<OpenApp>` which opens the matching window; the shell derives its initial state from the pathname so deep links server-render the right window. Apps are plain components reading static `data/*` plus live props from context.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v3, next/font (Bricolage Grotesque, Hanken Grotesk, IBM Plex Mono), Vitest for the store, headless Chrome for smoke screenshots, Vercel preview deploys.

**Spec:** `docs/plans/2026-09-02-namos-redesign-design.md`

## Global Constraints

- Work on branch `namos`; never push to `main` without Nam's explicit go.
- Max 3 open windows; opening a 4th closes the oldest unfocused window.
- Phone mode below 768 px: one full-screen app sheet, no window chrome, home grid when nothing is open.
- Wins only in `/hackathons`; participated-only events are excluded.
- @namb.tech shows views, never follower counts. Sold-account numbers (50k+ / 20M+) stay in the about copy, separated.
- Every number that can go stale carries a `measuredAt` date in data and is rendered with it.
- Accent `#FF5C2A`; window surface `#F4F3EF`; terminal `#0E1116`; fonts Bricolage Grotesque / Hanken Grotesk / IBM Plex Mono.
- `prefers-reduced-motion`: no typing animation, no transitions; full content rendered at rest.
- Old routes redirect (see Task 3). `metadataBase` is `https://namanh.dev`.
- Prettier: 2 spaces, semicolons, double quotes, 100 chars. React Compiler is on; keep components pure.

---

### Task 1: Data layer

**Files:**
- Modify: `data/experiences.ts`
- Create: `data/hackathons.ts`, `data/about.ts`, `data/content.ts`, `data/site.ts`, `data/trash.ts`
- Modify: `data/projects.ts` (builds only, remove `award` items and the two content/social items)
- Delete: `data/homepage-details.ts`, `lib/home-teasers.ts`

**Interfaces (produces):**

```ts
// data/site.ts
export const site = {
  name: "Namanh Bui Vu",
  short: "Nam",
  email: "namanh.bui2005@gmail.com",
  url: "https://namanh.dev",
  cvPath: "/Namanh_Bui_Vu_CV.pdf",
  location: { now: "Berlin", base: "Hamburg", next: "Singapore · Jan 2027" },
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/Namainchick" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/namanh-bui-vu/" },
    { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@namb.tech" },
  ],
} as const;

// data/experiences.ts
export type Experience = {
  id: string; kind: "work" | "education"; role: string; organization: string;
  location: string; period: string; summary: string; bullets: string[]; skills: string[]; url?: string;
};
export const experiences: Experience[]; // arbio, position-one, flohh, tuhh-ta, tuhh (education), nus (education)

// data/hackathons.ts
export type Hackathon = {
  id: string; event: string; city: string; date: string /* ISO yyyy-mm-dd */; dateLabel: string;
  project: string; placement: string; prize?: string; participants?: string; oneLiner: string;
  description: string; stack: string[]; photos: { src: string; alt: string; feature?: boolean }[];
  links?: { label: string; href: string }[];
};
export const hackathons: Hackathon[]; // sorted newest first: adventurex, megathon, aibeavers-mollie, cursor, tech-europe, ai-sprint

// data/projects.ts
export type Project = {
  id: string; title: string; tagline: string; description: string; stack: string[];
  demoUrl?: string; repoUrl?: string; highlights: string[]; year: string;
};
export const projects: Project[]; // minus-one, bundesliga-prediction, claude-multi-account, hundewelt

// data/about.ts
export const about = {
  whoami: string[];      // 2 lines
  hotTake: { quote: string; followUp: string }; // German quote + English follow-up
  story: string[];       // 4 short paragraphs for `cat story.md`
  commands: string[];    // ["help","ls","whoami","cat","open","cv","clear"]
};

// data/content.ts
export const content = {
  channel: "@namb.tech",
  channelUrl: "https://www.tiktok.com/@namb.tech",
  measuredAt: "2026-08-31",
  totalViews: 461443, videos: 11, topVideoViews: 246400,
  featured: { id: string; title: string; views: number; publishedAt: string }[]; // 3 items
  community: { name: "FAANG/MANGO+ für Deutsche", members: "300+", href: string, measuredAt: "2026-08" },
  originStory: string; // sold accounts, 50k+/20M+
};

// data/trash.ts
export const trash: { id: string; name: string; deletedAt: string; src: string; note: string }[];
```

- [ ] **Step 1: Write `data/site.ts`** exactly as above.
- [ ] **Step 2: Rewrite `data/experiences.ts`** with the CV bullets (Arbio: lock-outs 50+/month → under 10, 434 locks / 1,000+ apartments, 100 % one vendor + fallback; one writer per reservation, lease-based job claiming, compare-and-swap with rollback, 1,500+ tests, shadow-first; 8-stage AI extraction, 166 data points, F1 0.42 → 0.81. Position One: 15+ h/week saved with LangGraph/LangChain agents traced in Langfuse; store generator keeping 1,000+ products in sync, hash-based change detection, multithreaded image ingestion, backoff on two rate-limited APIs. Flohh: campus marketplace, auth, listings, search, transactions, sole engineer. TUHH TA: first-semester CS and Data Science, C and Python. Education TUHH: B.Sc. CS, Oct 2024 – expected 2028, Algorithms & Data Structures, Databases, Networks, C/C++. NUS: exchange Jan – May 2027, Machine Learning, Intro to AI, Software Engineering Principles, Software Testing).
- [ ] **Step 3: Write `data/hackathons.ts`** with the six wins and photo paths under `/img/hackathons/`. Feature photos: `rushhour-4.jpg` (movie poster), `airbn-3.jpg` (token), `adventurex-trophy-airport.jpg`, `dip-cheque.jpg`, `megathon-horsegpt-cheque.jpg`, `mindflayer-aisprint.jpg`. Dates: 2026-07-26 AdventureX (label "Jul 2026"), 2026-06-21 Megathon, 2026-06-05 AI Beavers × Mollie, 2026-01-31 Cursor, 2026-01-25 {Tech: Europe} (label "Jan 2026"), 2025-12-20 AI Sprint (label "Dec 2025"). Descriptions from the current `projects.ts` long descriptions, trimmed to ≤ 3 sentences.
- [ ] **Step 4: Trim `data/projects.ts`** to the four builds. Add `claude-multi-account` (repo https://github.com/Namainchick/claude-multi-account, tagline "Two or more Claude accounts on one machine, at the same time"). Keep Minus One, Bundesliga prediction, Hundewelt.space.
- [ ] **Step 5: Write `data/about.ts`, `data/content.ts`, `data/trash.ts`.** Featured TikToks = top 3 by views from `~/Knowledge/tiktok/namb-tech/daten/videos.csv` (ids, captions as titles, views). Trash: `{ id: "greenhouse", name: "Greenhouse (Jun 2026).png", deletedAt: "2026-09-02", src: "/img/trash/greenhouse-2026-06.jpg", note: "Pale green, very polite, very quiet. Nam said: boring." }` and `{ id: "bento", name: "Bento (Feb 2026).png", deletedAt: "2026-06-25", src: "/img/trash/bento-2026-02.jpg", note: "Teal and coral cards. Removed after four months." }` (bento screenshot produced in Task 8; if the old commit does not build, keep the entry with `src: ""` and render a placeholder file icon).
- [ ] **Step 6: Delete `data/homepage-details.ts` and `lib/home-teasers.ts`.** Run `npx tsc --noEmit` and fix imports that break (expected: `app/page.tsx`, `app/about/page.tsx`, `components/HomeSectionList.tsx`; these are rewritten in Task 3, so stub them or delete now).
- [ ] **Step 7: Commit** `git add data lib && git commit -m "feat(data): namOS content model — hackathons, about, content, site, trash"`.

---

### Task 2: OS store with tests

**Files:**
- Create: `components/os/store.ts` (pure reducer + helpers), `components/os/StoreProvider.tsx` (context, client), `components/os/store.test.ts`
- Modify: `package.json` (add `vitest` devDependency, script `"test": "vitest run"`), create `vitest.config.ts`

**Interfaces (produces):**

```ts
// components/os/store.ts
export type AppId = "terminal" | "work" | "finder" | "grind" | "content" | "mail" | "text" | "trash";
export type Win = { app: AppId; item?: string; z: number; maximized: boolean };
export type OSState = { windows: Win[]; nextZ: number };
export type Action =
  | { type: "open"; app: AppId; item?: string }
  | { type: "close"; app: AppId }
  | { type: "focus"; app: AppId }
  | { type: "toggleMax"; app: AppId }
  | { type: "closeAll" };
export const MAX_WINDOWS = 3;
export function reducer(state: OSState, action: Action): OSState;
export function focused(state: OSState): Win | undefined; // highest z
export function initialStateFor(pathname: string): OSState; // "/" → terminal; "/work/arbio" → work+item
export function appForPath(pathname: string): { app: AppId; item?: string } | null;
export function pathFor(app: AppId, item?: string): string;
```

Path map: `/about`→terminal, `/work(/:id)`→work, `/hackathons(/:id)`→finder item `hackathons/:id` (folder encoded in item: `"hackathons"` or `"hackathons/adventurex"`), `/projects(/:id)`→finder `projects(/:id)`, `/grind`→grind, `/content`→content, `/contact`→mail, `/impressum`→text `impressum`, `/datenschutz`→text `datenschutz`, `/`→terminal.

- [ ] **Step 1: Install Vitest** `npm i -D vitest` and add `vitest.config.ts` with `test: { environment: "node", include: ["**/*.test.ts"] }`.
- [ ] **Step 2: Write failing tests** in `components/os/store.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { reducer, focused, initialStateFor, appForPath, pathFor, MAX_WINDOWS } from "./store";

const empty = { windows: [], nextZ: 1 };

describe("reducer", () => {
  it("opens and focuses a window", () => {
    const s = reducer(empty, { type: "open", app: "work", item: "arbio" });
    expect(s.windows).toHaveLength(1);
    expect(focused(s)?.app).toBe("work");
    expect(focused(s)?.item).toBe("arbio");
  });
  it("re-opening an app focuses it and updates the item instead of duplicating", () => {
    let s = reducer(empty, { type: "open", app: "work", item: "arbio" });
    s = reducer(s, { type: "open", app: "grind" });
    s = reducer(s, { type: "open", app: "work", item: "flohh" });
    expect(s.windows).toHaveLength(2);
    expect(focused(s)).toMatchObject({ app: "work", item: "flohh" });
  });
  it("evicts the oldest unfocused window beyond MAX_WINDOWS", () => {
    let s = empty as ReturnType<typeof reducer>;
    for (const app of ["terminal", "work", "grind", "mail"] as const) s = reducer(s, { type: "open", app });
    expect(s.windows).toHaveLength(MAX_WINDOWS);
    expect(s.windows.map((w) => w.app)).toEqual(["work", "grind", "mail"]);
  });
  it("close removes, focus raises, toggleMax flips", () => {
    let s = reducer(empty, { type: "open", app: "terminal" });
    s = reducer(s, { type: "open", app: "grind" });
    s = reducer(s, { type: "focus", app: "terminal" });
    expect(focused(s)?.app).toBe("terminal");
    s = reducer(s, { type: "toggleMax", app: "terminal" });
    expect(s.windows.find((w) => w.app === "terminal")?.maximized).toBe(true);
    s = reducer(s, { type: "close", app: "terminal" });
    expect(s.windows.map((w) => w.app)).toEqual(["grind"]);
  });
});

describe("paths", () => {
  it("maps routes to apps", () => {
    expect(appForPath("/")).toEqual({ app: "terminal" });
    expect(appForPath("/work/arbio")).toEqual({ app: "work", item: "arbio" });
    expect(appForPath("/hackathons/adventurex")).toEqual({ app: "finder", item: "hackathons/adventurex" });
    expect(appForPath("/projects")).toEqual({ app: "finder", item: "projects" });
    expect(appForPath("/datenschutz")).toEqual({ app: "text", item: "datenschutz" });
    expect(appForPath("/nope")).toBeNull();
  });
  it("round-trips", () => {
    expect(pathFor("finder", "hackathons/adventurex")).toBe("/hackathons/adventurex");
    expect(pathFor("work")).toBe("/work");
    expect(pathFor("terminal")).toBe("/about");
  });
  it("derives initial state from pathname", () => {
    expect(initialStateFor("/grind").windows[0]).toMatchObject({ app: "grind" });
    expect(initialStateFor("/").windows[0]).toMatchObject({ app: "terminal" });
  });
});
```

- [ ] **Step 3: Run** `npm test` → expect FAIL (module not found).
- [ ] **Step 4: Implement `components/os/store.ts`.** Eviction: when adding a new window and `windows.length >= MAX_WINDOWS`, remove the window with the lowest `z`. Re-open: if the app exists, set `item` (when provided) and raise `z`.
- [ ] **Step 5: Run** `npm test` → PASS.
- [ ] **Step 6: Write `components/os/StoreProvider.tsx`** (`"use client"`): `useReducer(reducer, pathname, initialStateFor)`, exposes `{ state, open, close, focus, toggleMax }` via context plus `useOS()` hook. `open` also calls `router.push(pathFor(app, item))` unless the pathname already matches.
- [ ] **Step 7: Commit** `git commit -m "feat(os): window store with eviction + path mapping, tested"`.

---

### Task 3: Desktop shell, routes, redirects, theme

**Files:**
- Modify: `lib/fonts.ts` (Bricolage Grotesque replaces Newsreader → export `display`), `tailwind.config.ts` (fonts `display/sans/mono`, colors `accent #FF5C2A`, `surface #F4F3EF`, `ink #17181C`, `muted #6E7079`, `term #0E1116`), `app/globals.css` (namOS tokens, `.os-*` layout classes, phone-mode media query, reduced-motion), `app/layout.tsx`, `next.config.ts` (redirects)
- Create: `components/os/Desktop.tsx`, `Menubar.tsx`, `Dock.tsx`, `DesktopIcons.tsx`, `WindowLayer.tsx`, `Window.tsx`, `useDrag.ts`, `useClock.ts`, `OpenApp.tsx`, `components/apps/registry.ts`
- Create route pages: `app/about/page.tsx`, `app/work/page.tsx`, `app/work/[id]/page.tsx`, `app/hackathons/page.tsx`, `app/hackathons/[id]/page.tsx`, `app/projects/page.tsx`, `app/projects/[id]/page.tsx`, `app/grind/page.tsx`, `app/content/page.tsx`, `app/contact/page.tsx`; modify `app/page.tsx`, `app/impressum/page.tsx`, `app/datenschutz/page.tsx`
- Delete: `app/erfahrungen/**`, `app/projekte/**`, `app/competitions/**`, `app/coding/**`, `app/kontakt/**`, `components/HomeSectionList.tsx`, `components/SkyBackground.tsx`, `components/JobCard.tsx`, `components/ProjectCard.tsx`, `components/CompetitionCard.tsx`, `components/SectionHeader.tsx`, `components/BackLink.tsx`, `components/Footer.tsx`, `lib/i18n*.ts`, `translations/`, `components/LanguageSwitcher*` if present
- Modify: `app/sitemap.ts`, `app/robots.ts` (new routes, namanh.dev)

**Interfaces:**

```ts
// components/apps/registry.ts
export type AppMeta = { id: AppId; title: string; icon: ReactNode; rect: { x: number; y: number; w: number; h: number }; dock: boolean };
export const APPS: Record<AppId, AppMeta>;
export const DOCK_ORDER: AppId[] = ["terminal", "work", "finder", "grind", "content", "mail"];
// components/os/Desktop.tsx
export function Desktop(props: { grind: CodingView | null; tiktok: TikTokCard[]; children: ReactNode }): JSX.Element;
// components/os/OpenApp.tsx
export function OpenApp({ app, item }: { app: AppId; item?: string }): null; // useEffect → open(app,item) without router.push
```

- [ ] **Step 1: Fonts and tokens.** `lib/fonts.ts`: `Bricolage_Grotesque({ subsets:["latin"], variable:"--font-display", axes:["opsz","wdth"] })`, keep Hanken Grotesk as `--font-sans`, IBM Plex Mono as `--font-mono`. `globals.css` `:root` tokens: `--accent:#FF5C2A; --surface:#F4F3EF; --ink:#17181C; --ink-2:#3C3E46; --muted:#6E7079; --line:#D8D7D0; --term-bg:#0E1116; --term-fg:#D9E1D4; --term-prompt:#7FD1A6; --term-hi:#F2A65A; --chrome:rgba(12,14,22,.55); --os-bg:#0B1020; --r-win:14px; --r-dock:20px; --r-ctrl:8px;`. Body `background: var(--os-bg)`, `overflow: hidden` on desktop (the OS never scrolls; windows scroll inside).
- [ ] **Step 2: `next.config.ts` redirects** (permanent):

```ts
async redirects() {
  return [
    { source: "/erfahrungen", destination: "/work", permanent: true },
    { source: "/erfahrungen/:id", destination: "/work/:id", permanent: true },
    { source: "/projekte", destination: "/projects", permanent: true },
    { source: "/projekte/:id", destination: "/projects/:id", permanent: true },
    { source: "/competitions", destination: "/hackathons", permanent: true },
    { source: "/coding", destination: "/grind", permanent: true },
    { source: "/kontakt", destination: "/contact", permanent: true },
  ];
}
```

- [ ] **Step 3: `app/layout.tsx`.** Async server component: `const [grind, tiktok] = await Promise.all([getCodingView(), getTikTokCards(content.featured)])` (`getTikTokCards` comes in Task 7; until then pass `[]`). Render `<html className={fonts}><body><StoreProvider><Desktop grind tiktok>{children}</Desktop></StoreProvider><Analytics/></body></html>`. Metadata: title `"Namanh Bui Vu — namOS"`, description "Product Engineer at Arbio, CS at TUHH, six hackathon wins, TikTok about tech careers. A portfolio that boots.", `metadataBase: new URL("https://namanh.dev")`, OG image `/og.png` (regenerated in Task 8).
- [ ] **Step 4: `Desktop.tsx`** (`"use client"`): full-viewport `<div class="os">` containing `<Wallpaper/>` (next/image `fill`, `priority`, `sizes="100vw"`, blurDataURL from `shanghai-blur.jpg` base64 inlined at build via a small const), `<Menubar/>`, `<DesktopIcons/>` (CV.pdf top-left, Trash bottom-right), `<WindowLayer>` rendering one `<Window>` per `state.windows` with the app component from `APPS[app]`, `<Dock/>`. `children` rendered in a visually hidden `<div hidden>` (pages only emit `<OpenApp>`, no visuals).
- [ ] **Step 5: `Window.tsx`.** Props `{ win: Win; meta: AppMeta; children }`. Title bar: three traffic lights (close → `close(app)`, yellow → `close(app)` too (minimize is out of scope, label it "close"), green → `toggleMax`), centered title with app icon. Body: `overflow:auto`, padding 0 (apps pad themselves). Position: `useDrag(initialRect)` returns `{ rect, onPointerDown }`; drag via `pointerdown` on the title bar + `pointermove/up` on `window`, clamp within `.os-desktop-area` (below menubar, above dock). Maximized: `inset: 40px 12px 84px` via class. Focus: `onPointerDownCapture → focus(app)`. z-index from `win.z`. Open animation: class `win-enter` (scale .96 → 1, opacity 0 → 1, 180 ms) via `@starting-style` in CSS. Esc key closes the focused window (`useEffect` keydown on `window`).
- [ ] **Step 6: `Menubar.tsx`.** Left: `namOS ▾` button → small menu (About namOS → opens `text` app item `about-namos`; Impressum; Datenschutz). Centre: focused app title. Right: `grind ? `${grind.list150Solved}/${grind.list150Total} NeetCode` : ""`, `useClock()` (Europe/Berlin, `HH:mm`, updates every 30 s, client-only via `useSyncExternalStore` fallback "--:--" on server), location "Berlin".
- [ ] **Step 7: `Dock.tsx`.** `DOCK_ORDER` icons, each a `<button aria-label={title}>` with the icon and an active dot when the app is open (accent when focused). Hover lift via CSS. Click → `open(app)` (store handles `router.push`).
- [ ] **Step 8: `DesktopIcons.tsx`.** `CV.pdf` (`<a href={site.cvPath} target="_blank">`, document icon, label) and `Trash` (`open("trash")`). Positioned absolutely; hidden in phone mode (CV moves into the phone home grid as a tile).
- [ ] **Step 9: Phone mode CSS** in `globals.css` under `@media (max-width: 767px)`: `.os-window { position: fixed !important; inset: 0 !important; transform: none !important; border-radius: 0; }` show only the focused window (`.os-window:not(.is-focused){ display:none }`); title bar becomes a top bar with a back chevron (`.os-win-back` shown, traffic lights hidden); `.os-dock` becomes a 3-column home grid centered on the wallpaper when `.os:not(.has-window)`, and hides when a window is open; menubar reduces to clock + grind widget; desktop icons hidden, CV tile appended to the grid.
- [ ] **Step 10: Route pages.** Each page exports `metadata` and returns `<OpenApp app="…" item="…" />`. `[id]` pages validate the id against data and call `notFound()` otherwise; `generateStaticParams` from data. `app/page.tsx` returns `<OpenApp app="terminal" />`. Legal pages return `<OpenApp app="text" item="impressum" />`; the legal text moves to `data/legal.ts` (`{ impressum: string[]; datenschutz: string[] }`, copied from the existing pages).
- [ ] **Step 11: Delete old pages/components/i18n, update `sitemap.ts`/`robots.ts`**, run `npm run lint && npm run build`. Expected: passes; `/` renders the desktop with a placeholder Terminal window ("terminal app coming in Task 4" text is acceptable only until Task 4 lands in the same branch).
- [ ] **Step 12: Commit** `git commit -m "feat(os): desktop shell — menubar, dock, windows, phone mode, routes, redirects"`.

---

### Task 4: Terminal app

**Files:**
- Create: `components/apps/Terminal.tsx`, `components/apps/terminal-commands.ts`, `components/apps/terminal-commands.test.ts`

**Interfaces:**

```ts
// terminal-commands.ts
export type Line = { kind: "prompt" | "out" | "hi" | "dim"; text: string };
export type CmdResult = { lines: Line[]; open?: { app: AppId; item?: string }; clear?: boolean; href?: string };
export function runCommand(input: string): CmdResult;
export const BOOT_SCRIPT: Line[]; // whoami + cat hot-take.txt + ls, built from data/about.ts
```

- [ ] **Step 1: Failing tests** for `runCommand`: `help` lists commands; `ls` lists the six apps + `CV.pdf`; `open grind` → `{ open: { app: "grind" } }`; `open hackathons` → finder with item `hackathons`; `cv` → `{ href: site.cvPath }`; `cat story.md` → about.story lines; `clear` → `{ clear: true }`; unknown → `zsh: command not found: foo`; `sudo rm -rf /` → one dim line "nice try. this is a portfolio." Run `npm test` → FAIL.
- [ ] **Step 2: Implement `terminal-commands.ts`**, run tests → PASS.
- [ ] **Step 3: `Terminal.tsx`** (`"use client"`). Renders `BOOT_SCRIPT` with a typing effect: state `{ shown: number }` advancing one character every 14 ms (prompt lines appear instantly, output lines type), starts 300 ms after mount, skipped entirely when `matchMedia("(prefers-reduced-motion: reduce)")` matches or when the window was opened via user interaction after load (prop `boot: boolean` from the store: only the initial pathname-derived window boots). Below the script: an `<input>` prompt line `nam@namOS ~ %` with the history rendered above; Enter runs `runCommand`, `open` results call `useOS().open`, `href` opens a new tab. Click anywhere in the terminal focuses the input. Avatar: `/img/avatar.jpg` 28 px round next to the first whoami line.
- [ ] **Step 4: Register in `registry.ts`** (`title: "about.sh — zsh"`, rect `{x:64,y:72,w:640,h:420}`).
- [ ] **Step 5: Smoke** `npm run dev`, open `/`, confirm typing, run `open grind`, Esc closes. Commit `git commit -m "feat(apps): terminal with boot script and commands"`.

---

### Task 5: Work app

**Files:**
- Create: `components/apps/WorkApp.tsx`

- [ ] **Step 1: Layout.** Two panes: left list (`experiences` grouped "Work" / "Education") with organization, role, period; right detail (from `win.item` or first entry): period in mono, organization in display font, role, location, skills as small chips, bullets with accent markers. Selecting a list entry calls `open("work", id)` (updates URL). In phone mode the list is shown when no item is selected and the detail with a "← all" button otherwise.
- [ ] **Step 2: Register** (`title: "Work"`, rect `{x:120,y:96,w:820,h:520}`). Verify `/work/arbio` deep link server-renders Arbio detail (`curl -s localhost:3000/work/arbio | grep -c "434"` → ≥ 1).
- [ ] **Step 3: Commit** `git commit -m "feat(apps): work master-detail"`.

---

### Task 6: Finder app

**Files:**
- Create: `components/apps/FinderApp.tsx`, `components/apps/FinderItem.tsx`, `components/apps/QuickLook.tsx`

- [ ] **Step 1: Layout.** Sidebar: `~/hackathons` (6) and `~/projects` (4). Main: grid of items. Hackathon item = feature photo (next/image, `sizes="(max-width:767px) 50vw, 240px"`), event, placement badge (accent), date label, participants. Project item = folder icon, title, tagline, stack chips. `win.item` = `"hackathons"`, `"projects"`, or `"hackathons/adventurex"`; selecting an item opens `QuickLook` inside the window (full-window overlay with photo gallery (all photos, horizontal scroll), title, placement, prize, description, links, "← back"). Breadcrumb `~/hackathons/adventurex` in the title bar area of the app.
- [ ] **Step 2: Register** (`title: "Finder"`, rect `{x:180,y:110,w:900,h:560}`). Verify `/hackathons/adventurex` server-renders the QuickLook (`grep -c "Pico"`).
- [ ] **Step 3: Commit** `git commit -m "feat(apps): finder with hackathons and projects folders + quick look"`.

---

### Task 7: grind.app, Content, Mail, Text, Trash

**Files:**
- Create: `components/apps/GrindApp.tsx` (port of `CodingStats.tsx`, then delete the old file and `components/ui/*` that become unused), `components/apps/ContentApp.tsx`, `components/apps/MailApp.tsx`, `components/apps/TextApp.tsx`, `components/apps/TrashApp.tsx`, `lib/tiktok.ts`, `data/legal.ts` (if not done in Task 3)

**Interfaces:**

```ts
// lib/tiktok.ts
export type TikTokCard = { id: string; url: string; title: string; views: number; thumbnail?: string };
export async function getTikTokCards(featured: typeof content.featured): Promise<TikTokCard[]>;
// fetch(`https://www.tiktok.com/oembed?url=https://www.tiktok.com/@namb.tech/video/${id}`, { next: { revalidate: 3600 } });
// on any error return the card without thumbnail; never throw.
```

- [ ] **Step 1: `lib/tiktok.ts`** as above; wire into `app/layout.tsx` (`Promise.all`).
- [ ] **Step 2: `GrindApp.tsx`.** Header row: big `list150Solved / 150` in display font, completion %, total solved; difficulty bars; category grid (existing logic). Footer line: `synced hourly from github.com/Namainchick/neetcode-submissions`. Null state: "Couldn't reach GitHub right now. The grind continues offline." Register (`title: "grind.app"`, rect `{x:520,y:80,w:560,h:520}`).
- [ ] **Step 3: `ContentApp.tsx`.** Top: channel line `@namb.tech · 461k views · 11 videos · measured 2026-08-31` (formatted from data). Three cards: thumbnail (plain `<img>` with `referrerPolicy="no-referrer"`, 9:16, fallback dark tile with play glyph), title, views; each links to the TikTok video. Below: community block "FAANG/MANGO+ für Deutsche · 300+ members" with Discord button and the origin-story paragraph. Register (`title: "Content"`, rect `{x:300,y:70,w:760,h:560}`).
- [ ] **Step 4: `MailApp.tsx`.** Compose-style card: To `namanh.bui2005@gmail.com` (mailto button), then GitHub / LinkedIn / TikTok rows. Register (`title: "Mail"`, rect `{x:420,y:160,w:440,h:320}`).
- [ ] **Step 5: `TextApp.tsx`.** Renders `legal[item]` paragraphs or the About-namOS text (`item === "about-namos"`: "namOS 1.0 · built with Next.js 16 · wallpaper: Shanghai, July 2026 · no cookies, Vercel Analytics only"). Register (`title` from item, rect `{x:200,y:120,w:620,h:480}`).
- [ ] **Step 6: `TrashApp.tsx`.** Two file rows from `data/trash.ts` with thumbnail, name, deleted date; click shows the screenshot large with the note. Button "Empty Trash" shows toast "Nope. These are load-bearing." Register (`title: "Trash"`, rect `{x:360,y:140,w:640,h:440}`, `dock: false`).
- [ ] **Step 7: Delete `components/CodingStats.tsx`, `components/JobDetail.tsx`, `components/ProjectDetail.tsx` and unused `components/ui/*`.** `npm run lint && npm run build` → pass. Commit `git commit -m "feat(apps): grind, content, mail, text, trash"`.

---

### Task 8: Polish, assets, docs, preview deploy

**Files:**
- Create: `public/og.png` (1200×630 desktop screenshot), `public/img/trash/bento-2026-02.jpg` (optional)
- Modify: `CLAUDE.md`, `README.md`, `app/sitemap.ts`

- [ ] **Step 1: Bento screenshot (optional, 10 min cap).** `git worktree add /tmp/bento 2a2c3bd`-style checkout of the last Bento commit (`git log --grep Bento` → pick the last commit before the June rewrite), `npm ci && npm run build && npm start -p 3100`, headless Chrome screenshot 1440×900 → `public/img/trash/bento-2026-02.jpg` (1200 px, q75). If it fails to build within the cap, skip and leave `src: ""`.
- [ ] **Step 2: OG image.** `npm run build && npm start`, headless Chrome 1200×630 of `/` after 2 s → `public/og.png`. Verify size < 300 KB.
- [ ] **Step 3: Smoke screenshots** at 1440×900 for `/`, `/work/arbio`, `/hackathons`, `/hackathons/rushhour`, `/grind`, `/content`, and 390×844 for `/`, `/work`, `/hackathons/adventurex`. Check: terminal text visible without interaction, no horizontal scroll (`document.documentElement.scrollWidth <= innerWidth`), dock reachable, phone back button works.
- [ ] **Step 4: Redirects** `for p in /erfahrungen /projekte/minus-one /competitions /coding /kontakt; do curl -s -o /dev/null -w "$p %{http_code} %{redirect_url}\n" localhost:3000$p; done` → all 308 to new routes.
- [ ] **Step 5: Docs.** Rewrite `CLAUDE.md` Architecture/Routing/Styling sections for namOS (store, registry, phone mode, data files, tests: `npm test`). Replace README with a short namOS description + dev commands.
- [ ] **Step 6: Lint, build, test** all green. Commit `git commit -m "chore: og image, docs, smoke-tested namOS"`.
- [ ] **Step 7: Push branch** `git push -u origin namos` → Vercel preview URL (read from `vercel ls` or the GitHub check). Hand the preview URL to Nam. Do NOT merge to `main`.
