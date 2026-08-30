"use client";

import { useEffect, useRef, useState } from "react";
import { ART } from "@/lib/art";
import { Paint } from "@/components/art/Paint";
import { TokenFace } from "@/components/art/TokenFace";
import { playTap } from "@/lib/sound";
import type { GameDef } from "@/lib/games/catalog";
import type { Locale } from "@/lib/i18n";
import { clamp, GameFrame, useReward, type RoundProps } from "./shared";

export function CatchPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <CatchRound key={round} game={game} level={level} round={round} win={win} sticker={sticker} />
    </GameFrame>
  );
}

function CatchRound({ level, round, win, sticker }: RoundProps) {
  const goal = [6, 10, 14][level] + (round - 1) * 2;
  const speed = 0.42 + level * 0.16 + (round - 1) * 0.08;
  const [score, setScore] = useState(0);
  const [pos, setPos] = useState(() => ({ x: 40, y: 40, vx: speed, vy: speed * 0.7 }));
  const wonRef = useRef(false);

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(40, now - last) / 16;
      last = now;
      setPos((p) => {
        let { x, y, vx, vy } = p;
        x += vx * dt;
        y += vy * dt;
        if (x < 8 || x > 88) vx *= -1;
        if (y < 10 || y > 78) vy *= -1;
        return { x: clamp(x, 8, 88), y: clamp(y, 10, 78), vx, vy };
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  function catchIt() {
    if (sticker || wonRef.current) return;
    playTap();
    setPos({
      x: 10 + Math.random() * 76,
      y: 14 + Math.random() * 60,
      vx: (Math.random() > 0.5 ? 1 : -1) * speed,
      vy: (Math.random() > 0.5 ? 1 : -1) * speed * 0.75
    });
    setScore((value) => {
      const next = value + 1;
      if (next >= goal && !wonRef.current) {
        wonRef.current = true;
        win();
      }
      return next;
    });
  }

  return (
    <>
      <div className="tap-arena catch-sky painted-board">
        <Paint src={ART.park} className="board-paint" />
        <button
          className="tap-floater catch-target"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          type="button"
          onClick={catchIt}
          aria-label="catch"
        >
          <TokenFace id="star" />
        </button>
      </div>
      <div className="moves">{score} / {goal}</div>
    </>
  );
}
