import type { Locale } from "@/lib/i18n";

export type StoryPage = {
  text: string;
  mark: string;
  tint: string;
};

export type StoryBook = {
  id: string;
  locale: Locale;
  title: string;
  blurb: string;
  minutes: number;
  pages: StoryPage[];
};

const en: StoryBook[] = [
  {
    id: "sophia-pink-balloon",
    locale: "en",
    title: "Sophia and the Pink Balloon",
    blurb: "A shy balloon wants to float, and Sophia knows just how to help.",
    minutes: 3,
    pages: [
      { text: "Sophia found a pink balloon under the sofa. It was very, very still.", mark: "🎈", tint: "#ffe2f2" },
      { text: "“Hello,” whispered Sophia. “Do you want to fly?”", mark: "🌸", tint: "#fff0f7" },
      { text: "The balloon wiggled. Sophia tied a soft ribbon and opened the window.", mark: "🎀", tint: "#ffe8dc" },
      { text: "A tiny breeze came in. The balloon bounced once, then twice.", mark: "💨", tint: "#dffaff" },
      { text: "Sophia laughed and held the ribbon. Together they danced around the room.", mark: "💃", tint: "#fff2ba" },
      { text: "At bedtime the balloon slept on her chair, like a quiet pink moon.", mark: "🌙", tint: "#e7e0ff" }
    ]
  },
  {
    id: "vania-lost-star",
    locale: "en",
    title: "Vania and the Lost Star",
    blurb: "A star falls into the garden, and Vania makes a plan.",
    minutes: 3,
    pages: [
      { text: "Vania heard a tiny ping in the grass. A star had tumbled down!", mark: "⭐", tint: "#fff3bb" },
      { text: "“I will help you home,” said Vania. She made a cup from her hands.", mark: "🤲", tint: "#ffe8dc" },
      { text: "The star was dusty. Vania washed it with dew and a leaf.", mark: "🍃", tint: "#e0f9ef" },
      { text: "She climbed the little hill behind the house. Higher, higher.", mark: "⛰️", tint: "#e4ddff" },
      { text: "Vania lifted the star. It glowed warm, then jumped back into the sky.", mark: "✨", tint: "#dffaff" },
      { text: "Every night that star winked at Vania first.", mark: "😉", tint: "#fff2ba" }
    ]
  },
  {
    id: "sisters-share-cupcake",
    locale: "en",
    title: "The Sisters Share a Cupcake",
    blurb: "One cupcake, two sisters, and a very good idea.",
    minutes: 3,
    pages: [
      { text: "There was one cupcake on the plate. It smelled like vanilla and smiles.", mark: "🧁", tint: "#ffe5d9" },
      { text: "Sophia looked at Vania. Vania looked at Sophia.", mark: "👀", tint: "#ffe2f2" },
      { text: "“We could split it,” said Sophia. “We could invent extra frosting,” said Vania.", mark: "🎨", tint: "#e7e0ff" },
      { text: "They cut the cake and added berries like tiny hats.", mark: "🍓", tint: "#ffd9ec" },
      { text: "They ate slowly. Sweet. Soft. Shared.", mark: "😋", tint: "#fff2ba" },
      { text: "The plate was empty, but the kitchen felt full.", mark: "🏠", tint: "#ddf9f0" }
    ]
  },
  {
    id: "moon-forgot-song",
    locale: "en",
    title: "The Moon Forgot Her Song",
    blurb: "The moon is quiet, so the sisters sing her a new one.",
    minutes: 3,
    pages: [
      { text: "The moon hung over the house with no song at all.", mark: "🌙", tint: "#e7e0ff" },
      { text: "Sophia hummed a pink note. Vania hummed a gold note.", mark: "🎵", tint: "#fff2ba" },
      { text: "The notes hugged in the air and became a lullaby.", mark: "💖", tint: "#ffe2f2" },
      { text: "The moon listened. Then she glowed a little brighter.", mark: "✨", tint: "#dffaff" },
      { text: "Clouds clapped softly. The night felt safe.", mark: "☁️", tint: "#e0f9ef" },
      { text: "The sisters slept, and the moon sang their song until morning.", mark: "😴", tint: "#fff3bb" }
    ]
  }
];

