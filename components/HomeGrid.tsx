"use client";

import ExpandableCard from "@/components/ExpandableCard";
import ProjectExpanded from "@/components/expanded/ProjectExpanded";
import ExperienceExpanded from "@/components/expanded/ExperienceExpanded";
import HomepageCardExpanded from "@/components/expanded/HomepageCardExpanded";
import ViewAllButton from "@/components/ViewAllButton";
import BubbleGrid from "@/components/BubbleGrid";
import BubbleCard from "@/components/BubbleCard";
import type { Project } from "@/data/projects";
import type { Experience } from "@/data/experiences";
import type { CardDetail } from "@/data/homepage-details";

interface HomeGridProps {
  t: {
    home: {
      hero: { greeting: string; tagline: string; cta: string };
      hackathon: { title: string; events: string };
      location: string;
      tiktok: { title: string; subtitle: string };
      about: { techStack: string; intro: string };
      mission: string;
      cta: { projects: string; experiences: string };
    };
    projects: { viewDemo: string; viewCode: string };
  };
  projects: Project[];
  experiences: Experience[];
  homepageDetails: Record<string, CardDetail>;
  techStack: string[];
}

export default function HomeGrid({
  t,
  projects,
  experiences,
  homepageDetails,
  techStack,
}: HomeGridProps) {
  return (
    <BubbleGrid>
      {/* ═══ ROW 1-2: Hero (2×2) + Location + TikTok / Tech Stack ═══ */}

      {/* HERO */}
      <BubbleCard index={0} id="hero" variant="gradient" className="col-span-2 row-span-2">
        <ExpandableCard
          id="hero"
          variant="gradient"
          className="card-dots flex flex-col justify-center min-h-[280px] h-full"
          expandedContent={
            <HomepageCardExpanded detail={homepageDetails.hero} isColored={true} />
          }
        >
          <h1 className="text-5xl md:text-7xl font-black leading-tight relative z-10">
            {t.home.hero.greeting}
            <span className="blinking-dot">.</span>
          </h1>
          <p className="mt-4 text-lg text-white/80 relative z-10">
            {t.home.hero.tagline}
          </p>
        </ExpandableCard>
      </BubbleCard>

      {/* LOCATION */}
      <BubbleCard index={1} id="location" variant="teal" className="col-span-1">
        <ExpandableCard
          id="location"
          variant="teal"
          className="rings-decoration flex flex-col justify-center items-center text-center h-full"
          expandedContent={
            <HomepageCardExpanded detail={homepageDetails.location} isColored={true} />
          }
        >
          <span className="text-3xl mb-2 relative z-10">📍</span>
          <p className="font-bold text-white text-lg relative z-10">{t.home.location}</p>
        </ExpandableCard>
      </BubbleCard>

      {/* TIKTOK */}
      <BubbleCard index={2} id="tiktok" variant="coral" className="col-span-1">
        <ExpandableCard
          id="tiktok"
          variant="coral"
          className="flex flex-col justify-center relative overflow-hidden h-full"
          expandedContent={
            <HomepageCardExpanded detail={homepageDetails.tiktok} isColored={true} />
          }
        >
          <span
            className="absolute -right-3 -top-2 text-[6rem] font-black text-white/10 leading-none select-none pointer-events-none"
            aria-hidden="true"
          >
            50k
          </span>
          <p className="text-3xl font-black relative z-10">{t.home.tiktok.title}</p>
          <p className="text-white/80 text-sm mt-1 relative z-10">
            {t.home.tiktok.subtitle}
          </p>
        </ExpandableCard>
      </BubbleCard>

      {/* TECH STACK */}
      <BubbleCard index={3} id="techStack" variant="teal" className="col-span-2">
        <ExpandableCard
          id="techStack"
          variant="teal"
          className="card-lines h-full"
          expandedContent={
            <HomepageCardExpanded detail={homepageDetails.techStack} isColored={true} />
          }
        >
          <p className="text-sm font-medium text-teal-100 mb-3 relative z-10">
            {t.home.about.techStack}
          </p>
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
        </ExpandableCard>
      </BubbleCard>

      {/* ═══ ROW 3-4: About (1×2) + Hackathon + Project / Mission ═══ */}

      {/* ABOUT */}
      <BubbleCard index={4} id="about" variant="light-teal" className="col-span-1 row-span-2">
        <ExpandableCard
          id="about"
          variant="light-teal"
          className="card-dots-dark flex flex-col justify-center h-full"
          expandedContent={
            <HomepageCardExpanded detail={homepageDetails.about} isColored={false} />
          }
        >
          <p className="text-teal-900 leading-relaxed text-sm relative z-10">
            {t.home.about.intro}
          </p>
        </ExpandableCard>
      </BubbleCard>

      {/* HACKATHON */}
      <BubbleCard index={5} id="hackathon" variant="coral" className="col-span-2">
        <ExpandableCard
          id="hackathon"
          variant="coral"
          className="card-spotlight flex flex-col justify-center relative overflow-hidden h-full"
          expandedContent={
            <HomepageCardExpanded detail={homepageDetails.hackathon} isColored={true} />
          }
        >
          <span
            className="absolute -right-2 -bottom-4 text-[7rem] font-black text-white/10 leading-none select-none pointer-events-none"
            aria-hidden="true"
          >
            3×
          </span>
          <p className="text-4xl font-black mb-2 relative z-10">
            {t.home.hackathon.title}
          </p>
          <p className="text-white/80 text-sm leading-relaxed relative z-10">
            {t.home.hackathon.events}
          </p>
        </ExpandableCard>
      </BubbleCard>

      {/* PROJECT DIP */}
      {projects.slice(0, 1).map((project) => (
        <BubbleCard key={project.id} index={6} id={`home-${project.id}`} variant="teal" className="col-span-1">
          <ExpandableCard
            id={`home-${project.id}`}
            variant="teal"
            className="card-shimmer h-full"
            expandedContent={
              <ProjectExpanded
                project={project}
                isColored={true}
                viewDemoLabel={t.projects.viewDemo}
                viewCodeLabel={t.projects.viewCode}
              />
            }
          >
            <p className="text-xs font-mono text-teal-200 mb-2 uppercase tracking-widest relative z-10">
              🏆 Hackathon Winner
            </p>
            <h3 className="text-lg font-bold mb-1 relative z-10">{project.title}</h3>
            <div className="flex flex-wrap gap-1 relative z-10">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs font-mono rounded-full bg-white/15 text-white border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </ExpandableCard>
        </BubbleCard>
      ))}

      {/* MISSION */}
      <BubbleCard index={7} id="mission" variant="light-coral" className="col-span-3">
        <ExpandableCard
          id="mission"
          variant="light-coral"
          className="flex items-center relative overflow-hidden h-full"
          expandedContent={
            <HomepageCardExpanded detail={homepageDetails.mission} isColored={false} />
          }
        >
          <span
            className="absolute top-2 left-4 text-[5rem] font-serif text-orange-200/50 leading-none select-none pointer-events-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="text-2xl md:text-3xl font-black leading-snug relative z-10">
            <span className="text-gradient">{t.home.mission}</span>
          </p>
        </ExpandableCard>
      </BubbleCard>

      {/* ═══ ROW 5: Experiences (3+1=4) ═══ */}

      {/* EXPERIENCE 1 */}
      {experiences.slice(0, 1).map((exp) => (
        <BubbleCard key={exp.id} index={8} id={`home-${exp.id}`} variant="white" className="col-span-3">
          <ExpandableCard
            id={`home-${exp.id}`}
            variant="white"
            className="card-dots-dark border-l-4 border-l-teal-500 h-full"
            expandedContent={
              <ExperienceExpanded experience={exp} isColored={false} />
            }
          >
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-gray-500 text-sm">{exp.organization}</p>
                </div>
                <span className="text-xs text-gray-400 font-mono">{exp.period}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {exp.impact}
              </p>
            </div>
          </ExpandableCard>
        </BubbleCard>
      ))}

      {/* EXPERIENCE 2 */}
      {experiences.slice(1, 2).map((exp) => (
        <BubbleCard key={exp.id} index={9} id={`home-${exp.id}`} variant="teal" className="col-span-1">
          <ExpandableCard
            id={`home-${exp.id}`}
            variant="teal"
            className="card-lines h-full"
            expandedContent={
              <ExperienceExpanded experience={exp} isColored={true} />
            }
          >
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <p className="text-teal-100 text-sm">{exp.organization}</p>
                </div>
                <span className="text-xs text-teal-200 font-mono">{exp.period}</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                {exp.impact}
              </p>
            </div>
          </ExpandableCard>
        </BubbleCard>
      ))}

      {/* ═══ ROW 6: Hobbies + Email CTA + Nav CTAs ═══ */}

      {/* HOBBIES */}
      <BubbleCard index={10} id="hobbies" variant="light-teal" className="col-span-1">
        <ExpandableCard
          id="hobbies"
          variant="light-teal"
          className="relative overflow-hidden h-full"
          expandedContent={
            <HomepageCardExpanded detail={homepageDetails.hobbies} isColored={false} />
          }
        >
          <span
            className="absolute -right-2 -bottom-2 text-[4rem] opacity-[0.08] select-none pointer-events-none"
            aria-hidden="true"
          >
            🎸
          </span>
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
        </ExpandableCard>
      </BubbleCard>

      {/* EMAIL CTA */}
      <BubbleCard index={11} id="emailCta" variant="gradient" className="col-span-1">
        <ExpandableCard
          id="emailCta"
          variant="gradient"
          className="card-shimmer flex flex-col justify-center items-center text-center h-full"
          expandedContent={
            <HomepageCardExpanded detail={homepageDetails.emailCta} isColored={true} />
          }
        >
          <p className="text-lg font-bold mb-3 relative z-10">{t.home.hero.cta}</p>
          <span className="relative z-10 inline-flex items-center justify-center px-5 py-2.5 rounded-full font-medium bg-white text-teal-700 text-sm shadow-lg">
            ✉️ E-Mail
          </span>
        </ExpandableCard>
      </BubbleCard>

      {/* CTA BUTTONS — not expandable */}
      <BubbleCard index={12} id="cta-buttons" variant="white" className="col-span-2">
        <div className="flex flex-wrap gap-4 justify-center items-center py-2">
          <ViewAllButton href="/projekte">{t.home.cta.projects}</ViewAllButton>
          <ViewAllButton href="/erfahrungen">{t.home.cta.experiences}</ViewAllButton>
        </div>
      </BubbleCard>
    </BubbleGrid>
  );
}
