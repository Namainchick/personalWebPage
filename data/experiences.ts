// TODO: Inhalt ergänzen – Erfahrungen/Jobs

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
    role: "Software Engineering Intern",
    organization: "Position One GmbH",
    period: "Sept. 2025 – Okt. 2025",
    impact: "Entwicklung einer KI gestützen Applikation, um automatisiert Affilate E-Commerce Shops zu erstellen",
  },
  {
    id: "exp-2",
    role: "Werkstudent",
    organization: "Position One GmbH",
    period: "Okt. 2025 – Heute",
    impact: `Ich erweitere ein Projekt aus meinem Praktikum zu einer vollständigen Full-Stack-Anwendung.
Dabei entwickle ich API-Endpunkte, verbinde diese mit der Datenbank und gestalte das Frontend.
Ziel ist es, das System stabiler, skalierbarer und nutzerfreundlicher zu machen.`,
  },
  {
    id: "exp-3",
    role: "Freelance Developer",
    organization: "Selbstständig",
    period: "Jan. 2023 – heute",
    impact: "Entwicklung von Web-Apps und kleinen Tools für lokale Kunden und persönliche Projekte.",
  },
];
