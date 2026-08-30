"use client";

import { readAgeBand } from "@/lib/age";
import type { GameDef } from "@/lib/games/catalog";
import type { Locale } from "@/lib/i18n";
import { difficulty } from "./play/shared";
import { MemoryPlay } from "./play/MemoryPlay";
import { BalloonPlay } from "./play/BalloonPlay";
import { CatchPlay } from "./play/CatchPlay";
import { PuzzlePlay } from "./play/PuzzlePlay";
import { SimonPlay } from "./play/SimonPlay";
import { SortPlay } from "./play/SortPlay";
import { CountPlay } from "./play/CountPlay";
import { HiddenPlay } from "./play/HiddenPlay";
import { OddPlay } from "./play/OddPlay";
import { FitPlay } from "./play/FitPlay";

export function GamePlayer({ game, locale }: { game: GameDef; locale: Locale; imageUrl?: string }) {
  const level = difficulty(readAgeBand());
  if (game.mechanic === "memory") return <MemoryPlay game={game} locale={locale} level={level} />;
  if (game.mechanic === "balloons") return <BalloonPlay game={game} locale={locale} level={level} />;
  if (game.mechanic === "catch") return <CatchPlay game={game} locale={locale} level={level} />;
  if (game.mechanic === "puzzle") return <PuzzlePlay game={game} locale={locale} level={level} />;
  if (game.mechanic === "simon") return <SimonPlay game={game} locale={locale} level={level} />;
  if (game.mechanic === "sort") return <SortPlay game={game} locale={locale} level={level} />;
  if (game.mechanic === "count") return <CountPlay game={game} locale={locale} level={level} />;
  if (game.mechanic === "hidden") return <HiddenPlay game={game} locale={locale} level={level} />;
  if (game.mechanic === "odd") return <OddPlay game={game} locale={locale} level={level} />;
  return <FitPlay game={game} locale={locale} level={level} />;
}
