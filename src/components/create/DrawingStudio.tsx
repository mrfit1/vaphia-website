"use client";

import { useEffect, useRef, useState } from "react";
import { celebrateReward, stickerCatalog, type StickerId } from "@/lib/stickers";
import { playSparkle } from "@/lib/sound";
import { Celebration } from "@/components/games/Celebration";
import type { Locale } from "@/lib/i18n";

type Tool = "brush" | "glitter" | "sparkle" | "neon" | "rainbow" | "eraser" | "sticker";

const tools: { id: Tool; mark: string }[] = [
  { id: "brush", mark: "🖌️" },
  { id: "glitter", mark: "✨" },
  { id: "sparkle", mark: "🌟" },
  { id: "neon", mark: "💡" },
  { id: "rainbow", mark: "🌈" },
  { id: "eraser", mark: "🧼" },
  { id: "sticker", mark: "🎀" }
];

const sizes = [10, 22, 40];
const colors = ["#2c2048", "#ff5bac", "#35d8eb", "#ffd65d", "#82e2b7", "#8a6bff", "#ff997a", "#ffffff"];

export function DrawingStudio({ locale }: { locale: Locale }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>("brush");
  const [color, setColor] = useState(colors[1]);
  const [size, setSize] = useState(22);
  const [drawing, setDrawing] = useState(false);
  const [hue, setHue] = useState(0);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [sticker, setSticker] = useState<StickerId | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      const snap = canvas.toDataURL();
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.fillStyle = "#fffefb";
      ctx.fillRect(0, 0, rect.width, rect.height);
      if (snap && snap !== "data:,") {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
        img.src = snap;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function ctx() {
    return canvasRef.current?.getContext("2d") || null;
  }

  function snapshot() {
    const canvas = canvasRef.current;
    const context = ctx();
    if (!canvas || !context) return;
    setHistory((prev) => [...prev.slice(-19), context.getImageData(0, 0, canvas.width, canvas.height)]);
  }

  function point(event: React.PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function paint(x: number, y: number) {
    const context = ctx();
    if (!context) return;
    if (tool === "eraser") {
      context.globalCompositeOperation = "destination-out";
      context.strokeStyle = "#000";
      context.lineWidth = size * 1.4;
      context.lineTo(x, y);
      context.stroke();
      context.globalCompositeOperation = "source-over";
      return;
    }
    if (tool === "rainbow") {
      context.strokeStyle = `hsl(${hue} 90% 55%)`;
      setHue((value) => (value + 8) % 360);
    } else if (tool === "neon") {
      context.shadowBlur = 18;
      context.shadowColor = color;
      context.strokeStyle = color;
    } else {
      context.strokeStyle = color;
    }
    context.lineWidth = size;
    context.lineTo(x, y);
    context.stroke();
    context.shadowBlur = 0;
    if (tool === "glitter" || tool === "sparkle") {
      const mark = tool === "sparkle" ? "✦" : "•";
      for (let i = 0; i < 5; i += 1) {
        context.fillStyle = tool === "sparkle" ? "#ffe37b" : color;
        context.font = `${8 + Math.random() * 14}px sans-serif`;
        context.fillText(mark, x + (Math.random() - 0.5) * 28, y + (Math.random() - 0.5) * 28);
      }
    }
  }

  function placeSticker(event: React.PointerEvent<HTMLCanvasElement>) {
    if (tool !== "sticker") return;
    const context = ctx();
    if (!context) return;
    snapshot();
    const p = point(event);
    const stamps = ["★", "♥", "✿", "✦", "●", "▲"];
    context.fillStyle = stickerCatalog[Math.floor(Math.random() * stickerCatalog.length)].tint;
    context.beginPath();
    context.arc(p.x, p.y, size * 1.1, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#39265f";
    context.font = `${size * 1.6}px sans-serif`;
    context.fillText(stamps[Math.floor(Math.random() * stamps.length)], p.x - size * 0.55, p.y + size * 0.45);
    playSparkle();
  }

  function savePng() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "vaphia-drawing.png";
    link.click();
  }

  function printPage() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const popup = window.open("", "_blank");
    if (!popup) return;
    popup.document.write(`<img src="${url}" style="width:100%"/>`);
    popup.document.close();
    popup.focus();
    popup.print();
  }

  function finish() {
    if (done) return;
    setDone(true);
    setSticker(celebrateReward({ stars: 6, seed: `draw-${Date.now()}` }));
  }

  return (
    <section className="creative-card drawing-studio">
      {sticker ? <Celebration locale={locale} sticker={sticker} onDone={() => setSticker(null)} /> : null}
      <div className="pictorial-toolbar" aria-label="Tools">
        {tools.map((item) => (
          <button key={item.id} className={`pictorial-tool ${tool === item.id ? "selected" : ""}`} onClick={() => setTool(item.id)} aria-label={item.id}>
            <span>{item.mark}</span>
          </button>
        ))}
        {sizes.map((item) => (
          <button key={item} className={`size-dot ${size === item ? "selected" : ""}`} onClick={() => setSize(item)} aria-label={`size ${item}`}>
            <span style={{ width: item, height: item }} />
          </button>
        ))}
      </div>
      <div className="palette big-palette">
        {colors.map((item) => (
          <button key={item} className={color === item ? "swatch selected" : "swatch"} style={{ background: item }} onClick={() => setColor(item)} aria-label={item} />
        ))}
      </div>
      <canvas
        ref={canvasRef}
        className="doodle-canvas"
        onPointerDown={(event) => {
          if (tool === "sticker") {
            placeSticker(event);
            return;
          }
          snapshot();
          setDrawing(true);
          event.currentTarget.setPointerCapture(event.pointerId);
          const context = ctx();
          const p = point(event);
          context?.beginPath();
          context?.moveTo(p.x, p.y);
        }}
        onPointerMove={(event) => {
          if (!drawing) return;
          const p = point(event);
          paint(p.x, p.y);
        }}
        onPointerUp={() => setDrawing(false)}
        onPointerCancel={() => setDrawing(false)}
      />
      <div className="create-actions">
        <button className="tool-button" onClick={() => {
          const canvas = canvasRef.current;
          const context = ctx();
          const last = history[history.length - 1];
          if (!canvas || !context || !last) return;
          context.putImageData(last, 0, 0);
          setHistory((prev) => prev.slice(0, -1));
        }}>↶</button>
        <button className="tool-button" onClick={savePng}>💾</button>
        <button className="giant-print-button" onClick={() => { printPage(); finish(); }}>🖨️</button>
      </div>
    </section>
  );
}
