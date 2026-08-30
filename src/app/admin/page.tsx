import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ImageUp, LogOut, Save, ShieldCheck } from "lucide-react";
import { defaultContent } from "@/content";
import { getGlobalSettings, getPageContent } from "@/lib/content";
import { pageLabelMap } from "@/lib/page-labels";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import type { PageKey } from "@/lib/content-types";
import { hasSupabaseConfig } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin";
import { logoutAction, saveGlobalSettingsAction, savePageContentAction, uploadMediaAction } from "./actions";

export const metadata: Metadata = { title: "Vaphia Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  if (!hasSupabaseConfig()) {
    return (
      <main className="admin-shell"><section className="admin-dashboard setup-dashboard">
        <h1>Vaphia Admin Setup</h1>
        <p>The admin UI is built. Connect Supabase to make edits persistent on Vercel.</p>
        <ol>
          <li>Create a Supabase project.</li>
          <li>Run <code>supabase/schema.sql</code> in the SQL editor.</li>
          <li>Create your admin user in Supabase Authentication.</li>
          <li>Add that user ID to the <code>admins</code> table.</li>
          <li>Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in Vercel.</li>
        </ol>
        <Link className="button primary" href="/en">Back to site</Link>
      </section></main>
    );
  }

  const { user } = await requireAdmin();
  const locale = (typeof params.locale === "string" && locales.includes(params.locale as Locale) ? params.locale : "en") as Locale;
  const pageKeys = Object.keys(defaultContent.en) as PageKey[];
  const pageKey = (typeof params.page === "string" && pageKeys.includes(params.page as PageKey) ? params.page : "home") as PageKey;
  const [content, settings] = await Promise.all([getPageContent(locale, pageKey), getGlobalSettings()]);
  const saved = typeof params.saved === "string" ? params.saved : "";
  const error = typeof params.error === "string" ? params.error : "";

  return (
    <main className="admin-shell wide-admin">
      <section className="admin-dashboard">
        <header className="admin-topbar">
          <div><span className="eyebrow">Private CMS</span><h1>Vaphia Admin</h1><p>{user?.email}</p></div>
          <div className="admin-top-actions"><Link href={`/${locale}`} target="_blank"><ExternalLink size={18} /> View site</Link><form action={logoutAction}><button type="submit"><LogOut size={18} /> Sign out</button></form></div>
        </header>
        {saved && <div className="admin-success">Saved successfully.</div>}
        {error && <div className="admin-error">Something needs attention: {error}</div>}

        <div className="admin-grid">
          <aside className="admin-sidebar">
            <h2>Language</h2>
            {locales.map((loc) => <Link className={loc === locale ? "active" : ""} href={`/admin?locale=${loc}&page=${pageKey}`} key={loc}>{localeNames[loc]}</Link>)}
            <h2>Page</h2>
            {pageKeys.map((page) => <Link className={page === pageKey ? "active" : ""} href={`/admin?locale=${locale}&page=${page}`} key={page}>{pageLabelMap[page]}</Link>)}
          </aside>

          <div className="admin-main">
            <section className="admin-panel">
              <div className="admin-panel-heading"><div><span className="eyebrow">Content + SEO</span><h2>{pageLabelMap[pageKey]} · {localeNames[locale]}</h2></div><ShieldCheck /></div>
              <form action={savePageContentAction} className="admin-form">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="pageKey" value={pageKey} />
                {(Object.entries(content) as [string, string][]).map(([key, value]) => {
                  const isLong = key.toLowerCase().includes("description") || key === "intro" || value.length > 90;
                  return (
                    <label key={key}>{humanize(key)}{isLong ? <textarea name={`field:${key}`} defaultValue={value} rows={4} /> : <input name={`field:${key}`} defaultValue={value} />}</label>
                  );
                })}
                <button className="button primary" type="submit"><Save size={18} /> Save page</button>
              </form>
            </section>

            <section className="admin-panel">
              <div className="admin-panel-heading"><div><span className="eyebrow">Global</span><h2>Social, verification & games</h2></div></div>
              <form action={saveGlobalSettingsAction} className="admin-form">
                <label>Brand name<input name="brandName" defaultValue={settings.brandName} /></label>
                <label>YouTube URL<input name="youtubeUrl" defaultValue={settings.youtubeUrl} /></label>
                <label>TikTok URL<input name="tiktokUrl" defaultValue={settings.tiktokUrl} /></label>
                <label>Instagram URL<input name="instagramUrl" defaultValue={settings.instagramUrl} /></label>
                <label>Google verification token<input name="googleVerification" defaultValue={settings.googleVerification} /></label>
                <label>Bing verification token<input name="bingVerification" defaultValue={settings.bingVerification} /></label>
                <fieldset className="admin-checks"><legend>Enabled games</legend>
                  {['memory','tap','puzzle'].map((game) => <label key={game}><input type="checkbox" name={`game:${game}`} defaultChecked={settings.gamesEnabled.includes(game)} /> {humanize(game)}</label>)}
                </fieldset>
                <button className="button primary" type="submit"><Save size={18} /> Save settings</button>
              </form>
            </section>

            <section className="admin-panel">
              <div className="admin-panel-heading"><div><span className="eyebrow">Media</span><h2>Images</h2></div><ImageUp /></div>
              <div className="media-admin-grid">
                <MediaEditor kind="heroImage" label="Hero image" src={settings.heroImage} />
                <MediaEditor kind="bannerImage" label="Vaphia banner" src={settings.bannerImage} />
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

function MediaEditor({ kind, label, src }: { kind: "heroImage" | "bannerImage"; label: string; src: string }) {
  return (
    <div className="media-editor">
      <div className="media-preview"><Image src={src} alt={label} fill sizes="400px" className="cover-image" /></div>
      <form action={uploadMediaAction} className="admin-form compact-form">
        <input type="hidden" name="kind" value={kind} />
        <label>{label}<input type="file" name="file" accept="image/jpeg,image/png,image/webp,image/avif" required /></label>
        <button className="button secondary-button" type="submit"><ImageUp size={18} /> Upload</button>
      </form>
    </div>
  );
}

function humanize(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (m) => m.toUpperCase());
}
