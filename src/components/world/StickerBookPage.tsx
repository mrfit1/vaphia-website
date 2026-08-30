"use client";

import { useEffect, useState } from "react";
import { afterPaint } from "@/lib/client-state";
import { readStickerBook, stickerCatalog } from "@/lib/stickers";
import { Mark } from "@/components/marks/VaphiaMarks";
import type { Locale } from "@/lib/i18n";

const copy: Record<Locale, { title: string; intro: string; collected: string; locked: string }> = {
  en: { title: "Sticker book", intro: "Collect bright little friends as you play, read and create.", collected: "collected", locked: "Keep playing to unlock" },
  fa: { title: "دفتر استیکر", intro: "با بازی، قصه و خلاقیت، دوست‌های رنگی کوچولو جمع کن.", collected: "جمع شده", locked: "برای باز شدن بیشتر بازی کن" },
  fr: { title: "Carnet de stickers", intro: "Collectionne de petits amis colorés en jouant et en créant.", collected: "collectionnés", locked: "Joue encore pour débloquer" },
  es: { title: "Libro de stickers", intro: "Colecciona amiguitos llenos de color mientras juegas y creas.", collected: "conseguidos", locked: "Juega para desbloquear" }
};

export function StickerBookPage({ locale }: { locale: Locale }) {
  const [owned, setOwned] = useState<string[]>([]);
  const t = copy[locale];
  useEffect(() => {
    const refresh = () => setOwned(readStickerBook());
    const stop = afterPaint(refresh);
    window.addEventListener("vaphia-stickers", refresh);
    return () => { stop(); window.removeEventListener("vaphia-stickers", refresh); };
  }, []);

  const collected = stickerCatalog.filter((item) => owned.includes(item.id)).length;

  return (
    <section className="sticker-book-page shell">
      <div className="sticker-book-heading">
        <div>
          <span className="eyebrow">Vaphia collection</span>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
        </div>
        <div className="sticker-progress" aria-label={`${collected} / ${stickerCatalog.length} ${t.collected}`}>
          <strong>{collected}/{stickerCatalog.length}</strong>
          <span>{t.collected}</span>
        </div>
      </div>
      <div className="sticker-grid">
        {stickerCatalog.map((item) => (
          <article key={item.id} className={`sticker-card ${owned.includes(item.id) ? "owned" : "locked"}`} style={{ background: owned.includes(item.id) ? item.tint : "#f4eef8" }}>
            <span className="sticker-card-status">{owned.includes(item.id) ? "✓" : "✦"}</span>
            <span className="sticker-art"><Mark id={item.icon} /></span>
            <strong>{item.titles[locale]}</strong>
            <span>{owned.includes(item.id) ? "♥" : t.locked}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
