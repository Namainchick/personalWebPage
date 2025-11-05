import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/projects";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Projekte – Namanh Bui Vu",
  description: "Eine Auswahl meiner persönlichen und beruflichen Projekte.",
};

export default function ProjektePage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12 py-20">
      <SectionHeading>Projekte</SectionHeading>

      <p className="text-gray-300 text-lg mb-12 max-w-2xl">
        Eine Auswahl meiner persönlichen und beruflichen Projekte – von kleinen Experimenten bis
        zu vollständigen Web-Apps.
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
                  className="tech-tag px-3 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4 text-sm font-medium">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animated-link text-[#4f46e5] hover:text-[#4338ca]"
                >
                  Demo ansehen →
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animated-link text-gray-400 hover:text-white"
                >
                  Code auf GitHub →
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
