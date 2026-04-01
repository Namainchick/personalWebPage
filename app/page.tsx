import HomeGrid from "@/components/HomeGrid";
import {
  getTranslatedExperiences,
  getTranslatedProjects,
  getTranslatedHomepageDetails,
} from "@/lib/i18n";
import { getServerI18n } from "@/lib/i18n-server";

export default async function Home() {
  const { language, t } = await getServerI18n();
  const experiences = getTranslatedExperiences(language);
  const projects = getTranslatedProjects(language);
  const homepageDetails = getTranslatedHomepageDetails(language);

  const techStack = [
    "TypeScript",
    "React",
    "Next.js",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "Node.js",
    "Docker",
    "OpenAI API",
    "Google Gemini",
  ];

  return (
    <div className="mx-auto max-w-[1100px] px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <HomeGrid
        t={t}
        projects={projects}
        experiences={experiences}
        homepageDetails={homepageDetails}
        techStack={techStack}
      />
    </div>
  );
}
