import { cache } from "react";
import { defaultContent } from "@/content";
import { defaultGlobalSettings } from "@/config/site";
import type { GlobalSettings, PageContent, PageKey } from "@/lib/content-types";
import type { Locale } from "@/lib/i18n";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { readOwnerPage, readOwnerSettings } from "@/lib/owner/store";

export const getPageContent = cache(async (locale: Locale, pageKey: PageKey): Promise<PageContent> => {
  const fallback = defaultContent[locale][pageKey];
  const supabase = createSupabasePublicClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("locale", locale)
      .eq("page_key", pageKey)
      .maybeSingle();
    if (!error && data?.content && typeof data.content === "object") {
      return { ...fallback, ...(data.content as PageContent) };
    }
  }
  const owner = await readOwnerPage(locale, pageKey);
  return owner ? { ...fallback, ...owner } : fallback;
});

export const getGlobalSettings = cache(async (): Promise<GlobalSettings> => {
  const supabase = createSupabasePublicClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("site_settings")
      .select("settings")
      .eq("id", "global")
      .maybeSingle();
    if (!error && data?.settings && typeof data.settings === "object") {
      return { ...defaultGlobalSettings, ...(data.settings as Partial<GlobalSettings>) };
    }
  }
  const owner = await readOwnerSettings();
  return owner ? { ...defaultGlobalSettings, ...owner } : defaultGlobalSettings;
});
