import Image from "next/image";
import Link from "next/link";
import { Mark } from "@/components/marks/VaphiaMarks";
import { storyCopy } from "@/lib/stories/copy";
import type { AudioBook } from "@/lib/stories/audio-catalog";
import type { Locale } from "@/lib/i18n";

export function AudioBookHub({ locale, books }: { locale: Locale; books: AudioBook[] }) {
  const t = storyCopy[locale];

  return (
    <section className="story-shelf audio-book-shelf" id="audio-books" aria-labelledby="audio-books-title">
      <div className="story-shelf-heading">
        <div>
          <span className="eyebrow"><Mark id="music" /> {t.audioBooks}</span>
          <h2 className="story-shelf-title" id="audio-books-title">{t.audioBooks}</h2>
          <p>{t.audioBooksText}</p>
        </div>
        <span className="story-rights-note">{t.rightsNote}</span>
      </div>
      <div className="story-grid audio-book-grid">
        {books.map((book) => (
          <Link key={book.id} href={`/${locale}/storyhouse/audio/${book.id}`} className="story-card audio-book-card pressable">
            <span className="story-card-cover">
              <Image src={book.cover} alt={book.title} fill sizes="(max-width: 760px) 90vw, 360px" className="story-card-photo" />
              <span className="audio-cover-mark" aria-hidden="true"><Mark id="music" /></span>
            </span>
            <span className="story-card-meta"><span>{t.original}</span><span>{book.minutes} {t.minutes}</span></span>
            <strong>{book.title}</strong>
            <span>{book.blurb}</span>
            <span className="story-card-status">{book.audioSrc ? t.audioReady : t.recordingSoon}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
