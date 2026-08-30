import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, Star, Cloud, Flower2, WandSparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { HomeActions } from "@/components/HomeActions";
import { GrownUpSocialLink } from "@/components/SocialIcons";
import { getGlobalSettings, getPageContent } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { uiCopy } from "@/lib/ui-copy";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = await getPageContent(locale, "home");
  return buildMetadata(locale, "home", content);
}

const placeIcons = [Cloud, Flower2, Star, Heart, WandSparkles, Sparkles];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const t = uiCopy[locale];
  const [content, settings] = await Promise.all([
    getPageContent(locale, "home"),
    getGlobalSettings()
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.defaultUrl}/#website`,
        url: siteConfig.defaultUrl,
        name: settings.brandName,
        inLanguage: ["en", "fa", "fr", "es"],
        description: content.metaDescription,
        publisher: { "@id": `${siteConfig.defaultUrl}/#brand` }
      },
      {
        "@type": "Brand",
        "@id": `${siteConfig.defaultUrl}/#brand`,
        name: settings.brandName,
        url: siteConfig.defaultUrl,
        sameAs: [settings.youtubeUrl, settings.tiktokUrl, settings.instagramUrl]
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.defaultUrl}/#vania`,
        name: "Vania",
        url: `${siteConfig.defaultUrl}/${locale}/about`
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.defaultUrl}/#sophia`,
        name: "Sophia",
        url: `${siteConfig.defaultUrl}/${locale}/about`
      }
    ]
  };

  return (
    <main>
      <section className="home-hero shell">
        <div className="hero-copy">
          <span className="claim-pill">{content.claim}</span>
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
          <HomeActions locale={locale} content={content} />
          <div className="hero-socials" aria-label="Social media">
            <span className="mini-label">{t.official as string}</span>
            <GrownUpSocialLink name="youtube" href={settings.youtubeUrl} locale={locale} />
            <GrownUpSocialLink name="tiktok" href={settings.tiktokUrl} locale={locale} />
            <GrownUpSocialLink name="instagram" href={settings.instagramUrl} locale={locale} />
          </div>
        </div>

        <div className="hero-picture-wrap">
          <div className="hero-picture">
            <Image
              src={settings.heroImage}
              alt="Vania and Sophia from Vaphia"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              priority
              className="cover-image"
            />
          </div>
          <span className="float-sticker sticker-one"><Heart fill="currentColor" /></span>
          <span className="float-sticker sticker-two"><Star fill="currentColor" /></span>
          <span className="float-sticker sticker-three"><Sparkles /></span>
        </div>
      </section>

      <section className="brand-banner shell" aria-label="Vaphia">
        <Image
          src={settings.bannerImage}
          alt="Vaphia with Vania and Sophia"
          width={1366}
          height={768}
          sizes="(max-width: 1200px) 100vw, 1180px"
        />
      </section>

      <section className="home-section shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Vaphia</span>
            <h2>{content.latestTitle}</h2>
          </div>
          <Link className="text-link" href={`/${locale}/watch`}>YouTube →</Link>
        </div>
        <div className="video-teasers">
          {(t.latestCards as string[]).map((title, index) => (
            <Link key={title} href={`/${locale}/watch`} className={`video-teaser teaser-${index + 1}`}>
              <span className="video-badge"><FilmIcon /></span>
              <strong>{title}</strong>
              <span>{t.latestCardText as string}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="world-zone">
        <div className="shell">
          <div className="section-heading centered">
            <div>
              <span className="eyebrow">{t.exploreEyebrow as string}</span>
              <h2>{content.worldTitle}</h2>
            </div>
          </div>
          <div className="world-grid">
            {(t.places as string[]).map((place, index) => {
              const Icon = placeIcons[index];
              return (
                <Link href={`/${locale}/explore`} className={`world-tile world-${index + 1}`} key={place}>
                  <span className="world-visual"><Icon size={48} strokeWidth={2.1} /></span>
                  <strong>{place}</strong>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="home-section shell sisters-section">
        <div className="section-heading centered">
          <div>
            <span className="eyebrow">Vania + Sophia</span>
            <h2>{content.meetTitle}</h2>
          </div>
        </div>
        <div className="sister-cards">
          <article className="sister-card vania-card">
            <span className="sister-symbol"><Star /></span>
            <h3>Vania</h3>
            <p>{t.vaniaDesc as string}</p>
          </article>
          <article className="sister-card sophia-card">
            <span className="sister-symbol"><Flower2 /></span>
            <h3>Sophia</h3>
            <p>{t.sophiaDesc as string}</p>
          </article>
        </div>
      </section>

      <section className="parent-callout">
        <div className="shell parent-callout-inner">
          <div>
            <span className="eyebrow light-eyebrow">{t.grownups as string}</span>
            <h2>{content.parentsTitle}</h2>
          </div>
          <Link className="button white-button" href={`/${locale}/parents`}>{t.parentsPrivacy as string}</Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}

function FilmIcon() {
  return <span aria-hidden="true">▶</span>;
}
