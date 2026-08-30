import { notFound } from "next/navigation";
import { DrawingStudio } from "@/components/create/DrawingStudio";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function DrawPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <main className="shell"><DrawingStudio locale={locale as Locale} /></main>;
}
