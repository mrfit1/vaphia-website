import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/admin/"] },
      { userAgent: "Googlebot", allow: "/", disallow: ["/admin", "/admin/"] },
      { userAgent: "Bingbot", allow: "/", disallow: ["/admin", "/admin/"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/admin", "/admin/"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/admin", "/admin/"] }
    ],
    sitemap: `${siteConfig.defaultUrl}/sitemap.xml`,
    host: siteConfig.defaultUrl
  };
}
