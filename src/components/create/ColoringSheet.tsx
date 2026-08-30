"use client";

import { useEffect, useRef, useState } from "react";
import { celebrateReward, type StickerId } from "@/lib/stickers";
import { Celebration } from "@/components/games/Celebration";
import type { ColoringPage } from "@/lib/coloring/catalog";
import type { Locale } from "@/lib/i18n";

const palette = ["#ff5bac", "#35d8eb", "#ffd65d", "#82e2b7", "#8a6bff", "#ff997a", "#fffefb", "#2c2048"];

export function ColoringSheet({ page, locale }: { page: ColoringPage; locale: Locale }) {
  const host = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState(palette[0]);
  const [markup, setMarkup] = useState("");
  const [sticker, setSticker] = useState<StickerId | null>(null);

  useEffect(() => {
    fetch(page.file)
      .then((res) => res.text())
      .then(setMarkup)
      .catch(() => setMarkup(""));
  }, [page.file]);

  useEffect(() => {
    const root = host.current;
    if (!root) return;
    const fillable = root.querySelectorAll("path, circle, ellipse, rect, polygon, line");
    const onClick = (event: Event) => {
      const target = event.target as SVGElement;
      if (target.tagName === "svg") return;
      target.setAttribute("fill", color);
    };
    fillable.forEach((node) => node.addEventListener("click", onClick));
    return () => fillable.forEach((node) => node.removeEventListener("click", onClick));
  }, [markup, color]);

  function svgBlob() {
    const svg = host.current?.querySelector("svg");
    if (!svg) return null;
    return new Blob([svg.outerHTML], { type: "image/svg+xml" });
  }

  function download(kind: "svg" | "png") {
    const blob = svgBlob();
    if (!blob) return;
    if (kind === "svg") {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${page.id}.svg`;
      link.click();
      return;
    }
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 1040;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, 1200, 1040);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${page.id}.png`;
      link.click();
    };
    img.src = url;
  }

  function printPage() {
    const svg = host.current?.querySelector("svg");
    if (!svg) return;
    const popup = window.open("", "_blank");
    if (!popup) return;
    popup.document.write(`<html><body>${svg.outerHTML}</body></html>`);
    popup.document.close();
    popup.focus();
    popup.print();
    if (!sticker) setSticker(celebrateReward({ stars: 5, seed: `color-${page.id}` }));
  }

  return (
    <section className="creative-card coloring-sheet">
      {sticker ? <Celebration locale={locale} sticker={sticker} onDone={() => setSticker(null)} /> : null}
      <h1>{page.titles[locale]}</h1>
      <div className="palette big-palette">
        {palette.map((item) => (
          <button key={item} className={color === item ? "swatch selected" : "swatch"} style={{ background: item }} onClick={() => setColor(item)} />
        ))}
      </div>
      <div className="coloring-host" ref={host} dangerouslySetInnerHTML={{ __html: markup }} />
      <div className="create-actions">
        <button className="pictorial-tool" onClick={() => download("svg")} aria-label="SVG">⬇️</button>
        <button className="pictorial-tool" onClick={() => download("png")} aria-label="PNG">🖼️</button>
        <button className="giant-print-button" onClick={printPage} aria-label="Print">🖨️</button>
      </div>
    </section>
  );
}
