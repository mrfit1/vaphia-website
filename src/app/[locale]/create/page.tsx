import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { DoodlePad } from "@/components/create/DoodlePad";
import { ColoringStudio } from "@/components/create/ColoringStudio";
import { getPageContent } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { uiCopy } from "@/lib/ui-copy";

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
  const t = uiCopy[locale];
  return (
    <main>
      <PageHero eyebrow={content.eyebrow} title={content.title} description={content.description} />
      <div className="shell creative-stack">
        <DoodlePad locale={locale} />
        <ColoringStudio locale={locale} />
        <section className="creative-card printable-card">
          <div><span className="eyebrow">{t.printable as string}</span><h2>{t.coloringPage as string}</h2><p>{t.printableText as string}</p></div>
          <Link className="button primary" href="/coloring-vaphia-stars.svg" download><Download size={18} /> {t.download as string}</Link>
        </section>
      </div>
    </main>
  );
}
