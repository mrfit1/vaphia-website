"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/ui-copy";

const palette = ["#ff5bab", "#8b6cff", "#35d8eb", "#ffd75e", "#82e2b7", "#ff8b62", "#ffffff"];

export function ColoringStudio({ locale }: { locale: Locale }) {
  const t = uiCopy[locale];
  const [color, setColor] = useState(palette[0]);
  const [areas, setAreas] = useState({ heart: "#ffffff", flower: "#ffffff", star: "#ffffff", center: "#ffffff" });

  return (
    <section className="creative-card">
      <div className="game-heading"><div><span className="eyebrow">{t.coloringStudio as string}</span><h2>{t.colorInstruction as string}</h2></div></div>
      <div className="palette big-palette">
        {palette.map((item) => <button key={item} className={color === item ? "swatch selected" : "swatch"} style={{ background: item }} onClick={() => setColor(item)} aria-label={`Choose ${item}`} />)}
      </div>
      <svg className="coloring-art" viewBox="0 0 600 380" role="img" aria-label="Interactive coloring picture">
        <rect x="0" y="0" width="600" height="380" rx="30" fill="#fffafc" />
        <path d="M155 268C92 226 76 166 113 136c31-25 69-8 83 19 14-27 52-44 83-19 37 30 21 90-42 132l-41 28z" fill={areas.heart} stroke="#3c2a67" strokeWidth="8" onClick={() => setAreas({ ...areas, heart: color })} />
        <g transform="translate(390 178)" onClick={() => setAreas({ ...areas, flower: color })}>
          {[0,60,120,180,240,300].map((angle) => <ellipse key={angle} cx="0" cy="-66" rx="34" ry="58" fill={areas.flower} stroke="#3c2a67" strokeWidth="7" transform={`rotate(${angle})`} />)}
          <circle cx="0" cy="0" r="44" fill={areas.center} stroke="#3c2a67" strokeWidth="7" onClick={(e) => { e.stopPropagation(); setAreas({ ...areas, center: color }); }} />
        </g>
        <path d="M298 52l18 37 41 6-30 29 7 41-36-19-37 19 7-41-30-29 42-6z" fill={areas.star} stroke="#3c2a67" strokeWidth="7" onClick={() => setAreas({ ...areas, star: color })} />
      </svg>
    </section>
  );
}
