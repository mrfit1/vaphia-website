import type { Locale } from "@/lib/i18n";

export const drawingCopy: Record<Locale, {
  tools: Record<string, string>;
  colors: string;
  customColor: string;
  brushSize: string;
  canvasLabel: string;
  undo: string;
  redo: string;
  save: string;
  print: string;
  clear: string;
  hint: string;
  chooseSticker: string;
}> = {
  en: {
    tools: { brush: "Brush", marker: "Marker", glitter: "Glitter", sparkle: "Sparkle", neon: "Neon", rainbow: "Rainbow", eraser: "Eraser", sticker: "Sticker" },
    colors: "Colors",
    customColor: "Choose a color",
    brushSize: "Brush size",
    canvasLabel: "Drawing canvas",
    undo: "Undo",
    redo: "Redo",
    save: "Save drawing",
    print: "Print drawing",
    clear: "Clear canvas",
    hint: "Pick a color, choose a tool, then draw with a finger or stylus.",
    chooseSticker: "Choose a sticker"
  },
  fa: {
    tools: { brush: "قلم‌مو", marker: "ماژیک", glitter: "اکلیلی", sparkle: "درخشان", neon: "نئون", rainbow: "رنگین", eraser: "پاک‌کن", sticker: "استیکر" },
    colors: "رنگ‌ها",
    customColor: "انتخاب رنگ دلخواه",
    brushSize: "اندازه قلم",
    canvasLabel: "صفحه نقاشی",
    undo: "برگشت",
    redo: "جلو رفتن",
    save: "ذخیره نقاشی",
    print: "چاپ نقاشی",
    clear: "پاک کردن صفحه",
    hint: "یک رنگ و ابزار انتخاب کن، بعد با انگشت یا قلم بکش.",
    chooseSticker: "انتخاب استیکر"
  },
  fr: {
    tools: { brush: "Pinceau", marker: "Feutre", glitter: "Paillettes", sparkle: "Étincelle", neon: "Néon", rainbow: "Arc-en-ciel", eraser: "Gomme", sticker: "Sticker" },
    colors: "Couleurs",
    customColor: "Choisir une couleur",
    brushSize: "Taille du pinceau",
    canvasLabel: "Toile de dessin",
    undo: "Annuler",
    redo: "Rétablir",
    save: "Enregistrer le dessin",
    print: "Imprimer le dessin",
    clear: "Effacer la toile",
    hint: "Choisis une couleur et un outil, puis dessine avec ton doigt ou un stylet.",
    chooseSticker: "Choisir un sticker"
  },
  es: {
    tools: { brush: "Pincel", marker: "Rotulador", glitter: "Brillo", sparkle: "Destello", neon: "Neón", rainbow: "Arcoíris", eraser: "Borrador", sticker: "Pegatina" },
    colors: "Colores",
    customColor: "Elegir un color",
    brushSize: "Tamaño del pincel",
    canvasLabel: "Lienzo de dibujo",
    undo: "Deshacer",
    redo: "Rehacer",
    save: "Guardar dibujo",
    print: "Imprimir dibujo",
    clear: "Borrar lienzo",
    hint: "Elige un color y una herramienta, y dibuja con el dedo o un lápiz.",
    chooseSticker: "Elegir una pegatina"
  }
};
