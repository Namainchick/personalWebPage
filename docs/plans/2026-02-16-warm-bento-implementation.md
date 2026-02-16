# Warm Bento Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete visual rebuild of the portfolio to a Bento-Grid layout with Teal + Coral colored cards on warm beige (#F5F0EB) background.

**Architecture:** Every page becomes a CSS Grid bento layout (4 columns desktop, 2 tablet, 1 mobile). The Card component gains a `variant` prop for 6 color schemes. Homepage is a single grid with no separate sections. Translation files get new keys for bento-specific cards (hackathon badge, location, TikTok stats).

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS

**Design Spec:** `docs/plans/2026-02-16-bold-bento-redesign-design.md`

---

### Task 1: Update Color Palette & Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

**Step 1: Update `tailwind.config.ts`**

Replace the entire `colors` object:

```ts
colors: {
  background: "#F5F0EB",
  foreground: "#1A1A1A",
  muted: "#6B7280",
  border: "#E5E7EB",
  "card-white": "#FFFFFF",
  teal: {
    50: "#F0FDFA",
    100: "#CCFBF1",
    200: "#99F6E4",
    300: "#5EEAD4",
    500: "#14B8A6",
    600: "#0D9488",
    700: "#0F766E",
    900: "#134E4A",
  },
  orange: {
    50: "#FFF7ED",
    100: "#FFEDD5",
    500: "#F97316",
    600: "#EA580C",
  },
},
```

**Step 2: Rewrite `app/globals.css`**

Replace the CSS variables section and add bento utilities. Full file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Warm Bento Theme */
:root {
  --bg: #F5F0EB;
  --text: #1A1A1A;
  --text-muted: #6B7280;
  --teal: #0D9488;
  --teal-light: #CCFBF1;
  --teal-dark: #0F766E;
  --coral: #F97316;
  --coral-light: #FFF7ED;
  --coral-dark: #EA580C;
  --card-white: #FFFFFF;
  --border: #E5E7EB;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-inter), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
}

/* Span utilities */
.col-span-1 { grid-column: span 1; }
.col-span-2 { grid-column: span 2; }
.col-span-3 { grid-column: span 3; }
.col-span-4 { grid-column: span 4; }
.row-span-2 { grid-row: span 2; }

@media (max-width: 1024px) {
  .md-col-span-1 { grid-column: span 1; }
  .col-span-3 { grid-column: span 2; }
  .col-span-4 { grid-column: span 2; }
}

@media (max-width: 640px) {
  .col-span-2,
  .col-span-3,
  .col-span-4 {
    grid-column: span 1;
  }
  .row-span-2 {
    grid-row: span 1;
  }
}

/* Tech Tags on colored cards */
.tech-pill {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: transform 200ms ease;
}

.tech-pill:hover {
  transform: translateY(-1px);
}

/* Tech Tags on white cards */
.tech-tag {
  transition: all 200ms ease;
}

.tech-tag:hover {
  background: #99F6E4;
  border-color: #5EEAD4;
  transform: translateY(-1px);
}

/* Blinkender Punkt */
.blinking-dot {
  animation: blink 1.5s ease-in-out infinite;
  color: var(--coral);
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Focus rings */
:focus-visible {
  outline: 2px solid var(--teal);
  outline-offset: 2px;
}

/* Link Styles */
a {
  color: inherit;
  text-decoration: none;
  transition: color 150ms ease;
}

/* Animated link underlines */
.animated-link {
  position: relative;
  display: inline-block;
  text-decoration: none;
  transition: all 200ms ease;
}

.animated-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform-origin: right;
  transform: scaleX(0);
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
}

.animated-link:hover::after,
.animated-link:focus-visible::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

**Step 3: Build check**

Run: `npm run build`
Expected: Build succeeds (only CSS/config changes, no component changes yet).

**Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "style: update color palette to warm beige + add bento grid utilities"
```

---

### Task 2: Rewrite Card Component with Variant System

**Files:**
- Modify: `components/Card.tsx`

**Step 1: Replace entire Card.tsx**

The Card now supports 6 visual variants via a `variant` prop. Full file:

```tsx
"use client";

