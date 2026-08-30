import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HomeActions } from "@/components/HomeActions";
import { GrownUpSocialLink } from "@/components/SocialIcons";
import { Mark, type MarkId } from "@/components/marks/VaphiaMarks";
import { getGlobalSettings, getPageContent } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { uiCopy } from "@/lib/ui-copy";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "home", await getPageContent(locale, "home"));
}

const placeIcons: MarkId[] = ["cloud", "flower", "star", "heart", "create", "sparkle"];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const t = uiCopy[locale];
  const [content, settings] = await Promise.all([
    getPageContent(locale, "home"),
    getGlobalSettings()
  ]);

  const heroImage = settings.heroImage || "/images/vaphia-hero.jpg";
  const bannerImage = settings.bannerImage || "/images/vaphia-banner.jpg";
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
              src={heroImage}
              alt="Vania and Sophia from Vaphia"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              priority
              className="cover-image"
            />
          </div>
          <span className="float-sticker sticker-one"><Mark id="heart" /></span>
          <span className="float-sticker sticker-two"><Mark id="star" /></span>
          <span className="float-sticker sticker-three"><Mark id="sparkle" /></span>
        </div>
      </section>

      <section className="brand-banner shell" aria-label="Vaphia">
        <Image
          src={bannerImage}
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
              <span className="video-badge"><Mark id="watch" /></span>
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
            {(t.places as string[]).map((place, index) => (
              <Link href={`/${locale}/explore`} className={`world-tile world-${index + 1}`} key={place}>
                <span className="world-visual"><Mark id={placeIcons[index]} /></span>
                <strong>{place}</strong>
              </Link>
            ))}
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
            <span className="sister-symbol"><Mark id="vania" /></span>
            <h3>Vania</h3>
            <p>{t.vaniaDesc as string}</p>
          </article>
          <article className="sister-card sophia-card">
            <span className="sister-symbol"><Mark id="sophia" /></span>
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
