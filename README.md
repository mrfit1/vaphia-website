# Vaphia

Production-oriented Next.js website for **Vania & Sophia / Vaphia**, prepared for GitHub + Vercel.

## Included

- Next.js 16.3.3 (August 2026 security release line)
- Four localized routes: English, Persian, French, Spanish
- RTL support for Persian
- Localized metadata, canonical URLs, hreflang alternates and multilingual sitemap
- Google/Bing verification hooks
- Search/AI discoverability: SSR public content, structured data, robots rules for major search crawlers and OAI-SearchBot, plus `/llms.txt`
- Mobile-first child-friendly UI with large visual action cards and motion/reduced-motion handling
- Do not use rainbows as site-wide chrome. Rainbow is a drawing crayon/tool only.
- Social links: YouTube/TikTok `@vaphia`, Instagram `@vaphiaa`
- Grown-up gate before external social links by default
- Vaphia World homepage with persisted age door (3–5 / 5–7 / 7–10)
- Four lands: Watch, Play, Create, Storyhouse
- 30 finger games with sound, cheers, levels and sticker rewards
- Drawing studio with glitter, sparkle, neon, rainbow, eraser, stickers, PNG + giant PRINT
- 60 unique printable coloring sheets (20 per age band), SVG/PNG/print
- Separate Storyhouse shelves: animated picture books to read and a dedicated audiobook library
- Six original audiobook entries per language, with a rights-first recording status and gentle female narration brief
- Optional kid membership via picture + PIN created by a parent; site works without login
- Vaphia Stars stored locally on the device
- Drawing pad, interactive coloring studio and printable coloring SVG
- Parents & Privacy page with working device settings
- Private admin/CMS architecture using Supabase Auth + Postgres + Storage
- Admin editing for localized page copy, SEO title/description, social links, search verification, game toggles and hero/banner images
- Security headers including CSP, HSTS, frame protection and restrictive permissions policy
- GitHub CI (lint + typecheck + production build) and weekly Dependabot dependency checks
- No child account, email collection, behavioral ads or analytics by default

## GitHub upload

Upload the **contents of this project folder** to the repository root. Do not upload the ZIP itself.

Important root files/folders include:

- `package.json`
- `next.config.ts`
- `src/`
- `public/`
- `supabase/`
- `.env.example`

## Vercel

Import the GitHub repository into Vercel. Framework should be detected as Next.js automatically.

Set:

```env
NEXT_PUBLIC_SITE_URL=https://YOUR-DOMAIN.com
NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/@vaphia
NEXT_PUBLIC_TIKTOK_URL=https://www.tiktok.com/@vaphia
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/vaphiaa/
```

When the real custom domain is connected, `NEXT_PUBLIC_SITE_URL` must be changed to that canonical domain before submitting the sitemap to search engines.

## Admin setup

The public site works without Supabase. Supabase is only required to make `/admin` edits persist on Vercel.

1. Create a Supabase project.
2. Open Supabase SQL Editor and run `supabase/schema.sql`.
3. Create your owner account under Authentication → Users.
4. Copy that user UUID and run:

```sql
insert into public.admins(user_id) values ('YOUR-AUTH-USER-UUID');
```

5. Add to Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-PUBLISHABLE-OR-ANON-KEY
```

6. Redeploy and open `/admin`.

For security, do not put a Supabase service-role key in any `NEXT_PUBLIC_*` variable.

## SEO / AI launch checklist

After the final domain is connected:

1. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain.
2. Add the site to Google Search Console and Bing Webmaster Tools.
3. Add verification tokens in Vercel or from the Vaphia Admin panel.
4. Submit `/sitemap.xml`.
5. Confirm `/robots.txt`, `/llms.txt` and `/api/public-content?lang=en` return successfully.
6. Inspect each language variant and verify canonical/hreflang output.
7. Add real video data/thumbnails when final YouTube video URLs are chosen.
8. Do not add child-targeted behavioral advertising or personal-data forms without a dedicated legal/privacy review.

## Content architecture

Static defaults live in `src/content.ts`. If Supabase is configured, admin overrides are merged over those defaults. That means the site remains deployable and readable even if the CMS is temporarily unavailable.

### Storyhouse audio

`src/lib/stories/audio-catalog.ts` contains the original audio-book records for English, Persian, French and Spanish. The public UI only treats an item as playable when its `audioSrc` is populated. Add only a Vaphia-owned or separately rights-cleared recording, preferably as an optimized MP3/M4A under `public/audio/` (or a controlled storage URL), then set `audioSrc` and `recording: "ready"`. Browser speech synthesis is intentionally not used as a substitute for a real narrator.

## Adding a new language

Add the locale to `src/lib/i18n.ts`, add its content object in `src/content.ts`, add UI translations in `src/lib/ui-copy.ts`, then update the SQL locale constraint if the CMS should edit it.

## Adding a new game

Create a client component in `src/components/games/`, add its ID to `GlobalSettings.gamesEnabled`, expose the toggle in Admin, and render it in the localized Play page. Keep child gameplay account-free unless there is a specific, privacy-reviewed reason to add an adult-managed account system.


## Optional membership

The public site is fully usable without login. A parent may create an optional kid card with a picture avatar and a 3-picture PIN. No child email or password. Progress (stars, stickers, drawings, age band) stays on-device unless a household is later synced through Supabase.

Parent email is only for the household adult. No public child profiles, comments, ads or tracking.

## Owner CMS

`/admin` stays noindex and authenticated. When Supabase is connected, the owner can edit all localized page copy, upload hero/banner images, enable/order games, and set official YouTube/TikTok/Instagram URLs plus embed URLs. Stories, printables and stickers ship with rich defaults and can be overridden through `cms_json` / page copy. Never put a service-role key in `NEXT_PUBLIC_*`.
