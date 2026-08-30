import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { GameHub } from "@/components/games/GameHub";
import { StarWallet } from "@/components/games/StarWallet";
import { getGlobalSettings, getPageContent } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "play", await getPageContent(locale, "play"));
}

export default async function PlayPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const [content, settings] = await Promise.all([getPageContent(locale, "play"), getGlobalSettings()]);
  return (
    <main>
      <PageHero eyebrow={content.eyebrow} title={content.title} description={content.description} />
      <div className="shell play-topbar"><StarWallet locale={locale} /></div>
      <div className="shell"><GameHub locale={locale} enabled={settings.gamesEnabled} /></div>
    </main>
  );
}
