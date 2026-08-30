"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { speakText, stopSpeech } from "@/lib/sound";
import { celebrateReward, type StickerId } from "@/lib/stickers";
import { Celebration } from "@/components/games/Celebration";
import { StoryScene, type SceneId } from "@/components/marks/StoryScenes";
import { storiesForLocale, type StoryBook } from "@/lib/stories/catalog";
import { readAgeBand } from "@/lib/age";
import { playCopy } from "@/lib/play-copy";
import type { Locale } from "@/lib/i18n";

export function StoryReader({ book, locale }: { book: StoryBook; locale: Locale }) {
  const age = readAgeBand();
  const pages = useMemo(() => {
    if (age === "3-5") return book.pages.slice(0, 4);
    if (age === "7-10") return book.pages;
    return book.pages.slice(0, Math.min(6, book.pages.length));
  }, [age, book.pages]);
  const hold = age === "3-5" ? 7000 : age === "7-10" ? 8000 : 6500;
  const [page, setPage] = useState(0);
  const [listening, setListening] = useState(false);
  const [sticker, setSticker] = useState<StickerId | null>(null);
  const [finished, setFinished] = useState(false);
  const current = pages[Math.min(page, pages.length - 1)];
  const t = playCopy[locale];
  const library = storiesForLocale(locale);
  const nextBook = library[(library.findIndex((item) => item.id === book.id) + 1) % library.length];
  const dismiss = useCallback(() => setSticker(null), []);

  useEffect(() => () => stopSpeech(), []);

  useEffect(() => {
    setPage(0);
    setFinished(false);
    setSticker(null);
    setListening(false);
    stopSpeech();
  }, [book.id, age]);

  function go(next: number) {
    const clipped = Math.min(pages.length - 1, Math.max(0, next));
    setPage(clipped);
    if (clipped >= pages.length - 1 && !finished) {
      setFinished(true);
      if (!sticker) setSticker(celebrateReward({ stars: 7, seed: `story-${book.id}-${Date.now()}` }));
    }
  }

  useEffect(() => {
    if (listening || sticker || finished) return;
    const timer = window.setTimeout(() => {
      if (page < pages.length - 1) go(page + 1);
      else go(page);
    }, hold);
    return () => window.clearTimeout(timer);
  }, [page, hold, listening, sticker, finished, pages.length]);

  function listen() {
    if (listening) {
      stopSpeech();
      setListening(false);
      return;
    }
    setListening(true);
    const utter = speakText(current.text, locale);
    if (!utter) {
      setListening(false);
      return;
    }
    utter.onend = () => {
      setListening(false);
      if (page < pages.length - 1) go(page + 1);
      else go(page);
    };
  }

  return (
    <article className="story-reader">
      {sticker ? <Celebration locale={locale} sticker={sticker} onDone={dismiss} /> : null}
      <button
        type="button"
        className="story-stage"
        style={{ background: current.tint }}
        onClick={() => {
          if (sticker) return;
          if (page < pages.length - 1) go(page + 1);
          else go(page);
        }}
      >
        <StoryScene scene={current.scene as SceneId} />
        <p className="story-caption">{current.text}</p>
        <span className="story-hint">{t.tapSkip}</span>
      </button>
      <div className="story-controls">
        <button className="giant-pictorial-button pressable" type="button" disabled={page === 0} onClick={() => setPage((value) => Math.max(0, value - 1))}>←</button>
        <button className={`giant-pictorial-button pressable ${listening ? "glow" : ""}`} type="button" onClick={listen} aria-label={listening ? t.hush : t.listen}>
          {listening ? "■" : "♪"}
        </button>
        <button
          className="giant-pictorial-button pressable"
          type="button"
          onClick={() => go(page + 1)}
        >
          →
        </button>
      </div>
      {finished && !sticker ? (
        <div className="story-next-row">
          <button className="giant-next-button pressable" type="button" onClick={() => { setPage(0); setFinished(false); }}>
            {t.playAgain}
          </button>
          <Link className="giant-next-button pressable" href={`/${locale}/storyhouse/${nextBook.id}`}>
            {t.nextStory}
          </Link>
        </div>
      ) : null}
    </article>
  );
}
