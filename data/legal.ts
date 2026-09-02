export type LegalDoc = {
  title: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const legal: Record<"impressum" | "datenschutz", LegalDoc> = {
  impressum: {
    title: "Impressum",
    sections: [
      {
        heading: "Angaben gemäß § 5 TMG",
        paragraphs: ["Namanh Bui Vu", "[Adresse]", "[PLZ Ort]"],
      },
      {
        heading: "Kontakt",
        paragraphs: ["E-Mail: namanh.bui2005@gmail.com"],
      },
      {
        heading: "Haftungsausschluss",
        paragraphs: [
          "Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.",
        ],
      },
    ],
  },
  datenschutz: {
    title: "Datenschutz",
    sections: [
      {
        heading: "1. Datenschutz auf einen Blick",
        paragraphs: [
          "Diese Website nutzt Vercel Web Analytics, um anonymisierte und aggregierte Nutzungsdaten (z. B. Seitenaufrufe) auszuwerten. Es erfolgt keine personenbezogene Profilbildung. Es werden keine Cookies gesetzt.",
        ],
      },
      {
        heading: "2. Hosting",
        paragraphs: [
          "Diese Website wird auf Vercel gehostet. Weitere Informationen zum Datenschutz bei Vercel: https://vercel.com/legal/privacy-policy",
        ],
      },
      {
        heading: "3. Eingebettete Inhalte",
        paragraphs: [
          "Vorschaubilder von TikTok-Videos werden von TikTok-Servern geladen. Dabei wird deine IP-Adresse an TikTok übermittelt. Die Videos selbst öffnen sich erst nach Klick auf tiktok.com.",
        ],
      },
      {
        heading: "4. Kontaktaufnahme",
        paragraphs: [
          "Bei Kontaktaufnahme per E-Mail werden die übermittelten Daten ausschließlich zur Bearbeitung deiner Anfrage verwendet und nicht an Dritte weitergegeben.",
        ],
      },
      {
        heading: "5. Deine Rechte",
        paragraphs: [
          "Du hast das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung deiner gespeicherten Daten, sowie ein Widerspruchsrecht gegen die Verarbeitung und ein Recht auf Datenübertragbarkeit.",
        ],
      },
    ],
  },
};
