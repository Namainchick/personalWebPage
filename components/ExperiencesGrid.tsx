"use client";

import ExpandableCard from "@/components/ExpandableCard";
import ExperienceExpanded from "@/components/expanded/ExperienceExpanded";
import type { Experience } from "@/data/experiences";
import type { CardVariant } from "@/components/Card";

const experienceLayout: Record<
  string,
  { variant: CardVariant; span: string; extraClass?: string }
> = {
  "exp-1": {
    variant: "white",
    span: "col-span-2",
    extraClass: "border-l-4 border-l-teal-500",
  },
  "exp-2": { variant: "teal", span: "col-span-2" },
  "exp-3": { variant: "white", span: "col-span-2" },
  "exp-4": { variant: "light-coral", span: "col-span-1" },
  "exp-5": { variant: "coral", span: "col-span-1" },
};

interface ExperiencesGridProps {
  experiences: Experience[];
}

export default function ExperiencesGrid({ experiences }: ExperiencesGridProps) {
  return (
    <div className="bento-grid">
      {experiences.map((exp) => {
        const layout = experienceLayout[exp.id] || {
          variant: "white" as CardVariant,
          span: "col-span-1",
        };
        const isColored = layout.variant === "teal" || layout.variant === "coral";

        return (
          <ExpandableCard
            key={exp.id}
            id={exp.id}
            variant={layout.variant}
            className={`${layout.span} ${layout.extraClass || ""}`}
            expandedContent={
              <ExperienceExpanded experience={exp} isColored={isColored} />
            }
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
              <div>
                <h3
                  className={`text-xl font-semibold mb-1 ${
                    isColored ? "" : "text-gray-900"
                  }`}
                >
                  {exp.role}
                </h3>
                <p
                  className={`text-sm ${
                    isColored ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {exp.organization}
                </p>
              </div>
              <span
                className={`text-xs font-mono whitespace-nowrap ${
                  isColored ? "text-white/60" : "text-gray-400"
                }`}
              >
                {exp.period}
              </span>
            </div>
            <p
              className={`text-sm leading-relaxed whitespace-pre-line line-clamp-3 ${
                isColored ? "text-white/80" : "text-gray-600"
              }`}
            >
              {exp.impact}
            </p>
          </ExpandableCard>
        );
      })}
    </div>
  );
}
