"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";

export default function KontaktPage() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12 py-20">
      <SectionHeading>{t.contact.heading}</SectionHeading>

      <div className="max-w-2xl">
        <p className="text-gray-300 text-lg mb-12 leading-relaxed">
          {t.contact.intro}
        </p>

        {/* E-Mail */}
        <Card className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{t.contact.email.heading}</h3>
          <p className="text-gray-300 mb-6">
            {t.contact.email.description}
          </p>
          <Button href="mailto:kontakt@namanh.dev">
            {t.contact.email.cta}
          </Button>
        </Card>

        {/* Social Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card hoverable>
            <h3 className="text-xl font-semibold mb-3">{t.contact.linkedin.heading}</h3>
            <p className="text-gray-300 mb-4">
              {t.contact.linkedin.description}
            </p>
            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              className="animated-link text-[#4f46e5] hover:text-[#4338ca] font-medium"
            >
              {t.contact.linkedin.cta}
            </a>
          </Card>

          <Card hoverable>
            <h3 className="text-xl font-semibold mb-3">{t.contact.github.heading}</h3>
            <p className="text-gray-300 mb-4">
              {t.contact.github.description}
            </p>
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="animated-link text-[#4f46e5] hover:text-[#4338ca] font-medium"
            >
              {t.contact.github.cta}
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
