import SectionHeading from "@/components/SectionHeading";
import ProjectsGrid from "@/components/ProjectsGrid";
import { getTranslatedProjects } from "@/lib/i18n";
import { getServerI18n } from "@/lib/i18n-server";

export default async function ProjektePage() {
  const { language, t } = await getServerI18n();
  const projects = getTranslatedProjects(language);

  return (
    <div className="mx-auto max-w-[1100px] px-4 md:px-6 lg:px-8 py-12">
      <SectionHeading>{t.projects.heading}</SectionHeading>
      <p className="text-gray-500 text-lg mb-8 max-w-2xl">{t.projects.intro}</p>
      <ProjectsGrid
        projects={projects}
        viewDemoLabel={t.projects.viewDemo}
        viewCodeLabel={t.projects.viewCode}
      />
    </div>
  );
}
