import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryReader } from "@/components/storyhouse/StoryReader";
import { storyById, storyCatalog } from "@/lib/stories/catalog";
import { isLocale, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return storyCatalog.map((book) => ({ locale: book.locale, bookId: book.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; bookId: string }> }): Promise<Metadata> {
  const { locale, bookId } = await params;
  if (!isLocale(locale)) return {};
  const book = storyById(locale, bookId);
  if (!book) return {};
  return {
    title: book.title,
    description: book.blurb,
    alternates: { canonical: `${siteConfig.defaultUrl}/${locale}/storyhouse/${book.id}` }
  };
}

export default async function BookPage({ params }: { params: Promise<{ locale: string; bookId: string }> }) {
  const { locale, bookId } = await params;
  if (!isLocale(locale)) notFound();
  const book = storyById(locale as Locale, bookId);
  if (!book) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    description: book.blurb,
    inLanguage: locale,
    url: `${siteConfig.defaultUrl}/${locale}/storyhouse/${book.id}`,
    numberOfPages: book.pages.length
  };
  return (
    <main className="shell">
      <h1 className="story-title">{book.title}</h1>
      <StoryReader book={book} locale={locale as Locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}

