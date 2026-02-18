"use client";

import Image from "next/image";
import type { Project } from "@/data/projects";
import ProjectLink from "@/components/ProjectLink";

interface ProjectExpandedProps {
  project: Project;
  isColored: boolean;
  viewDemoLabel: string;
  viewCodeLabel: string;
}

export default function ProjectExpanded({
  project,
  isColored,
  viewDemoLabel,
  viewCodeLabel,
}: ProjectExpandedProps) {
  const textClass = isColored ? "text-white/80" : "text-gray-600";
  const headingClass = isColored ? "text-white" : "text-gray-900";

  return (
    <div className="space-y-6">
      <h2 className={`text-3xl font-bold ${headingClass}`}>{project.title}</h2>

      {project.images && project.images.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {project.images.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`${project.title} screenshot ${i + 1}`}
              width={400}
              height={256}
              className="rounded-xl max-h-64 object-cover flex-shrink-0"
            />
          ))}
        </div>
      )}

      {project.longDescription && (
        <p className={`text-base leading-relaxed whitespace-pre-line ${textClass}`}>
          {project.longDescription}
        </p>
      )}

      {project.highlights && project.highlights.length > 0 && (
        <div>
          <h3 className={`text-lg font-semibold mb-2 ${headingClass}`}>Highlights</h3>
          <ul className={`list-disc list-inside space-y-1 text-sm ${textClass}`}>
            {project.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className={`text-lg font-semibold mb-2 ${headingClass}`}>Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className={`px-3 py-1 text-sm font-mono rounded-full ${
                isColored ? "bg-white/20 text-white" : "bg-teal-50 text-teal-700"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {project.learnings && (
        <div>
          <h3 className={`text-lg font-semibold mb-2 ${headingClass}`}>Learnings</h3>
          <p className={`text-sm leading-relaxed ${textClass}`}>{project.learnings}</p>
        </div>
      )}

      <div className="flex gap-4 text-sm font-medium pt-2">
        {project.demoUrl && (
          <ProjectLink href={project.demoUrl} variant={isColored ? "light" : "primary"}>
            {viewDemoLabel}
          </ProjectLink>
        )}
        {project.repoUrl && (
          <ProjectLink href={project.repoUrl} variant={isColored ? "light" : "secondary"}>
            {viewCodeLabel}
          </ProjectLink>
        )}
      </div>
    </div>
  );
}
