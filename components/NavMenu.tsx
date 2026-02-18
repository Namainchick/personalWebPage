"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Language } from "@/lib/i18n-shared";

interface NavItem {
  href: string;
  label: string;
}

interface NavMenuProps {
  items: NavItem[];
  language: Language;
}

export default function NavMenu({ items, language }: NavMenuProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden md:flex items-center gap-2">
        <ul className="flex items-center gap-1">
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-150 ${
                    isActive
                      ? "bg-teal-500 text-white shadow-[0_6px_18px_rgba(20,184,166,0.35)]"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <LanguageSwitcher language={language} />
      </div>

      <div className="flex md:hidden items-center gap-2">
        <LanguageSwitcher language={language} compact />
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-teal-500 text-white shadow-[0_8px_20px_rgba(20,184,166,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-panel"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div
          id="mobile-nav-panel"
          className="absolute left-4 right-4 top-[4.5rem] rounded-2xl border border-orange-200 bg-gradient-to-br from-white via-orange-50 to-teal-50 p-3 shadow-xl md:hidden"
        >
          <ul className="flex flex-col gap-2">
            {items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-xl px-4 py-3 text-sm font-bold tracking-wide transition-colors ${
                      isActive
                        ? "bg-teal-500 text-white"
                        : "bg-white/70 text-gray-700 hover:bg-orange-100"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
