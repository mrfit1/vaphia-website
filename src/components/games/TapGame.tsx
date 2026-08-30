"use client";

import { useEffect, useState } from "react";
import { addVaphiaStars } from "./StarWallet";
import type { Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/ui-copy";

export function TapGame({ locale }: { locale: Locale }) {
  const t = uiCopy[locale];
  const [score, setScore] = useState(0); const [time, setTime] = useState(20); const [playing, setPlaying] = useState(false); const [position, setPosition] = useState({ x: 45, y: 45 });
  useEffect(() => {
    if (!playing) return;
    if (time <= 0) { setPlaying(false); addVaphiaStars(Math.max(1, Math.floor(score / 3))); return; }
    const timer = window.setTimeout(() => setTime((v) => v - 1), 1000); return () => window.clearTimeout(timer);
  }, [playing, time, score]);
  function hit() { if (!playing) return; setScore((v) => v + 1); setPosition({ x: 8 + Math.random() * 80, y: 10 + Math.random() * 72 }); }
  function start() { setScore(0); setTime(20); setPlaying(true); setPosition({ x: 45, y: 45 }); }
  return (
    <section className="game-card">
      <div className="game-heading"><div><span className="eyebrow">Vaphia</span><h2>{t.catchStar as string}</h2></div><span className="moves">{time}s • {score}</span></div>
      <div className="tap-arena">{playing ? <button className="tap-star" onClick={hit} style={{ left: `${position.x}%`, top: `${position.y}%` }} aria-label={t.catchStar as string}>⭐</button> : <div className="tap-start"><p>{t.catchInstruction as string}</p><button className="button primary" onClick={start}>{t.startGame as string}</button></div>}</div>
      {!playing && score > 0 && <div className="game-win">{t.score as string}: {score} ⭐</div>}
    </section>
  );
}
