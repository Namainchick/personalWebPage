# Bubbly Bento-Box Animationen — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform static bento-grid cards into dynamic, bubbly animated elements with scroll-entrance, jelly hover, magnetic neighbor repulsion, and idle float — all via Framer Motion.

**Architecture:** Two new components (`BubbleGrid`, `BubbleCard`) wrap existing `ExpandableCard`. `BubbleGrid` provides React Context for hover state + column count. `BubbleCard` reads that context and applies all four animations via Framer Motion springs. Existing grids swap their `<div className="bento-grid">` for `<BubbleGrid>` and wrap each card in `<BubbleCard>`.

**Tech Stack:** Framer Motion 12.x (already installed), React 19, TypeScript, Tailwind CSS

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `components/BubbleGrid.tsx` | Create | React Context provider, `hoveredIndex` state, `colCount` via ResizeObserver |
| `components/BubbleCard.tsx` | Create | Scroll-entrance, hover jelly, magnetic offset, idle float animations |
| `components/ExpandableCard.tsx` | Modify | Remove static hover CSS classes, pass through mouse events |
| `components/HomeGrid.tsx` | Modify | Use `BubbleGrid` + `BubbleCard` |
| `components/ProjectsGrid.tsx` | Modify | Use `BubbleGrid` + `BubbleCard` |
| `components/ExperiencesGrid.tsx` | Modify | Use `BubbleGrid` + `BubbleCard` |
| `app/globals.css` | Modify | Remove `hover-glow` / `hover-glow-coral` classes |

---

### Task 1: Create BubbleGrid Context + Component

**Files:**
- Create: `components/BubbleGrid.tsx`

- [ ] **Step 1: Create BubbleGrid with Context**

```tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";

interface BubbleGridContextValue {
  hoveredIndex: number | null;
  colCount: number;
  setHoveredIndex: (index: number | null) => void;
}

const BubbleGridContext = createContext<BubbleGridContextValue>({
  hoveredIndex: null,
  colCount: 4,
  setHoveredIndex: () => {},
});

export function useBubbleGrid() {
  return useContext(BubbleGridContext);
}

interface BubbleGridProps {
  children: ReactNode;
  className?: string;
}

export default function BubbleGrid({ children, className = "" }: BubbleGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [colCount, setColCount] = useState(4);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const updateCols = () => {
      const style = getComputedStyle(el);
      const cols = style.gridTemplateColumns.split(" ").length;
      setColCount(cols);
    };

    updateCols();

    const ro = new ResizeObserver(updateCols);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleSetHovered = useCallback((index: number | null) => {
    setHoveredIndex(index);
  }, []);

  return (
    <BubbleGridContext.Provider
      value={{ hoveredIndex, colCount, setHoveredIndex: handleSetHovered }}
    >
      <div ref={gridRef} className={`bento-grid ${className}`}>
        {children}
      </div>
    </BubbleGridContext.Provider>
  );
}
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: Build succeeds (component not yet used anywhere)

- [ ] **Step 3: Commit**

```bash
git add components/BubbleGrid.tsx
git commit -m "feat: add BubbleGrid context component for hover tracking and column detection"
```

---

### Task 2: Create BubbleCard with Scroll-Entrance Animation

**Files:**
- Create: `components/BubbleCard.tsx`

- [ ] **Step 1: Create BubbleCard with scroll-entrance only**

The first version only handles the "bubble pop" scroll entrance. Other animations are added in subsequent tasks.

```tsx
"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useBubbleGrid } from "@/components/BubbleGrid";

interface BubbleCardProps {
  children: ReactNode;
  index: number;
  id: string;
  className?: string;
}

function getDelayFromId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 1000;
  }
  return (hash % 300) / 1000; // 0–0.3s
}

