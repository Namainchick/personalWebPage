"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LANGUAGE_COOKIE, type Language } from "@/lib/i18n-shared";

interface LanguageSwitcherProps {
  language: Language;
  compact?: boolean;
}

export default function LanguageSwitcher({ language, compact = false }: LanguageSwitcherProps) {
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
    <button
      type="button"
      onClick={toggleLanguage}
      className={`text-sm font-semibold transition-all duration-200 rounded-full ${
        compact
          ? "px-2.5 py-1 border border-teal-200 text-teal-700 bg-white/80 hover:bg-teal-50"
          : "px-3 py-1 text-gray-500 hover:text-teal-700 hover:bg-white"
      } ${isPending ? "opacity-60" : ""}`}
      aria-label={`Switch language to ${nextLanguage.toUpperCase()}`}
      disabled={isPending}
    >
      {nextLanguage.toUpperCase()}
    </button>
  );
}
