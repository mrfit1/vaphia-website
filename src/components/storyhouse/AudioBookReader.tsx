"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mark } from "@/components/marks/VaphiaMarks";
import { celebrateReward, type StickerId } from "@/lib/stickers";
import { Celebration } from "@/components/games/Celebration";
import { storyCopy } from "@/lib/stories/copy";
import type { AudioBook } from "@/lib/stories/audio-catalog";
import type { Locale } from "@/lib/i18n";

export function AudioBookReader({ book, locale }: { book: AudioBook; locale: Locale }) {
  const t = storyCopy[locale];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);
  const [sticker, setSticker] = useState<StickerId | null>(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate;
  }, [rate]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio || !book.audioSrc) return;
    if (playing) {
      audio.pause();
      return;
    }
    void audio.play().catch(() => setPlaying(false));
  }

  function seekBy(seconds: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration || duration, audio.currentTime + seconds));
  }

  function finish() {
    setPlaying(false);
    setSticker(celebrateReward({ stars: 8, seed: `audio-${book.id}` }));
  }

  return (
    <article className="audio-reader">
      {sticker ? <Celebration locale={locale} sticker={sticker} onDone={() => setSticker(null)} /> : null}
      {book.audioSrc ? (
        <audio
          ref={audioRef}
          src={book.audioSrc}
          preload="metadata"
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={finish}
        />
      ) : null}
      <div className={`audio-reader-cover ${playing ? "is-playing" : ""}`}>
        <Image src={book.cover} alt="" fill sizes="(max-width: 760px) 92vw, 520px" priority className="story-card-photo" />
        <span className="audio-reader-icon"><Mark id="music" /></span>
      </div>
      <div className="audio-reader-copy">
        <span className="eyebrow">{t.original}</span>
        <h1>{book.title}</h1>
        <p>{book.blurb}</p>
        <div className="audio-reader-tags">
          <span>{t.femaleNarration}</span>
          <span>{book.minutes} {t.minutes}</span>
          <span>{book.chapters} {locale === "fa" ? "بخش" : locale === "fr" ? "chap." : locale === "es" ? "cap." : "chapters"}</span>
        </div>
      </div>
      {book.audioSrc ? (
        <div className="audio-player" aria-label={book.title}>
          <div className="audio-player-actions">
            <button className="giant-pictorial-button pressable" type="button" onClick={() => seekBy(-10)} aria-label={t.rewind}>↶</button>
            <button className="giant-pictorial-button pressable audio-play-button" type="button" onClick={togglePlay} aria-label={playing ? t.pause : t.play}>{playing ? "Ⅱ" : "▶"}</button>
            <button className="giant-pictorial-button pressable" type="button" onClick={() => seekBy(10)} aria-label={t.forward}>↷</button>
          </div>
          <input
            className="audio-progress"
            type="range"
            min="0"
            max={duration || 1}
            step="0.1"
            value={Math.min(current, duration || 1)}
            onChange={(event) => {
              const value = Number(event.target.value);
              setCurrent(value);
              if (audioRef.current) audioRef.current.currentTime = value;
            }}
            aria-label={`${book.title} progress`}
          />
          <div className="audio-player-bottom">
            <span>{formatTime(current)} / {formatTime(duration)}</span>
            <label>{t.speed}<select value={rate} onChange={(event) => setRate(Number(event.target.value))}>
              <option value="0.8">0.8×</option>
              <option value="1">1×</option>
              <option value="1.2">1.2×</option>
            </select></label>
          </div>
        </div>
      ) : (
        <div className="audio-coming-soon">
          <span className="audio-coming-soon-icon"><Mark id="music" /></span>
          <strong>{t.recordingSoon}</strong>
          <p>{t.noAudioYet}</p>
        </div>
      )}
      <div className="story-reader-links">
        <Link className="giant-next-button pressable" href={`/${locale}/storyhouse`}>{t.backToLibrary}</Link>
      </div>
    </article>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remaining}`;
}
