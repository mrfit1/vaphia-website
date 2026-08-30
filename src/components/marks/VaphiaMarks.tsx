"use client";

import type { MarkId } from "@/lib/mark-ids";
export type { MarkId };

const PINK = "#ff5bac";
const CYAN = "#35d8eb";
const SUN = "#ffd65d";
const VIOLET = "#8a6bff";
const INK = "#39265f";
const MINT = "#82e2b7";
const PEACH = "#ff997a";

export function Mark({ id, className }: { id: MarkId; className?: string }) {
  return (
    <svg className={`v-mark ${className ?? ""}`} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      {renderMark(id)}
    </svg>
  );
}

export function markTint(id: MarkId): string {
  const map: Partial<Record<MarkId, string>> = {
    star: "#fff2ba", heart: "#ffe2f2", cupcake: "#ffe8dc", flower: "#ffe6f2",
    balloon: "#ffd9ec", moon: "#e7e0ff", sun: "#fff3bb", bunny: "#fff0d6",
    sparkle: "#dffaff", paint: "#e4ddff", book: "#e0f9ef", camera: "#e7e0ff",
    gift: "#ffe8dc", cloud: "#dff8ff", apple: "#ffe2f0", crown: "#fff2ba",
    music: "#ddf9f0", house: "#ffe6f2", butterfly: "#dffaff", smile: "#fff3bb",
    watch: "#ffe2f2", play: "#e4ddff", create: "#fff2ba", story: "#ddf9f0",
    "age-tiny": "#ffe8dc", "age-mid": "#ffd9ec", "age-big": "#fff2ba",
    bubble: "#dffaff", puzzle: "#e7e0ff", clap: "#ffe5d9", drum: "#ffe8dc",
    bin: "#ddf9f0", count: "#dffaff", train: "#e2dcff", find: "#ffe6f2",
    shape: "#e4ddff", path: "#ddf9ee", odd: "#fff2bd", pattern: "#e7e0ff",
    berry: "#ffe2f0", shadow: "#eee6ff", vania: "#dffaff", sophia: "#ffe2f2"
  };
  return map[id] || "#fff6fb";
}

