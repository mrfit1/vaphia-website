import type { Locale } from "./i18n";

export type PageKey = "home" | "watch" | "play" | "create" | "explore" | "storyhouse" | "parents" | "about";

export type PageContent = Record<string, string>;

export type SiteContent = Record<Locale, Record<PageKey, PageContent>>;

export type GlobalSettings = {
  brandName: string;
  heroImage: string;
  bannerImage: string;
  youtubeUrl: string;
  tiktokUrl: string;
  instagramUrl: string;
  youtubeEmbed?: string;
  tiktokEmbed?: string;
  instagramEmbed?: string;
  googleVerification: string;
  bingVerification: string;
  gamesEnabled: string[];
  heroImageNote?: string;
  bannerImageNote?: string;
};
