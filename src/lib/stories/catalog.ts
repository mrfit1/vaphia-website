import type { Locale } from "@/lib/i18n";
import { storyArt } from "@/lib/stories/scenes";

export type StoryShelf = "sisters" | "folk";
export type StoryMotion = "float" | "pan" | "sparkle" | "kenburns";

export type StoryPage = {
  image: string;
  text: string;
  motion?: StoryMotion;
};

export type StoryBook = {
  id: string;
  locale: Locale;
  shelf: StoryShelf;
  title: string;
  blurb: string;
  minutes: number;
  cover: string;
  /** Human recording only. Never browser TTS. */
  audio?: string;
  pages: StoryPage[];
};

const A = storyArt;

function page(image: string, text: string, motion?: StoryMotion): StoryPage {
  return motion ? { image, text, motion } : { image, text };
}

const fa: StoryBook[] = [
  {
    id: "vania-sophia-lost-star",
    locale: "fa",
    shelf: "sisters",
    title: "وانیا و سوفیا و ستاره گم‌شده",
    blurb: "خواهرها ستاره‌ای را در باغ پیدا می‌کنند و راه خانه را نشانش می‌دهند.",
    minutes: 3,
    cover: A.hero,
    pages: [
      page(A.hero, "شب در باغ، وانیا و سوفیا یک نور ریز دیدند.", "kenburns"),
      page(A.garden, "ستاره‌ای کوچک لای گل‌ها نشسته بود و می‌لرزید.", "float"),
      page(A.garden, "سوفیا آرام گفت: نترس. ما کنارت هستیم.", "pan"),
      page(A.stars, "وانیا ستاره را با یک برگ شست. غبار شب رفت.", "sparkle"),
      page(A.stars, "آن‌ها ستاره را تا تپه بردند. آسمان نزدیک بود.", "pan"),
      page(A.banner, "ستاره گرم شد و نرم نرم به آسمان پرید.", "kenburns"),
      page(A.stars, "از آن شب همان ستاره اول به خواهرها چشمک می‌زند.", "sparkle"),
      page(A.hero, "پنجره را کمی باز گذاشتند؛ اگر ستاره دیگری گم شود.", "kenburns")
    ]
  },
  {
    id: "bozboz-ghandi",
    locale: "fa",
    shelf: "folk",
    title: "بزبز قندی",
    blurb: "مادر بز، سه بزغاله، و گرگی که با آواز و زنگوله گول می‌خورد.",
    minutes: 3,
    cover: A.garden,
    pages: [
      page(A.garden, "مادر بز گفت: در خانه بمانید. من شیر تازه می‌آورم.", "float"),
      page(A.bedroom, "سه بزغاله زنگوله کوچک را تکان دادند و آواز خواندند.", "sparkle"),
      page(A.park, "گرگ گرسنه آمد و گفت: من مامانم! در را باز کنید.", "pan"),
      page(A.bedroom, "بزغاله‌ها گفتند: مامان ما آواز شیرین دارد. تو بخوان.", "float"),
      page(A.park, "گرگ خواند، اما صدایش خشن بود. زنگوله هم ساکت ماند.", "pan"),
      page(A.garden, "بزغاله‌ها زنگوله را تکان دادند. گرگ جا خورد و دوید.", "float"),
      page(A.kitchen, "مادر برگشت. بوی شیر و علف تازه خانه را پر کرد.", "float"),
      page(A.kitchen, "همه با هم آواز خواندند. خانه گرم و امن بود.", "sparkle")
    ]
  },
  {
    id: "mah-pishani",
    locale: "fa",
    shelf: "folk",
    title: "ماه‌پیشانی",
    blurb: "دختری مهربان کمک می‌کند و ماه روی پیشانی‌اش می‌نشیند.",
    minutes: 3,
    cover: A.stars,
    pages: [
      page(A.kitchen, "دختر مهربان نان گرم برای همسایه پیر برد.", "float"),
      page(A.stars, "شب، ماه روی پیشانی‌اش نشست؛ نوری نرم مثل لبخند.", "sparkle"),
      page(A.paint, "دخترعمو حسود شد و خواست ماه را برای خودش بردارد.", "pan"),
      page(A.stars, "ماه پیش دختر مهربان ماند. مهربانی نور می‌دهد.", "sparkle"),
      page(A.paint, "دخترعمو یک فانوس ساخت و یاد گرفت کمک کند.", "float"),
      page(A.garden, "با هم چراغ‌های کوچک در حیاط چیدند.", "pan"),
      page(A.stars, "جشن نور شروع شد. همه دست زدند و خندیدند.", "sparkle"),
      page(A.garden, "ماه پیشانی درخشید و کوچه روشن شد.", "float")
    ]
  }
];

