"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Nav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.experiences, href: "/erfahrungen" },
    { label: t.nav.projects, href: "/projekte" },
    { label: t.nav.contact, href: "/kontakt" },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-[#F5F0EB]/80 backdrop-blur-md">
      <nav className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-black tracking-tight text-gray-900 hover:text-teal-600 transition-colors">
              Namanh
            </Link>

            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-150 ${
                        isActive
                          ? "bg-teal-500 text-white"
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Language Switcher */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}
