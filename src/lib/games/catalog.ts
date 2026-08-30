import type { AgeBand } from "@/lib/age";
import type { Locale } from "@/lib/i18n";

export type Mechanic =
  | "memory"
  | "tap"
  | "puzzle"
  | "sequence"
  | "sort"
  | "count"
  | "find"
  | "match"
  | "path"
  | "odd"
  | "pattern"
  | "rhythm";

export type GameDef = {
  id: string;
  mechanic: Mechanic;
  ages: AgeBand[];
  sister: "sophia" | "vania" | "both";
  mark: string;
  tint: string;
  stars: number;
  levels: number;
  items: string[];
  polished: boolean;
  titles: Record<Locale, string>;
};

export const gameCatalog: GameDef[] = [
  { id: "star-pairs", mechanic: "memory", ages: ["3-5", "5-7", "7-10"], sister: "both", mark: "⭐", tint: "#fff2ba", stars: 8, levels: 3, items: ["⭐", "💖", "🧁", "🌸", "🎨", "🐰", "🌙", "☀️"], polished: true, titles: { en: "Star Pairs", fa: "جفت ستاره", fr: "Paires d’étoiles", es: "Pares de estrellas" } },
  { id: "heart-pairs", mechanic: "memory", ages: ["3-5", "5-7", "7-10"], sister: "sophia", mark: "💖", tint: "#ffe2f2", stars: 8, levels: 3, items: ["💖", "🌸", "🎀", "🧁", "🐰", "🌈"], polished: true, titles: { en: "Sophia Heart Pairs", fa: "جفت قلب سوفیا", fr: "Cœurs de Sophia", es: "Corazones de Sophia" } },
  { id: "cupcake-pairs", mechanic: "memory", ages: ["5-7", "7-10"], sister: "vania", mark: "🧁", tint: "#ffe8dc", stars: 10, levels: 3, items: ["🧁", "🍓", "🍪", "🍩", "🍰", "🍒", "🍌", "🍇"], polished: true, titles: { en: "Vania Cupcake Pairs", fa: "جفت کاپ‌کیک وانیا", fr: "Cupcakes de Vania", es: "Cupcakes de Vania" } },
  { id: "catch-stars", mechanic: "tap", ages: ["3-5", "5-7", "7-10"], sister: "both", mark: "⭐", tint: "#fff3bb", stars: 6, levels: 3, items: ["⭐"], polished: true, titles: { en: "Catch the Stars", fa: "ستاره بگیر", fr: "Attrape les étoiles", es: "Atrapa las estrellas" } },
  { id: "catch-hearts", mechanic: "tap", ages: ["3-5", "5-7"], sister: "sophia", mark: "💖", tint: "#ffe1f1", stars: 6, levels: 3, items: ["💖"], polished: true, titles: { en: "Catch the Hearts", fa: "قلب بگیر", fr: "Attrape les cœurs", es: "Atrapa los corazones" } },
  { id: "bubble-pop", mechanic: "tap", ages: ["3-5", "5-7", "7-10"], sister: "vania", mark: "🫧", tint: "#dffaff", stars: 6, levels: 3, items: ["🫧"], polished: true, titles: { en: "Bubble Pop", fa: "ترکاندن حباب", fr: "Bulles pop", es: "Burbujas pop" } },
  { id: "balloon-pop", mechanic: "tap", ages: ["3-5", "5-7"], sister: "both", mark: "🎈", tint: "#ffd9ec", stars: 6, levels: 3, items: ["🎈"], polished: true, titles: { en: "Balloon Pop", fa: "ترکاندن بادکنک", fr: "Ballons pop", es: "Globos pop" } },
  { id: "hero-puzzle", mechanic: "puzzle", ages: ["5-7", "7-10"], sister: "both", mark: "🧩", tint: "#e7e0ff", stars: 12, levels: 3, items: [], polished: true, titles: { en: "Sister Picture Puzzle", fa: "پازل عکس خواهرها", fr: "Puzzle des sœurs", es: "Puzzle de las hermanas" } },
  { id: "garden-puzzle", mechanic: "puzzle", ages: ["5-7", "7-10"], sister: "sophia", mark: "🌸", tint: "#e0f9ef", stars: 12, levels: 3, items: [], polished: false, titles: { en: "Garden Puzzle", fa: "پازل باغ", fr: "Puzzle jardin", es: "Puzzle del jardín" } },
  { id: "park-puzzle", mechanic: "puzzle", ages: ["7-10"], sister: "vania", mark: "🎡", tint: "#fff2bd", stars: 14, levels: 3, items: [], polished: false, titles: { en: "Park Puzzle", fa: "پازل پارک", fr: "Puzzle parc", es: "Puzzle del parque" } },
  { id: "clap-along", mechanic: "sequence", ages: ["3-5", "5-7", "7-10"], sister: "both", mark: "👏", tint: "#ffe5d9", stars: 10, levels: 5, items: ["⭐", "💖", "🧁", "🌸"], polished: true, titles: { en: "Clap Along", fa: "بزن دست", fr: "Tape dans les mains", es: "Aplaude con nosotras" } },
  { id: "color-echo", mechanic: "sequence", ages: ["5-7", "7-10"], sister: "sophia", mark: "🎨", tint: "#e4ddff", stars: 10, levels: 5, items: ["🩷", "🩵", "💛", "💚"], polished: true, titles: { en: "Color Echo", fa: "پژواک رنگ", fr: "Écho de couleurs", es: "Eco de colores" } },
  { id: "drum-beat", mechanic: "rhythm", ages: ["3-5", "5-7", "7-10"], sister: "vania", mark: "🥁", tint: "#ffe8dc", stars: 8, levels: 4, items: ["🥁"], polished: true, titles: { en: "Vania Drum Beat", fa: "ضرب وانیا", fr: "Tambour de Vania", es: "Tambor de Vania" } },
  { id: "color-bins", mechanic: "sort", ages: ["3-5", "5-7", "7-10"], sister: "both", mark: "🧺", tint: "#ddf9f0", stars: 8, levels: 3, items: ["🩷", "🩵", "💛"], polished: true, titles: { en: "Color Bins", fa: "سبد رنگ", fr: "Paniers de couleurs", es: "Cestas de color" } },
  { id: "size-sort", mechanic: "sort", ages: ["3-5", "5-7"], sister: "sophia", mark: "🧁", tint: "#fff2ba", stars: 8, levels: 3, items: ["•", "●", "⬤"], polished: false, titles: { en: "Size Sort", fa: "جور کردن اندازه", fr: "Trier les tailles", es: "Ordenar tamaños" } },
  { id: "fruit-basket", mechanic: "sort", ages: ["5-7", "7-10"], sister: "vania", mark: "🍓", tint: "#ffe2f0", stars: 8, levels: 3, items: ["🍓", "🍌", "🍇", "🍎"], polished: false, titles: { en: "Fruit Basket", fa: "سبد میوه", fr: "Panier de fruits", es: "Cesta de frutas" } },
  { id: "count-stars", mechanic: "count", ages: ["3-5", "5-7", "7-10"], sister: "both", mark: "🔢", tint: "#dffaff", stars: 8, levels: 5, items: ["⭐"], polished: true, titles: { en: "Count the Stars", fa: "ستاره‌ها را بشمار", fr: "Compte les étoiles", es: "Cuenta las estrellas" } },
  { id: "number-train", mechanic: "count", ages: ["5-7", "7-10"], sister: "vania", mark: "🚂", tint: "#e2dcff", stars: 8, levels: 5, items: ["🚂"], polished: false, titles: { en: "Number Train", fa: "قطار عدد", fr: "Train des nombres", es: "Tren de números" } },
  { id: "find-sophia", mechanic: "find", ages: ["3-5", "5-7", "7-10"], sister: "sophia", mark: "🌸", tint: "#ffe6f2", stars: 8, levels: 4, items: ["🌸"], polished: true, titles: { en: "Find Sophia", fa: "سوفیا را پیدا کن", fr: "Trouve Sophia", es: "Encuentra a Sophia" } },
  { id: "find-vania", mechanic: "find", ages: ["3-5", "5-7", "7-10"], sister: "vania", mark: "⭐", tint: "#fff3bb", stars: 8, levels: 4, items: ["⭐"], polished: true, titles: { en: "Find Vania", fa: "وانیا را پیدا کن", fr: "Trouve Vania", es: "Encuentra a Vania" } },
  { id: "sticker-hunt", mechanic: "find", ages: ["5-7", "7-10"], sister: "both", mark: "✨", tint: "#e7e0ff", stars: 10, levels: 4, items: ["✨"], polished: false, titles: { en: "Sticker Hunt", fa: "شکار استیکر", fr: "Chasse aux stickers", es: "Caza de stickers" } },
  { id: "shape-twins", mechanic: "match", ages: ["3-5", "5-7", "7-10"], sister: "both", mark: "🔷", tint: "#e4ddff", stars: 8, levels: 4, items: ["▲", "●", "■", "★"], polished: true, titles: { en: "Shape Twins", fa: "شکل‌های دوقلو", fr: "Formes jumelles", es: "Formas gemelas" } },
  { id: "shadow-match", mechanic: "match", ages: ["5-7", "7-10"], sister: "sophia", mark: "🌑", tint: "#eee6ff", stars: 8, levels: 4, items: ["🐰", "🌸", "🧁", "⭐"], polished: false, titles: { en: "Shadow Match", fa: "جور سایه", fr: "Ombre jumelle", es: "Sombra gemela" } },
  { id: "color-twins", mechanic: "match", ages: ["3-5", "5-7"], sister: "vania", mark: "🩷", tint: "#ffe1f1", stars: 8, levels: 4, items: ["🩷", "🩵", "💛", "💚"], polished: false, titles: { en: "Color Twins", fa: "رنگ‌های دوقلو", fr: "Couleurs jumelles", es: "Colores gemelos" } },
  { id: "rainbow-path", mechanic: "path", ages: ["3-5", "5-7", "7-10"], sister: "both", mark: "🛤️", tint: "#ddf9ee", stars: 8, levels: 4, items: ["⭐"], polished: true, titles: { en: "Star Path", fa: "مسیر ستاره", fr: "Chemin d’étoiles", es: "Camino de estrellas" } },
  { id: "garden-path", mechanic: "path", ages: ["5-7", "7-10"], sister: "sophia", mark: "🌷", tint: "#e0f9ef", stars: 8, levels: 4, items: ["🌸"], polished: false, titles: { en: "Garden Path", fa: "مسیر باغ", fr: "Chemin du jardin", es: "Camino del jardín" } },
  { id: "odd-star", mechanic: "odd", ages: ["3-5", "5-7", "7-10"], sister: "both", mark: "🌟", tint: "#fff2bd", stars: 6, levels: 5, items: ["⭐", "💖"], polished: true, titles: { en: "Odd One Out", fa: "یکی فرق دارد", fr: "Le différent", es: "El distinto" } },
  { id: "odd-flower", mechanic: "odd", ages: ["3-5", "5-7"], sister: "sophia", mark: "🌼", tint: "#ffe6f2", stars: 6, levels: 5, items: ["🌸", "🧁"], polished: false, titles: { en: "Odd Flower", fa: "گل متفاوت", fr: "Fleur différente", es: "Flor distinta" } },
  { id: "pattern-beads", mechanic: "pattern", ages: ["5-7", "7-10"], sister: "both", mark: "📿", tint: "#e7e0ff", stars: 10, levels: 5, items: ["🩷", "🩵", "💛"], polished: true, titles: { en: "Bead Pattern", fa: "الگوی مهره", fr: "Motif de perles", es: "Patrón de cuentas" } },
  { id: "pattern-blocks", mechanic: "pattern", ages: ["7-10"], sister: "vania", mark: "🧱", tint: "#dff8ff", stars: 10, levels: 5, items: ["▲", "●", "■"], polished: false, titles: { en: "Block Pattern", fa: "الگوی بلوک", fr: "Motif de blocs", es: "Patrón de bloques" } }
];

export function gameById(id: string) {
  return gameCatalog.find((game) => game.id === id);
}

export function gamesForAge(band: AgeBand | null) {
  if (!band) return gameCatalog;
  return gameCatalog.filter((game) => game.ages.includes(band));
}

export const allGameIds = gameCatalog.map((game) => game.id);
