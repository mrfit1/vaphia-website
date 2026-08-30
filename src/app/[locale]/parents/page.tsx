import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShieldCheck, Baby, Database, Link2, Mail, LockKeyhole } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ParentControls } from "@/components/ParentControls";
import { getPageContent } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { uiCopy } from "@/lib/ui-copy";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "parents", await getPageContent(locale, "parents"));
}

export default async function ParentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const content = await getPageContent(locale, "parents");
  const t = uiCopy[locale];
  const icons = [Baby, Database, Link2, LockKeyhole, ShieldCheck, Mail];
  const notes = (t.privacyCards as string[]).map((title, index) => ({ Icon: icons[index], title, text: (t.privacyDescriptions as string[])[index] }));

  return (
    <main>
      <PageHero eyebrow={content.eyebrow} title={content.title} description={content.description} />
      <section className="shell privacy-grid">
        {notes.map(({ Icon, title, text }) => (
          <article className="privacy-card" key={title}><span><Icon /></span><h2>{title}</h2><p>{text}</p></article>
        ))}
      </section>
      <div className="shell"><ParentControls locale={locale} /></div>
      <section className="shell legal-note">
        <h2>{t.privacyNotice as string}</h2>
        <p>{t.privacyNoticeText as string}</p>
      </section>
    </main>
  );
}
