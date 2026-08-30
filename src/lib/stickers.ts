import { addVaphiaStars, readStars } from "@/lib/stars";
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
};

export const stickerCatalog: StickerDef[] = [
  { id: "star", icon: "star", tint: "#ffe37b" },
  { id: "heart", icon: "heart", tint: "#ffb2d6" },
  { id: "cupcake", icon: "cupcake", tint: "#ffd4e8" },
  { id: "flower", icon: "flower", tint: "#ffc3de" },
  { id: "balloon", icon: "balloon", tint: "#ff9ab8" },
  { id: "moon", icon: "moon", tint: "#e4ddff" },
  { id: "sun", icon: "sun", tint: "#ffe37b" },
  { id: "bunny", icon: "bunny", tint: "#fff0d6" },
  { id: "sparkle", icon: "sparkle", tint: "#dffaff" },
  { id: "paint", icon: "paint", tint: "#c2b4ff" },
  { id: "book", icon: "book", tint: "#b8edcf" },
  { id: "camera", icon: "camera", tint: "#cbbcff" },
  { id: "gift", icon: "gift", tint: "#ffcdb8" },
  { id: "cloud", icon: "cloud", tint: "#dff8ff" },
  { id: "apple", icon: "apple", tint: "#ffb2b2" },
  { id: "crown", icon: "crown", tint: "#fff2ba" },
  { id: "music", icon: "music", tint: "#d7f7ea" },
  { id: "house", icon: "house", tint: "#ffe6f2" },
  { id: "butterfly", icon: "butterfly", tint: "#c2e4ff" },
  { id: "smile", icon: "smile", tint: "#fff3bb" }
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
