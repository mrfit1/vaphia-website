import type { AgeBand } from "@/lib/age";
import type { Locale } from "@/lib/i18n";

export const createCopy = {
  en: {
    pick: "Pick a door",
    hint: "Each door has its own pictures",
    draw: "Draw",
    back: "Doors",
    print: "Print",
    save: "Save",
    doors: {
      "3-5": { label: "3–5", blurb: "Big, simple pictures" },
      "5-7": { label: "5–7", blurb: "Gardens, parks and play" },
      "7-10": { label: "7–10", blurb: "Busy scenes to color" }
    }
  },
  fa: {
    pick: "یک در را باز کن",
    hint: "هر در فقط عکس‌های همان سن را دارد",
    draw: "نقاشی",
    back: "درها",
    print: "چاپ",
    save: "ذخیره",
    doors: {
      "3-5": { label: "۳–۵", blurb: "عکس‌های بزرگ و ساده" },
      "5-7": { label: "۵–۷", blurb: "باغ، پارک و بازی" },
      "7-10": { label: "۷–۱۰", blurb: "صحنه‌های شلوغ برای رنگ‌آمیزی" }
    }
  },
  fr: {
    pick: "Choisis une porte",
    hint: "Chaque porte a ses propres images",
    draw: "Dessiner",
    back: "Portes",
    print: "Imprimer",
    save: "Enregistrer",
    doors: {
      "3-5": { label: "3–5", blurb: "Grandes images simples" },
      "5-7": { label: "5–7", blurb: "Jardins, parcs et jeux" },
      "7-10": { label: "7–10", blurb: "Scènes riches à colorier" }
    }
  },
  es: {
    pick: "Elige una puerta",
    hint: "Cada puerta tiene sus propias fotos",
    draw: "Dibujar",
    back: "Puertas",
    print: "Imprimir",
    save: "Guardar",
    doors: {
      "3-5": { label: "3–5", blurb: "Fotos grandes y simples" },
      "5-7": { label: "5–7", blurb: "Jardines, parques y juego" },
      "7-10": { label: "7–10", blurb: "Escenas para colorear" }
    }
  }
} satisfies Record<Locale, {
  pick: string;
  hint: string;
  draw: string;
  back: string;
  print: string;
  save: string;
  doors: Record<AgeBand, { label: string; blurb: string }>;
}>;
