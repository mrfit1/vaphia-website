"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { readAgeBand, type AgeBand } from "@/lib/age";
import { celebrateReward, type StickerId } from "@/lib/stickers";
import { playTap, playSparkle } from "@/lib/sound";
import type { GameDef } from "@/lib/games/catalog";
import type { Locale } from "@/lib/i18n";
import type { MarkId } from "@/lib/mark-ids";
import { Mark } from "@/components/marks/VaphiaMarks";
import { playCopy } from "@/lib/play-copy";
import { Celebration } from "./Celebration";

function difficulty(age: AgeBand | null) {
  if (age === "3-5") return 0;
  if (age === "7-10") return 2;
  return 1;
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
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

function GameFrame({
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

function MemoryPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const count = [2, 3, 4][level];
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  const deck = useMemo(() => {
    const picks = game.items.slice(0, count);
    return shuffle([...picks, ...picks]).map((symbol, id) => ({ id, symbol, matched: false }));
  }, [game.items, count, round]);
  const [cards, setCards] = useState(deck);
  const [open, setOpen] = useState<number[]>([]);

  useEffect(() => {
    setCards(deck);
    setOpen([]);
  }, [deck]);

  function choose(index: number) {
    if (open.length === 2 || open.includes(index) || cards[index].matched || sticker) return;
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
          if (updated.every((card) => card.matched)) win();
        }
        setOpen([]);
      }, 550);
    }
  }

  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <div className={`memory-grid big-targets memory-${count * 2}`}>
        {cards.map((card, index) => {
          const visible = open.includes(index) || card.matched;
          return (
            <button
              key={`${round}-${card.id}`}
              className={`memory-card illustrated ${visible ? "open" : "closed"} ${card.matched ? "matched" : ""}`}
              onClick={() => choose(index)}
              aria-label={visible ? card.symbol : "card"}
              type="button"
            >
              {visible ? <Mark id={card.symbol} /> : <Mark id="sparkle" />}
            </button>
          );
        })}
      </div>
    </GameFrame>
  );
}

type Floater = { id: number; x: number; y: number; vx: number; vy: number; hue: number; popped: boolean };

function TapPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const kind = game.tapKind || (game.id.includes("balloon") ? "balloons" : game.id.includes("bubble") ? "bubbles" : "catch");
  if (kind === "balloons") return <BalloonPop game={game} locale={locale} level={level} />;
  if (kind === "bubbles") return <BubblePop game={game} locale={locale} level={level} />;
  return <CatchMove game={game} locale={locale} level={level} />;
}

function BalloonPop({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const goal = [6, 8, 12][level];
  const count = [4, 5, 6][level];
  const speed = [0.18, 0.28, 0.42][level];
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [balloons, setBalloons] = useState<Floater[]>([]);
  const nextId = useRef(1);

  function spawn(n: number): Floater[] {
    return Array.from({ length: n }, () => {
      const id = nextId.current;
      nextId.current += 1;
      return {
        id,
        x: 8 + Math.random() * 70,
        y: 70 + Math.random() * 28,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(speed + Math.random() * 0.12),
        hue: Math.floor(Math.random() * 5),
        popped: false
      };
    });
  }

  useEffect(() => {
    setScore(0);
    setPlaying(false);
    setBalloons([]);
  }, [round]);

  useEffect(() => {
    if (!playing) return;
    const tick = window.setInterval(() => {
      setBalloons((list) => {
        const live = list
          .filter((b) => !b.popped)
          .map((b) => ({
            ...b,
            x: clamp(b.x + b.vx, 4, 82),
            y: b.y + b.vy
          }));
        const kept = live.filter((b) => b.y > -18);
        if (kept.length < count) return [...kept, ...spawn(count - kept.length)];
        return kept;
      });
    }, 40);
    return () => window.clearInterval(tick);
  }, [playing, count, speed, round]);

  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <div className="tap-arena balloon-sky">
        {playing ? (
          balloons.map((b) => (
            <button
              key={b.id}
              className={`tap-floater balloon-target hue-${b.hue}`}
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
              type="button"
              onClick={() => {
                if (sticker) return;
                playTap();
                setBalloons((list) => list.map((item) => (item.id === b.id ? { ...item, popped: true } : item)));
                setScore((value) => {
                  const next = value + 1;
                  if (next >= goal) {
                    setPlaying(false);
                    win();
                  }
                  return next;
                });
              }}
            >
              <Mark id="balloon" />
            </button>
          ))
        ) : (
          <div className="tap-start">
            <button className="giant-pictorial-button pressable" type="button" onClick={() => { setScore(0); setBalloons(spawn(count)); setPlaying(true); }}>▶</button>
          </div>
        )}
      </div>
      <div className="moves">{score} / {goal}</div>
    </GameFrame>
  );
}

