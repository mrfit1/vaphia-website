import { addVaphiaStars, readStars } from "@/lib/stars";
import type { Locale } from "@/lib/i18n";
import type { MarkId } from "@/lib/mark-ids";

export type StickerId =
  | "star"
  | "heart"
  | "cupcake"
  | "flower"
  | "balloon"
  | "moon"
  | "sun"
  | "bunny"
  | "sparkle"
  | "paint"
  | "book"
  | "camera"
  | "gift"
  | "cloud"
  | "apple"
  | "crown"
  | "music"
  | "house"
  | "butterfly"
  | "smile";

export type StickerDef = {
  id: StickerId;
  icon: MarkId;
  tint: string;
  titles: Record<Locale, string>;
};

export const stickerCatalog: StickerDef[] = [
  { id: "star", icon: "star", tint: "#ffe37b", titles: { en: "Twinkle Star", fa: "ستاره چشمک‌زن", fr: "Étoile brillante", es: "Estrella brillante" } },
  { id: "heart", icon: "heart", tint: "#ffb2d6", titles: { en: "Happy Heart", fa: "قلب خوشحال", fr: "Cœur joyeux", es: "Corazón feliz" } },
  { id: "cupcake", icon: "cupcake", tint: "#ffd4e8", titles: { en: "Sweet Cupcake", fa: "کاپ‌کیک شیرین", fr: "Petit gâteau", es: "Pastelito dulce" } },
  { id: "bunny", icon: "bunny", tint: "#fff0d6", titles: { en: "Bunny Pal", fa: "دوست خرگوشی", fr: "Ami lapin", es: "Amigo conejito" } },
  { id: "balloon", icon: "balloon", tint: "#ff9ab8", titles: { en: "Balloon Buddy", fa: "بادکنک دوست‌داشتنی", fr: "Ballon câlin", es: "Globo amigo" } },
  { id: "flower", icon: "flower", tint: "#ffc3de", titles: { en: "Magic Flower", fa: "گل جادویی", fr: "Fleur magique", es: "Flor mágica" } },
  { id: "smile", icon: "smile", tint: "#fff3bb", titles: { en: "Big Smile", fa: "لبخند بزرگ", fr: "Grand sourire", es: "Gran sonrisa" } },
  { id: "sun", icon: "sun", tint: "#ffe37b", titles: { en: "Sunny Day", fa: "روز آفتابی", fr: "Journée soleil", es: "Día soleado" } },
  { id: "moon", icon: "moon", tint: "#e4ddff", titles: { en: "Dreamy Moon", fa: "ماه رویایی", fr: "Lune rêveuse", es: "Luna soñadora" } },
  { id: "sparkle", icon: "sparkle", tint: "#dffaff", titles: { en: "Little Sparkle", fa: "درخشش کوچولو", fr: "Petite étincelle", es: "Brillito" } },
  { id: "butterfly", icon: "butterfly", tint: "#c2e4ff", titles: { en: "Color Butterfly", fa: "پروانه رنگی", fr: "Papillon coloré", es: "Mariposa de colores" } },
  { id: "paint", icon: "paint", tint: "#c2b4ff", titles: { en: "Paint Pal", fa: "دوست نقاش", fr: "Ami artiste", es: "Amigo pintor" } },
  { id: "camera", icon: "camera", tint: "#cbbcff", titles: { en: "Smile Camera", fa: "دوربین لبخند", fr: "Appareil sourire", es: "Cámara sonrisa" } },
  { id: "book", icon: "book", tint: "#b8edcf", titles: { en: "Story Book", fa: "کتاب قصه", fr: "Livre à histoires", es: "Libro de cuentos" } },
  { id: "gift", icon: "gift", tint: "#ffcdb8", titles: { en: "Surprise Gift", fa: "هدیه غافلگیرکننده", fr: "Cadeau surprise", es: "Regalo sorpresa" } },
  { id: "cloud", icon: "cloud", tint: "#dff8ff", titles: { en: "Cloud Float", fa: "ابر شناور", fr: "Nuage léger", es: "Nube flotante" } },
  { id: "apple", icon: "apple", tint: "#ffb2b2", titles: { en: "Apple Pal", fa: "سیب دوست‌داشتنی", fr: "Pomme amie", es: "Manzana amiga" } },
  { id: "crown", icon: "crown", tint: "#fff2ba", titles: { en: "Kindness Crown", fa: "تاج مهربانی", fr: "Couronne gentille", es: "Corona amable" } },
  { id: "music", icon: "music", tint: "#d7f7ea", titles: { en: "Music Note", fa: "نت موسیقی", fr: "Note de musique", es: "Nota musical" } },
  { id: "house", icon: "house", tint: "#ffe6f2", titles: { en: "Cozy House", fa: "خانه دنج", fr: "Maison douillette", es: "Casita acogedora" } }
];

const BOOK_KEY = "vaphia-sticker-book";

export function readStickerBook(): StickerId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(BOOK_KEY);
    return raw ? (JSON.parse(raw) as StickerId[]) : [];
  } catch {
    return [];
  }
}

export function awardSticker(id: StickerId) {
  if (typeof window === "undefined") return;
  const current = readStickerBook();
  if (!current.includes(id)) {
    current.push(id);
    window.localStorage.setItem(BOOK_KEY, JSON.stringify(current));
  }
  window.dispatchEvent(new Event("vaphia-stickers"));
}

export function resetStickerBook() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BOOK_KEY, "[]");
  window.dispatchEvent(new Event("vaphia-stickers"));
}

export function stickerForReward(seed: string): StickerId {
  const index = Math.abs(hash(seed) + readStars()) % stickerCatalog.length;
  return stickerCatalog[index].id;
}

export function celebrateReward(opts: { stars: number; seed: string }) {
  addVaphiaStars(opts.stars);
  const sticker = stickerForReward(opts.seed);
  awardSticker(sticker);
  return sticker;
}

function hash(value: string) {
  let total = 0;
  for (let i = 0; i < value.length; i += 1) total += value.charCodeAt(i) * (i + 1);
  return total;
}
