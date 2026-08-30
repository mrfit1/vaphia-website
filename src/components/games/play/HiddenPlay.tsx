"use client";

import { useState } from "react";
import { ART, type TokenId } from "@/lib/art";
import { Paint } from "@/components/art/Paint";
import { TokenFace } from "@/components/art/TokenFace";
import { playSparkle, playTap } from "@/lib/sound";
import type { GameDef } from "@/lib/games/catalog";
import type { Locale } from "@/lib/i18n";
import { GameFrame, shuffle, useReward, type RoundProps } from "./shared";

const SPOTS: { id: TokenId; x: number; y: number }[] = [
  { id: "cupcake", x: 78, y: 84 },
  { id: "heart", x: 88, y: 76 },
  { id: "star", x: 40, y: 64 },
  { id: "balloon", x: 58, y: 16 },
  { id: "bunny", x: 20, y: 70 },
  { id: "sun", x: 72, y: 36 },
  { id: "flower", x: 10, y: 28 },
  { id: "moon", x: 90, y: 22 }
];

export function HiddenPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <HiddenRound key={round} game={game} level={level} round={round} win={win} sticker={sticker} />
    </GameFrame>
  );
}

function HiddenRound({ level, win, sticker }: RoundProps) {
  const count = [4, 6, 8][level];
  const [spots] = useState(() => shuffle(SPOTS).slice(0, count));
  const [found, setFound] = useState<TokenId[]>([]);
  const [wiggle, setWiggle] = useState<TokenId | null>(null);
  const asked = spots.map((spot) => spot.id).find((id) => !found.includes(id));

  function tap(id: TokenId) {
    if (sticker || !asked) return;
    playTap();
    if (id !== asked) {
      setWiggle(id);
      window.setTimeout(() => setWiggle(null), 380);
      return;
    }
    playSparkle();
    const next = [...found, id];
    setFound(next);
    if (next.length === spots.length) win();
  }

  return (
    <>
      <p className="pictorial-goal hidden-hint">
        {asked ? <TokenFace id={asked} /> : null}
        <span>{found.length} / {spots.length}</span>
      </p>
      <div className="hidden-scene painted-board">
        <Paint src={ART.hide} className="board-paint" priority />
        {spots.map((spot) => (
          <button
            key={spot.id}
            className={`hidden-item ${found.includes(spot.id) ? "found" : ""} ${wiggle === spot.id ? "wiggle" : ""}`}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            type="button"
            onClick={() => tap(spot.id)}
            aria-label={spot.id}
          >
            <TokenFace id={spot.id} />
          </button>
        ))}
      </div>
    </>
  );
}