function CatchMove({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const seconds = [20, 16, 14][level];
  const goal = [6, 10, 14][level];
  const icon = game.items[0] || game.icon;
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(seconds);
  const [playing, setPlaying] = useState(false);
  const pos = useRef({ x: 40, y: 40, vx: 0.45, vy: 0.32 });
  const [, force] = useState(0);

  useEffect(() => {
    setScore(0);
    setTime(seconds);
    setPlaying(false);
    pos.current = { x: 40, y: 40, vx: 0.45 + level * 0.12, vy: 0.32 + level * 0.1 };
  }, [round, seconds, level]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setTime((value) => {
        if (value <= 1) {
          setPlaying(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing, round]);

  useEffect(() => {
    if (!playing) return;
    const tick = window.setInterval(() => {
      const p = pos.current;
      let { x, y, vx, vy } = p;
      x += vx;
      y += vy;
      if (x < 6 || x > 80) vx *= -1;
      if (y < 8 || y > 72) vy *= -1;
      x = clamp(x, 6, 80);
      y = clamp(y, 8, 72);
      pos.current = { x, y, vx, vy };
      force((n) => n + 1);
    }, 32);
    return () => window.clearInterval(tick);
  }, [playing, round]);

  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <div className="tap-arena catch-sky">
        {playing ? (
          <button
            className="tap-floater catch-target"
            style={{ left: `${pos.current.x}%`, top: `${pos.current.y}%` }}
            type="button"
            onClick={() => {
              if (sticker) return;
              playTap();
              pos.current = {
                x: 8 + Math.random() * 70,
                y: 12 + Math.random() * 56,
                vx: (Math.random() > 0.5 ? 1 : -1) * (0.4 + level * 0.15),
                vy: (Math.random() > 0.5 ? 1 : -1) * (0.3 + level * 0.12)
              };
              setScore((value) => {
                const next = value + 1;
                if (next >= goal) {
                  setPlaying(false);
                  win();
                }
                return next;
              });
            }}
          >
            <Mark id={icon} />
          </button>
        ) : (
          <div className="tap-start">
            <button className="giant-pictorial-button pressable" type="button" onClick={() => { setScore(0); setTime(seconds); setPlaying(true); }}>▶</button>
          </div>
        )}
      </div>
      <div className="moves">{time}s · {score} / {goal}</div>
    </GameFrame>
  );
}

function BubblePop({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const goal = [7, 10, 14][level];
  const count = [3, 4, 5][level];
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [bubbles, setBubbles] = useState<Floater[]>([]);
  const nextId = useRef(1);

  function spawn(n: number): Floater[] {
    return Array.from({ length: n }, () => {
      const id = nextId.current;
      nextId.current += 1;
      return {
        id,
        x: 8 + Math.random() * 70,
        y: 20 + Math.random() * 50,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.4,
        hue: 0,
        popped: false
      };
    });
  }

  useEffect(() => {
    setScore(0);
    setPlaying(false);
    setBalloonsSafe();
  }, [round]);

  function setBalloonsSafe() {
    setBubbles([]);
  }

  useEffect(() => {
    if (!playing) return;
    const tick = window.setInterval(() => {
      setBubbles((list) => {
        const live = list.filter((b) => !b.popped).map((b) => {
          let x = b.x + b.vx;
          let y = b.y + b.vy;
          let vx = b.vx;
          let vy = b.vy;
          if (x < 4 || x > 82) vx *= -1;
          if (y < 6 || y > 74) vy *= -1;
          return { ...b, x: clamp(x, 4, 82), y: clamp(y, 6, 74), vx, vy };
        });
        if (live.length < count) return [...live, ...spawn(count - live.length)];
        return live;
      });
    }, 40);
    return () => window.clearInterval(tick);
  }, [playing, count, round]);

  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <div className="tap-arena bubble-sky">
        {playing ? (
          bubbles.map((b) => (
            <button
              key={b.id}
              className="tap-floater bubble-target"
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
              type="button"
              onClick={() => {
                if (sticker) return;
                playTap();
                setBubbles((list) => list.map((item) => (item.id === b.id ? { ...item, popped: true } : item)));
                setScore((value) => {
                  const next = value + 1;
                  if (next >= goal) {
                    setPlaying(false);
                    win();
                  }
                  return next;
                });
              }}
            >
              <Mark id="bubble" />
            </button>
          ))
        ) : (
          <div className="tap-start">
            <button className="giant-pictorial-button pressable" type="button" onClick={() => { setScore(0); setBubbles(spawn(count)); setPlaying(true); }}>▶</button>
          </div>
        )}
      </div>
      <div className="moves">{score} / {goal}</div>
    </GameFrame>
  );
}

function PuzzlePlay({ game, locale, level, imageUrl }: { game: GameDef; locale: Locale; level: number; imageUrl: string }) {
  const size = [2, 3, 4][level];
  const last = size * size - 1;
  const solved = useMemo(() => Array.from({ length: size * size }, (_, i) => i), [size]);
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  const [tiles, setTiles] = useState(() => scramble(solved, size));

  useEffect(() => {
    setTiles(scramble(solved, size));
  }, [round, solved, size]);

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
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <div className="picture-puzzle" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {tiles.map((tile, index) =>
          tile === last ? (
            <div key={`${round}-${index}`} className="puzzle-tile empty" />
          ) : (
            <button
              key={`${round}-${index}`}
              className="puzzle-tile"
              type="button"
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
    </GameFrame>
  );
}

function scramble(solved: number[], size: number) {
  const tiles = [...solved];
  const last = tiles.length - 1;
  for (let i = 0; i < 80; i += 1) {
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
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  const [sequence, setSequence] = useState<number[]>(() => Array.from({ length }, (_, index) => index % marks.length));
  const [step, setStep] = useState(0);
  const [glow, setGlow] = useState<number | null>(null);
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setStep(0);
    setGlow(null);
    setShowing(false);
  }, [round]);

  function show() {
    const nextSeq = Array.from({ length }, () => Math.floor(Math.random() * marks.length));
    setSequence(nextSeq);
    setShowing(true);
    setStep(0);
    nextSeq.forEach((item, index) => {
      window.setTimeout(() => { setGlow(item); playTap(); }, 500 * index);
      window.setTimeout(() => setGlow(null), 500 * index + 320);
    });
    window.setTimeout(() => setShowing(false), 500 * nextSeq.length);
  }

  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <div className="choice-grid">
        {marks.map((mark, index) => (
          <button
            key={mark}
            className={`choice-mark illustrated ${glow === index ? "glow" : ""}`}
            disabled={showing}
            type="button"
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
            <Mark id={mark} />
          </button>
        ))}
      </div>
      <button className="giant-pictorial-button pressable" type="button" onClick={show}>▶</button>
    </GameFrame>
  );
}

function SortPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const bins = game.items.slice(0, [2, 3, 3][level]);
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  const pile = useMemo(() => shuffle(Array.from({ length: bins.length * 3 }, (_, i) => bins[i % bins.length])), [bins, round]);
  const [left, setLeft] = useState(pile);
  const [bin, setBin] = useState<MarkId | null>(null);

  useEffect(() => {
    setLeft(pile);
    setBin(null);
  }, [pile]);

  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <div className="choice-grid">
        {bins.map((item) => (
          <button key={item} className={`choice-mark illustrated ${bin === item ? "glow" : ""}`} type="button" onClick={() => setBin(item)}>
            <Mark id={item} />
          </button>
        ))}
      </div>
      <div className="choice-grid">
        {left.map((item, index) => (
          <button
            key={`${round}-${item}-${index}`}
            className="choice-mark illustrated"
            type="button"
            onClick={() => {
              if (bin !== item) return;
              playTap();
              const next = left.filter((_, i) => i !== index);
              setLeft(next);
              if (next.length === 0 && !sticker) win();
            }}
          >
            <Mark id={item} />
          </button>
        ))}
      </div>
    </GameFrame>
  );
}

function CountPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const mark = game.items[0] || "star";
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  const target = useMemo(() => [2, 4, 6][level] + 1 + ((round - 1) % 3), [level, round]);
  const options = [target - 1, target, target + 1].filter((n) => n > 0);

  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <p className="pictorial-goal">
        {Array.from({ length: target }).map((_, i) => <Mark key={`${round}-${i}`} id={mark} />)}
      </p>
      <div className="choice-grid">
        {options.map((n) => (
          <button
            key={`${round}-${n}`}
            className="choice-mark"
            type="button"
            onClick={() => {
              playTap();
              if (n === target && !sticker) win();
            }}
          >
            {n}
          </button>
        ))}
      </div>
    </GameFrame>
  );
}

function FindPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const decoys: MarkId[] = ["balloon", "cupcake", "moon", "bunny", "sun", "gift"];
  const target = game.items[0] || game.icon;
  const count = [6, 9, 12][level];
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  const tiles = useMemo(() => {
    const items = Array.from({ length: count }, (_, i) => (i === 2 ? target : decoys[i % decoys.length]));
    return shuffle(items);
  }, [count, target, round]);

  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <p className="pictorial-goal"><Mark id={target} /></p>
      <div className="choice-grid">
        {tiles.map((item, index) => (
          <button
            key={`${round}-${item}-${index}`}
            className="choice-mark illustrated"
            type="button"
            onClick={() => {
              playTap();
              if (item === target && !sticker) win();
            }}
          >
            <Mark id={item} />
          </button>
        ))}
      </div>
    </GameFrame>
  );
}

function MatchPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const marks = game.items.slice(0, [3, 4, 4][level]);
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  const left = useMemo(() => shuffle(marks), [marks, round]);
  const right = useMemo(() => shuffle(marks), [marks, round]);
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    setPicked(null);
    setDone([]);
  }, [round]);

  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <div className="match-columns">
        <div className="choice-grid">
          {left.map((item) => (
            <button key={`l-${item}`} className={`choice-mark illustrated ${picked === item ? "glow" : ""}`} disabled={done.includes(item)} type="button" onClick={() => { playTap(); setPicked(item); }}>
              <Mark id={item} />
            </button>
          ))}
        </div>
        <div className="choice-grid">
          {right.map((item) => (
            <button
              key={`r-${item}`}
              className="choice-mark illustrated"
              disabled={done.includes(item)}
              type="button"
              onClick={() => {
                if (picked !== item) return;
                playSparkle();
                const next = [...done, item];
                setDone(next);
                setPicked(null);
                if (next.length === marks.length && !sticker) win();
              }}
            >
              <Mark id={item} />
            </button>
          ))}
        </div>
      </div>
    </GameFrame>
  );
}

function PathPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const length = [4, 5, 6][level];
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  const [step, setStep] = useState(0);
  useEffect(() => setStep(0), [round]);
  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <div className="path-row">
        {Array.from({ length }).map((_, index) => (
          <button
            key={`${round}-${index}`}
            className={`choice-mark illustrated ${index < step ? "glow" : ""}`}
            type="button"
            onClick={() => {
              if (index !== step) return;
              playTap();
              if (index + 1 >= length && !sticker) win();
              else setStep(index + 1);
            }}
          >
            <Mark id={game.icon} />
          </button>
        ))}
      </div>
    </GameFrame>
  );
}

function OddPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const same = game.items[0] || "star";
  const odd = game.items[1] || "heart";
  const count = [4, 6, 8][level];
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  const tiles = useMemo(() => shuffle([odd, ...Array.from({ length: count - 1 }, () => same)]), [count, odd, same, round]);
  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <div className="choice-grid">
        {tiles.map((item, index) => (
          <button key={`${round}-${item}-${index}`} className="choice-mark illustrated" type="button" onClick={() => { playTap(); if (item === odd && !sticker) win(); }}>
            <Mark id={item} />
          </button>
        ))}
      </div>
    </GameFrame>
  );
}

function PatternPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const marks = game.items.slice(0, 3);
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  const pattern = useMemo(() => [marks[0], marks[1], marks[0], marks[1], marks[0]], [marks, round]);
  const missing = pattern[pattern.length - 1];
  const options = level > 0 ? marks : [missing, marks[1] || marks[0]];
  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <p className="pictorial-goal pattern-goal">
        {pattern.slice(0, -1).map((item, i) => <Mark key={`${round}-${i}`} id={item} />)}
        <span className="pattern-q">?</span>
      </p>
      <div className="choice-grid">
        {options.map((item) => (
          <button key={`${round}-${item}`} className="choice-mark illustrated" type="button" onClick={() => { playTap(); if (item === missing && !sticker) win(); }}>
            <Mark id={item} />
          </button>
        ))}
      </div>
    </GameFrame>
  );
}
