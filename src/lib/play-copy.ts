import type { Locale } from "@/lib/i18n";

export const playCopy: Record<Locale, {
  nextLevel: string;
  playAgain: string;
  nextStory: string;
  tapSkip: string;
  listen: string;
  hush: string;
}> = {
  en: { nextLevel: "Next level", playAgain: "Play again", nextStory: "Next story", tapSkip: "Tap to turn the page", listen: "Listen", hush: "Quiet" },
  fa: { nextLevel: "مرحله بعد", playAgain: "دوباره بازی", nextStory: "قصه بعد", tapSkip: "بزن صفحه عوض شود", listen: "گوش بده", hush: "ساکت" },
  fr: { nextLevel: "Niveau suivant", playAgain: "Rejouer", nextStory: "Histoire suivante", tapSkip: "Touche pour tourner", listen: "Écouter", hush: "Silence" },
  es: { nextLevel: "Siguiente nivel", playAgain: "Jugar otra vez", nextStory: "Siguiente cuento", tapSkip: "Toca para pasar", listen: "Escuchar", hush: "Silencio" }
};
