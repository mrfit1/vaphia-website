import Link from "next/link";
import type { AgeBand } from "@/lib/age";
import { coloringForAge } from "@/lib/coloring/catalog";
import { createCopy } from "@/lib/coloring/copy";
import type { Locale } from "@/lib/i18n";

export function ColoringLibrary({ locale, age }: { locale: Locale; age: AgeBand }) {
  const t = createCopy[locale];
  const pages = coloringForAge(age);

  return (
    <section className={`coloring-library hub-${age}`}>
      <div className="create-room-bar">
        <Link href={`/${locale}/create`} className="pictorial-tool pressable" aria-label={t.back}>🚪</Link>
        <h1>{t.doors[age].label}</h1>
      </div>
      <div className="coloring-grid">
        {pages.map((page) => (
          <Link key={page.id} href={`/${locale}/create/color/${page.id}`} className="coloring-card pressable">
            <span className="coloring-thumb" style={{ backgroundImage: `url(${page.file})` }} aria-hidden="true" />
            <strong>{page.titles[locale]}</strong>
            <span className="print-mark" aria-hidden="true">🖨️</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
