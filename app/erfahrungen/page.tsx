import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import { experiences } from "@/data/experiences";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erfahrungen – Namanh Bui Vu",
  description: "Berufserfahrungen und Engagements von Namanh Bui Vu.",
};

export default function ErfahrungenPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12 py-20">
      <SectionHeading>Erfahrungen</SectionHeading>

      <p className="text-gray-300 text-lg mb-12 max-w-2xl">
        Hier sind meine bisherigen beruflichen Stationen und Engagements – von Praktika über
        Werkstudentenjobs bis zu freiberuflichen Projekten.
      </p>

      {/* Stack von Karten */}
      <div className="grid gap-6 md:gap-8 max-w-3xl">
        {experiences.map((exp) => (
          <Card key={exp.id} hoverable>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-1">{exp.role}</h3>
                <p className="text-gray-400 text-lg">{exp.organization}</p>
              </div>
              <span className="text-sm text-gray-500 font-mono md:text-right whitespace-nowrap">
                {exp.period}
              </span>
            </div>
            <div className="border-l-2 border-[#4f46e5] pl-4">
              <p className="text-gray-300 leading-relaxed">{exp.impact}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
