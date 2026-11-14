import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.primeaxus.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    select: { id: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });

  const staticRoutes = [
    "",
    "/products",
    "/contact",
    "/privacy",
    "/terms",
    "/shipping-policy",
    "/return-policy",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteUrl}/products/${product.id}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