import { ReactNode } from "react";

type CardVariant = "white" | "teal" | "coral" | "light-teal" | "light-coral" | "gradient";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  hoverable?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  white: "bg-white border border-gray-200 shadow-sm text-gray-900",
  teal: "bg-teal-600 text-white",
  coral: "bg-orange-500 text-white",
  "light-teal": "bg-teal-50 text-gray-900",
  "light-coral": "bg-orange-50 text-gray-900",
  gradient: "bg-gradient-to-br from-teal-500 to-orange-500 text-white",
};

export default function Card({
  children,
  className = "",
  variant = "white",
  hoverable = false,
}: CardProps) {
  const hoverStyles = hoverable
    ? "hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-pointer"
    : "";

  return (
    <article
      className={`rounded-2xl p-6 ${variantStyles[variant]} ${hoverStyles} ${className}`}
      tabIndex={hoverable ? 0 : undefined}
    >
      {children}
    </article>
  );
}
```

**Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds. Existing pages import Card but use default variant ("white") which matches old behavior closely enough. No breakage.

**Step 3: Commit**

```bash
git add components/Card.tsx
git commit -m "feat: rewrite Card with 6 bento color variants"
```

---

### Task 3: Rewrite Navigation with Pill-Style Active Links

**Files:**
- Modify: `components/Nav.tsx`

**Step 1: Replace entire Nav.tsx**

Key changes: beige bg (#F5F0EB), active link is a teal pill, hover is gray pill, logo is font-black. Full file:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Nav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.experiences, href: "/erfahrungen" },
    { label: t.nav.projects, href: "/projekte" },
    { label: t.nav.contact, href: "/kontakt" },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-[#F5F0EB]/80 backdrop-blur-md">
      <nav className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-black tracking-tight text-gray-900 hover:text-teal-600 transition-colors">
              Namanh
            </Link>

            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-150 ${
                        isActive
                          ? "bg-teal-500 text-white"
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Language Switcher */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}
```

**Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add components/Nav.tsx
git commit -m "style: rewrite Nav with pill-style active links on warm beige"
```

---

### Task 4: Rewrite Footer with Dark Teal Background

**Files:**
- Modify: `components/Footer.tsx`

**Step 1: Replace entire Footer.tsx**

```tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="mt-20 bg-teal-900 text-white">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-sm text-teal-200">
            {t.footer.copyright} {currentYear}
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/impressum"
              className="text-teal-200 hover:text-white transition-colors duration-200"
            >
              {t.footer.imprint}
            </Link>
            <Link
              href="/datenschutz"
              className="text-teal-200 hover:text-white transition-colors duration-200"
            >
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "style: footer with dark teal bg-teal-900"
```

---

### Task 5: Update Small Components (Button, SectionHeading, ViewAllButton, ProjectLink, LanguageSwitcher)

**Files:**
- Modify: `components/Button.tsx`
- Modify: `components/SectionHeading.tsx`
- Modify: `components/ViewAllButton.tsx`
- Modify: `components/ProjectLink.tsx`
- Modify: `components/LanguageSwitcher.tsx`

**Step 1: Update Button.tsx**

Change the focus ring offset color from `#FAFAF8` to `#F5F0EB`. Update primary shadow. Full file:

```tsx
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "coral";
  className?: string;
  external?: boolean;
}

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F0EB]";

  const variants = {
    primary:
      "bg-teal-600 text-white hover:bg-teal-700 shadow-[0_4px_14px_rgba(13,148,136,0.3)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.4)] active:scale-[0.98]",
    secondary:
      "border border-gray-200 bg-white text-gray-700 hover:border-teal-300 hover:text-teal-600 active:scale-[0.98] shadow-sm",
    coral:
      "bg-orange-500 text-white hover:bg-orange-600 shadow-[0_4px_14px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.4)] active:scale-[0.98]",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    if (external || href.startsWith("mailto:") || href.startsWith("http")) {
      return (
        <a
          href={href}
          className={combinedClassName}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return <button className={combinedClassName}>{children}</button>;
}
```

