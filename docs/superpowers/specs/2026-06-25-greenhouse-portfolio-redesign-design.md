# Design: Greenhouse Portfolio Redesign

**Date:** 2026-06-25
**Scope:** Complete visual + structural makeover of the personal portfolio (`personalWebPage`). Replace the "Warm Bento" theme entirely with a light, glassy **"Greenhouse"** design language, and restructure the site into a minimal, single-column, real-routes layout in the spirit of `elia.vc`. **Only the existing data is preserved** — copy/content is refined later by the owner.
**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v3 (kept) · server-side i18n (de/en) · Vercel.

---

## 1. Goal & Principles

Turn the playful, light, multi-coloured Bento portfolio into a calm, premium, **light-glass** single-column site:

- **One accent (green), used sparingly and solid.** No multi-colour cards, no decorative patterns.
- **Typography does the work:** serif for display + numerals, grotesk for body, mono for data (dates, counts).
- **Material, not decoration:** frosted white glass panels floating over a soft pale-green "garden" sky. Depth from translucency + soft shadow, never from glows or patterns.
- **Full but quiet:** the home page feels populated through real one-line teasers, not through visual noise.
- **Minimal IA, real URLs:** `elia.vc`-style section list on the home page; each section is a real route; each list item has its own shareable detail page.

This redesign is explicitly **structure + design first**. Content (prose, images, more entries) is filled in afterwards by the owner. Every page must therefore look complete and correct with the *current* data.

---

## 2. Design System — "Greenhouse, light glass"

Tokens extracted from the approved reference (`D _ Greenhouse _ light glass.html`). Codified as CSS variables on `:root` in `app/globals.css`.

### Color tokens
| Token | Value | Use |
|---|---|---|
| `--bg` | `#EDF1E7` | pale green-cream page base |
| `--ink` | `#2B3328` | primary text / serif headlines |
| `--ink-strong` | `#26301F` | strongest headline tier |
| `--muted` | `#6F7B68` | secondary / body text |
| `--muted-2` | `#8A9381` | tertiary text / small labels |
| `--faint` | `#AAB39F` | faintest labels / borders (not for small functional text) |
| `--bright` | `#F3F7EE` | near-white text (on green surfaces) |
| `--accent` | `#5D8A57` | solid accent — primary button, "active", badges |
| `--accent-bright` | `#6AA564` | brighter green — links, accent numerals |
| `--accent-deep` | `#4F7A4D` | deep green — accent text (rank, counts) |
| `--accent-tint` | `rgba(122,165,110,0.18)` | green-tinted highlight surface |
| `--glass-grad` | `linear-gradient(135deg, rgba(255,255,255,0.44), rgba(255,255,255,0.12))` | raised glass fill |
| `--glass-grad-soft` | `linear-gradient(135deg, rgba(255,255,255,0.36), rgba(255,255,255,0) 62%)` | subtle glass sheen |
| `--glass-border` | `rgba(255,255,255,0.55)` | glass edge (light) |
| `--glass-inset` | `rgba(255,255,255,0.85) 0 1px 0 0 inset` | top highlight |
| `--glass-drop` | `rgba(55,75,42,0.4) 0 16px 32px -24px` | soft green-tinted drop shadow |
| `--glass-drop-heavy` | `rgba(55,75,42,0.5) 0 34px 72px -34px` | heavy panel shadow |

### Background — "garden sky" (light)
Two fixed layers behind all content (replacing `BackgroundDecoration`):
- **`.sky`** — base `var(--bg)` + four soft corner radial fields:
  - green TL `radial-gradient(42% 40% at 12% 6%, rgba(142,192,128,0.72), transparent 70%)`
  - teal TR `radial-gradient(44% 42% at 93% 2%, rgba(108,182,174,0.58), transparent 70%)`
  - honey BR (warm, ~`rgba(226,170,102,0.30)`) + a faint cool BL field.
- **`.grain`** — the same inline-SVG fractal-noise data-URI used in the dark variant, opacity ≈ `0.02`. No animation; `prefers-reduced-motion` halts everything.

