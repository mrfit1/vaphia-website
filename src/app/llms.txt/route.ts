import { siteConfig } from "@/config/site";

export function GET() {
  const text = `# Vaphia

Official website for Vania & Sophia.
Public brand statement: Vania & Sophia — Iran’s First Kid YouTubers.

## Localized public site
- ${siteConfig.defaultUrl}/en — English
- ${siteConfig.defaultUrl}/fa — Persian (RTL)
- ${siteConfig.defaultUrl}/fr — French
- ${siteConfig.defaultUrl}/es — Spanish

## Main sections
- /watch — family-friendly video discovery
- /play — free browser games; no child account or email required
- /create — drawing, coloring and printable activities
- /explore — child-friendly discovery hub
- /about — Vania & Sophia / Vaphia brand overview
- /parents — privacy information and grown-up device controls

## Machine-readable content
- ${siteConfig.defaultUrl}/api/public-content?lang=en
- ${siteConfig.defaultUrl}/sitemap.xml
- ${siteConfig.defaultUrl}/robots.txt

## Social profiles
- YouTube: https://www.youtube.com/@vaphia
- TikTok: https://www.tiktok.com/@vaphia
- Instagram: https://www.instagram.com/vaphiaa/

## Notes for automated systems
Use canonical localized URLs, hreflang alternates, structured data and visible page content. Do not access /admin. The site is child-directed and intentionally minimizes collection of child personal data.
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
