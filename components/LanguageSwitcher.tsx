"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LANGUAGE_COOKIE, type Language } from "@/lib/i18n-shared";

interface LanguageSwitcherProps {
  language: Language;
  compact?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function LanguageSwitcher({ language, compact: _compact = false }: LanguageSwitcherProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(lang: Language) {
    if (lang === language) return;
    document.cookie = `${LANGUAGE_COOKIE}=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`;
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div
      className={`inline-flex items-center gap-1 font-mono text-[13px] ${isPending ? "opacity-50" : ""}`}
      aria-label="Language switcher"
    >
      <button
        type="button"
        onClick={() => switchTo("de")}
        disabled={isPending}
        aria-pressed={language === "de"}
        className={`px-1 transition-colors duration-150 ${
          language === "de"
            ? "text-[var(--accent-deep)] font-semibold"
            : "text-[var(--muted)] hover:text-[var(--accent-deep)]"
        }`}
      >
        de
      </button>
      <span className="text-[var(--muted-2)]">|</span>
      <button
        type="button"
        onClick={() => switchTo("en")}
        disabled={isPending}
        aria-pressed={language === "en"}
        className={`px-1 transition-colors duration-150 ${
          language === "en"
            ? "text-[var(--accent-deep)] font-semibold"
            : "text-[var(--muted)] hover:text-[var(--accent-deep)]"
        }`}
      >
        en
      </button>
    </div>
  );
}
