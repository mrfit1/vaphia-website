"use client";

import type { SceneId } from "@/lib/stories/scenes";
export type { SceneId };

const PINK = "#ff5bac";
const CYAN = "#35d8eb";
const SUN = "#ffd65d";
const INK = "#39265f";
const MINT = "#82e2b7";
const VIOLET = "#8a6bff";

function Sophia({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g className="scene-sister sophia-bob" transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="26" rx="16" ry="15" fill={PINK} stroke={INK} strokeWidth="2.4" />
      <circle cx="0" cy="0" r="13" fill="#ffd4e6" stroke={INK} strokeWidth="2.4" />
      <circle cx="-12" cy="-10" r="6" fill={PINK} stroke={INK} strokeWidth="2" />
      <circle cx="12" cy="-10" r="6" fill={PINK} stroke={INK} strokeWidth="2" />
      <circle cx="-5" cy="-1" r="2" fill={INK} />
      <circle cx="5" cy="-1" r="2" fill={INK} />
      <path d="M-5 7q5 5 10 0" stroke={INK} strokeWidth="2" fill="none" />
    </g>
  );
}

function Vania({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g className="scene-sister vania-bob" transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="26" rx="16" ry="15" fill={CYAN} stroke={INK} strokeWidth="2.4" />
      <circle cx="0" cy="0" r="13" fill="#d7f7fb" stroke={INK} strokeWidth="2.4" />
      <circle cx="-12" cy="-10" r="6" fill={CYAN} stroke={INK} strokeWidth="2" />
      <circle cx="12" cy="-10" r="6" fill={CYAN} stroke={INK} strokeWidth="2" />
      <circle cx="-5" cy="-1" r="2" fill={INK} />
      <circle cx="5" cy="-1" r="2" fill={INK} />
      <path d="M-5 7q5 5 10 0" stroke={INK} strokeWidth="2" fill="none" />
    </g>
  );
}

function Room({ sky = "#ffe6f2", wall = "#fff6fb", floor = "#f3e4c8" }: { sky?: string; wall?: string; floor?: string }) {
  return (
    <>
      <rect width="400" height="320" fill={sky} />
      <rect y="70" width="400" height="180" fill={wall} />
      <rect y="250" width="400" height="70" fill={floor} />
      <rect x="250" y="90" width="90" height="80" rx="8" fill="#dffaff" stroke={INK} strokeWidth="3" />
      <path d="M250 130h90" stroke={INK} strokeWidth="2" />
      <path d="M295 90v80" stroke={INK} strokeWidth="2" />
    </>
  );
}

function Garden({ dusk = false }: { dusk?: boolean }) {
  return (
    <>
      <rect width="400" height="320" fill={dusk ? "#2c2154" : "#c8f3ff"} />
      {dusk ? <circle cx="320" cy="60" r="22" fill={SUN} /> : <circle cx="70" cy="56" r="24" fill={SUN} className="scene-twinkle" />}
      <ellipse cx="200" cy="300" rx="240" ry="70" fill={dusk ? "#355c48" : MINT} />
      <rect x="40" y="170" width="18" height="90" fill="#8a5a32" />
      <circle cx="49" cy="160" r="36" fill="#3dae72" className="scene-sway" />
      <rect x="320" y="190" width="16" height="70" fill="#8a5a32" />
      <circle cx="328" cy="184" r="28" fill="#2f9a64" className="scene-sway-late" />
    </>
  );
}

export function StoryScene({ scene }: { scene: SceneId }) {
  return (
    <svg className="story-scene" viewBox="0 0 400 320" role="img" aria-hidden="true">
      {renderScene(scene)}
    </svg>
  );
}

