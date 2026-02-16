import SectionHeading from "@/components/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – Namanh Bui Vu",
  description: "Impressum und rechtliche Angaben.",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-12">
      <SectionHeading>Impressum</SectionHeading>

      <div className="max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
        <div className="text-gray-600 leading-relaxed space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Angaben gemäß § 5 TMG</h3>
            <p>
              Namanh Bui Vu
              <br />
              [Adresse]
              <br />
              [PLZ Ort]
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Kontakt</h3>
            <p>E-Mail: kontakt@namanh.dev</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Haftungsausschluss</h3>
            <p className="text-sm">
              Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
