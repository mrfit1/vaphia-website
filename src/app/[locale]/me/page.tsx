import { notFound } from "next/navigation";
import { KidGate } from "@/components/membership/KidGate";
import { StickerBookPage } from "@/components/world/StickerBookPage";
import { StarWallet } from "@/components/games/StarWallet";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function MePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <main className="shell me-page">
      <StarWallet locale={locale as Locale} />
      <KidGate locale={locale as Locale} />
      <StickerBookPage locale={locale as Locale} />
    </main>
  );
}
