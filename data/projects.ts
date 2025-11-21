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
    title: "In Bearbeitung...",
    description:
      "In Bearbeitung...",
    techStack: ["In Bearbeitung..."],
    demoUrl: "https://example.com/demo",
    repoUrl: "https://github.com/username/repo",
    imageUrl: "/projects/placeholder-1.png",
  },
  {
    id: "proj-2",
    title: "In Bearbeitung...",
    description:
      "In Bearbeitung...",
    techStack: ["In Bearbeitung..."],
    demoUrl: "https://example.com/demo",
    repoUrl: "https://github.com/username/repo",
    imageUrl: "/projects/placeholder-1.png",
  },
  {
    id: "proj-3",
    title: "In Bearbeitung...",
    description:
      "In Bearbeitung...",
    techStack: ["In Bearbeitung..."],
    demoUrl: "https://example.com/demo",
    repoUrl: "https://github.com/username/repo",
    imageUrl: "/projects/placeholder-1.png",
  },
  {
    id: "proj-4",
    title: "In Bearbeitung...",
    description:
      "In Bearbeitung...",
    techStack: ["In Bearbeitung..."],
    demoUrl: "https://example.com/demo",
    repoUrl: "https://github.com/username/repo",
    imageUrl: "/projects/placeholder-1.png",
  },
];
