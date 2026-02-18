import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import ProjectLink from "@/components/ProjectLink";
import { getTranslatedProjects } from "@/lib/i18n";
import { getServerI18n } from "@/lib/i18n-server";

type CardVariant = "white" | "teal" | "coral" | "light-teal" | "light-coral" | "gradient";

const projectLayout: Record<string, { variant: CardVariant; span: string }> = {
  "proj-1": { variant: "teal", span: "col-span-1" },
  "proj-2": { variant: "white", span: "col-span-1" },
  "proj-3": { variant: "coral", span: "col-span-2" },
  "proj-4": { variant: "white", span: "col-span-2" },
  "proj-5": { variant: "white", span: "col-span-1" },
  "proj-6": { variant: "white", span: "col-span-1" },
};

export default async function ProjektePage() {
  const { language, t } = await getServerI18n();
  const projects = getTranslatedProjects(language);

  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-12">
      <SectionHeading>{t.projects.heading}</SectionHeading>
      <p className="text-gray-500 text-lg mb-8 max-w-2xl">{t.projects.intro}</p>

      <div className="bento-grid">
        {projects.map((project) => {
          const layout = projectLayout[project.id] || { variant: "white" as CardVariant, span: "col-span-1" };
          const isColored = layout.variant === "teal" || layout.variant === "coral";

          return (
            <Card
              key={project.id}
              variant={layout.variant}
              hoverable
              className={`${layout.span} flex flex-col`}
            >
              <h3 className={`text-xl font-semibold mb-2 ${isColored ? "" : "text-gray-900"}`}>
                {project.title}
              </h3>
              <p className={`text-sm mb-4 leading-relaxed flex-grow line-clamp-3 ${isColored ? "text-white/80" : "text-gray-600"}`}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-0.5 text-xs font-mono rounded-full ${
                      isColored
                        ? "bg-white/20 text-white"
                        : "bg-teal-50 text-teal-700"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 text-sm font-medium">
                {project.demoUrl && (
                  <ProjectLink href={project.demoUrl} variant={isColored ? "light" : "primary"}>
                    {t.projects.viewDemo}
                  </ProjectLink>
                )}
                {project.repoUrl && (
                  <ProjectLink href={project.repoUrl} variant={isColored ? "light" : "secondary"}>
                    {t.projects.viewCode}
                  </ProjectLink>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
