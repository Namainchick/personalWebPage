# Light Theme Redesign — "Fresh Bold"

Date: 2026-02-16

## Goal

Replace the dark glassmorphism theme with a light, friendly, modern, bold design using warm off-white backgrounds, Teal/Emerald accent colors, and layered soft shadows.

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#FAFAF8` | Page background (warm off-white) |
| `--foreground` | `#1A1A1A` | Primary text |
| `--accent` | `#0D9488` (Teal 600) | Primary accent |
| `--accent-light` | `#CCFBF1` (Teal 100) | Tag/badge backgrounds |
| `--accent-dark` | `#0F766E` (Teal 700) | Hover states |
| `--muted` | `#6B7280` (Gray 500) | Secondary text |
| `--border` | `#E5E7EB` (Gray 200) | Borders, dividers |
| `--card-bg` | `#FFFFFF` | Card backgrounds |
| `--card-shadow` | `rgba(0,0,0,0.06)` | Shadow base |

## Typography

Fonts stay: Inter (sans) + JetBrains Mono (mono).

- Hero H1: `text-6xl md:text-8xl font-extrabold`, color `#1A1A1A`
- Section Headings: `text-3xl md:text-4xl font-bold`, no glow, teal accent line
- Body: `text-gray-600`
- Mono elements: `text-teal-600` with JetBrains Mono

## Cards

Replace glassmorphism with layered soft shadows:

- Default: `bg-white border border-gray-200 rounded-2xl`, shadow `0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.06)`
- Hover: `shadow 0 4px 12px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.1)`, `border-color teal`, `translateY(-2px)`
- No backdrop-blur, no glow

## Navigation

- Background: `#FAFAF8`, border-bottom `1px solid #E5E7EB`
- Subtle shadow `0 1px 3px rgba(0,0,0,0.05)`
- Logo: `text-gray-900`, hover `text-teal-600`
- Links: `text-gray-500` default, `text-teal-600` active with solid teal underline
- Social links: `text-gray-400`, hover `text-teal-600`

## Hero Section

- Blinking dot: `color: #0D9488`, no text-shadow, simple opacity blink
- Decorative line: teal gradient, no box-shadow glow
- Tagline: `text-gray-500`
- CTA button: solid `bg-teal-600 text-white`, shadow `0 4px 14px rgba(13,148,136,0.3)`, hover darker

## Section Headings

- No text-shadow/glow
- Accent line: solid teal gradient `from-teal-500 via-teal-200 to-transparent`, no glow

## Tech Tags

- `bg-teal-100 text-teal-700 border border-teal-200 rounded-lg font-mono`
- Hover: `bg-teal-200`, no glow

## Buttons

- Primary: `bg-teal-600 text-white`, hover `bg-teal-700`, soft shadow
- Secondary: `bg-white border border-gray-200 text-gray-700`, hover `border-teal-300 text-teal-600`
- Focus rings: `ring-teal-500 ring-offset-[#FAFAF8]`

## Footer

- `bg-white border-t border-gray-200`
- Text `text-gray-400`, links hover `text-teal-600`
- No glow, no glassmorphism

## Global CSS Changes

Remove:
- All indigo glow text-shadows and box-shadows
- `.glass-card` and `.glass-button` classes
- `.hairline-gradient` (left vertical line)
- Indigo references in `.tech-tag` hover

Keep/Adapt:
- `.blinking-dot`: teal color, no text-shadow
- `.animated-link`: keep underline animation, remove glow
- `.tech-tag`: light teal styling
- `prefers-reduced-motion`: stays
- Focus-visible rings: color to teal

## Tailwind Config

Update color tokens to match new palette. Remove old dark-theme colors.

## Unchanged

- Routing, i18n, data/translations, layout structure, fonts, responsive breakpoints
