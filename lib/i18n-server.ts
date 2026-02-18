import { cookies } from "next/headers";
import { getTranslations } from "@/lib/i18n";
import { LANGUAGE_COOKIE, normalizeLanguage } from "@/lib/i18n-shared";

export async function getServerLanguage() {
  const cookieStore = await cookies();
  return normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
}

export async function getServerI18n() {
  const language = await getServerLanguage();
  return {
    language,
    t: getTranslations(language),
  };
}
