"use client";

import { useMemo, useState } from "react";
import { ART } from "@/lib/art";
import { playTap } from "@/lib/sound";
import type { GameDef } from "@/lib/games/catalog";
import type { Locale } from "@/lib/i18n";
import { GameFrame, useReward, type RoundProps } from "./shared";

export function PuzzlePlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <PuzzleRound key={round} game={game} level={level} round={round} win={win} sticker={sticker} />
    </GameFrame>
  );
}

function scramble(solved: number[], size: number) {
  const tiles = [...solved];
  const last = tiles.length - 1;
  for (let i = 0; i < 90 + size * 20; i += 1) {
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
  if (tiles.every((tile, i) => tile === i)) return scramble(solved, size);
  return tiles;
}

function PuzzleRound({ level, round, win, sticker }: RoundProps) {
  const size = Math.min(4, [2, 3, 3][level] + Math.min(round - 1, 2));
  const last = size * size - 1;
  const solved = useMemo(() => Array.from({ length: size * size }, (_, i) => i), [size]);
  const [tiles, setTiles] = useState(() => scramble(solved, size));

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
    <div className="picture-puzzle painted-puzzle" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
      {tiles.map((tile, index) =>
        tile === last ? (
          <div key={index} className="puzzle-tile empty" />
        ) : (
          <button
            key={index}
            className="puzzle-tile"
            type="button"
            onClick={() => move(index)}
            style={{
              backgroundImage: `url(${ART.bedroom})`,
              backgroundSize: `${size * 100}% ${size * 100}%`,
              backgroundPosition: `${(tile % size) * (100 / (size - 1))}% ${Math.floor(tile / size) * (100 / (size - 1))}%`
            }}
            aria-label="tile"
          />
        )
      )}
    </div>
  );
}
