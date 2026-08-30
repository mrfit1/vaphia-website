import type { AgeBand } from "@/lib/age";
import type { Locale } from "@/lib/i18n";

export type ColoringKind = "svg" | "png";

export type ColoringPage = {
  id: string;
  file: string;
  age: AgeBand;
  kind: ColoringKind;
  titles: Record<Locale, string>;
};

export const coloringCatalog: ColoringPage[] = [
  { id: "house-sun", file: "/coloring/ages/3-5/house-sun.png", age: "3-5", kind: "png", titles: { en: "House and Sun", fa: "خانه و خورشید", fr: "Maison et soleil", es: "Casa y sol" } },
  { id: "butterfly", file: "/coloring/ages/3-5/butterfly.png", age: "3-5", kind: "png", titles: { en: "Butterfly", fa: "پروانه", fr: "Papillon", es: "Mariposa" } },
  { id: "tiny-big-star", file: "/coloring/tiny-big-star.svg", age: "3-5", kind: "svg", titles: { en: "Big Star", fa: "ستاره بزرگ", fr: "Grande étoile", es: "Estrella grande" } },
  { id: "tiny-big-heart", file: "/coloring/tiny-big-heart.svg", age: "3-5", kind: "svg", titles: { en: "Big Heart", fa: "قلب بزرگ", fr: "Grand cœur", es: "Corazón grande" } },
  { id: "tiny-big-balloon", file: "/coloring/tiny-big-balloon.svg", age: "3-5", kind: "svg", titles: { en: "Big Balloon", fa: "بادکنک بزرگ", fr: "Grand ballon", es: "Globo grande" } },
  { id: "tiny-big-sun", file: "/coloring/tiny-big-sun.svg", age: "3-5", kind: "svg", titles: { en: "Big Sun", fa: "خورشید بزرگ", fr: "Grand soleil", es: "Sol grande" } },
  { id: "tiny-big-flower", file: "/coloring/tiny-big-flower.svg", age: "3-5", kind: "svg", titles: { en: "Big Flower", fa: "گل بزرگ", fr: "Grande fleur", es: "Flor grande" } },
  { id: "tiny-big-cupcake", file: "/coloring/tiny-big-cupcake.svg", age: "3-5", kind: "svg", titles: { en: "Big Cupcake", fa: "کاپ‌کیک بزرگ", fr: "Gros cupcake", es: "Cupcake grande" } },
  { id: "tiny-big-cloud", file: "/coloring/tiny-big-cloud.svg", age: "3-5", kind: "svg", titles: { en: "Big Cloud", fa: "ابر بزرگ", fr: "Gros nuage", es: "Nube grande" } },
  { id: "tiny-sophia-smile", file: "/coloring/tiny-sophia-smile.svg", age: "3-5", kind: "svg", titles: { en: "Sophia Smile", fa: "لبخند سوفیا", fr: "Sourire de Sophia", es: "Sonrisa de Sophia" } },
  { id: "tiny-vania-smile", file: "/coloring/tiny-vania-smile.svg", age: "3-5", kind: "svg", titles: { en: "Vania Smile", fa: "لبخند وانیا", fr: "Sourire de Vania", es: "Sonrisa de Vania" } },
  { id: "tiny-big-house", file: "/coloring/tiny-big-house.svg", age: "3-5", kind: "svg", titles: { en: "Big House", fa: "خانه بزرگ", fr: "Grande maison", es: "Casa grande" } },
  { id: "tiny-big-apple", file: "/coloring/tiny-big-apple.svg", age: "3-5", kind: "svg", titles: { en: "Big Apple", fa: "سیب بزرگ", fr: "Grande pomme", es: "Manzana grande" } },
  { id: "tiny-big-bunny", file: "/coloring/tiny-big-bunny.svg", age: "3-5", kind: "svg", titles: { en: "Big Bunny", fa: "خرگوش بزرگ", fr: "Gros lapin", es: "Conejito grande" } },
  { id: "tiny-two-stars", file: "/coloring/tiny-two-stars.svg", age: "3-5", kind: "svg", titles: { en: "Two Stars", fa: "دو ستاره", fr: "Deux étoiles", es: "Dos estrellas" } },
  { id: "tiny-heart-star", file: "/coloring/tiny-heart-star.svg", age: "3-5", kind: "svg", titles: { en: "Heart and Star", fa: "قلب و ستاره", fr: "Cœur et étoile", es: "Corazón y estrella" } },
  { id: "tiny-big-moon", file: "/coloring/tiny-big-moon.svg", age: "3-5", kind: "svg", titles: { en: "Big Moon", fa: "ماه بزرگ", fr: "Grande lune", es: "Luna grande" } },
  { id: "tiny-simple-gift", file: "/coloring/tiny-simple-gift.svg", age: "3-5", kind: "svg", titles: { en: "A Gift", fa: "یک هدیه", fr: "Un cadeau", es: "Un regalo" } },
  { id: "tiny-big-tree", file: "/coloring/tiny-big-tree.svg", age: "3-5", kind: "svg", titles: { en: "Big Tree", fa: "درخت بزرگ", fr: "Grand arbre", es: "Árbol grande" } },
  { id: "tiny-simple-boat", file: "/coloring/tiny-simple-boat.svg", age: "3-5", kind: "svg", titles: { en: "A Boat", fa: "یک قایق", fr: "Un bateau", es: "Un barco" } },
  { id: "tiny-big-fish", file: "/coloring/tiny-big-fish.svg", age: "3-5", kind: "svg", titles: { en: "A Fish", fa: "یک ماهی", fr: "Un poisson", es: "Un pez" } },
  { id: "tiny-lolly", file: "/coloring/tiny-lolly.svg", age: "3-5", kind: "svg", titles: { en: "A Lolly", fa: "آبنبات چوبی", fr: "Une sucette", es: "Una paleta" } },
  { id: "tiny-big-cat", file: "/coloring/tiny-big-cat.svg", age: "3-5", kind: "svg", titles: { en: "A Cat", fa: "یک گربه", fr: "Un chat", es: "Un gato" } },
  { id: "tiny-big-duck", file: "/coloring/tiny-big-duck.svg", age: "3-5", kind: "svg", titles: { en: "A Duck", fa: "یک اردک", fr: "Un canard", es: "Un pato" } },
  { id: "tiny-big-car", file: "/coloring/tiny-big-car.svg", age: "3-5", kind: "svg", titles: { en: "A Car", fa: "یک ماشین", fr: "Une voiture", es: "Un coche" } },
  { id: "tiny-big-bird", file: "/coloring/tiny-big-bird.svg", age: "3-5", kind: "svg", titles: { en: "A Bird", fa: "یک پرنده", fr: "Un oiseau", es: "Un pájaro" } },
  { id: "tiny-big-mushroom", file: "/coloring/tiny-big-mushroom.svg", age: "3-5", kind: "svg", titles: { en: "A Mushroom", fa: "یک قارچ", fr: "Un champignon", es: "Una seta" } },
  { id: "tiny-watermelon", file: "/coloring/tiny-watermelon.svg", age: "3-5", kind: "svg", titles: { en: "Watermelon", fa: "هندوانه", fr: "Pastèque", es: "Sandía" } },
  { id: "tiny-ladybug", file: "/coloring/tiny-ladybug.svg", age: "3-5", kind: "svg", titles: { en: "Ladybug", fa: "کفشدوزک", fr: "Coccinelle", es: "Mariquita" } },
  { id: "tiny-big-ball", file: "/coloring/tiny-big-ball.svg", age: "3-5", kind: "svg", titles: { en: "A Ball", fa: "یک توپ", fr: "Un ballon", es: "Una pelota" } },
  { id: "tiny-simple-kite", file: "/coloring/tiny-simple-kite.svg", age: "3-5", kind: "svg", titles: { en: "A Kite", fa: "یک بادبادک", fr: "Un cerf-volant", es: "Una cometa" } },
  { id: "garden", file: "/coloring/ages/5-7/garden.png", age: "5-7", kind: "png", titles: { en: "Sunny Garden", fa: "باغ آفتابی", fr: "Jardin ensoleillé", es: "Jardín soleado" } },
  { id: "little-sisters-hands", file: "/coloring/little-sisters-hands.svg", age: "5-7", kind: "svg", titles: { en: "Sisters Hold Hands", fa: "خواهرها دست در دست", fr: "Sœurs main dans la main", es: "Hermanas de la mano" } },
  { id: "little-garden-flowers", file: "/coloring/little-garden-flowers.svg", age: "5-7", kind: "svg", titles: { en: "Garden Flowers", fa: "گل‌های باغ", fr: "Fleurs du jardin", es: "Flores del jardín" } },
  { id: "little-park-swing", file: "/coloring/little-park-swing.svg", age: "5-7", kind: "svg", titles: { en: "Park Swing", fa: "تاب پارک", fr: "Balançoire", es: "Columpio del parque" } },
  { id: "little-cupcake-stand", file: "/coloring/little-cupcake-stand.svg", age: "5-7", kind: "svg", titles: { en: "Cupcake Stand", fa: "غرفه کاپ‌کیک", fr: "Stand de cupcakes", es: "Puesto de cupcakes" } },
  { id: "little-star-sky", file: "/coloring/little-star-sky.svg", age: "5-7", kind: "svg", titles: { en: "Star Sky", fa: "آسمان ستاره‌ای", fr: "Ciel étoilé", es: "Cielo de estrellas" } },
  { id: "little-play-room", file: "/coloring/little-play-room.svg", age: "5-7", kind: "svg", titles: { en: "Play Room", fa: "اتاق بازی", fr: "Salle de jeux", es: "Cuarto de juegos" } },
  { id: "little-kite-day", file: "/coloring/little-kite-day.svg", age: "5-7", kind: "svg", titles: { en: "Kite Day", fa: "روز بادبادک", fr: "Jour de cerf-volant", es: "Día de cometas" } },
  { id: "little-boat-pond", file: "/coloring/little-boat-pond.svg", age: "5-7", kind: "svg", titles: { en: "Boat Pond", fa: "برکه قایق", fr: "Étang et bateau", es: "Estanque y barco" } },
  { id: "little-ice-cream", file: "/coloring/little-ice-cream.svg", age: "5-7", kind: "svg", titles: { en: "Ice Cream", fa: "بستنی", fr: "Glace", es: "Helado" } },
  { id: "little-paint-table", file: "/coloring/little-paint-table.svg", age: "5-7", kind: "svg", titles: { en: "Paint Table", fa: "میز نقاشی", fr: "Table de peinture", es: "Mesa de pintura" } },
  { id: "little-story-nook", file: "/coloring/little-story-nook.svg", age: "5-7", kind: "svg", titles: { en: "Story Nook", fa: "گوشه قصه", fr: "Coin histoire", es: "Rincón de cuentos" } },
  { id: "little-butterfly-garden", file: "/coloring/little-butterfly-garden.svg", age: "5-7", kind: "svg", titles: { en: "Butterfly Garden", fa: "باغ پروانه", fr: "Jardin des papillons", es: "Jardín de mariposas" } },
  { id: "little-number-train", file: "/coloring/little-number-train.svg", age: "5-7", kind: "svg", titles: { en: "A Train", fa: "یک قطار", fr: "Un train", es: "Un tren" } },
  { id: "little-simple-castle", file: "/coloring/little-simple-castle.svg", age: "5-7", kind: "svg", titles: { en: "A Castle", fa: "یک قلعه", fr: "Un château", es: "Un castillo" } },
  { id: "little-picnic", file: "/coloring/little-picnic.svg", age: "5-7", kind: "svg", titles: { en: "Picnic", fa: "پیک‌نیک", fr: "Pique-nique", es: "Picnic" } },
  { id: "little-camera-fun", file: "/coloring/little-camera-fun.svg", age: "5-7", kind: "svg", titles: { en: "Camera Fun", fa: "دوربین شاد", fr: "Appareil photo", es: "Cámara divertida" } },
  { id: "little-tea-party", file: "/coloring/little-tea-party.svg", age: "5-7", kind: "svg", titles: { en: "Tea Party", fa: "مهمانی چای", fr: "Goûter", es: "Fiesta del té" } },
  { id: "little-sandbox", file: "/coloring/little-sandbox.svg", age: "5-7", kind: "svg", titles: { en: "Sandbox", fa: "جعبه شنی", fr: "Bac à sable", es: "Arenero" } },
  { id: "little-music-time", file: "/coloring/little-music-time.svg", age: "5-7", kind: "svg", titles: { en: "Music Time", fa: "وقت موسیقی", fr: "Musique", es: "Hora de música" } },
  { id: "little-rainy-walk", file: "/coloring/little-rainy-walk.svg", age: "5-7", kind: "svg", titles: { en: "Rainy Walk", fa: "پیاده‌روی بارانی", fr: "Promenade sous la pluie", es: "Paseo bajo la lluvia" } },
  { id: "little-lemonade", file: "/coloring/little-lemonade.svg", age: "5-7", kind: "svg", titles: { en: "Lemonade Stand", fa: "غرفه لیموناد", fr: "Stand de limonade", es: "Puesto de limonada" } },
  { id: "little-farm", file: "/coloring/little-farm.svg", age: "5-7", kind: "svg", titles: { en: "The Farm", fa: "مزرعه", fr: "La ferme", es: "La granja" } },
  { id: "little-pond-ducks", file: "/coloring/little-pond-ducks.svg", age: "5-7", kind: "svg", titles: { en: "Pond Ducks", fa: "اردک‌های برکه", fr: "Canards de l’étang", es: "Patos del estanque" } },
  { id: "little-snowman", file: "/coloring/little-snowman.svg", age: "5-7", kind: "svg", titles: { en: "Snowman", fa: "آدم‌برفی", fr: "Bonhomme de neige", es: "Muñeco de nieve" } },
  { id: "little-bakery-window", file: "/coloring/little-bakery-window.svg", age: "5-7", kind: "svg", titles: { en: "Bakery Window", fa: "ویترین نانوایی", fr: "Vitrine de boulangerie", es: "Escaparate de panadería" } },
  { id: "little-park-path", file: "/coloring/little-park-path.svg", age: "5-7", kind: "svg", titles: { en: "Park Path", fa: "مسیر پارک", fr: "Chemin du parc", es: "Camino del parque" } },
  { id: "kitchen", file: "/coloring/ages/7-10/kitchen.png", age: "7-10", kind: "png", titles: { en: "Busy Kitchen", fa: "آشپزخانه شلوغ", fr: "Cuisine animée", es: "Cocina animada" } },
  { id: "big-sisters-stage", file: "/coloring/big-sisters-stage.svg", age: "7-10", kind: "svg", titles: { en: "Sisters On Stage", fa: "خواهرها روی صحنه", fr: "Sœurs sur scène", es: "Hermanas en el escenario" } },
  { id: "big-magic-garden", file: "/coloring/big-magic-garden.svg", age: "7-10", kind: "svg", titles: { en: "Magic Garden", fa: "باغ جادویی", fr: "Jardin magique", es: "Jardín mágico" } },
  { id: "big-kitchen-baking", file: "/coloring/big-kitchen-baking.svg", age: "7-10", kind: "svg", titles: { en: "Kitchen Baking", fa: "آشپزی در آشپزخانه", fr: "Cuisine gourmande", es: "Cocina dulce" } },
  { id: "big-art-studio", file: "/coloring/big-art-studio.svg", age: "7-10", kind: "svg", titles: { en: "Art Studio", fa: "اتاق هنر", fr: "Atelier d’art", es: "Estudio de arte" } },
  { id: "big-playground-full", file: "/coloring/big-playground-full.svg", age: "7-10", kind: "svg", titles: { en: "Playground", fa: "زمین بازی", fr: "Aire de jeux", es: "Parque de juegos" } },
  { id: "big-cozy-bedroom", file: "/coloring/big-cozy-bedroom.svg", age: "7-10", kind: "svg", titles: { en: "Cozy Bedroom", fa: "اتاق خواب دنج", fr: "Chambre douillette", es: "Dormitorio acogedor" } },
  { id: "big-park-festival", file: "/coloring/big-park-festival.svg", age: "7-10", kind: "svg", titles: { en: "Park Festival", fa: "جشن پارک", fr: "Fête au parc", es: "Fiesta en el parque" } },
  { id: "big-library-nook", file: "/coloring/big-library-nook.svg", age: "7-10", kind: "svg", titles: { en: "Library Nook", fa: "گوشه کتابخانه", fr: "Coin bibliothèque", es: "Rincón de biblioteca" } },
  { id: "big-treehouse", file: "/coloring/big-treehouse.svg", age: "7-10", kind: "svg", titles: { en: "Treehouse", fa: "خانه درختی", fr: "Cabane dans l’arbre", es: "Casa del árbol" } },
  { id: "big-beach-day", file: "/coloring/big-beach-day.svg", age: "7-10", kind: "svg", titles: { en: "Beach Day", fa: "روز ساحل", fr: "Jour de plage", es: "Día de playa" } },
  { id: "big-city-walk", file: "/coloring/big-city-walk.svg", age: "7-10", kind: "svg", titles: { en: "City Walk", fa: "پیاده‌روی شهر", fr: "Promenade en ville", es: "Paseo por la ciudad" } },
  { id: "big-birthday-party", file: "/coloring/big-birthday-party.svg", age: "7-10", kind: "svg", titles: { en: "Birthday Party", fa: "جشن تولد", fr: "Fête d’anniversaire", es: "Fiesta de cumpleaños" } },
  { id: "big-camp-stars", file: "/coloring/big-camp-stars.svg", age: "7-10", kind: "svg", titles: { en: "Camp Stars", fa: "ستاره‌های کمپ", fr: "Camp sous les étoiles", es: "Campamento estrella" } },
  { id: "big-music-room", file: "/coloring/big-music-room.svg", age: "7-10", kind: "svg", titles: { en: "Music Room", fa: "اتاق موسیقی", fr: "Salle de musique", es: "Sala de música" } },
  { id: "big-snow-play", file: "/coloring/big-snow-play.svg", age: "7-10", kind: "svg", titles: { en: "Snow Play", fa: "بازی برفی", fr: "Jeux de neige", es: "Juegos de nieve" } },
  { id: "big-theater-show", file: "/coloring/big-theater-show.svg", age: "7-10", kind: "svg", titles: { en: "Theater Show", fa: "نمایش تئاتر", fr: "Spectacle", es: "Función de teatro" } },
  { id: "big-market-day", file: "/coloring/big-market-day.svg", age: "7-10", kind: "svg", titles: { en: "Market Day", fa: "روز بازار", fr: "Jour de marché", es: "Día de mercado" } },
  { id: "big-school-garden", file: "/coloring/big-school-garden.svg", age: "7-10", kind: "svg", titles: { en: "School Garden", fa: "باغ مدرسه", fr: "Jardin de l’école", es: "Jardín de la escuela" } },
  { id: "big-family-dinner", file: "/coloring/big-family-dinner.svg", age: "7-10", kind: "svg", titles: { en: "Family Dinner", fa: "شام خانوادگی", fr: "Dîner en famille", es: "Cena en familia" } },
  { id: "big-star-observatory", file: "/coloring/big-star-observatory.svg", age: "7-10", kind: "svg", titles: { en: "Star Night", fa: "شب ستاره‌ای", fr: "Nuit étoilée", es: "Noche de estrellas" } },
  { id: "big-classroom", file: "/coloring/big-classroom.svg", age: "7-10", kind: "svg", titles: { en: "Classroom", fa: "کلاس درس", fr: "Salle de classe", es: "Aula" } },
  { id: "big-bakery-shop", file: "/coloring/big-bakery-shop.svg", age: "7-10", kind: "svg", titles: { en: "Bakery Shop", fa: "نانوایی", fr: "Boulangerie", es: "Panadería" } },
  { id: "big-greenhouse", file: "/coloring/big-greenhouse.svg", age: "7-10", kind: "svg", titles: { en: "Greenhouse", fa: "گلخانه", fr: "Serre", es: "Invernadero" } },
  { id: "big-science-desk", file: "/coloring/big-science-desk.svg", age: "7-10", kind: "svg", titles: { en: "Science Desk", fa: "میز علوم", fr: "Table des sciences", es: "Mesa de ciencias" } },
  { id: "big-city-park", file: "/coloring/big-city-park.svg", age: "7-10", kind: "svg", titles: { en: "City Park", fa: "پارک شهر", fr: "Parc de la ville", es: "Parque de la ciudad" } },
  { id: "big-rainy-window", file: "/coloring/big-rainy-window.svg", age: "7-10", kind: "svg", titles: { en: "Rainy Window", fa: "پنجره بارانی", fr: "Fenêtre sous la pluie", es: "Ventana lluviosa" } }
];

export function coloringForAge(age: AgeBand) {
  return coloringCatalog.filter((page) => page.age === age);
}

export function coloringById(id: string) {
  return coloringCatalog.find((page) => page.id === id);
}
