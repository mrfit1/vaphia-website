import { notFound } from "next/navigation";
import { StickerBookPage } from "@/components/world/StickerBookPage";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function StickersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <main><StickerBookPage locale={locale as Locale} /></main>;
}
