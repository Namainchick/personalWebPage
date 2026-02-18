# Expandable Fullscreen Cards — Design Document

**Date:** 2026-02-18
**Status:** Approved

## Goal

Improve UX by making all Bento-Grid cards expandable. Clicking any card triggers a fullscreen overlay animation showing detailed content (images, descriptions, links, learnings).

## Technical Approach

**Framer Motion** `layoutId` + `AnimatePresence` for shared layout animations between the card's grid position and the fullscreen overlay.

## Scope

All cards on all pages are expandable:
- `/app/page.tsx` — all homepage cards (Hero, About, Experiences preview, Projects preview, TikTok, Tech-Stack, Hobbies, Location, Hackathon, Mission)
- `/app/projekte/page.tsx` — all project cards
- `/app/erfahrungen/page.tsx` — all experience cards

## Data Model Changes

### Project Interface (extended)

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
  // New fields
  longDescription: string;
  images: string[];
  learnings: string;
  highlights: string[];
}
```

### Experience Interface (extended)

```typescript
export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  impact: string;
  // New fields
  longDescription: string;
  achievements: string[];
  skills: string[];
}
```

### Homepage Card Details

Homepage-specific cards (About, TikTok, Hobbies, Location, Hero, Hackathon, Mission, Tech-Stack) get detail content defined inline in the homepage component or in a new `data/homepage-details.ts` file. Each entry has:

```typescript
interface CardDetail {
  title: string;
  content: string;       // longer description
  images?: string[];
  links?: { label: string; href: string }[];
}
```

### i18n

All new fields are added to both `translations/de.json` and `translations/en.json`.

## Component Architecture

```
ExpandableCard (new wrapper component)
├── motion.div (layoutId, card in grid position)
│   └── Card (existing component) + expand icon hint
└── AnimatePresence
    └── Portal → Expanded Overlay (when open)
        ├── motion.div backdrop (opacity fade, onClick → close)
        ├── motion.div content (layoutId, animates from card position)
        │   ├── Close button (X, top-right)
        │   ├── Hero image / image gallery
        │   ├── Title + long description
        │   ├── Tech stack pills / Skills
        │   ├── Learnings / Achievements
        │   └── Links (Demo, Repo, etc.)
        └── Scrollable container for long content
```

## Animation Flow

1. User clicks card
2. Framer Motion animates card from grid position to fullscreen overlay via shared `layoutId`
3. Backdrop fades in (black, opacity 0 → 0.5)
4. Inner content fades in with staggered delay
5. Body scroll is locked
6. Close via: X-button, backdrop click, or Escape key
7. Reverse animation on close

## Expanded Layout

- **Desktop:** `max-w-4xl`, centered, `rounded-3xl`, `p-8`
- **Tablet:** slight margin (16px)
- **Mobile:** fullscreen (no border radius, no margin)
- Card variant color is preserved as header/accent in expanded view

## Visual Affordance

- All expandable cards get `cursor-pointer`
- Subtle expand icon (arrow or plus) in card corner
- Existing hover effects remain

## Dependencies

- `framer-motion` (~30KB gzipped) — new dependency
