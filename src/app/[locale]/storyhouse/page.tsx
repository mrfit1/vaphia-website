import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { storiesForLocale } from "@/lib/stories/catalog";
import { getPageContent } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "storyhouse", await getPageContent(locale, "storyhouse"));
}

export default async function StoryhousePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const content = await getPageContent(locale, "storyhouse");
  const books = storiesForLocale(locale);
  return (
    <main>
      <PageHero eyebrow={content.eyebrow} title={content.title} description={content.description} />
      <section className="shell story-grid">
        {books.map((book) => (
          <Link key={book.id} href={`/${locale}/storyhouse/${book.id}`} className="story-card">
            <span className="land-mark">{book.pages[0]?.mark}</span>
            <strong>{book.title}</strong>
            <span>{book.blurb}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