function renderMark(id: MarkId) {
  switch (id) {
    case "star":
      return <path d="M40 8 48 30h22L52 44l8 24-20-14-20 14 8-24L10 30h22Z" fill={SUN} stroke={INK} strokeWidth="3" strokeLinejoin="round" />;
    case "heart":
      return <path d="M40 68C18 50 8 36 14 22c5-11 18-12 26-4 8-8 21-7 26 4 6 14-4 28-26 46Z" fill={PINK} stroke={INK} strokeWidth="3" />;
    case "cupcake":
      return (
        <>
          <path d="M22 40h36l-4 22H26Z" fill={PEACH} stroke={INK} strokeWidth="3" />
          <ellipse cx="40" cy="38" rx="20" ry="12" fill="#fff" stroke={INK} strokeWidth="3" />
          <circle cx="32" cy="34" r="4" fill={PINK} />
          <circle cx="48" cy="33" r="4" fill={CYAN} />
          <circle cx="40" cy="30" r="4" fill={SUN} />
          <path d="M40 16v10" stroke={PINK} strokeWidth="4" />
        </>
      );
    case "flower":
      return (
        <>
          <circle cx="40" cy="24" r="10" fill={PINK} />
          <circle cx="24" cy="36" r="10" fill={PINK} />
          <circle cx="56" cy="36" r="10" fill={PINK} />
          <circle cx="28" cy="54" r="10" fill={PINK} />
          <circle cx="52" cy="54" r="10" fill={PINK} />
          <circle cx="40" cy="40" r="9" fill={SUN} stroke={INK} strokeWidth="3" />
        </>
      );
    case "balloon":
      return (
        <>
          <ellipse cx="40" cy="32" rx="18" ry="24" fill={PINK} stroke={INK} strokeWidth="3" />
          <path d="M40 56c0 10-8 16-2 20" stroke={INK} strokeWidth="3" fill="none" />
          <ellipse cx="33" cy="24" rx="5" ry="8" fill="#fff" opacity=".55" />
        </>
      );
    case "moon":
      return <path d="M50 12a26 26 0 1 0 10 48 22 22 0 1 1-10-48Z" fill={VIOLET} stroke={INK} strokeWidth="3" />;
    case "sun":
      return (
        <>
          <circle cx="40" cy="40" r="14" fill={SUN} stroke={INK} strokeWidth="3" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4;
            return <line key={i} x1={40 + Math.cos(a) * 20} y1={40 + Math.sin(a) * 20} x2={40 + Math.cos(a) * 28} y2={40 + Math.sin(a) * 28} stroke={SUN} strokeWidth="4" strokeLinecap="round" />;
          })}
        </>
      );
    case "bunny":
      return (
        <>
          <ellipse cx="28" cy="22" rx="7" ry="16" fill="#fff" stroke={INK} strokeWidth="3" />
          <ellipse cx="52" cy="22" rx="7" ry="16" fill="#fff" stroke={INK} strokeWidth="3" />
          <circle cx="40" cy="48" r="18" fill="#fff" stroke={INK} strokeWidth="3" />
          <circle cx="33" cy="46" r="3" fill={INK} />
          <circle cx="47" cy="46" r="3" fill={INK} />
          <ellipse cx="40" cy="54" rx="4" ry="3" fill={PINK} />
        </>
      );
    case "sparkle":
      return (
        <>
          <path d="M40 8 44 32 68 36 44 40 40 64 36 40 12 36 36 32Z" fill={CYAN} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <circle cx="62" cy="18" r="5" fill={SUN} />
        </>
      );
    case "paint":
      return (
        <>
          <rect x="22" y="28" width="36" height="28" rx="10" fill={VIOLET} stroke={INK} strokeWidth="3" />
          <circle cx="30" cy="40" r="5" fill={PINK} />
          <circle cx="42" cy="42" r="5" fill={CYAN} />
          <circle cx="54" cy="40" r="5" fill={SUN} />
          <path d="M28 28c4-12 20-12 24 0" stroke={INK} strokeWidth="3" fill={PEACH} />
        </>
      );
    case "book":
      return (
        <>
          <path d="M14 18h24c8 0 12 4 12 12v36H26c-8 0-12-4-12-12V18Z" fill={CYAN} stroke={INK} strokeWidth="3" />
          <path d="M66 18H42c-8 0-12 4-12 12v36h24c8 0 12-4 12-12V18Z" fill={PINK} stroke={INK} strokeWidth="3" />
        </>
      );
    case "camera":
      return (
        <>
          <rect x="14" y="28" width="52" height="32" rx="10" fill={VIOLET} stroke={INK} strokeWidth="3" />
          <circle cx="40" cy="44" r="10" fill={CYAN} stroke={INK} strokeWidth="3" />
          <rect x="30" y="20" width="20" height="10" rx="4" fill={PINK} stroke={INK} strokeWidth="3" />
        </>
      );
    case "gift":
      return (
        <>
          <rect x="16" y="34" width="48" height="32" rx="8" fill={PINK} stroke={INK} strokeWidth="3" />
          <rect x="16" y="24" width="48" height="12" rx="6" fill={SUN} stroke={INK} strokeWidth="3" />
          <rect x="36" y="24" width="8" height="42" fill={CYAN} stroke={INK} strokeWidth="2" />
        </>
      );
    case "cloud":
      return <path d="M22 50h38a14 14 0 1 0-3-28 16 16 0 0 0-31 8 12 12 0 0 0-4 20Z" fill={CYAN} stroke={INK} strokeWidth="3" />;
    case "apple":
      return (
        <>
          <path d="M40 22c18-2 26 14 22 30-4 16-28 20-30 6-2 14-26 10-30-6C-2 36 6 20 24 22c6-8 10-8 16 0Z" fill={PINK} stroke={INK} strokeWidth="3" />
          <path d="M40 22c2-8 10-12 16-10" stroke={MINT} strokeWidth="4" fill="none" />
        </>
      );
    case "crown":
      return <path d="M12 54h56L58 28 40 42 22 26 12 54Z" fill={SUN} stroke={INK} strokeWidth="3" strokeLinejoin="round" />;
    case "music":
      return (
        <>
          <circle cx="28" cy="56" r="10" fill={PINK} stroke={INK} strokeWidth="3" />
          <circle cx="56" cy="50" r="10" fill={CYAN} stroke={INK} strokeWidth="3" />
          <path d="M38 56V18h28v32" stroke={INK} strokeWidth="4" fill="none" />
        </>
      );
    case "house":
      return (
        <>
          <path d="M10 40 40 14l30 26" stroke={INK} strokeWidth="3" fill={PINK} />
          <rect x="20" y="40" width="40" height="28" fill={CYAN} stroke={INK} strokeWidth="3" />
          <rect x="34" y="48" width="12" height="20" fill={SUN} stroke={INK} strokeWidth="2" />
        </>
      );
    case "butterfly":
      return (
        <>
          <ellipse cx="24" cy="28" rx="14" ry="16" fill={PINK} stroke={INK} strokeWidth="3" />
          <ellipse cx="56" cy="28" rx="14" ry="16" fill={CYAN} stroke={INK} strokeWidth="3" />
          <ellipse cx="24" cy="54" rx="12" ry="12" fill={VIOLET} stroke={INK} strokeWidth="3" />
          <ellipse cx="56" cy="54" rx="12" ry="12" fill={SUN} stroke={INK} strokeWidth="3" />
          <rect x="37" y="18" width="6" height="46" rx="3" fill={INK} />
        </>
      );
    case "smile":
      return (
        <>
          <circle cx="40" cy="40" r="24" fill={SUN} stroke={INK} strokeWidth="3" />
          <circle cx="32" cy="34" r="4" fill={INK} />
          <circle cx="48" cy="34" r="4" fill={INK} />
          <path d="M28 46q12 12 24 0" stroke={INK} strokeWidth="3" fill="none" />
        </>
      );
    case "watch":
      return (
        <>
          <circle cx="40" cy="40" r="22" fill={PINK} stroke={INK} strokeWidth="3" />
          <path d="M32 28l20 12-20 12V28Z" fill="#fff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        </>
      );
    case "play":
      return (
        <>
          <rect x="16" y="18" width="48" height="34" rx="10" fill={VIOLET} stroke={INK} strokeWidth="3" />
          <circle cx="28" cy="62" r="8" fill={CYAN} stroke={INK} strokeWidth="3" />
          <circle cx="52" cy="62" r="8" fill={PINK} stroke={INK} strokeWidth="3" />
          <path d="M34 28h6v14h10" stroke={SUN} strokeWidth="4" fill="none" />
        </>
      );
    case "create":
      return (
        <>
          <rect x="28" y="10" width="10" height="44" rx="5" fill={SUN} stroke={INK} strokeWidth="3" />
          <path d="M24 52h18l4 16H22Z" fill={PINK} stroke={INK} strokeWidth="3" />
          <circle cx="56" cy="24" r="10" fill={CYAN} stroke={INK} strokeWidth="3" />
        </>
      );
    case "story":
      return (
        <>
          <rect x="14" y="16" width="36" height="48" rx="8" fill={CYAN} stroke={INK} strokeWidth="3" />
          <rect x="30" y="22" width="36" height="48" rx="8" fill={PINK} stroke={INK} strokeWidth="3" />
          <path d="M38 34h20M38 44h16" stroke="#fff" strokeWidth="3" />
        </>
      );
    case "age-tiny":
      return (
        <>
          <ellipse cx="40" cy="50" rx="22" ry="18" fill={PEACH} stroke={INK} strokeWidth="3" />
          <circle cx="40" cy="30" r="16" fill="#ffe8dc" stroke={INK} strokeWidth="3" />
          <circle cx="34" cy="28" r="3" fill={INK} />
          <circle cx="46" cy="28" r="3" fill={INK} />
          <path d="M34 36q6 6 12 0" stroke={INK} strokeWidth="3" fill="none" />
        </>
      );
    case "age-mid":
      return (
        <>
          <ellipse cx="32" cy="34" rx="14" ry="20" fill={PINK} stroke={INK} strokeWidth="3" />
          <ellipse cx="50" cy="38" rx="12" ry="18" fill={CYAN} stroke={INK} strokeWidth="3" />
          <path d="M32 54c0 10-6 16 0 20M50 56c0 8 6 14 0 18" stroke={INK} strokeWidth="3" fill="none" />
        </>
      );
    case "age-big":
      return (
        <>
          <circle cx="40" cy="40" r="22" fill={SUN} stroke={INK} strokeWidth="3" />
          <path d="M40 22 46 36h16L50 46l6 16-16-10-16 10 6-16-12-10h16Z" fill={PINK} stroke={INK} strokeWidth="2" />
        </>
      );
    case "bubble":
      return (
        <>
          <circle cx="36" cy="40" r="20" fill={CYAN} opacity=".85" stroke={INK} strokeWidth="3" />
          <circle cx="56" cy="24" r="10" fill="#fff" opacity=".7" stroke={INK} strokeWidth="2" />
          <circle cx="28" cy="30" r="5" fill="#fff" opacity=".8" />
        </>
      );
    case "puzzle":
      return (
        <>
          <path d="M16 16h20c0 8 12 8 12 0h16v20c-8 0-8 12 0 12v16H44c0-8-12-8-12 0H16V48c8 0 8-12 0-12V16Z" fill={VIOLET} stroke={INK} strokeWidth="3" />
        </>
      );
    case "clap":
      return (
        <>
          <path d="M22 50c-6-10 4-22 14-16l4 6 4-16c4-6 14-2 12 8l-2 20" fill={PEACH} stroke={INK} strokeWidth="3" />
          <path d="M30 54c-4-8 8-18 16-10l6 10" fill={PINK} stroke={INK} strokeWidth="3" />
        </>
      );
    case "drum":
      return (
        <>
          <ellipse cx="40" cy="28" rx="24" ry="10" fill={PINK} stroke={INK} strokeWidth="3" />
          <path d="M16 28v24c0 6 10 10 24 10s24-4 24-10V28" fill={CYAN} stroke={INK} strokeWidth="3" />
          <path d="M12 16l20 20M68 14 48 36" stroke={SUN} strokeWidth="4" />
        </>
      );
    case "bin":
      return (
        <>
          <path d="M20 28h40l-6 36H26Z" fill={MINT} stroke={INK} strokeWidth="3" />
          <rect x="18" y="20" width="44" height="10" rx="4" fill={PINK} stroke={INK} strokeWidth="3" />
        </>
      );
    case "count":
      return (
        <>
          <rect x="14" y="18" width="52" height="44" rx="12" fill={CYAN} stroke={INK} strokeWidth="3" />
          <circle cx="28" cy="36" r="6" fill={SUN} />
          <circle cx="40" cy="48" r="6" fill={PINK} />
          <circle cx="54" cy="34" r="6" fill="#fff" />
        </>
      );
    case "train":
      return (
        <>
          <rect x="14" y="28" width="50" height="26" rx="8" fill={VIOLET} stroke={INK} strokeWidth="3" />
          <rect x="44" y="16" width="16" height="16" rx="4" fill={CYAN} stroke={INK} strokeWidth="3" />
          <circle cx="28" cy="58" r="8" fill={PINK} stroke={INK} strokeWidth="3" />
          <circle cx="52" cy="58" r="8" fill={SUN} stroke={INK} strokeWidth="3" />
        </>
      );
    case "find":
      return (
        <>
          <circle cx="34" cy="34" r="16" fill="#fff" stroke={INK} strokeWidth="4" />
          <path d="M46 46 64 64" stroke={PINK} strokeWidth="6" strokeLinecap="round" />
          <circle cx="34" cy="34" r="6" fill={CYAN} />
        </>
      );
    case "shape":
      return (
        <>
          <rect x="14" y="30" width="22" height="22" fill={VIOLET} stroke={INK} strokeWidth="3" />
          <circle cx="56" cy="40" r="14" fill={PINK} stroke={INK} strokeWidth="3" />
        </>
      );
    case "path":
      return (
        <>
          <path d="M12 54c12-24 20 8 32-16 10-20 16 4 24 2" stroke={CYAN} strokeWidth="8" fill="none" strokeLinecap="round" />
          <circle cx="14" cy="54" r="7" fill={PINK} stroke={INK} strokeWidth="3" />
          <circle cx="68" cy="40" r="7" fill={SUN} stroke={INK} strokeWidth="3" />
        </>
      );
    case "odd":
      return (
        <>
          <circle cx="24" cy="40" r="12" fill={SUN} stroke={INK} strokeWidth="3" />
          <circle cx="56" cy="40" r="12" fill={PINK} stroke={INK} strokeWidth="3" />
          <rect x="34" y="16" width="12" height="20" rx="3" fill={CYAN} stroke={INK} strokeWidth="3" />
        </>
      );
    case "pattern":
      return (
        <>
          <circle cx="20" cy="40" r="10" fill={PINK} stroke={INK} strokeWidth="3" />
          <rect x="34" y="30" width="20" height="20" fill={CYAN} stroke={INK} strokeWidth="3" />
          <circle cx="66" cy="40" r="10" fill={PINK} stroke={INK} strokeWidth="3" />
        </>
      );
    case "berry":
      return (
        <>
          <circle cx="32" cy="44" r="14" fill={PINK} stroke={INK} strokeWidth="3" />
          <circle cx="50" cy="42" r="12" fill="#e84193" stroke={INK} strokeWidth="3" />
          <path d="M40 18c4 8-2 14-8 16" stroke={MINT} strokeWidth="4" fill="none" />
        </>
      );
    case "shadow":
      return (
        <>
          <ellipse cx="40" cy="54" rx="22" ry="10" fill={VIOLET} opacity=".45" />
          <circle cx="40" cy="32" r="16" fill={INK} opacity=".35" stroke={INK} strokeWidth="3" />
        </>
      );
    case "triangle":
      return <path d="M40 12 68 64H12Z" fill={VIOLET} stroke={INK} strokeWidth="3" strokeLinejoin="round" />;
    case "circle":
      return <circle cx="40" cy="40" r="24" fill={PINK} stroke={INK} strokeWidth="3" />;
    case "square":
      return <rect x="16" y="16" width="48" height="48" rx="10" fill={CYAN} stroke={INK} strokeWidth="3" />;
    case "dot-sm":
      return <circle cx="40" cy="40" r="8" fill={PINK} stroke={INK} strokeWidth="3" />;
    case "dot-md":
      return <circle cx="40" cy="40" r="16" fill={CYAN} stroke={INK} strokeWidth="3" />;
    case "dot-lg":
      return <circle cx="40" cy="40" r="26" fill={SUN} stroke={INK} strokeWidth="3" />;
    case "pink":
      return <circle cx="40" cy="40" r="24" fill={PINK} stroke={INK} strokeWidth="3" />;
    case "cyan":
      return <circle cx="40" cy="40" r="24" fill={CYAN} stroke={INK} strokeWidth="3" />;
    case "gold":
      return <circle cx="40" cy="40" r="24" fill={SUN} stroke={INK} strokeWidth="3" />;
    case "green":
      return <circle cx="40" cy="40" r="24" fill={MINT} stroke={INK} strokeWidth="3" />;
    case "vania":
      return sister("vania");
    case "sophia":
      return sister("sophia");
    default:
      return <circle cx="40" cy="40" r="22" fill={SUN} stroke={INK} strokeWidth="3" />;
  }
}

function sister(kind: "vania" | "sophia") {
  const dress = kind === "sophia" ? PINK : CYAN;
  const skin = kind === "sophia" ? "#ffd4e6" : "#d7f7fb";
  return (
    <>
      <ellipse cx="40" cy="58" rx="18" ry="16" fill={dress} stroke={INK} strokeWidth="3" />
      <circle cx="40" cy="32" r="16" fill={skin} stroke={INK} strokeWidth="3" />
      <circle cx="26" cy="22" r="7" fill={dress} stroke={INK} strokeWidth="2" />
      <circle cx="54" cy="22" r="7" fill={dress} stroke={INK} strokeWidth="2" />
      <circle cx="34" cy="32" r="2.5" fill={INK} />
      <circle cx="46" cy="32" r="2.5" fill={INK} />
      <path d="M34 40q6 6 12 0" stroke={INK} strokeWidth="2" fill="none" />
    </>
  );
}

export const GAME_ICON: Record<string, MarkId> = {
  memory: "star",
  "balloon-pop": "balloon",
  catch: "star",
  puzzle: "puzzle",
  simon: "paint",
  "color-bins": "bin",
  count: "count",
  hidden: "find",
  odd: "odd",
  "shape-fit": "shape"
};
