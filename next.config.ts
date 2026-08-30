import type { NextConfig } from "next";

const locales = ["en", "fa", "fr", "es"] as const;
const retiredGameIds = [
  "star-pairs", "heart-pairs", "cupcake-pairs", "catch-stars", "catch-hearts", "bubble-pop",
  "hero-puzzle", "garden-puzzle", "park-puzzle", "clap-along", "color-echo", "drum-beat",
  "size-sort", "fruit-basket", "count-stars", "number-train", "find-sophia", "find-vania",
  "sticker-hunt", "shape-twins", "shadow-match", "color-twins", "rainbow-path", "garden-path",
  "odd-star", "odd-flower", "pattern-beads", "pattern-blocks"
];

const supabaseHost = (() => {
  try {
    return process.env.NEXT_PUBLIC_SUPABASE_URL
      ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
      : null;
  } catch {
    return null;
  }
})();

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  `connect-src 'self'${supabaseHost ? ` https://${supabaseHost} wss://${supabaseHost}` : ""}`,
  "upgrade-insecure-requests"
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost }]
      : []
  },

  async redirects() {
    return locales.flatMap((locale) =>
      retiredGameIds.map((id) => ({
        source: `/${locale}/play/${id}`,
        destination: `/${locale}/play`,
        permanent: false
      }))
    );
  },
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }]
      },
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }
        ]
      }
    ];
  }
};

export default nextConfig;
