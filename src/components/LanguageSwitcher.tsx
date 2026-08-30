"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe2 } from "lucide-react";
import { localeNames, locales, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function changeLocale(nextLocale: Locale) {
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] && locales.includes(parts[0] as Locale)) parts[0] = nextLocale;
    else parts.unshift(nextLocale);
    router.push(`/${parts.join("/")}`);
  }

  return (
    <label className="language-switcher" aria-label="Language">
      <Globe2 size={17} aria-hidden="true" />
      <select value={locale} onChange={(e) => changeLocale(e.target.value as Locale)}>
        {locales.map((item) => (
          <option key={item} value={item}>{localeNames[item]}</option>
        ))}
      </select>
    </label>
  );
}
