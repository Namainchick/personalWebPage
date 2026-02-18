import Link from "next/link";
import type { Language } from "@/lib/i18n-shared";
import { getTranslations } from "@/lib/i18n";
import NavMenu from "@/components/NavMenu";

interface NavProps {
  language: Language;
}

export default function Nav({ language }: NavProps) {
  const t = getTranslations(language);

  const navItems = [
    { label: t.nav.experiences, href: "/erfahrungen" },
    { label: t.nav.projects, href: "/projekte" },
    { label: t.nav.contact, href: "/kontakt" },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-[#F5F0EB]/80 backdrop-blur-md relative">
      <nav className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xl font-black tracking-tight text-gray-900 hover:text-teal-600 transition-colors"
            >
              Namanh
            </Link>
          </div>

          <NavMenu items={navItems} language={language} />
        </div>
      </nav>
    </header>
  );
}
