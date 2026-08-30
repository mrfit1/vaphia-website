"use client";

import { useEffect } from "react";
import { playWin } from "@/lib/sound";
import { stickerCatalog, type StickerId } from "@/lib/stickers";
import { Mark } from "@/components/marks/VaphiaMarks";
import type { Locale } from "@/lib/i18n";

const copy: Record<Locale, { wow: string; sticker: string; tap: string }> = {
  en: { wow: "Yay!", sticker: "New sticker", tap: "Tap to keep playing" },
  fa: { wow: "آفرین!", sticker: "استیکر تازه", tap: "بزن تا ادامه بدهیم" },
  fr: { wow: "Bravo !", sticker: "Nouveau sticker", tap: "Touche pour continuer" },
  es: { wow: "¡Bien!", sticker: "Nuevo sticker", tap: "Toca para seguir" }
};

export function Celebration({
  locale,
  sticker,
  onDone
}: {
  locale: Locale;
  sticker: StickerId;
  onDone: () => void;
}) {
  const item = stickerCatalog.find((entry) => entry.id === sticker);
  const t = copy[locale];

  useEffect(() => {
    playWin();
    const timer = window.setTimeout(() => onDone(), 4200);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className="celebration-burst"
      role="button"
      tabIndex={0}
      onClick={onDone}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onDone();
      }}
    >
      <div className="celebration-card" onClick={(event) => event.stopPropagation()}>
        <span className="celebration-sparkles" aria-hidden="true">
          <Mark id="sparkle" />
        </span>
        <strong>{t.wow}</strong>
        <span className="celebration-sticker" style={{ background: item?.tint }}>
          {item ? <Mark id={item.icon} /> : null}
        </span>
        <em>{t.sticker}</em>
        <button className="giant-next-button" type="button" onClick={onDone}>
          {t.tap}
        </button>
      </div>
    </div>
  );
}
