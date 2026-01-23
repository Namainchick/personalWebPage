"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "de" ? "en" : "de");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-sm font-medium text-gray-400 hover:text-[#4f46e5] transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/5"
      aria-label="Switch language"
    >
      {language === "de" ? "EN" : "DE"}
    </button>
  );
}