### Typography (via `next/font`, self-hosted)
- **Serif (display + numerals):** Newsreader — wordmark, hero, section titles, big stat numerals. Tight tracking on large sizes (`-0.4…-0.66px`).
- **Sans (body + labels):** Hanken Grotesk.
- **Mono (data):** IBM Plex Mono with `tabular-nums` — dates, periods, ranks, counts, list indices.
- **Eyebrow:** uppercase, `letter-spacing: 2.3px`, ~11.5px, `--muted`.

### Material & motion
- Radii: panel `20`, tile `16`, control `12`, pill `999`.
- Hover: subtle lift `translateY(-1px)`, ~190ms; no scale/bounce, no shimmer.
- Accent green appears solid in **1–2 spots per view** max. **No glows, no gradients-as-decoration, no patterned overlays.**
- `prefers-reduced-motion: reduce` disables all transitions/animations.

---

## 3. Information Architecture & Routes

Single-column, centered (~760px max content width). No sidebar. Home is a minimal hub; every section is a real route; list items have detail pages.

| Route | Page | Source |
|---|---|---|
| `/` | Home — hero + meta + socials + section list with inline teasers | `homepage-details`, derived |
| `/about` | About — meta line + first-person prose | `homepage-details` (`about`/`hero`/`hobbies`/`mission`) |
| `/erfahrungen` | Work — reverse-chron list of job cards | `data/experiences.ts` |
| `/erfahrungen/[id]` | Work detail — full role | `data/experiences.ts` |
| `/projekte` | Projects — list of project cards | `data/projects.ts` |
| `/projekte/[id]` | Project detail — full project (text, highlights, learnings, images, links) | `data/projects.ts` |
| `/competitions` | Competitions/Hackathons — list of award entries | `data/projects.ts` (entries with `award`) |
| `/coding` | The Grind — **live** LeetCode + Neetcode stats | live (LeetCode `nam_bui`) |
| `/kontakt` | Contact — email + socials | existing data |
| `/impressum`, `/datenschutz` | Legal | existing |

German route names are kept (`/erfahrungen`, `/projekte`, `/kontakt`). New routes: `/about`, `/competitions`, `/coding`, and the `[id]` detail routes.

---

## 4. Layout Shell

`app/layout.tsx` is rewritten:
- Remove the `flex` + `Sidebar` + `BackgroundDecoration` wrapper.
- Render fixed `.sky` and `.grain` layers (z-index behind content).
- A single centered column container (`max-width ~760px`, generous horizontal padding, vertical rhythm).
- A minimal top area: on the home page, the hero *is* the header; on inner pages, a slim **"← back to home"** link (mono/sans, muted) sits at the top of the column.
- `Footer` becomes a quiet single line: legal links + a small wordmark; dark-on-light, no teal block.
- `LanguageSwitcher` stays (de/en) but restyled as a small ghost-glass control in a corner of the column.
- `Nav`/`NavMenu`/`Sidebar` as they exist today are removed; navigation lives in the home section list + the per-page back link.

---

## 5. Page Compositions

### `/` — Home
```
Namanh Bui Vu                         ← serif, large
CS @ TUHH · AI builder                ← role/subtitle (sans, muted)
location: Hamburg · cv: pdf           ← meta line (mono)  [age ticker optional]
github↗  linkedin↗  tiktok↗           ← social links (ghost)

[one short serif intro line]

about         full-stack AI builder, CS @ TUHH      [open]
work          Werkstudent KI · Position One · now   [open]
projects      Dip · Mindflayer · 6 builds           [open]
competitions  3× hackathon wins · HH / Berlin       [open]
the grind     live: <streak>d · <solved> solved     [open]
contact       namanh.bui2005@gmail.com              [open]
```
Section list = uniform quiet rows: label (sans), one-line teaser (muted, derived from data), `[open]` affordance (mono, accent on hover). Whole row links to the route. Teasers are computed from current data (latest experience, top projects, win count, live coding numbers, contact email).

### `/about`
Meta line (`location: Hamburg, DE · studying: CS @ TUHH · cv: pdf`) + the first-person prose from `homepage-details` (`about` merged with `hero`/`mission`/`hobbies` as paragraphs). Pure type, generous measure (~65ch), no cards.

