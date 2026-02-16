# Bold Bento Redesign — "Warm Bento"

Date: 2026-02-16

## Goal

Complete visual rebuild of the portfolio using a Bento-Grid layout with Teal + Coral on a warm beige background. Every page becomes a Bento-Grid. Cards get farbige backgrounds. Maximum visual density and personality.

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#F5F0EB` | Page background (warm beige) |
| `--text` | `#1A1A1A` | Primary text |
| `--text-muted` | `#6B7280` | Secondary text |
| `--teal` | `#0D9488` (teal-600) | Primary accent |
| `--teal-light` | `#CCFBF1` (teal-100) | Light teal card bg |
| `--teal-dark` | `#0F766E` (teal-700) | Teal hover/text |
| `--coral` | `#F97316` (orange-500) | Secondary accent |
| `--coral-light` | `#FFF7ED` (orange-50) | Light coral card bg |
| `--coral-dark` | `#EA580C` (orange-600) | Coral hover |
| `--card-white` | `#FFFFFF` | Neutral cards |
| `--border` | `#E5E7EB` | Subtle borders on white cards only |

## Bento Grid System

CSS Grid: 4 columns desktop, 2 tablet, 1 mobile. Gap: 16px.

Card variants:
- **Teal:** `bg-teal-500 text-white rounded-2xl p-6` — hackathon badges, CTAs
- **Coral:** `bg-orange-500 text-white rounded-2xl p-6` — stats, highlights
- **Light-Teal:** `bg-teal-50 rounded-2xl p-6` — tech stack, details
- **Light-Coral:** `bg-orange-50 rounded-2xl p-6` — experience details
- **White:** `bg-white rounded-2xl p-6 border border-gray-200 shadow-sm` — descriptions
- **Gradient:** `bg-gradient-to-br from-teal-500 to-orange-500 text-white rounded-2xl p-6` — hero name

Cards span 1-4 columns and 1-2 rows via utility classes.

## Homepage Bento Layout

One single grid, no separate sections:

Row 1-2:
- Hero name card (gradient, span-2, row-span-2): "Hi, ich bin Namanh." text-5xl md:text-7xl font-black
- About text card (white, span-1): Short intro paragraph
- Hackathon badge card (coral, span-1): "3× 1st Place" with event names

Row 3:
- Tech stack card (light-teal, span-2): Colorful pill tags bg-teal-500 text-white rounded-full
- Location card (white, span-1): "📍 TUHH, Hamburg"
- TikTok stats card (coral, span-1): "50k+ Followers · 20M+ Views"

Row 4:
- Project 1 card (white, span-1): Dip
- Project 2 card (white, span-3): Mindflayer (wider = more prominent)

Row 5:
- Experience 1 card (white, span-2): Working Student
- Experience 2 card (white, span-2): CTO / Co-Founder

Row 6:
- CTA row (span-4): "Alle Projekte" + "Alle Erfahrungen" buttons side by side

## Projekte Page

Bento grid with hackathon winners getting colored backgrounds:
- Dip: teal bg, span-1
- Mindflayer: white, span-1
- Airbn: coral bg, span-2
- Hundewelt: white, span-2
- Video Journal: white, span-1
- Song Splitter: white, span-1

Each card: title, 2-line description, tech pill tags, demo/repo links.

## Erfahrungen Page

Bento grid:
- Working Student: span-2, white, teal left border
- CTO: span-2, teal bg, white text
- Intern: span-2, white
- Tutor: span-1, light-coral
- Content Creator: span-1, coral bg

## Navigation

- Sticky, bg-[#F5F0EB]/80 backdrop-blur-md
- Active link: `bg-teal-500 text-white rounded-full px-3 py-1` (pill style)
- Hover: `bg-gray-100 rounded-full`
- Logo: font-black text-xl

## Typography

- Hero name: text-5xl md:text-7xl font-black (on gradient card)
- Section headings: text-2xl md:text-3xl font-bold
- Card titles: text-lg font-semibold
- Body: text-base text-gray-600
- Fonts: Inter (sans) + JetBrains Mono (mono)

## Tech Tags

On light-teal card: `bg-teal-500 text-white rounded-full px-3 py-1.5 text-sm font-medium`
On white cards: `bg-teal-50 text-teal-700 rounded-full px-3 py-1 text-xs font-mono`

## Footer

`bg-teal-900 text-white` — dark teal contrast. Links: `text-teal-200 hover:text-white`.

## Contact Page

Bento grid:
- Email card (teal bg, span-2): CTA button
- LinkedIn card (white, span-1)
- GitHub card (white, span-1)

## Impressum / Datenschutz

Standard layout with beige bg, white content card. No bento needed for legal text.

## What Changes

- Entire visual language: sections → bento grids
- Color usage: accent-only → card backgrounds
- Card uniformity: same size/color → varied sizes + colors
- Hero: separate section → largest grid card with gradient
- Tech tags: invisible → colorful pills
- New elements: hackathon badge card, stats card, location card
- Footer: white → dark teal

## What Stays

- Routing, i18n, data/translations system
- Fonts (Inter + JetBrains Mono)
- Content (all text, experiences, projects)
- Responsive breakpoints (adapted for grid)
