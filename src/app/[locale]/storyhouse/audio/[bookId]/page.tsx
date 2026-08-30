import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AudioBookReader } from "@/components/storyhouse/AudioBookReader";
import { audioBookById, audioBookCatalog } from "@/lib/stories/audio-catalog";
import { isLocale, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return audioBookCatalog.map((book) => ({ locale: book.locale, bookId: book.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; bookId: string }> }): Promise<Metadata> {
  const { locale, bookId } = await params;
  if (!isLocale(locale)) return {};
  const book = audioBookById(locale, bookId);
  if (!book) return {};
  return {
    title: `${book.title} · Vaphia Audio`,
    description: book.blurb,
    alternates: { canonical: `${siteConfig.defaultUrl}/${locale}/storyhouse/audio/${book.id}` }
  };
}

export default async function AudioBookPage({ params }: { params: Promise<{ locale: string; bookId: string }> }) {
  const { locale, bookId } = await params;
  if (!isLocale(locale)) notFound();
  const book = audioBookById(locale as Locale, bookId);
  if (!book) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Audiobook",
    name: book.title,
    description: book.blurb,
    inLanguage: locale,
    url: `${siteConfig.defaultUrl}/${locale}/storyhouse/audio/${book.id}`,
    duration: `PT${book.minutes}M`,
    isAccessibleForFree: true,
    creator: { "@type": "Organization", name: "Vaphia" }
  };
  return (
    <main className="shell">
      <AudioBookReader book={book} locale={locale as Locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
