"use client";

import Image from "next/image";

export function Paint({
  src,
  alt = "",
  className,
  priority = false
}: {
  src: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`paint-frame ${className ?? ""}`}>
      <Image src={src} alt={alt} fill sizes="100vw" priority={priority} />
    </span>
  );
}
