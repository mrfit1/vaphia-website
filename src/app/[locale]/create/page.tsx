import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { DrawingStudio } from "@/components/create/DrawingStudio";
import { ColoringLibrary } from "@/components/create/ColoringLibrary";
import { getPageContent } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "create", await getPageContent(locale, "create"));
}

export default async function CreatePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const content = await getPageContent(locale, "create");
  return (
    <main>
      <PageHero eyebrow={content.eyebrow} title={content.title} description={content.description} />
      <div className="shell creative-stack">
        <DrawingStudio locale={locale} />
        <ColoringLibrary locale={locale} />
        <Link className="giant-print-button" href={`/${locale}/create/draw`}>🖍️</Link>
      </div>
    </main>
  );
}
