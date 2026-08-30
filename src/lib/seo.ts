import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/config/site";
import { getGlobalSettings } from "@/lib/content";
import type { PageContent, PageKey } from "@/lib/content-types";

export function localizedAlternates(locale: Locale, page: PageKey | "home") {
  const path = page === "home" ? "" : `/${page}`;
  const languages = Object.fromEntries(
    locales.map((loc) => [loc, `${siteConfig.defaultUrl}/${loc}${path}`])
  );

  return {
    canonical: `${siteConfig.defaultUrl}/${locale}${path}`,
    languages: {
      ...languages,
      "x-default": `${siteConfig.defaultUrl}/en${path}`
    }
  };
}

export async function buildMetadata(locale: Locale, page: PageKey, content: PageContent): Promise<Metadata> {
  const settings = await getGlobalSettings();
  const title = content.metaTitle || "Vaphia";
  const description = content.metaDescription || "Vaphia";
  const path = page === "home" ? "" : `/${page}`;
  const url = `${siteConfig.defaultUrl}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      ...localizedAlternates(locale, page),
      types: { "application/json": `${siteConfig.defaultUrl}/api/public-content?lang=${locale}` }
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: settings.brandName,
      images: [{ url: settings.bannerImage, width: 1366, height: 768, alt: "Vaphia — Vania and Sophia" }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [settings.bannerImage]
    }
  };
}
