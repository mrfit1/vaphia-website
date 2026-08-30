import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { getGlobalSettings } from "@/lib/content";
import { isLocale, localeDirections, type Locale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGlobalSettings();
  const bingToken = settings.bingVerification || process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "";

  return {
    metadataBase: new URL(siteConfig.defaultUrl),
    title: {
      default: "Vaphia",
      template: "%s | Vaphia"
    },
    description: "The official Vaphia website featuring Vania and Sophia.",
    applicationName: "Vaphia",
    category: "family entertainment",
    icons: { icon: "/icon.svg" },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    verification: {
      google: settings.googleVerification || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
      other: bingToken ? { "msvalidate.01": bingToken } : undefined
    }
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fff8fd"
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get("x-vaphia-locale") || "en";
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : "en";

  return (
    <html lang={locale} dir={localeDirections[locale]} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
