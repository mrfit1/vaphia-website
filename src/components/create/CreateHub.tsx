"use client";

import Link from "next/link";
import { writeAgeBand, type AgeBand } from "@/lib/age";
import { coloringForAge } from "@/lib/coloring/catalog";
import { createCopy } from "@/lib/coloring/copy";
import { Mark, type MarkId } from "@/components/marks/VaphiaMarks";
import type { Locale } from "@/lib/i18n";

const doors: { band: AgeBand; mark: MarkId; tint: string }[] = [
  { band: "3-5", mark: "age-tiny", tint: "#ffe8dc" },
  { band: "5-7", mark: "age-mid", tint: "#ffe2f2" },
  { band: "7-10", mark: "age-big", tint: "#fff2ba" }
];

export function CreateHub({ locale }: { locale: Locale }) {
  const t = createCopy[locale];

  return (
    <section className="create-hub">
      <h1>{t.pick}</h1>
      <p>{t.hint}</p>
      <div className="create-doors">
        {doors.map((door) => {
          const preview = coloringForAge(door.band)[0];
          return (
            <Link
              key={door.band}
              href={`/${locale}/create/ages/${door.band}`}
              className="create-door pressable"
              style={{ background: door.tint }}
              onClick={() => writeAgeBand(door.band)}
            >
              <span className="age-mark"><Mark id={door.mark} /></span>
              {preview ? (
                <span className="door-preview" style={{ backgroundImage: `url(${preview.file})` }} aria-hidden="true" />
              ) : null}
              <strong>{t.doors[door.band].label}</strong>
              <span>{t.doors[door.band].blurb}</span>
            </Link>
          );
        })}
      </div>
      <Link href={`/${locale}/create/draw`} className="create-draw-door pressable">
        <span className="age-mark"><Mark id="paint" /></span>
        <strong>{t.draw}</strong>
      </Link>
    </section>
  );
}
