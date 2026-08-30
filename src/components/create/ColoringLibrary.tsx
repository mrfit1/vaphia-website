"use client";

import { useEffect, useState } from "react";
import { afterPaint } from "@/lib/client-state";
import Link from "next/link";
import { readAgeBand, type AgeBand } from "@/lib/age";
import { coloringForAge } from "@/lib/coloring/catalog";
import type { Locale } from "@/lib/i18n";

export function ColoringLibrary({ locale }: { locale: Locale }) {
  const [age, setAge] = useState<AgeBand | null>(null);
  useEffect(() => afterPaint(() => setAge(readAgeBand())), []);
  const pages = coloringForAge(age);

  return (
    <section className="coloring-library">
      <div className="game-hub-grid">
        {pages.map((page) => (
          <Link key={page.id} href={`/${locale}/create/color/${page.id}`} className="coloring-card">
            <span className="coloring-thumb" style={{ backgroundImage: `url(${page.file})` }} aria-hidden="true" />
            <strong>{page.titles[locale]}</strong>
            <span className="print-mark" aria-hidden="true">🖨️</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
