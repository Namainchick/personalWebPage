"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="mt-32 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-gray-400">
            {t.footer.copyright} {currentYear}
          </p>

          {/* Rechtliches */}
          <div className="flex gap-6 text-sm">
            <Link
              href="/impressum"
              className="text-gray-400 hover:text-teal-600 transition-colors duration-200"
            >
              {t.footer.imprint}
            </Link>
            <Link
              href="/datenschutz"
              className="text-gray-400 hover:text-teal-600 transition-colors duration-200"
            >
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
