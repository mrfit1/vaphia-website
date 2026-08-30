"use client";

import { useState } from "react";
import { TOKEN_IDS, type TokenId } from "@/lib/art";
import { TokenFace } from "@/components/art/TokenFace";
import { playSparkle, playTap } from "@/lib/sound";
import type { GameDef } from "@/lib/games/catalog";
import type { Locale } from "@/lib/i18n";
import { GameFrame, shuffle, useReward } from "./shared";

export function OddPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  const [question, setQuestion] = useState(0);
  const needed = 3;
  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <OddRound
        key={`${round}-${question}`}
        level={level}
        onCorrect={() => {
          if (question + 1 >= needed) win();
          else setQuestion((value) => value + 1);
        }}
        sticker={sticker}
      />
      <div className="moves">{question + 1} / {needed}</div>
    </GameFrame>
  );
}

function OddRound({
  level,
  onCorrect,
  sticker
}: {
  level: number;
  onCorrect: () => void;
  sticker: string | null;
}) {
  const count = [6, 8, 9][level];
  const [tiles] = useState(() => {
    const same = TOKEN_IDS[Math.floor(Math.random() * TOKEN_IDS.length)];
    let odd = TOKEN_IDS[Math.floor(Math.random() * TOKEN_IDS.length)];
    while (odd === same) odd = TOKEN_IDS[Math.floor(Math.random() * TOKEN_IDS.length)];
    const list: { id: number; token: TokenId; odd: boolean; size: "sm" | "md" | "lg" }[] = Array.from({ length: count - 1 }, (_, i) => ({
      id: i,
      token: same,
      odd: false,
      size: "md" as const
    }));
    const trick = level === 0 ? "mark" : level === 1 ? (Math.random() > 0.5 ? "mark" : "size") : "size";
    list.push({
      id: count - 1,
      token: trick === "mark" ? odd : same,
      odd: true,
      size: trick === "size" ? "lg" : "md"
    });
    const mixed = shuffle(list);
    if (mixed.filter((tile) => tile.odd).length !== 1) {
      mixed[0] = { ...mixed[0], odd: true, token: odd, size: "lg" };
      mixed.slice(1).forEach((tile) => {
        tile.odd = false;
        tile.token = same;
        tile.size = "md";
      });
    }
    return mixed;
  });
  const [wiggle, setWiggle] = useState<number | null>(null);

  return (
    <div className="choice-grid odd-grid">
      {tiles.map((tile) => (
        <button
          key={tile.id}
          className={`choice-mark illustrated token-choice size-${tile.size} ${wiggle === tile.id ? "wiggle" : ""}`}
          type="button"
          onClick={() => {
            playTap();
            if (sticker) return;
            if (tile.odd) {
              playSparkle();
              onCorrect();
              return;
            }
            setWiggle(tile.id);
            window.setTimeout(() => setWiggle(null), 380);
          }}
        >
          <TokenFace id={tile.token} />
        </button>
      ))}
    </div>
  );
}
