"use client";

import { useEffect, useRef, useState } from "react";
import { Eraser, Redo2, Trash2, Undo2 } from "lucide-react";
import { celebrateReward, stickerCatalog, type StickerId } from "@/lib/stickers";
import { playSparkle, playTap } from "@/lib/sound";
import { Celebration } from "@/components/games/Celebration";
import { Mark, type MarkId } from "@/components/marks/VaphiaMarks";
import { createCopy } from "@/lib/coloring/copy";
import { drawingCopy } from "@/lib/drawing-copy";
import type { Locale } from "@/lib/i18n";

type Tool = "brush" | "marker" | "glitter" | "sparkle" | "neon" | "rainbow" | "eraser" | "sticker";

type ToolDef = { id: Tool; icon?: MarkId; className?: string };

const tools: ToolDef[] = [
  { id: "brush", icon: "create" },
  { id: "marker", icon: "paint" },
  { id: "glitter", icon: "sparkle", className: "tool-glitter" },
  { id: "sparkle", icon: "star", className: "tool-sparkle" },
  { id: "neon", icon: "sun", className: "tool-neon" },
  { id: "rainbow", icon: "butterfly" },
  { id: "eraser" },
  { id: "sticker", icon: "gift" }
];

const sizes = [12, 26, 46];
const colors = [
  "#ff3f87", "#ff6b5f", "#ff9a48", "#ffd45c", "#8bdc73", "#38cdb6",
  "#35d8eb", "#4d8fff", "#8a6bff", "#c26bff", "#39265f", "#ffffff",
  "#e8b923", "#8b5a3c", "#f3bfd8", "#c8f1e7"
];

