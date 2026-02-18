import Card from "@/components/Card";
import ViewAllButton from "@/components/ViewAllButton";
import { getTranslatedExperiences, getTranslatedProjects } from "@/lib/i18n";
import { getServerI18n } from "@/lib/i18n-server";

export default async function Home() {
  const { language, t } = await getServerI18n();
  const experiences = getTranslatedExperiences(language);
  const projects = getTranslatedProjects(language);

  const techStack = [
    "TypeScript", "React", "Next.js", "Python", "FastAPI",
    "PostgreSQL", "Node.js", "Docker", "OpenAI API", "Google Gemini",
  ];

  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <div className="bento-grid">

        {/* ═══ ROW 1-2: Hero (2×2) + Location + TikTok / Tech Stack ═══ */}

        {/* HERO — gradient + dot grid pattern overlay */}
        <Card variant="gradient" className="card-dots col-span-2 row-span-2 flex flex-col justify-center min-h-[280px]">
          <h1 className="text-5xl md:text-7xl font-black leading-tight relative z-10">
            {t.home.hero.greeting}
            <span className="blinking-dot">.</span>
          </h1>
          <p className="mt-4 text-lg text-white/80 relative z-10">
            {t.home.hero.tagline}
          </p>
        </Card>

        {/* LOCATION — teal with concentric rings decoration */}
        <Card variant="teal" className="rings-decoration col-span-1 flex flex-col justify-center items-center text-center">
          <span className="text-3xl mb-2 relative z-10">📍</span>
          <p className="font-bold text-white text-lg relative z-10">{t.home.location}</p>
        </Card>

        {/* TIKTOK — coral with oversized faded number in background */}
        <Card variant="coral" className="col-span-1 flex flex-col justify-center relative overflow-hidden">
          <span className="absolute -right-3 -top-2 text-[6rem] font-black text-white/10 leading-none select-none pointer-events-none" aria-hidden="true">
            50k
          </span>
          <p className="text-3xl font-black relative z-10">{t.home.tiktok.title}</p>
          <p className="text-white/80 text-sm mt-1 relative z-10">{t.home.tiktok.subtitle}</p>
        </Card>

        {/* TECH STACK — teal + diagonal lines pattern + glass pills */}
        <Card variant="teal" className="card-lines col-span-2">
          <p className="text-sm font-medium text-teal-100 mb-3 relative z-10">{t.home.about.techStack}</p>
          <div className="flex flex-wrap gap-2 relative z-10">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="tech-pill bg-white/20 text-white backdrop-blur-sm border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </Card>

        {/* ═══ ROW 3-4: About (1×2) + Hackathon + Project / Mission ═══ */}

        {/* ABOUT — light-teal, spans 2 rows so intro text fits */}
        <Card variant="light-teal" className="card-dots-dark col-span-1 row-span-2 flex flex-col justify-center">
          <p className="text-teal-900 leading-relaxed text-sm relative z-10">
            {t.home.about.intro}
          </p>
        </Card>

        {/* HACKATHON — coral with spotlight glow + oversized background number */}
        <Card variant="coral" className="card-spotlight col-span-2 flex flex-col justify-center relative overflow-hidden">
          <span className="absolute -right-2 -bottom-4 text-[7rem] font-black text-white/10 leading-none select-none pointer-events-none" aria-hidden="true">
            3×
          </span>
          <p className="text-4xl font-black mb-2 relative z-10">{t.home.hackathon.title}</p>
          <p className="text-white/80 text-sm leading-relaxed relative z-10">
            {t.home.hackathon.events}
          </p>
        </Card>

        {/* PROJECT DIP — teal + shimmer + hover glow */}
        {projects.slice(0, 1).map((project) => (
          <Card key={project.id} variant="teal" hoverable className="card-shimmer hover-glow col-span-1">
            <p className="text-xs font-mono text-teal-200 mb-2 uppercase tracking-widest relative z-10">
              🏆 Hackathon Winner
            </p>
            <h3 className="text-lg font-bold mb-1 relative z-10">{project.title}</h3>
            <div className="flex flex-wrap gap-1 relative z-10">
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech} className="px-2 py-0.5 text-xs font-mono rounded-full bg-white/15 text-white border border-white/10">
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        ))}

        {/* MISSION — light-coral with gradient text quote, wide */}
        <Card variant="light-coral" className="col-span-3 flex items-center relative overflow-hidden">
          <span className="absolute top-2 left-4 text-[5rem] font-serif text-orange-200/50 leading-none select-none pointer-events-none" aria-hidden="true">
            &ldquo;
          </span>
          <p className="text-2xl md:text-3xl font-black leading-snug relative z-10">
            <span className="text-gradient">{t.home.mission}</span>
          </p>
        </Card>

        {/* ═══ ROW 5: Experiences (3+1=4) ═══ */}

        {/* EXPERIENCE 1 — white with teal accent border + dot pattern */}
        <Card variant="white" hoverable className="card-dots-dark hover-glow col-span-3 border-l-4 border-l-teal-500">
          {experiences.slice(0, 1).map((exp) => (
            <div key={exp.id} className="relative z-10">
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

        {/* EXPERIENCE 2 — teal with lines pattern + hover glow */}
        <Card variant="teal" hoverable className="card-lines hover-glow col-span-1">
          {experiences.slice(1, 2).map((exp) => (
            <div key={exp.id} className="relative z-10">
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

        {/* ═══ ROW 6: Hobbies + Email CTA + Nav CTAs (1+1+2=4) ═══ */}

        {/* HOBBIES — light-teal with emoji composition */}
        <Card variant="light-teal" className="col-span-1 relative overflow-hidden">
          <span className="absolute -right-2 -bottom-2 text-[4rem] opacity-[0.08] select-none pointer-events-none" aria-hidden="true">🎸</span>
          <div className="flex flex-col gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <span className="text-2xl w-8 flex-shrink-0">🏋️</span>
              <span className="text-sm font-semibold text-teal-800">Calisthenics</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl w-8 flex-shrink-0">🎸</span>
              <span className="text-sm font-semibold text-teal-800">Band</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl w-8 flex-shrink-0">📱</span>
              <span className="text-sm font-semibold text-teal-800">Tech Content</span>
            </div>
          </div>
        </Card>

        {/* EMAIL CTA — gradient with shimmer effect */}
        <Card variant="gradient" className="card-shimmer col-span-1 flex flex-col justify-center items-center text-center">
          <p className="text-lg font-bold mb-3 relative z-10">{t.home.hero.cta}</p>
          <a
            href="mailto:namanh.bui2005@gmail.com"
            className="relative z-10 inline-flex items-center justify-center px-5 py-2.5 rounded-full font-medium bg-white text-teal-700 hover:bg-teal-50 hover:scale-105 transition-all duration-200 text-sm shadow-lg"
          >
            ✉️ E-Mail
          </a>
        </Card>

        {/* CTA BUTTONS */}
        <div className="col-span-2 flex flex-wrap gap-4 justify-center items-center py-2">
          <ViewAllButton href="/projekte">{t.home.cta.projects}</ViewAllButton>
          <ViewAllButton href="/erfahrungen">{t.home.cta.experiences}</ViewAllButton>
        </div>

      </div>
    </div>
  );
}
