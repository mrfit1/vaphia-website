"use client";

import { useEffect, useState } from "react";
import {
  activeKid,
  addKid,
  avatarMarks,
  avatars,
  pinIcons,
  pinMarks,
  readHousehold,
  signInKid,
  signOutKid,
  type KidAvatar,
  type PinMark
} from "@/lib/membership";
import { writeAgeBand, type AgeBand } from "@/lib/age";
import type { Locale } from "@/lib/i18n";

const copy: Record<Locale, { join: string; pick: string; pin: string; name: string; save: string; out: string; hello: string }> = {
  en: { join: "Optional kid card", pick: "Pick a picture", pin: "Picture secret", name: "Name", save: "Save", out: "All done", hello: "Hi" },
  fa: { join: "کارت کودک اختیاری", pick: "یک شکل انتخاب کن", pin: "رمز شکلی", name: "نام", save: "ذخیره", out: "تمام", hello: "سلام" },
  fr: { join: "Carte enfant optionnelle", pick: "Choisis une image", pin: "Secret en images", name: "Prénom", save: "Sauver", out: "C’est fini", hello: "Salut" },
  es: { join: "Tarjeta infantil opcional", pick: "Elige una imagen", pin: "Secreto de imágenes", name: "Nombre", save: "Guardar", out: "Listo", hello: "Hola" }
};

export function KidGate({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [house, setHouse] = useState(readHousehold());
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<KidAvatar>("sophia");
  const [pin, setPin] = useState<PinMark[]>([]);
  const [tryPin, setTryPin] = useState<PinMark[]>([]);
  const [kidId, setKidId] = useState<string | null>(null);
  const kid = house.kids.find((item) => item.id === house.activeKidId) || null;

  useEffect(() => {
    const refresh = () => setHouse(readHousehold());
    window.addEventListener("vaphia-household", refresh);
    return () => window.removeEventListener("vaphia-household", refresh);
  }, []);

  if (kid) {
    return (
      <section className="membership-card">
        <p>{t.hello} {avatarMarks[kid.avatar]} {kid.name}</p>
        <button className="button secondary-button" onClick={() => { signOutKid(); setHouse(readHousehold()); }} type="button">{t.out}</button>
      </section>
    );
  }

  if (kidId) {
    return (
      <section className="membership-card">
        <h2>{t.pin}</h2>
        <div className="choice-grid">
          {pinMarks.map((mark) => (
            <button
              key={mark}
              className="choice-mark"
              type="button"
              onClick={() => {
                const next = [...tryPin, mark].slice(0, 3);
                setTryPin(next);
                if (next.length === 3) {
                  signInKid(kidId, next);
                  const current = activeKid();
                  if (current) writeAgeBand(current.ageBand);
                  setHouse(readHousehold());
                  setTryPin([]);
                }
              }}
            >
              {pinIcons[mark]}
            </button>
          ))}
        </div>
      </section>
    );
  }

  if (house.kids.length) {
    return (
      <section className="membership-card">
        <h2>{t.join}</h2>
        <div className="choice-grid">
          {house.kids.map((item) => (
            <button key={item.id} className="choice-mark" type="button" onClick={() => setKidId(item.id)}>{avatarMarks[item.avatar]}</button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="membership-card">
      <h2>{t.join}</h2>
      <p>{t.pick}</p>
      <div className="choice-grid">
        {avatars.map((item) => (
          <button key={item} className={`choice-mark ${avatar === item ? "glow" : ""}`} type="button" onClick={() => setAvatar(item)}>{avatarMarks[item]}</button>
        ))}
      </div>
      <label>{t.name}<input value={name} onChange={(event) => setName(event.target.value)} /></label>
      <p>{t.pin}</p>
      <div className="choice-grid">
        {pinMarks.map((mark) => (
          <button key={mark} className={`choice-mark ${pin.includes(mark) ? "glow" : ""}`} type="button" onClick={() => setPin((prev) => [...prev, mark].slice(0, 3))}>{pinIcons[mark]}</button>
        ))}
      </div>
      <button
        className="button primary"
        type="button"
        onClick={() => {
          if (!name.trim() || pin.length < 3) return;
          const ageBand = (["3-5", "5-7", "7-10"] as AgeBand[])[0];
          addKid({ name: name.trim(), avatar, pin, ageBand });
          writeAgeBand(ageBand);
          setHouse(readHousehold());
        }}
      >
        {t.save}
      </button>
    </section>
  );
}
