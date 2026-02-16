export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
}

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Dip – Give LLMs Eyes",
    description:
      "1. Platz, Google DeepMind Gemini Track – Cursor AI Hackathon Hamburg (Feb 2026, 400+ Teilnehmer). Ein Tool, das LLMs visuellen Echtzeit-Kontext des Bildschirms gibt und die manuelle Beschreibung von On-Screen-Inhalten überflüssig macht.",
    techStack: ["Python", "Google Gemini API", "Screen Capture"],
  },
  {
    id: "proj-2",
    title: "Mindflayer – Semantischer Social-Media-Filter",
    description:
      "1. Platz Overall ($2.000 Preisgeld) – CodeRabbit × Windsurf Hackathon (Dez 2025, 110 Teilnehmer). Eine Chrome Extension, die mit Gemini Social-Media-Posts in Echtzeit semantisch filtert.",
    techStack: ["Chrome Extension", "Google Gemini API", "JavaScript"],
  },
  {
    id: "proj-3",
    title: "Airbn – KI Property Management",
    description:
      "1. Platz Arbio Track, 3. Platz Overall – {Tech: Europe} Hackathon Berlin (Jan 2026). Eine KI-native Immobilienverwaltungsplattform mit Microservices-Architektur, Voice-First-Gäste-Support und automatischer Schadenserkennung via OpenCV.",
    techStack: ["GPT-4o", "OpenCV", "Flask", "FastAPI", "Node.js", "WhatsApp API"],
  },
  {
    id: "proj-4",
    title: "Hundewelt.space – KI-Hundeblog",
    description:
      "Vollautomatisierter deutscher Hundeblog mit KI-Content-Pipeline. Next.js Frontend mit SSR, Suche, RSS und Admin-Dashboard. Python LangGraph-Pipeline für Themenrecherche, Artikelgenerierung, Bildgenerierung und automatische Veröffentlichung. Newsletter-System mit Double Opt-In.",
    techStack: ["Next.js", "TypeScript", "Python", "FastAPI", "Supabase", "Google Gemini", "LangGraph"],
    demoUrl: "https://hundewelt.space",
  },
  {
    id: "proj-5",
    title: "Video Journal Analyzer",
    description:
      "Eine Web-App zur Analyse von Video-URLs mit zwei Modi: Tagebucheintrag-Analyse (Emotionen und Stimmungen) und Rhetorik-Coach (Sprechweise, Artikulation, Verbesserungsvorschläge).",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    imageUrl: "/Projekt1.png",
  },
  {
    id: "proj-6",
    title: "Song Splitter",
    description:
      "Ein Audio-Tool zum Aufteilen von Songs in einzelne Komponenten wie Schlagzeug, Gitarre, Bass, Vocals und weitere Instrumente mittels KI-gestützter Audio-Quellentrennung.",
    techStack: ["Python", "Spleeter", "Demucs", "FFmpeg"],
    imageUrl: "/Projekt2.png",
  },
];
