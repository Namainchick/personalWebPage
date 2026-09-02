export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  demoUrl?: string;
  repoUrl?: string;
  highlights: string[];
  year: string;
};

/** Builds and ventures. Hackathon wins live in data/hackathons.ts. */
export const projects: Project[] = [
  {
    id: "minus-one",
    title: "Minus One",
    tagline: "Six-stem song splitter for musicians",
    description:
      "Upload a song, get it split into vocals, drums, bass, guitar, piano and rest on a serverless GPU, then mute the one you play. A custom multi-track Web Audio engine keeps all six stems in sync with per-track faders, so the band plays everything except your part. Scoped one-hour upload tokens, same-origin stem proxying, rate limits and a daily GPU budget keep the pipeline honest.",
    stack: ["Next.js", "TypeScript", "Web Audio API", "Demucs", "RunPod Serverless", "Redis"],
    demoUrl: "https://minus-one-nine.vercel.app",
    highlights: [
      "~10 s from upload to a playable six-stem mixer with a warm GPU worker",
      "Web Audio gain graph with coordinated seeking and drift correction above 40 ms",
      "Self-built serverless Demucs worker (CUDA image, baked model weights) behind a provider interface with fallback",
      "13 unit suites plus Playwright end-to-end flows",
    ],
    year: "2026",
  },
  {
    id: "bundesliga-prediction",
    title: "Football Prediction Models",
    tagline: "Beating closing bookmaker odds, leakage-safe",
    description:
      "Match-prediction pipelines with CatBoost, SHAP-based feature selection, probability calibration and walk-forward validation. As a sanity check on the edge, a Serie A draw-gap strategy was backtested against closing odds over eight seasons.",
    stack: ["Python", "CatBoost", "scikit-learn", "SHAP", "pandas", "pytest"],
    repoUrl: "https://github.com/Namainchick/bundesliga-prediction-model",
    highlights: [
      ">30 % ROI backtest over 8 seasons against closing bookmaker odds",
      "Leakage-safe: walk-forward validation, SHAP selection, calibration so the edge holds out of sample",
    ],
    year: "2026",
  },
  {
    id: "claude-multi-account",
    title: "claude-multi-account",
    tagline: "Two or more Claude accounts on one machine, at the same time",
    description:
      "Run several Claude Code accounts side by side without signing in and out: separate credentials per account, shared skills and plugins, one machine. Grew out of running a work orchestrator account next to a private one. Open source.",
    stack: ["Shell", "Claude Code", "macOS Keychain"],
    repoUrl: "https://github.com/Namainchick/claude-multi-account",
    highlights: [
      "Separate auth per account, one shared ~/.claude for skills and plugins",
      "Read-only self-test that verifies the whole setup",
      "Sessions of different accounts can message each other",
    ],
    year: "2026",
  },
  {
    id: "hundewelt",
    title: "Hundewelt.space",
    tagline: "A German dog blog that writes itself",
    description:
      "A fully automated German dog blog. The Next.js frontend offers SSR, full-text search, RSS and an admin dashboard. The core is a Python LangGraph pipeline that researches topics, writes articles, generates matching images and publishes everything without a human in the loop, rounded off with a double-opt-in newsletter.",
    stack: ["Next.js", "TypeScript", "Python", "FastAPI", "Supabase", "Gemini", "LangGraph"],
    demoUrl: "https://hundewelt.space",
    highlights: [
      "End-to-end AI content pipeline from topic research to published article",
      "LangGraph multi-step generation with image generation",
      "Live, with search, RSS and newsletter",
    ],
    year: "2025",
  },
];
