import { addVaphiaStars, readStars } from "@/lib/stars";

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
  mark: string;
  tint: string;
};

export const stickerCatalog: StickerDef[] = [
  { id: "star", mark: "⭐", tint: "#ffe37b" },
  { id: "heart", mark: "💖", tint: "#ffb2d6" },
  { id: "cupcake", mark: "🧁", tint: "#ffd4e8" },
  { id: "flower", mark: "🌸", tint: "#ffc3de" },
  { id: "balloon", mark: "🎈", tint: "#ff9ab8" },
  { id: "moon", mark: "🌙", tint: "#e4ddff" },
  { id: "sun", mark: "☀️", tint: "#ffe37b" },
  { id: "bunny", mark: "🐰", tint: "#fff0d6" },
  { id: "sparkle", mark: "✨", tint: "#dffaff" },
  { id: "paint", mark: "🎨", tint: "#c2b4ff" },
  { id: "book", mark: "📖", tint: "#b8edcf" },
  { id: "camera", mark: "📷", tint: "#cbbcff" },
  { id: "gift", mark: "🎁", tint: "#ffcdb8" },
  { id: "cloud", mark: "☁️", tint: "#dff8ff" },
  { id: "apple", mark: "🍎", tint: "#ffb2b2" },
  { id: "crown", mark: "👑", tint: "#fff2ba" },
  { id: "music", mark: "🎵", tint: "#d7f7ea" },
  { id: "house", mark: "🏠", tint: "#ffe6f2" },
  { id: "butterfly", mark: "🦋", tint: "#c2e4ff" },
  { id: "smile", mark: "😊", tint: "#fff3bb" }
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
