"use client";

import { useEffect, useMemo, useState } from "react";
import { addVaphiaStars } from "./StarWallet";
import type { Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/ui-copy";

const solved = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function makePuzzle() {
  const tiles = [...solved];
  for (let i = 0; i < 80; i += 1) {
    const empty = tiles.indexOf(8);
    const row = Math.floor(empty / 3);
    const col = empty % 3;
    const candidates = [
      row > 0 ? empty - 3 : -1,
      row < 2 ? empty + 3 : -1,
      col > 0 ? empty - 1 : -1,
      col < 2 ? empty + 1 : -1
    ].filter((value) => value >= 0);
    const next = candidates[Math.floor(Math.random() * candidates.length)];
    [tiles[empty], tiles[next]] = [tiles[next], tiles[empty]];
  }
  return tiles;
}

export function PicturePuzzle({ locale, imageUrl }: { locale: Locale; imageUrl: string }) {
  const t = uiCopy[locale];
  const initial = useMemo(() => makePuzzle(), []);
  const [tiles, setTiles] = useState(initial);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (!won && tiles.every((tile, index) => tile === solved[index])) {
      setWon(true);
      addVaphiaStars(15);
    }
  }, [tiles, won]);

  function move(index: number) {
    const empty = tiles.indexOf(8);
    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(empty / 3);
    const emptyCol = empty % 3;
    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) !== 1) return;

    const next = [...tiles];
    [next[index], next[empty]] = [next[empty], next[index]];
    setTiles(next);
  }

  return (
    <section className="game-card">
      <div className="game-heading">
        <div><span className="eyebrow">Vaphia</span><h2>{t.pictureTitle as string}</h2></div>
      </div>
      <div className="picture-puzzle">
        {tiles.map((tile, index) => tile === 8 ? (
          <div key={index} className="puzzle-tile empty" />
        ) : (
          <button
            key={index}
            className="puzzle-tile"
            onClick={() => move(index)}
            aria-label={`${t.pictureTitle as string} ${tile + 1}`}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: `${(tile % 3) * 50}% ${Math.floor(tile / 3) * 50}%`
            }}
          />
        ))}
      </div>
      {won && <div className="game-win">{t.solved as string} +15 ⭐</div>}
      <button className="button secondary-button" onClick={() => { setTiles(makePuzzle()); setWon(false); }}>
        {t.shuffle as string}
      </button>
    </section>
  );
}