const en: StoryBook[] = [
  {
    id: "sophia-pink-balloon",
    locale: "en",
    shelf: "sisters",
    title: "Sophia's Pink Balloon Day",
    blurb: "A shy balloon hides under the sofa, and the sisters fly it in the park.",
    minutes: 3,
    cover: A.hero,
    pages: [
      page(A.hero, "Sophia peeked under the sofa. A shy pink balloon hid there.", "kenburns"),
      page(A.bedroom, "“Hello,” she whispered. “Want to come out?”", "float"),
      page(A.bedroom, "Vania tied a soft ribbon. The balloon wiggled once.", "sparkle"),
      page(A.park, "They walked it to the park. The balloon peeked at the trees.", "pan"),
      page(A.park, "A breeze came. The balloon lifted, then danced.", "float"),
      page(A.banner, "Sophia and Vania held the ribbon and ran, laughing.", "kenburns"),
      page(A.park, "They flew it in big slow circles over the grass.", "pan"),
      page(A.hero, "At home the balloon rested on a chair, brave now.", "kenburns")
    ]
  },
  {
    id: "three-bears-porridge",
    locale: "en",
    shelf: "folk",
    title: "The Three Bears' Porridge",
    blurb: "A blonde child tastes three bowls, says sorry, and shares berries.",
    minutes: 3,
    cover: A.kitchen,
    pages: [
      page(A.kitchen, "Three bowls sat on the table: big, middle, and tiny.", "float"),
      page(A.park, "A blonde child knocked. Nobody home. She stepped in softly.", "pan"),
      page(A.kitchen, "The big bowl was too hot. The middle bowl was too cold.", "float"),
      page(A.kitchen, "The tiny bowl was just right. She took one careful sip.", "sparkle"),
      page(A.garden, "The bears came home with a basket of berries.", "pan"),
      page(A.garden, "The child said, “I’m sorry I tasted your porridge.”", "float"),
      page(A.kitchen, "The bears smiled. “Next time, wait and we will share.”", "float"),
      page(A.kitchen, "They sat together and ate berries with the rest of the porridge.", "sparkle")
    ]
  },
  {
    id: "little-red-hen",
    locale: "en",
    shelf: "folk",
    title: "The Little Red Hen Bakes",
    blurb: "A hen asks for help. Friends learn to help, and they share bread.",
    minutes: 3,
    cover: A.garden,
    pages: [
      page(A.garden, "A little red hen found golden wheat in the garden.", "float"),
      page(A.garden, "“Who will help me plant?” The duck napped. The cat stretched.", "pan"),
      page(A.kitchen, "“Who will help me mill the flour?” Friends looked away.", "float"),
      page(A.kitchen, "“Who will help me bake?” Only the hen mixed and waited.", "pan"),
      page(A.kitchen, "Warm bread filled the room. The friends came close.", "float"),
      page(A.paint, "The hen said, “Helping makes the bread taste kinder.”", "sparkle"),
      page(A.kitchen, "Duck fetched water. Cat washed bowls. They all tried.", "float"),
      page(A.kitchen, "They shared the bread, warm and proud, together.", "sparkle")
    ]
  }
];

const fr: StoryBook[] = [
  {
    id: "lanterne-soeurs",
    locale: "fr",
    shelf: "sisters",
    title: "La lanterne des soeurs",
    blurb: "Deux soeurs allument des lanternes en papier sur le balcon.",
    minutes: 3,
    cover: A.hero,
    pages: [
      page(A.hero, "Le soir, Vania et Sophia ont sorti du papier fin sur le balcon.", "kenburns"),
      page(A.paint, "Elles ont peint des lunes et des points d’or.", "sparkle"),
      page(A.bedroom, "Elles ont plié deux lanternes, tout doucement.", "float"),
      page(A.stars, "Une petite lumière sûre a allumé la première lanterne.", "sparkle"),
      page(A.stars, "La deuxième lanterne s’est levée comme un sourire.", "pan"),
      page(A.banner, "Les deux soeurs ont regardé la nuit devenir douce.", "kenburns"),
      page(A.stars, "Les lanternes ont dansé au-dessus du balcon.", "sparkle"),
      page(A.hero, "Elles ont chuchoté : demain, on en fera une pour le jardin.", "kenburns")
    ]
  },
  {
    id: "trois-petits-cochons",
    locale: "fr",
    shelf: "folk",
    title: "Les trois petits cochons",
    blurb: "Paille, bois, briques : le loup souffle, puis s’en va le ventre vide.",
    minutes: 3,
    cover: A.park,
    pages: [
      page(A.garden, "Trois petits cochons ont voulu une maison bien à eux.", "float"),
      page(A.garden, "Le premier a fait une maison de paille, légère et jaune.", "pan"),
      page(A.park, "Le deuxième a fait une maison de bois, tiède et simple.", "float"),
      page(A.bedroom, "Le troisième a fait une maison de briques, solide et ronde.", "float"),
      page(A.park, "Le loup est arrivé et a soufflé : ouf ! La paille a dansé.", "pan"),
      page(A.park, "Il a soufflé encore. Le bois a tremblé. Les cochons ont couru.", "float"),
      page(A.kitchen, "Dans les briques, le loup a soufflé… et rien. Il est resté affamé, un peu comique.", "float"),
      page(A.kitchen, "« Reviens demain pour la soupe, » ont dit les cochons. Le loup est parti, queue basse.", "sparkle")
    ]
  },
  {
    id: "navet-geant",
    locale: "fr",
    shelf: "folk",
    title: "Le navet géant",
    blurb: "La famille et les animaux tirent ensemble un navet trop grand.",
    minutes: 3,
    cover: A.garden,
    pages: [
      page(A.garden, "Grand-père a planté un navet. Il a trop grandi !", "float"),
      page(A.garden, "Il a tiré. Le navet n’a pas bougé.", "pan"),
      page(A.garden, "Grand-mère a tiré Grand-père. Encore rien.", "float"),
      page(A.park, "La petite-fille a tiré Grand-mère.", "pan"),
      page(A.park, "Le chien a tiré la petite-fille.", "float"),
      page(A.garden, "Le chat a tiré le chien. La souris a tiré le chat.", "sparkle"),
      page(A.garden, "Tous ensemble : un, deux, trois… hop !", "float"),
      page(A.kitchen, "Ils ont partagé le navet géant. Chacun une part ronde.", "sparkle")
    ]
  }
];

