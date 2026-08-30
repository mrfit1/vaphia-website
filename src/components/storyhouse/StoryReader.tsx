"use client";

import { useEffect, useState } from "react";
import { speakText, stopSpeech } from "@/lib/sound";
import { celebrateReward, type StickerId } from "@/lib/stickers";
import { Celebration } from "@/components/games/Celebration";
import type { StoryBook } from "@/lib/stories/catalog";
import type { Locale } from "@/lib/i18n";

export function StoryReader({ book, locale }: { book: StoryBook; locale: Locale }) {
  const [page, setPage] = useState(0);
  const [listening, setListening] = useState(false);
  const [sticker, setSticker] = useState<StickerId | null>(null);
  const current = book.pages[page];

  useEffect(() => () => stopSpeech(), []);

  function finishIfLast(next: number) {
    if (next >= book.pages.length - 1 && !sticker) {
      setSticker(celebrateReward({ stars: 7, seed: `story-${book.id}` }));
    }
  }

  function listen() {
    setListening(true);
    const utter = speakText(current.text, locale);
    if (!utter) return;
    utter.onend = () => {
      if (page < book.pages.length - 1) {
        const next = page + 1;
        setPage(next);
        finishIfLast(next);
      } else {
        setListening(false);
        finishIfLast(page);
      }
    };
  }

  return (
    <article className="story-reader">
      {sticker && <Celebration locale={locale} sticker={sticker} />}
      <div className="story-page" style={{ background: current.tint }}>
        <span className="story-art float-soft" aria-hidden="true">{current.mark}</span>
        <p>{current.text}</p>
      </div>
      <div className="story-controls">
        <button className="giant-pictorial-button" disabled={page === 0} onClick={() => setPage((value) => Math.max(0, value - 1))}>←</button>
        <button className={`giant-pictorial-button ${listening ? "glow" : ""}`} onClick={listen}>🔊</button>
        <button
          className="giant-pictorial-button"
          disabled={page >= book.pages.length - 1}
          onClick={() => {
            const next = Math.min(book.pages.length - 1, page + 1);
            setPage(next);
            finishIfLast(next);
          }}
        >
          →
        </button>
      </div>
    </article>
  );
}
