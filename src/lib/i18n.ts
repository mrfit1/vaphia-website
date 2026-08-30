export const locales = ["en", "fa", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  fa: "فارسی",
  fr: "Français",
  es: "Español"
};

export const localeDirections: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  fa: "rtl",
  fr: "ltr",
  es: "ltr"
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