const fa: StoryBook[] = [
  {
    id: "sophia-white-cat",
    locale: "fa",
    title: "سوفیا و گربه سفید",
    blurb: "گربه‌ای سفید پشت پنجره نشسته و سوفیا برایش خانه می‌سازد.",
    minutes: 3,
    pages: [
      { text: "سوفیا پشت پنجره یک گربه سفید دید که خیلی آرام نشسته بود.", mark: "🐱", tint: "#fff0f7" },
      { text: "گربه دم تکان داد. سوفیا یک جعبه نرم آورد و پتو گذاشت توش.", mark: "📦", tint: "#ffe8dc" },
      { text: "گربه بو کشید و نشست. مثل یک ابر کوچک.", mark: "☁️", tint: "#dffaff" },
      { text: "سوفیا برایش یک کاسه شیر گرم گذاشت و آرام آواز خواند.", mark: "🥛", tint: "#fff2ba" },
      { text: "باران آمد. گربه داخل ماند و سوفیا کنارش نقاشی کرد.", mark: "🌧️", tint: "#e7e0ff" },
      { text: "از آن شب، پنجره دیگر هیچ‌وقت تنها نبود.", mark: "🏠", tint: "#e0f9ef" }
    ]
  },
  {
    id: "vania-apple-garden",
    locale: "fa",
    title: "وانیا در باغ سیب",
    blurb: "وانیا سیب سرخی پیدا می‌کند که نمی‌خواهد تنها بماند.",
    minutes: 3,
    pages: [
      { text: "وانیا در باغ، سیب سرخی دید که از شاخه افتاده بود.", mark: "🍎", tint: "#ffe2f0" },
      { text: "سیب غلتید و ایستاد کنار پایش. انگار چیزی می‌خواست بگوید.", mark: "👣", tint: "#fff2ba" },
      { text: "وانیا سیب را شست و روی پارچه‌ای نرم گذاشت.", mark: "🧺", tint: "#e0f9ef" },
      { text: "او سیب را پیش خواهرش برد. دو تا بشقاب کوچک چیدند.", mark: "🍽️", tint: "#ffe8dc" },
      { text: "یک نصف برای سوفیا، یک نصف برای وانیا. شیرین و خنک.", mark: "😋", tint: "#dffaff" },
      { text: "هسته را کاشتند. باغ یک دوست تازه داشت.", mark: "🌱", tint: "#ddf9f0" }
    ]
  },
  {
    id: "sisters-golden-rain",
    locale: "fa",
    title: "خواهرها و باران طلایی",
    blurb: "باران سبک می‌بارد و حیاط پر از نور می‌شود.",
    minutes: 3,
    pages: [
      { text: "آسمان روشن شد و قطره‌های طلایی روی حیاط نشست.", mark: "🌦️", tint: "#fff3bb" },
      { text: "سوفیا چتر صورتی آورد. وانیا چکمه زرد پوشید.", mark: "☂️", tint: "#ffe2f2" },
      { text: "آن‌ها در گودال‌های کوچک رقصیدند. شلپ شلوپ!", mark: "💃", tint: "#dffaff" },
      { text: "یک برگ مثل قایق روی آب رفت و خواهرها دنبالش دویدند.", mark: "🍃", tint: "#e0f9ef" },
      { text: "باران بند آمد. رنگین‌کمان نیامد؛ فقط دو لبخند درخشان ماند.", mark: "😊", tint: "#ffe8dc" },
      { text: "خانه بوی چای و جوراب خیس می‌داد. عالی بود.", mark: "🍵", tint: "#e7e0ff" }
    ]
  },
  {
    id: "star-on-window",
    locale: "fa",
    title: "ستاره روی پنجره",
    blurb: "ستاره‌ای کوچک روی شیشه می‌نشیند و قصه گوش می‌دهد.",
    minutes: 3,
    pages: [
      { text: "شب که شد، ستاره‌ای روی شیشه اتاق نشست.", mark: "⭐", tint: "#fff3bb" },
      { text: "سوفیا نزدیک آمد. ستاره مثل یک دکمه طلایی می‌درخشید.", mark: "✨", tint: "#e7e0ff" },
      { text: "وانیا قصه کوتاهی گفت درباره یک قطار مهربان.", mark: "🚂", tint: "#ffe8dc" },
      { text: "ستاره گرم‌تر شد. انگار قصه را دوست داشت.", mark: "💛", tint: "#fff2ba" },
      { text: "خواهرها چراغ را کم کردند و ستاره همان‌جا ماند.", mark: "🛏️", tint: "#dffaff" },
      { text: "صبح، فقط یک نقطه نور روی شیشه بود. مثل خداحافظی.", mark: "🌅", tint: "#ffe2f2" }
    ]
  }
];

