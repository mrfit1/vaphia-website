import type { Metadata } from "next";
import Link from "next/link";
import { House, Flower2, FerrisWheel, Palette, CakeSlice, BookHeart } from "lucide-react";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { getPageContent } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { uiCopy } from "@/lib/ui-copy";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "explore", await getPageContent(locale, "explore"));
}

export default async function ExplorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const content = await getPageContent(locale, "explore");
  const t = uiCopy[locale];
  const icons = [House, Flower2, FerrisWheel, Palette, CakeSlice, BookHeart];
  const hrefs = ["watch", "create", "play", "create", "watch", "watch"];
  const places = (t.places as string[]).map((name, index) => ({ Icon: icons[index], name, text: (t.placeDescriptions as string[])[index], href: hrefs[index] }));
  return (
    <main>
      <PageHero eyebrow={content.eyebrow} title={content.title} description={content.description} />
      <section className="shell explore-map">
        {places.map(({ Icon, name, text, href }, index) => (
          <Link key={name} href={`/${locale}/${href}`} className={`explore-place place-${index + 1}`}>
            <span className="explore-illustration"><Icon size={64} /></span>
            <strong>{name}</strong>
            <span>{text}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
