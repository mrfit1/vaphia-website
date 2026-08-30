import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorldHome } from "@/components/world/WorldHome";
import { getGlobalSettings, getPageContent } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = await getPageContent(locale, "home");
  return buildMetadata(locale, "home", content);
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const [content, settings] = await Promise.all([getPageContent(locale, "home"), getGlobalSettings()]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", url: siteConfig.defaultUrl, name: settings.brandName, inLanguage: ["en", "fa", "fr", "es"] },
      { "@type": "Brand", name: settings.brandName, sameAs: [settings.youtubeUrl, settings.tiktokUrl, settings.instagramUrl] }
    ]
  };

  return (
    <>
      <WorldHome
        locale={locale}
        heroImage={settings.heroImage}
        youtubeUrl={settings.youtubeUrl}
        tiktokUrl={settings.tiktokUrl}
        instagramUrl={settings.instagramUrl}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <span className="sr-only">{content.title}</span>
    </>
  );
}