### `/erfahrungen` — Work (list)
Reverse-chron list of **job cards** (see §6). Section header: serif title "Work" + muted subline. 5 entries from `experiences`.

### `/erfahrungen/[id]` — Work detail
Back link → focused view: role (serif) · organization · period (mono) · skill pills · `longDescription` prose · `achievements` as a quiet bulleted list · optional `url`.

### `/projekte` — Projects (list)
List of **project cards** (see §6). 6 entries from `projects`.

### `/projekte/[id]` — Project detail
Back link → title (serif) · short description · tech pills · `longDescription` · `highlights` list · `learnings` block · `images` (if any, in light glass frames) · demo/repo links (ghost-glass buttons).

### `/competitions` — Competitions/Hackathons
List of **competition cards** (see §6) built from `projects` entries that carry an `award` field. Each links to the related project detail. Reverse-chron by award date.

### `/coding` — The Grind
Live stats, presented with Greenhouse stat tiles + panels (see §7):
- Stat tiles: total solved · current streak · longest streak · Neetcode progress (e.g. `X/150`).
- Difficulty breakdown: Easy / Medium / Hard counts each with a recessed ProgressBar.
- **Neetcode-150 / 250 progress** bar(s): `X / 150`.
- Optional: recent solved problems list (slug · difficulty pill · date) on a solid-ish light panel.
- Empty/error states per §9.

### `/kontakt` — Contact
Email (`namanh.bui2005@gmail.com`) as primary ghost-glass action + social links (GitHub `Namainchick`, LinkedIn, TikTok `@namb.tech`). No Bento grid.

---

## 6. Card System — one glass family, type-tailored

All cards share the **same material** (frosted glass fill, border, inset highlight, soft drop shadow, radius `tile`, hover lift) and the **same typographic system**, so the page reads as one family. Each **type has its own field layout and a subtle, content-appropriate accent** — a job reads like a job, a project like a project, a competition like a competition — without resorting to different colours/shapes per type.

**Job card** (Work):
```
Okt 2025 – now                         ← period, mono, accent-deep
Position One GmbH                       ← organization, serif
Werkstudent · KI Automation             ← role
React · Python · PostgreSQL · …         ← skill pills (muted glass)
→ whole card links to /erfahrungen/[id]
```
Distinguishing touch: period-led (mono date at top), timeline feel.

**Project card** (Projects):
```
Dip — Give LLMs Eyes                    ← title, serif
1. Platz · Gemini Track · Cursor HH     ← one-line descriptor (muted)
Python · Gemini API · Screen Capture    ← tech pills
demo↗   repo↗                           ← inline link affordances
→ whole card links to /projekte/[id]
```
Distinguishing touch: title-led, link affordances visible on the card.

**Competition card** (Competitions):
```
Feb 2026   Cursor AI Hackathon Hamburg  ← date (mono) · event
[ 1st ] Google DeepMind Gemini Track    ← placement badge (solid green) · track
Dip — Give LLMs Eyes            → project
```
Distinguishing touch: solid-green placement badge (the one sanctioned accent), event-led.

Pills, badges, and links are shared primitives reused across all three.

---

## 7. "The Grind" — Live Data Architecture

No Supabase, no auth, no cron. Read-only, server-side, cached.

- **LeetCode public GraphQL** (`https://leetcode.com/graphql`) for username `nam_bui`:
  - `matchedUser.submitStatsGlobal` → solved counts by difficulty (Easy/Medium/Hard + total).
  - `matchedUser.userCalendar` → streak / submission calendar.
  - recent accepted submissions (slug + timestamp) for the optional recent list and for Neetcode matching.
- **Neetcode-150/250 progress:** port the problem list from the LeetCode-tracker dashboard (`src/lib/neetcode/problems.ts`) into `lib/neetcode/problems.ts` here. Match the user's solved slugs against the list → `solvedCount / listSize`.
- **Fetching:** done in the `/coding` Server Component via `fetch` with Next caching (`next: { revalidate: 3600 }` ≈ hourly). A thin `lib/leetcode/client.ts` wraps the GraphQL calls and types.
- **Resilience:** if LeetCode is unreachable, render the page skeleton with an inline "couldn't reach LeetCode" notice + Retry; never crash the route.

