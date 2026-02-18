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
    content:
      "Ich bin 20 Jahre alt und studiere Computer Science an der Technischen Universität Hamburg. Nebenbei arbeite ich als Werkstudent im Bereich KI-Automation bei Position One GmbH und baue als CTO ein Startup für Studierende.\n\nMeine Leidenschaft liegt in der Entwicklung von KI-gestützten Anwendungen. Bei drei Hackathons habe ich jeweils den ersten Platz gewonnen – in Hamburg, Berlin und remote.",
  },
  location: {
    id: "location",
    title: "TUHH, Hamburg",
    content:
      "Ich studiere Computer Science (B.Sc.) an der Technischen Universität Hamburg (TUHH). Hamburg ist meine Basis für Studium, Arbeit und die Tech-Community.",
  },
  tiktok: {
    id: "tiktok",
    title: "50k+ Follower auf TikTok",
    content:
      "Als Tech Creator auf TikTok erreiche ich über 50.000 Follower und mehr als 20 Millionen Views. Ich erstelle Content über Programmierung, KI und das Informatik-Studium.\n\nDurch das TikTok Creator Program generiere ich Einnahmen und habe eine Community aufgebaut, die sich für Tech-Themen begeistert.",
    links: [{ label: "TikTok Profil", href: "https://www.tiktok.com/@namb.tech" }],
  },
  techStack: {
    id: "techStack",
    title: "Mein Tech Stack",
    content:
      "Mein Fokus liegt auf modernen Web-Technologien und KI-Integration:\n\nFrontend: React, Next.js, TypeScript, TailwindCSS\nBackend: Python, FastAPI, Node.js\nDatenbanken: PostgreSQL, Supabase\nKI/ML: OpenAI API, Google Gemini, LangGraph\nDevOps: Docker, Vercel, n8n",
  },
  about: {
    id: "about",
    title: "Über mich",
    content:
      "Moin! Ich bin Namanh, 20 Jahre alt und studiere Computer Science an der TUHH. Nebenbei arbeite ich als Werkstudent im Bereich KI-Automation und baue als CTO ein Startup.\n\nMeine Leidenschaft liegt in der Entwicklung von KI-gestützten Anwendungen und modernen Web-Technologien. Bei drei Hackathons habe ich jeweils den ersten Platz gewonnen.\n\nAußerhalb der Arbeit mache ich Calisthenics, spiele in meiner Band und erstelle Tech-Content auf TikTok.",
  },
  hackathon: {
    id: "hackathon",
    title: "3x 1. Platz bei Hackathons",
    content:
      "Ich habe bei drei verschiedenen Hackathons den ersten Platz gewonnen:\n\n1. Cursor AI Hackathon Hamburg (Feb 2026, 400+ Teilnehmer) – Google DeepMind Gemini Track mit 'Dip'\n\n2. CodeRabbit × Windsurf Hackathon (Dez 2025, 110 Teilnehmer) – Overall Winner mit 'Mindflayer' ($2.000 Preisgeld)\n\n3. {Tech: Europe} Hackathon Berlin (Jan 2026) – Arbio Track Winner mit 'Airbn'",
  },
  mission: {
    id: "mission",
    title: "Meine Mission",
    content:
      "Ich baue KI-Apps, die echte Probleme lösen. Mein Ziel ist es, KI-Technologie zugänglich und nützlich zu machen – nicht als Spielerei, sondern als Werkzeug, das den Alltag verbessert.\n\nOb Automatisierung, Content-Generierung oder Echtzeit-Analyse – ich suche immer nach Wegen, wie KI konkret helfen kann.",
  },
  hobbies: {
    id: "hobbies",
    title: "Hobbies",
    content:
      "Calisthenics – Bodyweight-Training ist mein Ausgleich zum Programmieren. Ich trainiere regelmäßig und arbeite an fortgeschrittenen Skills.\n\nBand – Ich spiele in einer Band und liebe es, Musik zu machen.\n\nTech Content – Auf TikTok erstelle ich Content über Programmierung, KI und das Informatik-Studium.",
  },
  emailCta: {
    id: "emailCta",
    title: "Kontakt",
    content:
      "Schreib mir gerne eine E-Mail – ich freue mich über Nachrichten zu Projekten, Zusammenarbeit oder einfach zum Austausch.",
    links: [{ label: "E-Mail schreiben", href: "mailto:namanh.bui2005@gmail.com" }],
  },
};
