# Light Theme Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the dark glassmorphism theme with a light, warm, bold "Fresh Bold" design using Teal/Emerald accents and layered soft shadows.

**Architecture:** Pure styling overhaul — no structural, routing, or i18n changes. Every component and page file needs color/shadow updates. The core change flows from `tailwind.config.ts` → `globals.css` → components → pages.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS, TypeScript

**No tests exist in this project.** Verification is `npm run build` + `npm run lint`.

---

### Task 1: Update Tailwind config and CSS variables

**Files:**
- Modify: `tailwind.config.ts` (entire colors object)
- Modify: `app/globals.css` (full rewrite)

**Step 1: Update `tailwind.config.ts`**

Replace the colors object:

```ts
colors: {
  background: "#FAFAF8",
  foreground: "#1A1A1A",
  accent: "#0D9488",
  "accent-light": "#CCFBF1",
  "accent-dark": "#0F766E",
  muted: "#6B7280",
  border: "#E5E7EB",
  "card-bg": "#FFFFFF",
},
```

**Step 2: Rewrite `app/globals.css`**

Replace the entire file with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Light Theme */
:root {
  --background: #FAFAF8;
  --foreground: #1A1A1A;
  --accent: #0D9488;
  --accent-light: #CCFBF1;
  --accent-dark: #0F766E;
  --border: #E5E7EB;
  --card-bg: #FFFFFF;
  --card-shadow: rgba(0, 0, 0, 0.06);
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
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-inter), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Tech Stack Tags */
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
  color: #0D9488;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

/* prefers-reduced-motion respektieren */
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

/* Fokus-Ringe */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Link Styles */
a {
  color: inherit;
  text-decoration: none;
  transition: color 150ms ease;
}

/* Animierte Link-Underlines */
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

**Step 3: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: update color palette and globals to light teal theme"
```

---

### Task 2: Update layout and remove hairline gradient

**Files:**
- Modify: `app/layout.tsx:62-66`

**Step 1: Remove the hairline gradient div**

In `app/layout.tsx`, remove:
```tsx
{/* Hairline Gradient */}
<div className="hairline-gradient" aria-hidden="true" />
```

The layout body should become:
```tsx
<body className="antialiased">
  <LanguageProvider>
    <Nav />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </LanguageProvider>
</body>
```

**Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: remove dark hairline gradient from layout"
```

---

### Task 3: Update Card component

**Files:**
- Modify: `components/Card.tsx` (full rewrite)

**Step 1: Rewrite Card.tsx**

```tsx
"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({ children, className = "", hoverable = false }: CardProps) {
  const hoverStyles = hoverable
    ? "hover:border-teal-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    : "";

  return (
    <article
      className={`
        rounded-2xl border border-gray-200 bg-white p-6 md:p-8
        shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.06)]
        ${hoverStyles}
        ${className}
      `}
      tabIndex={hoverable ? 0 : undefined}
    >
      {children}
    </article>
  );
}
```

Key changes: removed all inline `style` props, `onMouseEnter`/`onMouseLeave` handlers, `backdrop-blur`, glassmorphism references. Pure Tailwind classes now.

**Step 2: Commit**

```bash
git add components/Card.tsx
git commit -m "feat: replace glassmorphism card with soft-shadow light card"
```

---

### Task 4: Update Nav component

**Files:**
- Modify: `components/Nav.tsx` (full rewrite)

