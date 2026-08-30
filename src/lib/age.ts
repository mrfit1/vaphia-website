export type AgeBand = "3-5" | "5-7" | "7-10";

export const AGE_KEY = "vaphia-age-band";
export const ageBands: AgeBand[] = ["3-5", "5-7", "7-10"];

export function isAgeBand(value: string | null | undefined): value is AgeBand {
  return value === "3-5" || value === "5-7" || value === "7-10";
}

export function readAgeBand(): AgeBand | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(AGE_KEY);
  return isAgeBand(stored) ? stored : null;
}

export function writeAgeBand(band: AgeBand) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AGE_KEY, band);
  window.dispatchEvent(new CustomEvent("vaphia-age", { detail: band }));
}
