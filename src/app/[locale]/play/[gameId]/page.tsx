import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { gameById, gameCatalog } from "@/lib/games/catalog";
import { GamePlayer } from "@/components/games/GamePlayer";
import { getGlobalSettings } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return locales.flatMap((locale) => gameCatalog.map((game) => ({ locale, gameId: game.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; gameId: string }> }): Promise<Metadata> {
  const { locale, gameId } = await params;
  if (!isLocale(locale)) return {};
  const game = gameById(gameId);
  if (!game) return {};
  const title = game.titles[locale as Locale];
  const url = `${siteConfig.defaultUrl}/${locale}/play/${game.id}`;
  return {
    title,
    description: title,
    alternates: { canonical: url },
    openGraph: { title, url, type: "website" }
  };
}

export default async function GamePage({ params }: { params: Promise<{ locale: string; gameId: string }> }) {
  const { locale: rawLocale, gameId } = await params;
  if (!isLocale(rawLocale)) notFound();
  const game = gameById(gameId);
  if (!game) notFound();
  const settings = await getGlobalSettings();
  return (
    <main className="shell game-page">
      <GamePlayer game={game} locale={rawLocale} imageUrl={settings.heroImage} />
    </main>
  );
}
