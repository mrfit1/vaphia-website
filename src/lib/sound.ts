"use client";

import { soundsAllowed } from "@/lib/prefs";
import type { Locale } from "@/lib/i18n";

let audioCtx: AudioContext | null = null;
let winIndex = 0;

function ctx() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

function tone(frequency: number, start: number, duration: number, type: OscillatorType = "sine", gain = 0.12) {
  const context = ctx();
  if (!context) return;
  const osc = context.createOscillator();
  const node = context.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  node.gain.setValueAtTime(gain, context.currentTime + start);
  node.gain.exponentialRampToValueAtTime(0.001, context.currentTime + start + duration);
  osc.connect(node);
  node.connect(context.destination);
  osc.start(context.currentTime + start);
  osc.stop(context.currentTime + start + duration + 0.02);
}

export function playTap() {
  if (!soundsAllowed()) return;
  void ctx()?.resume();
  tone(620, 0, 0.08, "triangle", 0.09);
}

export function playSparkle() {
  if (!soundsAllowed()) return;
  void ctx()?.resume();
  tone(880, 0, 0.09, "sine", 0.08);
  tone(1320, 0.05, 0.1, "sine", 0.06);
  tone(1760, 0.1, 0.12, "triangle", 0.05);
}

export function playCheer(variant = winIndex++) {
  if (!soundsAllowed()) return;
  void ctx()?.resume();
  const patterns = [
    [523, 659, 784, 1046, 1568],
    [392, 523, 659, 784, 1174],
    [440, 554, 698, 880, 1320],
    [587, 740, 880, 1174, 1480]
  ];
  const pattern = patterns[Math.abs(variant) % patterns.length];
  pattern.forEach((freq, index) => tone(freq, index * 0.085, index === pattern.length - 1 ? 0.3 : 0.2, index % 2 ? "sine" : "triangle", 0.1));
}

export function playWin(variant = winIndex++) {
  playCheer(variant);
  if (variant % 2 === 0) playSparkle();
  else playPageTone();
}

export function speakCheer(_locale: Locale) {
  return;
}

export function speakText(text: string, locale: Locale) {
  if (!soundsAllowed() || typeof window === "undefined" || !window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = locale === "fa" ? "fa-IR" : locale === "fr" ? "fr-FR" : locale === "es" ? "es-ES" : "en-US";
  utter.rate = 0.92;
  utter.pitch = 1.1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
  return utter;
}

export function stopSpeech() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}

export function playNote(frequency: number) {
  if (!soundsAllowed()) return;
  void ctx()?.resume();
  tone(frequency, 0, 0.28, "triangle", 0.1);
}

export function playPageTone() {
  if (!soundsAllowed()) return;
  void ctx()?.resume();
  tone(392, 0, 0.12, "sine", 0.05);
  tone(523, 0.08, 0.16, "sine", 0.05);
}

export function playPageTurn() {
  if (!soundsAllowed()) return;
  void ctx()?.resume();
  tone(330, 0, 0.08, "sine", 0.04);
  tone(494, 0.07, 0.12, "sine", 0.04);
}

export function playPop() {
  if (!soundsAllowed()) return;
  void ctx()?.resume();
  tone(240, 0, 0.06, "square", 0.06);
  tone(720, 0.03, 0.08, "triangle", 0.05);
}
