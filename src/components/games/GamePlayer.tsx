"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { readAgeBand, type AgeBand } from "@/lib/age";
import { celebrateReward, type StickerId } from "@/lib/stickers";
import { playTap, playSparkle } from "@/lib/sound";
import type { GameDef } from "@/lib/games/catalog";
import type { Locale } from "@/lib/i18n";
import { Celebration } from "./Celebration";

function difficulty(age: AgeBand | null) {
  if (age === "3-5") return 0;
  if (age === "7-10") return 2;
  return 1;
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function GamePlayer({ game, locale, imageUrl }: { game: GameDef; locale: Locale; imageUrl: string }) {
  const age = readAgeBand();
  const level = difficulty(age);
  if (game.mechanic === "memory") return <MemoryPlay game={game} locale={locale} level={level} />;
  if (game.mechanic === "tap") return <TapPlay game={game} locale={locale} level={level} />;
  if (game.mechanic === "puzzle") return <PuzzlePlay game={game} locale={locale} level={level} imageUrl={imageUrl} />;
  if (game.mechanic === "sequence" || game.mechanic === "rhythm") return <SequencePlay game={game} locale={locale} level={level} />;
  if (game.mechanic === "sort") return <SortPlay game={game} locale={locale} level={level} />;
  if (game.mechanic === "count") return <CountPlay game={game} locale={locale} level={level} />;
  if (game.mechanic === "find") return <FindPlay game={game} locale={locale} level={level} />;
  if (game.mechanic === "match") return <MatchPlay game={game} locale={locale} level={level} />;
  if (game.mechanic === "path") return <PathPlay game={game} locale={locale} level={level} />;
  if (game.mechanic === "odd") return <OddPlay game={game} locale={locale} level={level} />;
  return <PatternPlay game={game} locale={locale} level={level} />;
}

function useReward(game: GameDef, locale: Locale) {
  const [sticker, setSticker] = useState<StickerId | null>(null);
  const router = useRouter();
  function win() {
    const reward = celebrateReward({ stars: game.stars, seed: `${game.id}-${Date.now()}` });
    setSticker(reward);
  }
  return {
    sticker,
    win,
    banner: sticker ? (
      <Celebration locale={locale} sticker={sticker} onDone={() => router.refresh()} />
    ) : null
  };
}

function MemoryPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const count = [4, 6, 8][level];
  const deck = useMemo(() => {
    const picks = game.items.slice(0, count);
    return shuffle([...picks, ...picks]).map((symbol, id) => ({ id, symbol, matched: false }));
  }, [game.items, count]);
  const [cards, setCards] = useState(deck);
  const [open, setOpen] = useState<number[]>([]);
  const { sticker, win, banner } = useReward(game, locale);

  function choose(index: number) {
    if (open.length === 2 || open.includes(index) || cards[index].matched) return;
    playTap();
    const next = [...open, index];
    setOpen(next);
    if (next.length === 2) {
      const [a, b] = next;
      window.setTimeout(() => {
        if (cards[a].symbol === cards[b].symbol) {
          playSparkle();
          const updated = cards.map((card, i) => (i === a || i === b ? { ...card, matched: true } : card));
          setCards(updated);
          if (updated.every((card) => card.matched) && !sticker) win();
        }
        setOpen([]);
      }, 550);
    }
  }

  return (
    <section className="game-card pictorial-game">
      {banner}
      <h1>{game.titles[locale]}</h1>
      <div className="memory-grid big-targets">
        {cards.map((card, index) => {
          const visible = open.includes(index) || card.matched;
          return (
            <button key={card.id} className={`memory-card ${visible ? "open" : ""}`} onClick={() => choose(index)} aria-label={visible ? card.symbol : "card"}>
              <span>{visible ? card.symbol : "?"}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function TapPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const seconds = [18, 16, 14][level];
  const goal = [8, 12, 16][level];
  const mark = game.items[0] || game.mark;
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(seconds);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState({ x: 40, y: 40 });
  const { sticker, win, banner } = useReward(game, locale);

  useEffect(() => {
    if (!playing || time <= 0) return;
    const timer = window.setTimeout(() => {
      setTime((value) => {
        const next = value - 1;
        if (next <= 0) setPlaying(false);
        return next;
      });
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [playing, time]);

  return (
    <section className="game-card pictorial-game">
      {banner}
      <h1>{game.titles[locale]}</h1>
      <p className="pictorial-goal">{mark.repeat(Math.min(goal, 8))}</p>
      <div className="tap-arena">
        {playing ? (
          <button
            className="tap-star huge-target"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onClick={() => {
              playTap();
              const next = score + 1;
              setScore(next);
              setPos({ x: 10 + Math.random() * 75, y: 12 + Math.random() * 68 });
              if (next >= goal && !sticker) {
                setPlaying(false);
                win();
              }
            }}
          >
            {mark}
          </button>
        ) : (
          <div className="tap-start">
            <button className="giant-pictorial-button" onClick={() => { setScore(0); setTime(seconds); setPlaying(true); }}>
              ▶
            </button>
          </div>
        )}
      </div>
      <div className="moves">{time}s · {score}</div>
    </section>
  );
}

function PuzzlePlay({ game, locale, level, imageUrl }: { game: GameDef; locale: Locale; level: number; imageUrl: string }) {
  const size = [2, 3, 3][level];
  const last = size * size - 1;
  const solved = useMemo(() => Array.from({ length: size * size }, (_, i) => i), [size]);
  const [tiles, setTiles] = useState(() => scramble(solved, size));
  const { sticker, win, banner } = useReward(game, locale);

  function move(index: number) {
    const empty = tiles.indexOf(last);
    const row = Math.floor(index / size);
    const col = index % size;
    const emptyRow = Math.floor(empty / size);
    const emptyCol = empty % size;
    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) !== 1) return;
    playTap();
    const next = [...tiles];
    [next[index], next[empty]] = [next[empty], next[index]];
    setTiles(next);
    if (next.every((tile, i) => tile === i) && !sticker) win();
  }

  return (
    <section className="game-card pictorial-game">
      {banner}
      <h1>{game.titles[locale]}</h1>
      <div className="picture-puzzle" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {tiles.map((tile, index) =>
          tile === last ? (
            <div key={index} className="puzzle-tile empty" />
          ) : (
            <button
              key={index}
              className="puzzle-tile"
              onClick={() => move(index)}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: `${size * 100}% ${size * 100}%`,
                backgroundPosition: `${(tile % size) * (100 / (size - 1))}% ${Math.floor(tile / size) * (100 / (size - 1))}%`
              }}
            />
          )
        )}
      </div>
    </section>
  );
}

function scramble(solved: number[], size: number) {
  const tiles = [...solved];
  const last = tiles.length - 1;
  for (let i = 0; i < 60; i += 1) {
    const empty = tiles.indexOf(last);
    const row = Math.floor(empty / size);
    const col = empty % size;
    const options = [
      row > 0 ? empty - size : -1,
      row < size - 1 ? empty + size : -1,
      col > 0 ? empty - 1 : -1,
      col < size - 1 ? empty + 1 : -1
    ].filter((value) => value >= 0);
    const next = options[Math.floor(Math.random() * options.length)];
    [tiles[empty], tiles[next]] = [tiles[next], tiles[empty]];
  }
  return tiles;
}

function SequencePlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const marks = game.items.slice(0, 4);
  const length = [3, 4, 5][level];
  const [sequence, setSequence] = useState<number[]>(() => Array.from({ length }, (_, index) => index % marks.length));
  const [step, setStep] = useState(0);
  const [glow, setGlow] = useState<number | null>(null);
  const [showing, setShowing] = useState(false);
  const { sticker, win, banner } = useReward(game, locale);

  function show() {
    const nextSeq = Array.from({ length }, (_, index) => (index * 3 + 1) % marks.length);
    setSequence(nextSeq);
    setShowing(true);
    setStep(0);
    nextSeq.forEach((item, index) => {
      window.setTimeout(() => { setGlow(item); playTap(); }, 500 * index);
      window.setTimeout(() => setGlow(null), 500 * index + 320);
    });
    window.setTimeout(() => setShowing(false), 500 * sequence.length);
  }

  return (
    <section className="game-card pictorial-game">
      {banner}
      <h1>{game.titles[locale]}</h1>
      <div className="choice-grid">
        {marks.map((mark, index) => (
          <button
            key={mark}
            className={`choice-mark ${glow === index ? "glow" : ""}`}
            disabled={showing}
            onClick={() => {
              if (showing || sticker) return;
              playTap();
              if (sequence[step] !== index) {
                setStep(0);
                return;
              }
              if (step + 1 >= sequence.length) win();
              else setStep(step + 1);
            }}
          >
            {mark}
          </button>
        ))}
      </div>
      <button className="giant-pictorial-button" onClick={show}>▶</button>
    </section>
  );
}

function SortPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const bins = game.items.slice(0, [2, 3, 3][level]);
  const pile = useMemo(() => shuffle(Array.from({ length: bins.length * 3 }, (_, i) => bins[i % bins.length])), [bins]);
  const [left, setLeft] = useState(pile);
  const [bin, setBin] = useState<string | null>(null);
  const { sticker, win, banner } = useReward(game, locale);

  return (
    <section className="game-card pictorial-game">
      {banner}
      <h1>{game.titles[locale]}</h1>
      <div className="choice-grid">
        {bins.map((item) => (
          <button key={item} className={`choice-mark ${bin === item ? "glow" : ""}`} onClick={() => setBin(item)}>{item}</button>
        ))}
      </div>
      <div className="choice-grid">
        {left.map((item, index) => (
          <button
            key={`${item}-${index}`}
            className="choice-mark"
            onClick={() => {
              if (bin !== item) return;
              playTap();
              const next = left.filter((_, i) => i !== index);
              setLeft(next);
              if (next.length === 0 && !sticker) win();
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}

function CountPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const mark = game.items[0] || "⭐";
  const target = [2, 4, 6][level] + 1;
  const options = [target - 1, target, target + 1].filter((n) => n > 0);
  const { sticker, win, banner } = useReward(game, locale);
  return (
    <section className="game-card pictorial-game">
      {banner}
      <h1>{game.titles[locale]}</h1>
      <p className="pictorial-goal">{mark.repeat(target)}</p>
      <div className="choice-grid">
        {options.map((n) => (
          <button
            key={n}
            className="choice-mark"
            onClick={() => {
              playTap();
              if (n === target && !sticker) win();
            }}
          >
            {n}
          </button>
        ))}
      </div>
    </section>
  );
}

function FindPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const decoys = ["🎈", "🧁", "🌙", "🐰", "☀️", "🎁"];
  const target = game.items[0] || game.mark;
  const count = [6, 9, 12][level];
  const tiles = useMemo(() => {
    const items = Array.from({ length: count }, (_, i) => (i === 2 ? target : decoys[i % decoys.length]));
    return shuffle(items);
  }, [count, target]);
  const { sticker, win, banner } = useReward(game, locale);
  return (
    <section className="game-card pictorial-game">
      {banner}
      <h1>{game.titles[locale]}</h1>
      <p className="pictorial-goal">{target}</p>
      <div className="choice-grid">
        {tiles.map((item, index) => (
          <button
            key={`${item}-${index}`}
            className="choice-mark"
            onClick={() => {
              playTap();
              if (item === target && !sticker) win();
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}

function MatchPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const marks = game.items.slice(0, [3, 4, 4][level]);
  const left = useMemo(() => shuffle(marks), [marks]);
  const right = useMemo(() => shuffle(marks), [marks]);
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const { sticker, win, banner } = useReward(game, locale);
  return (
    <section className="game-card pictorial-game">
      {banner}
      <h1>{game.titles[locale]}</h1>
      <div className="match-columns">
        <div className="choice-grid">
          {left.map((item) => (
            <button key={`l-${item}`} className={`choice-mark ${picked === item ? "glow" : ""}`} disabled={done.includes(item)} onClick={() => { playTap(); setPicked(item); }}>{item}</button>
          ))}
        </div>
        <div className="choice-grid">
          {right.map((item) => (
            <button
              key={`r-${item}`}
              className="choice-mark"
              disabled={done.includes(item)}
              onClick={() => {
                if (picked !== item) return;
                playSparkle();
                const next = [...done, item];
                setDone(next);
                setPicked(null);
                if (next.length === marks.length && !sticker) win();
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function PathPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const length = [4, 5, 6][level];
  const [step, setStep] = useState(0);
  const { sticker, win, banner } = useReward(game, locale);
  return (
    <section className="game-card pictorial-game">
      {banner}
      <h1>{game.titles[locale]}</h1>
      <div className="path-row">
        {Array.from({ length }).map((_, index) => (
          <button
            key={index}
            className={`choice-mark ${index < step ? "glow" : ""}`}
            onClick={() => {
              if (index !== step) return;
              playTap();
              if (index + 1 >= length && !sticker) win();
              else setStep(index + 1);
            }}
          >
            {game.mark}
          </button>
        ))}
      </div>
    </section>
  );
}

function OddPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const same = game.items[0] || "⭐";
  const odd = game.items[1] || "💖";
  const count = [4, 6, 8][level];
  const tiles = useMemo(() => shuffle([odd, ...Array.from({ length: count - 1 }, () => same)]), [count, odd, same]);
  const { sticker, win, banner } = useReward(game, locale);
  return (
    <section className="game-card pictorial-game">
      {banner}
      <h1>{game.titles[locale]}</h1>
      <div className="choice-grid">
        {tiles.map((item, index) => (
          <button key={`${item}-${index}`} className="choice-mark" onClick={() => { playTap(); if (item === odd && !sticker) win(); }}>{item}</button>
        ))}
      </div>
    </section>
  );
}

function PatternPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const marks = game.items.slice(0, 3);
  const pattern = [marks[0], marks[1], marks[0], marks[1], marks[0]];
  const missing = pattern[pattern.length - 1];
  const options = level > 0 ? marks : [missing, marks[1] || marks[0]];
  const { sticker, win, banner } = useReward(game, locale);
  return (
    <section className="game-card pictorial-game">
      {banner}
      <h1>{game.titles[locale]}</h1>
      <p className="pictorial-goal">{pattern.slice(0, -1).join(" ") + " ?"}</p>
      <div className="choice-grid">
        {options.map((item) => (
          <button key={item} className="choice-mark" onClick={() => { playTap(); if (item === missing && !sticker) win(); }}>{item}</button>
        ))}
      </div>
    </section>
  );
}
