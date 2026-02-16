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
        <p className="text-gray-500 text-lg mb-12 leading-relaxed">
          {t.contact.intro}
        </p>

        {/* E-Mail */}
        <Card className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">{t.contact.email.heading}</h3>
          <p className="text-gray-600 mb-6">
            {t.contact.email.description}
          </p>
          <Button href="mailto:namanh.bui2005@gmail.com">
            {t.contact.email.cta}
          </Button>
        </Card>

        {/* Social Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card hoverable>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">{t.contact.linkedin.heading}</h3>
            <p className="text-gray-600 mb-4">
              {t.contact.linkedin.description}
            </p>
            <a
              href="https://www.linkedin.com/in/namanh-bui-vu-37b05a2a9/"
              target="_blank"
              rel="noopener noreferrer"
              className="animated-link text-teal-600 hover:text-teal-700 font-medium"
            >
              {t.contact.linkedin.cta}
            </a>
          </Card>

          <Card hoverable>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">{t.contact.github.heading}</h3>
            <p className="text-gray-600 mb-4">
              {t.contact.github.description}
            </p>
            <a
              href="https://github.com/Namainchick"
              target="_blank"
              rel="noopener noreferrer"
              className="animated-link text-teal-600 hover:text-teal-700 font-medium"
            >
              {t.contact.github.cta}
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
