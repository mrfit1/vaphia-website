import Link from "next/link";
import { notFound } from "next/navigation";
import { DrawingStudio } from "@/components/create/DrawingStudio";
import { createCopy } from "@/lib/coloring/copy";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function DrawPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = createCopy[locale as Locale];
  return (
    <main className="shell">
      <div className="create-room-bar">
        <Link href={`/${locale}/create`} className="pictorial-tool pressable" aria-label={t.back}>🚪</Link>
        <h1>{t.draw}</h1>
      </div>
      <DrawingStudio locale={locale as Locale} />
    </main>
  );
}
