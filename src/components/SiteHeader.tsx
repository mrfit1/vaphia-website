import Link from "next/link";
import { Sparkles } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n";

const nav: Record<Locale, Record<string, string>> = {
  en: { watch: "Watch", play: "Play", create: "Create", explore: "Explore", about: "About", parents: "Parents" },
  fa: { watch: "تماشا", play: "بازی", create: "خلاقیت", explore: "کشف", about: "درباره", parents: "والدین" },
  fr: { watch: "Regarder", play: "Jouer", create: "Créer", explore: "Explorer", about: "À propos", parents: "Parents" },
  es: { watch: "Ver", play: "Jugar", create: "Crear", explore: "Explorar", about: "Acerca", parents: "Padres" }
};

export function SiteHeader({ locale }: { locale: Locale }) {
  return (
    <header className="site-header shell">
      <Link className="brand" href={`/${locale}`} aria-label="Vaphia home">
        <span className="brand-mark"><Sparkles size={20} /></span>
        <span>Vaphia</span>
      </Link>
      <nav className="main-nav" aria-label="Primary navigation">
        {(["watch", "play", "create", "explore", "about"] as const).map((item) => (
          <Link key={item} href={`/${locale}/${item}`}>{nav[locale][item]}</Link>
        ))}
      </nav>
      <div className="header-tools">
        <LanguageSwitcher locale={locale} />
        <Link className="parents-link" href={`/${locale}/parents`}>{nav[locale].parents}</Link>
      </div>
    </header>
  );
}
