"use client";

import { useState } from "react";
import { TokenFace } from "@/components/art/TokenFace";
import { playSparkle, playTap } from "@/lib/sound";
import type { TokenId } from "@/lib/art";
import type { GameDef } from "@/lib/games/catalog";
import type { Locale } from "@/lib/i18n";
import { GameFrame, shuffle, useReward, type RoundProps } from "./shared";

export function FitPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <FitRound key={round} game={game} level={level} round={round} win={win} sticker={sticker} />
    </GameFrame>
  );
}

function FitRound({ game, level, round, win, sticker }: RoundProps) {
  const count = Math.min(game.items.length || 3, [3, 4, 5][level] + Math.min(round - 1, 1));
  const [shapes] = useState(() => shuffle((game.items as TokenId[]).slice(0, count)));
  const [holes] = useState(() => shuffle(shapes));
  const [picked, setPicked] = useState<TokenId | null>(null);
  const [done, setDone] = useState<TokenId[]>([]);
  const [wiggle, setWiggle] = useState<TokenId | null>(null);

  function place(hole: TokenId) {
    if (sticker) return;
    if (picked !== hole) {
      playTap();
      setWiggle(hole);
      window.setTimeout(() => setWiggle(null), 380);
      return;
    }
    playSparkle();
    const next = [...done, hole];
    setDone(next);
    setPicked(null);
    if (next.length === shapes.length) win();
  }

  return (
    <div className="fit-board">
      <div className="choice-grid">
        {holes.map((item) => (
          <button
            key={`h-${item}`}
            className={`choice-mark illustrated token-choice hole ${done.includes(item) ? "filled" : ""} ${wiggle === item ? "wiggle" : ""}`}
            disabled={done.includes(item)}
            type="button"
            onClick={() => place(item)}
          >
            <TokenFace id={item} silhouette={!done.includes(item)} />
          </button>
        ))}
      </div>
      <div className="choice-grid">
        {shapes.map((item) => (
          <button
            key={`s-${item}`}
            className={`choice-mark illustrated token-choice ${picked === item ? "glow" : ""}`}
            disabled={done.includes(item)}
            type="button"
            onClick={() => {
              playTap();
              setPicked(item);
            }}
          >
            <TokenFace id={item} />
          </button>
        ))}
      </div>
    </div>
  );
}
