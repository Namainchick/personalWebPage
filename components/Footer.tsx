"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer 
      className="mt-32 border-t border-white/10 backdrop-blur-xl bg-white/[0.03]"
      style={{
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(79, 70, 229, 0.05)'
      }}
    >
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
              className="text-gray-400 hover:text-[#4f46e5] transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]"
            >
              {t.footer.imprint}
            </Link>
            <Link
              href="/datenschutz"
              className="text-gray-400 hover:text-[#4f46e5] transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]"
            >
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