**Step 1: Rewrite Nav.tsx**

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
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-[#FAFAF8]/80 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <nav className="mx-auto w-full max-w-[95%] px-2 md:px-3 lg:px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo + Navigation */}
          <div className="flex items-center gap-6">
            {/* Logo/Name */}
            <Link href="/" className="group">
              <span className="text-lg font-semibold tracking-tight text-gray-900 hover:text-teal-600 transition-colors duration-200">
                Namanh
              </span>
            </Link>

            {/* Navigation Links */}
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        relative px-3 py-2 text-sm font-medium transition-all duration-150
                        ${isActive ? "text-teal-600" : "text-gray-500 hover:text-gray-900"}
                      `}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Language Switcher + Social Links */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <a
              href="https://www.linkedin.com/in/namanh-bui-vu-37b05a2a9/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-teal-600 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Namainchick"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-teal-600 transition-colors duration-200"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="mailto:namanh.bui2005@gmail.com"
              className="text-sm text-gray-400 hover:text-teal-600 transition-colors duration-200"
              aria-label="E-Mail"
            >
              Mail
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
```

Key changes: removed inline `style` prop with glow shadow, changed `bg-[#0a0a0a]/70` → `bg-[#FAFAF8]/80`, `border-white/10` → `border-gray-200`, all `#4f46e5` → teal, `text-gray-300` → `text-gray-500`, removed `textShadow` from active links. Nav still uses `backdrop-blur-md` for the sticky scroll effect (this is functional blur, not decorative glassmorphism).

**Step 2: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: update nav to light teal theme"
```

---

### Task 5: Update Button, SectionHeading, ViewAllButton, ProjectLink, LanguageSwitcher

**Files:**
- Modify: `components/Button.tsx`
- Modify: `components/SectionHeading.tsx`
- Modify: `components/ViewAllButton.tsx`
- Modify: `components/ProjectLink.tsx`
- Modify: `components/LanguageSwitcher.tsx`

**Step 1: Rewrite `components/Button.tsx`**

```tsx
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
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
    "inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF8]";

  const variants = {
    primary:
      "bg-teal-600 text-white hover:bg-teal-700 shadow-[0_4px_14px_rgba(13,148,136,0.3)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.4)] active:scale-[0.98]",
    secondary:
      "border border-gray-200 bg-white text-gray-700 hover:border-teal-300 hover:text-teal-600 active:scale-[0.98] shadow-sm",
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

**Step 2: Rewrite `components/SectionHeading.tsx`**

```tsx
import { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

export default function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <div className={`flex items-center gap-6 mb-12 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight whitespace-nowrap text-gray-900">
        {children}
      </h2>
      <div
        className="h-[2px] flex-1 max-w-[50%] bg-gradient-to-r from-teal-500 via-teal-200 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
```

**Step 3: Rewrite `components/ViewAllButton.tsx`**

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
      className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-700 bg-white border border-gray-200 hover:border-teal-300 hover:text-teal-600 transition-all duration-200 shadow-sm hover:shadow-md"
    >
      <span>{children}</span>
      <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
    </Link>
  );
}
```

**Step 4: Rewrite `components/ProjectLink.tsx`**

```tsx
interface ProjectLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function ProjectLink({ href, children, variant = "primary" }: ProjectLinkProps) {
  const isPrimary = variant === "primary";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-1 font-medium transition-all duration-200 ${
        isPrimary ? "text-teal-600 hover:text-teal-700" : "text-gray-400 hover:text-gray-700"
      }`}
    >
      <span>{children}</span>
      <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
    </a>
  );
}
```

**Step 5: Rewrite `components/LanguageSwitcher.tsx`**

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
      className="text-sm font-medium text-gray-400 hover:text-teal-600 transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-teal-50"
      aria-label="Switch language"
    >
      {language === "de" ? "EN" : "DE"}
    </button>
  );
}
```

**Step 6: Commit**

```bash
git add components/Button.tsx components/SectionHeading.tsx components/ViewAllButton.tsx components/ProjectLink.tsx components/LanguageSwitcher.tsx
git commit -m "feat: update all UI components to light teal theme"
```

---

### Task 6: Update Footer

**Files:**
- Modify: `components/Footer.tsx`

**Step 1: Rewrite `components/Footer.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="mt-32 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-gray-400">
            {t.footer.copyright} {currentYear}
          </p>

          {/* Rechtliches */}
          <div className="flex gap-6 text-sm">
            <Link
              href="/impressum"
              className="text-gray-400 hover:text-teal-600 transition-colors duration-200"
            >
              {t.footer.imprint}
            </Link>
            <Link
              href="/datenschutz"
              className="text-gray-400 hover:text-teal-600 transition-colors duration-200"
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
git commit -m "feat: update footer to light theme"
```

---

### Task 7: Update Home page

**Files:**
- Modify: `app/page.tsx`

**Step 1: Rewrite `app/page.tsx`**