**Step 2: Update SectionHeading.tsx**

Simplify — no gradient line, just bold heading with teal accent dot. Full file:

```tsx
import { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

export default function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2
      className={`text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-8 ${className}`}
    >
      {children}
      <span className="text-teal-500">.</span>
    </h2>
  );
}
```

**Step 3: Update ViewAllButton.tsx**

Change border-radius to `rounded-full` for pill shape. Full file:

```tsx
import Link from "next/link";

interface ViewAllButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function ViewAllButton({ href, children }: ViewAllButtonProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-gray-700 bg-white border border-gray-200 hover:border-teal-300 hover:text-teal-600 transition-all duration-200 shadow-sm hover:shadow-md"
    >
      <span>{children}</span>
      <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
    </Link>
  );
}
```

**Step 4: ProjectLink.tsx** — no changes needed, already works.

**Step 5: Update LanguageSwitcher.tsx**

Add pill styling on hover. Full file:

```tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "de" ? "en" : "de");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-sm font-medium text-gray-500 hover:text-teal-600 transition-all duration-200 px-3 py-1 rounded-full hover:bg-gray-100"
      aria-label="Switch language"
    >
      {language === "de" ? "EN" : "DE"}
    </button>
  );
}
```

**Step 6: Build check**

Run: `npm run build`
Expected: Build succeeds.

**Step 7: Commit**

```bash
git add components/Button.tsx components/SectionHeading.tsx components/ViewAllButton.tsx components/LanguageSwitcher.tsx
git commit -m "style: update small components for bento theme (pill buttons, simplified headings)"
```

---

### Task 6: Add New Translation Keys for Homepage Bento Cards

**Files:**
- Modify: `translations/de.json`
- Modify: `translations/en.json`

**Step 1: Add keys to `translations/de.json`**

Add inside the `"home"` object, after `"hero"`:

```json
"hackathon": {
  "title": "3x 1. Platz",
  "events": "Cursor AI Hamburg · CodeRabbit Hackathon · {Tech: Europe} Berlin"
},
"location": "TUHH, Hamburg",
"tiktok": {
  "title": "50k+ Follower",
  "subtitle": "20 Mio.+ Views auf TikTok"
},
```

Also add a new `"cta"` object for the bottom row:

```json
"cta": {
  "projects": "Alle Projekte",
  "experiences": "Alle Erfahrungen"
}
```

**Step 2: Add matching keys to `translations/en.json`**

```json
"hackathon": {
  "title": "3x 1st Place",
  "events": "Cursor AI Hamburg · CodeRabbit Hackathon · {Tech: Europe} Berlin"
},
"location": "TUHH, Hamburg",
"tiktok": {
  "title": "50k+ Followers",
  "subtitle": "20M+ Views on TikTok"
},
"cta": {
  "projects": "All Projects",
  "experiences": "All Experience"
}
```

**Step 3: Commit**

```bash
git add translations/de.json translations/en.json
git commit -m "i18n: add bento card translation keys (hackathon, location, tiktok, cta)"
```

---

### Task 7: Rewrite Homepage as Single Bento Grid

**Files:**
- Modify: `app/page.tsx`

This is the biggest change. The homepage becomes one single bento grid with no separate sections. Full file:

**Step 1: Replace entire `app/page.tsx`**

