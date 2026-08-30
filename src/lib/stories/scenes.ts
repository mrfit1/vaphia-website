export type SceneId =
  | "room-balloon" | "room-window" | "garden-star" | "kitchen-share"
  | "night-moon" | "room-cat" | "garden-apple" | "rain-yard"
  | "window-star" | "garden-butterfly" | "kitchen-secret" | "bath-bubbles"
  | "garden-whisper" | "room-paper-moon" | "room-train" | "kitchen-honey"
  | "park-tree" | "hill-star" | "sofa-still" | "bed-moon";

export const storyArt = {
  bedroom: "/art/story-bedroom.png",
  park: "/art/story-park.png",
  stars: "/art/story-stars.png",
  kitchen: "/art/story-kitchen.png",
  paint: "/art/story-paint.png",
  garden: "/art/story-garden.png",
  hero: "/images/vaphia-hero.jpg",
  banner: "/images/vaphia-banner.jpg"
} as const;

export type StoryArtPath = (typeof storyArt)[keyof typeof storyArt];
