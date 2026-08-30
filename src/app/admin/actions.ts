"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { defaultContent } from "@/content";
import { defaultGlobalSettings } from "@/config/site";
import { locales, type Locale } from "@/lib/i18n";
import type { PageContent, PageKey } from "@/lib/content-types";
import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin";
import { clearOwnerSession, ownerPassword, setOwnerSession } from "@/lib/owner/auth";
import { writeOwnerPage, writeOwnerSettings } from "@/lib/owner/store";

const pageKeys: PageKey[] = ["home", "watch", "play", "create", "explore", "storyhouse", "parents", "about"];

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (hasSupabaseConfig()) {
    const supabase = await createSupabaseServerClient();
    if (!supabase) redirect("/admin/login?error=not-configured");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) redirect("/admin/login?error=invalid-login");
    redirect("/admin");
  }

  if (password !== ownerPassword()) redirect("/admin/login?error=invalid-login");
  await setOwnerSession();
  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  await clearOwnerSession();
  redirect("/admin/login");
}

export async function savePageContentAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const locale = String(formData.get("locale") || "") as Locale;
  const pageKey = String(formData.get("pageKey") || "") as PageKey;
  if (!locales.includes(locale) || !pageKeys.includes(pageKey)) redirect("/admin?error=invalid-content");

  const fallback = defaultContent[locale][pageKey];
  const content: PageContent = {};
  for (const key of Object.keys(fallback)) {
    content[key] = String(formData.get(`field:${key}`) || "").trim();
  }

  if (supabase) {
    const { error } = await supabase.from("site_content").upsert(
      { locale, page_key: pageKey, content, updated_at: new Date().toISOString() },
      { onConflict: "locale,page_key" }
    );
    if (error) redirect(`/admin?locale=${locale}&page=${pageKey}&error=save-failed`);
  } else {
    await writeOwnerPage(locale, pageKey, content);
  }

  revalidatePath(`/${locale}`, "layout");
  redirect(`/admin?locale=${locale}&page=${pageKey}&saved=content`);
}

export async function saveGlobalSettingsAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const current = { ...defaultGlobalSettings };
  const youtubeUrl = String(formData.get("youtubeUrl") || current.youtubeUrl);
  const tiktokUrl = String(formData.get("tiktokUrl") || current.tiktokUrl);
  const instagramUrl = String(formData.get("instagramUrl") || current.instagramUrl);

  if (![youtubeUrl, tiktokUrl, instagramUrl].every(isValidHttpUrl)) {
    redirect("/admin?error=invalid-social-url");
  }

  const settings = {
    brandName: String(formData.get("brandName") || "Vaphia").trim(),
    youtubeUrl,
    tiktokUrl,
    instagramUrl,
    youtubeEmbed: String(formData.get("youtubeEmbed") || "").trim(),
    tiktokEmbed: String(formData.get("tiktokEmbed") || "").trim(),
    instagramEmbed: String(formData.get("instagramEmbed") || "").trim(),
    googleVerification: String(formData.get("googleVerification") || "").trim(),
    bingVerification: String(formData.get("bingVerification") || "").trim(),
    gamesEnabled: Array.from(formData.keys()).filter((key) => key.startsWith("game:") && formData.get(key) === "on").map((key) => key.slice(5)),
    heroImage: String(formData.get("heroImage") || current.heroImage).trim() || current.heroImage,
    bannerImage: String(formData.get("bannerImage") || current.bannerImage).trim() || current.bannerImage,
    heroImageNote: String(formData.get("heroImageNote") || "").trim(),
    bannerImageNote: String(formData.get("bannerImageNote") || "").trim()
  };

  if (supabase) {
    const { data: existing } = await supabase.from("site_settings").select("settings").eq("id", "global").maybeSingle();
    const merged = { ...current, ...(existing?.settings || {}), ...settings };
    const { error } = await supabase.from("site_settings").upsert({ id: "global", settings: merged, updated_at: new Date().toISOString() });
    if (error) redirect("/admin?error=save-failed");
  } else {
    await writeOwnerSettings(settings);
  }

  revalidatePath("/", "layout");
  redirect("/admin?saved=settings");
}

export async function uploadMediaAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  if (!supabase) {
    const kind = String(formData.get("kind") || "");
    const note = String(formData.get("note") || "").trim();
    const url = String(formData.get("url") || "").trim();
    const current = { ...defaultGlobalSettings };
    const patch: Record<string, string> = {};
    if (kind === "heroImage") {
      if (url) patch.heroImage = url;
      patch.heroImageNote = note;
    }
    if (kind === "bannerImage") {
      if (url) patch.bannerImage = url;
      patch.bannerImageNote = note;
    }
    await writeOwnerSettings({ ...current, ...patch });
    revalidatePath("/", "layout");
    redirect("/admin?saved=media");
  }

  const kind = String(formData.get("kind") || "");
  if (!["heroImage", "bannerImage"].includes(kind)) redirect("/admin?error=invalid-upload");
  const rawFile = formData.get("file");
  if (!(rawFile instanceof File)) redirect("/admin?error=no-file");
  const file = rawFile as File;
  if (file.size === 0) redirect("/admin?error=no-file");
  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
  if (!allowedTypes.has(file.type)) redirect("/admin?error=image-type");
  if (file.size > 8 * 1024 * 1024) redirect("/admin?error=file-too-large");

  const extensionByType: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/avif": "avif"
  };
  const safeExt = extensionByType[file.type];
  const path = `${kind}/${Date.now()}-${crypto.randomUUID()}.${safeExt}`;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage.from("site-media").upload(path, bytes, { contentType: file.type, upsert: false });
  if (uploadError) redirect("/admin?error=upload-failed");

  const { data: publicData } = supabase.storage.from("site-media").getPublicUrl(path);
  const { data: existing } = await supabase.from("site_settings").select("settings").eq("id", "global").maybeSingle();
  const settings = { ...defaultGlobalSettings, ...(existing?.settings || {}), [kind]: publicData.publicUrl };
  const { error } = await supabase.from("site_settings").upsert({ id: "global", settings, updated_at: new Date().toISOString() });
  if (error) redirect("/admin?error=save-failed");

  revalidatePath("/", "layout");
  redirect("/admin?saved=media");
}

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