const es: StoryBook[] = [
  {
    id: "sol-hermanas",
    locale: "es",
    shelf: "sisters",
    title: "El sol de las hermanas",
    blurb: "Pintan un sol y el jardín se calienta un poquito.",
    minutes: 3,
    cover: A.hero,
    pages: [
      page(A.hero, "Vania y Sophia abrieron las pinturas en el jardín.", "kenburns"),
      page(A.paint, "Sophia pintó un sol redondo, rosa y dorado.", "sparkle"),
      page(A.paint, "Vania añadió rayos suaves, como abrazos.", "float"),
      page(A.garden, "Colgaron el sol en la cerca. El papel se calentó un poco.", "pan"),
      page(A.garden, "Las flores se abrieron como si dijeran gracias.", "float"),
      page(A.banner, "Las hermanas se sentaron bajo su sol de papel.", "kenburns"),
      page(A.garden, "Un abejorro vino a visitar el cuadro.", "sparkle"),
      page(A.hero, "Guardaron el sol en la ventana para el día nublado.", "kenburns")
    ]
  },
  {
    id: "tres-cerditos",
    locale: "es",
    shelf: "folk",
    title: "Los tres cerditos",
    blurb: "Tres casitas de colores y un lobo viajero que estornuda.",
    minutes: 3,
    cover: A.bedroom,
    pages: [
      page(A.garden, "Tres cerditos querían tres colores: amarillo, marrón y rojo.", "float"),
      page(A.garden, "El amarillo tejió paja. El marrón armó ramas. El rojo puso ladrillos.", "pan"),
      page(A.park, "Un lobo viajero llegó con un estornudo enorme: ¡achís!", "float"),
      page(A.park, "La paja se despeinó. Los cerditos rieron y corrieron.", "pan"),
      page(A.bedroom, "Otro estornudo: la madera tembló, pero nadie se asustó de verdad.", "float"),
      page(A.bedroom, "En el ladrillo, el lobo se sonó la nariz. Nada se cayó.", "float"),
      page(A.kitchen, "Los cerditos le dieron un pañuelo y un tazón de sopa.", "sparkle"),
      page(A.kitchen, "El lobo se fue más educado y prometió tocar la puerta la próxima vez.", "float")
    ]
  },
  {
    id: "ratita-queso",
    locale: "es",
    shelf: "folk",
    title: "La ratita y el queso",
    blurb: "Una ratita halla un queso y lo comparte con sus amigos.",
    minutes: 3,
    cover: A.kitchen,
    pages: [
      page(A.kitchen, "Una ratita halló un queso redondo bajo la mesa.", "float"),
      page(A.kitchen, "Era grande, amarillo y olía a fiesta.", "sparkle"),
      page(A.paint, "Pensó: podría esconderlo. Luego pensó: podría compartirlo.", "pan"),
      page(A.garden, "Llamó al gorrión, al erizo y a la mariquita.", "float"),
      page(A.kitchen, "Cortó cuatro trozos, casi iguales.", "float"),
      page(A.kitchen, "Cada amigo trajo algo: una fresa, una hoja, una semilla.", "sparkle"),
      page(A.kitchen, "Hicieron un picnic menudo sobre un plato.", "float"),
      page(A.garden, "La ratita dijo: el queso sabe más cuando hay risas.", "sparkle")
    ]
  }
];

export const storyCatalog: StoryBook[] = [...fa, ...en, ...fr, ...es];

export function storiesForLocale(locale: Locale) {
  return storyCatalog.filter((book) => book.locale === locale);
}

export function storiesOnShelf(locale: Locale, shelf: StoryShelf) {
  return storiesForLocale(locale).filter((book) => book.shelf === shelf);
}

export function storyById(locale: Locale, id: string) {
  return storyCatalog.find((book) => book.locale === locale && book.id === id);
}
