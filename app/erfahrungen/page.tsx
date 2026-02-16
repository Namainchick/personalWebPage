"use client";

import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedExperiences } from "@/hooks/useTranslatedData";

type CardVariant = "white" | "teal" | "coral" | "light-teal" | "light-coral" | "gradient";

const experienceLayout: Record<string, { variant: CardVariant; span: string; extraClass?: string }> = {
  "exp-1": { variant: "white", span: "col-span-2", extraClass: "border-l-4 border-l-teal-500" },
  "exp-2": { variant: "teal", span: "col-span-2" },
  "exp-3": { variant: "white", span: "col-span-2" },
  "exp-4": { variant: "light-coral", span: "col-span-1" },
  "exp-5": { variant: "coral", span: "col-span-1" },
};

export default function ErfahrungenPage() {
  const { t } = useLanguage();
  const experiences = useTranslatedExperiences();

  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-12">
      <SectionHeading>{t.experiences.heading}</SectionHeading>
      <p className="text-gray-500 text-lg mb-8 max-w-2xl">{t.experiences.intro}</p>

      <div className="bento-grid">
        {experiences.map((exp) => {
          const layout = experienceLayout[exp.id] || { variant: "white" as CardVariant, span: "col-span-1" };
          const isColored = layout.variant === "teal" || layout.variant === "coral";

          return (
            <Card
              key={exp.id}
              variant={layout.variant}
              hoverable
              className={`${layout.span} ${layout.extraClass || ""}`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <div>
                  <h3 className={`text-xl font-semibold mb-1 ${isColored ? "" : "text-gray-900"}`}>
                    {exp.role}
                  </h3>
                  <p className={`text-sm ${isColored ? "text-white/80" : "text-gray-500"}`}>
                    {exp.organization}
                  </p>
                </div>
                <span className={`text-xs font-mono whitespace-nowrap ${isColored ? "text-white/60" : "text-gray-400"}`}>
                  {exp.period}
                </span>
              </div>
              <p className={`text-sm leading-relaxed whitespace-pre-line ${isColored ? "text-white/80" : "text-gray-600"}`}>
                {exp.impact}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
