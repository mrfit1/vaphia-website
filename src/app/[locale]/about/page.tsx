import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { getGlobalSettings, getPageContent } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { uiCopy } from "@/lib/ui-copy";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "about", await getPageContent(locale, "about"));
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const t = uiCopy[locale];
  const [content, settings] = await Promise.all([getPageContent(locale, "about"), getGlobalSettings()]);
  return (
    <main>
      <PageHero eyebrow={content.eyebrow} title={content.title} description={content.description} />
      <section className="shell about-layout">
        <div className="about-photo"><Image src={settings.heroImage} alt="Vania and Sophia" fill sizes="(max-width: 800px) 100vw, 45vw" className="cover-image" /></div>
        <div className="about-copy">
          <article><span>⭐</span><div><h2>Vania</h2><p>{t.aboutVania as string}</p></div></article>
          <article><span>🌸</span><div><h2>Sophia</h2><p>{t.aboutSophia as string}</p></div></article>
          <article><span>💖</span><div><h2>{t.together as string}</h2><p>{t.aboutTogether as string}</p></div></article>
        </div>
      </section>
    </main>
  );
}
