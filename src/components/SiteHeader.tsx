import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Mark } from "@/components/marks/VaphiaMarks";
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
      <Link className="brand pressable" href={`/${locale}`} aria-label="Vaphia home">
        <span className="brand-mark" aria-hidden="true"><Mark id="sparkle" /></span>
        <span>Vaphia</span>
      </Link>
      <nav className="main-nav pictorial-nav" aria-label="Primary navigation">
        <Link className="pressable" href={`/${locale}/watch`}><span className="nav-mark"><Mark id="watch" /></span>{nav[locale].watch}</Link>
        <Link className="pressable" href={`/${locale}/play`}><span className="nav-mark"><Mark id="play" /></span>{nav[locale].play}</Link>
        <Link className="pressable" href={`/${locale}/create`}><span className="nav-mark"><Mark id="create" /></span>{nav[locale].create}</Link>
        <Link className="pressable" href={`/${locale}/storyhouse`}><span className="nav-mark"><Mark id="story" /></span>{nav[locale].storyhouse}</Link>
        <Link className="pressable" href={`/${locale}/about`}>{nav[locale].about}</Link>
      </nav>
      <div className="header-tools">
        <Link className="parents-link pressable" href={`/${locale}/me`}>{nav[locale].me}</Link>
        <LanguageSwitcher locale={locale} />
        <Link className="parents-link pressable" href={`/${locale}/parents`}>{nav[locale].parents}</Link>
      </div>
    </header>
  );
}
