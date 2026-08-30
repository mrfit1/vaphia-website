import type { AgeBand } from "@/lib/age";
import type { StickerId } from "@/lib/stickers";

export type KidAvatar = "sophia" | "vania" | "star" | "heart" | "bunny" | "sun";
export type PinMark = "star" | "heart" | "cupcake" | "flower" | "balloon" | "moon";

export type KidProfile = {
  id: string;
  name: string;
  avatar: KidAvatar;
  pin: PinMark[];
  ageBand: AgeBand;
  createdAt: string;
};

export type Household = {
  parentHint: string;
  kids: KidProfile[];
  activeKidId: string | null;
};

const KEY = "vaphia-household";
export const avatars: KidAvatar[] = ["sophia", "vania", "star", "heart", "bunny", "sun"];
export const pinMarks: PinMark[] = ["star", "heart", "cupcake", "flower", "balloon", "moon"];

export const avatarMarks: Record<KidAvatar, string> = {
  sophia: "🌸",
  vania: "⭐",
  star: "🌟",
  heart: "💖",
  bunny: "🐰",
  sun: "☀️"
};

export const pinIcons: Record<PinMark, string> = {
  star: "⭐",
  heart: "💖",
  cupcake: "🧁",
  flower: "🌸",
  balloon: "🎈",
  moon: "🌙"
};

export function emptyHousehold(): Household {
  return { parentHint: "", kids: [], activeKidId: null };
}

export function readHousehold(): Household {
  if (typeof window === "undefined") return emptyHousehold();
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...emptyHousehold(), ...JSON.parse(raw) } : emptyHousehold();
  } catch {
    return emptyHousehold();
  }
}

export function writeHousehold(next: Household) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("vaphia-household"));
}

export function activeKid() {
  const house = readHousehold();
  return house.kids.find((kid) => kid.id === house.activeKidId) || null;
}

export function addKid(input: Omit<KidProfile, "id" | "createdAt">) {
  const house = readHousehold();
  const kid: KidProfile = {
    ...input,
    id: `kid-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  writeHousehold({ ...house, kids: [...house.kids, kid], activeKidId: kid.id });
  return kid;
}

export function signInKid(id: string, pin: PinMark[]) {
  const house = readHousehold();
  const kid = house.kids.find((item) => item.id === id);
  if (!kid) return false;
  if (kid.pin.length !== pin.length || kid.pin.some((mark, index) => mark !== pin[index])) return false;
  writeHousehold({ ...house, activeKidId: id });
  return true;
}

export function signOutKid() {
  const house = readHousehold();
  writeHousehold({ ...house, activeKidId: null });
}

export type KidProgress = {
  stars: number;
  stickers: StickerId[];
  drawings: string[];
  storiesRead: string[];
  gamesWon: string[];
};

const progressKey = (kidId: string) => `vaphia-kid-progress:${kidId}`;

export function readKidProgress(kidId: string): KidProgress {
  if (typeof window === "undefined") {
    return { stars: 0, stickers: [], drawings: [], storiesRead: [], gamesWon: [] };
  }
  try {
    const raw = window.localStorage.getItem(progressKey(kidId));
    return raw
      ? { stars: 0, stickers: [], drawings: [], storiesRead: [], gamesWon: [], ...JSON.parse(raw) }
      : { stars: 0, stickers: [], drawings: [], storiesRead: [], gamesWon: [] };
  } catch {
    return { stars: 0, stickers: [], drawings: [], storiesRead: [], gamesWon: [] };
  }
}

export function writeKidProgress(kidId: string, next: KidProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(progressKey(kidId), JSON.stringify(next));
}