export default function BubbleCard({ children, index, id, className = "" }: BubbleCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReduced = useReducedMotion();

  const delay = getDelayFromId(id);

  const entranceVariants = prefersReduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3, delay } },
      }
    : {
        hidden: { opacity: 0, scale: 0.85, y: 40 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            mass: 0.8,
            delay,
          },
        },
      };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={entranceVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/BubbleCard.tsx
git commit -m "feat: add BubbleCard with scroll-entrance bubble pop animation"
```

---

### Task 3: Add Hover Jelly-Squish + Glow to BubbleCard

**Files:**
- Modify: `components/BubbleCard.tsx`

- [ ] **Step 1: Add hover state and jelly animation**

Replace the entire `BubbleCard` component in `components/BubbleCard.tsx` with this version that adds hover jelly squish + glow. The scroll-entrance logic stays the same, hover is layered on top.

```tsx
"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useBubbleGrid } from "@/components/BubbleGrid";

interface BubbleCardProps {
  children: ReactNode;
  index: number;
  id: string;
  variant?: string;
  className?: string;
}

function getDelayFromId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 1000;
  }
  return (hash % 300) / 1000;
}

function getGlowShadow(variant: string): string {
  switch (variant) {
    case "teal":
    case "gradient":
      return "0 0 30px rgba(13, 148, 136, 0.3), 0 8px 32px rgba(0,0,0,0.1)";
    case "coral":
      return "0 0 30px rgba(249, 115, 22, 0.3), 0 8px 32px rgba(0,0,0,0.1)";
    default:
      return "0 0 30px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)";
  }
}

