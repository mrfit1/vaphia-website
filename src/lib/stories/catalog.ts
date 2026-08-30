import type { Locale } from "@/lib/i18n";

import type { SceneId } from "@/lib/stories/scenes";

export type StoryPage = {
  text: string;
  mark: string;
  tint: string;
  scene: SceneId;
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
      { text: "Sophia peeked under the sofa and found a shy pink balloon. “I see you,” she whispered, sister-soft.", mark: "🎈", tint: "#ffe2f2", scene: "room-balloon" },
      { text: "She sat down close. “Hello, little balloon. Do you want to fly with me?”", mark: "🌸", tint: "#fff0f7", scene: "garden-whisper" },
      { text: "The balloon wiggled. Sophia tied a soft ribbon and opened the window.", mark: "🎀", tint: "#ffe8dc", scene: "room-window" },
      { text: "A tiny breeze came in. The balloon bounced once, then twice.", mark: "💨", tint: "#dffaff", scene: "room-window" },
      { text: "Sophia laughed and held the ribbon. Together they danced around the room.", mark: "💃", tint: "#fff2ba", scene: "room-balloon" },
      { text: "At bedtime the balloon slept on her chair, like a quiet pink moon.", mark: "🌙", tint: "#e7e0ff", scene: "night-moon" },
      { text: "In the morning Sophia told Vania everything. They blew a kiss to the balloon chair.", mark: "🎀", tint: "#ffe2f2", scene: "room-window" },
      { text: "“Your turn tomorrow,” said Sophia. Vania already had a yellow ribbon ready.", mark: "💛", tint: "#fff2ba", scene: "room-balloon" }

    ]
  },
  {
    id: "vania-lost-star",
    locale: "en",
    title: "Vania and the Lost Star",
    blurb: "A star falls into the garden, and Vania makes a plan.",
    minutes: 3,
    pages: [
      { text: "Vania heard a tiny ping in the grass. A star had tumbled down, still warm, and she cupped it like a secret.", mark: "⭐", tint: "#fff3bb", scene: "garden-star" },
      { text: "“I will help you home,” said Vania. She made a cup from her hands.", mark: "🤲", tint: "#ffe8dc", scene: "garden-star" },
      { text: "The star was dusty. Vania washed it with dew and a leaf.", mark: "🍃", tint: "#e0f9ef", scene: "garden-apple" },
      { text: "She climbed the little hill behind the house. Higher, higher.", mark: "⛰️", tint: "#e4ddff", scene: "hill-star" },
      { text: "Vania lifted the star. It glowed warm, then jumped back into the sky.", mark: "✨", tint: "#dffaff", scene: "window-star" },
      { text: "Every night that star winked at Vania first.", mark: "😉", tint: "#fff2ba", scene: "night-moon" },
      { text: "Vania ran inside. “Sophia, I helped a star go home.” Sophia hugged her dusty hands.", mark: "💖", tint: "#ffe2f2", scene: "room-window" },
      { text: "They left the window open a finger-width, just in case another star felt lost.", mark: "🌙", tint: "#e7e0ff", scene: "window-star" }

    ]
  },
  {
    id: "sisters-share-cupcake",
    locale: "en",
    title: "The Sisters Share a Cupcake",
    blurb: "One cupcake, two sisters, and a very good idea.",
    minutes: 3,
    pages: [
      { text: "One cupcake sat on the plate, vanilla-sweet. Sophia looked at Vania. Sisters share. That was the rule and the treat.", mark: "🧁", tint: "#ffe5d9", scene: "kitchen-share" },
      { text: "Sophia looked at Vania. Vania looked at Sophia.", mark: "👀", tint: "#ffe2f2", scene: "kitchen-share" },
      { text: "“We could split it,” said Sophia. “We could invent extra frosting,” said Vania.", mark: "🎨", tint: "#e7e0ff", scene: "kitchen-secret" },
      { text: "They cut the cake and added berries like tiny hats.", mark: "🍓", tint: "#ffd9ec", scene: "kitchen-share" },
      { text: "They ate slowly. Sweet. Soft. Shared.", mark: "😋", tint: "#fff2ba", scene: "kitchen-honey" },
      { text: "The plate was empty, but the kitchen felt full.", mark: "🏠", tint: "#ddf9f0", scene: "kitchen-share" },
      { text: "Sophia licked a crumb from Vania’s cheek. They both laughed like bells.", mark: "😄", tint: "#ffe8dc", scene: "kitchen-share" },
      { text: "Tomorrow they would bake two. Or maybe still one. Sharing was the tasty part.", mark: "🧁", tint: "#fff2ba", scene: "kitchen-secret" }

    ]
  },
  {
    id: "moon-forgot-song",
    locale: "en",
    title: "The Moon Forgot Her Song",
    blurb: "The moon is quiet, so the sisters sing her a new one.",
    minutes: 3,
    pages: [
      { text: "The moon hung over the house with no song at all.", mark: "🌙", tint: "#e7e0ff", scene: "night-moon" },
      { text: "Sophia hummed a pink note. Vania hummed a gold note.", mark: "🎵", tint: "#fff2ba", scene: "night-moon" },
      { text: "The notes hugged in the air and became a lullaby.", mark: "💖", tint: "#ffe2f2", scene: "bed-moon" },
      { text: "The moon listened. Then she glowed a little brighter.", mark: "✨", tint: "#dffaff", scene: "window-star" },
      { text: "Clouds clapped softly. The night felt safe.", mark: "☁️", tint: "#e0f9ef", scene: "rain-yard" },
      { text: "The sisters slept, and the moon sang their song until morning.", mark: "😴", tint: "#fff3bb", scene: "bed-moon" },
      { text: "Sophia tucked the pink note under her pillow. Vania kept the gold one in her pocket.", mark: "🎵", tint: "#ffe2f2", scene: "bed-moon" },
      { text: "If the moon forgets again, the sisters already know the words.", mark: "🌙", tint: "#e7e0ff", scene: "night-moon" }

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
      { text: "سوفیا پشت پنجره یک گربه سفید دید که خیلی آرام نشسته بود.", mark: "🐱", tint: "#fff0f7", scene: "room-cat" },
      { text: "گربه دم تکان داد. سوفیا یک جعبه نرم آورد و پتو گذاشت توش.", mark: "📦", tint: "#ffe8dc", scene: "room-cat" },
      { text: "گربه بو کشید و نشست. مثل یک ابر کوچک.", mark: "☁️", tint: "#dffaff", scene: "rain-yard" },
      { text: "سوفیا برایش یک کاسه شیر گرم گذاشت و آرام آواز خواند.", mark: "🥛", tint: "#fff2ba", scene: "room-cat" },
      { text: "باران آمد. گربه داخل ماند و سوفیا کنارش نقاشی کرد.", mark: "🌧️", tint: "#e7e0ff", scene: "rain-yard" },
      { text: "از آن شب، پنجره دیگر هیچ‌وقت تنها نبود.", mark: "🏠", tint: "#e0f9ef", scene: "kitchen-share" },
      { text: "وانیا آمد و برای گربه اسم گذاشت: برفی. سوفیا موافقت کرد.", mark: "🐱", tint: "#fff0f7", scene: "room-cat" },
      { text: "هر شب یک پتو برای برفی و یک پتو برای خواهرها.", mark: "🛏️", tint: "#e7e0ff", scene: "bed-moon" }

    ]
  },
  {
    id: "vania-apple-garden",
    locale: "fa",
    title: "وانیا در باغ سیب",
    blurb: "وانیا سیب سرخی پیدا می‌کند که نمی‌خواهد تنها بماند.",
    minutes: 3,
    pages: [
      { text: "وانیا در باغ، سیب سرخی دید که از شاخه افتاده بود.", mark: "🍎", tint: "#ffe2f0", scene: "garden-apple" },
      { text: "سیب غلتید و ایستاد کنار پایش. انگار چیزی می‌خواست بگوید.", mark: "👣", tint: "#fff2ba", scene: "garden-apple" },
      { text: "وانیا سیب را شست و روی پارچه‌ای نرم گذاشت.", mark: "🧺", tint: "#e0f9ef", scene: "garden-apple" },
      { text: "او سیب را پیش خواهرش برد. دو تا بشقاب کوچک چیدند.", mark: "🍽️", tint: "#ffe8dc", scene: "kitchen-share" },
      { text: "یک نصف برای سوفیا، یک نصف برای وانیا. شیرین و خنک.", mark: "😋", tint: "#dffaff", scene: "kitchen-honey" },
      { text: "هسته را کاشتند. باغ یک دوست تازه داشت.", mark: "🌱", tint: "#ddf9f0", scene: "garden-apple" },
      { text: "سوفیا گفت باغ بوی سیب می‌دهد. وانیا گفت باغ بوی خواهر می‌دهد.", mark: "💖", tint: "#ffe2f2", scene: "garden-whisper" },
      { text: "آن‌ها هر هفته به درخت کوچک آب دادند. آرام و با هم.", mark: "🌱", tint: "#e0f9ef", scene: "garden-apple" }

    ]
  },
  {
    id: "sisters-golden-rain",
    locale: "fa",
    title: "خواهرها و باران طلایی",
    blurb: "باران سبک می‌بارد و حیاط پر از نور می‌شود.",
    minutes: 3,
    pages: [
      { text: "آسمان روشن شد و قطره‌های طلایی روی حیاط نشست.", mark: "🌦️", tint: "#fff3bb", scene: "rain-yard" },
      { text: "سوفیا چتر صورتی آورد. وانیا چکمه زرد پوشید.", mark: "☂️", tint: "#ffe2f2", scene: "rain-yard" },
      { text: "آن‌ها در گودال‌های کوچک رقصیدند. شلپ شلوپ!", mark: "💃", tint: "#dffaff", scene: "room-balloon" },
      { text: "یک برگ مثل قایق روی آب رفت و خواهرها دنبالش دویدند.", mark: "🍃", tint: "#e0f9ef", scene: "garden-apple" },
      { text: "باران بند آمد. رنگین‌کمان نیامد؛ فقط دو لبخند درخشان ماند.", mark: "😊", tint: "#ffe8dc", scene: "rain-yard" },
      { text: "خانه بوی چای و جوراب خیس می‌داد. عالی بود.", mark: "🍵", tint: "#e7e0ff", scene: "kitchen-honey" },
      { text: "جوراب‌ها را کنار بخاری گذاشتند. دو تا جفت، کنار هم.", mark: "🧦", tint: "#fff2ba", scene: "kitchen-honey" },
      { text: "فردا اگر باران آمد، دوباره همان چتر و همان خنده‌ها.", mark: "☂️", tint: "#ffe2f2", scene: "rain-yard" }

    ]
  },
  {
    id: "star-on-window",
    locale: "fa",
    title: "ستاره روی پنجره",
    blurb: "ستاره‌ای کوچک روی شیشه می‌نشیند و قصه گوش می‌دهد.",
    minutes: 3,
    pages: [
      { text: "شب که شد، ستاره‌ای روی شیشه اتاق نشست.", mark: "⭐", tint: "#fff3bb", scene: "garden-star" },
      { text: "سوفیا نزدیک آمد. ستاره مثل یک دکمه طلایی می‌درخشید.", mark: "✨", tint: "#e7e0ff", scene: "window-star" },
      { text: "وانیا قصه کوتاهی گفت درباره یک قطار مهربان.", mark: "🚂", tint: "#ffe8dc", scene: "room-train" },
      { text: "ستاره گرم‌تر شد. انگار قصه را دوست داشت.", mark: "💛", tint: "#fff2ba", scene: "window-star" },
      { text: "خواهرها چراغ را کم کردند و ستاره همان‌جا ماند.", mark: "🛏️", tint: "#dffaff", scene: "bed-moon" },
      { text: "صبح، فقط یک نقطه نور روی شیشه بود. مثل خداحافظی.", mark: "🌅", tint: "#ffe2f2", scene: "room-window" },
      { text: "سوفیا روی شیشه یک ستاره کوچک کشید تا جایش گرم بماند.", mark: "✨", tint: "#fff3bb", scene: "window-star" },
      { text: "وانیا گفت فردا قصه تازه‌ای می‌گوییم. ستاره شاید برگردد.", mark: "📖", tint: "#e7e0ff", scene: "room-window" }

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
      { text: "Sophia a vu un papillon bleu posé sur sa chaussure.", mark: "🦋", tint: "#dffaff", scene: "garden-butterfly" },
      { text: "Il battait des ailes tout doucement, comme un soupir.", mark: "💨", tint: "#e7e0ff", scene: "room-window" },
      { text: "Sophia a ouvert le jardin et montré une fleur ronde.", mark: "🌸", tint: "#ffe2f2", scene: "garden-whisper" },
      { text: "Le papillon a goûté le pollen. Puis il a fait un tour de danse.", mark: "💃", tint: "#fff2ba", scene: "room-balloon" },
      { text: "Sophia a dessiné ses ailes pour s’en souvenir.", mark: "🎨", tint: "#ffe8dc", scene: "kitchen-secret" },
      { text: "Le soir, le dessin dormait près de son lit.", mark: "🌙", tint: "#e0f9ef", scene: "night-moon" },
      { text: "Vania regarda le dessin. “Il a tes cils,” dit-elle. Sophia rougit.", mark: "🦋", tint: "#dffaff", scene: "garden-butterfly" },
      { text: "Le matin, une petite poudre bleue était sur le rebord. Un merci.", mark: "✨", tint: "#e7e0ff", scene: "room-window" }

    ]
  },
  {
    id: "vania-secret-cake",
    locale: "fr",
    title: "Vania et le gâteau secret",
    blurb: "Vania prépare un gâteau tout simple pour une surprise.",
    minutes: 3,
    pages: [
      { text: "Vania a mis de la farine, du lait et un nuage de sucre.", mark: "🥣", tint: "#fff2ba", scene: "kitchen-secret" },
      { text: "Elle a mélangé tout doucement. Pas de bruit. C’est un secret.", mark: "🤫", tint: "#e7e0ff", scene: "kitchen-secret" },
      { text: "Le gâteau a gonflé comme un petit soleil.", mark: "☀️", tint: "#ffe8dc", scene: "kitchen-honey" },
      { text: "Vania a ajouté une fraise au sommet, comme un chapeau.", mark: "🍓", tint: "#ffe2f2", scene: "kitchen-share" },
      { text: "Sophia est arrivée. “Pour moi ?” “Pour nous,” a dit Vania.", mark: "💖", tint: "#ffd9ec", scene: "bed-moon" },
      { text: "Elles ont goûté. Le secret était sucré et partagé.", mark: "😋", tint: "#ddf9f0", scene: "kitchen-honey" },
      { text: "Elles ont gardé une miette pour plus tard. Le secret pouvait durer.", mark: "🍪", tint: "#fff2ba", scene: "kitchen-honey" },
      { text: "Sophia a écrit “nous” sur un papier et l’a collé sur le plat.", mark: "💖", tint: "#ffe2f2", scene: "kitchen-share" }

    ]
  },
  {
    id: "sisters-bubble-sea",
    locale: "fr",
    title: "Les sœurs et la mer de bulles",
    blurb: "La baignoire devient une mer calme, pleine de rires.",
    minutes: 3,
    pages: [
      { text: "La baignoire était pleine de bulles blanches.", mark: "🛁", tint: "#dffaff", scene: "bath-bubbles" },
      { text: "Sophia a soufflé une montagne. Vania a soufflé un bateau.", mark: "🫧", tint: "#e0f9ef", scene: "bath-bubbles" },
      { text: "Elles ont voyagé jusqu’au robinet, puis jusqu’au savon.", mark: "⛵", tint: "#fff3bb", scene: "bath-bubbles" },
      { text: "Une bulle géante s’est posée sur le nez de Vania. Pop !", mark: "👃", tint: "#ffe2f2", scene: "bath-bubbles" },
      { text: "Les deux sœurs ont ri si fort que les bulles ont dansé.", mark: "😄", tint: "#ffe8dc", scene: "bath-bubbles" },
      { text: "Après le bain, leurs cheveux sentaient la mer douce.", mark: "🌊", tint: "#e7e0ff", scene: "bath-bubbles" },
      { text: "Sophia a séché les cheveux de Vania. Vania a séché le scoubidou de Sophia.", mark: "🎀", tint: "#ffe2f2", scene: "bath-bubbles" },
      { text: "La mer de bulles reviendrait demain. Les sœurs aussi.", mark: "🌊", tint: "#dffaff", scene: "bath-bubbles" }

    ]
  },
  {
    id: "whispering-garden",
    locale: "fr",
    title: "Le jardin qui chuchote",
    blurb: "Les feuilles parlent tout bas, et les sœurs écoutent.",
    minutes: 3,
    pages: [
      { text: "Le jardin chuchotait : chut, chut, chut.", mark: "🌿", tint: "#e0f9ef", scene: "garden-whisper" },
      { text: "Sophia s’est assise. Vania a posé l’oreille sur une feuille.", mark: "👂", tint: "#fff2ba", scene: "garden-whisper" },
      { text: "Les fleurs racontaient une histoire de pluie légère.", mark: "🌧️", tint: "#dffaff", scene: "rain-yard" },
      { text: "Un oiseau a ajouté un mot, puis un autre.", mark: "🐦", tint: "#ffe8dc", scene: "garden-butterfly" },
      { text: "Les sœurs ont répété l’histoire à la maison.", mark: "🏠", tint: "#ffe2f2", scene: "kitchen-share" },
      { text: "Le jardin a souri. On l’avait bien écouté.", mark: "😊", tint: "#e7e0ff", scene: "rain-yard" },
      { text: "Elles ont laissé deux cailloux roses près de la haie. Des oreilles.", mark: "👂", tint: "#ffe8dc", scene: "garden-whisper" },
      { text: "Le jardin a chuchoté encore, tout content d’avoir des amies.", mark: "🌿", tint: "#e0f9ef", scene: "garden-whisper" }

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
      { text: "Sophia recortó una luna redonda de papel suave.", mark: "🌙", tint: "#e7e0ff", scene: "night-moon" },
      { text: "La luna era blanca y un poco tímida.", mark: "📄", tint: "#fff0f7", scene: "room-paper-moon" },
      { text: "Sophia le dibujó una sonrisa pequeña.", mark: "😊", tint: "#fff2ba", scene: "rain-yard" },
      { text: "La colgó en la ventana con un hilo de cinta.", mark: "🎀", tint: "#ffe2f2", scene: "room-window" },
      { text: "Por la noche, la luna de verdad le hizo un guiño.", mark: "✨", tint: "#dffaff", scene: "window-star" },
      { text: "Sophia durmió con las dos lunas cuidándola.", mark: "🛏️", tint: "#e0f9ef", scene: "bed-moon" },
      { text: "Vania trajo un sol de papel para que la luna no se aburriera de día.", mark: "☀️", tint: "#fff2ba", scene: "room-paper-moon" },
      { text: "Las dos lunas, la de papel y la del cielo, se hicieron amigas.", mark: "🌙", tint: "#e7e0ff", scene: "night-moon" }

    ]
  },
  {
    id: "vania-balloon-train",
    locale: "es",
    title: "Vania y el tren de globos",
    blurb: "Vania ata globos y inventa un tren que no hace ruido.",
    minutes: 3,
    pages: [
      { text: "Vania tenía tres globos y una idea grande.", mark: "🎈", tint: "#ffe2f2", scene: "room-balloon" },
      { text: "Ató los globos a cajas pequeñas. Un tren silencioso.", mark: "🚂", tint: "#fff3bb", scene: "room-train" },
      { text: "El tren viajó por la alfombra hasta la cocina.", mark: "🧵", tint: "#e4ddff", scene: "room-train" },
      { text: "Sophia subió un osito. El tren aceptó al pasajero.", mark: "🧸", tint: "#ffe8dc", scene: "room-train" },
      { text: "Llegaron a la mesa. Destino: merienda.", mark: "🍪", tint: "#ddf9f0", scene: "kitchen-share" },
      { text: "El tren descansó. Mañana habría otra estación.", mark: "🚉", tint: "#dffaff", scene: "room-train" },
      { text: "Sophia pintó un andén en el suelo. Vania tocó el silbato con la boca.", mark: "🚂", tint: "#fff3bb", scene: "room-train" },
      { text: "El tren de globos durmió en la caja. Mañana, nuevo viaje de hermanas.", mark: "📦", tint: "#ffe8dc", scene: "room-train" }

    ]
  },
  {
    id: "sisters-honey-river",
    locale: "es",
    title: "Las hermanas y el río de miel",
    blurb: "Un hilo de miel se vuelve un río para dos cucharas.",
    minutes: 3,
    pages: [
      { text: "Una cuchara dejó caer un hilo de miel.", mark: "🍯", tint: "#fff2ba", scene: "kitchen-honey" },
      { text: "Sophia dijo: “Es un río.” Vania dijo: “Es un camino.”", mark: "🗺️", tint: "#ffe8dc", scene: "kitchen-honey" },
      { text: "Mojaron pan en el río dorado.", mark: "🍞", tint: "#ffe5d9", scene: "kitchen-honey" },
      { text: "Dulce. Lento. Perfecto para compartir.", mark: "😋", tint: "#ffe2f2", scene: "kitchen-honey" },
      { text: "Lavaron el plato y el río desapareció, feliz.", mark: "🫧", tint: "#dffaff", scene: "bath-bubbles" },
      { text: "Las hermanas se lamió un dedo cada una. Fin.", mark: "😄", tint: "#e0f9ef", scene: "bath-bubbles" },
      { text: "Guardaron la cuchara en el mismo vaso. Dos nombres, un río.", mark: "🍯", tint: "#fff2ba", scene: "kitchen-honey" },
      { text: "Por la noche soñaron con un barco de pan. Llegaron juntas.", mark: "🍞", tint: "#ffe5d9", scene: "kitchen-share" }

    ]
  },
  {
    id: "hug-tree",
    locale: "es",
    title: "El árbol de los abrazos",
    blurb: "Un árbol del parque guarda abrazos para cuando hace falta.",
    minutes: 3,
    pages: [
      { text: "En el parque había un árbol con brazos anchos.", mark: "🌳", tint: "#e0f9ef", scene: "park-tree" },
      { text: "Sophia lo abrazó primero. El tronco estaba tibio.", mark: "🤗", tint: "#fff2ba", scene: "park-tree" },
      { text: "Vania abrazó el otro lado. El árbol alcanzó para dos.", mark: "💖", tint: "#ffe2f2", scene: "bed-moon" },
      { text: "Un pájaro cantó como si diera las gracias.", mark: "🐦", tint: "#dffaff", scene: "garden-butterfly" },
      { text: "Las hermanas dejaron una hoja como recado.", mark: "🍃", tint: "#e7e0ff", scene: "garden-apple" },
      { text: "El árbol guardó los abrazos para el próximo día.", mark: "🌟", tint: "#fff3bb", scene: "park-tree" },
      { text: "Prometieron volver cuando el viento soplara raro.", mark: "💨", tint: "#dffaff", scene: "park-tree" },
      { text: "El árbol guardó dos abrazos más, por si acaso.", mark: "🤗", tint: "#fff2ba", scene: "park-tree" }

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
