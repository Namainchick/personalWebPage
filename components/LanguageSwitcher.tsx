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
      className="text-sm font-medium text-gray-400 hover:text-teal-600 transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-teal-50"
      aria-label="Switch language"
    >
      {language === "de" ? "EN" : "DE"}
    </button>
  );
}
