import type { SVGProps } from "react";

const INK = "#39265f";
const PINK = "#ff5bac";
const CYAN = "#35d8eb";
const SUN = "#ffd65d";
const VIOLET = "#8a6bff";
const MINT = "#82e2b7";
const PEACH = "#ff997a";

export type KidIconKind = "watch" | "play" | "create" | "explore";

type KidIconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  kind: KidIconKind;
};

export function KidIcon({ kind, className, ...props }: KidIconProps) {
  return (
    <svg
      {...props}
      className={`kid-icon ${className ?? ""}`}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {kind === "watch" && <WatchIcon />}
      {kind === "play" && <PlayIcon />}
      {kind === "create" && <CreateIcon />}
      {kind === "explore" && <ExploreIcon />}
    </svg>
  );
}

function WatchIcon() {
  return (
    <g stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M43 20 33 10M77 20l10-10" />
      <path d="M18 35c0-9 7-16 16-16h52c9 0 16 7 16 16v37c0 9-7 16-16 16H34c-9 0-16-7-16-16Z" fill={PINK} />
      <rect x="29" y="32" width="62" height="32" rx="11" fill={CYAN} />
      <circle cx="60" cy="48" r="12" fill={SUN} />
      <path d="m57 41 11 7-11 7Z" fill={INK} stroke="none" />
      <path d="M31 91v8M89 91v8" />
      <path d="M39 103h-12M93 103H81" />
      <circle cx="38" cy="75" r="3" fill={SUN} stroke="none" />
      <circle cx="82" cy="75" r="3" fill={SUN} stroke="none" />
      <path d="M43 75q17 12 34 0" stroke={INK} strokeWidth="3" />
      <path d="M37 47h2M81 47h2" stroke="#fff" strokeWidth="5" />
    </g>
  );
}

function PlayIcon() {
  return (
    <g stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 57c2-17 14-28 30-25 7-13 29-12 36 3 17-2 27 9 28 24 1 17-11 30-25 30-9 0-14-5-20-5s-11 5-20 5c-17 0-31-14-29-32Z" fill={VIOLET} />
      <path d="M33 58h18M42 49v18" />
      <circle cx="82" cy="55" r="6" fill={PINK} />
      <circle cx="95" cy="67" r="6" fill={SUN} />
      <circle cx="65" cy="75" r="3" fill={INK} stroke="none" />
      <circle cx="76" cy="75" r="3" fill={INK} stroke="none" />
      <path d="M67 81q6 6 12 0" strokeWidth="3" />
      <path d="M18 32c5-8 12-12 20-13M101 32c-3-7-8-11-15-13" stroke={SUN} strokeWidth="6" />
    </g>
  );
}

function CreateIcon() {
  return (
    <g stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 78c-3-16 8-30 24-34 16-4 34 2 40 15 6 13-3 27-19 31-19 5-42 4-45-12Z" fill={SUN} />
      <circle cx="40" cy="66" r="6" fill={PINK} />
      <circle cx="57" cy="57" r="6" fill={CYAN} />
      <circle cx="70" cy="73" r="6" fill={VIOLET} />
      <path d="M29 82c7 7 19 8 28 5" stroke="#fff" strokeWidth="5" />
      <path d="m73 24 17 17-28 28-18 3 3-18Z" fill={PINK} />
      <path d="m73 24 8-8 17 17-8 8Z" fill={CYAN} />
      <path d="m45 69-5 11 12-2" fill={PEACH} />
      <path d="M92 17 101 8M101 27l10-1M94 7l1-7" stroke={VIOLET} strokeWidth="5" />
    </g>
  );
}

function ExploreIcon() {
  return (
    <g stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 34c8-7 16-8 24-3 8 5 15 5 23-1 10-7 18-5 31 2v46c-11-7-20-9-30-3-8 5-16 5-24 0-8-5-15-5-24 1Z" fill={MINT} />
      <path d="M68 30v45" />
      <path d="M36 45q7-7 14 0M39 55h8" stroke={CYAN} strokeWidth="5" />
      <circle cx="82" cy="65" r="18" fill={SUN} />
      <circle cx="82" cy="65" r="8" fill={PINK} />
      <path d="m95 78 13 13" stroke={INK} strokeWidth="7" />
      <path d="m28 18 4 8 9 2-9 3-4 9-4-9-9-3 9-2Z" fill={PINK} />
      <path d="m96 18 3 6 7 2-7 2-3 7-3-7-7-2 7-2Z" fill={VIOLET} />
    </g>
  );
}

export function GameIcon({ mechanic, className }: { mechanic: string; className?: string }) {
  return (
    <svg className={`game-icon ${className ?? ""}`} viewBox="0 0 120 120" fill="none" aria-hidden="true" focusable="false">
      <circle cx="60" cy="60" r="51" fill="#fff" opacity=".55" />
      {mechanic === "memory" && <MemoryIcon />}
      {mechanic === "balloons" && <BalloonIcon />}
      {mechanic === "catch" && <CatchIcon />}
      {mechanic === "puzzle" && <PuzzleIcon />}
      {mechanic === "simon" && <SimonIcon />}
      {mechanic === "sort" && <SortIcon />}
      {mechanic === "count" && <CountIcon />}
      {mechanic === "hidden" && <HiddenIcon />}
      {mechanic === "odd" && <OddIcon />}
      {mechanic === "fit" && <FitIcon />}
    </svg>
  );
}

