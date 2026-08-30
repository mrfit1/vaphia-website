"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/ui-copy";

const KEY = "vaphia-stars";

export function addVaphiaStars(amount: number) {
  if (typeof window === "undefined") return;
  const current = Number(localStorage.getItem(KEY) || "0");
  localStorage.setItem(KEY, String(current + amount));
  window.dispatchEvent(new Event("vaphia-stars"));
}

export function resetVaphiaStars() {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, "0");
  window.dispatchEvent(new Event("vaphia-stars"));
}

export function StarWallet({ locale }: { locale: Locale }) {
  const [stars, setStars] = useState(0);
  const t = uiCopy[locale];
  useEffect(() => {
    const refresh = () => setStars(Number(localStorage.getItem(KEY) || "0"));
    refresh();
    window.addEventListener("vaphia-stars", refresh);
    return () => window.removeEventListener("vaphia-stars", refresh);
  }, []);

  return (
    <div className="star-wallet" aria-label={`${stars} ${t.stars as string}`}>
      <Star size={18} fill="currentColor" />
      <strong>{stars}</strong>
      <span>{t.stars as string}</span>
    </div>
  );
}
