export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  impact: string;
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Werkstudent – KI Automation",
    organization: "Position One GmbH",
    period: "Okt. 2025 – Heute",
    impact: `Entwicklung von Full-Stack KI-Anwendungen mit React + TailwindCSS (Frontend), Python (Backend) und PostgreSQL, inkl. KI-generierter Affiliate E-Commerce Shops.

Aufbau und Deployment von Multi-Level KI-Agenten und Automatisierungs-Workflows mit OpenAI API und n8n für interne und kundenseitige Produkte.

Durchführung von KI-Workshops (intern & extern) zu Prompt Engineering, KI-Agenten und Automation Best Practices.`,
  },
  {
    id: "exp-2",
    role: "CTO / Co-Founder",
    organization: "Stealth Startup",
    period: "Dez. 2025 – Heute",
    impact: `Aufbau eines vertrauenswürdigen Campus-Marktplatzes für Studierende – Full-Stack-Plattform mit User-Authentifizierung, Listings, Suche und Transaktionen.

Alleinige Verantwortung für Softwareentwicklung, Datenbankdesign, Systemarchitektur und Deployment der produktiven Anwendung.`,
  },
  {
    id: "exp-3",
    role: "Praktikant – E-Commerce & KI Automation",
    organization: "Position One GmbH",
    period: "Sept. 2025",
    impact: `Automatisierung von Produktimporten in Shopware 6 mit Delta-Checks, Reduzierung manueller Dateneingabe und Sicherstellung der Katalog-Konsistenz über 1.000+ SKUs.

Aufbau von Datenverarbeitungs-Pipelines mit OpenAI API und n8n für automatisierte Produktbeschreibungen und strukturiertes Logging.`,
  },
  {
    id: "exp-4",
    role: "Tutor",
    organization: "Technische Universität Hamburg",
    period: "Okt. 2025 – Jan. 2026",
    impact:
      "Betreuung von 25+ Erstsemester-Informatikstudierenden in wöchentlichen Workshops zu Lernstrategien und Programmiergrundlagen.",
  },
  {
    id: "exp-5",
    role: "Content Creator",
    organization: "TikTok",
    period: "Jul. 2023 – Heute",
    impact:
      "Tech Creator auf TikTok mit über 50.000 Followern und 20 Mio.+ Views. Einnahmen über das TikTok Creator Program.",
  },
];
