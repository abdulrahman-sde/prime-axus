import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.primeaxus.com";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prime Axus",
    short_name: "Prime Axus",
    description:
      "Curated home, kitchen, office, and pet essentials with fair pricing and reliable delivery.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0d",
    theme_color: "#0b0b0d",
    icons: [
      {
        src: "/landing/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    scope: "/",
    id: "/",
    lang: "en",
    orientation: "portrait",
    categories: ["shopping", "business"],
    url: siteUrl,
  };
}
