export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
  longDescription?: string;
  images?: string[];
  learnings?: string;
  highlights?: string[];
  award?: { event: string; placement: string; prize?: string; date: string };
}

export const projects: Project[] = [
  // ───────────────────────── Competitions (hackathon wins) ─────────────────────────
  {
    id: "dip",
    title: "Dip — Give LLMs Eyes",
    description:
      "A tool that gives LLMs real-time visual context of your screen, so you never have to describe what's on it.",
    techStack: ["Python", "Google Gemini API", "Screen Capture"],
    demoUrl: "https://dip-landing-page.vercel.app/",
    longDescription:
      "Dip streams real-time screen context into an LLM: it captures what's on your screen and feeds it to the model, so describing on-screen content by hand becomes unnecessary. A lightweight client captures the screen and a Python backend pipes it into Gemini for pair-programming and debugging workflows.",
    highlights: [
      "1st Place, Google DeepMind Gemini Track",
      "400+ participants at the Cursor AI Hackathon Hamburg",
      "Real-time screen capture as live LLM context",
    ],
    learnings:
      "Learned how to feed multimodal models with real-time image data while keeping latency low, working with screen-capture APIs and the Gemini Vision API.",
    award: {
      event: "Cursor AI Hackathon Hamburg",
      placement: "1st · Google DeepMind Gemini Track",
      date: "Feb 2026",
    },
  },
  {
    id: "mindflayer",
    title: "Mindflayer — Semantic Social-Media Filter",
    description:
      "A Chrome extension that filters social-media feeds by meaning, not keywords — powered by Gemini, in real time.",
    techStack: ["Chrome Extension", "Google Gemini API", "JavaScript"],
    repoUrl: "https://github.com/jpzk/mindflayer",
    longDescription:
      "Mindflayer filters social-media posts in real time based on their actual content and context rather than keyword lists. The extension analyses posts directly in the browser and hides unwanted content without the user writing complex filter rules.",
    highlights: [
      "1st Place Overall, $2,000 prize",
      "110 participants at the CodeRabbit × Windsurf Hackathon",
      "Semantic real-time filtering instead of keyword-based",
    ],
    learnings:
      "Built a deep understanding of the Chrome Extension API and content scripts, and how to run AI models efficiently in the browser while keeping real-time filtering fast.",
    award: {
      event: "CodeRabbit × Windsurf Hackathon",
      placement: "1st Overall",
      prize: "$2,000",
      date: "Dec 2025",
    },
  },
  {
    id: "airbn",
    title: "Airbn — AI Property Management",
    description:
      "An AI-native property-management platform: voice-first guest support over WhatsApp and automatic damage detection via OpenCV.",
    techStack: ["GPT-4o", "OpenCV", "Flask", "FastAPI", "Node.js", "WhatsApp API"],
    repoUrl: "https://github.com/MohiCodeHub/airbio-track",
    longDescription:
      "Airbn combines several microservices: voice-first guest support over WhatsApp, automatic damage detection from checkout photos via OpenCV, and intelligent property-management features. GPT-4o handles the conversations, OpenCV the image analysis, and a mix of Flask, FastAPI and Node.js powers the backend services.",
    highlights: [
      "1st Place Arbio Track · 3rd Place Overall",
      "Microservices architecture with 3 backend services",
      "Voice-first guest support + OpenCV damage detection",
    ],
    learnings:
      "Got hands-on with microservices under time pressure, the WhatsApp Business API for voice-first interactions, and OpenCV for practical damage detection.",
    award: {
      event: "{Tech: Europe} Hackathon Berlin",
      placement: "1st Arbio Track · 3rd Overall",
      date: "Jan 2026",
    },
  },
  {
    id: "rushhour",
    title: "RushHour — AI Brand × Creator Matching",
    description:
      "Airbnb meets LinkedIn for creator collaborations: AI predicts which local brand × creator partnership actually works, instead of endless scrolling.",
    techStack: ["Next.js", "TypeScript", "Qwen", "Supabase", "Tailwind CSS"],
    demoUrl: "https://rush-hour-two.vercel.app",
    repoUrl: "https://github.com/Namainchick/RushHour",
    longDescription:
      "Local businesses burn time and budget finding creators by hand; creators struggle with outreach and visibility. RushHour predicts which business–creator combination will actually perform — the \"Moneyball\" effect, where a small hyper-local creator with real engagement beats a 200k-follower account for a neighbourhood goal. Qwen handles extraction and the human-readable reasoning, the scoring is deterministic math (local audience, engagement, style match, reach), and everything persists in Supabase so the match pool grows with every new creator.",
    highlights: [
      "1st Place Overall + 1st Place Qwen Track",
      "AI-predicted brand × creator fit, not a catalogue to scroll",
      "Qwen for extraction & reasoning, deterministic scoring, Supabase persistence",
    ],
    award: {
      event: "AI BEAVERS × Mollie Founder Hackathon",
      placement: "1st Overall · 1st Qwen Track",
      date: "2026",
    },
  },
  {
    id: "horsegpt",
    title: "HorseGPT — a fun AI app",
    description:
      "A playful novelty AI app, built as a distribution experiment: how far can great marketing and distribution carry a product? 100+ users within two days.",
    techStack: ["base44", "AI", "Growth"],
    demoUrl: "https://horsegpt.vercel.app/",
    longDescription:
      "HorseGPT started as a fun, intentionally silly AI app — and as an experiment in growth: instead of obsessing over features, we focused on marketing and distribution to see how far that alone gets you. The answer: 100+ users within the first two days.",
    highlights: [
      "base44 Track Winner",
      "100+ users within 2 days",
      "A pure distribution & marketing experiment",
    ],
    award: {
      event: "Hackathon · base44 Track",
      placement: "base44 Track Winner",
      date: "2026",
    },
  },

  // ───────────────────────── Projects (builds & ventures) ─────────────────────────
  {
    id: "minus-one",
    title: "Minus One — AI Stem Splitter for Musicians",
    description:
      "Upload a song, get it split into six instrument stems on a GPU, and mute the one you play — a practice tool with a mini mixing console in the browser.",
    techStack: ["Next.js", "TypeScript", "Web Audio API", "Demucs", "PyTorch", "RunPod Serverless", "Vercel Blob", "Upstash Redis"],
    demoUrl: "https://minus-one-nine.vercel.app",
    longDescription:
      "Minus One turns any song into a practice backing track: upload it, and Demucs (htdemucs_6s) running on a RunPod GPU worker splits it into vocals, drums, bass, guitar, piano and rest. A custom multi-track Web Audio engine plays all six stems in perfect sync with per-track faders and mute switches — so the band plays everything except the part you play yourself. The serverless pipeline keeps secrets server-side: scoped one-hour blob upload tokens, same-origin stem proxying, rate limits and a daily GPU budget.",
    highlights: [
      "~10s from upload to playable six-stem mixer (end-to-end, with warm GPU worker)",
      "Custom Web Audio multi-track engine with coordinated seeking and drift correction",
      "Self-built RunPod Serverless Demucs worker (CUDA image with baked model weights)",
      "Hardened pipeline: scoped upload tokens, SSRF guards, rate limits, daily budget",
    ],
    learnings:
      "Deep dive into browser audio (six HTMLAudioElements on one AudioContext, seek barriers, drift correction) and into shipping a GPU workload as a serverless worker — including cold-start economics, scoped storage tokens and provider-agnostic job orchestration.",
  },
  {
    id: "football-models",
    title: "Football Prediction Models",
    description:
      "Leakage-safe match-prediction pipelines with CatBoost — SHAP feature selection, calibration and walk-forward validation.",
    techStack: ["Python", "CatBoost", "scikit-learn", "pandas", "pytest"],
    repoUrl: "https://github.com/Namainchick/bundesliga-prediction-model",
    longDescription:
      "Built leakage-safe match-prediction pipelines with CatBoost, SHAP-based feature selection, probability calibration and walk-forward validation. As a sanity check on the edge, I backtested a Serie A draw-gap strategy that returned >30% ROI over the last eight seasons.",
    highlights: [
      "Leakage-safe pipelines: SHAP selection, calibration, walk-forward validation",
      ">30% ROI backtest on a Serie A draw-gap strategy (8 seasons)",
    ],
  },
  {
    id: "account-business",
    title: "Social Media & Account Business",
    description:
      "From age 13: turned Instagram pages and viral TikToks into real income — then sold the shovels in the gold rush by flipping Creator-Program-eligible accounts.",
    techStack: ["Instagram", "TikTok", "Growth", "Monetization"],
    longDescription:
      "I started early with a feel for what makes attention move — building Instagram pages and making viral TikToks, and earning my first real money through the Creator Program. When everyone rushed in to monetize video, I switched sides and sold the shovels: buying accounts that were eligible for the Creator Program, growing them and flipping them. Across it all I built and flipped 16–18 accounts, with 50k+ followers and 20M+ views.",
    highlights: [
      "50k+ followers · 20M+ views across accounts",
      "16–18 accounts built, grown and flipped",
      "\"Sold shovels in the gold rush\" — flipped Creator-Program-eligible accounts",
      "Self-taught, first real income as a teenager",
    ],
  },
  {
    id: "content-community",
    title: "Tech Content & Community",
    description:
      "Personal content on AI, tech and startup life as a student in Germany — plus a 250+ member Discord helping ambitious DACH students break into FAANG and startups.",
    techStack: ["TikTok", "Content", "Discord", "Community"],
    demoUrl: "https://discord.gg/g6JnnfyHx",
    longDescription:
      "I make personal content about AI, tech and startups — and what it actually looks like to be a tech student in Germany. The mission is simple: a lot of people never find out what's possible or how to get there, just because of their environment and because this stuff is gatekept. So I show it — how to get into FAANG, how to break into startups, career tips — and I built a Discord community of 250+ ambitious students across the DACH region around exactly that.",
    highlights: [
      "250+ member Discord for ambitious DACH students",
      "Helping people break into FAANG & startups, plus career tips",
      "Mission: un-gatekeep tech & startup access for those outside the usual circles",
      "Content as @namb.tech on TikTok",
    ],
  },
  {
    id: "hundewelt",
    title: "Hundewelt.space — AI Dog Blog",
    description:
      "A fully automated German dog blog with an end-to-end AI content pipeline — from topic research to published article, hands-free.",
    techStack: ["Next.js", "TypeScript", "Python", "FastAPI", "Supabase", "Google Gemini", "LangGraph"],
    demoUrl: "https://hundewelt.space",
    longDescription:
      "Hundewelt.space is a fully automated German dog blog. The Next.js frontend offers SSR, full-text search, RSS feeds and an admin dashboard. The core is a Python LangGraph pipeline that researches topics, writes articles, generates matching images and publishes everything automatically — rounded off with a double-opt-in newsletter.",
    highlights: [
      "Fully automated AI content pipeline",
      "LangGraph multi-step generation",
      "Next.js SSR frontend with search & RSS",
      "Live at hundewelt.space",
    ],
    learnings:
      "Extensive experience with LangGraph for complex multi-step AI workflows, and how to build a content pipeline that runs from research to publication without a human in the loop.",
  },
];
