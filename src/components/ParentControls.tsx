"use client";

import { useEffect, useState } from "react";
import { ExternalLink, LockKeyhole, RotateCcw, ShieldCheck, Sparkles, Volume2 } from "lucide-react";
import { resetVaphiaStars } from "@/components/games/StarWallet";
import type { Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/ui-copy";

type Prefs = {
  sound: boolean;
  motion: boolean;
  externalLinks: boolean;
};

const KEY = "vaphia-parent-preferences";
const UNLOCK_KEY = "vaphia-parent-unlocked";
const defaults: Prefs = { sound: false, motion: true, externalLinks: false };

export function ParentControls({ locale }: { locale: Locale }) {
  const t = uiCopy[locale];
  const [prefs, setPrefs] = useState<Prefs>(defaults);
  const [saved, setSaved] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [answer, setAnswer] = useState("");
  const [unlockError, setUnlockError] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setPrefs({ ...defaults, ...JSON.parse(stored) });
      setUnlocked(sessionStorage.getItem(UNLOCK_KEY) === "yes");
    } catch {
      setPrefs(defaults);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.vaphiaMotion = prefs.motion ? "on" : "off";
    document.documentElement.dataset.vaphiaSound = prefs.sound ? "on" : "off";
    document.documentElement.dataset.vaphiaExternal = prefs.externalLinks ? "on" : "off";
  }, [prefs]);

  function save(next: Prefs) {
    setPrefs(next);
    localStorage.setItem(KEY, JSON.stringify(next));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  }

  function unlock() {
    if (answer.trim() !== "54") {
      setUnlockError(true);
      return;
    }
    setUnlockError(false);
    setUnlocked(true);
    sessionStorage.setItem(UNLOCK_KEY, "yes");
  }

  const rows = [
    { key: "sound" as const, title: t.siteSounds as string, text: t.siteSoundsText as string, Icon: Volume2 },
    { key: "motion" as const, title: t.animations as string, text: t.animationsText as string, Icon: Sparkles },
    { key: "externalLinks" as const, title: t.externalLinks as string, text: t.externalLinksText as string, Icon: ExternalLink }
  ];

  if (!unlocked) {
    return (
      <section className="parent-controls-card parent-lock-card">
        <span className="shield-badge"><LockKeyhole /></span>
        <div>
          <span className="eyebrow">{t.grownupCheck as string}</span>
          <h2>{t.unlockParent as string}</h2>
          <p>{t.unlockText as string} <strong>9 × 6 = ?</strong></p>
        </div>
        <div className="gate-row parent-unlock-row">
          <input inputMode="numeric" pattern="[0-9]*" value={answer} onChange={(event) => setAnswer(event.target.value)} aria-label={t.answerLabel as string} />
          <button className="button primary" onClick={unlock} type="button">{t.unlock as string}</button>
        </div>
        {unlockError && <p className="unlock-error">{t.tryAgain as string}</p>}
      </section>
    );
  }

  return (
    <section className="parent-controls-card">
      <div className="parent-control-heading">
        <span className="shield-badge"><ShieldCheck /></span>
        <div><span className="eyebrow">{t.deviceControls as string}</span><h2>{t.parentSettings as string}</h2></div>
      </div>
      <div className="parent-settings-list">
        {rows.map(({ key, title, text, Icon }) => (
          <div className="parent-setting" key={key}>
            <span className="setting-icon"><Icon /></span>
            <div><strong>{title}</strong><p>{text}</p></div>
            <button
              className={prefs[key] ? "toggle on" : "toggle"}
              onClick={() => save({ ...prefs, [key]: !prefs[key] })}
              aria-pressed={prefs[key]}
              aria-label={`${title}: ${prefs[key] ? "on" : "off"}`}
              type="button"
            >
              <span />
            </button>
          </div>
        ))}
      </div>
      <button className="button secondary-button" onClick={() => { resetVaphiaStars(); setSaved(true); window.setTimeout(() => setSaved(false), 1500); }} type="button">
        <RotateCcw size={18} /> {t.resetStars as string}
      </button>
      {saved && <p className="saved-note">{t.savedDevice as string}</p>}
    </section>
  );
}
