"use client";

import { useEffect, useState } from "react";
import { afterPaint } from "@/lib/client-state";
import { addVaphiaStars as addStars, readStars, resetVaphiaStars as resetStars } from "@/lib/stars";
import { readStickerBook } from "@/lib/stickers";
import type { Locale } from "@/lib/i18n";

const labels: Record<Locale, { stars: string; stickers: string }> = {
  en: { stars: "Stars", stickers: "Stickers" },
  fa: { stars: "ستاره‌ها", stickers: "استیکرها" },
  fr: { stars: "Étoiles", stickers: "Stickers" },
  es: { stars: "Estrellas", stickers: "Stickers" }
};

export function addVaphiaStars(amount: number) {
  addStars(amount);
}

export function resetVaphiaStars() {
  resetStars();
}

export function StarWallet({ locale }: { locale: Locale }) {
  const [stars, setStars] = useState(0);
  const [stickers, setStickers] = useState(0);
  const t = labels[locale];

  useEffect(() => {
    const refresh = () => {
      setStars(readStars());
      setStickers(readStickerBook().length);
    };
    const stop = afterPaint(refresh);
    window.addEventListener("vaphia-stars", refresh);
    window.addEventListener("vaphia-stickers", refresh);
    return () => {
      stop();
      window.removeEventListener("vaphia-stars", refresh);
      window.removeEventListener("vaphia-stickers", refresh);
    };
  }, []);

  return (
    <div className="star-wallet" aria-label={`${stars} ${t.stars}, ${stickers} ${t.stickers}`}>
      <span aria-hidden="true">⭐</span>
      <strong>{stars}</strong>
      <span>{t.stars}</span>
      <span aria-hidden="true">📘</span>
      <strong>{stickers}</strong>
    </div>
  );
}
