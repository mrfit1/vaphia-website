export function afterPaint(fn: () => void) {
  if (typeof window === "undefined") return () => undefined;
  const id = window.setTimeout(fn, 0);
  return () => window.clearTimeout(id);
}