```tsx
"use client";

import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import ViewAllButton from "@/components/ViewAllButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedExperiences, useTranslatedProjects } from "@/hooks/useTranslatedData";

export default function Home() {
  const { t } = useLanguage();
  const experiences = useTranslatedExperiences();
  const projects = useTranslatedProjects();
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col justify-center items-center py-20 md:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Decorative Line */}
          <div
            className="w-64 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent mb-8 mx-auto"
            aria-hidden="true"
          />

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-[1.1] text-gray-900">
            {t.home.hero.greeting}
            <span className="blinking-dot">.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            {t.home.hero.tagline}
          </p>

          <a
            href="mailto:namanh.bui2005@gmail.com"
            className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-medium text-white bg-teal-600 hover:bg-teal-700 shadow-[0_4px_14px_rgba(13,148,136,0.3)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.4)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF8]"
          >
            {t.home.hero.cta}
          </a>
        </div>
      </section>

      {/* Über mich */}
      <section className="py-20">
        <SectionHeading>{t.home.about.heading}</SectionHeading>

        <div>
          <Card>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg">
                {t.home.about.intro}
              </p>

              <p>
                {t.home.about.passion}
              </p>

              <div>
                <p className="mb-3 text-gray-400 text-sm font-medium">{t.home.about.techStack}</p>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'React', 'Python', 'PostgreSQL', 'C++', 'Next.js', 'TypeScript', 'Node.js'].map((tech) => (
                    <span
                      key={tech}
                      className="tech-tag px-3 py-1 text-xs font-mono bg-teal-50 text-teal-700 border border-teal-200 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <p>
                {t.home.about.hobbies}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Teaser: Erfahrungen */}
      <section className="py-20">
        <SectionHeading>{t.home.experiences.heading}</SectionHeading>

        <div className="grid gap-6 md:gap-8 mb-8">
          {experiences.slice(0, 2).map((exp) => (
            <Card key={exp.id} hoverable>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-gray-900">{exp.role}</h3>
                  <p className="text-gray-500">{exp.organization}</p>
                </div>
                <span className="text-sm text-gray-400 font-mono md:text-right">
                  {exp.period}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">{exp.impact}</p>
            </Card>
          ))}
        </div>

        <ViewAllButton href="/erfahrungen">
          {t.home.experiences.viewAll}
        </ViewAllButton>
      </section>

      {/* Teaser: Projekte */}
      <section className="py-20">
        <SectionHeading>{t.home.projects.heading}</SectionHeading>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
          {projects.slice(0, 2).map((project) => (
            <Card key={project.id} hoverable>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{project.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="tech-tag px-3 py-1 text-xs font-mono bg-teal-50 text-teal-700 border border-teal-200 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <ViewAllButton href="/projekte">
          {t.home.projects.viewAll}
        </ViewAllButton>
      </section>
    </div>
  );
}
```

Key changes: all `text-gray-300` → `text-gray-600`, `text-gray-400` → `text-gray-500`/`text-gray-400`, `text-gray-500` → `text-gray-400`, headings get `text-gray-900`. Hero: `text-5xl md:text-7xl font-bold` → `text-6xl md:text-8xl font-extrabold`. CTA: `glass-button` → solid `bg-teal-600`. Tech tags: `bg-white/[0.03] border-white/10` → `bg-teal-50 text-teal-700 border-teal-200`. Removed all inline `style` props.

**Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: update home page to light teal theme"
```

---

### Task 8: Update Erfahrungen page

**Files:**
- Modify: `app/erfahrungen/page.tsx`

**Step 1: Rewrite `app/erfahrungen/page.tsx`**

```tsx
"use client";

import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedExperiences } from "@/hooks/useTranslatedData";

