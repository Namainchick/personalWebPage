# Expandable Fullscreen Cards — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make all Bento-Grid cards expandable with Framer Motion layoutId animations, showing detailed content (images, descriptions, links, learnings) in a fullscreen overlay.

**Architecture:** New `ExpandableCard` client component wraps the existing `Card` component and uses Framer Motion `layoutId` + `AnimatePresence` to animate between grid position and fullscreen overlay. Data models are extended with detail fields. Pages become client components to support interactivity.

**Tech Stack:** Next.js 16, React 19, Framer Motion, TypeScript, Tailwind CSS

**Note:** This project has no test suite configured. Skip TDD steps. Verify visually with `npm run dev`.

---

### Task 1: Install Framer Motion

**Files:**
- Modify: `package.json`

**Step 1: Install the package**

Run: `npm install framer-motion`

**Step 2: Verify installation**

Run: `npm run build`
Expected: Build succeeds without errors.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install framer-motion dependency"
```

---

### Task 2: Extend Project data model

**Files:**
- Modify: `data/projects.ts`

**Step 1: Update the Project interface**

In `data/projects.ts`, add new optional fields to the `Project` interface:

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
  // Detail view fields
  longDescription?: string;
  images?: string[];
  learnings?: string;
  highlights?: string[];
}
```

Fields are optional so existing data doesn't break.

**Step 2: Add detail content to each project**

Add `longDescription`, `images`, `learnings`, and `highlights` to each project in the `projects` array. Example for proj-1:

```typescript
{
  id: "proj-1",
  title: "Dip – Give LLMs Eyes",
  description: "1. Platz, Google DeepMind Gemini Track – ...",
  techStack: ["Python", "Google Gemini API", "Screen Capture"],
  longDescription: "Dip entstand beim Cursor AI Hackathon Hamburg im Februar 2026 mit über 400 Teilnehmern. Das Tool gibt LLMs visuellen Echtzeit-Kontext, indem es den Bildschirm des Nutzers erfasst und als Kontext an das Modell übergibt. So entfällt die manuelle Beschreibung von On-Screen-Inhalten komplett.\n\nDie Architektur basiert auf einem Python-Backend, das Screen Captures über die Google Gemini API verarbeitet. Ein leichtgewichtiger Client erfasst den Bildschirminhalt und sendet ihn an den LLM-Kontext.",
  highlights: [
    "1. Platz Google DeepMind Gemini Track",
    "400+ Teilnehmer beim Cursor AI Hackathon Hamburg",
    "Echtzeit-Bildschirmerfassung als LLM-Kontext",
    "Eliminiert manuelle Beschreibung von Bildschirminhalten"
  ],
  learnings: "Gelernt, wie man multimodale KI-Modelle effizient mit Echtzeit-Bilddaten füttert und dabei Latenz minimiert. Erfahrung mit Screen-Capture-APIs und der Gemini Vision API.",
  images: [],
},
```

Repeat for all 6 projects with appropriate German content.

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add data/projects.ts
git commit -m "feat: extend Project data model with detail fields"
```

---

### Task 3: Extend Experience data model

**Files:**
- Modify: `data/experiences.ts`

**Step 1: Update the Experience interface**

```typescript
export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  impact: string;
  // Detail view fields
  longDescription?: string;
  achievements?: string[];
  skills?: string[];
}
```

**Step 2: Add detail content to each experience**

Add `longDescription`, `achievements`, and `skills` to each experience. Example for exp-1:

```typescript
{
  id: "exp-1",
  role: "Werkstudent – KI Automation",
  organization: "Position One GmbH",
  period: "Okt. 2025 – Heute",
  impact: "Entwicklung von Full-Stack KI-Anwendungen...",
  longDescription: "Als Werkstudent bei Position One entwickle ich Full-Stack KI-Anwendungen für interne und kundenseitige Produkte. Ich arbeite an der gesamten Pipeline – vom React-Frontend über Python-Backends bis zur PostgreSQL-Datenbank.\n\nEin Schwerpunkt liegt auf dem Aufbau von Multi-Level KI-Agenten mit der OpenAI API und n8n-Workflows für Automatisierung. Zusätzlich führe ich KI-Workshops durch, sowohl intern als auch für Kunden.",
  achievements: [
    "Entwicklung KI-generierter Affiliate E-Commerce Shops",
    "Aufbau von Multi-Level KI-Agenten-Systemen",
    "Durchführung von KI-Workshops für interne und externe Teams"
  ],
  skills: ["React", "TailwindCSS", "Python", "PostgreSQL", "OpenAI API", "n8n"],
},
```

Repeat for all 5 experiences.

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add data/experiences.ts
git commit -m "feat: extend Experience data model with detail fields"
```

