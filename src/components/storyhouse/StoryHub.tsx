"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { afterPaint } from "@/lib/client-state";
import { readAgeBand, type AgeBand } from "@/lib/age";
import type { StoryBook, StoryShelf } from "@/lib/stories/catalog";
import type { Locale } from "@/lib/i18n";
import { storyCopy } from "@/lib/stories/copy";
import { Mark } from "@/components/marks/VaphiaMarks";

const shelfCopy: Record<Locale, Record<StoryShelf, string>> = {
  en: { sisters: "Vania & Sophia", folk: "Folk & Classics" },
  fa: { sisters: "وانیا و سوفیا", folk: "قصه‌های کهن" },
  fr: { sisters: "Vania & Sophia", folk: "Contes et classiques" },
  es: { sisters: "Vania y Sophia", folk: "Cuentos y clásicos" }
};

export function StoryHub({ locale, books }: { locale: Locale; books: StoryBook[] }) {
  const [age, setAge] = useState<AgeBand | null>(null);
  useEffect(() => afterPaint(() => setAge(readAgeBand())), []);
  const sisters = books.filter((book) => book.shelf === "sisters");
  const folkAll = books.filter((book) => book.shelf === "folk");
  const folk = age === "3-5" ? folkAll.slice(0, 1) : folkAll;
  const t = storyCopy[locale];

  return (
    <section className={`shell story-house hub-${age || "all"}`} id="read-books" aria-labelledby="read-books-title">
      <div className="story-shelf-heading story-read-heading">
        <div>
          <span className="eyebrow"><Mark id="book" /> {t.readBooks}</span>
          <h2 className="story-shelf-title" id="read-books-title">{t.readBooks}</h2>
          <p>{t.readBooksText}</p>
        </div>
        <span className="story-format-note">{t.pages} · {t.original}</span>
      </div>
      <Shelf locale={locale} shelf="sisters" title={shelfCopy[locale].sisters} books={sisters} />
      <Shelf locale={locale} shelf="folk" title={shelfCopy[locale].folk} books={folk} />
    </section>
  );
}

function Shelf({
  locale,
  shelf,
  title,
  books
}: {
  locale: Locale;
  shelf: StoryShelf;
  title: string;
  books: StoryBook[];
}) {
  if (!books.length) return null;
  return (
    <div className={`story-shelf story-shelf-${shelf}`}>
      <h2 className="story-shelf-title">{title}</h2>
      <div className="story-grid">
        {books.map((book) => (
          <Link key={book.id} href={`/${locale}/storyhouse/read/${book.id}`} className="story-card pressable">
            <span className="story-card-cover">
              <Image src={book.cover} alt={book.title} fill sizes="(max-width: 760px) 90vw, 360px" className="story-card-photo" />
            </span>
            <span className="story-card-meta"><span>{storyCopy[locale].original}</span><span>{book.pages.length} {storyCopy[locale].pages}</span></span>
            <strong>{book.title}</strong>
            <span>{book.blurb}</span>
            <span className="story-card-status">{storyCopy[locale].readNow}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
