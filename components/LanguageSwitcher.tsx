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
      className="text-sm font-medium text-gray-500 hover:text-teal-600 transition-all duration-200 px-3 py-1 rounded-full hover:bg-gray-100"
      aria-label="Switch language"
    >
      {language === "de" ? "EN" : "DE"}
    </button>
  );
}
