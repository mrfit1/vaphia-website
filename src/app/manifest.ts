import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vaphia",
    short_name: "Vaphia",
    description: "Vania & Sophia — videos, free games, creativity and family-friendly fun.",
    start_url: "/en",
    display: "standalone",
    background_color: "#fff8fd",
    theme_color: "#fff8fd",
    categories: ["kids", "games", "entertainment", "education"],
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }]
  };
}