export default function BubbleCard({
  children,
  index,
  id,
  variant = "white",
  className = "",
}: BubbleCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReduced = useReducedMotion();
  const { setHoveredIndex } = useBubbleGrid();
  const [isHovered, setIsHovered] = useState(false);

  const delay = getDelayFromId(id);

  const entranceVariants = prefersReduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3, delay } },
      }
    : {
        hidden: { opacity: 0, scale: 0.85, y: 40 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            mass: 0.8,
            delay,
          },
        },
      };

  const hoverSpring = { type: "spring" as const, stiffness: 400, damping: 15 };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredIndex(null);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={entranceVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={
        prefersReduced
          ? { scale: 1.015 }
          : {
              scale: 1.035,
              boxShadow: getGlowShadow(variant),
              transition: hoverSpring,
            }
      }
      whileTap={{ scale: 0.98, transition: { type: "spring", stiffness: 500, damping: 20 } }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
```

Note: The `whileHover` in Framer Motion automatically animates between the current state and the hover state using the specified spring, giving us the jelly squish effect. The intermediate `scaleX: 1.05, scaleY: 0.97` squish happens naturally because the spring overshoots slightly with `damping: 15` (underdamped).

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/BubbleCard.tsx
git commit -m "feat: add hover jelly-squish and glow animation to BubbleCard"
```

---

### Task 4: Add Magnetic Neighbor Repulsion to BubbleCard

**Files:**
- Modify: `components/BubbleCard.tsx`

- [ ] **Step 1: Add magnetic offset calculation and animation**

Add the magnetic neighbor offset logic. This reads `hoveredIndex` and `colCount` from `BubbleGridContext` and computes a repulsion vector when a neighbor is hovered.

In `components/BubbleCard.tsx`, add the `getNeighborOffset` function before the component and update the component to apply it:

Add this function after the existing `getGlowShadow` function:

```tsx
function getNeighborOffset(
  myIndex: number,
  hoveredIndex: number | null,
  colCount: number
): { x: number; y: number } {
  if (hoveredIndex === null || hoveredIndex === myIndex || colCount <= 1) {
    return { x: 0, y: 0 };
  }

  const myRow = Math.floor(myIndex / colCount);
  const myCol = myIndex % colCount;
  const hRow = Math.floor(hoveredIndex / colCount);
  const hCol = hoveredIndex % colCount;

  const dRow = myRow - hRow;
  const dCol = myCol - hCol;

  // Only affect direct + diagonal neighbors (distance 1)
  if (Math.abs(dRow) > 1 || Math.abs(dCol) > 1) {
    return { x: 0, y: 0 };
  }

  const isDirect = dRow === 0 || dCol === 0;
  const strength = isDirect ? 5 : 2.5;

  // Normalize direction
  const len = Math.sqrt(dRow * dRow + dCol * dCol) || 1;
  return {
    x: (dCol / len) * strength,
    y: (dRow / len) * strength,
  };
}
```

Then update the component: add `hoveredIndex` and `colCount` from the context, compute the offset, and apply it with `animate`:

Replace the return statement with:

```tsx
  const { hoveredIndex, colCount, setHoveredIndex } = useBubbleGrid();

  const offset = getNeighborOffset(index, hoveredIndex, colCount);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={entranceVariants}
      initial="hidden"
      animate={
        isInView
          ? {
              ...entranceVariants.visible,
              x: offset.x,
              y: (entranceVariants.visible as { y?: number }).y === 0 ? offset.y : 40,
              transition: {
                ...entranceVariants.visible.transition,
                x: { type: "spring", stiffness: 300, damping: 25 },
                y: { type: "spring", stiffness: 300, damping: 25 },
              },
            }
          : "hidden"
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={
        prefersReduced
          ? { scale: 1.015 }
          : {
              scale: 1.035,
              boxShadow: getGlowShadow(variant),
              transition: hoverSpring,
            }
      }
      whileTap={{ scale: 0.98, transition: { type: "spring", stiffness: 500, damping: 20 } }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
```

Note: The entrance animation and the magnetic offset both target `x`/`y`. After entrance completes (`once: true`), the animate state becomes the resting state, and the magnetic offset adjusts from there. The separate `x` and `y` transition overrides ensure the magnetic spring parameters are used for the repulsion motion.

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/BubbleCard.tsx
git commit -m "feat: add magnetic neighbor repulsion effect to BubbleCard"
```

---

### Task 5: Add Idle Float Animation to BubbleCard

**Files:**
- Modify: `components/BubbleCard.tsx`

- [ ] **Step 1: Add idle float logic**

The idle float should activate only after the entrance animation completes and pause during hover. Add an `entranceDone` state and a float offset calculation.

Add this helper function after `getNeighborOffset`:

```tsx
function getFloatDuration(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 17 + id.charCodeAt(i)) % 1000;
  }
  return 3 + (hash % 2000) / 1000; // 3–5 seconds
}
```

In the component, add state for entrance completion:

```tsx
const [entranceDone, setEntranceDone] = useState(false);
const floatDuration = getFloatDuration(id);
```

Update the `<motion.div>` to call `onAnimationComplete`:

```tsx
onAnimationComplete={(definition) => {
  if (definition === "visible" || (typeof definition === "object" && "opacity" in definition)) {
    setEntranceDone(true);
  }
}}
```

Now the tricky part: we need the idle float `y` offset to layer with the magnetic offset. The cleanest approach is to compute a combined `y` value. Update the `animate` prop to include the float offset:

```tsx
const floatY = entranceDone && !isHovered && !prefersReduced ? 2 : 0;