function flake(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, fill: string) {
  ctx.save();
  ctx.fillStyle = fill;
  ctx.shadowBlur = 10;
  ctx.shadowColor = fill;
  ctx.beginPath();
  for (let i = 0; i < 8; i += 1) {
    const angle = (i * Math.PI) / 4 - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.32;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function sprayGlitter(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, sparkly: boolean) {
  const count = sparkly ? 18 : 26;
  for (let i = 0; i < count; i += 1) {
    const px = x + (Math.random() - 0.5) * 42;
    const py = y + (Math.random() - 0.5) * 42;
    const radius = (sparkly ? 2 : 1) + Math.random() * (sparkly ? 5 : 3.2);
    const pick = Math.random();
    ctx.globalAlpha = 0.5 + Math.random() * 0.5;
    if (sparkly || pick > 0.45) {
      const shine = pick > 0.66 ? "#fffef8" : pick > 0.33 ? "#ffe37b" : color;
      flake(ctx, px, py, radius, shine);
    } else {
      ctx.fillStyle = pick > 0.5 ? "#ffffff" : color;
      ctx.beginPath();
      ctx.arc(px, py, radius * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

export function DrawingStudio({ locale }: { locale: Locale }) {
  const t = createCopy[locale];
  const copy = drawingCopy[locale];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const hueRef = useRef(0);
  const toolRef = useRef<Tool>("brush");
  const colorRef = useRef(colors[0]);
  const sizeRef = useRef(sizes[1]);
  const [tool, setTool] = useState<Tool>("brush");
  const [color, setColor] = useState(colors[0]);
  const [size, setSize] = useState(sizes[1]);
  const [selectedSticker, setSelectedSticker] = useState<StickerId>(stickerCatalog[0].id);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [redoHistory, setRedoHistory] = useState<ImageData[]>([]);
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
      if (!rect.width || !rect.height) return;
      const ratio = window.devicePixelRatio || 1;
      const snap = canvas.toDataURL();
      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);
      const context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.lineCap = "round";
      context.lineJoin = "round";
      context.fillStyle = "#fffefb";
      context.fillRect(0, 0, rect.width, rect.height);
      if (snap && snap !== "data:,") {
        const image = new Image();
        image.onload = () => context.drawImage(image, 0, 0, rect.width, rect.height);
        image.src = snap;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function context() {
    return canvasRef.current?.getContext("2d") || null;
  }

  function snapshot() {
    const canvas = canvasRef.current;
    const ctx = context();
    if (!canvas || !ctx) return;
    setHistory((prev) => [...prev.slice(-24), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    setRedoHistory([]);
  }

  function setToolAndPlay(next: Tool) {
    setTool(next);
    playTap();
  }

  function point(event: React.PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function paint(x: number, y: number, pressure = 0.5) {
    const ctx = context();
    if (!ctx) return;
    const currentTool = toolRef.current;
    const paintColor = colorRef.current;
    const baseSize = sizeRef.current;
    const pressureSize = Math.max(0.65, Math.min(1.25, pressure || 0.7));
    if (currentTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "#000";
      ctx.lineWidth = baseSize * 1.6;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.globalCompositeOperation = "source-over";
      return;
    }
    if (currentTool === "rainbow") {
      hueRef.current = (hueRef.current + 8) % 360;
      ctx.strokeStyle = `hsl(${hueRef.current} 90% 55%)`;
      ctx.lineWidth = baseSize * pressureSize;
      ctx.lineTo(x, y);
      ctx.stroke();
      return;
    }
    if (currentTool === "neon") {
      ctx.save();
      ctx.shadowBlur = 28;
      ctx.shadowColor = paintColor;
      ctx.strokeStyle = paintColor;
      ctx.lineWidth = baseSize * pressureSize;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 0.75;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = Math.max(2, baseSize * 0.28);
      ctx.stroke();
      ctx.restore();
      return;
    }
    if (currentTool === "glitter" || currentTool === "sparkle") {
      sprayGlitter(ctx, x, y, paintColor, currentTool === "sparkle");
      return;
    }
    ctx.globalAlpha = currentTool === "marker" ? 0.72 : 1;
    ctx.strokeStyle = paintColor;
    ctx.lineWidth = (currentTool === "marker" ? baseSize * 1.25 : baseSize) * pressureSize;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function placeSticker(event: React.PointerEvent<HTMLCanvasElement>) {
    const ctx = context();
    if (!ctx) return;
    snapshot();
    const p = point(event);
    const item = stickerCatalog.find((entry) => entry.id === selectedSticker) || stickerCatalog[0];
    ctx.save();
    ctx.fillStyle = item.tint;
    ctx.shadowBlur = 8;
    ctx.shadowColor = item.tint;
    ctx.beginPath();
    ctx.arc(p.x, p.y, sizeRef.current * 1.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = "#39265f";
    ctx.font = `${sizeRef.current * 1.55}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(item.id === "star" ? "★" : item.id === "heart" ? "♥" : "✦", p.x, p.y);
    playSparkle();
  }

  function undo() {
    const canvas = canvasRef.current;
    const ctx = context();
    const previous = history[history.length - 1];
    if (!canvas || !ctx || !previous) return;
    setRedoHistory((prev) => [...prev.slice(-24), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    ctx.putImageData(previous, 0, 0);
    setHistory((prev) => prev.slice(0, -1));
    playTap();
  }

  function redo() {
    const canvas = canvasRef.current;
    const ctx = context();
    const next = redoHistory[redoHistory.length - 1];
    if (!canvas || !ctx || !next) return;
    setHistory((prev) => [...prev.slice(-24), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    ctx.putImageData(next, 0, 0);
    setRedoHistory((prev) => prev.slice(0, -1));
    playTap();
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = context();
    if (!canvas || !ctx) return;
    snapshot();
    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#fffefb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    playSparkle();
  }

  function savePng() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "vaphia-drawing.png";
    link.click();
    finish();
  }

  function printPage() {
    window.print();
    finish();
  }

  function finish() {
    if (done) return;
    setDone(true);
    setSticker(celebrateReward({ stars: 6, seed: `draw-${Date.now()}` }));
  }

  const activeSticker = stickerCatalog.find((entry) => entry.id === selectedSticker) || stickerCatalog[0];

  return (
    <section className="creative-card drawing-studio" aria-label={copy.canvasLabel}>
      {sticker ? <Celebration locale={locale} sticker={sticker} onDone={() => setSticker(null)} /> : null}
      <div className="drawing-intro">
        <div>
          <span className="eyebrow">{t.draw}</span>
          <h2>{copy.canvasLabel}</h2>
          <p>{copy.hint}</p>
        </div>
        <span className="drawing-badge"><Mark id="paint" /> {copy.tools[tool]}</span>
      </div>
      <div className="drawing-section-label"><span>{copy.tools[tool]}</span><span>{copy.brushSize}</span></div>
      <div className="pictorial-toolbar drawing-tools" aria-label={copy.tools.brush}>
        {tools.map((item) => (
          <button
            key={item.id}
            className={`pictorial-tool tool-choice pressable ${item.className ?? ""} ${tool === item.id ? "selected" : ""}`}
            onClick={() => setToolAndPlay(item.id)}
            aria-label={copy.tools[item.id]}
            aria-pressed={tool === item.id}
            type="button"
          >
            {item.icon ? <Mark id={item.icon} /> : <Eraser aria-hidden="true" />}
            <span className="tool-label">{copy.tools[item.id]}</span>
          </button>
        ))}
      </div>
      <div className="drawing-section-label"><span>{copy.colors}</span><span>{color.toUpperCase()}</span></div>
      <div className="palette big-palette drawing-palette" aria-label={copy.colors}>
        {colors.map((item) => (
          <button
            key={item}
            className={color === item ? "swatch selected pressable" : "swatch pressable"}
            style={{ background: item }}
            onClick={() => { setColor(item); playTap(); }}
            aria-label={`${copy.colors}: ${item}`}
            aria-pressed={color === item}
            type="button"
          />
        ))}
        <label className="custom-color pressable" title={copy.customColor}>
          <input type="color" value={color} onChange={(event) => setColor(event.target.value)} aria-label={copy.customColor} />
          <span>＋</span>
        </label>
      </div>
      <div className="size-picker" aria-label={copy.brushSize}>
        {sizes.map((item) => (
          <button key={item} className={`size-dot pressable ${size === item ? "selected" : ""}`} onClick={() => setSize(item)} aria-label={`${copy.brushSize}: ${item}`} aria-pressed={size === item} type="button">
            <span style={{ width: item, height: item }} />
          </button>
        ))}
      </div>
      {tool === "sticker" ? (
        <div className="sticker-picker" aria-label={copy.chooseSticker}>
          {stickerCatalog.map((item) => (
            <button key={item.id} className={`sticker-choice pressable ${selectedSticker === item.id ? "selected" : ""}`} onClick={() => { setSelectedSticker(item.id); playSparkle(); }} aria-label={`${copy.chooseSticker}: ${item.id}`} aria-pressed={selectedSticker === item.id} type="button">
              <Mark id={item.icon} />
            </button>
          ))}
          <span className="sticker-picker-current"><Mark id={activeSticker.icon} /></span>
        </div>
      ) : null}
      <canvas
        ref={canvasRef}
        className="doodle-canvas professional-canvas"
        aria-label={copy.canvasLabel}
        onPointerDown={(event) => {
          if (toolRef.current === "sticker") {
            placeSticker(event);
            return;
          }
          snapshot();
          drawingRef.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          const ctx = context();
          const p = point(event);
          ctx?.beginPath();
          ctx?.moveTo(p.x, p.y);
          paint(p.x, p.y, event.pressure);
        }}
        onPointerMove={(event) => {
          if (!drawingRef.current) return;
          const p = point(event);
          paint(p.x, p.y, event.pressure);
        }}
        onPointerUp={() => { drawingRef.current = false; }}
        onPointerLeave={() => { drawingRef.current = false; }}
        onPointerCancel={() => { drawingRef.current = false; }}
      />
      <div className="create-actions drawing-actions">
        <button className="pictorial-tool pressable" type="button" aria-label={copy.undo} onClick={undo} disabled={!history.length}><Undo2 /></button>
        <button className="pictorial-tool pressable" type="button" aria-label={copy.redo} onClick={redo} disabled={!redoHistory.length}><Redo2 /></button>
        <button className="pictorial-tool pressable clear-tool" type="button" aria-label={copy.clear} onClick={clearCanvas}><Trash2 /></button>
        <button className="giant-print-button save-button pressable" type="button" aria-label={copy.save} onClick={savePng}>💾 <span>{copy.save}</span></button>
        <button className="giant-print-button pressable" type="button" aria-label={copy.print} onClick={printPage}>🖨️ <span>{copy.print}</span></button>
      </div>
    </section>
  );
}
