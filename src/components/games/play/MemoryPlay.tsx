"use client";

import { useState } from "react";
import { playSparkle, playTap } from "@/lib/sound";
import { TOKEN_IDS, type TokenId } from "@/lib/art";
import { TokenFace } from "@/components/art/TokenFace";
import type { GameDef } from "@/lib/games/catalog";
import type { Locale } from "@/lib/i18n";
import { GameFrame, shuffle, useReward, type RoundProps } from "./shared";

export function MemoryPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <MemoryRound key={round} game={game} level={level} round={round} win={win} sticker={sticker} />
    </GameFrame>
  );
}

function MemoryRound({ game, level, round, win, sticker }: RoundProps) {
  const pairs = Math.min(8, [4, 6, 8][level] + Math.min(round - 1, 1));
  const [cards, setCards] = useState(() => {
    const picks = (game.items.length ? game.items : TOKEN_IDS).slice(0, pairs) as TokenId[];
    return shuffle([...picks, ...picks]).map((symbol, id) => ({ id, symbol, matched: false }));
  });
  const [open, setOpen] = useState<number[]>([]);
  const [lock, setLock] = useState(false);

  function choose(index: number) {
    if (lock || open.length === 2 || open.includes(index) || cards[index].matched || sticker) return;
    playTap();
    const next = [...open, index];
    setOpen(next);
    if (next.length < 2) return;
    const [a, b] = next;
    setLock(true);
    window.setTimeout(() => {
      setCards((current) => {
        if (current[a].symbol !== current[b].symbol) return current;
        playSparkle();
        const updated = current.map((card, i) => (i === a || i === b ? { ...card, matched: true } : card));
        if (updated.every((card) => card.matched)) win();
        return updated;
      });
      setOpen([]);
      setLock(false);
    }, 620);
  }

  return (
    <div className={`memory-grid big-targets memory-${cards.length}`}>
      {cards.map((card, index) => {
        const visible = open.includes(index) || card.matched;
        return (
          <button
            key={card.id}
            className={`memory-card illustrated ${visible ? "open" : "closed"} ${card.matched ? "matched" : ""}`}
            onClick={() => choose(index)}
            aria-label={visible ? card.symbol : "card"}
            type="button"
          >
            {visible ? <TokenFace id={card.symbol} /> : <span className="card-back" />}
          </button>
        );
      })}
    </div>
  );
}
