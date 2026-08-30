"use client";

import { useEffect, useState } from "react";
import { afterPaint } from "@/lib/client-state";
import Image from "next/image";
import Link from "next/link";
import { readAgeBand, writeAgeBand, type AgeBand } from "@/lib/age";
import { readStickerBook, stickerCatalog } from "@/lib/stickers";
import { GrownUpSocialLink } from "@/components/SocialIcons";
import { Mark, type MarkId } from "@/components/marks/VaphiaMarks";
import type { Locale } from "@/lib/i18n";

const copy: Record<Locale, {
  pick: string;
  ages: Record<AgeBand, string>;
  lands: { watch: string; play: string; create: string; story: string };
  surprise: string;
  stickers: string;
  changeAge: string;
}> = {
  en: { pick: "How old are you?", ages: { "3-5": "3–5", "5-7": "5–7", "7-10": "7–10" }, lands: { watch: "Watch", play: "Play", create: "Create", story: "Storyhouse" }, surprise: "Today", stickers: "Sticker book", changeAge: "Change age" },
  fa: { pick: "چند سالته؟", ages: { "3-5": "۳–۵", "5-7": "۵–۷", "7-10": "۷–۱۰" }, lands: { watch: "تماشا", play: "بازی", create: "بساز", story: "خانه قصه" }, surprise: "امروز", stickers: "دفتر استیکر", changeAge: "تغییر سن" },
  fr: { pick: "Quel âge as-tu ?", ages: { "3-5": "3–5", "5-7": "5–7", "7-10": "7–10" }, lands: { watch: "Regarder", play: "Jouer", create: "Créer", story: "Maison des histoires" }, surprise: "Aujourd’hui", stickers: "Carnet de stickers", changeAge: "Changer l’âge" },
  es: { pick: "¿Cuántos años tienes?", ages: { "3-5": "3–5", "5-7": "5–7", "7-10": "7–10" }, lands: { watch: "Ver", play: "Jugar", create: "Crear", story: "Casa de cuentos" }, surprise: "Hoy", stickers: "Libro de stickers", changeAge: "Cambiar edad" }
};

const ageMarks: Record<AgeBand, MarkId> = { "3-5": "age-tiny", "5-7": "age-mid", "7-10": "age-big" };

export function WorldHome({
  locale,
  heroImage,
  youtubeUrl,
  tiktokUrl,
  instagramUrl
}: {
  locale: Locale;
  heroImage: string;
  youtubeUrl: string;
  tiktokUrl: string;
  instagramUrl: string;
}) {
  const t = copy[locale];
  const [age, setAge] = useState<AgeBand | null>(null);
  const [owned, setOwned] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => setOwned(readStickerBook());
    const stop = afterPaint(() => {
      setAge(readAgeBand());
      refresh();
    });
    window.addEventListener("vaphia-stickers", refresh);
    return () => {
      stop();
      window.removeEventListener("vaphia-stickers", refresh);
    };
  }, []);

  if (!age) {
    return (
      <main className="world-home world-age-pick">
        <section className="age-door shell">
          <h1>{t.pick}</h1>
          <div className="age-door-grid">
            {(["3-5", "5-7", "7-10"] as AgeBand[]).map((band) => (
              <button
                key={band}
                className="age-door-card pressable"
                type="button"
                onClick={() => {
                  writeAgeBand(band);
                  setAge(band);
                }}
              >
                <span className="age-mark"><Mark id={ageMarks[band]} /></span>
                <strong>{t.ages[band]}</strong>
              </button>
            ))}
          </div>
        </section>
      </main>
    );
  }

  const allLands = [
    { href: `/${locale}/watch`, icon: "watch" as const, label: t.lands.watch, className: "land-watch" },
    { href: `/${locale}/play`, icon: "play" as const, label: t.lands.play, className: "land-play" },
    { href: `/${locale}/create`, icon: "create" as const, label: t.lands.create, className: "land-create" },
    { href: `/${locale}/storyhouse`, icon: "story" as const, label: t.lands.story, className: "land-story" }
  ];
  const lands = age === "3-5" ? [allLands[1], allLands[3], allLands[0]] : allLands;

  return (
    <main className={`world-home world-age-${age}`}>
      <section className="world-hero shell">
        <div className="hero-picture-wrap">
          <div className="hero-picture">
            <Image src={heroImage} alt="Sophia and Vania" fill sizes="(max-width: 900px) 100vw, 520px" priority className="cover-image" />
          </div>
          <span className="sister-tag left">Sophia</span>
          <span className="sister-tag right">Vania</span>
        </div>
        <button className="age-chip pressable" onClick={() => setAge(null)} type="button">
          <Mark id={ageMarks[age]} /> {t.ages[age]} · {t.changeAge}
        </button>
      </section>

      <section className={`world-lands shell lands-${age}`} aria-label="Vaphia lands">
        {lands.map((land) => (
          <Link key={land.href} href={land.href} className={`world-land pressable ${land.className}`}>
            <span className="land-mark"><Mark id={land.icon} /></span>
            <strong>{land.label}</strong>
          </Link>
        ))}
      </section>

      {age !== "3-5" ? (
        <section className="world-extras shell">
          <Link href={`/${locale}/play`} className="daily-surprise pressable">
            <span className="surprise-box"><Mark id="gift" /></span>
            <span>{t.surprise}</span>
          </Link>
          <Link href={`/${locale}/stickers`} className="sticker-book-card pressable">
            <span className="book-mark"><Mark id="book" /></span>
            <strong>{t.stickers}</strong>
            <div className="sticker-preview">
              {stickerCatalog.slice(0, age === "7-10" ? 12 : 8).map((item) => (
                <span key={item.id} className={owned.includes(item.id) ? "owned" : "locked"}>
                  {owned.includes(item.id) ? <Mark id={item.icon} /> : "○"}
                </span>
              ))}
            </div>
          </Link>
        </section>
      ) : (
        <section className="world-extras shell tiny-extra">
          <Link href={`/${locale}/stickers`} className="sticker-book-card pressable">
            <span className="book-mark"><Mark id="book" /></span>
            <strong>{t.stickers}</strong>
          </Link>
        </section>
      )}

      <div className="hero-socials world-socials shell">
        <GrownUpSocialLink name="youtube" href={youtubeUrl} locale={locale} />
        <GrownUpSocialLink name="tiktok" href={tiktokUrl} locale={locale} />
        <GrownUpSocialLink name="instagram" href={instagramUrl} locale={locale} />
      </div>
    </main>
  );
}
