"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { afterPaint } from "@/lib/client-state";
import { readAgeBand, type AgeBand } from "@/lib/age";
import type { StoryBook } from "@/lib/stories/catalog";
import { StoryScene, type SceneId } from "@/components/marks/StoryScenes";
import type { Locale } from "@/lib/i18n";

export function StoryHub({ locale, books }: { locale: Locale; books: StoryBook[] }) {
  const [age, setAge] = useState<AgeBand | null>(null);
  useEffect(() => afterPaint(() => setAge(readAgeBand())), []);
  const shown = age === "3-5" ? books.slice(0, 2) : age === "7-10" ? books : books.slice(0, 3);
  return (
    <section className={`shell story-grid hub-${age || "all"}`}>
      {shown.map((book) => (
        <Link key={book.id} href={`/${locale}/storyhouse/${book.id}`} className="story-card pressable">
          <span className="story-card-scene">
            <StoryScene scene={(book.pages[0]?.scene || "room-window") as SceneId} />
          </span>
          <strong>{book.title}</strong>
          <span>{book.blurb}</span>
        </Link>
      ))}
    </section>
  );
}
