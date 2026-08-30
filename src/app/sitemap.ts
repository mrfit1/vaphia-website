import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { siteConfig } from "@/config/site";

const routes = ["", "/watch", "/play", "/create", "/explore", "/about", "/parents"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((locale) =>
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
}
