import { SectionHeader } from "@/components/SectionHeader";
import { BackLink } from "@/components/BackLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – Namanh Bui Vu",
  description: "Impressum und rechtliche Angaben.",
};

export default function ImpressumPage() {
  return (
    <div className="px-4 md:px-6 lg:px-10 xl:px-16 py-12">
      <BackLink />
      <SectionHeader title="Impressum" />
      <div className="space-y-4 text-[var(--ink)] leading-[1.7] max-w-[62ch] text-[15px]">
        <div>
          <h3 className="text-xl font-semibold mb-2">Angaben gemäß § 5 TMG</h3>
          <p>
            Namanh Bui Vu
            <br />
            [Adresse]
            <br />
            [PLZ Ort]
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Kontakt</h3>
          <p>E-Mail: kontakt@namanh.dev</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Haftungsausschluss</h3>
          <p>
            Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
          </p>
        </div>
      </div>
    </div>
  );
}
