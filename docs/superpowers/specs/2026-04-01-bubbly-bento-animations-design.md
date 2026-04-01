# Bubbly Bento-Box Animationen — Design Spec

## Ziel

Die statischen Bento-Box Karten in dynamische, blasen-artige Elemente verwandeln. Verspielt + physik-basiert, aber professionell ausgeführt. Alle Animationen über Framer Motion (bereits installiert).

## Neue Komponenten

### `BubbleGrid`

Ersetzt das einfache `<div className="bento-grid">` in `HomeGrid`, `ProjectsGrid` und `ExperiencesGrid`.

**Verantwortlichkeiten:**
- Trackt `hoveredIndex` via React Context
- Ermittelt `colCount` per `ResizeObserver` (4 → 2 → 1 je nach Breakpoint)
- Stellt Context bereit: `{ hoveredIndex, colCount, setHoveredIndex }`
- Bei `colCount === 1` (Mobile) wird der magnetische Nachbar-Effekt deaktiviert

### `BubbleCard`

Wrapper um `ExpandableCard`. Enthält alle Animations-Logik.

**Verantwortlichkeiten:**
- Scroll-Entrance Animation
- Hover Jelly-Squish Animation
- Idle Float Animation
- Magnetischer Nachbar-Offset

## Animation 1: Scroll-Entrance — "Bubble Pop"

Karten poppen beim Scrollen ins Viewport wie Blasen.

- **Start:** `scale: 0.85`, `opacity: 0`, `y: 40px`
- **End:** `scale: 1`, `opacity: 1`, `y: 0`
- **Physik:** Spring — `stiffness: 260`, `damping: 20`, `mass: 0.8`
- **Trigger:** Framer Motion `useInView` mit `amount: 0.15`, `once: true`
- **Delay:** Pseudo-zufällig pro Karte (basierend auf `id.charCodeAt()` modulo), 0–300ms
- **Deterministisch:** Kein `Math.random()` — gleicher Delay bei jedem Render

## Animation 2: Hover — "Jelly Squish" + Glow

Elastische Reaktion beim Hover.

- **Hover-Start:** Kurz `scaleX: 1.05, scaleY: 0.97` → settelt in `scale: 1.035`
- **Hover-End:** Zurück auf `scale: 1` mit Spring
- **Physik:** Spring — `stiffness: 400`, `damping: 15`
- **Shadow:** Animierter `boxShadow` — teal-tinted für teal/gradient Karten, coral-tinted für coral Karten, neutral für weiße
- **Ersetzt:** Die aktuellen CSS-Klassen `hover:-translate-y-1 hover:shadow-lg` in `ExpandableCard`

## Animation 3: Magnetischer Nachbar-Effekt

Nachbar-Karten weichen beim Hover aus.

- **Direkte Nachbarn** (links/rechts/oben/unten): `translate` 4–6px weg vom Hover-Zentrum
- **Diagonale Nachbarn:** 2–3px
- **Weiter entfernte Karten:** Kein Effekt
- **Physik:** Spring — `stiffness: 300`, `damping: 25`
- **Nachbarschafts-Berechnung:** Bei 4-Spalten-Grid: rechts = `index + 1` (gleiche Zeile), unten = `index + colCount`
- **Responsive:** `colCount` via `ResizeObserver`. Bei `colCount === 1` (Mobile): Effekt deaktiviert
- **Performance:** Nur betroffene Karten re-rendern (max 8 Nachbarn), GPU-beschleunigte Transforms

## Animation 4: Idle Float — "Breathing"

Subtiles Schweben im Ruhezustand.

- **Bewegung:** `y` pendelt zwischen `-2px` und `+2px`
- **Dauer:** 3–5s pro Zyklus, pseudo-zufällig pro Karte (ID-Hash basiert)
- **Easing:** `ease-in-out`, Endlosschleife (`repeat: Infinity, repeatType: "reverse"`)
- **Pausiert** während Hover (Jelly übernimmt)
- **Pausiert** bei `prefers-reduced-motion: reduce`
- **Startet erst** nach Scroll-Entrance abgeschlossen

## Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `components/BubbleGrid.tsx` | **Neu** — Grid-Wrapper mit Context |
| `components/BubbleCard.tsx` | **Neu** — Animations-Wrapper |
| `components/HomeGrid.tsx` | Ersetze `<div className="bento-grid">` mit `<BubbleGrid>`, wrappe Karten in `<BubbleCard>` |
| `components/ProjectsGrid.tsx` | Gleiches Pattern |
| `components/ExperiencesGrid.tsx` | Gleiches Pattern |
| `components/ExpandableCard.tsx` | Entferne statische Hover-CSS (`hover:-translate-y-1 hover:shadow-lg`), Hover-Logik wandert in `BubbleCard` |
| `app/globals.css` | Entferne/vereinfache `hover-glow` und `hover-glow-coral` (wird durch Framer Motion ersetzt) |

## Accessibility

- `prefers-reduced-motion: reduce` deaktiviert: Idle Float, reduziert Scroll-Entrance auf einfaches Fade-In (kein Scale/Bounce), Hover bleibt als dezente Scale-Änderung ohne Spring
- Focus-Visible Outlines bleiben unverändert

## Nicht im Scope

- Modal-Öffnungs-Animation (bleibt wie sie ist)
- Navigation/Footer Animationen
- Seiten-Transitions
