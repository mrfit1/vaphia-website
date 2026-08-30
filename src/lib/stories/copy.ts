import type { Locale } from "@/lib/i18n";

export type StoryCopy = {
  readBooks: string;
  readBooksText: string;
  audioBooks: string;
  audioBooksText: string;
  readNow: string;
  openAudio: string;
  original: string;
  femaleNarration: string;
  recordingSoon: string;
  audioReady: string;
  pages: string;
  minutes: string;
  backToLibrary: string;
  previous: string;
  next: string;
  pageOf: string;
  pause: string;
  play: string;
  rewind: string;
  forward: string;
  speed: string;
  noAudioYet: string;
  rightsNote: string;
};

export const storyCopy: Record<Locale, StoryCopy> = {
  en: {
    readBooks: "Read picture books",
    readBooksText: "Turn big illustrated pages yourself. Each language has its own original stories.",
    audioBooks: "Listen to storybooks",
    audioBooksText: "A growing shelf of original stories prepared for calm, natural female narration.",
    readNow: "Read now",
    openAudio: "Open audio book",
    original: "Vaphia original",
    femaleNarration: "Gentle female narration",
    recordingSoon: "Recording coming soon",
    audioReady: "Ready to listen",
    pages: "pages",
    minutes: "min",
    backToLibrary: "Back to Storyhouse",
    previous: "Previous page",
    next: "Next page",
    pageOf: "Page {page} of {total}",
    pause: "Pause",
    play: "Play",
    rewind: "Back 10 seconds",
    forward: "Forward 10 seconds",
    speed: "Speed",
    noAudioYet: "This original story is prepared for a soft, natural female recording. The audio file will appear here after recording and rights review.",
    rightsNote: "Only Vaphia-original or separately rights-cleared recordings are published here."
  },
  fa: {
    readBooks: "کتاب‌های تصویری برای خواندن",
    readBooksText: "صفحه‌های بزرگ و تصویری را خودت ورق بزن. هر زبان داستان‌های اصیل خودش را دارد.",
    audioBooks: "کتاب‌های صوتی برای شنیدن",
    audioBooksText: "قفسه‌ای رو به رشد از داستان‌های اصیل، آماده برای صدای زنانه، آرام و طبیعی.",
    readNow: "الان بخوان",
    openAudio: "باز کردن کتاب صوتی",
    original: "داستان اصیل وافیا",
    femaleNarration: "صدای زنانه و آرام",
    recordingSoon: "به‌زودی با صدا",
    audioReady: "آماده شنیدن",
    pages: "صفحه",
    minutes: "دقیقه",
    backToLibrary: "بازگشت به خانه قصه",
    previous: "صفحه قبل",
    next: "صفحه بعد",
    pageOf: "صفحه {page} از {total}",
    pause: "مکث",
    play: "پخش",
    rewind: "۱۰ ثانیه عقب",
    forward: "۱۰ ثانیه جلو",
    speed: "سرعت",
    noAudioYet: "این داستان اصیل برای ضبط با صدای زنانه، آرام و طبیعی آماده شده است. فایل صدا پس از ضبط و بررسی مجوز اینجا قرار می‌گیرد.",
    rightsNote: "فقط فایل‌های اصیل وافیا یا فایل‌هایی که مجوز جداگانه‌شان بررسی شده منتشر می‌شوند."
  },
  fr: {
    readBooks: "Albums à lire",
    readBooksText: "Tourne de grandes pages illustrées. Chaque langue possède ses propres histoires originales.",
    audioBooks: "Livres audio",
    audioBooksText: "Une collection grandissante d’histoires originales préparées pour une voix féminine douce et naturelle.",
    readNow: "Lire maintenant",
    openAudio: "Ouvrir le livre audio",
    original: "Création originale Vaphia",
    femaleNarration: "Voix féminine douce",
    recordingSoon: "Enregistrement bientôt",
    audioReady: "Prêt à écouter",
    pages: "pages",
    minutes: "min",
    backToLibrary: "Retour à la Maison des histoires",
    previous: "Page précédente",
    next: "Page suivante",
    pageOf: "Page {page} sur {total}",
    pause: "Pause",
    play: "Lire",
    rewind: "Reculer de 10 secondes",
    forward: "Avancer de 10 secondes",
    speed: "Vitesse",
    noAudioYet: "Cette histoire originale est prête pour un enregistrement féminin, doux et naturel. Le fichier audio apparaîtra après l’enregistrement et la vérification des droits.",
    rightsNote: "Seuls les enregistrements originaux de Vaphia ou autorisés séparément sont publiés ici."
  },
  es: {
    readBooks: "Libros ilustrados para leer",
    readBooksText: "Pasa páginas grandes e ilustradas. Cada idioma tiene sus propias historias originales.",
    audioBooks: "Libros de cuentos en audio",
    audioBooksText: "Una colección que crece con historias originales preparadas para una voz femenina suave y natural.",
    readNow: "Leer ahora",
    openAudio: "Abrir audiolibro",
    original: "Original de Vaphia",
    femaleNarration: "Narración femenina suave",
    recordingSoon: "Grabación próximamente",
    audioReady: "Listo para escuchar",
    pages: "páginas",
    minutes: "min",
    backToLibrary: "Volver a la Casa de cuentos",
    previous: "Página anterior",
    next: "Página siguiente",
    pageOf: "Página {page} de {total}",
    pause: "Pausa",
    play: "Reproducir",
    rewind: "Retroceder 10 segundos",
    forward: "Avanzar 10 segundos",
    speed: "Velocidad",
    noAudioYet: "Esta historia original está preparada para una grabación femenina, suave y natural. El audio aparecerá después de la grabación y la revisión de derechos.",
    rightsNote: "Aquí solo se publican grabaciones originales de Vaphia o autorizadas por separado."
  }
};
