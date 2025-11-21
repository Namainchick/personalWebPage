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
    role: "Intern - Software Engineering",
    organization: "Position One GmbH",
    period: "Sept. 2025 – Okt. 2025",
    impact: "Entwicklung einer KI-gestützten Applikation zur automatisierten Erstellung von Affiliate E-Commerce Shops.",
  },
  {
    id: "exp-2",
    role: "Werkstudent - KI Automation und E-Commerce",
    organization: "Position One GmbH",
    period: "Okt. 2025 – Heute",
    impact: `Ich erweitere ein Projekt aus meinem Praktikum zu einer vollständigen Full-Stack-Anwendung.

Dabei entwickle ich API-Endpunkte, verbinde diese mit der Datenbank und gestalte das Frontend. Ziel ist es, das System stabiler, skalierbarer und nutzerfreundlicher zu machen.

Zusätzlich unterstütze ich bei der Automatisierung von Unternehmensprozessen mithilfe von KI.`,
  },
  {
    id: "exp-3",
    role: "Tutor",
    organization: "Technische Universität Hamburg",
    period: "Sept. 2025 – Heute",
    impact: "Ich unterstütze Erstsemester-Studenten in wöchentlichen Kursen für einen optimalen Studienstart.\n\nDurch Tipps, Workshops und persönliche Beratung helfe ich ihnen, sich an der Universität zurechtzufinden und erfolgreich zu studieren.",
  },
  {
    id: "exp-4",
    role: "Content Creator",
    organization: "TikTok/Instagram",
    period: "Jul. 2023 – Jun. 2024",
    impact: "Aufbau einer Instagram Theme Page mit über 50.000 Followern und eines TikTok-Kanals mit über 20 Millionen Views, welche alle für das Creator Programm qualifiziert sind.",
  }
];
