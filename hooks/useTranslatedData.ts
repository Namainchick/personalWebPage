import { useLanguage } from "@/contexts/LanguageContext";
import { projects as projectsBase } from "@/data/projects";
import { experiences as experiencesBase } from "@/data/experiences";
import type { Project } from "@/data/projects";
import type { Experience } from "@/data/experiences";

export function useTranslatedProjects(): Project[] {
  const { t } = useLanguage();

  return projectsBase.map((project) => {
    const translated = t.projectsData[project.id as keyof typeof t.projectsData];
    return {
      ...project,
      title: translated?.title || project.title,
      description: translated?.description || project.description,
    };
  });
}

export function useTranslatedExperiences(): Experience[] {
  const { t } = useLanguage();

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
