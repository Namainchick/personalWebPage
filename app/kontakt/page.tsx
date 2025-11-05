import Button from "@/components/Button";
import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt – Namanh Bui Vu",
  description: "Kontaktiere mich via E-Mail oder auf LinkedIn und GitHub.",
};

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12 py-20">
      <SectionHeading>Kontakt</SectionHeading>

      <div className="max-w-2xl">
        <p className="text-gray-300 text-lg mb-12 leading-relaxed">
          Du möchtest zusammenarbeiten, hast eine Projektidee oder einfach nur Hallo sagen? Schreib
          mir gerne eine Mail oder melde dich über meine Social-Media-Kanäle.
        </p>

        {/* E-Mail */}
        <Card className="mb-8">
          <h3 className="text-xl font-semibold mb-4">E-Mail</h3>
          <p className="text-gray-300 mb-6">
            Die schnellste Möglichkeit, mich zu erreichen.
          </p>
          <Button href="mailto:kontakt@namanh.dev">
            Schreib mir
          </Button>
        </Card>

        {/* Social Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card hoverable>
            <h3 className="text-xl font-semibold mb-3">LinkedIn</h3>
            <p className="text-gray-300 mb-4">
              Vernetze dich mit mir professionell.
            </p>
            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              className="animated-link text-[#4f46e5] hover:text-[#4338ca] font-medium"
            >
              Profil ansehen →
            </a>
          </Card>

          <Card hoverable>
            <h3 className="text-xl font-semibold mb-3">GitHub</h3>
            <p className="text-gray-300 mb-4">
              Schau dir meinen Code und meine Projekte an.
            </p>
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="animated-link text-[#4f46e5] hover:text-[#4338ca] font-medium"
            >
              Profil ansehen →
            </a>
          </Card>
        </div>

        {/* TODO: Inhalt ergänzen */}
        {/* TODO: LinkedIn-URL anpassen */}
        {/* TODO: GitHub-URL anpassen */}
        {/* TODO: E-Mail-Adresse anpassen */}
      </div>
    </div>
  );
}
