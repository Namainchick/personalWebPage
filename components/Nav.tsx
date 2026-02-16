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
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-[#FAFAF8]/80 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <nav className="mx-auto w-full max-w-[95%] px-2 md:px-3 lg:px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo + Navigation */}
          <div className="flex items-center gap-6">
            {/* Logo/Name */}
            <Link href="/" className="group">
              <span className="text-lg font-semibold tracking-tight text-gray-900 hover:text-teal-600 transition-colors duration-200">
                Namanh
              </span>
            </Link>

            {/* Navigation Links */}
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        relative px-3 py-2 text-sm font-medium transition-all duration-150
                        ${isActive ? "text-teal-600" : "text-gray-500 hover:text-gray-900"}
                      `}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Language Switcher + Social Links */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <a
              href="https://www.linkedin.com/in/namanh-bui-vu-37b05a2a9/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-teal-600 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Namainchick"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-teal-600 transition-colors duration-200"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="mailto:namanh.bui2005@gmail.com"
              className="text-sm text-gray-400 hover:text-teal-600 transition-colors duration-200"
              aria-label="E-Mail"
            >
              Mail
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
