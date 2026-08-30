"use client";

import { useEffect, useState } from "react";
import { afterPaint } from "@/lib/client-state";
import { readStickerBook, stickerCatalog } from "@/lib/stickers";
import { Mark } from "@/components/marks/VaphiaMarks";
import type { Locale } from "@/lib/i18n";

const titles: Record<Locale, string> = {
  en: "Sticker book",
  fa: "دفتر استیکر",
  fr: "Carnet de stickers",
  es: "Libro de stickers"
};

export function StickerBookPage({ locale }: { locale: Locale }) {
  const [owned, setOwned] = useState<string[]>([]);
  useEffect(() => {
    const refresh = () => setOwned(readStickerBook());
    const stop = afterPaint(refresh);
    window.addEventListener("vaphia-stickers", refresh);
    return () => { stop(); window.removeEventListener("vaphia-stickers", refresh); };
  }, []);

  return (
    <section className="sticker-book-page shell">
      <h1>{titles[locale]}</h1>
      <div className="sticker-grid">
        {stickerCatalog.map((item) => (
          <div key={item.id} className={`sticker-slot ${owned.includes(item.id) ? "owned" : "locked"}`} style={{ background: owned.includes(item.id) ? item.tint : "#f4eef8" }}>
            {owned.includes(item.id) ? <Mark id={item.icon} /> : <span>○</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
