// TODO: Inhalt ergänzen – Projekte

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
    title: "KI-Tool für Textanalyse",
    description:
      "Ein schnelles Web-Tool, das Texte analysiert und Zusammenfassungen generiert. Gebaut mit GPT-API und React.",
    techStack: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
    demoUrl: "https://example.com/demo",
    repoUrl: "https://github.com/username/repo",
    imageUrl: "/projects/placeholder-1.png",
  },
  {
    id: "proj-2",
    title: "Personal Dashboard",
    description:
      "Ein minimalistisches Dashboard für persönliche Notizen, To-Dos und Links. Fokus auf Geschwindigkeit.",
    techStack: ["React", "TypeScript", "Supabase", "CSS"],
    demoUrl: "https://example.com/dashboard",
    repoUrl: "https://github.com/username/dashboard",
    imageUrl: "/projects/placeholder-2.png",
  },
  {
    id: "proj-3",
    title: "Algorithmus-Visualisierung",
    description:
      "Interaktive Visualisierung von Sortier- und Such-Algorithmen zum Lernen und Experimentieren.",
    techStack: ["JavaScript", "Canvas API", "HTML", "CSS"],
    demoUrl: "https://example.com/algo-viz",
    repoUrl: "https://github.com/username/algo-viz",
    imageUrl: "/projects/placeholder-3.png",
  },
  {
    id: "proj-4",
    title: "CLI Task Manager",
    description:
      "Ein Terminal-basierter Task-Manager mit Fokus auf Effizienz und Minimalismus. In Python gebaut.",
    techStack: ["Python", "Rich", "SQLite"],
    repoUrl: "https://github.com/username/cli-tasks",
  },
];
