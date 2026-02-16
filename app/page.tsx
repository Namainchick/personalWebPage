"use client";

import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import ViewAllButton from "@/components/ViewAllButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedExperiences, useTranslatedProjects } from "@/hooks/useTranslatedData";

export default function Home() {
  const { t } = useLanguage();
  const experiences = useTranslatedExperiences();
  const projects = useTranslatedProjects();
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col justify-center items-center py-20 md:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Decorative Line */}
          <div
            className="w-64 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent mb-8 mx-auto"
            aria-hidden="true"
          />

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-[1.1] text-gray-900">
            {t.home.hero.greeting}
            <span className="blinking-dot">.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            {t.home.hero.tagline}
          </p>

          <a
            href="mailto:namanh.bui2005@gmail.com"
            className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-medium text-white bg-teal-600 hover:bg-teal-700 shadow-[0_4px_14px_rgba(13,148,136,0.3)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.4)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF8]"
          >
            {t.home.hero.cta}
          </a>
        </div>
      </section>

      {/* Über mich */}
      <section className="py-20">
        <SectionHeading>{t.home.about.heading}</SectionHeading>

        <div>
          <Card>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg">
                {t.home.about.intro}
              </p>

              <p>
                {t.home.about.passion}
              </p>

              <div>
                <p className="mb-3 text-gray-400 text-sm font-medium">{t.home.about.techStack}</p>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'React', 'Python', 'PostgreSQL', 'C++', 'Next.js', 'TypeScript', 'Node.js'].map((tech) => (
                    <span
                      key={tech}
                      className="tech-tag px-3 py-1 text-xs font-mono bg-teal-50 text-teal-700 border border-teal-200 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <p>
                {t.home.about.hobbies}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Teaser: Erfahrungen */}
      <section className="py-20">
        <SectionHeading>{t.home.experiences.heading}</SectionHeading>

        <div className="grid gap-6 md:gap-8 mb-8">
          {experiences.slice(0, 2).map((exp) => (
            <Card key={exp.id} hoverable>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-gray-900">{exp.role}</h3>
                  <p className="text-gray-500">{exp.organization}</p>
                </div>
                <span className="text-sm text-gray-400 font-mono md:text-right">
                  {exp.period}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">{exp.impact}</p>
            </Card>
          ))}
        </div>

        <ViewAllButton href="/erfahrungen">
          {t.home.experiences.viewAll}
        </ViewAllButton>
      </section>

      {/* Teaser: Projekte */}
      <section className="py-20">
        <SectionHeading>{t.home.projects.heading}</SectionHeading>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
          {projects.slice(0, 2).map((project) => (
            <Card key={project.id} hoverable>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{project.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="tech-tag px-3 py-1 text-xs font-mono bg-teal-50 text-teal-700 border border-teal-200 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <ViewAllButton href="/projekte">
          {t.home.projects.viewAll}
        </ViewAllButton>
      </section>
    </div>
  );
}
