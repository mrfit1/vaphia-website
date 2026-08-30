"use client";

import { soundsAllowed } from "@/lib/prefs";
import type { Locale } from "@/lib/i18n";

let audioCtx: AudioContext | null = null;

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

export function playCheer() {
  if (!soundsAllowed()) return;
  void ctx()?.resume();
  [523, 659, 784, 1046].forEach((freq, index) => tone(freq, index * 0.09, 0.22, "triangle", 0.11));
  tone(1568, 0.38, 0.28, "sine", 0.08);
}

export function playWin() {
  playCheer();
  playSparkle();
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

export function playPop() {
  if (!soundsAllowed()) return;
  void ctx()?.resume();
  tone(240, 0, 0.06, "square", 0.06);
  tone(720, 0.03, 0.08, "triangle", 0.05);
}
