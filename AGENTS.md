# Vaphia engineering notes

- Preserve the four-locale architecture (`en`, `fa`, `fr`, `es`) and Persian RTL behavior.
- New public content must remain server-renderable and indexable.
- Keep canonical URLs, hreflang, sitemap and JSON-LD consistent when adding routes.
- Do not introduce rainbow site chrome. Rainbow is a Create tool mark only.
- Optional kid membership is allowed: picture + PIN created by a parent, never child email/password. The site must remain fully usable without login. No public child profiles.
- Any external tracking, advertising, messaging, payment or child-data collection requires a privacy review before implementation.
- Keep `/admin` noindex and authenticated. Owner CMS should cover copy, images, games, printables, stories, stickers, age-door copy and social URLs/embeds.
- Never commit credentials or Supabase service-role keys.
- Prefer semantic HTML, accessible labels, reduced-motion support and touch targets suitable for young children.
- Keep social identities centralized: YouTube/TikTok @vaphia; Instagram @vaphiaa.
