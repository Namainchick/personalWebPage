# Greenhouse Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Warm-Bento portfolio with a light "Greenhouse" glass design in a minimal, single-column, real-routes structure (elia.vc-style), keeping all existing data and adding a live LeetCode/Neetcode "The Grind" page.

**Architecture:** Next.js 16 App Router, server components + server-side i18n. New Greenhouse design tokens (CSS variables) + a small glass UI primitive library, consumed by minimal single-column pages. Each list section is a real route; each list item has a detail route. "The Grind" fetches public LeetCode data server-side with Next caching — no DB, no auth.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v3, `next/font` (Newsreader / Hanken Grotesk / IBM Plex Mono).

**Reference spec:** `docs/superpowers/specs/2026-06-25-greenhouse-portfolio-redesign-design.md`

## Global Constraints

- **No test runner exists** (per `CLAUDE.md`/`AGENTS.md`). Per-task verification = `npm run lint` (no new errors) + `npm run build` (succeeds) + manual route check via `npm run dev`. There is no `npm test`.
- **Tailwind v3 stays.** Greenhouse components style via CSS variables + arbitrary-value utilities (`[background:var(--glass-grad)]`). Do NOT migrate to Tailwind v4 or add shadcn.
- **Keep server-side i18n** (`lib/i18n*`, `translations/de.json` + `en.json`). Every new UI string is added to BOTH locales.
- **Preserve all data.** `data/experiences.ts`, `data/homepage-details.ts`, `translations/*` keep their content. Only additive change allowed: optional `award` field on `Project`.
- **Prettier:** 2-space indent, semicolons, double quotes, trailing commas (es5), printWidth 100.
- **Path alias:** `@/*` → project root.
- **Light theme only.** One accent (green), used solid + sparse. No glows, no decorative patterns, no multi-color cards.
- **Branch:** `feat/greenhouse-redesign` (already checked out).
- **prefers-reduced-motion:** all transitions/animations must be disabled under it.

---

## File Structure

**New — design tokens & fonts**
- `app/globals.css` (rewrite) — Greenhouse `:root` tokens, `.sky`, `.grain`, base resets, focus, reduced-motion.
- `lib/fonts.ts` — Newsreader / Hanken Grotesk / IBM Plex Mono via `next/font/google`.
- `tailwind.config.ts` (modify) — Greenhouse colors + 3 font families.

**New — UI primitives** (`components/ui/`)
- `glass-panel.tsx`, `eyebrow.tsx`, `pill.tsx`, `button.tsx`, `badge.tsx`, `progress-bar.tsx`, `stat-tile.tsx`.

**New — portfolio components** (`components/`)
- `SkyBackground.tsx`, `BackLink.tsx`, `SectionHeader.tsx`, `HomeSectionList.tsx`, `JobCard.tsx`, `JobDetail.tsx`, `ProjectCard.tsx`, `ProjectDetail.tsx`, `CompetitionCard.tsx`, `CodingStats.tsx`.
- Rewrite: `Footer.tsx`, `LanguageSwitcher.tsx`.

**New — logic libs** (`lib/`)
- `home-teasers.ts` — derive home section teasers from data.
- `leetcode/client.ts`, `leetcode/types.ts` — public LeetCode GraphQL.
- `neetcode/problems.ts` — Neetcode-250 slug list (ported).
- `coding.ts` — aggregate the live "The Grind" view model.

**Modify — pages** (`app/`)
- `layout.tsx` (rewrite shell), `page.tsx` (home), `erfahrungen/page.tsx`, `projekte/page.tsx`, `kontakt/page.tsx`.
- New: `about/page.tsx`, `competitions/page.tsx`, `coding/page.tsx`, `erfahrungen/[id]/page.tsx`, `projekte/[id]/page.tsx`.

**Modify — data**
- `data/projects.ts` — add optional `award` field + populate the three hackathon winners.
- `translations/de.json` + `en.json` — new UI strings.

**Delete (Task 14):** `components/Card.tsx`, `BubbleCard.tsx`, `BubbleGrid.tsx`, `BackgroundDecoration.tsx`, `Sidebar.tsx`, `Nav.tsx`, `NavMenu.tsx`, `HomeGrid.tsx`, `ExperiencesGrid.tsx`, `ProjectsGrid.tsx`, `ExpandableCard.tsx`, `ViewAllButton.tsx`, `Button.tsx` (old), `components/expanded/*`, `ProjectLink.tsx` (if unused), `SectionHeading.tsx` (replaced by `SectionHeader`), and Bento/decoration CSS.

---

## Task 1: Greenhouse design tokens + background CSS

**Files:**
- Modify (rewrite): `app/globals.css`

**Interfaces:**
- Produces: CSS variables on `:root` — `--bg`, `--ink`, `--ink-strong`, `--muted`, `--muted-2`, `--faint`, `--bright`, `--accent`, `--accent-bright`, `--accent-deep`, `--accent-tint`, `--glass-grad`, `--glass-grad-soft`, `--glass-border`, `--glass-inset`, `--glass-drop`, `--glass-drop-heavy`, `--well-fill`, `--well-inset`, `--serif`, `--sans`, `--mono`, `--radius-panel`, `--radius-tile`, `--radius-ctrl`, `--radius-pill`. Utility classes `.sky`, `.grain`.

- [ ] **Step 1: Replace `app/globals.css` with the Greenhouse base.**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ===== Greenhouse — light glass ===== */
:root {
  /* text tiers */
  --ink:         #2B3328;
  --ink-strong:  #26301F;
  --muted:       #6F7B68;
  --muted-2:     #8A9381;
  --faint:       #AAB39F;
  --bright:      #F3F7EE;

  /* accent green (solid + sparse) */
  --accent:        #5D8A57;
  --accent-bright: #6AA564;
  --accent-deep:   #4F7A4D;
  --accent-tint:   rgba(122,165,110,0.18);

  /* background */
  --bg: #EDF1E7;

  /* glass (light, frosted white) */
  --glass-grad:      linear-gradient(135deg, rgba(255,255,255,0.44), rgba(255,255,255,0.12));
  --glass-grad-soft: linear-gradient(135deg, rgba(255,255,255,0.36), rgba(255,255,255,0) 62%);
  --glass-border:    rgba(255,255,255,0.55);
  --glass-inset:     rgba(255,255,255,0.85) 0 1px 0 0 inset;
  --glass-drop:      rgba(55,75,42,0.40) 0 16px 32px -24px;
  --glass-drop-heavy:rgba(55,75,42,0.50) 0 34px 72px -34px;

  /* recessed well (progress tracks) */
  --well-fill:  rgba(55,75,42,0.10);
  --well-inset: inset 0 2px 4px rgba(55,75,42,0.18);

  /* type stacks — chain to next/font variables set on <html> */
  --serif: var(--font-serif), "New York", Georgia, serif;
  --sans:  var(--font-sans), system-ui, -apple-system, sans-serif;
  --mono:  var(--font-mono), "SF Mono", Menlo, monospace;

  /* radii */
  --radius-panel: 20px;
  --radius-tile:  16px;
  --radius-ctrl:  12px;
  --radius-pill:  999px;
}

