export const LOCALES = [
  { code: "en", label: "English",  flag: "🇬🇧", dir: "ltr" },
  { code: "he", label: "עברית",    flag: "🇮🇱", dir: "rtl" },
  { code: "fr", label: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "es", label: "Español",  flag: "🇪🇸", dir: "ltr" },
  { code: "zh", label: "中文",     flag: "🇨🇳", dir: "ltr" },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];
export type Dir = "ltr" | "rtl";

export const DEFAULT_LOCALE: LocaleCode = "en";
export const LOCALE_COOKIE = "assistill_locale";

export function getDir(code: LocaleCode): Dir {
  return code === "he" ? "rtl" : "ltr";
}

export function isValidLocale(code: string): code is LocaleCode {
  return LOCALES.some((l) => l.code === code);
}
