import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { experiences } from "@/data/experiences";
import { hackathons } from "@/data/hackathons";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = ["", "/about", "/work", "/hackathons", "/projects", "/grind", "/content", "/contact"];
  return [
    ...statics.map((p) => ({ url: `${site.url}${p}`, lastModified: now })),
    ...experiences.map((e) => ({ url: `${site.url}/work/${e.id}`, lastModified: now })),
    ...hackathons.map((h) => ({ url: `${site.url}/hackathons/${h.id}`, lastModified: now })),
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.id}`, lastModified: now })),
  ];
}
