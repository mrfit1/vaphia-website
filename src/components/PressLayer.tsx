"use client";

import { useEffect } from "react";
import { playTap } from "@/lib/sound";

export function PressLayer() {
  useEffect(() => {
    function down(event: PointerEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest("a, button, [data-press]") as HTMLElement | null;
      if (!el) return;
      if (el.closest(".admin-shell") || el.tagName === "SELECT") return;
      if (el.getAttribute("data-quiet") === "true") return;
      el.classList.add("is-press");
      playTap();
    }
    function up() {
      document.querySelectorAll(".is-press").forEach((node) => node.classList.remove("is-press"));
    }
    document.addEventListener("pointerdown", down);
    document.addEventListener("pointerup", up);
    document.addEventListener("pointercancel", up);
    window.addEventListener("blur", up);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", up);
      window.removeEventListener("blur", up);
    };
  }, []);
  return null;
}
