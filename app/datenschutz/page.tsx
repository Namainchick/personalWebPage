import SectionHeading from "@/components/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz – Namanh Bui Vu",
  description: "Datenschutzerklärung.",
};

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-12">
      <SectionHeading>Datenschutz</SectionHeading>

      <div className="max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
        <div className="text-gray-600 leading-relaxed space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Datenschutz auf einen Blick</h3>
            <p className="text-sm">
              Diese Website nutzt Vercel Web Analytics, um anonymisierte und aggregierte
              Nutzungsdaten (z. B. Seitenaufrufe) auszuwerten. Es erfolgt keine
              personenbezogene Profilbildung.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Hosting</h3>
            <p className="text-sm">
              Diese Website wird auf Vercel gehostet. Weitere Informationen zum Datenschutz bei
              Vercel findest du unter:{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 underline"
              >
                Vercel Privacy Policy
              </a>
              .
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Kontaktaufnahme</h3>
            <p className="text-sm">
              Bei Kontaktaufnahme per E-Mail werden die übermittelten Daten ausschließlich zur
              Bearbeitung deiner Anfrage verwendet und nicht an Dritte weitergegeben.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">4. Deine Rechte</h3>
            <p className="text-sm">
              Du hast das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der
              Verarbeitung deiner gespeicherten Daten, sowie ein Widerspruchsrecht gegen die
              Verarbeitung und ein Recht auf Datenübertragbarkeit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
