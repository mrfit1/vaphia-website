import type { AgeBand } from "@/lib/age";
import type { Locale } from "@/lib/i18n";

export type ColoringPage = {
  id: string;
  file: string;
  age: AgeBand;
  titles: Record<Locale, string>;
};

export const coloringCatalog: ColoringPage[] = [
  { id: "tiny-big-star", file: "/coloring/tiny-big-star.svg", age: "3-5", titles: { en: "Big Star", fa: "Big Star", fr: "Big Star", es: "Big Star" } },
  { id: "tiny-big-heart", file: "/coloring/tiny-big-heart.svg", age: "3-5", titles: { en: "Big Heart", fa: "Big Heart", fr: "Big Heart", es: "Big Heart" } },
  { id: "tiny-big-balloon", file: "/coloring/tiny-big-balloon.svg", age: "3-5", titles: { en: "Big Balloon", fa: "Big Balloon", fr: "Big Balloon", es: "Big Balloon" } },
  { id: "tiny-big-sun", file: "/coloring/tiny-big-sun.svg", age: "3-5", titles: { en: "Big Sun", fa: "Big Sun", fr: "Big Sun", es: "Big Sun" } },
  { id: "tiny-big-flower", file: "/coloring/tiny-big-flower.svg", age: "3-5", titles: { en: "Big Flower", fa: "Big Flower", fr: "Big Flower", es: "Big Flower" } },
  { id: "tiny-big-cupcake", file: "/coloring/tiny-big-cupcake.svg", age: "3-5", titles: { en: "Big Cupcake", fa: "Big Cupcake", fr: "Big Cupcake", es: "Big Cupcake" } },
  { id: "tiny-big-cloud", file: "/coloring/tiny-big-cloud.svg", age: "3-5", titles: { en: "Big Cloud", fa: "Big Cloud", fr: "Big Cloud", es: "Big Cloud" } },
  { id: "tiny-sophia-smile", file: "/coloring/tiny-sophia-smile.svg", age: "3-5", titles: { en: "Sophia Smile", fa: "Sophia Smile", fr: "Sophia Smile", es: "Sophia Smile" } },
  { id: "tiny-vania-smile", file: "/coloring/tiny-vania-smile.svg", age: "3-5", titles: { en: "Vania Smile", fa: "Vania Smile", fr: "Vania Smile", es: "Vania Smile" } },
  { id: "tiny-big-house", file: "/coloring/tiny-big-house.svg", age: "3-5", titles: { en: "Big House", fa: "Big House", fr: "Big House", es: "Big House" } },
  { id: "tiny-big-apple", file: "/coloring/tiny-big-apple.svg", age: "3-5", titles: { en: "Big Apple", fa: "Big Apple", fr: "Big Apple", es: "Big Apple" } },
  { id: "tiny-big-bunny", file: "/coloring/tiny-big-bunny.svg", age: "3-5", titles: { en: "Big Bunny", fa: "Big Bunny", fr: "Big Bunny", es: "Big Bunny" } },
  { id: "tiny-two-stars", file: "/coloring/tiny-two-stars.svg", age: "3-5", titles: { en: "Two Stars", fa: "Two Stars", fr: "Two Stars", es: "Two Stars" } },
  { id: "tiny-heart-star", file: "/coloring/tiny-heart-star.svg", age: "3-5", titles: { en: "Heart and Star", fa: "Heart and Star", fr: "Heart and Star", es: "Heart and Star" } },
  { id: "tiny-big-moon", file: "/coloring/tiny-big-moon.svg", age: "3-5", titles: { en: "Big Moon", fa: "Big Moon", fr: "Big Moon", es: "Big Moon" } },
  { id: "tiny-simple-gift", file: "/coloring/tiny-simple-gift.svg", age: "3-5", titles: { en: "A Gift", fa: "A Gift", fr: "A Gift", es: "A Gift" } },
  { id: "tiny-big-tree", file: "/coloring/tiny-big-tree.svg", age: "3-5", titles: { en: "Big Tree", fa: "Big Tree", fr: "Big Tree", es: "Big Tree" } },
  { id: "tiny-simple-boat", file: "/coloring/tiny-simple-boat.svg", age: "3-5", titles: { en: "A Boat", fa: "A Boat", fr: "A Boat", es: "A Boat" } },
  { id: "tiny-big-fish", file: "/coloring/tiny-big-fish.svg", age: "3-5", titles: { en: "A Fish", fa: "A Fish", fr: "A Fish", es: "A Fish" } },
  { id: "tiny-lolly", file: "/coloring/tiny-lolly.svg", age: "3-5", titles: { en: "A Lolly", fa: "A Lolly", fr: "A Lolly", es: "A Lolly" } },
  { id: "little-sisters-hands", file: "/coloring/little-sisters-hands.svg", age: "5-7", titles: { en: "Sisters Hold Hands", fa: "Sisters Hold Hands", fr: "Sisters Hold Hands", es: "Sisters Hold Hands" } },
  { id: "little-garden-flowers", file: "/coloring/little-garden-flowers.svg", age: "5-7", titles: { en: "Garden Flowers", fa: "Garden Flowers", fr: "Garden Flowers", es: "Garden Flowers" } },
  { id: "little-park-swing", file: "/coloring/little-park-swing.svg", age: "5-7", titles: { en: "Park Swing", fa: "Park Swing", fr: "Park Swing", es: "Park Swing" } },
  { id: "little-cupcake-stand", file: "/coloring/little-cupcake-stand.svg", age: "5-7", titles: { en: "Cupcake Stand", fa: "Cupcake Stand", fr: "Cupcake Stand", es: "Cupcake Stand" } },
  { id: "little-star-sky", file: "/coloring/little-star-sky.svg", age: "5-7", titles: { en: "Star Sky", fa: "Star Sky", fr: "Star Sky", es: "Star Sky" } },
  { id: "little-play-room", file: "/coloring/little-play-room.svg", age: "5-7", titles: { en: "Play Room", fa: "Play Room", fr: "Play Room", es: "Play Room" } },
  { id: "little-kite-day", file: "/coloring/little-kite-day.svg", age: "5-7", titles: { en: "Kite Day", fa: "Kite Day", fr: "Kite Day", es: "Kite Day" } },
  { id: "little-boat-pond", file: "/coloring/little-boat-pond.svg", age: "5-7", titles: { en: "Boat Pond", fa: "Boat Pond", fr: "Boat Pond", es: "Boat Pond" } },
  { id: "little-ice-cream", file: "/coloring/little-ice-cream.svg", age: "5-7", titles: { en: "Ice Cream", fa: "Ice Cream", fr: "Ice Cream", es: "Ice Cream" } },
  { id: "little-paint-table", file: "/coloring/little-paint-table.svg", age: "5-7", titles: { en: "Paint Table", fa: "Paint Table", fr: "Paint Table", es: "Paint Table" } },
  { id: "little-story-nook", file: "/coloring/little-story-nook.svg", age: "5-7", titles: { en: "Story Nook", fa: "Story Nook", fr: "Story Nook", es: "Story Nook" } },
  { id: "little-butterfly-garden", file: "/coloring/little-butterfly-garden.svg", age: "5-7", titles: { en: "Butterfly Garden", fa: "Butterfly Garden", fr: "Butterfly Garden", es: "Butterfly Garden" } },
  { id: "little-number-train", file: "/coloring/little-number-train.svg", age: "5-7", titles: { en: "A Train", fa: "A Train", fr: "A Train", es: "A Train" } },
  { id: "little-simple-castle", file: "/coloring/little-simple-castle.svg", age: "5-7", titles: { en: "A Castle", fa: "A Castle", fr: "A Castle", es: "A Castle" } },
  { id: "little-picnic", file: "/coloring/little-picnic.svg", age: "5-7", titles: { en: "Picnic", fa: "Picnic", fr: "Picnic", es: "Picnic" } },
  { id: "little-camera-fun", file: "/coloring/little-camera-fun.svg", age: "5-7", titles: { en: "Camera Fun", fa: "Camera Fun", fr: "Camera Fun", es: "Camera Fun" } },
  { id: "little-tea-party", file: "/coloring/little-tea-party.svg", age: "5-7", titles: { en: "Tea Party", fa: "Tea Party", fr: "Tea Party", es: "Tea Party" } },
  { id: "little-sandbox", file: "/coloring/little-sandbox.svg", age: "5-7", titles: { en: "Sandbox", fa: "Sandbox", fr: "Sandbox", es: "Sandbox" } },
  { id: "little-music-time", file: "/coloring/little-music-time.svg", age: "5-7", titles: { en: "Music Time", fa: "Music Time", fr: "Music Time", es: "Music Time" } },
  { id: "little-rainy-walk", file: "/coloring/little-rainy-walk.svg", age: "5-7", titles: { en: "Rainy Walk", fa: "Rainy Walk", fr: "Rainy Walk", es: "Rainy Walk" } },
  { id: "big-sisters-stage", file: "/coloring/big-sisters-stage.svg", age: "7-10", titles: { en: "Sisters On Stage", fa: "Sisters On Stage", fr: "Sisters On Stage", es: "Sisters On Stage" } },
  { id: "big-magic-garden", file: "/coloring/big-magic-garden.svg", age: "7-10", titles: { en: "Magic Garden", fa: "Magic Garden", fr: "Magic Garden", es: "Magic Garden" } },
  { id: "big-kitchen-baking", file: "/coloring/big-kitchen-baking.svg", age: "7-10", titles: { en: "Kitchen Baking", fa: "Kitchen Baking", fr: "Kitchen Baking", es: "Kitchen Baking" } },
  { id: "big-art-studio", file: "/coloring/big-art-studio.svg", age: "7-10", titles: { en: "Art Studio", fa: "Art Studio", fr: "Art Studio", es: "Art Studio" } },
  { id: "big-playground-full", file: "/coloring/big-playground-full.svg", age: "7-10", titles: { en: "Playground", fa: "Playground", fr: "Playground", es: "Playground" } },
  { id: "big-cozy-bedroom", file: "/coloring/big-cozy-bedroom.svg", age: "7-10", titles: { en: "Cozy Bedroom", fa: "Cozy Bedroom", fr: "Cozy Bedroom", es: "Cozy Bedroom" } },
  { id: "big-park-festival", file: "/coloring/big-park-festival.svg", age: "7-10", titles: { en: "Park Festival", fa: "Park Festival", fr: "Park Festival", es: "Park Festival" } },
  { id: "big-library-nook", file: "/coloring/big-library-nook.svg", age: "7-10", titles: { en: "Library Nook", fa: "Library Nook", fr: "Library Nook", es: "Library Nook" } },
  { id: "big-treehouse", file: "/coloring/big-treehouse.svg", age: "7-10", titles: { en: "Treehouse", fa: "Treehouse", fr: "Treehouse", es: "Treehouse" } },
  { id: "big-beach-day", file: "/coloring/big-beach-day.svg", age: "7-10", titles: { en: "Beach Day", fa: "Beach Day", fr: "Beach Day", es: "Beach Day" } },
  { id: "big-city-walk", file: "/coloring/big-city-walk.svg", age: "7-10", titles: { en: "City Walk", fa: "City Walk", fr: "City Walk", es: "City Walk" } },
  { id: "big-birthday-party", file: "/coloring/big-birthday-party.svg", age: "7-10", titles: { en: "Birthday Party", fa: "Birthday Party", fr: "Birthday Party", es: "Birthday Party" } },
  { id: "big-camp-stars", file: "/coloring/big-camp-stars.svg", age: "7-10", titles: { en: "Camp Stars", fa: "Camp Stars", fr: "Camp Stars", es: "Camp Stars" } },
  { id: "big-music-room", file: "/coloring/big-music-room.svg", age: "7-10", titles: { en: "Music Room", fa: "Music Room", fr: "Music Room", es: "Music Room" } },
  { id: "big-snow-play", file: "/coloring/big-snow-play.svg", age: "7-10", titles: { en: "Snow Play", fa: "Snow Play", fr: "Snow Play", es: "Snow Play" } },
  { id: "big-theater-show", file: "/coloring/big-theater-show.svg", age: "7-10", titles: { en: "Theater Show", fa: "Theater Show", fr: "Theater Show", es: "Theater Show" } },
  { id: "big-market-day", file: "/coloring/big-market-day.svg", age: "7-10", titles: { en: "Market Day", fa: "Market Day", fr: "Market Day", es: "Market Day" } },
  { id: "big-school-garden", file: "/coloring/big-school-garden.svg", age: "7-10", titles: { en: "School Garden", fa: "School Garden", fr: "School Garden", es: "School Garden" } },
  { id: "big-family-dinner", file: "/coloring/big-family-dinner.svg", age: "7-10", titles: { en: "Family Dinner", fa: "Family Dinner", fr: "Family Dinner", es: "Family Dinner" } },
  { id: "big-star-observatory", file: "/coloring/big-star-observatory.svg", age: "7-10", titles: { en: "Star Night", fa: "Star Night", fr: "Star Night", es: "Star Night" } }
];

export function coloringForAge(age: AgeBand | null) {
  if (!age) return coloringCatalog;
  return coloringCatalog.filter((page) => page.age === age);
}

export function coloringById(id: string) {
  return coloringCatalog.find((page) => page.id === id);
}