---

### Task 4: Create homepage card details data

**Files:**
- Create: `data/homepage-details.ts`

**Step 1: Create the file with CardDetail interface and data**

```typescript
export interface CardDetail {
  id: string;
  title: string;
  content: string;
  images?: string[];
  links?: { label: string; href: string }[];
}

export const homepageDetails: Record<string, CardDetail> = {
  hero: {
    id: "hero",
    title: "Hi, ich bin Namanh",
    content: "Ich bin 20 Jahre alt und studiere Computer Science an der Technischen Universität Hamburg. Nebenbei arbeite ich als Werkstudent im Bereich KI-Automation bei Position One GmbH und baue als CTO ein Startup für Studierende.\n\nMeine Leidenschaft liegt in der Entwicklung von KI-gestützten Anwendungen. Bei drei Hackathons habe ich jeweils den ersten Platz gewonnen – in Hamburg, Berlin und remote.",
  },
  location: {
    id: "location",
    title: "TUHH, Hamburg",
    content: "Ich studiere Computer Science (B.Sc.) an der Technischen Universität Hamburg (TUHH). Hamburg ist meine Basis für Studium, Arbeit und die Tech-Community.",
  },
  tiktok: {
    id: "tiktok",
    title: "50k+ Follower auf TikTok",
    content: "Als Tech Creator auf TikTok erreiche ich über 50.000 Follower und mehr als 20 Millionen Views. Ich erstelle Content über Programmierung, KI und das Informatik-Studium.\n\nDurch das TikTok Creator Program generiere ich Einnahmen und habe eine Community aufgebaut, die sich für Tech-Themen begeistert.",
    links: [{ label: "TikTok Profil", href: "https://tiktok.com/@namainchick" }],
  },
  techStack: {
    id: "techStack",
    title: "Mein Tech Stack",
    content: "Mein Fokus liegt auf modernen Web-Technologien und KI-Integration:\n\n• Frontend: React, Next.js, TypeScript, TailwindCSS\n• Backend: Python, FastAPI, Node.js\n• Datenbanken: PostgreSQL, Supabase\n• KI/ML: OpenAI API, Google Gemini, LangGraph\n• DevOps: Docker, Vercel, n8n",
  },
  about: {
    id: "about",
    title: "Über mich",
    content: "Moin! Ich bin Namanh, 20 Jahre alt und studiere Computer Science an der TUHH. Nebenbei arbeite ich als Werkstudent im Bereich KI-Automation und baue als CTO ein Startup.\n\nMeine Leidenschaft liegt in der Entwicklung von KI-gestützten Anwendungen und modernen Web-Technologien. Bei drei Hackathons habe ich jeweils den ersten Platz gewonnen.\n\nAußerhalb der Arbeit mache ich Calisthenics, spiele in meiner Band und erstelle Tech-Content auf TikTok.",
  },
  hackathon: {
    id: "hackathon",
    title: "3x 1. Platz bei Hackathons",
    content: "Ich habe bei drei verschiedenen Hackathons den ersten Platz gewonnen:\n\n1. Cursor AI Hackathon Hamburg (Feb 2026, 400+ Teilnehmer) – Google DeepMind Gemini Track mit 'Dip'\n2. CodeRabbit × Windsurf Hackathon (Dez 2025, 110 Teilnehmer) – Overall Winner mit 'Mindflayer' ($2.000 Preisgeld)\n3. {Tech: Europe} Hackathon Berlin (Jan 2026) – Arbio Track Winner mit 'Airbn'",
  },
  mission: {
    id: "mission",
    title: "Meine Mission",
    content: "Ich baue KI-Apps, die echte Probleme lösen. Mein Ziel ist es, KI-Technologie zugänglich und nützlich zu machen – nicht als Spielerei, sondern als Werkzeug, das den Alltag verbessert.\n\nOb Automatisierung, Content-Generierung oder Echtzeit-Analyse – ich suche immer nach Wegen, wie KI konkret helfen kann.",
  },
  hobbies: {
    id: "hobbies",
    title: "Hobbies",
    content: "🏋️ Calisthenics – Bodyweight-Training ist mein Ausgleich zum Programmieren. Ich trainiere regelmäßig und arbeite an fortgeschrittenen Skills.\n\n🎸 Band – Ich spiele in einer Band und liebe es, Musik zu machen.\n\n📱 Tech Content – Auf TikTok erstelle ich Content über Programmierung, KI und das Informatik-Studium.",
  },
  emailCta: {
    id: "emailCta",
    title: "Kontakt",
    content: "Schreib mir gerne eine E-Mail – ich freue mich über Nachrichten zu Projekten, Zusammenarbeit oder einfach zum Austausch.",
    links: [{ label: "E-Mail schreiben", href: "mailto:namanh.bui2005@gmail.com" }],
  },
};
```

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add data/homepage-details.ts
git commit -m "feat: add homepage card detail content"
```

---

### Task 5: Add translations for new detail fields

**Files:**
- Modify: `translations/de.json`
- Modify: `translations/en.json`

**Step 1: Add project detail translations to de.json**

In the `projectsData` section of `de.json`, add `longDescription`, `highlights`, and `learnings` to each project entry. The German content from `data/projects.ts` serves as the base — the de.json values match the base data.

**Step 2: Add project detail translations to en.json**

Same structure, but with English translations for all new fields.

**Step 3: Add experience detail translations to both files**

In the `experiencesData` section, add `longDescription`, `achievements`, and `skills` to each entry in both `de.json` and `en.json`.

**Step 4: Add homepage detail translations**

Add a new `homepageDetailsData` section to both `de.json` and `en.json` with translated `title` and `content` for each homepage card (hero, location, tiktok, techStack, about, hackathon, mission, hobbies, emailCta).

**Step 5: Update i18n translation functions**

Modify `lib/i18n.ts`:
- Update `getTranslatedProjects()` to also overlay `longDescription`, `highlights`, `learnings`
- Update `getTranslatedExperiences()` to also overlay `longDescription`, `achievements`, `skills`
- Add new `getTranslatedHomepageDetails()` function

**Step 6: Verify build**

Run: `npm run build`

**Step 7: Commit**

```bash
git add translations/de.json translations/en.json lib/i18n.ts
git commit -m "feat: add translations for card detail fields"
```

---

### Task 6: Export CardVariant type from Card component

**Files:**
- Modify: `components/Card.tsx`

**Step 1: Export the CardVariant type**

Change line 3 from:
```typescript
type CardVariant = "white" | "teal" | "coral" | "light-teal" | "light-coral" | "gradient";
```
to:
```typescript
export type CardVariant = "white" | "teal" | "coral" | "light-teal" | "light-coral" | "gradient";
```

Also export `variantStyles` so `ExpandableCard` can reuse variant colors:
```typescript
export const variantStyles: Record<CardVariant, string> = { ... };
```

**Step 2: Commit**

```bash
git add components/Card.tsx
git commit -m "refactor: export CardVariant type and variantStyles from Card"
```

---

### Task 7: Create the ExpandableCard component

**Files:**
- Create: `components/ExpandableCard.tsx`

This is the core component. It wraps any card content and adds expand/collapse behavior.

**Step 1: Create the component**

```typescript
"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { CardVariant, variantStyles } from "@/components/Card";