// In the animate prop, the y value combines magnetic offset + float:
// y: offset.y  (stays as-is — float is handled by a nested motion.div)
```

Actually, the cleanest architecture is to use a **nested `motion.div`** for idle float so it doesn't conflict with entrance/magnetic animations. Update the return:

```tsx
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={entranceVariants}
      initial="hidden"
      animate={
        isInView
          ? {
              ...entranceVariants.visible,
              x: offset.x,
              y: offset.y,
              transition: {
                ...entranceVariants.visible.transition,
                x: { type: "spring", stiffness: 300, damping: 25 },
                y: { type: "spring", stiffness: 300, damping: 25 },
              },
            }
          : "hidden"
      }
      onAnimationComplete={() => {
        if (!entranceDone) setEntranceDone(true);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={
        prefersReduced
          ? { scale: 1.015 }
          : {
              scale: 1.035,
              boxShadow: getGlowShadow(variant),
              transition: hoverSpring,
            }
      }
      whileTap={{ scale: 0.98, transition: { type: "spring", stiffness: 500, damping: 20 } }}
      style={{ willChange: "transform" }}
    >
      <motion.div
        animate={
          entranceDone && !isHovered && !prefersReduced
            ? {
                y: [0, -2, 0, 2, 0],
                transition: {
                  duration: floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
            : { y: 0 }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/BubbleCard.tsx
git commit -m "feat: add idle float breathing animation to BubbleCard"
```

---

### Task 6: Clean Up ExpandableCard — Remove Static Hover CSS

**Files:**
- Modify: `components/ExpandableCard.tsx`

- [ ] **Step 1: Remove static hover classes from ExpandableCard**

In `components/ExpandableCard.tsx`, line 85, the `<article>` element has:

```
hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-pointer
```

These conflict with the new Framer Motion hover. Replace the className on line 85.

Change this line:

```tsx
        className={`rounded-2xl p-6 ${variantStyles[variant]} hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-pointer ${className} relative group`}
```

To:

```tsx
        className={`rounded-2xl p-6 ${variantStyles[variant]} cursor-pointer ${className} relative group`}
```

The hover animation is now handled by the parent `BubbleCard`.

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/ExpandableCard.tsx
git commit -m "refactor: remove static hover CSS from ExpandableCard (now in BubbleCard)"
```

---

### Task 7: Clean Up globals.css — Remove Replaced Hover Classes

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Remove hover-glow and hover-glow-coral from globals.css**

Remove lines 158–172 from `app/globals.css`:

```css
/* Hover glow effect */
.hover-glow {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.hover-glow:hover {
  box-shadow: 0 0 30px rgba(13, 148, 136, 0.2), 0 8px 32px rgba(0,0,0,0.08);
}

/* Coral hover glow */
.hover-glow-coral {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.hover-glow-coral:hover {
  box-shadow: 0 0 30px rgba(249, 115, 22, 0.2), 0 8px 32px rgba(0,0,0,0.08);
}
```

These are now replaced by the Framer Motion `boxShadow` animation in `BubbleCard`.

- [ ] **Step 2: Remove hover-glow class references from HomeGrid.tsx**

In `components/HomeGrid.tsx`, remove `hover-glow` from the className strings:

- Line 163: `"card-shimmer hover-glow col-span-1"` → `"card-shimmer col-span-1"`
- Line 218: `"card-dots-dark hover-glow col-span-3 border-l-4 border-l-teal-500"` → `"card-dots-dark col-span-3 border-l-4 border-l-teal-500"`
- Line 244: `"card-lines hover-glow col-span-1"` → `"card-lines col-span-1"`

- [ ] **Step 3: Verify it builds**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add app/globals.css components/HomeGrid.tsx
git commit -m "refactor: remove hover-glow CSS classes replaced by Framer Motion animations"
```

---

### Task 8: Integrate BubbleGrid + BubbleCard into HomeGrid

**Files:**
- Modify: `components/HomeGrid.tsx`

- [ ] **Step 1: Wrap grid in BubbleGrid and each card in BubbleCard**

At the top of `components/HomeGrid.tsx`, add imports:

```tsx
import BubbleGrid from "@/components/BubbleGrid";
import BubbleCard from "@/components/BubbleCard";
```

Replace `<div className="bento-grid">` (line 39) with `<BubbleGrid>` and the matching `</div>` (line 317) with `</BubbleGrid>`.

Wrap each `<ExpandableCard>` and the CTA `<div>` in a `<BubbleCard>` with sequential `index` and matching `id` + `variant`. The `className` that controls grid span (`col-span-N`, `row-span-N`) moves from `ExpandableCard` to `BubbleCard` (since `BubbleCard` is now the grid item).

Example for the hero card (index 0):

```tsx
<BubbleCard index={0} id="hero" variant="gradient" className="col-span-2 row-span-2">
  <ExpandableCard
    id="hero"
    variant="gradient"
    className="card-dots flex flex-col justify-center min-h-[280px] h-full"
    expandedContent={
      <HomepageCardExpanded detail={homepageDetails.hero} isColored={true} />
    }
  >
    {/* ... children unchanged ... */}
  </ExpandableCard>
</BubbleCard>
```

Key pattern: **`col-span-*` and `row-span-*`** classes move to `BubbleCard`. The rest of the className stays on `ExpandableCard`. Add `h-full` to `ExpandableCard` so it fills the `BubbleCard` wrapper.

Apply this pattern to every card. Use sequential indexes (0, 1, 2, ...) matching visual order. There are 12 items total in HomeGrid:

| Index | ID | Variant |
|-------|-----|---------|
| 0 | hero | gradient |
| 1 | location | teal |
| 2 | tiktok | coral |
| 3 | techStack | teal |
| 4 | about | light-teal |
| 5 | hackathon | coral |
| 6 | home-{project.id} | teal |
| 7 | mission | light-coral |
| 8 | home-{exp1.id} | white |
| 9 | home-{exp2.id} | teal |
| 10 | hobbies | light-teal |
| 11 | emailCta | gradient |

The CTA buttons div (index 12) also gets wrapped in `BubbleCard` with `variant="white"`.

- [ ] **Step 2: Verify dev server renders correctly**

Run: `npm run dev` and open `http://localhost:3000`
Expected: Cards pop in with bubble animation on scroll, hover shows jelly squish + glow, neighbors shift on hover, idle float visible after entrance

- [ ] **Step 3: Verify build succeeds**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 4: Commit**

```bash
git add components/HomeGrid.tsx
git commit -m "feat: integrate BubbleGrid + BubbleCard into HomeGrid"
```

---

### Task 9: Integrate BubbleGrid + BubbleCard into ProjectsGrid

**Files:**
- Modify: `components/ProjectsGrid.tsx`

- [ ] **Step 1: Wrap grid and cards**

Add imports at the top:

```tsx
import BubbleGrid from "@/components/BubbleGrid";
import BubbleCard from "@/components/BubbleCard";
```

Replace `<div className="bento-grid">` with `<BubbleGrid>` and `</div>` with `</BubbleGrid>`.

Wrap each `<ExpandableCard>` in a `<BubbleCard>`. Move `${layout.span}` from `ExpandableCard` className to `BubbleCard` className. Add `h-full` to `ExpandableCard`.

```tsx
export default function ProjectsGrid({
  projects,
  viewDemoLabel,
  viewCodeLabel,
}: ProjectsGridProps) {
  return (
    <BubbleGrid>
      {projects.map((project, i) => {
        const layout = projectLayout[project.id] || {
          variant: "white" as CardVariant,
          span: "col-span-1",
        };
        const isColored = layout.variant === "teal" || layout.variant === "coral";

        return (
          <BubbleCard
            key={project.id}
            index={i}
            id={project.id}
            variant={layout.variant}
            className={layout.span}
          >
            <ExpandableCard
              key={project.id}
              id={project.id}
              variant={layout.variant}
              className="flex flex-col h-full"
              expandedContent={
                <ProjectExpanded
                  project={project}
                  isColored={isColored}
                  viewDemoLabel={viewDemoLabel}
                  viewCodeLabel={viewCodeLabel}
                />
              }
            >
              <h3
                className={`text-xl font-semibold mb-2 ${isColored ? "" : "text-gray-900"}`}
              >
                {project.title}
              </h3>
              <p
                className={`text-sm mb-4 leading-relaxed flex-grow line-clamp-3 ${
                  isColored ? "text-white/80" : "text-gray-600"
                }`}
              >
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-0.5 text-xs font-mono rounded-full ${
                      isColored ? "bg-white/20 text-white" : "bg-teal-50 text-teal-700"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ExpandableCard>
          </BubbleCard>
        );
      })}
    </BubbleGrid>
  );
}
```

- [ ] **Step 2: Verify build succeeds**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/ProjectsGrid.tsx
git commit -m "feat: integrate BubbleGrid + BubbleCard into ProjectsGrid"
```

---

### Task 10: Integrate BubbleGrid + BubbleCard into ExperiencesGrid

**Files:**
- Modify: `components/ExperiencesGrid.tsx`

- [ ] **Step 1: Wrap grid and cards**

Add imports at the top:

```tsx
import BubbleGrid from "@/components/BubbleGrid";
import BubbleCard from "@/components/BubbleCard";
```

Replace `<div className="bento-grid">` with `<BubbleGrid>` and `</div>` with `</BubbleGrid>`.

Wrap each `<ExpandableCard>` in a `<BubbleCard>`. Move `${layout.span}` from `ExpandableCard` className to `BubbleCard` className. Add `h-full` to `ExpandableCard`.

```tsx
export default function ExperiencesGrid({ experiences }: ExperiencesGridProps) {
  return (
    <BubbleGrid>
      {experiences.map((exp, i) => {
        const layout = experienceLayout[exp.id] || {
          variant: "white" as CardVariant,
          span: "col-span-1",
        };
        const isColored = layout.variant === "teal" || layout.variant === "coral";

        return (
          <BubbleCard
            key={exp.id}
            index={i}
            id={exp.id}
            variant={layout.variant}
            className={layout.span}
          >
            <ExpandableCard
              key={exp.id}
              id={exp.id}
              variant={layout.variant}
              className={`${layout.extraClass || ""} h-full`}
              expandedContent={
                <ExperienceExpanded experience={exp} isColored={isColored} />
              }
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <div>
                  <h3
                    className={`text-xl font-semibold mb-1 ${
                      isColored ? "" : "text-gray-900"
                    }`}
                  >
                    {exp.role}
                  </h3>
                  <p
                    className={`text-sm ${
                      isColored ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {exp.organization}
                  </p>
                </div>
                <span
                  className={`text-xs font-mono whitespace-nowrap ${
                    isColored ? "text-white/60" : "text-gray-400"
                  }`}
                >
                  {exp.period}
                </span>
              </div>
              <p
                className={`text-sm leading-relaxed whitespace-pre-line line-clamp-3 ${
                  isColored ? "text-white/80" : "text-gray-600"
                }`}
              >
                {exp.impact}
              </p>
            </ExpandableCard>
          </BubbleCard>
        );
      })}
    </BubbleGrid>
  );
}
```

- [ ] **Step 2: Verify build succeeds**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/ExperiencesGrid.tsx
git commit -m "feat: integrate BubbleGrid + BubbleCard into ExperiencesGrid"
```

---

### Task 11: Visual QA + Final Tuning

**Files:**
- Possibly tweak: `components/BubbleCard.tsx` (spring values, timing)

- [ ] **Step 1: Run dev server and test all pages**

Run: `npm run dev`

Check the following on `http://localhost:3000`:

1. **Scroll-Entrance:** Cards pop in with staggered delays as you scroll. No layout shift.
2. **Hover Jelly:** Hovering a card shows elastic scale with glow. Spring has visible but controlled overshoot.
3. **Magnetic Neighbors:** Neighbors shift away from hovered card. Effect disables on mobile viewport.
4. **Idle Float:** After entrance, cards gently bob up/down. Stops during hover.
5. **Modal:** Clicking still opens the expanded card modal correctly.
6. **Reduced Motion:** In browser devtools, enable `prefers-reduced-motion: reduce`. Verify float stops, entrance is simple fade, hover is minimal.

Also check `/projekte` and `/erfahrungen` pages.

- [ ] **Step 2: Check responsive behavior**

Resize browser to tablet (1024px) and mobile (640px). Verify:
- Grid collapses correctly (4 → 2 → 1 columns)
- Magnetic effect disables at 1 column
- Animations still work at 2 columns

- [ ] **Step 3: Final production build**

Run: `npm run build`
Expected: Build succeeds, no warnings about hydration or unused variables

- [ ] **Step 4: Commit any tuning changes**

```bash
git add -A
git commit -m "chore: visual QA tuning for bubbly bento animations"
```

(Skip this commit if no tuning was needed.)
