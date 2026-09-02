export type Experience = {
  id: string;
  kind: "work" | "education";
  role: string;
  organization: string;
  location: string;
  period: string;
  summary: string;
  bullets: string[];
  skills: string[];
  url?: string;
};

export const experiences: Experience[] = [
  {
    id: "arbio",
    kind: "work",
    role: "Software Engineer (Product Engineering)",
    organization: "Arbio Group",
    location: "Berlin",
    period: "May 2026 – present",
    summary:
      "Door codes, smart locks and AI document extraction for 1,000+ short-stay apartments across Berlin, Hamburg and Vienna.",
    bullets: [
      "Cut guest lock-out incidents from 50+ a month to under 10 by rebuilding how door codes reach the locks. Live on 434 locks across 1,000+ apartments, codes landing on 100 % of one vendor's locks with an automatic fallback covering the other.",
      "Made it reliable against two vendors whose APIs confirm late and offer no safe retry: one writer per reservation, lease-based job claiming, compare-and-swap with rollback. 1,500+ tests, rolled out shadow-first.",
      "Replaced manual reading of owner documents with an 8-stage AI extraction pipeline that cites the exact page or cell behind every value. Removed 166 hand-checked data points per property and raised accuracy from 0.42 to 0.81 F1 after swapping an unreliable AI grader for a deterministic one.",
    ],
    skills: ["TypeScript", "NestJS", "AWS", "PostgreSQL"],
    url: "https://arbio.com",
  },
  {
    id: "position-one",
    kind: "work",
    role: "AI Engineer (promoted from intern)",
    organization: "Position One GmbH",
    location: "Hamburg",
    period: "Sep 2025 – Apr 2026",
    summary: "LLM agent pipelines and an affiliate store generator for an e-commerce agency.",
    bullets: [
      "Cut 15+ hours of manual work per week with LLM agent pipelines (Python, LangGraph, LangChain) across sales, operations and e-commerce, instrumented with Langfuse tracing and evaluations so quality was measured, not assumed.",
      "Built a store generator that keeps 1,000+ products in sync with affiliate suppliers: hash-based change detection, multithreaded image ingestion into object storage, backoff against two rate-limited APIs.",
    ],
    skills: ["Python", "LangGraph", "LangChain", "Langfuse", "PostgreSQL"],
  },
  {
    id: "flohh",
    kind: "work",
    role: "Co-Founder & Sole Engineer",
    organization: "Flohh",
    location: "Hamburg",
    period: "Dec 2025 – Apr 2026",
    summary: "A closed campus marketplace for students, built end to end.",
    bullets: [
      "Auth, listings, search and transaction flows with Next.js, FastAPI, PostgreSQL and Docker.",
      "Sole engineer: architecture, database design, deployment of the production app.",
    ],
    skills: ["Next.js", "FastAPI", "PostgreSQL", "Docker"],
  },
  {
    id: "tuhh-ta",
    kind: "work",
    role: "Teaching Assistant",
    organization: "Technische Universität Hamburg",
    location: "Hamburg",
    period: "Oct 2025 – Jan 2026",
    summary: "First-semester Computer Science and Data Science, C and Python.",
    bullets: [
      "Mentored 25+ first-semester students through weekly workshops on programming fundamentals and how to study CS.",
    ],
    skills: ["C", "Python", "Teaching"],
  },
  {
    id: "tuhh",
    kind: "education",
    role: "B.Sc. Computer Science",
    organization: "Technische Universität Hamburg (TUHH)",
    location: "Hamburg",
    period: "Oct 2024 – expected 2028",
    summary: "Algorithms & Data Structures, Databases, Networks, C/C++.",
    bullets: [],
    skills: [],
  },
  {
    id: "nus",
    kind: "education",
    role: "Exchange Semester, Computer Science",
    organization: "National University of Singapore (NUS)",
    location: "Singapore",
    period: "Jan – May 2027",
    summary:
      "Machine Learning, Intro to AI, Software Engineering Principles & Patterns, Software Testing.",
    bullets: ["Next stop. Nominated by TUHH, credits pre-approved."],
    skills: [],
  },
];

export const work = experiences.filter((e) => e.kind === "work");
export const education = experiences.filter((e) => e.kind === "education");
