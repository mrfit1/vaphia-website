"use client";

import { useEffect, useRef, useState } from "react";
import { celebrateReward, stickerCatalog, type StickerId } from "@/lib/stickers";
import { playSparkle } from "@/lib/sound";
import { Celebration } from "@/components/games/Celebration";
import { createCopy } from "@/lib/coloring/copy";
import type { Locale } from "@/lib/i18n";

type Tool = "brush" | "glitter" | "sparkle" | "neon" | "rainbow" | "eraser" | "sticker";

const tools: { id: Tool; mark: string; className?: string }[] = [
  { id: "brush", mark: "🖌️" },
  { id: "glitter", mark: "✨", className: "tool-glitter" },
  { id: "sparkle", mark: "🌟", className: "tool-sparkle" },
  { id: "neon", mark: "💡", className: "tool-neon" },
  { id: "rainbow", mark: "🌈" },
  { id: "eraser", mark: "🧼" },
  { id: "sticker", mark: "🎀" }
];

const sizes = [14, 28, 48];
const colors = [
  "#35d8eb", "#ff5bac", "#fff4d6", "#e8b923",
  "#8a6bff", "#3dba6e", "#ff8a3d", "#ff445d",
  "#4d8fff", "#1eb8a6", "#8b5a3c", "#1f1630",
  "#ffffff", "#82e2b7"
];

function flake(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, fill: string) {
  ctx.save();
  ctx.fillStyle = fill;
  ctx.shadowBlur = 10;
  ctx.shadowColor = fill;
  ctx.beginPath();
  for (let i = 0; i < 8; i += 1) {
    const a = (i * Math.PI) / 4 - Math.PI / 2;
    const rad = i % 2 === 0 ? r : r * 0.32;
    const px = x + Math.cos(a) * rad;
    const py = y + Math.sin(a) * rad;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function sprayGlitter(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, sparkly: boolean) {
  const n = sparkly ? 18 : 26;
  for (let i = 0; i < n; i += 1) {
    const px = x + (Math.random() - 0.5) * 42;
    const py = y + (Math.random() - 0.5) * 42;
    const r = (sparkly ? 2 : 1) + Math.random() * (sparkly ? 5 : 3.2);
    const pick = Math.random();
    ctx.globalAlpha = 0.5 + Math.random() * 0.5;
    if (sparkly || pick > 0.45) {
      const shine = pick > 0.66 ? "#fffef8" : pick > 0.33 ? "#ffe37b" : color;
      flake(ctx, px, py, r, shine);
    } else {
      ctx.fillStyle = pick > 0.5 ? "#ffffff" : color;
      ctx.beginPath();
      ctx.arc(px, py, r * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

export function DrawingStudio({ locale }: { locale: Locale }) {
  const t = createCopy[locale];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const hueRef = useRef(0);
  const toolRef = useRef<Tool>("brush");
  const colorRef = useRef(colors[1]);
  const sizeRef = useRef(28);
  const [tool, setTool] = useState<Tool>("brush");
  const [color, setColor] = useState(colors[1]);
  const [size, setSize] = useState(28);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [sticker, setSticker] = useState<StickerId | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => { toolRef.current = tool; }, [tool]);
  useEffect(() => { colorRef.current = color; }, [color]);
  useEffect(() => { sizeRef.current = size; }, [size]);

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
    const current = toolRef.current;
    const paintColor = colorRef.current;
    const paintSize = sizeRef.current;
    if (current === "eraser") {
      context.globalCompositeOperation = "destination-out";
      context.strokeStyle = "#000";
      context.lineWidth = paintSize * 1.4;
      context.lineTo(x, y);
      context.stroke();
      context.globalCompositeOperation = "source-over";
      return;
    }
    if (current === "rainbow") {
      hueRef.current = (hueRef.current + 8) % 360;
      context.strokeStyle = `hsl(${hueRef.current} 90% 55%)`;
      context.lineWidth = paintSize;
      context.lineTo(x, y);
      context.stroke();
      return;
    }
    if (current === "neon") {
      context.save();
      context.shadowBlur = 28;
      context.shadowColor = paintColor;
      context.strokeStyle = paintColor;
      context.lineWidth = paintSize;
      context.lineTo(x, y);
      context.stroke();
      context.shadowBlur = 0;
      context.globalAlpha = 0.75;
      context.strokeStyle = "#ffffff";
      context.lineWidth = Math.max(2, paintSize * 0.28);
      context.stroke();
      context.restore();
      return;
    }
    if (current === "glitter" || current === "sparkle") {
      sprayGlitter(context, x, y, paintColor, current === "sparkle");
      return;
    }
    context.strokeStyle = paintColor;
    context.lineWidth = paintSize;
    context.lineTo(x, y);
    context.stroke();
  }

  function placeSticker(event: React.PointerEvent<HTMLCanvasElement>) {
    const context = ctx();
    if (!context) return;
    snapshot();
    const p = point(event);
    const stamps = ["★", "♥", "✿", "✦", "●", "▲"];
    context.fillStyle = stickerCatalog[Math.floor(Math.random() * stickerCatalog.length)].tint;
    context.beginPath();
    context.arc(p.x, p.y, sizeRef.current * 1.1, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#39265f";
    context.font = `${sizeRef.current * 1.6}px sans-serif`;
    context.fillText(stamps[Math.floor(Math.random() * stamps.length)], p.x - sizeRef.current * 0.55, p.y + sizeRef.current * 0.45);
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
    window.print();
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
          <button
            key={item.id}
            className={`pictorial-tool pressable ${item.className ?? ""} ${tool === item.id ? "selected" : ""}`}
            onClick={() => setTool(item.id)}
            aria-label={item.id}
            type="button"
          >
            <span>{item.mark}</span>
          </button>
        ))}
        {sizes.map((item) => (
          <button
            key={item}
            className={`size-dot pressable ${size === item ? "selected" : ""}`}
            onClick={() => setSize(item)}
            aria-label={`size ${item}`}
            type="button"
          >
            <span style={{ width: item, height: item }} />
          </button>
        ))}
      </div>
      <div className="palette big-palette">
        {colors.map((item) => (
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
      <canvas
        ref={canvasRef}
        className="doodle-canvas"
        onPointerDown={(event) => {
          if (toolRef.current === "sticker") {
            placeSticker(event);
            return;
          }
          snapshot();
          drawingRef.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          const context = ctx();
          const p = point(event);
          context?.beginPath();
          context?.moveTo(p.x, p.y);
          paint(p.x, p.y);
        }}
        onPointerMove={(event) => {
          if (!drawingRef.current) return;
          const p = point(event);
          paint(p.x, p.y);
        }}
        onPointerUp={() => { drawingRef.current = false; }}
        onPointerCancel={() => { drawingRef.current = false; }}
      />
      <div className="create-actions">
        <button
          className="pictorial-tool pressable"
          type="button"
          aria-label="undo"
          onClick={() => {
            const canvas = canvasRef.current;
            const context = ctx();
            const last = history[history.length - 1];
            if (!canvas || !context || !last) return;
            context.putImageData(last, 0, 0);
            setHistory((prev) => prev.slice(0, -1));
          }}
        >↶</button>
        <button className="giant-print-button save-button pressable" type="button" aria-label={t.save} onClick={savePng}>💾</button>
        <button className="giant-print-button pressable" type="button" aria-label={t.print} onClick={() => { printPage(); finish(); }}>🖨️</button>
      </div>
    </section>
  );
}
