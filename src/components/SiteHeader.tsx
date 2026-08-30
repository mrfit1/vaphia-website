import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n";

const nav: Record<Locale, Record<string, string>> = {
  en: { watch: "Watch", play: "Play", create: "Create", storyhouse: "Storyhouse", about: "About", parents: "Parents", me: "Me" },
  fa: { watch: "تماشا", play: "بازی", create: "بساز", storyhouse: "قصه", about: "درباره", parents: "والدین", me: "من" },
  fr: { watch: "Regarder", play: "Jouer", create: "Créer", storyhouse: "Histoires", about: "À propos", parents: "Parents", me: "Moi" },
  es: { watch: "Ver", play: "Jugar", create: "Crear", storyhouse: "Cuentos", about: "Acerca", parents: "Padres", me: "Yo" }
};

export function SiteHeader({ locale }: { locale: Locale }) {
  return (
    <header className="site-header shell">
      <Link className="brand" href={`/${locale}`} aria-label="Vaphia home">
        <span className="brand-mark" aria-hidden="true">✦</span>
        <span>Vaphia</span>
      </Link>
      <nav className="main-nav pictorial-nav" aria-label="Primary navigation">
        <Link href={`/${locale}/watch`}><span aria-hidden="true">▶</span>{nav[locale].watch}</Link>
        <Link href={`/${locale}/play`}><span aria-hidden="true">🎮</span>{nav[locale].play}</Link>
        <Link href={`/${locale}/create`}><span aria-hidden="true">🖍️</span>{nav[locale].create}</Link>
        <Link href={`/${locale}/storyhouse`}><span aria-hidden="true">📖</span>{nav[locale].storyhouse}</Link>
        <Link href={`/${locale}/about`}>{nav[locale].about}</Link>
      </nav>
      <div className="header-tools">
        <Link className="parents-link" href={`/${locale}/me`}>{nav[locale].me}</Link>
        <LanguageSwitcher locale={locale} />
        <Link className="parents-link" href={`/${locale}/parents`}>{nav[locale].parents}</Link>
      </div>
    </header>
  );
}
