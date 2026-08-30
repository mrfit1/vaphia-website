import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { coloringById, coloringCatalog } from "@/lib/coloring/catalog";
import { ColoringSheet } from "@/components/create/ColoringSheet";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return locales.flatMap((locale) => coloringCatalog.map((page) => ({ locale, pageId: page.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; pageId: string }> }): Promise<Metadata> {
  const { locale, pageId } = await params;
  if (!isLocale(locale)) return {};
  const page = coloringById(pageId);
  if (!page) return {};
  return { title: page.titles[locale as Locale], alternates: { canonical: `${siteConfig.defaultUrl}/${locale}/create/color/${page.id}` } };
}

export default async function ColorPage({ params }: { params: Promise<{ locale: string; pageId: string }> }) {
  const { locale, pageId } = await params;
  if (!isLocale(locale)) notFound();
  const page = coloringById(pageId);
  if (!page) notFound();
  return <main className="shell"><ColoringSheet page={page} locale={locale as Locale} /></main>;
}
