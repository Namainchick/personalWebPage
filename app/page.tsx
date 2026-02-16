"use client";

import Card from "@/components/Card";
import ViewAllButton from "@/components/ViewAllButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedExperiences, useTranslatedProjects } from "@/hooks/useTranslatedData";

export default function Home() {
  const { t } = useLanguage();
  const experiences = useTranslatedExperiences();
  const projects = useTranslatedProjects();

  const techStack = [
    "TypeScript", "React", "Next.js", "Python", "FastAPI",
    "PostgreSQL", "Node.js", "Docker", "OpenAI API", "Google Gemini",
  ];

  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <div className="bento-grid">
        {/* Row 1-2: Hero + About + Hackathon */}
        <Card variant="gradient" className="col-span-2 row-span-2 flex flex-col justify-center min-h-[280px]">
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            {t.home.hero.greeting}
            <span className="blinking-dot">.</span>
          </h1>
          <p className="mt-4 text-lg text-white/80">
            {t.home.hero.tagline}
          </p>
        </Card>

        <Card variant="white" className="col-span-1 flex flex-col justify-center">
          <p className="text-gray-600 leading-relaxed text-sm">
            {t.home.about.intro}
          </p>
        </Card>

        <Card variant="coral" className="col-span-1 flex flex-col justify-center">
          <p className="text-4xl font-black mb-2">{t.home.hackathon.title}</p>
          <p className="text-white/80 text-sm leading-relaxed">
            {t.home.hackathon.events}
          </p>
        </Card>

        {/* Row 3: Tech Stack + Location + TikTok */}
        <Card variant="light-teal" className="col-span-2">
          <p className="text-sm font-medium text-teal-700 mb-3">{t.home.about.techStack}</p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="tech-pill bg-teal-500 text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </Card>

        <Card variant="white" className="col-span-1 flex flex-col justify-center items-center text-center">
          <span className="text-2xl mb-1" role="img" aria-label="Location">📍</span>
          <p className="font-semibold text-gray-900">{t.home.location}</p>
        </Card>

        <Card variant="coral" className="col-span-1 flex flex-col justify-center">
          <p className="text-2xl font-black">{t.home.tiktok.title}</p>
          <p className="text-white/80 text-sm">{t.home.tiktok.subtitle}</p>
        </Card>

        {/* Row 4: Featured Projects */}
        {projects.slice(0, 1).map((project) => (
          <Card key={project.id} variant="white" hoverable className="col-span-1">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{project.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 3).map((tech) => (
                <span key={tech} className="tech-tag px-2 py-0.5 text-xs font-mono bg-teal-50 text-teal-700 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        ))}

        {projects.slice(1, 2).map((project) => (
          <Card key={project.id} variant="white" hoverable className="col-span-3">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{project.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 5).map((tech) => (
                <span key={tech} className="tech-tag px-2 py-0.5 text-xs font-mono bg-teal-50 text-teal-700 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        ))}

        {/* Row 5: Featured Experiences */}
        {experiences.slice(0, 2).map((exp) => (
          <Card key={exp.id} variant="white" hoverable className="col-span-2">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                <p className="text-gray-500 text-sm">{exp.organization}</p>
              </div>
              <span className="text-xs text-gray-400 font-mono">{exp.period}</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{exp.impact}</p>
          </Card>
        ))}

        {/* Row 6: CTA Buttons */}
        <div className="col-span-4 flex flex-wrap gap-4 justify-center py-4">
          <ViewAllButton href="/projekte">{t.home.cta.projects}</ViewAllButton>
          <ViewAllButton href="/erfahrungen">{t.home.cta.experiences}</ViewAllButton>
        </div>
      </div>
    </div>
  );
}
