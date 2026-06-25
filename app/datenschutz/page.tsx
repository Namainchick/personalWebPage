import { SectionHeader } from "@/components/SectionHeader";
import { BackLink } from "@/components/BackLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz – Namanh Bui Vu",
  description: "Datenschutzerklärung.",
};

export default function DatenschutzPage() {
  return (
    <div className="px-4 md:px-6 lg:px-10 xl:px-16 py-12">
      <BackLink />
      <SectionHeader title="Datenschutz" />
      <div className="space-y-4 text-[var(--ink)] leading-[1.7] max-w-[62ch] text-[15px]">
        <div>
          <h3 className="text-xl font-semibold mb-2">1. Datenschutz auf einen Blick</h3>
          <p>
            Diese Website nutzt Vercel Web Analytics, um anonymisierte und aggregierte
            Nutzungsdaten (z. B. Seitenaufrufe) auszuwerten. Es erfolgt keine
            personenbezogene Profilbildung.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">2. Hosting</h3>
          <p>
            Diese Website wird auf Vercel gehostet. Weitere Informationen zum Datenschutz bei
            Vercel findest du unter:{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
            >
              Vercel Privacy Policy
            </a>
            .
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">3. Kontaktaufnahme</h3>
          <p>
            Bei Kontaktaufnahme per E-Mail werden die übermittelten Daten ausschließlich zur
            Bearbeitung deiner Anfrage verwendet und nicht an Dritte weitergegeben.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">4. Deine Rechte</h3>
          <p>
            Du hast das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der
            Verarbeitung deiner gespeicherten Daten, sowie ein Widerspruchsrecht gegen die
            Verarbeitung und ein Recht auf Datenübertragbarkeit.
          </p>
        </div>
      </div>
    </div>
  );
}
