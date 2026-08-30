export type ParentPrefs = {
  sound: boolean;
  motion: boolean;
  externalLinks: boolean;
};

export const PREFS_KEY = "vaphia-parent-preferences";
export const defaultPrefs: ParentPrefs = { sound: true, motion: true, externalLinks: false };

export function readPrefs(): ParentPrefs {
  if (typeof window === "undefined") return defaultPrefs;
  try {
    const stored = window.localStorage.getItem(PREFS_KEY);
    if (!stored) return defaultPrefs;
    return { ...defaultPrefs, ...JSON.parse(stored) };
  } catch {
    return defaultPrefs;
  }
}

export function soundsAllowed() {
  return readPrefs().sound;
}
