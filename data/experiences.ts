export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  impact: string;
  longDescription?: string;
  achievements?: string[];
  skills?: string[];
  url?: string;
}

export const experiences: Experience[] = [
  {
    id: "arbio",
    role: "Product Engineer Intern",
    organization: "Arbio Group GmbH",
    period: "May 2026 – Present",
    impact:
      "Building backend platforms and AI features for short-stay property operations across multiple cities.",
    achievements: [
      "Designed a provider-neutral smart-lock platform for 1,000+ locks — integrating Nuki/Akiles via typed adapters, idempotent sync jobs, normalized PMS models, REST APIs, and unit-tested provider-failure paths.",
      "Built an inbound guest voice-agent pipeline (ASR → LLM tool-calling → TTS), piloted on 48 apartments in Berlin, Hamburg and Vienna with AI-vs-human A/B tests.",
      "Shipped a Nexus 2.0 onboarding workflow tool, turning the Airbn hackathon prototype into guided knowledge retrieval and operational task creation.",
    ],
    skills: ["NestJS", "TypeScript", "AWS", "PostgreSQL"],
  },
  {
    id: "position-one",
    role: "Working Student, AI Automation",
    organization: "Position One GmbH",
    period: "Sep 2025 – Apr 2026",
    impact:
      "Built AI automation across sales, operations and e-commerce, plus a one-click LLM-powered store generator.",
    achievements: [
      "Built automation workflows across sales, operations and e-commerce with Python, the OpenAI API, PostgreSQL and n8n — saving 15+ hours/week; introduced reusable agent templates through hands-on workshops.",
      "Built a one-click Shopware 6 affiliate-store generator with product imports, delta checks, LLM-generated pages and logging across 1,000+ SKUs.",
    ],
    skills: ["Python", "OpenAI API", "n8n", "PostgreSQL"],
  },
  {
    id: "flohh",
    role: "Co-Founder & Engineer",
    organization: "Flohh",
    period: "Dec 2025 – Apr 2026",
    impact: "Built a closed campus marketplace end-to-end as the sole engineer.",
    achievements: [
      "Built a closed campus marketplace with Next.js, FastAPI, PostgreSQL and Docker — covering auth, listings, search and transaction flows — as the sole engineer.",
    ],
    skills: ["Next.js", "FastAPI", "PostgreSQL", "Docker"],
  },
  {
    id: "tutor",
    role: 'CS Tutor · "Starting" Program',
    organization: "Technische Universität Hamburg",
    period: "Oct 2025 – Jan 2026",
    impact: "Mentored first-semester CS students in C and Python.",
    achievements: ["Mentored 25+ first-semester CS students in C and Python."],
    skills: ["C", "Python", "Mentoring"],
  },
];
