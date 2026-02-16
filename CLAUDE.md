# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev`
- **Build:** `npm run build`
- **Start production:** `npm start`
- **Lint:** `npm run lint`

There are no tests configured in this project.

## Architecture

This is a **Next.js 16 App Router** portfolio site (TypeScript, Tailwind CSS, React 19) with bilingual support (German/English). Deployed on Vercel.

### Routing

Routes use German path names. All pages are in `app/`:

| Route | Purpose |
|-------|---------|
| `/` | Home (hero, about, experiences preview, projects preview) |
| `/erfahrungen` | Full experiences list |
| `/projekte` | Full projects grid |
| `/kontakt` | Contact page |
| `/impressum` | Legal imprint |
| `/datenschutz` | Privacy policy |

### i18n System

Internationalization is client-side via React Context — not Next.js middleware or route-based:

- `contexts/LanguageContext.tsx` — provides `useLanguage()` hook, persists to localStorage
- `translations/de.json` and `translations/en.json` — all UI strings plus data translations (keyed by `projectsData` and `experiencesData` objects)
- `hooks/useTranslatedData.ts` — `useTranslatedExperiences()` and `useTranslatedProjects()` hooks that overlay translations onto base data
- `data/experiences.ts` and `data/projects.ts` — base data with TypeScript interfaces (German defaults)

When adding new content: add the base entry in `data/`, then add translated strings in both `translations/de.json` and `translations/en.json`.

### Styling

- Warm Bento theme: background `#F5F0EB` (warm beige), teal `#0D9488` + coral/orange `#F97316` dual-accent
- Bento-Grid layout system: 4-column desktop, 2-column tablet, 1-column mobile (CSS Grid)
- Card component with 6 variants: white, teal, coral, light-teal, light-coral, gradient
- Cards span 1-4 columns via `.col-span-N` utility classes
- Custom colors defined in `tailwind.config.ts`
- Fonts: Inter (sans) and JetBrains Mono (mono) via `next/font`
- Global animations and bento grid utilities in `app/globals.css`
- Footer: dark teal (`bg-teal-900`)
- Nav: pill-style active links on beige/80 backdrop-blur

### Key Patterns

- Most components are client components (`"use client"`) due to i18n context dependency
- React Compiler is enabled in `next.config.ts`
- Path alias: `@/*` maps to project root
- Prettier: 2 spaces, semicolons, double quotes, 100-char line width
