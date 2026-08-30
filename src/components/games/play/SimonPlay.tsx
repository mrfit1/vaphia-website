"use client";

import { useEffect, useState } from "react";
import { TokenFace } from "@/components/art/TokenFace";
import { playNote, playTap } from "@/lib/sound";
import type { TokenId } from "@/lib/art";
import type { GameDef } from "@/lib/games/catalog";
import type { Locale } from "@/lib/i18n";
import { GameFrame, useReward, type RoundProps } from "./shared";

const PADS: TokenId[] = ["star", "heart", "flower", "sun"];
const NOTES = [523, 659, 784, 987];

export function SimonPlay({ game, locale, level }: { game: GameDef; locale: Locale; level: number }) {
  const { win, banner, nextControl, round, sticker } = useReward(game, locale);
  return (
    <GameFrame game={game} locale={locale} banner={banner} nextControl={nextControl}>
      <SimonRound key={round} game={game} level={level} round={round} win={win} sticker={sticker} />
    </GameFrame>
  );
}

function SimonRound({ level, round, win, sticker }: RoundProps) {
  const targetLen = 3 + level + Math.min(round - 1, 2);
  const [sequence, setSequence] = useState<number[]>(() => [Math.floor(Math.random() * 4)]);
  const [step, setStep] = useState(0);
  const [glow, setGlow] = useState<number | null>(null);
  const [phase, setPhase] = useState<"show" | "play">("show");
  const [wiggle, setWiggle] = useState<number | null>(null);

  useEffect(() => {
    if (phase !== "show") return;
    const seq = sequence;
    const timers: number[] = [];
    seq.forEach((item, index) => {
      timers.push(window.setTimeout(() => {
        setGlow(item);
        playNote(NOTES[item]);
      }, 420 + 620 * index));
      timers.push(window.setTimeout(() => setGlow(null), 420 + 620 * index + 380));
    });
    timers.push(window.setTimeout(() => {
      setGlow(null);
      setPhase("play");
      setStep(0);
    }, 420 + 620 * seq.length));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [phase, sequence]);

  function press(index: number) {
    if (phase !== "play" || sticker) return;
    playTap();
    playNote(NOTES[index]);
    if (sequence[step] !== index) {
      setWiggle(index);
      window.setTimeout(() => setWiggle(null), 380);
      setStep(0);
      setPhase("show");
      return;
    }
    if (step + 1 < sequence.length) {
      setStep(step + 1);
      return;
    }
    if (sequence.length >= targetLen) {
      win();
      return;
    }
    setSequence((current) => [...current, Math.floor(Math.random() * 4)]);
    setPhase("show");
    setStep(0);
  }

  return (
    <>
      <p className="pictorial-goal">{sequence.length} / {targetLen}</p>
      <div className="choice-grid simon-grid">
        {PADS.map((mark, index) => (
          <button
            key={mark}
            className={`choice-mark illustrated token-choice ${glow === index ? "glow" : ""} ${wiggle === index ? "wiggle" : ""}`}
            disabled={phase === "show"}
            type="button"
            onClick={() => press(index)}
          >
            <TokenFace id={mark} />
          </button>
        ))}
      </div>
    </>
  );
}
