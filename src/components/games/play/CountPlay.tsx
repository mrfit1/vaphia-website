"use client";

import { useState } from "react";
import { TokenFace } from "@/components/art/TokenFace";
import { playSparkle, playTap } from "@/lib/sound";
import type { GameDef } from "@/lib/games/catalog";
import type { Locale } from "@/lib/i18n";
import { GameFrame, shuffle, useReward } from "./shared";

export function CountPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  const [question, setQuestion] = useState(0);
  const needed = 3;
  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <CountRound
        key={`${round}-${question}`}
        level={level}
        round={round}
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

function CountRound({
  level,
  round,
  onCorrect,
  sticker
}: {
  level: number;
  round: number;
  onCorrect: () => void;
  sticker: string | null;
}) {
  const max = [5, 7, 9][level];
  const min = [1, 2, 3][level];
  const [target] = useState(() => min + Math.floor(Math.random() * (max - min + 1)));
  const [wrong, setWrong] = useState<number | null>(null);
  const options = shuffle(Array.from({ length: 9 }, (_, i) => i + 1)).sort((a, b) => a - b);

  return (
    <>
      <p className="pictorial-goal count-goal">
        {Array.from({ length: target }).map((_, i) => (
          <TokenFace key={`${round}-${i}`} id="star" />
        ))}
      </p>
      <div className="choice-grid number-grid">
        {options.map((n) => (
          <button
            key={n}
            className={`choice-mark number-mark ${wrong === n ? "wiggle" : ""}`}
            type="button"
            onClick={() => {
              playTap();
              if (sticker) return;
              if (n === target) {
                playSparkle();
                onCorrect();
                return;
              }
              setWrong(n);
              window.setTimeout(() => setWrong(null), 380);
            }}
          >
            {n}
          </button>
        ))}
      </div>
    </>
  );
}
