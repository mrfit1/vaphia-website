"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { celebrateReward, type StickerId } from "@/lib/stickers";
import { Celebration } from "@/components/games/Celebration";
import { storiesForLocale, type StoryBook, type StoryMotion, type StoryPage } from "@/lib/stories/catalog";
import { readAgeBand } from "@/lib/age";
import { playCopy } from "@/lib/play-copy";
import { storyCopy } from "@/lib/stories/copy";
import { playPageTurn } from "@/lib/sound";
import type { Locale } from "@/lib/i18n";

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
  const [sticker, setSticker] = useState<StickerId | null>(null);
  const [finished, setFinished] = useState(false);
  const current = pages[Math.min(page, pages.length - 1)];
  const t = playCopy[locale];
  const storyT = storyCopy[locale];
  const library = storiesForLocale(locale);
  const nextBook = library[(library.findIndex((item) => item.id === book.id) + 1) % library.length];
  const dismiss = useCallback(() => setSticker(null), []);
  const motion = motionOf(current);

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
    if (sticker || finished) return;
    const timer = window.setTimeout(() => {
      if (page < pages.length - 1) go(page + 1);
      else go(page);
    }, hold);
    return () => window.clearTimeout(timer);
  }, [page, hold, sticker, finished, pages.length, go]);

  function turn(next: number) {
    if (sticker) return;
    const clipped = Math.min(pages.length - 1, Math.max(0, next));
    go(clipped);
    if (clipped !== page) playPageTurn();
  }

  return (
    <article className="story-reader">
      {sticker ? <Celebration locale={locale} sticker={sticker} onDone={dismiss} /> : null}
      <div className="story-reader-topbar">
        <Link className="story-back-link pressable" href={`/${locale}/storyhouse`}>← {storyT.backToLibrary}</Link>
        <span className="story-page-count">{storyT.pageOf.replace("{page}", String(page + 1)).replace("{total}", String(pages.length))}</span>
      </div>
      <div className="story-progress" aria-hidden="true"><span style={{ width: `${((page + 1) / pages.length) * 100}%` }} /></div>
      <button
        type="button"
        className="story-stage"
        onClick={() => turn(page + 1)}
        aria-label={`${storyT.next}: ${storyT.pageOf.replace("{page}", String(Math.min(page + 2, pages.length))).replace("{total}", String(pages.length))}`}
      >
        <span key={page} className={`story-art-layer story-art-${motion}`} aria-hidden="true">
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
        <p className="story-caption" aria-live="polite">{current.text}</p>
        <span className="story-hint">{t.tapSkip}</span>
      </button>
      <div className="story-controls">
        <button className="giant-pictorial-button pressable" type="button" disabled={page === 0} onClick={() => turn(page - 1)} aria-label={storyT.previous}>←</button>
        <button className="giant-pictorial-button pressable" type="button" onClick={() => turn(page + 1)} aria-label={storyT.next}>→</button>
      </div>
      {finished && !sticker ? (
        <div className="story-next-row">
          <button
            className="giant-next-button pressable"
            type="button"
            onClick={() => {
              setPage(0);
              setFinished(false);
            }}
          >
            {t.playAgain}
          </button>
          <Link className="giant-next-button pressable" href={`/${locale}/storyhouse/read/${nextBook.id}`}>
            {t.nextStory}
          </Link>
        </div>
      ) : null}
    </article>
  );
}
