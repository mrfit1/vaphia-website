import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { storiesForLocale } from "@/lib/stories/catalog";
import { StoryHub } from "@/components/storyhouse/StoryHub";
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
      <StoryHub locale={locale} books={books} />
    </main>
  );
}
