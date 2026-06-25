# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev`
- **Build:** `npm run build`
- **Start production:** `npm start`
- **Lint:** `npm run lint`

There are no tests configured in this project.

## Architecture

This is a **Next.js 16 App Router** portfolio site (TypeScript, Tailwind CSS v3, React 19) with bilingual support (German/English). Deployed on Vercel.

### Routing

Routes use German path names. All pages are in `app/`:

| Route | Purpose |
|-------|---------|
| `/` | Home — hero + section list with teasers (`HomeSectionList`) |
| `/about` | About me — bio blocks from `data/homepage-details.ts` |
| `/erfahrungen` | Experiences list |
| `/erfahrungen/[id]` | Experience detail |
| `/projekte` | Projects grid |
| `/projekte/[id]` | Project detail |
| `/competitions` | Hackathon/competition entries (projects with `award` field) |
| `/coding` | Live LeetCode stats + NeetCode progress |
| `/kontakt` | Contact page |
| `/impressum` | Legal imprint |
| `/datenschutz` | Privacy policy |

### i18n System

Internationalization is **server-side** — no client React Context:

- `lib/i18n-server.ts` — `getServerI18n()` reads the language cookie and returns `{ language, t }`
- `lib/i18n.ts` — `getTranslations(language)` returns the typed translation object
- `lib/i18n-shared.ts` — shared cookie name + `normalizeLanguage()` utility
- `translations/de.json` and `translations/en.json` — all UI strings

Section-page **content** (experiences, projects) is served from `data/*.ts` (German base). EN overlay for that content is a pending decision; `getTranslatedProjects` / `getTranslatedExperiences` helpers in `lib/i18n.ts` exist but are not yet wired into page routes.

When adding UI strings: add keys to both `translations/de.json` and `translations/en.json`, then use `const { t } = await getServerI18n()` in the server component.

### Styling

- **Greenhouse** glass theme: pale-green sky (`.sky` + `.grain` texture in `app/globals.css`), frosted-white glass panels, single green accent via CSS variables (`--accent`, `--accent-deep`, `--muted`, `--ink`, etc.)
- CSS variables defined in `app/globals.css` `:root`
- Fonts: Newsreader (serif), Hanken Grotesk (sans), IBM Plex Mono (mono) — loaded via `lib/fonts.ts` using `next/font/google`
- Minimal single-column layout — no sidebar, no bento grid
- Home page: hero section + `HomeSectionList` (from `components/HomeSectionList.tsx`); teaser data from `lib/home-teasers.ts`

### Component Structure

**UI primitives** (`components/ui/`): `glass-panel`, `pill`, `button`, `badge`, `progress-bar`, `stat-tile`, `eyebrow`

**Section components** (`components/`): `JobCard`, `JobDetail`, `ProjectCard`, `ProjectDetail`, `CompetitionCard`, `CodingStats`, `SectionHeader`, `BackLink`, `SkyBackground`, `HomeSectionList`, `LanguageSwitcher`, `Footer`

### /coding Route

- Live public LeetCode GraphQL via `lib/leetcode/`
- NeetCode problem list in `lib/neetcode/problems.ts` (~50 problems)
- Aggregated in `lib/coding.ts`, fetched server-side with `revalidate = 3600` (hourly cache)
- Username: `nam_bui`

### Key Patterns

- All pages are **server components** (async); `"use client"` only where interactivity requires it
- React Compiler is enabled in `next.config.ts`
- Path alias: `@/*` maps to project root
- Prettier: 2 spaces, semicolons, double quotes, 100-char line width
