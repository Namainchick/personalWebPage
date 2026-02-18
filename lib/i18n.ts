import de from "@/translations/de.json";
import en from "@/translations/en.json";
import { experiences as experiencesBase } from "@/data/experiences";
import { projects as projectsBase } from "@/data/projects";
import {
  homepageDetails as homepageDetailsBase,
  type CardDetail,
} from "@/data/homepage-details";
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
    const translated = t.projectsData[project.id as keyof typeof t.projectsData] as
      | Record<string, unknown>
      | undefined;

    return {
      ...project,
      title: (translated?.title as string) || project.title,
      description: (translated?.description as string) || project.description,
      longDescription:
        (translated?.longDescription as string) || project.longDescription,
      highlights:
        (translated?.highlights as string[]) || project.highlights,
      learnings: (translated?.learnings as string) || project.learnings,
    };
  });
}

export function getTranslatedExperiences(language: Language): Experience[] {
  const t = getTranslations(language);

  return experiencesBase.map((exp) => {
    const translated = t.experiencesData[exp.id as keyof typeof t.experiencesData] as
      | Record<string, unknown>
      | undefined;

    return {
      ...exp,
      role: (translated?.role as string) || exp.role,
      organization: (translated?.organization as string) || exp.organization,
      period: (translated?.period as string) || exp.period,
      impact: (translated?.impact as string) || exp.impact,
      longDescription:
        (translated?.longDescription as string) || exp.longDescription,
      achievements:
        (translated?.achievements as string[]) || exp.achievements,
      skills: (translated?.skills as string[]) || exp.skills,
    };
  });
}

export function getTranslatedHomepageDetails(
  language: Language
): Record<string, CardDetail> {
  const t = getTranslations(language);
  const translatedDetails =
    (t as Record<string, unknown>).homepageDetailsData as
      | Record<string, { title?: string; content?: string }>
      | undefined;

  if (!translatedDetails) return homepageDetailsBase;

  const result: Record<string, CardDetail> = {};

  for (const [key, base] of Object.entries(homepageDetailsBase)) {
    const translated = translatedDetails[key];
    result[key] = {
      ...base,
      title: translated?.title || base.title,
      content: translated?.content || base.content,
    };
  }

  return result;
}
