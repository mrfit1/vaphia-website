"use client";

import { useEffect, useMemo, useState } from "react";
import { addVaphiaStars } from "./StarWallet";
import type { Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/ui-copy";

const symbols = ["⭐", "💖", "🧁", "🌸", "🎨", "🐰"];
type Card = { id: number; symbol: string; matched: boolean };
function shuffleCards(): Card[] { return [...symbols, ...symbols].map((symbol, id) => ({ id, symbol, matched: false })).sort(() => Math.random() - 0.5); }

export function MemoryGame({ locale }: { locale: Locale }) {
  const t = uiCopy[locale];
  const initial = useMemo(() => shuffleCards(), []);
  const [cards, setCards] = useState<Card[]>(initial);
  const [open, setOpen] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (open.length !== 2) return;
    const [a, b] = open;
    const first = cards[a]; const second = cards[b];
    const timer = window.setTimeout(() => {
      if (first.symbol === second.symbol) setCards((prev) => prev.map((card, index) => index === a || index === b ? { ...card, matched: true } : card));
      setOpen([]); setMoves((m) => m + 1);
    }, 600);
    return () => window.clearTimeout(timer);
  }, [open, cards]);

  useEffect(() => {
    if (!cards.length || won) return;
    if (cards.every((card) => card.matched)) { setWon(true); addVaphiaStars(10); }
  }, [cards, won]);

  function choose(index: number) { if (open.length >= 2 || open.includes(index) || cards[index].matched) return; setOpen((prev) => [...prev, index]); }
  function reset() { setCards(shuffleCards()); setOpen([]); setMoves(0); setWon(false); }

  return (
    <section className="game-card">
      <div className="game-heading"><div><span className="eyebrow">Vaphia</span><h2>{t.memoryTitle as string}</h2></div><span className="moves">{t.moves as string}: {moves}</span></div>
      <div className="memory-grid">
        {cards.map((card, index) => { const visible = open.includes(index) || card.matched; return <button key={card.id} className={`memory-card ${visible ? "open" : ""}`} onClick={() => choose(index)} aria-label={visible ? card.symbol : "Hidden card"}><span>{visible ? card.symbol : "?"}</span></button>; })}
      </div>
      {won && <div className="game-win">{t.greatJob as string} +10 ⭐</div>}
      <button className="button secondary-button" onClick={reset}>{t.playAgain as string}</button>
    </section>
  );
}
