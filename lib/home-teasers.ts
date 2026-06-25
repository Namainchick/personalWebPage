import { experiences } from "@/data/experiences";
import { projects } from "@/data/projects";

export type HomeSection = { key: string; label: string; teaser: string; href: string };

export function getHomeSections(opts?: { coding?: { streak: number; solved: number } }): HomeSection[] {
  const latest = experiences[0];
  const wins = projects.filter((p) => p.award).length;
  const coding = opts?.coding
    ? `live: ${opts.coding.streak}d streak · ${opts.coding.solved} solved`
    : "live: LeetCode & NeetCode";
  return [
    { key: "about", label: "about", teaser: "full-stack AI builder · CS @ TUHH", href: "/about" },
    { key: "work", label: "work", teaser: `${latest.role} · ${latest.organization}`, href: "/erfahrungen" },
    { key: "projects", label: "projects", teaser: `${projects[0].title.split("–")[0].split("—")[0].trim()} · ${projects.length} builds`, href: "/projekte" },
    { key: "competitions", label: "competitions", teaser: `${wins}× hackathon wins`, href: "/competitions" },
    { key: "coding", label: "the grind", teaser: coding, href: "/coding" },
    { key: "contact", label: "contact", teaser: "namanh.bui2005@gmail.com", href: "/kontakt" },
  ];
}
