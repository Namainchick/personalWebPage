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
    title: "Video Journal Analyzer",
    description:
      "Eine Web-App zur Analyse von Video-URLs mit zwei Modi: Tagebucheintrag-Analyse (Emotionen und Stimmungen) und Rhetorik-Coach (Sprechweise, Artikulation, Verbesserungsvorschläge).",
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS 4"],
    imageUrl: "/Projekt1.png",
  },
  {
    id: "proj-2",
    title: "Song Splitter",
    description:
      "Ein Audio-Tool zum Aufteilen von Songs in einzelne Komponenten wie Schlagzeug, Gitarre, Bass, Vocals und weitere Instrumente mittels KI-gestützter Audio-Quellentrennung.",
    techStack: ["Python", "Spleeter", "Demucs", "FFmpeg"],
    imageUrl: "/Projekt2.png",
  }
];
