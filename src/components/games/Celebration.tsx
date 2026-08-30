"use client";

import { useEffect } from "react";
import { playWin, speakCheer } from "@/lib/sound";
import { stickerCatalog, type StickerId } from "@/lib/stickers";
import type { Locale } from "@/lib/i18n";

const copy: Record<Locale, { wow: string; sticker: string }> = {
  en: { wow: "Yay!", sticker: "New sticker" },
  fa: { wow: "آفرین!", sticker: "استیکر تازه" },
  fr: { wow: "Bravo !", sticker: "Nouveau sticker" },
  es: { wow: "¡Bien!", sticker: "Nuevo sticker" }
};

export function Celebration({
  locale,
  sticker,
  onDone
}: {
  locale: Locale;
  sticker: StickerId;
  onDone?: () => void;
}) {
  const item = stickerCatalog.find((entry) => entry.id === sticker);
  const t = copy[locale];

  useEffect(() => {
    playWin();
    speakCheer(locale);
    const timer = window.setTimeout(() => onDone?.(), 2600);
    return () => window.clearTimeout(timer);
  }, [locale, onDone]);

  return (
    <div className="celebration-burst" role="status">
      <div className="celebration-card">
        <span className="celebration-sparkles" aria-hidden="true">✨⭐✨</span>
        <strong>{t.wow}</strong>
        <span className="celebration-sticker" style={{ background: item?.tint }}>{item?.mark}</span>
        <em>{t.sticker}</em>
      </div>
    </div>
  );
}
