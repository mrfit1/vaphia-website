"use client";

import { useCallback, useState, type ReactNode } from "react";
import { celebrateReward, type StickerId } from "@/lib/stickers";
import type { GameDef } from "@/lib/games/catalog";
import type { Locale } from "@/lib/i18n";
import { playCopy } from "@/lib/play-copy";
import { Mark } from "@/components/marks/VaphiaMarks";
import { Celebration } from "../Celebration";

export function difficulty(age: "3-5" | "5-7" | "7-10" | null) {
  if (age === "3-5") return 0;
  if (age === "7-10") return 2;
  return 1;
}

export function shuffle<T>(items: T[]) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function useReward(game: GameDef, locale: Locale) {
  const [sticker, setSticker] = useState<StickerId | null>(null);
  const [won, setWon] = useState(false);
  const [round, setRound] = useState(1);
  const t = playCopy[locale];
  const dismiss = useCallback(() => setSticker(null), []);

  function win() {
    if (won) return;
    setWon(true);
    setSticker(celebrateReward({ stars: game.stars, seed: `${game.id}-${Date.now()}` }));
  }

  function nextRound() {
    setSticker(null);
    setWon(false);
    setRound((value) => value + 1);
  }

  return {
    sticker,
    won,
    round,
    win,
    dismiss,
    nextRound,
    banner: sticker ? <Celebration locale={locale} sticker={sticker} onDone={dismiss} /> : null,
    nextControl: won && !sticker ? (
      <button className="giant-next-button pressable" type="button" onClick={nextRound}>
        {t.nextLevel}
      </button>
    ) : null
  };
}

export function GameFrame({
  game,
  locale,
  banner,
  nextControl,
  children
}: {
  game: GameDef;
  locale: Locale;
  banner: ReactNode;
  nextControl: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="game-card pictorial-game">
      {banner}
      <div className="game-title-row">
        <span className="game-title-mark" style={{ background: game.tint }}><Mark id={game.icon} /></span>
        <h1>{game.titles[locale]}</h1>
      </div>
      {children}
      {nextControl}
    </section>
  );
}

export type RoundProps = {
  game: GameDef;
  level: number;
  round: number;
  win: () => void;
  sticker: StickerId | null;
};
