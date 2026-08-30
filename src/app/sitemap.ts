import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { siteConfig } from "@/config/site";
import { gameCatalog } from "@/lib/games/catalog";
import { storyCatalog } from "@/lib/stories/catalog";
import { coloringCatalog } from "@/lib/coloring/catalog";

const routes = ["", "/watch", "/play", "/create", "/storyhouse", "/explore", "/about", "/parents", "/stickers"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.defaultUrl}/${locale}${route}`,
      lastModified: now,
      changeFrequency: route === "" || route === "/watch" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : route === "/watch" || route === "/play" ? 0.9 : 0.75,
      alternates: {
        languages: Object.fromEntries([
          ...locales.map((alt) => [alt, `${siteConfig.defaultUrl}/${alt}${route}`]),
          ["x-default", `${siteConfig.defaultUrl}/en${route}`]
        ])
      }
    }))
  );

  const games = locales.flatMap((locale) =>
    gameCatalog.map((game) => ({
      url: `${siteConfig.defaultUrl}/${locale}/play/${game.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  );

  const stories = storyCatalog.map((book) => ({
    url: `${siteConfig.defaultUrl}/${book.locale}/storyhouse/${book.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  const coloring = locales.flatMap((locale) =>
    coloringCatalog.map((page) => ({
      url: `${siteConfig.defaultUrl}/${locale}/create/color/${page.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  );

  return [...pages, ...games, ...stories, ...coloring];
}
