"use client";

import { useEffect, useState, type SVGProps } from "react";
import { afterPaint } from "@/lib/client-state";
import { X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/ui-copy";

type LogoProps = SVGProps<SVGSVGElement>;

export function YouTubeLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path fill="currentColor" d="M23.3 7.1a3 3 0 0 0-2.1-2.15C19.35 4.45 12 4.45 12 4.45s-7.35 0-9.2.5A3 3 0 0 0 .7 7.1 31.3 31.3 0 0 0 .2 12c0 1.64.17 3.28.5 4.9a3 3 0 0 0 2.1 2.15c1.85.5 9.2.5 9.2.5s7.35 0 9.2-.5a3 3 0 0 0 2.1-2.15c.33-1.62.5-3.26.5-4.9s-.17-3.28-.5-4.9Z" />
      <path fill="#fff" d="m9.6 15.25 6.15-3.25L9.6 8.75v6.5Z" />
    </svg>
  );
}

function InstagramLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5.2" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="17.6" cy="6.7" r="1.25" fill="currentColor" />
    </svg>
  );
}

function TikTokLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path fill="currentColor" d="M14.3 2.3h3.15c.27 1.48 1.1 2.76 2.3 3.63A6.7 6.7 0 0 0 23 7.13v3.18a9.83 9.83 0 0 1-5.5-1.73v6.33a6.6 6.6 0 1 1-5.7-6.54v3.22a3.4 3.4 0 1 0 2.5 3.28V2.3Z" />
    </svg>
  );
}

const iconMap = { youtube: YouTubeLogo, instagram: InstagramLogo, tiktok: TikTokLogo };
type SocialName = keyof typeof iconMap;

export function GrownUpSocialLink({ href, name, locale, compact = false }: { href: string; name: SocialName; locale: Locale; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [direct, setDirect] = useState(false);
  const Icon = iconMap[name];
  const t = uiCopy[locale];

  useEffect(() => {
    return afterPaint(() => {
      try {
        const prefs = JSON.parse(localStorage.getItem("vaphia-parent-preferences") || "{}");
        setDirect(Boolean(prefs.externalLinks));
      } catch {
        setDirect(false);
      }
    });
  }, []);

  function click() {
    if (direct) window.open(href, "_blank", "noopener,noreferrer");
    else setOpen(true);
  }

  function continueOut() {
    if (answer.trim() !== "56") return;
    window.open(href, "_blank", "noopener,noreferrer");
    setOpen(false);
    setAnswer("");
  }

  return (
    <>
      <button className={`${compact ? "social-icon compact" : "social-icon"} social-${name}`} onClick={click} aria-label={name} type="button">
        <Icon aria-hidden="true" />
      </button>
      {open && (
        <div className="gate-backdrop" role="dialog" aria-modal="true" aria-label={t.grownupCheck as string}>
          <div className="gate-card">
            <button className="gate-close" onClick={() => setOpen(false)} aria-label={t.close as string} type="button"><X /></button>
            <span className="eyebrow">{t.grownupCheck as string}</span>
            <h2>{t.externalLink as string}</h2>
            <p>{t.gateText as string} <strong>8 × 7 = ?</strong></p>
            <div className="gate-row">
              <input inputMode="numeric" pattern="[0-9]*" value={answer} onChange={(event) => setAnswer(event.target.value)} aria-label="Answer" />
              <button className="button primary" onClick={continueOut} type="button">{t.continue as string}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