---

## 8. Data Model Changes

Data is preserved. One additive, optional field:

- `Project.award?: { event: string; placement: string; prize?: string; date: string }` in `data/projects.ts`. Entries that were competitions (Dip, Mindflayer, Airbn) get this populated from their existing `highlights`/`description` (no information lost). `/competitions` lists projects where `award` is defined; the home "competitions" teaser counts them.

No other data shape changes. `experiences.ts`, `homepage-details.ts`, `translations/*.json` keep their structure; copy is refined later.

---

## 9. Component Inventory

**New (Greenhouse) primitives** in `components/ui/`:
- `GlassPanel`, `StatTile`, `Pill` (glass / easy / medium / hard / placement), `Eyebrow`, `Button` (primary green / ghost-glass / icon), `ProgressBar`, `Badge` (placement).

**New portfolio components** in `components/`:
- `SkyBackground` (sky + grain layers), `HomeSectionList` + `SectionLink` (teaser rows), `BackLink` ("← back to home"), `SectionHeader`, `JobCard`, `ProjectCard`, `CompetitionCard`, `JobDetail`, `ProjectDetail`, `CodingStats` (+ children), restyled `Footer`, `LanguageSwitcher`.

**Removed:** `Card` (6 variants), `BubbleCard`, `BubbleGrid`, `BackgroundDecoration`, `Sidebar`, `Nav`, `NavMenu`, `HomeGrid`, `ExperiencesGrid`, `ProjectsGrid`, `ExpandableCard`, `ViewAllButton`, `components/expanded/*`, and the Bento/decoration CSS in `globals.css` (`.bento-grid`, `.col-span-*`, `.card-dots*`, `.card-lines`, `.card-spotlight`, `.card-shimmer`, `.rings-decoration`, `.tech-pill`, `.text-gradient`, etc.).

---

## 10. Styling, i18n, Responsive, A11y

- **Tailwind v3 kept.** Greenhouse components style via CSS variables + arbitrary-value utilities (e.g. `[background:var(--glass-grad)]`), which work in v3 — no v4 migration. Update `tailwind.config.ts` colors/fonts to the Greenhouse palette + the three font families.
- **Fonts:** add `lib/fonts.ts` with Newsreader / Hanken Grotesk / IBM Plex Mono via `next/font/google`; wire the CSS variables on `<html>`.
- **i18n:** keep server-side i18n (`lib/i18n*`, `translations/de.json`+`en.json`). New UI strings (section labels, "back to home", "The Grind", coding labels, competition labels) added to both locales. Existing data copy preserved.
- **Responsive:** single column fluidly narrows; meta line + socials wrap; stat tiles go 4→2 columns on mobile; no horizontal scroll at any width.
- **Accessibility:** WCAG AA contrast on glass (text tiers chosen so `--faint` is never small functional text); visible `:focus-visible` (green outline, no glow); full keyboard nav; semantic landmarks; section rows and cards are proper links; `prefers-reduced-motion` respected.

---

## 11. Out of Scope (now) / Later

- **Content filling** — refining prose, adding more experiences/projects/competitions, real images, an actual CV PDF, the age ticker. Structure must look complete with current data.
- Blog, Open Source, Research sections (explicitly excluded).
- Any backend, auth, database, or write features.
- Tailwind v4 / shadcn migration.

---

## 12. Open Inputs & Assumptions

- LeetCode username: **`nam_bui`** (confirmed). Neetcode progress derives from LeetCode solves + the ported Neetcode list.
- Contact email **`namanh.bui2005@gmail.com`**; socials: GitHub `Namainchick`, LinkedIn (existing URL), TikTok `@namb.tech`.
- `cv: pdf` link target and age ticker are **placeholders** until content is provided.
- "Competitions" entries are the three hackathon winners present in `projects`; more can be added later via the `award` field.
- Light theme only (no dark mode) in this iteration.
