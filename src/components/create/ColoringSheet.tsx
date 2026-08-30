"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { celebrateReward, type StickerId } from "@/lib/stickers";
import { Celebration } from "@/components/games/Celebration";
import type { ColoringPage } from "@/lib/coloring/catalog";
import { createCopy } from "@/lib/coloring/copy";
import type { Locale } from "@/lib/i18n";

const palette = [
  "#35d8eb", "#ff5bac", "#fff4d6", "#e8b923",
  "#8a6bff", "#3dba6e", "#ff8a3d", "#ff445d",
  "#4d8fff", "#1eb8a6", "#8b5a3c", "#1f1630",
  "#ffffff", "#82e2b7"
];

function printUrl(url: string) {
  const popup = window.open("", "_blank");
  if (!popup) return;
  popup.document.write(`<!doctype html><html><head><title></title><style>@page{margin:0}html,body{margin:0;background:#fff}img,svg{width:100%;height:auto;display:block}</style></head><body><img src="${url}"/></body></html>`);
  popup.document.close();
  popup.focus();
  popup.print();
}

function downloadBlob(blob: Blob, name: string) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
}

export function ColoringSheet({ page, locale }: { page: ColoringPage; locale: Locale }) {
  const t = createCopy[locale];
  const host = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState(palette[0]);
  const [markup, setMarkup] = useState("");
  const [sticker, setSticker] = useState<StickerId | null>(null);
  const raster = page.kind === "png";

  useEffect(() => {
    if (raster) return;
    fetch(page.file)
      .then((res) => res.text())
      .then((raw) => setMarkup(raw.replace(/<text\b[\s\S]*?<\/text>/g, "")))
      .catch(() => setMarkup(""));
  }, [page.file, raster]);

  useEffect(() => {
    if (raster) return;
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
  }, [markup, color, raster]);

  useEffect(() => {
    if (!raster) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = new Image();
    img.onload = () => {
      const ratio = window.devicePixelRatio || 1;
      const width = canvas.clientWidth || 800;
      const height = Math.round(width * (img.height / img.width || 1.25));
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.fillStyle = "#fffefb";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = page.file;
  }, [page.file, raster]);

  function savePage() {
    if (raster) {
      const canvas = canvasRef.current;
      if (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${page.id}.png`;
        link.click();
        return;
      }
      fetch(page.file)
        .then((res) => res.blob())
        .then((blob) => downloadBlob(blob, `${page.id}.png`));
      return;
    }
    const svg = host.current?.querySelector("svg");
    if (!svg) return;
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1600;
      canvas.height = 2000;
      const ctx = canvas.getContext("2d");
      if (ctx) { ctx.fillStyle = "#fffefb"; ctx.fillRect(0, 0, 1600, 2000); }
      ctx?.drawImage(img, 0, 0, 1600, 2000);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${page.id}.png`;
      link.click();
    };
    img.src = url;
  }

  function printPage() {
    if (raster) {
      const canvas = canvasRef.current;
      printUrl(canvas ? canvas.toDataURL("image/png") : page.file);
    } else {
      const svg = host.current?.querySelector("svg");
      if (!svg) return;
      const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
      printUrl(URL.createObjectURL(blob));
    }
    if (!sticker) setSticker(celebrateReward({ stars: 5, seed: `color-${page.id}` }));
  }

  return (
    <section className="creative-card coloring-sheet">
      {sticker ? <Celebration locale={locale} sticker={sticker} onDone={() => setSticker(null)} /> : null}
      <div className="create-room-bar">
        <Link href={`/${locale}/create/ages/${page.age}`} className="pictorial-tool pressable" aria-label={t.back}>🚪</Link>
        <h1>{page.titles[locale]}</h1>
      </div>
      {!raster ? (
        <div className="palette big-palette">
          {palette.map((item) => (
            <button
              key={item}
              className={color === item ? "swatch selected pressable" : "swatch pressable"}
              style={{ background: item }}
              onClick={() => setColor(item)}
              aria-label={item}
              type="button"
            />
          ))}
        </div>
      ) : null}
      {raster ? (
        <canvas ref={canvasRef} className="coloring-raster" aria-label={page.titles[locale]} />
      ) : (
        <div className="coloring-host" ref={host} dangerouslySetInnerHTML={{ __html: markup }} />
      )}
      <div className="create-actions">
        <button className="giant-print-button save-button pressable" type="button" aria-label={t.save} onClick={savePage}>💾</button>
        <button className="giant-print-button pressable" type="button" aria-label={t.print} onClick={printPage}>🖨️</button>
      </div>
    </section>
  );
}
