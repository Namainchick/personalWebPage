"use client";

import ExpandableCard from "@/components/ExpandableCard";
import ProjectExpanded from "@/components/expanded/ProjectExpanded";
import type { Project } from "@/data/projects";
import type { CardVariant } from "@/components/Card";

const projectLayout: Record<string, { variant: CardVariant; span: string }> = {
  "proj-1": { variant: "teal", span: "col-span-1" },
  "proj-2": { variant: "white", span: "col-span-1" },
  "proj-3": { variant: "coral", span: "col-span-2" },
  "proj-4": { variant: "white", span: "col-span-2" },
  "proj-5": { variant: "white", span: "col-span-1" },
  "proj-6": { variant: "white", span: "col-span-1" },
};

interface ProjectsGridProps {
  projects: Project[];
  viewDemoLabel: string;
  viewCodeLabel: string;
}

export default function ProjectsGrid({
  projects,
  viewDemoLabel,
  viewCodeLabel,
}: ProjectsGridProps) {
  return (
    <div className="bento-grid">
      {projects.map((project) => {
        const layout = projectLayout[project.id] || {
          variant: "white" as CardVariant,
          span: "col-span-1",
        };
        const isColored = layout.variant === "teal" || layout.variant === "coral";

        return (
          <ExpandableCard
            key={project.id}
            id={project.id}
            variant={layout.variant}
            className={`${layout.span} flex flex-col`}
            expandedContent={
              <ProjectExpanded
                project={project}
                isColored={isColored}
                viewDemoLabel={viewDemoLabel}
                viewCodeLabel={viewCodeLabel}
              />
            }
          >
            <h3
              className={`text-xl font-semibold mb-2 ${isColored ? "" : "text-gray-900"}`}
            >
              {project.title}
            </h3>
            <p
              className={`text-sm mb-4 leading-relaxed flex-grow line-clamp-3 ${
                isColored ? "text-white/80" : "text-gray-600"
              }`}
            >
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className={`px-2 py-0.5 text-xs font-mono rounded-full ${
                    isColored ? "bg-white/20 text-white" : "bg-teal-50 text-teal-700"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </ExpandableCard>
        );
      })}
    </div>
  );
}