function renderScene(scene: SceneId) {
  switch (scene) {
    case "sofa-still":
    case "room-balloon":
      return (
        <>
          <Room />
          <rect x="70" y="200" width="160" height="50" rx="18" fill={VIOLET} stroke={INK} strokeWidth="3" />
          <Sophia x={110} y={188} />
          <g className="scene-float">
            <ellipse cx="250" cy="120" rx="22" ry="30" fill={PINK} stroke={INK} strokeWidth="3" />
            <path d="M250 150c0 16-10 22-2 30" stroke={INK} strokeWidth="3" fill="none" />
          </g>
        </>
      );
    case "room-window":
      return (
        <>
          <Room sky="#e7e0ff" wall="#fff0f7" />
          <Sophia x={140} y={190} />
          <Vania x={200} y={196} scale={0.92} />
          <g className="scene-float">
            <ellipse cx="290" cy="120" rx="16" ry="22" fill={PINK} stroke={INK} strokeWidth="3" />
          </g>
        </>
      );
    case "garden-star":
    case "hill-star":
      return (
        <>
          <Garden dusk />
          {Array.from({ length: 7 }, (_, i) => (
            <circle key={i} className="scene-twinkle" cx={40 + i * 48} cy={30 + (i % 3) * 18} r={i % 2 ? 3 : 4} fill={SUN} />
          ))}
          <Vania x={180} y={200} />
          <path d="M220 120 228 140h22l-18 14 6 22-18-12-18 12 6-22-18-14h22Z" fill={SUN} stroke={INK} strokeWidth="2" className="scene-twinkle" />
        </>
      );
    case "kitchen-share":
    case "kitchen-secret":
    case "kitchen-honey":
      return (
        <>
          <Room sky="#fff3bb" wall="#fff8e8" floor="#efd7b0" />
          <rect x="40" y="170" width="150" height="80" fill="#d9b48a" stroke={INK} strokeWidth="3" />
          <rect x="250" y="150" width="90" height="100" fill="#f0c3a0" stroke={INK} strokeWidth="3" />
          <Sophia x={100} y={150} />
          <Vania x={170} y={154} />
          <ellipse cx="300" cy="150" rx="18" ry="16" fill={PINK} stroke={INK} strokeWidth="2" className="scene-bob" />
          <rect x="286" y="150" width="28" height="18" fill="#ffe8dc" stroke={INK} strokeWidth="2" />
        </>
      );
    case "night-moon":
    case "bed-moon":
      return (
        <>
          <rect width="400" height="320" fill="#2a2150" />
          <circle cx="310" cy="70" r="28" fill="#f4ecff" className="scene-twinkle" />
          <circle cx="298" cy="62" r="18" fill="#2a2150" />
          {Array.from({ length: 8 }, (_, i) => (
            <circle key={i} className="scene-twinkle" cx={30 + i * 42} cy={24 + (i % 2) * 20} r="3" fill={SUN} />
          ))}
          <rect y="230" width="400" height="90" fill="#3b2d66" />
          <rect x="80" y="200" width="180" height="70" rx="20" fill={PINK} stroke={INK} strokeWidth="3" />
          <Sophia x={130} y={196} />
          <Vania x={200} y={200} scale={0.9} />
        </>
      );
    case "room-cat":
      return (
        <>
          <Room sky="#fff0f7" />
          <Sophia x={120} y={188} />
          <g className="scene-bob" transform="translate(280 210)">
            <ellipse cx="0" cy="8" rx="18" ry="12" fill="#fff" stroke={INK} strokeWidth="2.4" />
            <circle cx="12" cy="-4" r="9" fill="#fff" stroke={INK} strokeWidth="2.4" />
            <path d="M6 -10l-2 8M18 -10l2 8" fill="#fff" stroke={INK} strokeWidth="2" />
            <circle cx="15" cy="-5" r="1.4" fill={INK} />
          </g>
        </>
      );
    case "garden-apple":
      return (
        <>
          <Garden />
          <Vania x={200} y={198} />
          <circle cx="120" cy="150" r="40" fill="#3dae72" className="scene-sway" />
          <rect x="112" y="180" width="14" height="50" fill="#8a5a32" />
          <circle cx="132" cy="200" r="10" fill={PINK} stroke={INK} strokeWidth="2" className="scene-bob" />
        </>
      );
    case "rain-yard":
      return (
        <>
          <Garden />
          <rect width="400" height="140" fill="#9fd4e8" />
          {Array.from({ length: 10 }, (_, i) => (
            <line key={i} className="scene-rain" x1={20 + i * 38} y1="10" x2={10 + i * 38} y2="70" stroke={CYAN} strokeWidth="3" />
          ))}
          <Sophia x={150} y={200} />
          <Vania x={230} y={204} />
          <path d="M150 168c20-28 50-28 70 0" stroke={PINK} strokeWidth="5" fill="#ffe2f2" />
        </>
      );
    case "window-star":
      return (
        <>
          <Room sky="#1f1840" wall="#3a2d66" floor="#2a2150" />
          <Sophia x={130} y={190} />
          <Vania x={200} y={194} />
          <circle cx="295" cy="120" r="10" fill={SUN} className="scene-twinkle" />
        </>
      );
    case "garden-butterfly":
      return (
        <>
          <Garden />
          <Sophia x={170} y={200} />
          <g className="scene-flutter" transform="translate(240 110)">
            <ellipse cx="-12" cy="0" rx="12" ry="16" fill={PINK} stroke={INK} strokeWidth="2" />
            <ellipse cx="12" cy="0" rx="12" ry="16" fill={CYAN} stroke={INK} strokeWidth="2" />
            <rect x="-2" y="-14" width="4" height="28" rx="2" fill={INK} />
          </g>
          <circle cx="120" cy="210" r="14" fill={PINK} />
        </>
      );
    case "bath-bubbles":
      return (
        <>
          <rect width="400" height="320" fill="#dffaff" />
          <rect y="180" width="400" height="140" fill={CYAN} />
          <rect x="70" y="150" width="260" height="120" rx="40" fill="#fff" stroke={INK} strokeWidth="3" />
          <Sophia x={150} y={168} />
          <Vania x={230} y={172} />
          <circle className="scene-float" cx="110" cy="140" r="16" fill="#fff" stroke={INK} strokeWidth="2" />
          <circle className="scene-float-late" cx="300" cy="130" r="12" fill="#fff" stroke={INK} strokeWidth="2" />
          <circle className="scene-bob" cx="200" cy="120" r="10" fill="#fff" stroke={INK} strokeWidth="2" />
        </>
      );
    case "garden-whisper":
      return (
        <>
          <Garden />
          <Sophia x={150} y={200} />
          <Vania x={230} y={206} />
          <circle cx="80" cy="210" r="16" fill={PINK} className="scene-sway" />
          <circle cx="320" cy="220" r="14" fill={SUN} className="scene-sway-late" />
        </>
      );
    case "room-paper-moon":
      return (
        <>
          <Room sky="#e7e0ff" />
          <Sophia x={140} y={190} />
          <circle cx="290" cy="120" r="26" fill="#f7f2ff" stroke={INK} strokeWidth="3" className="scene-bob" />
          <path d="M278 118q12 10 24 0" stroke={INK} strokeWidth="2" fill="none" />
        </>
      );
    case "room-train":
      return (
        <>
          <Room sky="#fff3bb" wall="#fffaf0" />
          <Vania x={120} y={186} />
          <Sophia x={190} y={190} scale={0.9} />
          <g className="scene-chug">
            <rect x="240" y="200" width="70" height="28" rx="8" fill={VIOLET} stroke={INK} strokeWidth="2" />
            <rect x="292" y="186" width="22" height="18" rx="4" fill={CYAN} stroke={INK} strokeWidth="2" />
            <circle cx="256" cy="230" r="8" fill={PINK} stroke={INK} strokeWidth="2" />
            <circle cx="296" cy="230" r="8" fill={SUN} stroke={INK} strokeWidth="2" />
          </g>
        </>
      );
    case "park-tree":
      return (
        <>
          <Garden />
          <Sophia x={150} y={200} />
          <Vania x={230} y={204} />
          <rect x="188" y="120" width="20" height="100" fill="#8a5a32" />
          <circle cx="198" cy="110" r="50" fill="#2f9a64" className="scene-sway" />
        </>
      );
    default:
      return (
        <>
          <Room />
          <Sophia x={150} y={190} />
          <Vania x={230} y={194} />
        </>
      );
  }
}
