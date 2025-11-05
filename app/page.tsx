import Button from "@/components/Button";
import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { experiences } from "@/data/experiences";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col justify-center items-center py-20 md:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Decorative Line - centered mit Glow */}
          <div 
            className="w-64 h-px bg-gradient-to-r from-transparent via-[#4f46e5] to-transparent mb-8 mx-auto" 
            style={{
              boxShadow: '0 0 20px rgba(79, 70, 229, 0.6)'
            }}
            aria-hidden="true" 
          />
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
              style={{
                textShadow: '0 0 40px rgba(79, 70, 229, 0.3), 0 0 80px rgba(79, 70, 229, 0.1)'
              }}>
            Hi, ich bin Namanh
            <span className="blinking-dot">.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Ich baue manchmal Sachen mit KI.
          </p>
          
          <a 
            href="mailto:kontakt@namanh.dev"
            className="glass-button inline-flex items-center justify-center px-8 py-4 rounded-2xl font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            Schreib mir
          </a>
        </div>
      </section>

      {/* Teaser: Erfahrungen */}
      <section className="py-20">
        <SectionHeading>Erfahrungen</SectionHeading>
        
        <div className="grid gap-6 md:gap-8 mb-8">
          {experiences.slice(0, 2).map((exp) => (
            <Card key={exp.id} hoverable>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                  <p className="text-gray-400">{exp.organization}</p>
                </div>
                <span className="text-sm text-gray-500 font-mono md:text-right">
                  {exp.period}
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed">{exp.impact}</p>
            </Card>
          ))}
        </div>
        
        <Link 
          href="/erfahrungen" 
          className="animated-link text-[#4f46e5] font-medium hover:text-[#4338ca]"
        >
          Alle Erfahrungen ansehen →
        </Link>
      </section>

      {/* Teaser: Projekte */}
      <section className="py-20">
        <SectionHeading>Projekte</SectionHeading>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
          {projects.slice(0, 2).map((project) => (
            <Card key={project.id} hoverable>
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="tech-tag px-3 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
        
        <Link 
          href="/projekte" 
          className="animated-link text-[#4f46e5] font-medium hover:text-[#4338ca]"
        >
          Alle Projekte ansehen →
        </Link>
      </section>

      {/* CTA Kontakt */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Lass uns zusammenarbeiten
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Interesse an einem Projekt oder einfach nur Hallo sagen?
          </p>
          <Button href="/kontakt">
            Kontakt aufnehmen
          </Button>
        </div>
      </section>
    </div>
  );
}
