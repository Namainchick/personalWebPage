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

        {/* === Row 1-2: Hero (2×2) + About + Hackathon + Tech Stack === */}
        <Card variant="gradient" className="col-span-2 row-span-2 flex flex-col justify-center min-h-[280px]">
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            {t.home.hero.greeting}
            <span className="blinking-dot">.</span>
          </h1>
          <p className="mt-4 text-lg text-white/80">
            {t.home.hero.tagline}
          </p>
        </Card>

        <Card variant="light-teal" className="col-span-1 flex flex-col justify-center">
          <p className="text-teal-900 leading-relaxed text-sm">
            {t.home.about.intro}
          </p>
        </Card>

        <Card variant="coral" className="col-span-1 flex flex-col justify-center">
          <p className="text-4xl font-black mb-2">{t.home.hackathon.title}</p>
          <p className="text-white/80 text-sm leading-relaxed">
            {t.home.hackathon.events}
          </p>
        </Card>

        {/* Row 2 cols 3-4 (hero continues in 1-2) */}
        <Card variant="teal" className="col-span-2">
          <p className="text-sm font-medium text-teal-100 mb-3">{t.home.about.techStack}</p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="tech-pill bg-white/20 text-white backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </Card>

        {/* === Row 3: Mission + Location + TikTok (2+1+1=4) === */}
        <Card variant="light-coral" className="col-span-2 flex items-center">
          <p className="text-2xl md:text-3xl font-black italic text-orange-900/80 leading-snug">
            &ldquo;{t.home.mission}&rdquo;
          </p>
        </Card>

        <Card variant="teal" className="col-span-1 flex flex-col justify-center items-center text-center">
          <span className="text-3xl mb-2">📍</span>
          <p className="font-bold text-white text-lg">{t.home.location}</p>
        </Card>

        <Card variant="coral" className="col-span-1 flex flex-col justify-center">
          <p className="text-3xl font-black">{t.home.tiktok.title}</p>
          <p className="text-white/80 text-sm mt-1">{t.home.tiktok.subtitle}</p>
        </Card>

        {/* === Row 4: 2 Featured Projects (2+2=4) === */}
        {projects.slice(0, 1).map((project) => (
          <Card key={project.id} variant="teal" hoverable className="col-span-2">
            <p className="text-xs font-mono text-teal-200 mb-2 uppercase tracking-wider">Hackathon Winner</p>
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-white/70 text-sm mb-3 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-2 py-0.5 text-xs font-mono rounded-full bg-white/20 text-white">
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        ))}

        {projects.slice(1, 2).map((project) => (
          <Card key={project.id} variant="light-teal" hoverable className="col-span-2">
            <p className="text-xs font-mono text-teal-600 mb-2 uppercase tracking-wider">Hackathon Winner</p>
            <h3 className="text-xl font-bold text-teal-900 mb-2">{project.title}</h3>
            <p className="text-teal-800/70 text-sm mb-3 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-2 py-0.5 text-xs font-mono rounded-full bg-teal-500 text-white">
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        ))}

        {/* === Row 5: 2 Experiences (2+2=4) === */}
        <Card variant="white" hoverable className="col-span-2 border-l-4 border-l-teal-500">
          {experiences.slice(0, 1).map((exp) => (
            <div key={exp.id}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-gray-500 text-sm">{exp.organization}</p>
                </div>
                <span className="text-xs text-gray-400 font-mono">{exp.period}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{exp.impact}</p>
            </div>
          ))}
        </Card>

        <Card variant="teal" hoverable className="col-span-2">
          {experiences.slice(1, 2).map((exp) => (
            <div key={exp.id}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <p className="text-teal-100 text-sm">{exp.organization}</p>
                </div>
                <span className="text-xs text-teal-200 font-mono">{exp.period}</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed line-clamp-3">{exp.impact}</p>
            </div>
          ))}
        </Card>

        {/* === Row 6: Hobbies + Email CTA + Nav CTAs (1+1+2=4) === */}
        <Card variant="light-teal" className="col-span-1">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏋️</span>
              <span className="text-sm font-medium text-teal-800">Calisthenics</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎸</span>
              <span className="text-sm font-medium text-teal-800">Band</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📱</span>
              <span className="text-sm font-medium text-teal-800">Tech Content</span>
            </div>
          </div>
        </Card>

        <Card variant="gradient" className="col-span-1 flex flex-col justify-center items-center text-center">
          <p className="text-lg font-bold mb-3">{t.home.hero.cta}</p>
          <a
            href="mailto:namanh.bui2005@gmail.com"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full font-medium bg-white text-teal-700 hover:bg-teal-50 transition-all duration-200 text-sm"
          >
            ✉️ E-Mail
          </a>
        </Card>

        <div className="col-span-2 flex flex-wrap gap-4 justify-center items-center py-2">
          <ViewAllButton href="/projekte">{t.home.cta.projects}</ViewAllButton>
          <ViewAllButton href="/erfahrungen">{t.home.cta.experiences}</ViewAllButton>
        </div>

      </div>
    </div>
  );
}
