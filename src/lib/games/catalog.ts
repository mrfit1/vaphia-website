import type { AgeBand } from "@/lib/age";
import type { Locale } from "@/lib/i18n";
import type { MarkId } from "@/lib/mark-ids";
import type { TokenId } from "@/lib/art";

export type Mechanic =
  | "memory"
  | "balloons"
  | "catch"
  | "puzzle"
  | "simon"
  | "sort"
  | "count"
  | "hidden"
  | "odd"
  | "fit";

export type GameDef = {
  id: string;
  mechanic: Mechanic;
  ages: AgeBand[];
  sister: "sophia" | "vania" | "both";
  icon: MarkId;
  tint: string;
  stars: number;
  levels: number;
  items: TokenId[];
  polished: true;
  titles: Record<Locale, string>;
};

const ALL: AgeBand[] = ["3-5", "5-7", "7-10"];
const TOKENS: TokenId[] = ["star", "heart", "cupcake", "flower", "balloon", "moon", "sun", "bunny"];

export const gameCatalog: GameDef[] = [
  { id: "memory", mechanic: "memory", ages: ALL, sister: "both", icon: "star", tint: "#fff2ba", stars: 8, levels: 3, items: TOKENS, polished: true, titles: { en: "Memory", fa: "حافظه", fr: "Mémoire", es: "Memoria" } },
  { id: "balloon-pop", mechanic: "balloons", ages: ALL, sister: "both", icon: "balloon", tint: "#ffd9ec", stars: 8, levels: 3, items: ["balloon"], polished: true, titles: { en: "Balloon Pop", fa: "ترکاندن بادکنک", fr: "Ballons pop", es: "Globos pop" } },
  { id: "catch", mechanic: "catch", ages: ALL, sister: "both", icon: "star", tint: "#fff3bb", stars: 8, levels: 3, items: ["star"], polished: true, titles: { en: "Catch", fa: "بگیر", fr: "Attrape", es: "Atrapa" } },
  { id: "puzzle", mechanic: "puzzle", ages: ALL, sister: "both", icon: "puzzle", tint: "#e7e0ff", stars: 12, levels: 3, items: [], polished: true, titles: { en: "Puzzle", fa: "پازل", fr: "Puzzle", es: "Puzzle" } },
  { id: "simon", mechanic: "simon", ages: ALL, sister: "both", icon: "paint", tint: "#e4ddff", stars: 10, levels: 3, items: ["star", "heart", "flower", "sun"], polished: true, titles: { en: "Simon", fa: "سیمون", fr: "Simon", es: "Simón" } },
  { id: "color-bins", mechanic: "sort", ages: ALL, sister: "both", icon: "bin", tint: "#ddf9f0", stars: 8, levels: 3, items: ["star", "heart", "cupcake", "flower", "balloon", "sun"], polished: true, titles: { en: "Color Bins", fa: "سبد رنگ", fr: "Paniers de couleurs", es: "Cestas de color" } },
  { id: "count", mechanic: "count", ages: ALL, sister: "both", icon: "count", tint: "#dffaff", stars: 8, levels: 3, items: ["star"], polished: true, titles: { en: "Count", fa: "بشمار", fr: "Compte", es: "Cuenta" } },
  { id: "hidden", mechanic: "hidden", ages: ALL, sister: "both", icon: "find", tint: "#ffe6f2", stars: 10, levels: 3, items: ["cupcake", "heart", "star", "balloon", "bunny", "sun", "flower", "moon"], polished: true, titles: { en: "Hidden Object", fa: "شیء پنهان", fr: "Objet caché", es: "Objeto oculto" } },
  { id: "odd", mechanic: "odd", ages: ALL, sister: "both", icon: "odd", tint: "#fff2bd", stars: 8, levels: 3, items: TOKENS, polished: true, titles: { en: "Odd One Out", fa: "یکی فرق دارد", fr: "Le différent", es: "El distinto" } },
  { id: "shape-fit", mechanic: "fit", ages: ALL, sister: "both", icon: "shape", tint: "#e4ddff", stars: 8, levels: 3, items: ["star", "heart", "cupcake", "flower", "balloon", "moon"], polished: true, titles: { en: "Shape Fit", fa: "جای شکل", fr: "Formes", es: "Formas" } }
];

export const retiredGameIds = [
  "star-pairs", "heart-pairs", "cupcake-pairs", "catch-stars", "catch-hearts", "bubble-pop",
  "hero-puzzle", "garden-puzzle", "park-puzzle", "clap-along", "color-echo", "drum-beat",
  "size-sort", "fruit-basket", "count-stars", "number-train", "find-sophia", "find-vania",
  "sticker-hunt", "shape-twins", "shadow-match", "color-twins", "rainbow-path", "garden-path",
  "odd-star", "odd-flower", "pattern-beads", "pattern-blocks"
];

export function gameById(id: string) {
  return gameCatalog.find((game) => game.id === id);
}

export function gamesForAge(band: AgeBand | null) {
  if (!band) return gameCatalog;
  return gameCatalog.filter((game) => game.ages.includes(band));
}

export function isRetiredGame(id: string) {
  return retiredGameIds.includes(id);
}

export const allGameIds = gameCatalog.map((game) => game.id);
