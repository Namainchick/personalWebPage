export type Language = "de" | "en";

export const DEFAULT_LANGUAGE: Language = "en";
export const LANGUAGE_COOKIE = "lang";

export function normalizeLanguage(value?: string | null): Language {
  if (value === "de" || value === "en") {
    return value;
  }
  return DEFAULT_LANGUAGE;
}