const fr: StoryBook[] = [
  {
    id: "sophia-blue-butterfly",
    locale: "fr",
    title: "Sophia et le papillon bleu",
    blurb: "Un papillon perdu cherche une fleur, et Sophia l’écoute.",
    minutes: 3,
    pages: [
      { text: "Sophia a vu un papillon bleu posé sur sa chaussure.", mark: "🦋", tint: "#dffaff" },
      { text: "Il battait des ailes tout doucement, comme un soupir.", mark: "💨", tint: "#e7e0ff" },
      { text: "Sophia a ouvert le jardin et montré une fleur ronde.", mark: "🌸", tint: "#ffe2f2" },
      { text: "Le papillon a goûté le pollen. Puis il a fait un tour de danse.", mark: "💃", tint: "#fff2ba" },
      { text: "Sophia a dessiné ses ailes pour s’en souvenir.", mark: "🎨", tint: "#ffe8dc" },
      { text: "Le soir, le dessin dormait près de son lit.", mark: "🌙", tint: "#e0f9ef" }
    ]
  },
  {
    id: "vania-secret-cake",
    locale: "fr",
    title: "Vania et le gâteau secret",
    blurb: "Vania prépare un gâteau tout simple pour une surprise.",
    minutes: 3,
    pages: [
      { text: "Vania a mis de la farine, du lait et un nuage de sucre.", mark: "🥣", tint: "#fff2ba" },
      { text: "Elle a mélangé tout doucement. Pas de bruit. C’est un secret.", mark: "🤫", tint: "#e7e0ff" },
      { text: "Le gâteau a gonflé comme un petit soleil.", mark: "☀️", tint: "#ffe8dc" },
      { text: "Vania a ajouté une fraise au sommet, comme un chapeau.", mark: "🍓", tint: "#ffe2f2" },
      { text: "Sophia est arrivée. “Pour moi ?” “Pour nous,” a dit Vania.", mark: "💖", tint: "#ffd9ec" },
      { text: "Elles ont goûté. Le secret était sucré et partagé.", mark: "😋", tint: "#ddf9f0" }
    ]
  },
  {
    id: "sisters-bubble-sea",
    locale: "fr",
    title: "Les sœurs et la mer de bulles",
    blurb: "La baignoire devient une mer calme, pleine de rires.",
    minutes: 3,
    pages: [
      { text: "La baignoire était pleine de bulles blanches.", mark: "🛁", tint: "#dffaff" },
      { text: "Sophia a soufflé une montagne. Vania a soufflé un bateau.", mark: "🫧", tint: "#e0f9ef" },
      { text: "Elles ont voyagé jusqu’au robinet, puis jusqu’au savon.", mark: "⛵", tint: "#fff3bb" },
      { text: "Une bulle géante s’est posée sur le nez de Vania. Pop !", mark: "👃", tint: "#ffe2f2" },
      { text: "Les deux sœurs ont ri si fort que les bulles ont dansé.", mark: "😄", tint: "#ffe8dc" },
      { text: "Après le bain, leurs cheveux sentaient la mer douce.", mark: "🌊", tint: "#e7e0ff" }
    ]
  },
  {
    id: "whispering-garden",
    locale: "fr",
    title: "Le jardin qui chuchote",
    blurb: "Les feuilles parlent tout bas, et les sœurs écoutent.",
    minutes: 3,
    pages: [
      { text: "Le jardin chuchotait : chut, chut, chut.", mark: "🌿", tint: "#e0f9ef" },
      { text: "Sophia s’est assise. Vania a posé l’oreille sur une feuille.", mark: "👂", tint: "#fff2ba" },
      { text: "Les fleurs racontaient une histoire de pluie légère.", mark: "🌧️", tint: "#dffaff" },
      { text: "Un oiseau a ajouté un mot, puis un autre.", mark: "🐦", tint: "#ffe8dc" },
      { text: "Les sœurs ont répété l’histoire à la maison.", mark: "🏠", tint: "#ffe2f2" },
      { text: "Le jardin a souri. On l’avait bien écouté.", mark: "😊", tint: "#e7e0ff" }
    ]
  }
];

