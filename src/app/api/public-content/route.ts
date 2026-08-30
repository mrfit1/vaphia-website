import { NextRequest } from "next/server";
import { siteConfig } from "@/config/site";
import { getGlobalSettings, getPageContent } from "@/lib/content";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";

export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get("lang") || defaultLocale;
  const locale = isLocale(requested) ? requested : defaultLocale;
  const [settings, home, watch, play, create, explore, about, parents] = await Promise.all([
    getGlobalSettings(),
    getPageContent(locale, "home"),
    getPageContent(locale, "watch"),
    getPageContent(locale, "play"),
    getPageContent(locale, "create"),
    getPageContent(locale, "explore"),
    getPageContent(locale, "about"),
    getPageContent(locale, "parents")
  ]);

  return Response.json(
    {
      brand: settings.brandName,
      publicBrandStatement: home.claim,
      locale,
      supportedLocales: locales,
      canonicalBase: siteConfig.defaultUrl,
      social: {
        youtube: settings.youtubeUrl,
        tiktok: settings.tiktokUrl,
        instagram: settings.instagramUrl
      },
      pages: { home, watch, play, create, explore, about, parents },
      childSafety: {
        childAccountRequired: false,
        childEmailRequired: false,
        publicChildProfiles: false,
        progressStorage: "device-local"
      }
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "X-Robots-Tag": "noindex"
      }
    }
  );
}