const gameStroke = { stroke: INK, strokeWidth: 4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function MemoryIcon() {
  return <g {...gameStroke}><rect x="23" y="25" width="31" height="38" rx="8" fill={PINK} /><rect x="66" y="33" width="31" height="38" rx="8" fill={CYAN} /><path d="M36 44q7-9 14 0M79 52q7-9 14 0" stroke="#fff" strokeWidth="5" /><path d="M37 75q10 11 20 0M72 83q10 11 20 0" /></g>;
}

function BalloonIcon() {
  return <g {...gameStroke}><ellipse cx="60" cy="49" rx="25" ry="31" fill={PINK} /><path d="m60 80-5 11h10Z" fill={SUN} /><path d="M60 91c-4 9 7 11 2 20" fill="none" /><path d="M49 32q6-9 13-3" stroke="#fff" strokeWidth="6" /></g>;
}

function CatchIcon() {
  return <g {...gameStroke}><path d="M22 71c5-20 16-35 32-35 9 0 16 5 22 14 5 8 10 11 20 9l-5 24c-10-4-17-1-26 5-16 10-36 4-43-17Z" fill={CYAN} /><path d="M61 29c6-12 21-12 24-1-7-3-12 1-16 7" fill={PINK} /><path d="M44 60q9-11 18 0M47 70h13" /><circle cx="42" cy="52" r="3" fill={INK} stroke="none" /><circle cx="65" cy="52" r="3" fill={INK} stroke="none" /><path d="m29 24 4 8 9 2-9 3-4 9-4-9-9-3 9-2Z" fill={SUN} /></g>;
}

function PuzzleIcon() {
  return <g {...gameStroke}><path d="M26 42h17c-2-12 16-15 17-2 0 1 0 2-1 4h18v18c-12-2-15 16-2 17 1 0 2 0 4-1v17H59c2-12-16-15-17-2 0 1 0 2 1 4H26V78c12 2 15-16 2-17-1 0-2 0-2 1Z" fill={VIOLET} /><circle cx="39" cy="55" r="3" fill={SUN} stroke="none" /><circle cx="73" cy="76" r="3" fill={PINK} stroke="none" /></g>;
}

function SimonIcon() {
  return <g {...gameStroke}><circle cx="60" cy="60" r="35" fill="#fff" /><path d="M60 60 60 25a35 35 0 0 1 35 35Z" fill={PINK} /><path d="M60 60h35a35 35 0 0 1-35 35Z" fill={SUN} /><path d="M60 60v35a35 35 0 0 1-35-35Z" fill={MINT} /><path d="M60 60H25a35 35 0 0 1 35-35Z" fill={CYAN} /><circle cx="60" cy="60" r="10" fill={INK} /><circle cx="57" cy="56" r="2" fill="#fff" stroke="none" /></g>;
}

function SortIcon() {
  return <g {...gameStroke}><path d="M23 42h28v43H30c-5 0-7-3-7-8Z" fill={PINK} /><path d="M69 42h28v35c0 5-2 8-7 8H69Z" fill={CYAN} /><circle cx="37" cy="59" r="7" fill={SUN} /><path d="m32 76 6-8 7 8" fill="none" /><circle cx="83" cy="59" r="7" fill={VIOLET} /><path d="M77 76h12" /><path d="M54 25h12v60H54Z" fill={MINT} /><path d="M49 25h22" /></g>;
}

function CountIcon() {
  return <g {...gameStroke}><path d="M31 33c0-7 6-12 13-12h30c8 0 14 5 14 12v47c0 8-6 13-14 13H44c-7 0-13-5-13-13Z" fill={CYAN} /><circle cx="46" cy="49" r="6" fill={PINK} /><circle cx="67" cy="44" r="6" fill={SUN} /><circle cx="55" cy="68" r="6" fill={VIOLET} /><circle cx="75" cy="75" r="6" fill={PINK} /><path d="M45 82q15 10 30 0" stroke="#fff" strokeWidth="4" /></g>;
}

function HiddenIcon() {
  return <g {...gameStroke}><circle cx="55" cy="55" r="29" fill={SUN} /><path d="M38 58q17-19 34 0" stroke={PINK} strokeWidth="6" /><circle cx="47" cy="51" r="3" fill={INK} stroke="none" /><circle cx="65" cy="51" r="3" fill={INK} stroke="none" /><path d="M78 78 99 99" stroke={PINK} strokeWidth="9" /><circle cx="55" cy="55" r="38" opacity=".4" /><path d="m25 22 4 8 9 2-9 3-4 9-4-9-9-3 9-2Z" fill={CYAN} /></g>;
}

function OddIcon() {
  return <g {...gameStroke}><circle cx="35" cy="63" r="20" fill={PINK} /><circle cx="84" cy="63" r="20" fill={PINK} /><rect x="49" y="28" width="22" height="38" rx="7" fill={CYAN} /><path d="M44 90q16 12 32 0" stroke={SUN} strokeWidth="7" /><circle cx="28" cy="58" r="3" fill={INK} stroke="none" /><circle cx="42" cy="58" r="3" fill={INK} stroke="none" /><circle cx="77" cy="58" r="3" fill={INK} stroke="none" /><circle cx="91" cy="58" r="3" fill={INK} stroke="none" /><path d="M56 44h8" stroke="#fff" strokeWidth="5" /></g>;
}

function FitIcon() {
  return <g {...gameStroke}><path d="M25 39 40 24l15 15-15 15Z" fill={PINK} /><circle cx="81" cy="42" r="17" fill={CYAN} /><path d="M30 72h25v25H30Z" fill={SUN} /><path d="M73 72h25v25H73Z" fill={VIOLET} /><path d="m34 85 8-9 9 9" stroke="#fff" strokeWidth="5" /><circle cx="81" cy="42" r="5" fill={SUN} stroke="none" /></g>;
}
