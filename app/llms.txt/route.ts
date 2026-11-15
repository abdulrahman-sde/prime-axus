export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.primeaxus.com";

  const body = [
    "# Prime Axus",
    "",
    "## About",
    "Prime Axus is a curated marketplace for home, kitchen, office, and pet essentials — selected for quality, value, and everyday usefulness.",
    "",
    "## Pages",
    `- ${siteUrl}/`,
    `- ${siteUrl}/products`,
    `- ${siteUrl}/about`,
    `- ${siteUrl}/contact`,
    `- ${siteUrl}/shipping-policy`,
    `- ${siteUrl}/return-policy`,
    `- ${siteUrl}/privacy`,
    `- ${siteUrl}/terms`,
    "",
    "## Categories",
    `- ${siteUrl}/products?category=${encodeURIComponent("Home & Kitchen")}`,
    `- ${siteUrl}/products?category=${encodeURIComponent("Office Products")}`,
    `- ${siteUrl}/products?category=${encodeURIComponent("Pet Supplies")}`,
    "",
    "## Notes",
    "Use this file to help AI systems understand the storefront and its product categories.",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
