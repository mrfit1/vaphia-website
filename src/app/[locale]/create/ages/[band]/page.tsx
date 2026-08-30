import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ColoringLibrary } from "@/components/create/ColoringLibrary";
import { isAgeBand, ageBands } from "@/lib/age";
import { coloringForAge } from "@/lib/coloring/catalog";
import { createCopy } from "@/lib/coloring/copy";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return locales.flatMap((locale) => ageBands.map((band) => ({ locale, band })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; band: string }> }): Promise<Metadata> {
  const { locale, band } = await params;
  if (!isLocale(locale) || !isAgeBand(band)) return {};
  const t = createCopy[locale as Locale];
  return {
    title: t.doors[band].label,
    description: t.doors[band].blurb,
    alternates: { canonical: `${siteConfig.defaultUrl}/${locale}/create/ages/${band}` }
  };
}

export default async function CreateAgePage({ params }: { params: Promise<{ locale: string; band: string }> }) {
  const { locale, band } = await params;
  if (!isLocale(locale) || !isAgeBand(band)) notFound();
  const pages = coloringForAge(band);
  if (!pages.length) notFound();
  return (
    <main className="shell">
      <ColoringLibrary locale={locale} age={band} />
    </main>
  );
}
