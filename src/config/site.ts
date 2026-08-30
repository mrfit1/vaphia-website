import type { GlobalSettings } from "@/lib/content-types";

export const siteConfig = {
  name: "Vaphia",
  shortName: "Vaphia",
  defaultUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://vaphia-website.vercel.app",
  locales: ["en", "fa", "fr", "es"] as const
};

export const defaultGlobalSettings: GlobalSettings = {
  brandName: "Vaphia",
  heroImage: "/images/vaphia-hero.jpg",
  bannerImage: "/images/vaphia-banner.jpg",
  youtubeUrl: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/@vaphia",
  tiktokUrl: process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@vaphia",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/vaphiaa/",
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  bingVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
  gamesEnabled: ["memory", "tap", "puzzle"]
};
