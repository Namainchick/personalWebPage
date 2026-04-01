# Sticky Sidebar + Dekorativer Hintergrund — Design Spec

## Ziel

Das zentrierte `max-w-[1200px]` Layout durch ein Sidebar-Layout ersetzen: Dark Teal Sidebar links, Bento Grid rechts, dekorativer Hintergrund (Dot Grid + Farbwolken + geometrische Elemente) füllt den leeren Raum.

## Neue Komponente: `Sidebar.tsx`

Client-Komponente (`"use client"`) wegen Language-Switcher und aktiver Link-Erkennung.

**Visuell:**
- Breite: `w-60` (240px)
- Hintergrund: `bg-teal-900` (#134e4a)
- Position: `sticky top-0 h-screen` — fixiert, volle Viewport-Höhe
- Flex-Column Layout mit Gap

**Inhalt von oben nach unten:**

1. **Name + Tagline**
   - "Namanh" — `text-xl font-black text-white`
   - "CS Student @ TUHH" — `text-xs text-teal-300`

2. **Navigation**
   - Links: Home, Erfahrungen, Projekte, Kontakt
   - Aktiver Link: `bg-white/12 text-white font-semibold rounded-lg` + teal Dot-Indicator links
   - Inaktive Links: `text-teal-200` + hohler Dot, hover `bg-white/6`
   - Aktiver Link wird über `usePathname()` bestimmt

3. **Spacer** (`flex-1`)

4. **Social Icons**
   - GitHub, LinkedIn, TikTok — SVG Icons in 34px Buttons
   - `bg-white/10 rounded-lg`, hover `bg-white/20`
   - Icons in `text-teal-200`

5. **Language Switcher**
   - Pill-Toggle: aktive Sprache `bg-teal-300 text-teal-900`, inaktive `text-teal-200`
   - Nutzt bestehenden `useLanguage()` Hook bzw. Server-Language

**Sichtbarkeit:**
- `hidden lg:flex` — nur auf Desktop (≥1024px)
- Auf Mobile unsichtbar, bestehender Header übernimmt

## Layout-Änderungen: `layout.tsx`

**Aktuell:**
```
<Nav />
<main>{children}</main>
<Footer />
```

**Neu:**
```
<div className="flex">
  <Sidebar />
  <div className="flex-1 min-w-0">
    <Nav />  ← nur auf Mobile sichtbar (lg:hidden)
    <main>{children}</main>
    <Footer />
  </div>
</div>
```

## Layout-Änderungen: `Nav.tsx`

- Wrapper `<header>` bekommt `lg:hidden` — auf Desktop komplett ausgeblendet
- Keine andere Änderung an Nav — Mobile-Header bleibt identisch

## Layout-Änderungen: Seiten-Container

**Aktuell** in `app/page.tsx` und allen Unterseiten:
```
<div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-8 md:py-12">
```

**Neu:**
```
<div className="mx-auto max-w-[1100px] px-4 md:px-6 lg:px-8 py-8 md:py-12">
```

`max-w` reduziert auf 1100px da die Sidebar 240px wegnimmt. Auf Mobile (kein Sidebar) bleibt das Layout responsive durch `px-4`.

## Dekorativer Hintergrund: `BackgroundDecoration.tsx`

Neue Komponente die als `position: fixed` hinter dem Content liegt. Nur auf Desktop sichtbar (`hidden lg:block`).

**Elemente:**

1. **Dot Grid** — `radial-gradient(circle, rgba(13,148,136,0.07) 1px, transparent 1px)` mit `background-size: 24px 24px` über die gesamte Fläche hinter dem Content-Bereich

2. **Farbwolken** — Zwei `radial-gradient` Blobs:
   - Teal-Wolke oben rechts: `radial-gradient(circle, rgba(13,148,136,0.05) 0%, transparent 60%)`, ca. 40% Breite
   - Coral-Wolke unten rechts: `radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 60%)`, ca. 30% Breite

3. **Geometrische Deko rechts:**
   - 2 konzentrische Ringe (120px + 80px, `border: 2px solid rgba(13,148,136,0.1)`, `border-radius: 50%`)
   - 2 horizontale Linien (`linear-gradient` von coral/teal zu transparent)
   - Position: rechts vom Grid, ungefähr auf Höhe der mittleren Karten-Reihen

4. **Subtile Animation** (optional, passt zum bubbly Theme):
   - Ringe rotieren langsam (CSS `@keyframes`, 30s Zyklus)
   - Farbwolken pulsieren leicht (Opacity 0.04–0.07, 8s Zyklus)
   - Respektiert `prefers-reduced-motion: reduce`

**Platzierung in layout.tsx:**
```
<div className="flex relative">
  <Sidebar />
  <div className="flex-1 min-w-0 relative">
    <BackgroundDecoration />
    <Nav />  ← lg:hidden
    <main className="relative z-10">{children}</main>
    <Footer />
  </div>
</div>
```

`BackgroundDecoration` hat `z-0`, Content hat `z-10` — Deko liegt hinter dem Content.

## Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `components/Sidebar.tsx` | **Neu** — Sticky Sidebar |
| `components/BackgroundDecoration.tsx` | **Neu** — Dot Grid, Farbwolken, geometrische Deko |
| `app/layout.tsx` | Flex-Layout mit Sidebar + Content-Wrapper |
| `components/Nav.tsx` | `lg:hidden` auf `<header>` |
| `app/page.tsx` | `max-w-[1100px]` statt `max-w-[1200px]` |
| `app/erfahrungen/page.tsx` | `max-w-[1100px]` |
| `app/projekte/page.tsx` | `max-w-[1100px]` |
| `app/kontakt/page.tsx` | `max-w-[1100px]` |
| `app/impressum/page.tsx` | `max-w-[1100px]` |
| `app/datenschutz/page.tsx` | `max-w-[1100px]` |
| `app/globals.css` | Neue `@keyframes` für Deko-Animationen |

## Nicht im Scope

- Mobile Sidebar (Overlay/Drawer/Bottom-Bar) — Mobile nutzt den bestehenden Header
- Footer-Redesign
- Änderungen am Bento Grid Layout (Spaltenanzahl bleibt 4)
- Sidebar-Collapse/Toggle Button