```tsx
"use client";

import Card from "@/components/Card";
import ViewAllButton from "@/components/ViewAllButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedExperiences, useTranslatedProjects } from "@/hooks/useTranslatedData";

export default function Home() {
  const { t } = useLanguage();
  const experiences = useTranslatedExperiences();
  const projects = useTranslatedProjects();

  const techStack = [
    "TypeScript", "React", "Next.js", "Python", "FastAPI",
    "PostgreSQL", "Node.js", "Docker", "OpenAI API", "Google Gemini",
  ];

  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <div className="bento-grid">
        {/* Row 1-2: Hero + About + Hackathon */}
        <Card variant="gradient" className="col-span-2 row-span-2 flex flex-col justify-center min-h-[280px]">
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            {t.home.hero.greeting}
            <span className="blinking-dot">.</span>
          </h1>
          <p className="mt-4 text-lg text-white/80">
            {t.home.hero.tagline}
          </p>
        </Card>

        <Card variant="white" className="col-span-1 flex flex-col justify-center">
          <p className="text-gray-600 leading-relaxed text-sm">
            {t.home.about.intro}
          </p>
        </Card>

        <Card variant="coral" className="col-span-1 flex flex-col justify-center">
          <p className="text-4xl font-black mb-2">{t.home.hackathon.title}</p>
          <p className="text-white/80 text-sm leading-relaxed">
            {t.home.hackathon.events}
          </p>
        </Card>

        {/* Row 3: Tech Stack + Location + TikTok */}
        <Card variant="light-teal" className="col-span-2">
          <p className="text-sm font-medium text-teal-700 mb-3">{t.home.about.techStack}</p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="tech-pill bg-teal-500 text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </Card>

        <Card variant="white" className="col-span-1 flex flex-col justify-center items-center text-center">
          <span className="text-2xl mb-1" role="img" aria-label="Location">📍</span>
          <p className="font-semibold text-gray-900">{t.home.location}</p>
        </Card>

        <Card variant="coral" className="col-span-1 flex flex-col justify-center">
          <p className="text-2xl font-black">{t.home.tiktok.title}</p>
          <p className="text-white/80 text-sm">{t.home.tiktok.subtitle}</p>
        </Card>

        {/* Row 4: Featured Projects */}
        {projects.slice(0, 1).map((project) => (
          <Card key={project.id} variant="white" hoverable className="col-span-1">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{project.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 3).map((tech) => (
                <span key={tech} className="tech-tag px-2 py-0.5 text-xs font-mono bg-teal-50 text-teal-700 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        ))}

        {projects.slice(1, 2).map((project) => (
          <Card key={project.id} variant="white" hoverable className="col-span-3">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{project.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 5).map((tech) => (
                <span key={tech} className="tech-tag px-2 py-0.5 text-xs font-mono bg-teal-50 text-teal-700 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        ))}

        {/* Row 5: Featured Experiences */}
        {experiences.slice(0, 2).map((exp) => (
          <Card key={exp.id} variant="white" hoverable className="col-span-2">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                <p className="text-gray-500 text-sm">{exp.organization}</p>
              </div>
              <span className="text-xs text-gray-400 font-mono">{exp.period}</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{exp.impact}</p>
          </Card>
        ))}

        {/* Row 6: CTA Buttons */}
        <div className="col-span-4 flex flex-wrap gap-4 justify-center py-4">
          <ViewAllButton href="/projekte">{t.home.cta.projects}</ViewAllButton>
          <ViewAllButton href="/erfahrungen">{t.home.cta.experiences}</ViewAllButton>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds. (Note: the new translation keys from Task 6 must be present first.)

**Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: rewrite homepage as single bento grid with colored cards"
```

---

### Task 8: Rewrite Projekte Page as Bento Grid

**Files:**
- Modify: `app/projekte/page.tsx`

**Step 1: Replace entire file**

Per design spec: Dip = teal, Mindflayer = white, Airbn = coral span-2, Hundewelt = white span-2, Video Journal = white, Song Splitter = white.

