export type LegalDoc = {
  title: string;
  sections: { heading: string; paragraphs: string[] }[];
};

/** Ladungsfähige Anschrift (Nam's decision, 2026-09-10). */
const ADDRESS = ["Namanh Bui Vu", "Alter Postweg 14", "21075 Hamburg"];

export const legal: Record<"impressum" | "datenschutz", LegalDoc> = {
  impressum: {
    title: "Impressum",
    sections: [
      { heading: "Angaben gemäß § 5 DDG", paragraphs: ADDRESS },
      { heading: "Kontakt", paragraphs: ["E-Mail: namanh.bui2005@gmail.com"] },
      {
        heading: "Verantwortlich für den Inhalt",
        paragraphs: ["Namanh Bui Vu, Anschrift wie oben."],
      },
      {
        heading: "Haftung für Inhalte und Links",
        paragraphs: [
          "Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität übernehme ich keine Gewähr.",
          "Diese Seite enthält Links zu externen Websites, auf deren Inhalte ich keinen Einfluss habe. Für diese Inhalte sind die jeweiligen Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.",
        ],
      },
      {
        heading: "Urheberrecht",
        paragraphs: [
          "Texte, Fotos und Code dieser Seite unterliegen dem deutschen Urheberrecht. Verwendung außerhalb der Schranken des Urheberrechts nur mit Zustimmung.",
        ],
      },
    ],
  },
  datenschutz: {
    title: "Datenschutz",
    sections: [
      {
        heading: "Verantwortlicher",
        paragraphs: [...ADDRESS, "E-Mail: namanh.bui2005@gmail.com"],
      },
      {
        heading: "1. Auf einen Blick",
        paragraphs: [
          "Diese Seite setzt keine Cookies und legt keine Nutzerprofile an. Verarbeitet werden nur die Daten, die technisch für den Betrieb nötig sind, sowie anonyme Seitenaufruf-Zahlen.",
        ],
      },
      {
        heading: "2. Hosting und Server-Logfiles",
        paragraphs: [
          "Diese Seite wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Beim Aufruf verarbeitet Vercel technisch notwendige Daten wie IP-Adresse, Zeitpunkt, aufgerufene Seite und Browser-Kennung in Server-Logfiles, um die Auslieferung und Sicherheit der Seite zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die Übermittlung in die USA stützt sich auf die EU-Standardvertragsklauseln und das EU-US Data Privacy Framework. Datenschutzhinweise von Vercel: https://vercel.com/legal/privacy-policy",
        ],
      },
      {
        heading: "3. Reichweitenmessung",
        paragraphs: [
          "Vercel Web Analytics zählt Seitenaufrufe ohne Cookies. Die IP-Adresse wird dabei nur gehasht und nicht gespeichert, eine Zuordnung zu einzelnen Personen findet nicht statt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (Interesse an der Auswertung der Nutzung).",
        ],
      },
      {
        heading: "4. Inhalte von Drittanbietern",
        paragraphs: [
          "In der App „Content“ werden Vorschaubilder von TikTok-Videos direkt von Servern der TikTok Technology Limited (Irland) bzw. ByteDance geladen. Dabei wird deine IP-Adresse an TikTok übermittelt, möglicherweise auch in Drittländer. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die Videos selbst werden erst nach Klick auf tiktok.com abgespielt.",
          "Die Zahlen in „grind.app“ werden serverseitig von GitHub abgerufen. Dabei werden keine Daten von dir übermittelt.",
        ],
      },
      {
        heading: "5. Kontaktaufnahme",
        paragraphs: [
          "Wenn du mir eine E-Mail schreibst, verwende ich deine Angaben nur zur Bearbeitung deiner Anfrage und gebe sie nicht an Dritte weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw. f DSGVO.",
        ],
      },
      {
        heading: "6. Deine Rechte",
        paragraphs: [
          "Du hast das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung deiner Daten, ein Widerspruchsrecht gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO sowie ein Recht auf Datenübertragbarkeit. Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren.",
          "Stand: September 2026",
        ],
      },
    ],
  },
};
