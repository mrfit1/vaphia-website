import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Play, Smartphone, Heart } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { GrownUpSocialLink, YouTubeLogo } from "@/components/SocialIcons";
import { getGlobalSettings, getPageContent } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { uiCopy } from "@/lib/ui-copy";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "watch", await getPageContent(locale, "watch"));
}

export default async function WatchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const t = uiCopy[locale];
  const [content, settings] = await Promise.all([getPageContent(locale, "watch"), getGlobalSettings()]);
  const icons = [Play, Smartphone, Heart];
  const cards = (t.watchCards as string[]).map((title, index) => ({ Icon: icons[index], title, text: (t.watchDescriptions as string[])[index] }));
  return (
    <main>
      <PageHero eyebrow={content.eyebrow} title={content.title} description={content.description} />
      <section className="shell watch-grid">
        {cards.map(({ Icon, title, text }, index) => (
          <article className={`watch-card watch-${index + 1}`} key={title}>
            <span className="watch-icon"><Icon /></span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="shell youtube-callout">
        <YouTubeLogo width={46} height={46} aria-hidden="true" />
        <div><strong>{content.cta}</strong><p>{t.channel as string}</p></div>
        <GrownUpSocialLink name="youtube" href={settings.youtubeUrl} locale={locale} />
      </section>
    </main>
  );
}
