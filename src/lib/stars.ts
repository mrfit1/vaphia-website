const KEY = "vaphia-stars";

export function readStars() {
  if (typeof window === "undefined") return 0;
  return Number(window.localStorage.getItem(KEY) || "0");
}

export function addVaphiaStars(amount: number) {
  if (typeof window === "undefined") return;
  const next = readStars() + amount;
  window.localStorage.setItem(KEY, String(next));
  window.dispatchEvent(new Event("vaphia-stars"));
}

export function resetVaphiaStars() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, "0");
  window.dispatchEvent(new Event("vaphia-stars"));
}
