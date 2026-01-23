"use client";

import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import ProjectLink from "@/components/ProjectLink";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedProjects } from "@/hooks/useTranslatedData";

export default function ProjektePage() {
  const { t } = useLanguage();
  const projects = useTranslatedProjects();
  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12 py-20">
      <SectionHeading>{t.projects.heading}</SectionHeading>

      <p className="text-gray-300 text-lg mb-12 max-w-2xl">
        {t.projects.intro}
      </p>

      {/* Projekt-Grid */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project) => (
          <Card key={project.id} hoverable className="flex flex-col">
            {/* Optional: Bild-Platzhalter */}
            {project.imageUrl && (
              <div className="relative w-full h-48 mb-6 -mt-2 -mx-2 rounded-t-2xl overflow-hidden bg-white/5">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <h3 className="text-xl md:text-2xl font-semibold mb-3">{project.title}</h3>
            <p className="text-gray-300 mb-4 leading-relaxed flex-grow">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="tech-tag px-3 py-1 text-xs font-mono bg-white/[0.03] border border-white/10 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4 text-sm font-medium">
              {project.demoUrl && (
                <ProjectLink href={project.demoUrl} variant="primary">
                  {t.projects.viewDemo}
                </ProjectLink>
              )}
              {project.repoUrl && (
                <ProjectLink href={project.repoUrl} variant="secondary">
                  {t.projects.viewCode}
                </ProjectLink>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
