import Link from "next/link";
import { getGlobalSettings } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/ui-copy";
import { GrownUpSocialLink } from "@/components/SocialIcons";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const settings = await getGlobalSettings();
  const t = uiCopy[locale];
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <strong className="footer-brand">Vaphia</strong>
          <p>{t.footerTagline as string}</p>
        </div>
        <div className="footer-socials" aria-label="Social media">
          <GrownUpSocialLink name="youtube" href={settings.youtubeUrl} locale={locale} compact />
          <GrownUpSocialLink name="tiktok" href={settings.tiktokUrl} locale={locale} compact />
          <GrownUpSocialLink name="instagram" href={settings.instagramUrl} locale={locale} compact />
        </div>
        <div className="footer-links">
          <Link href={`/${locale}/parents`}>{t.parentsPrivacy as string}</Link>
          <Link href="/admin" className="admin-quiet-link">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
