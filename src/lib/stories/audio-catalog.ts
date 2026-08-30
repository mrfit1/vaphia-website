import type { AgeBand } from "@/lib/age";
import type { Locale } from "@/lib/i18n";
import { storyArt } from "@/lib/stories/scenes";

export type AudioRecordingState = "ready" | "recording-needed";

export type AudioBook = {
  id: string;
  locale: Locale;
  ageBand: AgeBand;
  title: string;
  blurb: string;
  cover: string;
  minutes: number;
  chapters: number;
  audioSrc?: string;
  recording: AudioRecordingState;
  narratorStyle: "gentle-natural-female";
  rights: "vaphia-original" | "rights-cleared";
};

type AudioRow = Omit<AudioBook, "id" | "locale" | "recording" | "narratorStyle" | "rights"> & { slug: string };

const rows: Record<Locale, AudioRow[]> = {
  en: [
    { slug: "moon-garden", ageBand: "3-5", title: "The Moon Garden", blurb: "A quiet garden grows silver flowers for bedtime.", cover: storyArt.stars, minutes: 4, chapters: 3 },
    { slug: "little-clouds-home", ageBand: "3-5", title: "Little Cloud Finds Home", blurb: "A small cloud learns where a soft sky can be.", cover: storyArt.hero, minutes: 4, chapters: 3 },
    { slug: "sisters-paper-town", ageBand: "5-7", title: "The Paper Town", blurb: "Vania and Sophia build a tiny town that welcomes everyone.", cover: storyArt.paint, minutes: 5, chapters: 4 },
    { slug: "garden-bell", ageBand: "5-7", title: "The Garden Bell", blurb: "A bell helps the friends take turns and listen.", cover: storyArt.garden, minutes: 5, chapters: 4 },
    { slug: "brave-small-song", ageBand: "7-10", title: "A Brave Small Song", blurb: "A quiet song travels across the park and brings friends together.", cover: storyArt.park, minutes: 6, chapters: 5 },
    { slug: "map-of-kindness", ageBand: "7-10", title: "The Map of Kindness", blurb: "Two sisters follow small clues to help their neighborhood.", cover: storyArt.banner, minutes: 6, chapters: 5 }
  ],
  fa: [
    { slug: "bagh-mah", ageBand: "3-5", title: "باغ ماه", blurb: "باغی آرام برای خواب، گل‌های نقره‌ای می‌کارد.", cover: storyArt.stars, minutes: 4, chapters: 3 },
    { slug: "abrak-kuchulu", ageBand: "3-5", title: "ابرک خانه‌اش را پیدا می‌کند", blurb: "ابر کوچکی یاد می‌گیرد آسمان نرمش کجاست.", cover: storyArt.hero, minutes: 4, chapters: 3 },
    { slug: "shahr-kaghazi", ageBand: "5-7", title: "شهر کاغذی", blurb: "وانیا و سوفیا شهری کوچک می‌سازند که برای همه جا دارد.", cover: storyArt.paint, minutes: 5, chapters: 4 },
    { slug: "zang-bagh", ageBand: "5-7", title: "زنگ باغ", blurb: "یک زنگ به دوستان یاد می‌دهد نوبت هم را رعایت کنند.", cover: storyArt.garden, minutes: 5, chapters: 4 },
    { slug: "ahang-kuchek-shoja", ageBand: "7-10", title: "آواز کوچک شجاع", blurb: "آوازی آرام از پارک می‌گذرد و دوستان را کنار هم می‌آورد.", cover: storyArt.park, minutes: 6, chapters: 5 },
    { slug: "naghshe-mehrabani", ageBand: "7-10", title: "نقشه مهربانی", blurb: "دو خواهر با چند نشانه کوچک به همسایه‌ها کمک می‌کنند.", cover: storyArt.banner, minutes: 6, chapters: 5 }
  ],
  fr: [
    { slug: "jardin-lune", ageBand: "3-5", title: "Le jardin de la lune", blurb: "Un jardin calme fait pousser des fleurs argentées pour la nuit.", cover: storyArt.stars, minutes: 4, chapters: 3 },
    { slug: "petit-nuage", ageBand: "3-5", title: "Le petit nuage retrouve sa maison", blurb: "Un petit nuage découvre où le ciel est tout doux.", cover: storyArt.hero, minutes: 4, chapters: 3 },
    { slug: "ville-papier", ageBand: "5-7", title: "La ville en papier", blurb: "Vania et Sophia fabriquent une ville qui accueille tout le monde.", cover: storyArt.paint, minutes: 5, chapters: 4 },
    { slug: "cloche-jardin", ageBand: "5-7", title: "La cloche du jardin", blurb: "Une cloche aide les amis à attendre leur tour et à écouter.", cover: storyArt.garden, minutes: 5, chapters: 4 },
    { slug: "petite-chanson", ageBand: "7-10", title: "Une petite chanson courageuse", blurb: "Une chanson douce traverse le parc et rassemble les amis.", cover: storyArt.park, minutes: 6, chapters: 5 },
    { slug: "carte-gentillesse", ageBand: "7-10", title: "La carte de la gentillesse", blurb: "Deux sœurs suivent de petits indices pour aider leur quartier.", cover: storyArt.banner, minutes: 6, chapters: 5 }
  ],
  es: [
    { slug: "jardin-luna", ageBand: "3-5", title: "El jardín de la luna", blurb: "Un jardín tranquilo cultiva flores plateadas para dormir.", cover: storyArt.stars, minutes: 4, chapters: 3 },
    { slug: "nube-pequena", ageBand: "3-5", title: "La nubecita encuentra su hogar", blurb: "Una nube pequeña descubre dónde está su cielo suave.", cover: storyArt.hero, minutes: 4, chapters: 3 },
    { slug: "ciudad-papel", ageBand: "5-7", title: "La ciudad de papel", blurb: "Vania y Sophia construyen una ciudad que recibe a todos.", cover: storyArt.paint, minutes: 5, chapters: 4 },
    { slug: "campana-jardin", ageBand: "5-7", title: "La campana del jardín", blurb: "Una campana ayuda a los amigos a turnarse y escuchar.", cover: storyArt.garden, minutes: 5, chapters: 4 },
    { slug: "cancion-valiente", ageBand: "7-10", title: "Una canción pequeña y valiente", blurb: "Una canción suave cruza el parque y reúne a los amigos.", cover: storyArt.park, minutes: 6, chapters: 5 },
    { slug: "mapa-amabilidad", ageBand: "7-10", title: "El mapa de la amabilidad", blurb: "Dos hermanas siguen pequeñas pistas para ayudar a su barrio.", cover: storyArt.banner, minutes: 6, chapters: 5 }
  ]
};

export const audioBookCatalog: AudioBook[] = (Object.entries(rows) as [Locale, AudioRow[]][]).flatMap(([locale, entries]) =>
  entries.map(({ slug, ...book }) => ({
    ...book,
    id: `audio-${slug}`,
    locale,
    recording: "recording-needed" as const,
    narratorStyle: "gentle-natural-female" as const,
    rights: "vaphia-original" as const
  }))
);

export function audioBooksForLocale(locale: Locale) {
  return audioBookCatalog.filter((book) => book.locale === locale);
}

export function audioBookById(locale: Locale, id: string) {
  return audioBookCatalog.find((book) => book.locale === locale && book.id === id);
}