```tsx
"use client";

import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import ProjectLink from "@/components/ProjectLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedProjects } from "@/hooks/useTranslatedData";

type CardVariant = "white" | "teal" | "coral" | "light-teal" | "light-coral" | "gradient";

const projectLayout: Record<string, { variant: CardVariant; span: string }> = {
  "proj-1": { variant: "teal", span: "col-span-1" },
  "proj-2": { variant: "white", span: "col-span-1" },
  "proj-3": { variant: "coral", span: "col-span-2" },
  "proj-4": { variant: "white", span: "col-span-2" },
  "proj-5": { variant: "white", span: "col-span-1" },
  "proj-6": { variant: "white", span: "col-span-1" },
};

export default function ProjektePage() {
  const { t } = useLanguage();
  const projects = useTranslatedProjects();

  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-12">
      <SectionHeading>{t.projects.heading}</SectionHeading>
      <p className="text-gray-500 text-lg mb-8 max-w-2xl">{t.projects.intro}</p>

      <div className="bento-grid">
        {projects.map((project) => {
          const layout = projectLayout[project.id] || { variant: "white" as CardVariant, span: "col-span-1" };
          const isColored = layout.variant === "teal" || layout.variant === "coral";

          return (
            <Card
              key={project.id}
              variant={layout.variant}
              hoverable
              className={`${layout.span} flex flex-col`}
            >
              <h3 className={`text-xl font-semibold mb-2 ${isColored ? "" : "text-gray-900"}`}>
                {project.title}
              </h3>
              <p className={`text-sm mb-4 leading-relaxed flex-grow line-clamp-3 ${isColored ? "text-white/80" : "text-gray-600"}`}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-0.5 text-xs font-mono rounded-full ${
                      isColored
                        ? "bg-white/20 text-white"
                        : "bg-teal-50 text-teal-700"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 text-sm font-medium">
                {project.demoUrl && (
                  <ProjectLink href={project.demoUrl} variant={isColored ? "secondary" : "primary"}>
                    {t.projects.viewDemo}
                  </ProjectLink>
                )}
                {project.repoUrl && (
                  <ProjectLink href={project.repoUrl} variant="secondary">
                    {t.projects.viewCode}
                  </ProjectLink>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
```

**Step 2: Update ProjectLink.tsx to handle white text variant**

Modify `components/ProjectLink.tsx` — add a `"light"` variant for use on colored cards:

```tsx
interface ProjectLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
}

export default function ProjectLink({ href, children, variant = "primary" }: ProjectLinkProps) {
  const colorClass = {
    primary: "text-teal-600 hover:text-teal-700",
    secondary: "text-gray-400 hover:text-gray-700",
    light: "text-white/80 hover:text-white",
  }[variant];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-1 font-medium transition-all duration-200 ${colorClass}`}
    >
      <span>{children}</span>
      <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
    </a>
  );
}
```

Wait — on re-reading the Projekte page code above, we're passing `variant={isColored ? "secondary" : "primary"}` for demoUrl links. We should use `"light"` for colored cards instead. Update the Projekte page code to use:

```tsx
<ProjectLink href={project.demoUrl} variant={isColored ? "light" : "primary"}>
```

and

```tsx
<ProjectLink href={project.repoUrl} variant={isColored ? "light" : "secondary"}>
```

**Step 3: Build check**

Run: `npm run build`

**Step 4: Commit**

```bash
git add app/projekte/page.tsx components/ProjectLink.tsx
git commit -m "feat: rewrite Projekte page as bento grid with colored hackathon cards"
```

---

### Task 9: Rewrite Erfahrungen Page as Bento Grid

**Files:**
- Modify: `app/erfahrungen/page.tsx`

**Step 1: Replace entire file**

Per design spec: Working Student = span-2 white teal-left-border, CTO = span-2 teal bg, Intern = span-2 white, Tutor = span-1 light-coral, Content Creator = span-1 coral bg.

```tsx
"use client";

import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedExperiences } from "@/hooks/useTranslatedData";

type CardVariant = "white" | "teal" | "coral" | "light-teal" | "light-coral" | "gradient";

const experienceLayout: Record<string, { variant: CardVariant; span: string; extraClass?: string }> = {
  "exp-1": { variant: "white", span: "col-span-2", extraClass: "border-l-4 border-l-teal-500" },
  "exp-2": { variant: "teal", span: "col-span-2" },
  "exp-3": { variant: "white", span: "col-span-2" },
  "exp-4": { variant: "light-coral", span: "col-span-1" },
  "exp-5": { variant: "coral", span: "col-span-1" },
};

