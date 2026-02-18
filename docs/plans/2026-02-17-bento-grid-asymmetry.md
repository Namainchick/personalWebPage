# Bento Grid Asymmetric Layout Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Break the homepage's symmetrical 2+2 bento grid into a zigzag asymmetric layout using col-span-3 and col-span-1 combos.

**Architecture:** Single-file change to `app/page.tsx`. Reorder cards and change span classes to create alternating left-heavy (3+1) and right-heavy (1+3) rows. No CSS, component, or responsive changes needed — `col-span-3` is already defined in `globals.css` with proper tablet/mobile fallbacks.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS, TypeScript

**No tests exist in this project.** Verification is `npm run build` + `npm run lint` + visual check with `npm run dev`.

---

### Task 1: Widen Mission card and remove Location from Row 3

**Files:**
- Modify: `app/page.tsx:71-97` (Row 3 section)

**Step 1: Change Mission card span**

In the Mission card (line 74), change `col-span-2` to `col-span-3`:

```tsx
{/* Before */}
<Card variant="light-coral" className="col-span-2 flex items-center relative overflow-hidden">

{/* After */}
<Card variant="light-coral" className="col-span-3 flex items-center relative overflow-hidden">
```

**Step 2: Remove Location card from Row 3**

Delete the entire Location card block (lines 84-88):

```tsx
{/* DELETE THIS ENTIRE BLOCK */}
{/* LOCATION — teal with concentric rings decoration */}
<Card variant="teal" className="rings-decoration col-span-1 flex flex-col justify-center items-center text-center">
  <span className="text-3xl mb-2 relative z-10">📍</span>
  <p className="font-bold text-white text-lg relative z-10">{t.home.location}</p>
</Card>
```

TikTok stays as `col-span-1` — Row 3 is now Mission(3) + TikTok(1).

**Step 3: Update row comment**

```tsx
{/* Before */}
{/* ═══ ROW 3: Mission + Location + TikTok (2+1+1=4) ═══ */}

{/* After */}
{/* ═══ ROW 3: Mission + TikTok (3+1=4) ═══ */}
```

---

### Task 2: Add Location to Row 4 and widen Project 1

**Files:**
- Modify: `app/page.tsx:99-135` (Row 4 section)

**Step 1: Insert Location card before Project 1**

Add the Location card (moved from Row 3) right before the Project 1 block:

```tsx
{/* ═══ ROW 4: Location + Featured Project (1+3=4) ═══ */}

{/* LOCATION — teal with concentric rings decoration */}
<Card variant="teal" className="rings-decoration col-span-1 flex flex-col justify-center items-center text-center">
  <span className="text-3xl mb-2 relative z-10">📍</span>
  <p className="font-bold text-white text-lg relative z-10">{t.home.location}</p>
</Card>
```

**Step 2: Change Project 1 (DIP) span to col-span-3**

```tsx
{/* Before */}
<Card key={project.id} variant="teal" hoverable className="card-shimmer hover-glow col-span-2">

{/* After */}
<Card key={project.id} variant="teal" hoverable className="card-shimmer hover-glow col-span-3">
```

**Step 3: Remove Project 2 (Mindflayer) from the homepage**

Delete the entire Project 2 block (lines 119-135):

```tsx
{/* DELETE THIS ENTIRE BLOCK */}
{/* PROJECT MINDFLAYER — white + dot grid bg + hover glow */}
{projects.slice(1, 2).map((project) => (
  <Card key={project.id} variant="white" hoverable className="card-dots-dark hover-glow col-span-2">
    ...entire card content...
  </Card>
))}
```

Row 4 is now Location(1) + Project 1(3).

**Step 4: Update row comment**

```tsx
{/* Before */}
{/* ═══ ROW 4: 2 Featured Projects (2+2=4) ═══ */}

{/* After */}
{/* ═══ ROW 4: Location + Featured Project (1+3=4) ═══ */}
```

---

### Task 3: Make Experience row asymmetric (3+1)

**Files:**
- Modify: `app/page.tsx:137-169` (Row 5 section)

**Step 1: Change Experience 1 span to col-span-3**

```tsx
{/* Before */}
<Card variant="white" hoverable className="card-dots-dark hover-glow col-span-2 border-l-4 border-l-teal-500">

{/* After */}
<Card variant="white" hoverable className="card-dots-dark hover-glow col-span-3 border-l-4 border-l-teal-500">
```

**Step 2: Change Experience 2 span to col-span-1**

```tsx
{/* Before */}
<Card variant="teal" hoverable className="card-lines hover-glow col-span-2">

{/* After */}
<Card variant="teal" hoverable className="card-lines hover-glow col-span-1">
```

**Step 3: Update row comment**

```tsx
{/* Before */}
{/* ═══ ROW 5: 2 Experiences (2+2=4) ═══ */}

{/* After */}
{/* ═══ ROW 5: Experiences (3+1=4) ═══ */}
```

---

### Task 4: Build verification

**Step 1: Run lint**

Run: `npm run lint`
Expected: No errors

**Step 2: Run build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Visual check**

Run: `npm run dev`
Check homepage at localhost:3000. Verify:
- Row 3: Mission card spans 3 columns, TikTok fills remaining 1
- Row 4: Location is a small 1-column card, Project 1 spans 3 columns
- Row 5: Experience 1 spans 3 columns, Experience 2 is compact 1-column
- Tablet (resize to ~900px): Layout still looks good (3-span becomes 2)
- Mobile (resize to ~400px): Everything stacks single column

**Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "style: make bento grid asymmetric with zigzag col-span-3 layout"
```
