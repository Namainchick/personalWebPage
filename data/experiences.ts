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
    id: "exp-1",
    role: "Werkstudent – KI Automation",
    organization: "Position One GmbH",
    period: "Okt. 2025 – Heute",
    impact: `Entwicklung von Full-Stack KI-Anwendungen mit React + TailwindCSS (Frontend), Python (Backend) und PostgreSQL, inkl. KI-generierter Affiliate E-Commerce Shops.

Aufbau und Deployment von Multi-Level KI-Agenten und Automatisierungs-Workflows mit OpenAI API und n8n für interne und kundenseitige Produkte.

Durchführung von KI-Workshops (intern & extern) zu Prompt Engineering, KI-Agenten und Automation Best Practices.`,
    longDescription:
      "Als Werkstudent bei Position One entwickle ich Full-Stack KI-Anwendungen für interne und kundenseitige Produkte. Ich arbeite an der gesamten Pipeline – vom React-Frontend über Python-Backends bis zur PostgreSQL-Datenbank.\n\nEin Schwerpunkt liegt auf dem Aufbau von Multi-Level KI-Agenten mit der OpenAI API und n8n-Workflows für Automatisierung. Zusätzlich führe ich KI-Workshops durch, sowohl intern als auch für Kunden, zu Themen wie Prompt Engineering und Automation Best Practices.",
    achievements: [
      "Entwicklung KI-generierter Affiliate E-Commerce Shops",
      "Aufbau von Multi-Level KI-Agenten-Systemen",
      "Durchführung von KI-Workshops für interne und externe Teams",
    ],
    skills: ["React", "TailwindCSS", "Python", "PostgreSQL", "OpenAI API", "n8n"],
  },
  {
    id: "exp-2",
    role: "CTO / Co-Founder",
    organization: "Stealth Startup",
    period: "Dez. 2025 – Heute",
    impact: `Aufbau eines vertrauenswürdigen Campus-Marktplatzes für Studierende – Full-Stack-Plattform mit User-Authentifizierung, Listings, Suche und Transaktionen.

Alleinige Verantwortung für Softwareentwicklung, Datenbankdesign, Systemarchitektur und Deployment der produktiven Anwendung.`,
    longDescription:
      "Als CTO und Co-Founder baue ich einen vertrauenswürdigen Campus-Marktplatz für Studierende. Die Full-Stack-Plattform umfasst User-Authentifizierung, Listings, Suche und Transaktionen.\n\nIch trage die alleinige Verantwortung für die gesamte technische Seite: Softwareentwicklung, Datenbankdesign, Systemarchitektur und Deployment der produktiven Anwendung.",
    achievements: [
      "Aufbau einer Full-Stack-Plattform von Grund auf",
      "Alleinige technische Verantwortung als CTO",
      "User-Authentifizierung, Listings und Transaktions-System",
    ],
    skills: ["Full-Stack Development", "Systemarchitektur", "Datenbankdesign", "Deployment"],
    url: "https://flohh-landing-page.vercel.app/",
  },
  {
    id: "exp-3",
    role: "Praktikant – E-Commerce & KI Automation",
    organization: "Position One GmbH",
    period: "Sept. 2025",
    impact: `Automatisierung von Produktimporten in Shopware 6 mit Delta-Checks, Reduzierung manueller Dateneingabe und Sicherstellung der Katalog-Konsistenz über 1.000+ SKUs.

Aufbau von Datenverarbeitungs-Pipelines mit OpenAI API und n8n für automatisierte Produktbeschreibungen und strukturiertes Logging.`,
    longDescription:
      "Während meines Praktikums bei Position One habe ich Produktimporte in Shopware 6 automatisiert. Mit Delta-Checks konnte die manuelle Dateneingabe erheblich reduziert und die Katalog-Konsistenz über 1.000+ SKUs sichergestellt werden.\n\nZusätzlich habe ich Datenverarbeitungs-Pipelines mit der OpenAI API und n8n aufgebaut, die automatisch Produktbeschreibungen generieren und strukturiertes Logging ermöglichen.",
    achievements: [
      "Automatisierung von Produktimporten über 1.000+ SKUs",
      "Aufbau von KI-Pipelines für Produktbeschreibungen",
      "Reduzierung manueller Dateneingabe durch Delta-Checks",
    ],
    skills: ["Shopware 6", "OpenAI API", "n8n", "E-Commerce", "Datenverarbeitung"],
  },
  {
    id: "exp-4",
    role: "Tutor",
    organization: "Technische Universität Hamburg",
    period: "Okt. 2025 – Jan. 2026",
    impact:
      "Betreuung von 25+ Erstsemester-Informatikstudierenden in wöchentlichen Workshops zu Lernstrategien und Programmiergrundlagen.",
    longDescription:
      "Als Tutor an der TUHH habe ich 25+ Erstsemester-Informatikstudierenden in wöchentlichen Workshops betreut. Der Fokus lag auf Lernstrategien für das Informatik-Studium und Programmiergrundlagen.\n\nDie Workshops haben mir geholfen, komplexe technische Konzepte verständlich zu vermitteln und meine Kommunikationsfähigkeiten zu stärken.",
    achievements: [
      "Betreuung von 25+ Studierenden",
      "Wöchentliche Workshops zu Lernstrategien",
      "Vermittlung von Programmiergrundlagen",
    ],
    skills: ["Lehre", "Programmiergrundlagen", "Kommunikation", "Mentoring"],
  },
  {
    id: "exp-5",
    role: "Content Creator",
    organization: "TikTok",
    period: "Jul. 2023 – Heute",
    impact:
      "Tech Creator auf TikTok mit über 50.000 Followern und 20 Mio.+ Views. Einnahmen über das TikTok Creator Program.",
    longDescription:
      "Seit Juli 2023 bin ich als Tech Creator auf TikTok aktiv und erstelle Content über Programmierung, KI und das Informatik-Studium. Mit über 50.000 Followern und mehr als 20 Millionen Views habe ich eine engagierte Community aufgebaut.\n\nDurch das TikTok Creator Program generiere ich Einnahmen und habe wertvolle Erfahrungen in Content-Erstellung, Community-Building und Personal Branding gesammelt.",
    achievements: [
      "50.000+ Follower aufgebaut",
      "20 Mio.+ Views erreicht",
      "Monetarisierung über TikTok Creator Program",
    ],
    skills: ["Content Creation", "Video-Editing", "Community Building", "Personal Branding"],
  },
];
