import type { SceneId } from "@/lib/stories/scenes";

export const ART = {
  bedroom: "/art/story-bedroom.png",
  park: "/art/story-park.png",
  stars: "/art/story-stars.png",
  balloons: "/art/game-balloons.png",
  tokens: "/art/game-tokens.png",
  hide: "/art/game-hide.png"
} as const;

export const TOKEN_IDS = ["star", "heart", "cupcake", "flower", "balloon", "moon", "sun", "bunny"] as const;
export type TokenId = (typeof TOKEN_IDS)[number];

const TOKEN_GRID: Record<TokenId, { col: number; row: number }> = {
  star: { col: 0, row: 0 },
  heart: { col: 1, row: 0 },
  cupcake: { col: 2, row: 0 },
  flower: { col: 3, row: 0 },
  balloon: { col: 0, row: 1 },
  moon: { col: 1, row: 1 },
  sun: { col: 2, row: 1 },
  bunny: { col: 3, row: 1 }
};

export function isTokenId(value: string): value is TokenId {
  return (TOKEN_IDS as readonly string[]).includes(value);
}

export function tokenStyle(id: TokenId) {
  const { col, row } = TOKEN_GRID[id];
  return {
    backgroundImage: `url(${ART.tokens})`,
    backgroundSize: "400% 200%",
    backgroundPosition: `${(col / 3) * 100}% ${row * 100}%`,
    backgroundRepeat: "no-repeat"
  } as const;
}

const STAR_SCENES: SceneId[] = ["garden-star", "hill-star", "night-moon", "window-star", "bed-moon"];
const PARK_SCENES: SceneId[] = ["garden-apple", "rain-yard", "garden-butterfly", "garden-whisper", "park-tree"];

export function storyArtSrc(scene: SceneId, pageIndex: number): string {
  if (STAR_SCENES.includes(scene)) return pageIndex % 2 === 0 ? ART.stars : ART.park;
  if (PARK_SCENES.includes(scene)) return pageIndex % 2 === 0 ? ART.park : ART.stars;
  const indoor = [ART.bedroom, ART.bedroom, ART.park] as const;
  return indoor[pageIndex % indoor.length];
}
