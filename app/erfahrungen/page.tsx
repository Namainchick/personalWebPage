"use client";

import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedExperiences } from "@/hooks/useTranslatedData";

export default function ErfahrungenPage() {
  const { t } = useLanguage();
  const experiences = useTranslatedExperiences();
  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12 py-20">
      <SectionHeading>{t.experiences.heading}</SectionHeading>

      <p className="text-gray-300 text-lg mb-12 max-w-2xl">
        {t.experiences.intro}
      </p>

      {/* Stack von Karten */}
      <div className="grid gap-6 md:gap-8 max-w-3xl">
        {experiences.map((exp) => (
          <Card key={exp.id} hoverable>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-1">{exp.role}</h3>
                <p className="text-gray-400 text-lg">{exp.organization}</p>
              </div>
              <span className="text-sm text-gray-500 font-mono md:text-right whitespace-nowrap">
                {exp.period}
              </span>
            </div>
            <div 
              className="border-l-2 border-[#4f46e5] pl-4"
              style={{
                boxShadow: '-2px 0 15px rgba(79, 70, 229, 0.2)'
              }}
            >
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{exp.impact}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
