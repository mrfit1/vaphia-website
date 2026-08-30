import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CreateHub } from "@/components/create/CreateHub";
import { getPageContent } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "create", await getPageContent(locale, "create"));
}

export default async function CreatePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  return (
    <main className="shell">
      <CreateHub locale={rawLocale as Locale} />
    </main>
  );
}