interface ExpandableCardProps {
  id: string;
  children: ReactNode;
  expandedContent: ReactNode;
  variant?: CardVariant;
  className?: string;
}

export default function ExpandableCard({
  id,
  children,
  expandedContent,
  variant = "white",
  className = "",
}: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const hoverStyles = "hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-pointer";

  return (
    <>
      {/* Card in grid */}
      <motion.article
        layoutId={`card-${id}`}
        onClick={() => setIsOpen(true)}
        className={`rounded-2xl p-6 ${variantStyles[variant]} ${hoverStyles} ${className} relative`}
        style={{ zIndex: isOpen ? 50 : 1 }}
      >
        {children}
        {/* Expand hint icon */}
        <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-current/40 text-xs pointer-events-none">
          ↗
        </span>
      </motion.article>

      {/* Expanded overlay via portal */}
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={close}
                  className="fixed inset-0 bg-black/50 z-40"
                />

                {/* Expanded card */}
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none">
                  <motion.article
                    layoutId={`card-${id}`}
                    className={`rounded-3xl p-6 md:p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto ${variantStyles[variant]} relative`}
                  >
                    {/* Close button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); close(); }}
                      className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors text-current"
                      aria-label="Close"
                    >
                      ✕
                    </button>

                    {/* Expanded content with stagger fade */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      {expandedContent}
                    </motion.div>
                  </motion.article>
                </div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
```

**Step 2: Verify build**

Run: `npm run dev` and check in browser that the component renders without errors.

**Step 3: Commit**

```bash
git add components/ExpandableCard.tsx
git commit -m "feat: create ExpandableCard component with Framer Motion"
```

---

### Task 8: Create expanded content sub-components

**Files:**
- Create: `components/expanded/ProjectExpanded.tsx`
- Create: `components/expanded/ExperienceExpanded.tsx`
- Create: `components/expanded/HomepageCardExpanded.tsx`

**Step 1: Create ProjectExpanded**

Renders the expanded view for a project card: title, long description, image gallery, tech stack, highlights, learnings, links.

```typescript
"use client";

import type { Project } from "@/data/projects";
import ProjectLink from "@/components/ProjectLink";

interface ProjectExpandedProps {
  project: Project;
  isColored: boolean;
  viewDemoLabel: string;
  viewCodeLabel: string;
}

export default function ProjectExpanded({ project, isColored, viewDemoLabel, viewCodeLabel }: ProjectExpandedProps) {
  const textClass = isColored ? "text-white/80" : "text-gray-600";
  const headingClass = isColored ? "text-white" : "text-gray-900";

  return (
    <div className="space-y-6">
      {/* Title */}
      <h2 className={`text-3xl font-bold ${headingClass}`}>{project.title}</h2>

      {/* Images */}
      {project.images && project.images.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {project.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.title} screenshot ${i + 1}`}
              className="rounded-xl max-h-64 object-cover flex-shrink-0"
            />
          ))}
        </div>
      )}

      {/* Long description */}
      {project.longDescription && (
        <p className={`text-base leading-relaxed whitespace-pre-line ${textClass}`}>
          {project.longDescription}
        </p>
      )}

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <div>
          <h3 className={`text-lg font-semibold mb-2 ${headingClass}`}>Highlights</h3>
          <ul className={`list-disc list-inside space-y-1 text-sm ${textClass}`}>
            {project.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tech Stack */}
      <div>
        <h3 className={`text-lg font-semibold mb-2 ${headingClass}`}>Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className={`px-3 py-1 text-sm font-mono rounded-full ${
                isColored ? "bg-white/20 text-white" : "bg-teal-50 text-teal-700"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Learnings */}
      {project.learnings && (
        <div>
          <h3 className={`text-lg font-semibold mb-2 ${headingClass}`}>Learnings</h3>
          <p className={`text-sm leading-relaxed ${textClass}`}>{project.learnings}</p>
        </div>
      )}

      {/* Links */}
      <div className="flex gap-4 text-sm font-medium pt-2">
        {project.demoUrl && (
          <ProjectLink href={project.demoUrl} variant={isColored ? "light" : "primary"}>
            {viewDemoLabel}
          </ProjectLink>
        )}
        {project.repoUrl && (
          <ProjectLink href={project.repoUrl} variant={isColored ? "light" : "secondary"}>
            {viewCodeLabel}
          </ProjectLink>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Create ExperienceExpanded**

```typescript
"use client";

import type { Experience } from "@/data/experiences";

interface ExperienceExpandedProps {
  experience: Experience;
  isColored: boolean;
}

export default function ExperienceExpanded({ experience, isColored }: ExperienceExpandedProps) {
  const textClass = isColored ? "text-white/80" : "text-gray-600";
  const headingClass = isColored ? "text-white" : "text-gray-900";
  const mutedClass = isColored ? "text-white/60" : "text-gray-400";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className={`text-3xl font-bold ${headingClass}`}>{experience.role}</h2>
        <p className={`text-lg mt-1 ${isColored ? "text-white/80" : "text-gray-500"}`}>
          {experience.organization}
        </p>
        <span className={`text-sm font-mono ${mutedClass}`}>{experience.period}</span>
      </div>

      {/* Long description or impact */}
      <p className={`text-base leading-relaxed whitespace-pre-line ${textClass}`}>
        {experience.longDescription || experience.impact}
      </p>

      {/* Achievements */}
      {experience.achievements && experience.achievements.length > 0 && (
        <div>
          <h3 className={`text-lg font-semibold mb-2 ${headingClass}`}>Achievements</h3>
          <ul className={`list-disc list-inside space-y-1 text-sm ${textClass}`}>
            {experience.achievements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills */}
      {experience.skills && experience.skills.length > 0 && (
        <div>
          <h3 className={`text-lg font-semibold mb-2 ${headingClass}`}>Skills & Tools</h3>
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <span
                key={skill}
                className={`px-3 py-1 text-sm font-mono rounded-full ${
                  isColored ? "bg-white/20 text-white" : "bg-teal-50 text-teal-700"
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

**Step 3: Create HomepageCardExpanded**

```typescript
"use client";

import type { CardDetail } from "@/data/homepage-details";

interface HomepageCardExpandedProps {
  detail: CardDetail;
  isColored: boolean;
}

export default function HomepageCardExpanded({ detail, isColored }: HomepageCardExpandedProps) {
  const textClass = isColored ? "text-white/80" : "text-gray-600";
  const headingClass = isColored ? "text-white" : "text-gray-900";

  return (
    <div className="space-y-6">
      <h2 className={`text-3xl font-bold ${headingClass}`}>{detail.title}</h2>

      {/* Images */}
      {detail.images && detail.images.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {detail.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${detail.title} ${i + 1}`}
              className="rounded-xl max-h-64 object-cover flex-shrink-0"
            />
          ))}
        </div>
      )}

      <p className={`text-base leading-relaxed whitespace-pre-line ${textClass}`}>
        {detail.content}
      </p>

      {/* Links */}
      {detail.links && detail.links.length > 0 && (
        <div className="flex flex-wrap gap-4 pt-2">
          {detail.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className={`inline-flex items-center gap-1 font-medium transition-all duration-200 ${
                isColored ? "text-white/80 hover:text-white" : "text-teal-600 hover:text-teal-700"
              }`}
            >
              {link.label} →
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Step 4: Verify build**

Run: `npm run build`

**Step 5: Commit**

```bash
git add components/expanded/
git commit -m "feat: create expanded content sub-components for projects, experiences, homepage"
```

---

### Task 9: Convert /projekte page to use ExpandableCard

**Files:**
- Modify: `app/projekte/page.tsx`

**Step 1: Convert to client component and integrate ExpandableCard**

The page currently uses `getServerI18n()` (server-side). We need to convert it to a client component that uses cookies for language detection, or create a client wrapper. The simplest approach: create a client component `ProjectsGrid` that receives the pre-fetched data as props.

Actually, better approach: keep the page as a server component and create a `ProjectsGrid` client component that receives translated projects and translation strings as props.

Create `components/ProjectsGrid.tsx`:

```typescript
"use client";

import ExpandableCard from "@/components/ExpandableCard";
import ProjectExpanded from "@/components/expanded/ProjectExpanded";
import type { Project } from "@/data/projects";
import type { CardVariant } from "@/components/Card";

const projectLayout: Record<string, { variant: CardVariant; span: string }> = {
  "proj-1": { variant: "teal", span: "col-span-1" },
  "proj-2": { variant: "white", span: "col-span-1" },
  "proj-3": { variant: "coral", span: "col-span-2" },
  "proj-4": { variant: "white", span: "col-span-2" },
  "proj-5": { variant: "white", span: "col-span-1" },
  "proj-6": { variant: "white", span: "col-span-1" },
};

interface ProjectsGridProps {
  projects: Project[];
  viewDemoLabel: string;
  viewCodeLabel: string;
}

export default function ProjectsGrid({ projects, viewDemoLabel, viewCodeLabel }: ProjectsGridProps) {
  return (
    <div className="bento-grid">
      {projects.map((project) => {
        const layout = projectLayout[project.id] || { variant: "white" as CardVariant, span: "col-span-1" };
        const isColored = layout.variant === "teal" || layout.variant === "coral";

        return (
          <ExpandableCard
            key={project.id}
            id={project.id}
            variant={layout.variant}
            className={`${layout.span} flex flex-col group`}
            expandedContent={
              <ProjectExpanded
                project={project}
                isColored={isColored}
                viewDemoLabel={viewDemoLabel}
                viewCodeLabel={viewCodeLabel}
              />
            }
          >
            {/* Collapsed card content — same as current */}
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
                    isColored ? "bg-white/20 text-white" : "bg-teal-50 text-teal-700"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </ExpandableCard>
        );
      })}
    </div>
  );
}
```

Then update `app/projekte/page.tsx` to use it:

```typescript
import SectionHeading from "@/components/SectionHeading";
import { getTranslatedProjects } from "@/lib/i18n";
import { getServerI18n } from "@/lib/i18n-server";
import ProjectsGrid from "@/components/ProjectsGrid";

export default async function ProjektePage() {
  const { language, t } = await getServerI18n();
  const projects = getTranslatedProjects(language);

  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-12">
      <SectionHeading>{t.projects.heading}</SectionHeading>
      <p className="text-gray-500 text-lg mb-8 max-w-2xl">{t.projects.intro}</p>
      <ProjectsGrid
        projects={projects}
        viewDemoLabel={t.projects.viewDemo}
        viewCodeLabel={t.projects.viewCode}
      />
    </div>
  );
}
```

**Step 2: Verify visually**

Run: `npm run dev`, navigate to `/projekte`, click a card. Verify it expands with animation.

**Step 3: Commit**

```bash
git add components/ProjectsGrid.tsx app/projekte/page.tsx
git commit -m "feat: integrate ExpandableCard into projects page"
```

---

### Task 10: Convert /erfahrungen page to use ExpandableCard

**Files:**
- Create: `components/ExperiencesGrid.tsx`
- Modify: `app/erfahrungen/page.tsx`

**Step 1: Create ExperiencesGrid client component**

Same pattern as ProjectsGrid — receives translated data as props, wraps each experience card in `ExpandableCard`.

**Step 2: Update erfahrungen page to use ExperiencesGrid**

Keep page as server component, pass data to client grid.

**Step 3: Verify visually**

Run: `npm run dev`, navigate to `/erfahrungen`, click cards.

**Step 4: Commit**

```bash
git add components/ExperiencesGrid.tsx app/erfahrungen/page.tsx
git commit -m "feat: integrate ExpandableCard into experiences page"
```

---

### Task 11: Convert homepage to use ExpandableCard for all cards

**Files:**
- Create: `components/HomeGrid.tsx`
- Modify: `app/page.tsx`

This is the largest task. Every card on the homepage becomes expandable.

**Step 1: Create HomeGrid client component**

Receives all translated data (projects, experiences, homepage details, t strings) as props. Renders the entire bento grid with each card wrapped in `ExpandableCard`.

Each card uses the appropriate expanded content component:
- Hero, Location, TikTok, Tech Stack, About, Hackathon, Mission, Hobbies, Email CTA → `HomepageCardExpanded`
- Project preview card → `ProjectExpanded`
- Experience preview cards → `ExperienceExpanded`

The CTA buttons row and ViewAllButton row are NOT expandable (they are navigation, not content cards).

**Step 2: Update homepage to use HomeGrid**

Keep `app/page.tsx` as server component, pass all data to `HomeGrid`.

**Step 3: Verify visually**

Run: `npm run dev`, click every card on the homepage. Verify each expands correctly with the right content.

**Step 4: Commit**

```bash
git add components/HomeGrid.tsx app/page.tsx
git commit -m "feat: integrate ExpandableCard into all homepage cards"
```

---

### Task 12: Add CSS for expanded state and visual affordance

**Files:**
- Modify: `app/globals.css`

**Step 1: Add expand hint styles**

```css
/* Expand hint on hoverable cards */
.group:hover .expand-hint {
  opacity: 1;
}
.expand-hint {
  opacity: 0;
  transition: opacity 0.2s ease;
}
```

**Step 2: Add responsive fullscreen styles for mobile**

```css
/* Fullscreen expanded card on mobile */
@media (max-width: 640px) {
  .expanded-card-mobile {
    border-radius: 0 !important;
    max-height: 100vh !important;
    width: 100vw !important;
  }
}
```

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add CSS for expanded card states and visual affordance"
```

---

### Task 13: Final verification and polish

**Step 1: Full build check**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 2: Visual verification checklist**

Run `npm run dev` and verify:
- [ ] `/projekte` — all 6 project cards expand and collapse
- [ ] `/erfahrungen` — all 5 experience cards expand and collapse
- [ ] `/` (homepage) — all content cards expand and collapse
- [ ] Escape key closes expanded card
- [ ] Backdrop click closes expanded card
- [ ] X button closes expanded card
- [ ] Body scroll is locked when card is expanded
- [ ] Animation is smooth (no jank)
- [ ] Mobile responsive: cards go fullscreen on small screens
- [ ] Language switching works in expanded view
- [ ] Links in expanded view are clickable
- [ ] `prefers-reduced-motion` is respected (Framer Motion respects this by default)

**Step 3: Lint check**

Run: `npm run lint`
Fix any issues.

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: expandable fullscreen cards with Framer Motion animations"
```
