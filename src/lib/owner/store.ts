import { cookies } from "next/headers";
import type { GlobalSettings, PageContent, PageKey } from "@/lib/content-types";
import type { Locale } from "@/lib/i18n";

const SETTINGS_COOKIE = "vaphia-owner-settings";

function contentCookie(locale: Locale, pageKey: PageKey) {
  return `vaphia-page-${locale}-${pageKey}`;
}

export async function readOwnerSettings(): Promise<Partial<GlobalSettings> | null> {
  try {
    const store = await cookies();
    const raw = store.get(SETTINGS_COOKIE)?.value;
    if (!raw) return null;
    return JSON.parse(raw) as Partial<GlobalSettings>;
  } catch {
    return null;
  }
}

export async function writeOwnerSettings(settings: Partial<GlobalSettings>) {
  const store = await cookies();
  store.set(SETTINGS_COOKIE, JSON.stringify(settings), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 180
  });
}

export async function readOwnerPage(locale: Locale, pageKey: PageKey): Promise<PageContent | null> {
  try {
    const store = await cookies();
    const raw = store.get(contentCookie(locale, pageKey))?.value;
    if (!raw) return null;
    return JSON.parse(raw) as PageContent;
  } catch {
    return null;
  }
}

export async function writeOwnerPage(locale: Locale, pageKey: PageKey, content: PageContent) {
  const store = await cookies();
  store.set(contentCookie(locale, pageKey), JSON.stringify(content), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 180
  });
}
