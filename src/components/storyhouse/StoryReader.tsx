"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { celebrateReward, type StickerId } from "@/lib/stickers";
import { Celebration } from "@/components/games/Celebration";
import { storiesForLocale, type StoryBook, type StoryMotion, type StoryPage } from "@/lib/stories/catalog";
import { readAgeBand } from "@/lib/age";
import { playCopy } from "@/lib/play-copy";
import type { Locale } from "@/lib/i18n";

async function findHumanAudio(bookId: string, explicit?: string) {
  if (explicit) return explicit;
  if (typeof window === "undefined") return null;
  for (const ext of [".mp3", ".m4a"] as const) {
    const url = `/audio/${bookId}${ext}`;
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (res.ok) return url;
    } catch {
      /* no human recording */
    }
  }
  return null;
}

function motionOf(page: StoryPage): StoryMotion {
  if (page.motion) return page.motion;
  if (page.image.includes("vaphia-hero") || page.image.includes("vaphia-banner")) return "kenburns";
  return "float";
}

export function StoryReader({ book, locale }: { book: StoryBook; locale: Locale }) {
  const age = readAgeBand();
  return <StorySession key={`${book.id}-${age ?? "all"}`} book={book} locale={locale} />;
}

function StorySession({ book, locale }: { book: StoryBook; locale: Locale }) {
  const age = readAgeBand();
  const pages = useMemo(() => {
    if (age === "3-5") return book.pages.slice(0, 4);
    if (age === "7-10") return book.pages;
    return book.pages.slice(0, Math.min(6, book.pages.length));
  }, [age, book.pages]);
  const hold = age === "3-5" ? 7000 : age === "7-10" ? 8000 : 6500;
  const [page, setPage] = useState(0);
  const [listening, setListening] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(book.audio ?? null);
  const [sticker, setSticker] = useState<StickerId | null>(null);
  const [finished, setFinished] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const current = pages[Math.min(page, pages.length - 1)];
  const t = playCopy[locale];
  const library = storiesForLocale(locale);
  const nextBook = library[(library.findIndex((item) => item.id === book.id) + 1) % library.length];
  const dismiss = useCallback(() => setSticker(null), []);
  const motion = motionOf(current);

  useEffect(() => {
    let alive = true;
    void findHumanAudio(book.id, book.audio).then((src) => {
      if (alive) setAudioSrc(src);
    });
    return () => {
      alive = false;
    };
  }, [book.id, book.audio]);

  const finishIfLast = useCallback((index: number) => {
    if (index < pages.length - 1) return;
    setFinished((wasFinished) => {
      if (!wasFinished) {
        setSticker((currentSticker) => currentSticker ?? celebrateReward({ stars: 7, seed: `story-${book.id}-${Date.now()}` }));
      }
      return true;
    });
  }, [pages.length, book.id]);

  const go = useCallback((next: number) => {
    const clipped = Math.min(pages.length - 1, Math.max(0, next));
    setPage(clipped);
    finishIfLast(clipped);
  }, [pages.length, finishIfLast]);

  useEffect(() => {
    if (listening || sticker || finished) return;
    const timer = window.setTimeout(() => {
      if (page < pages.length - 1) go(page + 1);
      else go(page);
    }, hold);
    return () => window.clearTimeout(timer);
  }, [page, hold, listening, sticker, finished, pages.length, go]);

  function pageFromAudio(el: HTMLAudioElement) {
    if (!Number.isFinite(el.duration) || el.duration <= 0) return page;
    return Math.min(pages.length - 1, Math.floor((el.currentTime / el.duration) * pages.length));
  }

  function seekAudio(index: number) {
    const el = audioRef.current;
    if (!el || !listening || !Number.isFinite(el.duration) || el.duration <= 0) return;
    el.currentTime = Math.min(el.duration - 0.05, index * (el.duration / pages.length));
  }

  function listen() {
    const el = audioRef.current;
    if (!el || !audioSrc) return;
    if (listening) {
      el.pause();
      setListening(false);
      return;
    }
    seekAudio(page);
    void el.play().then(() => setListening(true)).catch(() => setListening(false));
  }

  function turn(next: number) {
    if (sticker) return;
    const clipped = Math.min(pages.length - 1, Math.max(0, next));
    seekAudio(clipped);
    go(clipped);
  }

  return (
    <article className="story-reader">
      {sticker ? <Celebration locale={locale} sticker={sticker} onDone={dismiss} /> : null}
      {audioSrc ? (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
          hidden
          onTimeUpdate={(event) => {
            const idx = pageFromAudio(event.currentTarget);
            setPage(idx);
            finishIfLast(idx);
          }}
          onEnded={() => {
            setListening(false);
            go(pages.length - 1);
          }}
        />
      ) : null}
      <button
        type="button"
        className="story-stage"
        onClick={() => turn(page + 1)}
      >
        <span className={`story-art-layer story-art-${motion}`} aria-hidden="true">
          <Image
            src={current.image}
            alt=""
            fill
            sizes="100vw"
            priority={page === 0}
            className="story-art-img"
          />
          {motion === "sparkle" ? <span className="story-sparkles" /> : null}
        </span>
        <p className="story-caption">{current.text}</p>
        <span className="story-hint">{t.tapSkip}</span>
      </button>
      <div className="story-controls">
        <button className="giant-pictorial-button pressable" type="button" disabled={page === 0} onClick={() => turn(page - 1)}>←</button>
        {audioSrc ? (
          <button className={`giant-pictorial-button pressable ${listening ? "glow" : ""}`} type="button" onClick={listen} aria-label={listening ? t.hush : t.listen}>
            {listening ? "■" : "♪"}
          </button>
        ) : null}
        <button className="giant-pictorial-button pressable" type="button" onClick={() => turn(page + 1)}>→</button>
      </div>
      {finished && !sticker ? (
        <div className="story-next-row">
          <button
            className="giant-next-button pressable"
            type="button"
            onClick={() => {
              audioRef.current?.pause();
              setListening(false);
              setPage(0);
              setFinished(false);
            }}
          >
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
