"use client";

import { tokenStyle, type TokenId } from "@/lib/art";

export function TokenFace({ id, className, silhouette = false }: { id: TokenId; className?: string; silhouette?: boolean }) {
  return (
    <span
      className={`token-face ${silhouette ? "token-silhouette" : ""} ${className ?? ""}`}
      style={tokenStyle(id)}
      role="img"
      aria-label={id}
    />
  );
}
