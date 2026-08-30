"use client";

import { useEffect, useRef, useState } from "react";
import { Eraser, RotateCcw } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { uiCopy } from "@/lib/ui-copy";

const palette = ["#3c2a67", "#ff5bab", "#8b6cff", "#35d8eb", "#ffd75e", "#82e2b7", "#ff8b62"];

export function DoodlePad({ locale }: { locale: Locale }) {
  const t = uiCopy[locale];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState(palette[1]);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      const snapshot = canvas.toDataURL();
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(ratio, ratio);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      if (snapshot && snapshot !== "data:,") {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
        img.src = snapshot;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function point(event: React.PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function start(event: React.PointerEvent<HTMLCanvasElement>) {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    setDrawing(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    const p = point(event);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  function draw(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const p = point(event);
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }

  function clear() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <section className="creative-card">
      <div className="game-heading"><div><span className="eyebrow">{t.doodle as string}</span><h2>{t.drawAnything as string}</h2></div></div>
      <div className="creative-toolbar">
        <div className="palette" aria-label="Drawing colors">
          {palette.map((item) => <button key={item} aria-label={`Choose ${item}`} className={color === item ? "swatch selected" : "swatch"} style={{ background: item }} onClick={() => setColor(item)} />)}
        </div>
        <button className="tool-button" onClick={() => setColor("#ffffff")}><Eraser size={18} /> {t.eraser as string}</button>
        <button className="tool-button" onClick={clear}><RotateCcw size={18} /> {t.clear as string}</button>
      </div>
      <canvas ref={canvasRef} className="doodle-canvas" onPointerDown={start} onPointerMove={draw} onPointerUp={() => setDrawing(false)} onPointerCancel={() => setDrawing(false)} />
    </section>
  );
}