export default function ErfahrungenPage() {
  const { t } = useLanguage();
  const experiences = useTranslatedExperiences();

  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-12">
      <SectionHeading>{t.experiences.heading}</SectionHeading>
      <p className="text-gray-500 text-lg mb-8 max-w-2xl">{t.experiences.intro}</p>

      <div className="bento-grid">
        {experiences.map((exp) => {
          const layout = experienceLayout[exp.id] || { variant: "white" as CardVariant, span: "col-span-1" };
          const isColored = layout.variant === "teal" || layout.variant === "coral";

          return (
            <Card
              key={exp.id}
              variant={layout.variant}
              hoverable
              className={`${layout.span} ${layout.extraClass || ""}`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <div>
                  <h3 className={`text-xl font-semibold mb-1 ${isColored ? "" : "text-gray-900"}`}>
                    {exp.role}
                  </h3>
                  <p className={`text-sm ${isColored ? "text-white/80" : "text-gray-500"}`}>
                    {exp.organization}
                  </p>
                </div>
                <span className={`text-xs font-mono whitespace-nowrap ${isColored ? "text-white/60" : "text-gray-400"}`}>
                  {exp.period}
                </span>
              </div>
              <p className={`text-sm leading-relaxed whitespace-pre-line ${isColored ? "text-white/80" : "text-gray-600"}`}>
                {exp.impact}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
```

**Step 2: Build check**

Run: `npm run build`

**Step 3: Commit**

```bash
git add app/erfahrungen/page.tsx
git commit -m "feat: rewrite Erfahrungen page as bento grid with colored role cards"
```

---

### Task 10: Rewrite Kontakt Page as Bento Grid

**Files:**
- Modify: `app/kontakt/page.tsx`

**Step 1: Replace entire file**

Per design: Email = teal bg span-2, LinkedIn = white span-1, GitHub = white span-1.

```tsx
"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";

export default function KontaktPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-12">
      <SectionHeading>{t.contact.heading}</SectionHeading>
      <p className="text-gray-500 text-lg mb-8 max-w-2xl">{t.contact.intro}</p>

      <div className="bento-grid">
        {/* Email - teal, span-2 */}
        <Card variant="teal" className="col-span-2">
          <h3 className="text-xl font-semibold mb-3">{t.contact.email.heading}</h3>
          <p className="text-white/80 mb-6">{t.contact.email.description}</p>
          <a
            href="mailto:namanh.bui2005@gmail.com"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium bg-white text-teal-700 hover:bg-teal-50 transition-all duration-200"
          >
            {t.contact.email.cta}
          </a>
        </Card>

        {/* LinkedIn - white, span-1 */}
        <Card variant="white" hoverable className="col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{t.contact.linkedin.heading}</h3>
            <p className="text-gray-600 text-sm mb-4">{t.contact.linkedin.description}</p>
          </div>
          <a
            href="https://www.linkedin.com/in/namanh-bui-vu-37b05a2a9/"
            target="_blank"
            rel="noopener noreferrer"
            className="animated-link text-teal-600 hover:text-teal-700 font-medium text-sm"
          >
            {t.contact.linkedin.cta}
          </a>
        </Card>

        {/* GitHub - white, span-1 */}
        <Card variant="white" hoverable className="col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{t.contact.github.heading}</h3>
            <p className="text-gray-600 text-sm mb-4">{t.contact.github.description}</p>
          </div>
          <a
            href="https://github.com/Namainchick"
            target="_blank"
            rel="noopener noreferrer"
            className="animated-link text-teal-600 hover:text-teal-700 font-medium text-sm"
          >
            {t.contact.github.cta}
          </a>
        </Card>
      </div>
    </div>
  );
}
```

**Step 2: Build check**

Run: `npm run build`

**Step 3: Commit**

```bash
git add app/kontakt/page.tsx
git commit -m "feat: rewrite Kontakt page as bento grid with teal email card"
```

---

### Task 11: Update Legal Pages (Impressum + Datenschutz)

**Files:**
- Modify: `app/impressum/page.tsx`
- Modify: `app/datenschutz/page.tsx`

**Step 1: Update Impressum**

Replace the outer wrapper to use beige bg + white content card:

```tsx
import SectionHeading from "@/components/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – Namanh Bui Vu",
  description: "Impressum und rechtliche Angaben.",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-12">
      <SectionHeading>Impressum</SectionHeading>

      <div className="max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
        <div className="text-gray-600 leading-relaxed space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Angaben gemäß § 5 TMG</h3>
            <p>
              Namanh Bui Vu
              <br />
              [Adresse]
              <br />
              [PLZ Ort]
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Kontakt</h3>
            <p>E-Mail: kontakt@namanh.dev</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Haftungsausschluss</h3>
            <p className="text-sm">
              Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Update Datenschutz**

Same pattern — white content card on beige bg:

```tsx
import SectionHeading from "@/components/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz – Namanh Bui Vu",
  description: "Datenschutzerklärung.",
};

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-12">
      <SectionHeading>Datenschutz</SectionHeading>

      <div className="max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
        <div className="text-gray-600 leading-relaxed space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Datenschutz auf einen Blick</h3>
            <p className="text-sm">
              Diese Website erhebt und speichert keine personenbezogenen Daten. Es werden keine
              Cookies verwendet und keine Analytics-Tools eingesetzt.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Hosting</h3>
            <p className="text-sm">
              Diese Website wird auf Vercel gehostet. Weitere Informationen zum Datenschutz bei
              Vercel findest du unter:{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 underline"
              >
                Vercel Privacy Policy
              </a>
              .
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Kontaktaufnahme</h3>
            <p className="text-sm">
              Bei Kontaktaufnahme per E-Mail werden die übermittelten Daten ausschließlich zur
              Bearbeitung deiner Anfrage verwendet und nicht an Dritte weitergegeben.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">4. Deine Rechte</h3>
            <p className="text-sm">
              Du hast das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der
              Verarbeitung deiner gespeicherten Daten, sowie ein Widerspruchsrecht gegen die
              Verarbeitung und ein Recht auf Datenübertragbarkeit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 3: Build check**

Run: `npm run build`

**Step 4: Commit**

```bash
git add app/impressum/page.tsx app/datenschutz/page.tsx
git commit -m "style: update legal pages with white card on beige background"
```

---

### Task 12: Build Verification & CLAUDE.md Update

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Full build check**

Run: `npm run build`
Expected: Build succeeds with no errors (the pre-existing lint warning in LanguageContext.tsx is known and unrelated).

**Step 2: Dev server visual check**

Run: `npm run dev`
Verify in browser:
- Homepage: single bento grid, gradient hero card, coral hackathon badge, teal tech stack pills, coral TikTok stats
- Projekte: bento grid, Dip=teal card, Airbn=coral card spanning 2 cols
- Erfahrungen: bento grid, CTO=teal card, Content Creator=coral
- Kontakt: bento grid, Email=teal card
- Footer: dark teal bg
- Nav: pill-style active links
- Background: warm beige everywhere

**Step 3: Update CLAUDE.md styling section**

Replace the `### Styling` section with:

```markdown
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
```

**Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with Warm Bento theme description"
```

---

## Summary

| Task | Files | Description |
|------|-------|-------------|
| 1 | tailwind.config.ts, globals.css | Color palette + bento grid CSS |
| 2 | Card.tsx | 6-variant card component |
| 3 | Nav.tsx | Pill active links, beige bg |
| 4 | Footer.tsx | Dark teal background |
| 5 | Button, SectionHeading, ViewAllButton, LanguageSwitcher | Pill shapes, simplified |
| 6 | de.json, en.json | New translation keys |
| 7 | page.tsx | Homepage bento grid |
| 8 | projekte/page.tsx, ProjectLink.tsx | Projects bento grid |
| 9 | erfahrungen/page.tsx | Experiences bento grid |
| 10 | kontakt/page.tsx | Contact bento grid |
| 11 | impressum, datenschutz | White card on beige |
| 12 | CLAUDE.md | Documentation update |
