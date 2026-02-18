import Link from "next/link";
import type { Language } from "@/lib/i18n-shared";
import { getTranslations } from "@/lib/i18n";

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = getTranslations(language);

  return (
    <footer className="mt-20 bg-teal-900 text-white">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-sm text-teal-200">
            {t.footer.copyright} {currentYear}
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/impressum"
              className="text-teal-200 hover:text-white transition-colors duration-200"
            >
              {t.footer.imprint}
            </Link>
            <Link
              href="/datenschutz"
              className="text-teal-200 hover:text-white transition-colors duration-200"
            >
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
