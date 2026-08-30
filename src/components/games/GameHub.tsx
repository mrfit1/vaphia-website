"use client";

import { useEffect, useState } from "react";
import { afterPaint } from "@/lib/client-state";
import Link from "next/link";
import { readAgeBand, type AgeBand } from "@/lib/age";
import { gameCatalog, gamesForAge } from "@/lib/games/catalog";
import { Mark } from "@/components/marks/VaphiaMarks";
import type { Locale } from "@/lib/i18n";

export function GameHub({ locale, enabled }: { locale: Locale; enabled: string[] }) {
  const [age, setAge] = useState<AgeBand | null>(null);
  useEffect(() => afterPaint(() => setAge(readAgeBand())), []);
  const allow = enabled.length && !enabled.every((id) => ["memory", "tap", "puzzle"].includes(id))
    ? enabled
    : gameCatalog.map((game) => game.id);
  const games = gamesForAge(age).filter((game) => allow.includes(game.id));

  return (
    <div className={`game-hub hub-${age || "all"}`}>
      <div className="game-hub-grid">
        {games.map((game) => (
          <Link key={game.id} href={`/${locale}/play/${game.id}`} className="game-hub-card pressable" style={{ background: game.tint }}>
            <span className="land-mark"><Mark id={game.icon} /></span>
            <strong>{game.titles[locale]}</strong>
          </Link>
        ))}
      </div>
    </div>
  );
}
