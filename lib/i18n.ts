import de from "@/translations/de.json";
import en from "@/translations/en.json";
import { experiences as experiencesBase } from "@/data/experiences";
import { projects as projectsBase } from "@/data/projects";
import type { Experience } from "@/data/experiences";
import type { Project } from "@/data/projects";
import type { Language } from "@/lib/i18n-shared";
import { normalizeLanguage } from "@/lib/i18n-shared";

const translations = {
  de,
  en,
};

export { normalizeLanguage };

export function getTranslations(language: Language) {
  return translations[language];
}

export function getTranslatedProjects(language: Language): Project[] {
  const t = getTranslations(language);

  return projectsBase.map((project) => {
    const translated = t.projectsData[project.id as keyof typeof t.projectsData];

    return {
      ...project,
      title: translated?.title || project.title,
      description: translated?.description || project.description,
    };
  });
}

export function getTranslatedExperiences(language: Language): Experience[] {
  const t = getTranslations(language);

  return experiencesBase.map((exp) => {
    const translated = t.experiencesData[exp.id as keyof typeof t.experiencesData];

    return {
      ...exp,
      role: translated?.role || exp.role,
      organization: translated?.organization || exp.organization,
      period: translated?.period || exp.period,
      impact: translated?.impact || exp.impact,
    };
  });
}