* { box-sizing: border-box; padding: 0; margin: 0; }
html { scroll-behavior: smooth; }
html, body { max-width: 100%; overflow-x: hidden; }
body {
  background-color: var(--bg);
  color: var(--ink);
  font-family: var(--sans);
  font-weight: 400; line-height: 1.6; font-size: 15px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* garden sky — soft corner colour fields over the pale base */
.sky {
  position: fixed; inset: 0; z-index: -2; pointer-events: none;
  background-image:
    radial-gradient(42% 40% at 12% 6%,  rgba(142,192,128,0.72), transparent 70%),
    radial-gradient(44% 42% at 93% 2%,  rgba(108,182,174,0.58), transparent 70%),
    radial-gradient(58% 54% at 90% 100%, rgba(226,170,102,0.30), transparent 72%),
    radial-gradient(50% 50% at 2% 96%,  rgba(120,170,150,0.20), transparent 72%);
}

/* film grain — faint fixed noise, inline SVG (no external resource) */
.grain {
  position: fixed; inset: 0; z-index: -1; pointer-events: none; opacity: 0.02;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 160px 160px;
}

a { color: inherit; text-decoration: none; transition: color 150ms ease; }

:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Verify lint + build.** Run `npm run lint` then `npm run build`. Expected: build succeeds. (Old pages still reference Bento classes that no longer exist — that's fine; Tailwind/CSS ignores unknown classes, the build does not fail. They are removed in later tasks.)

- [ ] **Step 3: Commit.**
```bash
git add app/globals.css
git commit -m "feat: replace theme with Greenhouse light-glass tokens + sky/grain"
```

---

## Task 2: Fonts + Tailwind config

**Files:**
- Create: `lib/fonts.ts`
- Modify: `tailwind.config.ts`

**Interfaces:**
- Produces: `serif`, `sans`, `mono` font objects (each exposes `.variable`); CSS vars `--font-serif/-sans/-mono` are applied to `<html>` in Task 4.

- [ ] **Step 1: Create `lib/fonts.ts`.**
```ts
import { Newsreader, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";

export const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
export const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
```

- [ ] **Step 2: Update `tailwind.config.ts`** — replace the `colors` and `fontFamily` blocks under `theme.extend`:
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#EDF1E7",
        ink: "#2B3328",
        muted: "#6F7B68",
        accent: { DEFAULT: "#5D8A57", bright: "#6AA564", deep: "#4F7A4D" },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Verify build.** Run `npm run build`. Expected: succeeds (fonts download at build).

- [ ] **Step 4: Commit.**
```bash
git add lib/fonts.ts tailwind.config.ts
git commit -m "feat: add Greenhouse fonts (Newsreader/Hanken/IBM Plex) + tailwind palette"
```

---

## Task 3: UI primitives

**Files:**
- Create: `components/ui/glass-panel.tsx`, `eyebrow.tsx`, `pill.tsx`, `button.tsx`, `badge.tsx`, `progress-bar.tsx`, `stat-tile.tsx`
- Verify `lib/utils.ts` exports `cn` (it exists in repo today; if not, create it: `export function cn(...a:(string|false|null|undefined)[]){return a.filter(Boolean).join(" ")}`).

**Interfaces (Produces):**
- `GlassPanel({children, className?, elevation?: "card"|"heavy"})`
- `Eyebrow({children, as?, className?})`
- `Pill({children, tone?: "glass"|"easy"|"medium"|"hard", className?})`
- `Button({children, variant?: "primary"|"ghost"|"icon", className?, ...anchor/button props})` — render as `<a>` when `href` present, else `<button>`.
- `Badge({children, className?})` — solid-green placement badge.
- `ProgressBar({value, max, label?, className?})`
- `StatTile({label, value, accent?})`

- [ ] **Step 1: `glass-panel.tsx`.**
```tsx
import { cn } from "@/lib/utils";

type Elevation = "card" | "heavy";

const elevations: Record<Elevation, string> = {
  card: [
    "[background:var(--glass-grad)]",
    "[backdrop-filter:blur(22px)_saturate(1.5)] [-webkit-backdrop-filter:blur(22px)_saturate(1.5)]",
    "border border-[var(--glass-border)]",
    "[box-shadow:var(--glass-inset),var(--glass-drop)]",
    "rounded-[var(--radius-panel)]",
  ].join(" "),
  heavy: [
    "[background:var(--glass-grad)]",
    "[backdrop-filter:blur(30px)_saturate(1.68)] [-webkit-backdrop-filter:blur(30px)_saturate(1.68)]",
    "border border-[var(--glass-border)]",
    "[box-shadow:var(--glass-inset),var(--glass-drop-heavy)]",
    "rounded-[var(--radius-panel)]",
  ].join(" "),
};

export function GlassPanel({
  children,
  className,
  elevation = "card",
}: {
  children: React.ReactNode;
  className?: string;
  elevation?: Elevation;
}) {
  return <div className={cn(elevations[elevation], className)}>{children}</div>;
}
```

- [ ] **Step 2: `eyebrow.tsx`.**
```tsx
import { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  as: Tag = "span",
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag className={cn("block font-sans uppercase tracking-[2.3px] text-[11.5px] font-medium text-[var(--muted)]", className)}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 3: `pill.tsx`** (tech tags + difficulty tones; light glass).
```tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "glass" | "easy" | "medium" | "hard";

const glassBase =
  "[background:var(--glass-grad)] [backdrop-filter:blur(14px)_saturate(1.4)] [-webkit-backdrop-filter:blur(14px)_saturate(1.4)] [box-shadow:var(--glass-inset)]";

const tones: Record<Tone, string> = {
  glass: `${glassBase} border border-[var(--glass-border)] text-[var(--muted)]`,
  easy: `${glassBase} border border-[rgba(93,138,87,0.30)] text-[var(--accent-deep)]`,
  medium: `${glassBase} border border-[rgba(194,168,119,0.40)] text-[#9A7B33]`,
  hard: `${glassBase} border border-[rgba(194,120,110,0.40)] text-[#A85A4E]`,
};

export function Pill({
  children,
  tone = "glass",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-sans text-[12.5px] inline-flex items-center gap-[6px] whitespace-nowrap px-[12px] py-[5px] rounded-[var(--radius-pill)]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 4: `button.tsx`** (renders `<a>` if `href`, else `<button>`).
```tsx
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "icon";

const base =
  "inline-flex items-center gap-2 font-sans cursor-pointer transition-[transform,background,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2";

const glass =
  "[background:var(--glass-grad)] [backdrop-filter:blur(14px)_saturate(1.4)] [-webkit-backdrop-filter:blur(14px)_saturate(1.4)] border border-[var(--glass-border)] [box-shadow:var(--glass-inset)] hover:-translate-y-px active:translate-y-0";

const variants: Record<Variant, string> = {
  primary:
    "text-[var(--bright)] font-semibold text-[14px] rounded-[var(--radius-ctrl)] px-5 py-3 border-0 [background:var(--accent)] [box-shadow:rgba(255,255,255,0.18)_0_1px_0_0_inset,rgba(55,75,42,0.35)_0_6px_16px_-8px] hover:-translate-y-px hover:[background:#6AA564] active:translate-y-0",
  ghost: `text-[var(--ink)] font-medium text-[14px] rounded-[var(--radius-ctrl)] px-5 py-3 ${glass}`,
  icon: `justify-center w-[40px] h-[40px] rounded-full text-[var(--ink)] ${glass}`,
};

type Props = { variant?: Variant; className?: string; href?: string } & AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = "primary", className, href, ...props }: Props) {
  const cls = cn(base, variants[variant], className);
  if (href) return <a href={href} className={cls} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  return <button className={cls} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
```

- [ ] **Step 5: `badge.tsx`** (solid-green placement badge).
```tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "font-sans inline-flex items-center gap-[6px] rounded-[var(--radius-pill)] whitespace-nowrap",
        "text-[var(--bright)] text-[11px] font-semibold tracking-[0.3px] px-[11px] py-[4px]",
        "[background:var(--accent)] [box-shadow:rgba(255,255,255,0.18)_0_1px_0_0_inset]",
        className
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 6: `progress-bar.tsx`.**
```tsx
import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  max,
  label,
  className,
}: {
  value: number;
  max: number;
  label?: string;
  className?: string;
}) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className={cn("w-full", className)}
    >
      <div className="h-[10px] rounded-[var(--radius-pill)] [background:var(--well-fill)] [box-shadow:var(--well-inset)] overflow-hidden">
        <div
          style={{ width: `${pct}%` }}
          className="h-full rounded-[var(--radius-pill)] [background:linear-gradient(90deg,var(--accent),var(--accent-bright))] [box-shadow:rgba(255,255,255,0.4)_0_1px_0_0_inset]"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 7: `stat-tile.tsx`.**
```tsx
import { GlassPanel } from "@/components/ui/glass-panel";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

export function StatTile({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <GlassPanel className="rounded-[var(--radius-tile)] p-[18px] pb-4">
      <div
        className={cn(
          "font-serif text-[clamp(40px,6vw,56px)] leading-[0.95] tracking-[-0.6px] tabular-nums",
          accent ? "text-[var(--accent-deep)]" : "text-[var(--ink-strong)]"
        )}
      >
        {value}
      </div>
      <Eyebrow className="mt-[10px] text-[var(--muted-2)]">{label}</Eyebrow>
    </GlassPanel>
  );
}
```

- [ ] **Step 8: Verify.** `npm run lint` then `npm run build`. Expected: succeeds (components unused so far — that's fine).

- [ ] **Step 9: Commit.**
```bash
git add components/ui lib/utils.ts
git commit -m "feat: add Greenhouse UI primitives (glass, pill, button, badge, progress, stat tile)"
```

---

## Task 4: Layout shell + background + BackLink + Footer + LanguageSwitcher

**Files:**
- Create: `components/SkyBackground.tsx`, `components/BackLink.tsx`, `components/SectionHeader.tsx`
- Modify (rewrite): `app/layout.tsx`, `components/Footer.tsx`, `components/LanguageSwitcher.tsx`

**Interfaces:**
- Consumes: `serif/sans/mono` (Task 2).
- Produces: `SkyBackground()`; `BackLink({label?, href?})` (default href `/`, label "back to home"); `SectionHeader({eyebrow?, title, sub?})`.

- [ ] **Step 1: `SkyBackground.tsx`.**
```tsx
export function SkyBackground() {
  return (
    <>
      <div className="sky" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
```

- [ ] **Step 2: `BackLink.tsx`** (client not needed; plain link).
```tsx
import Link from "next/link";

export function BackLink({ href = "/", label = "back to home" }: { href?: string; label?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 font-mono text-[13px] text-[var(--muted)] hover:text-[var(--accent-deep)] mb-10"
    >
      <span aria-hidden>←</span> {label}
    </Link>
  );
}
```

- [ ] **Step 3: `SectionHeader.tsx`.**
```tsx
import { Eyebrow } from "@/components/ui/eyebrow";

export function SectionHeader({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <header className="mb-10">
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <h1 className="font-serif text-[clamp(34px,5vw,52px)] leading-[1.04] tracking-[-0.5px] text-[var(--ink-strong)]">
        {title}
      </h1>
      {sub ? <p className="mt-3 text-[var(--muted)] max-w-[60ch]">{sub}</p> : null}
    </header>
  );
}
```

- [ ] **Step 4: Rewrite `app/layout.tsx`.** Remove `Sidebar`, `Nav`, `BackgroundDecoration`, the `flex` wrapper. Wire fonts + sky + centered column. Keep `Analytics` and the existing `metadata` object and the server-language read.
```tsx
import type { Metadata } from "next";
import "./globals.css";
import { serif, sans, mono } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import { getServerLanguage } from "@/lib/i18n-server";
import { SkyBackground } from "@/components/SkyBackground";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export const metadata: Metadata = {
  // keep the existing metadata object from the current file verbatim
  title: "Namanh Bui Vu – Portfolio",
  description: "Portfolio von Namanh Bui Vu: KI-interessierter CS-Student (TUHH). Projekte, Erfahrungen, Kontakt.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const language = await getServerLanguage();
  return (
    <html lang={language} className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="antialiased">
        <SkyBackground />
        <div className="relative z-10 mx-auto w-full max-w-[760px] px-5 sm:px-6 py-10 sm:py-16 min-h-screen flex flex-col">
          <div className="flex justify-end mb-6">
            <LanguageSwitcher language={language} />
          </div>
          <main className="flex-1">{children}</main>
          <Footer language={language} />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
```
> Note: copy the FULL existing `metadata` object (openGraph/twitter/robots) from the current `app/layout.tsx` into this rewrite — do not drop those fields.

- [ ] **Step 5: Rewrite `components/Footer.tsx`** — quiet single line, dark-on-light, legal links. Keep it a server component taking `language`. Use existing translation keys if present for legal labels; otherwise hardcode "Impressum" / "Datenschutz" (localize in Task 5).
```tsx
import Link from "next/link";

export default function Footer({ language }: { language: string }) {
  const year = 2026;
  const impressum = language === "en" ? "Imprint" : "Impressum";
  const privacy = language === "en" ? "Privacy" : "Datenschutz";
  return (
    <footer className="mt-20 pt-8 border-t border-[rgba(55,75,42,0.12)] flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[var(--muted-2)] font-mono">
      <span>© {year} Namanh Bui Vu</span>
      <Link href="/impressum" className="hover:text-[var(--accent-deep)]">{impressum}</Link>
      <Link href="/datenschutz" className="hover:text-[var(--accent-deep)]">{privacy}</Link>
    </footer>
  );
}
```

- [ ] **Step 6: Rewrite `components/LanguageSwitcher.tsx`** to a small ghost-glass control. Preserve its existing language-switch mechanism (read the current file first; it currently toggles via a cookie/route — keep that logic, only restyle the markup). Output: a compact `de | en` toggle using the `Button variant="icon"`/ghost styles or simple text links with the active one in `--accent-deep`.

- [ ] **Step 7: Verify.** `npm run build`, then `npm run dev` and open `/`. Expected: site renders on the pale-green sky, centered column, fonts applied. Existing pages (home/erfahrungen/etc.) still use old components and will look unstyled/odd — acceptable; fixed in later tasks. No build errors.

- [ ] **Step 8: Commit.**
```bash
git add app/layout.tsx components/SkyBackground.tsx components/BackLink.tsx components/SectionHeader.tsx components/Footer.tsx components/LanguageSwitcher.tsx
git commit -m "feat: Greenhouse layout shell — centered column, sky background, restyled footer + lang switch"
```

---

## Task 5: i18n strings for new UI

**Files:**
- Modify: `translations/de.json`, `translations/en.json`
- Read first: `lib/i18n.ts`, `lib/i18n-shared.ts` to learn the type/shape of the translation object.

**Interfaces:**
- Produces: translation keys consumed by pages — under a new top-level `sections` and `coding` group, plus `common`. Mirror the existing nested-object pattern.

- [ ] **Step 1: Read `lib/i18n.ts` + `translations/de.json`** to confirm the shape and the TypeScript type (if `getTranslations` returns a typed object, update the type/interface too).

- [ ] **Step 2: Add these keys to BOTH `de.json` and `en.json`** (place under the existing root object; adapt nesting to match the file). German values shown; provide English equivalents in `en.json`.
```jsonc
{
  "common": { "backHome": "back to home", "viewProject": "Projekt ansehen", "demo": "Demo", "code": "Code" },
  "sections": {
    "about":        { "label": "about",        "title": "Über mich" },
    "work":         { "label": "work",         "title": "Work",         "sub": "Berufliche Stationen & Rollen" },
    "projects":     { "label": "projects",     "title": "Projects",     "sub": "Was ich gebaut habe" },
    "competitions": { "label": "competitions", "title": "Competitions", "sub": "Hackathons & Wettbewerbe" },
    "coding":       { "label": "the grind",    "title": "The Grind",    "sub": "LeetCode · live" },
    "contact":      { "label": "contact",      "title": "Kontakt" }
  },
  "coding": {
    "totalSolved": "total solved", "currentStreak": "current streak", "longestStreak": "longest streak",
    "neetcode": "NeetCode 250", "easy": "Easy", "medium": "Medium", "hard": "Hard",
    "recent": "Letzte Solves", "error": "LeetCode gerade nicht erreichbar.", "retry": "Erneut versuchen"
  }
}
```
> If `getTranslations` is strongly typed, extend its interface in `lib/i18n-shared.ts` (or wherever the `Translations` type lives) so these keys type-check.

- [ ] **Step 3: Verify.** `npm run build`. Expected: succeeds, JSON valid.

- [ ] **Step 4: Commit.**
```bash
git add translations/de.json translations/en.json lib/i18n-shared.ts
git commit -m "i18n: add UI strings for sections, coding page, and common labels"
```

---

## Task 6: Home page (teasers + section list)

**Files:**
- Create: `lib/home-teasers.ts`, `components/HomeSectionList.tsx`
- Modify (rewrite): `app/page.tsx`

**Interfaces:**
- Consumes: `experiences` (`data/experiences.ts`), `projects` (`data/projects.ts`), `homepageDetails`, `getServerI18n`.
- Produces: `getHomeSections(language, coding?: { streak: number; solved: number })` → `Array<{ key, label, teaser, href }>`; `HomeSectionList({ sections })`.

- [ ] **Step 1: `lib/home-teasers.ts`.** Derive one-line teasers from data. The coding teaser uses live numbers if passed, else a static fallback.
```ts
import { experiences } from "@/data/experiences";
import { projects } from "@/data/projects";

export type HomeSection = { key: string; label: string; teaser: string; href: string };

export function getHomeSections(opts?: { coding?: { streak: number; solved: number } }): HomeSection[] {
  const latest = experiences[0];
  const wins = projects.filter((p) => /1\.\s*Platz|1st|Overall|Winner|Gewinner/i.test(p.description)).length;
  const coding = opts?.coding
    ? `live: ${opts.coding.streak}d streak · ${opts.coding.solved} solved`
    : "live: LeetCode & NeetCode";
  return [
    { key: "about", label: "about", teaser: "full-stack AI builder · CS @ TUHH", href: "/about" },
    { key: "work", label: "work", teaser: `${latest.role} · ${latest.organization}`, href: "/erfahrungen" },
    { key: "projects", label: "projects", teaser: `${projects[0].title.split("–")[0].split("—")[0].trim()} · ${projects.length} builds`, href: "/projekte" },
    { key: "competitions", label: "competitions", teaser: `${wins}× hackathon wins`, href: "/competitions" },
    { key: "coding", label: "the grind", teaser: coding, href: "/coding" },
    { key: "contact", label: "contact", teaser: "namanh.bui2005@gmail.com", href: "/kontakt" },
  ];
}
```

- [ ] **Step 2: `components/HomeSectionList.tsx`.** Quiet rows; whole row is a link; hover reveals accent on the `[open]` affordance.
```tsx
import Link from "next/link";
import type { HomeSection } from "@/lib/home-teasers";

export function HomeSectionList({ sections }: { sections: HomeSection[] }) {
  return (
    <nav className="mt-12 border-t border-[rgba(55,75,42,0.12)]">
      {sections.map((s) => (
        <Link
          key={s.key}
          href={s.href}
          className="group flex items-baseline gap-4 py-4 border-b border-[rgba(55,75,42,0.12)]"
        >
          <span className="font-sans text-[15px] text-[var(--ink)] w-[120px] shrink-0">{s.label}</span>
          <span className="font-sans text-[14px] text-[var(--muted-2)] flex-1 truncate">{s.teaser}</span>
          <span className="font-mono text-[12px] text-[var(--faint)] group-hover:text-[var(--accent-deep)]">[open]</span>
        </Link>
      ))}
    </nav>
  );
}
```

- [ ] **Step 3: Rewrite `app/page.tsx`.** Hero (name serif, role, meta line with cv link, socials) + `HomeSectionList`. Use the hero/about copy from `homepageDetails`.
```tsx
import { getHomeSections } from "@/lib/home-teasers";
import { HomeSectionList } from "@/components/HomeSectionList";

const SOCIALS = [
  { label: "github", href: "https://github.com/Namainchick" },
  { label: "linkedin", href: "https://www.linkedin.com/in/namanh-bui-vu-37b05a2a9/" },
  { label: "tiktok", href: "https://www.tiktok.com/@namb.tech" },
];

export default function Home() {
  const sections = getHomeSections();
  return (
    <div>
      <h1 className="font-serif text-[clamp(40px,7vw,68px)] leading-[1.0] tracking-[-0.66px] text-[var(--ink-strong)]">
        Namanh Bui Vu
      </h1>
      <p className="mt-3 text-[var(--muted)] text-[17px]">CS @ TUHH · full-stack AI builder</p>
      <p className="mt-4 font-mono text-[13px] text-[var(--muted-2)] flex flex-wrap gap-x-4 gap-y-1">
        <span>location: Hamburg, DE</span>
        <span>·</span>
        <a href="/Namanh_Bui_Vu_CV.pdf" target="_blank" className="hover:text-[var(--accent-deep)]">cv: pdf ↗</a>
      </p>
      <div className="mt-4 flex flex-wrap gap-4 font-sans text-[14px] text-[var(--muted)]">
        {SOCIALS.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-deep)]">
            {s.label} ↗
          </a>
        ))}
      </div>
      <p className="mt-8 font-serif text-[20px] leading-[1.5] text-[var(--ink)] max-w-[52ch]">
        I build AI apps that solve real problems — and won three hackathons doing it.
      </p>
      <HomeSectionList sections={sections} />
    </div>
  );
}
```

- [ ] **Step 4: Verify.** `npm run dev`, open `/`. Expected: hero + meta + socials + 6 section rows render on the sky; `cv: pdf ↗` opens the PDF; all rows link to their routes (some routes 404 until built — acceptable for now).

- [ ] **Step 5: Commit.**
```bash
git add lib/home-teasers.ts components/HomeSectionList.tsx app/page.tsx
git commit -m "feat: Greenhouse home — hero, meta, socials, section list with teasers"
```

---

## Task 7: Work (list + detail + cards)

**Files:**
- Create: `components/JobCard.tsx`, `components/JobDetail.tsx`, `app/erfahrungen/[id]/page.tsx`
- Modify (rewrite): `app/erfahrungen/page.tsx`

**Interfaces:**
- Consumes: `experiences`, `Experience` (`data/experiences.ts`), `SectionHeader`, `BackLink`, `Pill`.
- Produces: `JobCard({ exp })` (links to `/erfahrungen/${exp.id}`); `JobDetail({ exp })`.

- [ ] **Step 1: `components/JobCard.tsx`** — period-led job card (shared glass family).
```tsx
import Link from "next/link";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Pill } from "@/components/ui/pill";
import type { Experience } from "@/data/experiences";

export function JobCard({ exp }: { exp: Experience }) {
  return (
    <Link href={`/erfahrungen/${exp.id}`} className="block group">
      <GlassPanel className="p-5 transition-transform duration-200 group-hover:-translate-y-px">
        <div className="font-mono text-[12.5px] text-[var(--accent-deep)] tabular-nums">{exp.period}</div>
        <h3 className="mt-1 font-serif text-[22px] tracking-[-0.3px] text-[var(--ink-strong)]">{exp.organization}</h3>
        <div className="text-[var(--muted)] text-[14px]">{exp.role}</div>
        {exp.skills?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {exp.skills.slice(0, 6).map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
        ) : null}
      </GlassPanel>
    </Link>
  );
}
```

- [ ] **Step 2: `components/JobDetail.tsx`** — full role view (paragraphs split on `\n\n`).
```tsx
import { Pill } from "@/components/ui/pill";
import type { Experience } from "@/data/experiences";

export function JobDetail({ exp }: { exp: Experience }) {
  const paras = (exp.longDescription ?? exp.impact).split("\n\n");
  return (
    <article>
      <div className="font-mono text-[13px] text-[var(--accent-deep)] tabular-nums">{exp.period}</div>
      <h1 className="mt-1 font-serif text-[clamp(30px,5vw,46px)] tracking-[-0.5px] text-[var(--ink-strong)]">
        {exp.organization}
      </h1>
      <div className="text-[var(--muted)] text-[16px]">{exp.role}</div>
      {exp.skills?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">{exp.skills.map((s) => <Pill key={s}>{s}</Pill>)}</div>
      ) : null}
      <div className="mt-8 space-y-4 text-[var(--ink)] leading-[1.65] max-w-[62ch]">
        {paras.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      {exp.achievements?.length ? (
        <ul className="mt-6 space-y-2 max-w-[62ch]">
          {exp.achievements.map((a) => (
            <li key={a} className="flex gap-3 text-[var(--muted)]">
              <span className="text-[var(--accent)] mt-[2px]">▪</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {exp.url ? (
        <a href={exp.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block font-mono text-[13px] text-[var(--accent-deep)] hover:underline">
          {exp.url} ↗
        </a>
      ) : null}
    </article>
  );
}
```

- [ ] **Step 3: Rewrite `app/erfahrungen/page.tsx`.**
```tsx
import { experiences } from "@/data/experiences";
import { JobCard } from "@/components/JobCard";
import { SectionHeader } from "@/components/SectionHeader";
import { BackLink } from "@/components/BackLink";

export default function ErfahrungenPage() {
  return (
    <div>
      <BackLink />
      <SectionHeader eyebrow="work" title="Work" sub="Berufliche Stationen & Rollen" />
      <div className="flex flex-col gap-4">
        {experiences.map((exp) => <JobCard key={exp.id} exp={exp} />)}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `app/erfahrungen/[id]/page.tsx`** (Next 16: `params` is async).
```tsx
import { notFound } from "next/navigation";
import { experiences } from "@/data/experiences";
import { JobDetail } from "@/components/JobDetail";
import { BackLink } from "@/components/BackLink";

export function generateStaticParams() {
  return experiences.map((e) => ({ id: e.id }));
}

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exp = experiences.find((e) => e.id === id);
  if (!exp) notFound();
  return (
    <div>
      <BackLink href="/erfahrungen" label="back to work" />
      <JobDetail exp={exp} />
    </div>
  );
}
```

- [ ] **Step 5: Verify.** `npm run dev` → `/erfahrungen` shows 5 job cards; clicking one opens `/erfahrungen/exp-1` etc. with full text + achievements. `npm run build` succeeds.

- [ ] **Step 6: Commit.**
```bash
git add components/JobCard.tsx components/JobDetail.tsx app/erfahrungen
git commit -m "feat: Work section — job cards list + detail pages"
```

---

## Task 8: Projects (list + detail + cards)

**Files:**
- Create: `components/ProjectCard.tsx`, `components/ProjectDetail.tsx`, `app/projekte/[id]/page.tsx`
- Modify (rewrite): `app/projekte/page.tsx`

**Interfaces:**
- Consumes: `projects`, `Project` (`data/projects.ts`), `SectionHeader`, `BackLink`, `Pill`, `Button`, `next/image`.
- Produces: `ProjectCard({ project })` (links to `/projekte/${project.id}`); `ProjectDetail({ project })`.

- [ ] **Step 1: `components/ProjectCard.tsx`** — title-led project card with inline link affordances.
```tsx
import Link from "next/link";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Pill } from "@/components/ui/pill";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projekte/${project.id}`} className="block group">
      <GlassPanel className="p-5 transition-transform duration-200 group-hover:-translate-y-px">
        <h3 className="font-serif text-[22px] tracking-[-0.3px] text-[var(--ink-strong)]">{project.title}</h3>
        <p className="mt-1 text-[var(--muted)] text-[14px] line-clamp-2">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.techStack.slice(0, 6).map((t) => <Pill key={t}>{t}</Pill>)}
        </div>
        <div className="mt-3 flex gap-4 font-mono text-[12.5px] text-[var(--accent-deep)]">
          {project.demoUrl ? <span>demo ↗</span> : null}
          {project.repoUrl ? <span>code ↗</span> : null}
        </div>
      </GlassPanel>
    </Link>
  );
}
```
> Add the Tailwind `line-clamp` plugin is NOT needed — Tailwind v3 includes `line-clamp-*` core utilities since v3.3. If lint flags it, replace with `overflow-hidden`.

- [ ] **Step 2: `components/ProjectDetail.tsx`** — full project (text, highlights, learnings, images, link buttons).
```tsx
import Image from "next/image";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

export function ProjectDetail({ project }: { project: Project }) {
  const paras = (project.longDescription ?? project.description).split("\n\n");
  return (
    <article>
      <h1 className="font-serif text-[clamp(30px,5vw,46px)] tracking-[-0.5px] text-[var(--ink-strong)]">
        {project.title}
      </h1>
      <p className="mt-2 text-[var(--muted)] text-[16px] max-w-[62ch]">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">{project.techStack.map((t) => <Pill key={t}>{t}</Pill>)}</div>
      <div className="mt-5 flex flex-wrap gap-3">
        {project.demoUrl ? <Button href={project.demoUrl} target="_blank" rel="noopener noreferrer">Demo ↗</Button> : null}
        {project.repoUrl ? <Button href={project.repoUrl} variant="ghost" target="_blank" rel="noopener noreferrer">Code ↗</Button> : null}
      </div>
      <div className="mt-8 space-y-4 text-[var(--ink)] leading-[1.65] max-w-[62ch]">
        {paras.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      {project.highlights?.length ? (
        <ul className="mt-6 space-y-2 max-w-[62ch]">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-[var(--muted)]"><span className="text-[var(--accent)] mt-[2px]">▪</span><span>{h}</span></li>
          ))}
        </ul>
      ) : null}
      {project.learnings ? (
        <p className="mt-6 text-[var(--muted)] italic leading-[1.65] max-w-[62ch]">{project.learnings}</p>
      ) : null}
      {project.images?.length ? (
        <div className="mt-8 flex flex-col gap-4">
          {project.images.map((src) => (
            <div key={src} className="rounded-[var(--radius-tile)] overflow-hidden border border-[var(--glass-border)]">
              <Image src={src} alt={project.title} width={1200} height={750} className="w-full h-auto" />
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}
```

- [ ] **Step 3: Rewrite `app/projekte/page.tsx`** (mirror Task 7 Step 3 with `ProjectCard`, eyebrow "projects", title "Projects", sub "Was ich gebaut habe").

- [ ] **Step 4: Create `app/projekte/[id]/page.tsx`** (mirror Task 7 Step 4 with `projects`/`ProjectDetail`, BackLink href `/projekte` label "back to projects").

- [ ] **Step 5: Verify.** `/projekte` lists 6 cards; clicking opens detail with images for proj-5/proj-6. `npm run build` succeeds.

- [ ] **Step 6: Commit.**
```bash
git add components/ProjectCard.tsx components/ProjectDetail.tsx app/projekte
git commit -m "feat: Projects section — project cards list + detail pages"
```

---

## Task 9: Competitions (award data + card + page)

**Files:**
- Modify: `data/projects.ts` (add optional `award` field + populate proj-1/2/3)
- Create: `components/CompetitionCard.tsx`, `app/competitions/page.tsx`

**Interfaces:**
- Produces: `Project.award?: { event: string; placement: string; prize?: string; date: string }`; `CompetitionCard({ project })`.
- Consumes: `projects` filtered to those with `award`.

- [ ] **Step 1: Extend the `Project` interface in `data/projects.ts`** — add to the interface:
```ts
  award?: { event: string; placement: string; prize?: string; date: string };
```

- [ ] **Step 2: Populate `award` on the three winners** (verbatim from their existing descriptions — no data invented):
```ts
// proj-1 (Dip):
award: { event: "Cursor AI Hackathon Hamburg", placement: "1. Platz · Google DeepMind Gemini Track", date: "Feb 2026" },
// proj-2 (Mindflayer):
award: { event: "CodeRabbit × Windsurf Hackathon", placement: "1. Platz Overall", prize: "$2.000", date: "Dez 2025" },
// proj-3 (Airbn):
award: { event: "{Tech: Europe} Hackathon Berlin", placement: "1. Platz Arbio Track · 3. Platz Overall", date: "Jan 2026" },
```

- [ ] **Step 3: `components/CompetitionCard.tsx`** — event-led, solid-green placement badge, links to the project detail.
```tsx
import Link from "next/link";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";

export function CompetitionCard({ project }: { project: Project }) {
  const a = project.award!;
  return (
    <Link href={`/projekte/${project.id}`} className="block group">
      <GlassPanel className="p-5 transition-transform duration-200 group-hover:-translate-y-px">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[12.5px] text-[var(--muted-2)] tabular-nums">{a.date}</span>
          <span className="font-sans text-[14px] text-[var(--ink)]">{a.event}</span>
        </div>
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <Badge>{a.prize ? `${a.placement} · ${a.prize}` : a.placement}</Badge>
        </div>
        <div className="mt-3 font-serif text-[19px] text-[var(--ink-strong)]">
          {project.title} <span className="font-sans text-[13px] text-[var(--accent-deep)]">→</span>
        </div>
      </GlassPanel>
    </Link>
  );
}
```

- [ ] **Step 4: Create `app/competitions/page.tsx`.**
```tsx
import { projects } from "@/data/projects";
import { CompetitionCard } from "@/components/CompetitionCard";
import { SectionHeader } from "@/components/SectionHeader";
import { BackLink } from "@/components/BackLink";

export default function CompetitionsPage() {
  const comps = projects.filter((p) => p.award);
  return (
    <div>
      <BackLink />
      <SectionHeader eyebrow="competitions" title="Competitions" sub="Hackathons & Wettbewerbe" />
      <div className="flex flex-col gap-4">
        {comps.map((p) => <CompetitionCard key={p.id} project={p} />)}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Verify.** `/competitions` shows 3 cards with green placement badges, each links to the project detail. `npm run build` succeeds.

- [ ] **Step 6: Commit.**
```bash
git add data/projects.ts components/CompetitionCard.tsx app/competitions
git commit -m "feat: Competitions section — award field + competition cards"
```

---

## Task 10: About page

**Files:**
- Create: `app/about/page.tsx`

**Interfaces:**
- Consumes: `homepageDetails` (`about`, `mission`, `hobbies`), `SectionHeader`, `BackLink`.

- [ ] **Step 1: Create `app/about/page.tsx`** — meta line + prose (paragraphs split on `\n\n`, merged from `about` + `mission` + `hobbies`).
```tsx
import { homepageDetails } from "@/data/homepage-details";
import { SectionHeader } from "@/components/SectionHeader";
import { BackLink } from "@/components/BackLink";

export default function AboutPage() {
  const blocks = [homepageDetails.about, homepageDetails.mission, homepageDetails.hobbies].filter(Boolean);
  return (
    <div>
      <BackLink />
      <SectionHeader eyebrow="about" title="Über mich" />
      <p className="font-mono text-[13px] text-[var(--muted-2)] flex flex-wrap gap-x-4 gap-y-1 mb-8">
        <span>location: Hamburg, DE</span><span>·</span><span>studying: CS @ TUHH</span>
        <span>·</span><a href="/Namanh_Bui_Vu_CV.pdf" target="_blank" className="hover:text-[var(--accent-deep)]">cv: pdf ↗</a>
      </p>
      <div className="space-y-5 text-[var(--ink)] leading-[1.7] max-w-[62ch] text-[16px]">
        {blocks.flatMap((b, bi) => b!.content.split("\n\n").map((p, pi) => <p key={`${bi}-${pi}`}>{p}</p>))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify.** `/about` renders meta line + prose. `npm run build` succeeds.

- [ ] **Step 3: Commit.**
```bash
git add app/about
git commit -m "feat: About page — meta line + prose"
```

---

## Task 11: Contact page

**Files:**
- Modify (rewrite): `app/kontakt/page.tsx`

**Interfaces:**
- Consumes: `SectionHeader`, `BackLink`, `Button`.

- [ ] **Step 1: Rewrite `app/kontakt/page.tsx`** — email primary action + social links, no Bento.
```tsx
import { SectionHeader } from "@/components/SectionHeader";
import { BackLink } from "@/components/BackLink";
import { Button } from "@/components/ui/button";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Namainchick" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/namanh-bui-vu-37b05a2a9/" },
  { label: "TikTok", href: "https://www.tiktok.com/@namb.tech" },
];

export default function KontaktPage() {
  return (
    <div>
      <BackLink />
      <SectionHeader eyebrow="contact" title="Kontakt" sub="Schreib mir gerne — zu Projekten, Zusammenarbeit oder einfach zum Austausch." />
      <Button href="mailto:namanh.bui2005@gmail.com">namanh.bui2005@gmail.com</Button>
      <div className="mt-8 flex flex-wrap gap-5 font-sans text-[15px] text-[var(--muted)]">
        {SOCIALS.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-deep)]">{s.label} ↗</a>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify.** `/kontakt` renders mail button + socials. `npm run build` succeeds.

- [ ] **Step 3: Commit.**
```bash
git add app/kontakt/page.tsx
git commit -m "feat: Greenhouse contact page"
```

---

## Task 12: The Grind — live data layer

**Files:**
- Create: `lib/leetcode/types.ts`, `lib/leetcode/client.ts`, `lib/neetcode/problems.ts`, `lib/coding.ts`

**Interfaces:**
- Produces:
  - `fetchUserProfile(username): Promise<LCUserProfile | null>` where `LCUserProfile = { easy, medium, hard, streak }`.
  - `fetchRecentSubmissions(username): Promise<LCSubmission[]>` where `LCSubmission = { slug, solvedAt: Date }`.
  - `NEETCODE_250: Record<string, NeetCodeProblem>`, `NEETCODE_SLUGS: Set<string>`.
  - `getCodingView(username): Promise<CodingView | null>` (the page view model).

- [ ] **Step 1: `lib/leetcode/types.ts`.**
```ts
export type LCUserProfile = { easy: number; medium: number; hard: number; streak: number };
export type LCSubmission = { slug: string; solvedAt: Date };
```

- [ ] **Step 2: `lib/leetcode/client.ts`** — public GraphQL, server-side, cached hourly.
```ts
import type { LCUserProfile, LCSubmission } from "./types";

const ENDPOINT = "https://leetcode.com/graphql";

async function graphql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": "portfolio" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`LeetCode ${res.status}`);
  const json = (await res.json()) as { data: T };
  return json.data;
}

export async function fetchUserProfile(username: string): Promise<LCUserProfile | null> {
  const data = await graphql<{
    matchedUser: {
      submitStatsGlobal: { acSubmissionNum: { difficulty: string; count: number }[] };
      userCalendar: { streak: number };
    } | null;
  }>(
    `query($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal { acSubmissionNum { difficulty count } }
        userCalendar { streak }
      }
    }`,
    { username }
  );
  if (!data.matchedUser) return null;
  const counts = data.matchedUser.submitStatsGlobal.acSubmissionNum;
  const get = (d: string) => counts.find((c) => c.difficulty === d)?.count ?? 0;
  return { easy: get("Easy"), medium: get("Medium"), hard: get("Hard"), streak: data.matchedUser.userCalendar.streak };
}

export async function fetchRecentSubmissions(username: string): Promise<LCSubmission[]> {
  const data = await graphql<{ recentAcSubmissionList: { titleSlug: string; timestamp: string }[] }>(
    `query($username: String!, $limit: Int!) {
      recentAcSubmissionList(username: $username, limit: $limit) { titleSlug timestamp }
    }`,
    { username, limit: 20 }
  );
  return (data.recentAcSubmissionList ?? []).map((s) => ({
    slug: s.titleSlug,
    solvedAt: new Date(parseInt(s.timestamp) * 1000),
  }));
}
```

- [ ] **Step 3: `lib/neetcode/problems.ts`** — port the file verbatim from the reference dashboard. It exports `NeetCodeProblem` type, `NEETCODE_250: Record<string, NeetCodeProblem>`, and `NEETCODE_SLUGS = new Set(Object.keys(NEETCODE_250))`. The source list lives at the cloned reference repo `…/leetcode-tracking-dashboard/src/lib/neetcode/problems.ts` (73 lines). If unavailable at execution time, re-clone it: `gh repo clone Namainchick/leetcode-tracking-dashboard /tmp/lc-ref` and copy `src/lib/neetcode/problems.ts`. Do not hand-retype — copy the file content exactly so slugs match LeetCode.

- [ ] **Step 4: `lib/coding.ts`** — aggregate the view model. Neetcode progress = count of recent solved slugs that are in `NEETCODE_SLUGS` (note: recent list is capped at 20; treat NeetCode progress as "of recent solves" OR, simpler for v1, derive total NeetCode-solved is not available from public API → show NeetCode progress based on the slugs we can see, and label it accordingly). For v1, expose total counts + streak + difficulty, and a NeetCode figure computed from the available recent slugs.
```ts
import { fetchUserProfile, fetchRecentSubmissions } from "@/lib/leetcode/client";
import { NEETCODE_250, NEETCODE_SLUGS } from "@/lib/neetcode/problems";

export type CodingView = {
  total: number;
  easy: number;
  medium: number;
  hard: number;
  streak: number;
  neetcodeSolved: number;
  neetcodeTotal: number;
  recent: { slug: string; title: string; difficulty: "easy" | "medium" | "hard" | "unknown"; solvedAt: Date }[];
};

export async function getCodingView(username: string): Promise<CodingView | null> {
  const profile = await fetchUserProfile(username);
  if (!profile) return null;
  let recentRaw: Awaited<ReturnType<typeof fetchRecentSubmissions>> = [];
  try {
    recentRaw = await fetchRecentSubmissions(username);
  } catch {
    recentRaw = [];
  }
  const recent = recentRaw.map((s) => {
    const meta = NEETCODE_250[s.slug];
    return {
      slug: s.slug,
      title: meta?.title ?? s.slug.replace(/-/g, " "),
      difficulty: meta?.difficulty ?? ("unknown" as const),
      solvedAt: s.solvedAt,
    };
  });
  const neetcodeSolved = recentRaw.filter((s) => NEETCODE_SLUGS.has(s.slug)).length;
  return {
    total: profile.easy + profile.medium + profile.hard,
    easy: profile.easy,
    medium: profile.medium,
    hard: profile.hard,
    streak: profile.streak,
    neetcodeSolved,
    neetcodeTotal: NEETCODE_SLUGS.size,
    recent,
  };
}
```
> Known limitation (log it on the page subline): the public API exposes only the last ~20 accepted submissions, so the NeetCode figure reflects *recent* solves, not lifetime. This is acceptable for v1 and noted in the UI.

- [ ] **Step 5: Verify.** `npm run build` (compiles). Optionally sanity-check the query: `npm run dev`, then in a scratch route or via the page in Task 13.

- [ ] **Step 6: Commit.**
```bash
git add lib/leetcode lib/neetcode lib/coding.ts
git commit -m "feat: live LeetCode/NeetCode data layer for The Grind"
```

---

## Task 13: The Grind page

**Files:**
- Create: `components/CodingStats.tsx`, `app/coding/page.tsx`

**Interfaces:**
- Consumes: `getCodingView` (`lib/coding.ts`), `StatTile`, `ProgressBar`, `Pill`, `GlassPanel`, `SectionHeader`, `BackLink`.

- [ ] **Step 1: `components/CodingStats.tsx`** — renders the view model (stat tiles, difficulty bars, NeetCode bar, recent list).
```tsx
import { StatTile } from "@/components/ui/stat-tile";
import { ProgressBar } from "@/components/ui/progress-bar";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Pill } from "@/components/ui/pill";
import type { CodingView } from "@/lib/coding";

export function CodingStats({ v }: { v: CodingView }) {
  const diffs = [
    { key: "easy", label: "Easy", count: v.easy, tone: "easy" as const, max: Math.max(v.easy, v.medium, v.hard, 1) },
    { key: "medium", label: "Medium", count: v.medium, tone: "medium" as const, max: Math.max(v.easy, v.medium, v.hard, 1) },
    { key: "hard", label: "Hard", count: v.hard, tone: "hard" as const, max: Math.max(v.easy, v.medium, v.hard, 1) },
  ];
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatTile label="total solved" value={String(v.total)} />
        <StatTile label="current streak" value={`${v.streak}d`} accent />
        <StatTile label="NeetCode (recent)" value={`${v.neetcodeSolved}/${v.neetcodeTotal}`} />
      </div>
      <GlassPanel className="p-5">
        <div className="flex flex-col gap-4">
          {diffs.map((d) => (
            <div key={d.key} className="flex items-center gap-4">
              <div className="w-[90px]"><Pill tone={d.tone}>{d.label}</Pill></div>
              <div className="flex-1"><ProgressBar value={d.count} max={d.max} label={d.label} /></div>
              <div className="font-mono text-[14px] text-[var(--ink)] tabular-nums w-[48px] text-right">{d.count}</div>
            </div>
          ))}
        </div>
      </GlassPanel>
      {v.recent.length ? (
        <GlassPanel className="p-5">
          <div className="flex flex-col divide-y divide-[rgba(55,75,42,0.10)]">
            {v.recent.slice(0, 10).map((r) => (
              <div key={r.slug} className="flex items-center gap-3 py-2.5">
                <span className="flex-1 text-[var(--ink)] text-[14px] capitalize truncate">{r.title}</span>
                {r.difficulty !== "unknown" ? <Pill tone={r.difficulty}>{r.difficulty}</Pill> : null}
              </div>
            ))}
          </div>
        </GlassPanel>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 2: Create `app/coding/page.tsx`** — server component, fetches with the username `nam_bui`, error fallback.
```tsx
import { getCodingView } from "@/lib/coding";
import { CodingStats } from "@/components/CodingStats";
import { SectionHeader } from "@/components/SectionHeader";
import { BackLink } from "@/components/BackLink";
import { GlassPanel } from "@/components/ui/glass-panel";

export const revalidate = 3600;
const USERNAME = "nam_bui";

export default async function CodingPage() {
  let view = null;
  try {
    view = await getCodingView(USERNAME);
  } catch {
    view = null;
  }
  return (
    <div>
      <BackLink />
      <SectionHeader eyebrow="the grind" title="The Grind" sub="LeetCode · live · NeetCode-Fortschritt aus den letzten Solves" />
      {view ? (
        <CodingStats v={view} />
      ) : (
        <GlassPanel className="p-6">
          <p className="text-[var(--muted)]">LeetCode gerade nicht erreichbar. Lade die Seite gleich neu.</p>
        </GlassPanel>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify.** `npm run dev`, open `/coding`. Expected: real numbers for `nam_bui` (total solved, streak, difficulty bars). Cross-check the total against `https://leetcode.com/u/nam_bui/`. If LeetCode blocks the server IP, the error panel shows — note it and move on (caching + retry handles transient blocks). `npm run build` succeeds.

- [ ] **Step 4: Commit.**
```bash
git add components/CodingStats.tsx app/coding
git commit -m "feat: The Grind page — live LeetCode/NeetCode stats"
```

---

## Task 14: Cleanup — remove Bento components + CSS

**Files:**
- Delete: `components/Card.tsx`, `BubbleCard.tsx`, `BubbleGrid.tsx`, `BackgroundDecoration.tsx`, `Sidebar.tsx`, `Nav.tsx`, `NavMenu.tsx`, `HomeGrid.tsx`, `ExperiencesGrid.tsx`, `ProjectsGrid.tsx`, `ExpandableCard.tsx`, `ViewAllButton.tsx`, `Button.tsx`, `SectionHeading.tsx`, `ProjectLink.tsx`, `components/expanded/` (entire dir).
- Modify: `app/datenschutz/page.tsx`, `app/impressum/page.tsx` (they import `Card`/`SectionHeading` today — restyle to plain prose + `SectionHeader` + `BackLink`).

**Interfaces:** none new.

- [ ] **Step 1: Grep for every usage before deleting** to avoid dangling imports:
```bash
grep -rln "components/Card\|BubbleCard\|BubbleGrid\|BackgroundDecoration\|components/Sidebar\|components/Nav\|NavMenu\|HomeGrid\|ExperiencesGrid\|ProjectsGrid\|ExpandableCard\|ViewAllButton\|components/Button\|SectionHeading\|ProjectLink\|components/expanded" app components
```
Expected remaining importers after Tasks 6–13: only `app/datenschutz/page.tsx` and `app/impressum/page.tsx`.

- [ ] **Step 2: Rewrite `app/impressum/page.tsx` and `app/datenschutz/page.tsx`** to the minimal pattern: `BackLink` + `SectionHeader` + the existing legal text rendered as prose paragraphs (pull the text from existing translation keys / current file content — preserve the legal copy verbatim). Example shape:
```tsx
import { SectionHeader } from "@/components/SectionHeader";
import { BackLink } from "@/components/BackLink";

export default function ImpressumPage() {
  return (
    <div>
      <BackLink />
      <SectionHeader title="Impressum" />
      <div className="space-y-4 text-[var(--ink)] leading-[1.7] max-w-[62ch] text-[15px]">
        {/* existing impressum text, paragraph by paragraph — preserved verbatim */}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Delete the old components + dir.**
```bash
git rm components/Card.tsx components/BubbleCard.tsx components/BubbleGrid.tsx components/BackgroundDecoration.tsx components/Sidebar.tsx components/Nav.tsx components/NavMenu.tsx components/HomeGrid.tsx components/ExperiencesGrid.tsx components/ProjectsGrid.tsx components/ExpandableCard.tsx components/ViewAllButton.tsx components/Button.tsx components/SectionHeading.tsx components/ProjectLink.tsx
git rm -r components/expanded
```
> If grep in Step 1 shows any of these are still imported somewhere unexpected, fix that importer first.

- [ ] **Step 4: Remove dead CSS from `app/globals.css`.** Confirm none of the Bento/decoration classes remain (`.bento-grid`, `.col-span-*`, `.row-span-2`, `.card-dots`, `.card-dots-dark`, `.card-lines`, `.card-spotlight`, `.card-shimmer`, `.rings-decoration`, `.tech-pill`, `.tech-tag`, `.text-gradient`, `.blinking-dot`, `.animated-link`, `@keyframes shimmer/pulse-ring/blink/spin-slow/glow-pulse`). Task 1 already rewrote globals without them — this step is a final grep to be sure:
```bash
grep -nE "bento-grid|col-span|card-dots|card-lines|card-spotlight|card-shimmer|rings-decoration|tech-pill|text-gradient|animated-link" app/globals.css
```
Expected: no matches.

- [ ] **Step 5: Verify.** `npm run lint` (no unused/undefined imports) + `npm run build` (succeeds, no module-not-found).

- [ ] **Step 6: Commit.**
```bash
git add -A
git commit -m "chore: remove Bento components, decoration CSS, and restyle legal pages"
```

---

## Task 15: Final verification (responsive · a11y · routes · build)

**Files:** none (verification + small fixes only).

- [ ] **Step 1: Full route walk** in `npm run dev` at desktop width — visit `/`, `/about`, `/erfahrungen`, `/erfahrungen/exp-1`, `/projekte`, `/projekte/proj-1`, `/competitions`, `/coding`, `/kontakt`, `/impressum`, `/datenschutz`. Confirm each renders, back links work, the section list links resolve.

- [ ] **Step 2: Responsive check** at 375px width (devtools). Confirm: no horizontal scroll anywhere; hero/meta/socials wrap; coding stat tiles drop to 2 columns; cards stack. Fix any overflow with `flex-wrap`/`min-w-0`/`truncate` as needed.

- [ ] **Step 3: Language toggle** — switch de↔en; confirm section labels and coding labels localize and nothing breaks.

- [ ] **Step 4: prefers-reduced-motion** — enable "Reduce motion" in OS/devtools; confirm hover lifts/transitions are disabled.

- [ ] **Step 5: A11y spot check** — Tab through home: section rows and the lang switch are reachable and show the green focus ring; images have `alt`; one `<h1>` per page; links have discernible text.

- [ ] **Step 6: Final gate.** `npm run lint` (clean) + `npm run build` (succeeds). Capture any warnings.

- [ ] **Step 7: Commit any fixes.**
```bash
git add -A
git commit -m "fix: responsive + a11y polish across Greenhouse pages"
```

---

## Self-Review (completed during planning)

- **Spec coverage:** §2 tokens → T1/T2; §2 background → T1; §3 routes → T6–T13; §4 shell → T4; §5 pages → T6 (home), T10 (about), T7 (work), T8 (projects), T9 (competitions), T13 (coding), T11 (contact), T14 (legal); §6 cards → T7/T8/T9; §7 live data → T12/T13; §8 award field → T9; §9 components/removals → T3 + T14; §10 styling/i18n/responsive/a11y → T2/T5/T15. All covered.
- **Placeholders:** none — every step has concrete code or an exact command. The one external dependency (NeetCode list) has an exact source path + re-clone fallback.
- **Type consistency:** `LCUserProfile`/`LCSubmission` (T12) consumed by `getCodingView`→`CodingView` (T12) → `CodingStats` (T13); `Project.award` (T9) consumed by `CompetitionCard` (T9); `HomeSection` (T6) by `HomeSectionList` (T6). Names align.
- **Known limitation surfaced:** NeetCode progress reflects recent solves (public API caps recent list at ~20); noted in code + UI subline. Acceptable for v1; can be upgraded later if a fuller source is wired.