const es: StoryBook[] = [
  {
    id: "sophia-paper-moon",
    locale: "es",
    title: "Sophia y la luna de papel",
    blurb: "Sophia recorta una luna y la cuelga para que no se sienta sola.",
    minutes: 3,
    pages: [
      { text: "Sophia recortó una luna redonda de papel suave.", mark: "🌙", tint: "#e7e0ff" },
      { text: "La luna era blanca y un poco tímida.", mark: "📄", tint: "#fff0f7" },
      { text: "Sophia le dibujó una sonrisa pequeña.", mark: "😊", tint: "#fff2ba" },
      { text: "La colgó en la ventana con un hilo de cinta.", mark: "🎀", tint: "#ffe2f2" },
      { text: "Por la noche, la luna de verdad le hizo un guiño.", mark: "✨", tint: "#dffaff" },
      { text: "Sophia durmió con las dos lunas cuidándola.", mark: "🛏️", tint: "#e0f9ef" }
    ]
  },
  {
    id: "vania-balloon-train",
    locale: "es",
    title: "Vania y el tren de globos",
    blurb: "Vania ata globos y inventa un tren que no hace ruido.",
    minutes: 3,
    pages: [
      { text: "Vania tenía tres globos y una idea grande.", mark: "🎈", tint: "#ffe2f2" },
      { text: "Ató los globos a cajas pequeñas. Un tren silencioso.", mark: "🚂", tint: "#fff3bb" },
      { text: "El tren viajó por la alfombra hasta la cocina.", mark: "🧵", tint: "#e4ddff" },
      { text: "Sophia subió un osito. El tren aceptó al pasajero.", mark: "🧸", tint: "#ffe8dc" },
      { text: "Llegaron a la mesa. Destino: merienda.", mark: "🍪", tint: "#ddf9f0" },
      { text: "El tren descansó. Mañana habría otra estación.", mark: "🚉", tint: "#dffaff" }
    ]
  },
  {
    id: "sisters-honey-river",
    locale: "es",
    title: "Las hermanas y el río de miel",
    blurb: "Un hilo de miel se vuelve un río para dos cucharas.",
    minutes: 3,
    pages: [
      { text: "Una cuchara dejó caer un hilo de miel.", mark: "🍯", tint: "#fff2ba" },
      { text: "Sophia dijo: “Es un río.” Vania dijo: “Es un camino.”", mark: "🗺️", tint: "#ffe8dc" },
      { text: "Mojaron pan en el río dorado.", mark: "🍞", tint: "#ffe5d9" },
      { text: "Dulce. Lento. Perfecto para compartir.", mark: "😋", tint: "#ffe2f2" },
      { text: "Lavaron el plato y el río desapareció, feliz.", mark: "🫧", tint: "#dffaff" },
      { text: "Las hermanas se lamió un dedo cada una. Fin.", mark: "😄", tint: "#e0f9ef" }
    ]
  },
  {
    id: "hug-tree",
    locale: "es",
    title: "El árbol de los abrazos",
    blurb: "Un árbol del parque guarda abrazos para cuando hace falta.",
    minutes: 3,
    pages: [
      { text: "En el parque había un árbol con brazos anchos.", mark: "🌳", tint: "#e0f9ef" },
      { text: "Sophia lo abrazó primero. El tronco estaba tibio.", mark: "🤗", tint: "#fff2ba" },
      { text: "Vania abrazó el otro lado. El árbol alcanzó para dos.", mark: "💖", tint: "#ffe2f2" },
      { text: "Un pájaro cantó como si diera las gracias.", mark: "🐦", tint: "#dffaff" },
      { text: "Las hermanas dejaron una hoja como recado.", mark: "🍃", tint: "#e7e0ff" },
      { text: "El árbol guardó los abrazos para el próximo día.", mark: "🌟", tint: "#fff3bb" }
    ]
  }
];

export const storyCatalog: StoryBook[] = [...en, ...fa, ...fr, ...es];

export function storiesForLocale(locale: Locale) {
  return storyCatalog.filter((book) => book.locale === locale);
}

export function storyById(locale: Locale, id: string) {
  return storyCatalog.find((book) => book.locale === locale && book.id === id);
}
