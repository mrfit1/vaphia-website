"use client";

import { useEffect, useRef, useState } from "react";
import { ART, type TokenId } from "@/lib/art";
import { Paint } from "@/components/art/Paint";
import { TokenFace } from "@/components/art/TokenFace";
import { playPop } from "@/lib/sound";
import type { GameDef } from "@/lib/games/catalog";
import type { Locale } from "@/lib/i18n";
import { clamp, GameFrame, useReward, type RoundProps } from "./shared";

type Floater = { id: number; x: number; y: number; vx: number; vy: number; token: TokenId; popped: boolean };

const FACES: TokenId[] = ["balloon", "star", "heart", "sun"];

export function BalloonPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <BalloonRound key={round} game={game} level={level} round={round} win={win} sticker={sticker} />
    </GameFrame>
  );
}

function spawnOne(id: number, speed: number): Floater {
  return {
    id,
    x: 8 + Math.random() * 84,
    y: 86 + Math.random() * 28,
    vx: (Math.random() - 0.5) * 0.16,
    vy: -(speed + Math.random() * 0.18),
    token: FACES[Math.floor(Math.random() * FACES.length)],
    popped: false
  };
}

function BalloonRound({ level, round, win, sticker }: RoundProps) {
  const goal = [8, 12, 16][level] + (round - 1) * 2;
  const count = [6, 8, 10][level];
  const speed = [0.22, 0.36, 0.52][level] + (round - 1) * 0.06;
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState<Floater[]>(() => Array.from({ length: count }, (_, i) => spawnOne(i + 1, speed)));
  const nextId = useRef(count + 1);
  const wonRef = useRef(false);

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(40, now - last) / 16;
      last = now;
      setBalloons((list) => {
        const live = list
          .filter((b) => !b.popped)
          .map((b) => ({
            ...b,
            x: clamp(b.x + b.vx * dt, 4, 92),
            y: b.y + b.vy * dt
          }))
          .filter((b) => b.y > -16);
        const extras: Floater[] = [];
        while (live.length + extras.length < count) {
          extras.push(spawnOne(nextId.current, speed));
          nextId.current += 1;
        }
        return extras.length ? [...live, ...extras] : live;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [count, speed]);

  function pop(id: number) {
    if (sticker || wonRef.current) return;
    playPop();
    setBalloons((list) => list.map((item) => (item.id === id ? { ...item, popped: true } : item)));
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
      <div className="tap-arena balloon-sky painted-board">
        <Paint src={ART.balloons} className="board-paint" priority />
        {balloons.map((b) => (
          <button
            key={b.id}
            className={`tap-floater balloon-target ${b.popped ? "popped" : ""}`}
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            type="button"
            onClick={() => pop(b.id)}
            aria-label="balloon"
          >
            <TokenFace id={b.token} />
          </button>
        ))}
      </div>
      <div className="moves">{score} / {goal}</div>
    </>
  );
}
