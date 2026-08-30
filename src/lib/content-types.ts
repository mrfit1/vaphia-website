import type { Locale } from "./i18n";

export type PageKey = "home" | "watch" | "play" | "create" | "explore" | "parents" | "about";

export type PageContent = Record<string, string>;

export type SiteContent = Record<Locale, Record<PageKey, PageContent>>;

export type GlobalSettings = {
  brandName: string;
  heroImage: string;
  bannerImage: string;
  youtubeUrl: string;
  tiktokUrl: string;
  instagramUrl: string;
  googleVerification: string;
  bingVerification: string;
  gamesEnabled: string[];
};