export default function ErfahrungenPage() {
  const { t } = useLanguage();
  const experiences = useTranslatedExperiences();
  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12 py-20">
      <SectionHeading>{t.experiences.heading}</SectionHeading>

      <p className="text-gray-500 text-lg mb-12 max-w-2xl">
        {t.experiences.intro}
      </p>

      {/* Stack von Karten */}
      <div className="grid gap-6 md:gap-8 max-w-3xl">
        {experiences.map((exp) => (
          <Card key={exp.id} hoverable>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-1 text-gray-900">{exp.role}</h3>
                <p className="text-gray-500 text-lg">{exp.organization}</p>
              </div>
              <span className="text-sm text-gray-400 font-mono md:text-right whitespace-nowrap">
                {exp.period}
              </span>
            </div>
            <div className="border-l-2 border-teal-500 pl-4">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{exp.impact}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

Key changes: `text-gray-300` → `text-gray-500`/`text-gray-600`, `border-[#4f46e5]` → `border-teal-500`, removed inline glow `style` on border-left, headings get `text-gray-900`.

**Step 2: Commit**

```bash
git add app/erfahrungen/page.tsx
git commit -m "feat: update erfahrungen page to light theme"
```

---

### Task 9: Update Projekte page

**Files:**
- Modify: `app/projekte/page.tsx`

**Step 1: Rewrite `app/projekte/page.tsx`**

```tsx
"use client";

import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import ProjectLink from "@/components/ProjectLink";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedProjects } from "@/hooks/useTranslatedData";

export default function ProjektePage() {
  const { t } = useLanguage();
  const projects = useTranslatedProjects();
  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12 py-20">
      <SectionHeading>{t.projects.heading}</SectionHeading>

      <p className="text-gray-500 text-lg mb-12 max-w-2xl">
        {t.projects.intro}
      </p>

      {/* Projekt-Grid */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project) => (
          <Card key={project.id} hoverable className="flex flex-col">
            {/* Optional: Bild */}
            {project.imageUrl && (
              <div className="relative w-full h-48 mb-6 -mt-2 -mx-2 rounded-t-2xl overflow-hidden bg-gray-100">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900">{project.title}</h3>
            <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="tech-tag px-3 py-1 text-xs font-mono bg-teal-50 text-teal-700 border border-teal-200 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4 text-sm font-medium">
              {project.demoUrl && (
                <ProjectLink href={project.demoUrl} variant="primary">
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
        ))}
      </div>
    </div>
  );
}
```

Key changes: `text-gray-300` → `text-gray-500`/`text-gray-600`, `bg-white/5` → `bg-gray-100`, tech tags: `bg-teal-50 text-teal-700 border-teal-200`, headings: `text-gray-900`.

**Step 2: Commit**

```bash
git add app/projekte/page.tsx
git commit -m "feat: update projekte page to light theme"
```

---

### Task 10: Update Kontakt, Impressum, Datenschutz pages

**Files:**
- Modify: `app/kontakt/page.tsx`
- Modify: `app/impressum/page.tsx`
- Modify: `app/datenschutz/page.tsx`

**Step 1: Rewrite `app/kontakt/page.tsx`**

```tsx
"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";

export default function KontaktPage() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12 py-20">
      <SectionHeading>{t.contact.heading}</SectionHeading>

      <div className="max-w-2xl">
        <p className="text-gray-500 text-lg mb-12 leading-relaxed">
          {t.contact.intro}
        </p>

        {/* E-Mail */}
        <Card className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">{t.contact.email.heading}</h3>
          <p className="text-gray-600 mb-6">
            {t.contact.email.description}
          </p>
          <Button href="mailto:kontakt@namanh.dev">
            {t.contact.email.cta}
          </Button>
        </Card>

        {/* Social Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card hoverable>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">{t.contact.linkedin.heading}</h3>
            <p className="text-gray-600 mb-4">
              {t.contact.linkedin.description}
            </p>
            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              className="animated-link text-teal-600 hover:text-teal-700 font-medium"
            >
              {t.contact.linkedin.cta}
            </a>
          </Card>

          <Card hoverable>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">{t.contact.github.heading}</h3>
            <p className="text-gray-600 mb-4">
              {t.contact.github.description}
            </p>
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="animated-link text-teal-600 hover:text-teal-700 font-medium"
            >
              {t.contact.github.cta}
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Rewrite `app/impressum/page.tsx`**

```tsx
import SectionHeading from "@/components/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – Namanh Bui Vu",
  description: "Impressum und rechtliche Angaben.",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12 py-20">
      <SectionHeading>Impressum</SectionHeading>

      <div className="max-w-2xl prose prose-gray">
        <p className="text-gray-500 mb-8">
          {/* TODO: Inhalt ergänzen – Rechtliche Pflichtangaben nach §5 TMG */}
        </p>

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
            <p>
              E-Mail: kontakt@namanh.dev
            </p>
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

**Step 3: Rewrite `app/datenschutz/page.tsx`**

```tsx
import SectionHeading from "@/components/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz – Namanh Bui Vu",
  description: "Datenschutzerklärung.",
};

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12 py-20">
      <SectionHeading>Datenschutz</SectionHeading>

      <div className="max-w-2xl prose prose-gray">
        <p className="text-gray-500 mb-8">
          {/* TODO: Inhalt ergänzen – Datenschutzerklärung nach DSGVO */}
        </p>

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

Key changes across all three: `prose-invert` → `prose-gray`, `text-gray-300` → `text-gray-500`/`text-gray-600`, `text-white` → `text-gray-900`, `#4f46e5` → `text-teal-600`, removed glow drop-shadows.

**Step 4: Commit**

```bash
git add app/kontakt/page.tsx app/impressum/page.tsx app/datenschutz/page.tsx
git commit -m "feat: update kontakt, impressum, datenschutz to light theme"
```

---

### Task 11: Build verification

**Step 1: Run lint**

Run: `npm run lint`
Expected: No errors

**Step 2: Run build**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 3: Commit any fixes if needed**

If lint/build reveals issues, fix them and commit.

---

### Task 12: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Update the Styling section**

Replace the Styling section to reflect the new light theme:

```markdown
### Styling

- Light theme: background `#FAFAF8` (warm off-white), text `#1A1A1A`, accent `#0D9488` (teal)
- Layered soft shadows on cards (no glassmorphism)
- Custom colors defined in `tailwind.config.ts`
- Fonts: Inter (sans) and JetBrains Mono (mono) via `next/font`
- Global animations in `app/globals.css`
```

**Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md to reflect light theme"
```
