"use client";

import { useEffect, useState } from "react";
import { afterPaint } from "@/lib/client-state";
import Link from "next/link";
import { readAgeBand, writeAgeBand, type AgeBand } from "@/lib/age";
import { gameCatalog, gamesForAge } from "@/lib/games/catalog";
import { GameBadge } from "@/components/games/GameBadge";
import type { Locale } from "@/lib/i18n";

const ageLabels: Record<Locale, { all: string; pick: string; bands: Record<AgeBand, string> }> = {
  en: { all: "All ages", pick: "Choose your age", bands: { "3-5": "Little explorers · 3–5", "5-7": "Bright learners · 5–7", "7-10": "Big adventurers · 7–10" } },
  fa: { all: "همه سن‌ها", pick: "گروه سنی‌ات را انتخاب کن", bands: { "3-5": "ماجراجوی کوچولو · ۳ تا ۵", "5-7": "یادگیرنده‌های باهوش · ۵ تا ۷", "7-10": "ماجراجوی بزرگ · ۷ تا ۱۰" } },
  fr: { all: "Tous les âges", pick: "Choisis ton âge", bands: { "3-5": "Petits explorateurs · 3–5", "5-7": "Curieux malins · 5–7", "7-10": "Grands aventuriers · 7–10" } },
  es: { all: "Todas las edades", pick: "Elige tu edad", bands: { "3-5": "Pequeños exploradores · 3–5", "5-7": "Pequeños genios · 5–7", "7-10": "Grandes aventureros · 7–10" } }
};

export function GameHub({ locale, enabled }: { locale: Locale; enabled: string[] }) {
  const [age, setAge] = useState<AgeBand | null>(null);
  useEffect(() => {
    const sync = () => setAge(readAgeBand());
    const stop = afterPaint(sync);
    window.addEventListener("vaphia-age", sync);
    return () => {
      stop();
      window.removeEventListener("vaphia-age", sync);
    };
  }, []);
  const live = gameCatalog.map((game) => game.id);
  const allow = enabled.filter((id) => live.includes(id));
  const shown = gamesForAge(age).filter((game) => (allow.length ? allow : live).includes(game.id));
  const t = ageLabels[locale];

  return (
    <div className={`game-hub hub-${age || "all"}`}>
      <div className="age-filter" aria-label={t.pick}>
        <span className="age-filter-label">{t.pick}</span>
        <div className="age-filter-buttons">
          <button type="button" className={!age ? "active" : ""} onClick={() => setAge(null)}>{t.all}</button>
          {(Object.keys(t.bands) as AgeBand[]).map((band) => (
            <button
              type="button"
              className={age === band ? "active" : ""}
              key={band}
              onClick={() => {
                writeAgeBand(band);
                setAge(band);
              }}
            >
              {t.bands[band]}
            </button>
          ))}
        </div>
      </div>
      <div className="game-hub-grid">
        {shown.map((game) => (
          <Link key={game.id} href={`/${locale}/play/${game.id}`} className={`game-hub-card pressable game-${game.id}`} style={{ background: game.tint }}>
            <GameBadge mechanic={game.mechanic} />
            <strong>{game.titles[locale]}</strong>
          </Link>
        ))}
      </div>
    </div>
  );
}
