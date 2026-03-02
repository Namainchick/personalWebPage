"use client";

import type { Experience } from "@/data/experiences";

interface ExperienceExpandedProps {
  experience: Experience;
  isColored: boolean;
}

export default function ExperienceExpanded({
  experience,
  isColored,
}: ExperienceExpandedProps) {
  const textClass = isColored ? "text-white/80" : "text-gray-600";
  const headingClass = isColored ? "text-white" : "text-gray-900";
  const mutedClass = isColored ? "text-white/60" : "text-gray-400";

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-3xl font-bold ${headingClass}`}>{experience.role}</h2>
        <p className={`text-lg mt-1 ${isColored ? "text-white/80" : "text-gray-500"}`}>
          {experience.organization}
        </p>
        <span className={`text-sm font-mono ${mutedClass}`}>{experience.period}</span>
      </div>

      <p className={`text-base leading-relaxed whitespace-pre-line ${textClass}`}>
        {experience.longDescription || experience.impact}
      </p>

      {experience.achievements && experience.achievements.length > 0 && (
        <div>
          <h3 className={`text-lg font-semibold mb-2 ${headingClass}`}>Achievements</h3>
          <ul className={`list-disc list-inside space-y-1 text-sm ${textClass}`}>
            {experience.achievements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      {experience.skills && experience.skills.length > 0 && (
        <div>
          <h3 className={`text-lg font-semibold mb-2 ${headingClass}`}>Skills & Tools</h3>
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <span
                key={skill}
                className={`px-3 py-1 text-sm font-mono rounded-full ${
                  isColored ? "bg-white/20 text-white" : "bg-teal-50 text-teal-700"
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {experience.url && (
        <a
          href={experience.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80 ${
            isColored ? "bg-white/20 text-white" : "bg-teal-600 text-white"
          }`}
        >
          Website besuchen ↗
        </a>
      )}
    </div>
  );
}
