"use client";

import { useState } from "react";
import { TokenFace } from "@/components/art/TokenFace";
import { playSparkle, playTap } from "@/lib/sound";
import type { TokenId } from "@/lib/art";
import type { GameDef } from "@/lib/games/catalog";
import type { Locale } from "@/lib/i18n";
import { GameFrame, shuffle, useReward, type RoundProps } from "./shared";

const BIN_COLORS = [
  { id: "pink", tint: "#ff5bac", tokens: ["heart", "flower", "balloon"] as TokenId[] },
  { id: "gold", tint: "#ffd65d", tokens: ["star", "sun", "cupcake"] as TokenId[] },
  { id: "cyan", tint: "#35d8eb", tokens: ["moon", "bunny"] as TokenId[] }
];

export function SortPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <SortRound key={round} game={game} level={level} round={round} win={win} sticker={sticker} />
    </GameFrame>
  );
}

function SortRound({ level, round, win, sticker }: RoundProps) {
  const bins = BIN_COLORS.slice(0, [2, 3, 3][level]);
  const [left, setLeft] = useState(() => {
    const pool = bins.flatMap((bin) => bin.tokens.slice(0, 1 + Math.min(round, 2)));
    return shuffle(pool).map((token, id) => ({ id, token }));
  });
  const [picked, setPicked] = useState<number | null>(null);
  const [wiggle, setWiggle] = useState<string | null>(null);

  function pickShape(id: number) {
    playTap();
    setPicked(id);
  }

  function drop(binId: string) {
    if (picked === null || sticker) return;
    const item = left.find((entry) => entry.id === picked);
    if (!item) return;
    const bin = bins.find((entry) => entry.id === binId);
    if (!bin?.tokens.includes(item.token)) {
      setWiggle(binId);
      window.setTimeout(() => setWiggle(null), 380);
      return;
    }
    playSparkle();
    const next = left.filter((entry) => entry.id !== picked);
    setLeft(next);
    setPicked(null);
    if (next.length === 0) win();
  }

  return (
    <>
      <div className="choice-grid bin-row">
        {bins.map((bin) => (
          <button
            key={bin.id}
            className={`color-bin ${wiggle === bin.id ? "wiggle" : ""}`}
            style={{ background: bin.tint }}
            type="button"
            onClick={() => drop(bin.id)}
            aria-label={bin.id}
          />
        ))}
      </div>
      <div className="choice-grid">
        {left.map((item) => (
          <button
            key={item.id}
            className={`choice-mark illustrated token-choice ${picked === item.id ? "glow" : ""}`}
            type="button"
            onClick={() => pickShape(item.id)}
          >
            <TokenFace id={item.token} />
          </button>
        ))}
      </div>
    </>
  );
}
