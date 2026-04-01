"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { LANGUAGE_COOKIE, type Language } from "@/lib/i18n-shared";

interface SidebarProps {
  language: Language;
  navItems: { href: string; label: string }[];
}

export default function Sidebar({ language, navItems }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const nextLanguage = language === "de" ? "en" : "de";

  function toggleLanguage() {
    document.cookie = `${LANGUAGE_COOKIE}=${nextLanguage}; Path=/; Max-Age=31536000; SameSite=Lax`;
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <aside className="hidden lg:flex flex-col w-60 h-screen sticky top-0 bg-teal-900 p-6 flex-shrink-0">
      {/* Name + Tagline */}
      <div className="mb-10">
        <Link href="/" className="text-xl font-black text-white hover:text-teal-200 transition-colors">
          Namanh
        </Link>
        <p className="text-xs text-teal-300 mt-1.5">CS Student @ TUHH</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {[{ href: "/", label: "Home" }, ...navItems].map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-white/[0.12] text-white font-semibold"
                  : "text-teal-200 hover:bg-white/[0.06]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  isActive
                    ? "bg-teal-300"
                    : "border border-teal-200/30"
                }`}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Social Icons */}
      <div className="flex gap-2.5 mb-4">
        <a
          href="https://github.com/namanhbui"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[34px] h-[34px] flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="GitHub"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#99f6e4">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/namanhbui"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[34px] h-[34px] flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="LinkedIn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#99f6e4">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a
          href="https://tiktok.com/@namanhbui"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[34px] h-[34px] flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="TikTok"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#99f6e4">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
        </a>
      </div>

      {/* Language Switcher */}
      <div className="flex gap-1 p-1 bg-white/[0.08] rounded-full w-fit">
        <button
          type="button"
          onClick={language === "en" ? toggleLanguage : undefined}
          className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-colors ${
            language === "de"
              ? "bg-teal-300 text-teal-900"
              : "text-teal-200 hover:text-white"
          }`}
          disabled={language === "de" || isPending}
        >
          DE
        </button>
        <button
          type="button"
          onClick={language === "de" ? toggleLanguage : undefined}
          className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-colors ${
            language === "en"
              ? "bg-teal-300 text-teal-900"
              : "text-teal-200 hover:text-white"
          }`}
          disabled={language === "en" || isPending}
        >
          EN
        </button>
      </div>
    </aside>
  );
}
