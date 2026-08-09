import { prisma } from "@/lib/prisma";

export interface TopCategory {
  name: string;
  image: string;
  count: number;
}

const CATALOG: { name: string; image: string }[] = [
  { name: "Stitch", image: U("photo-1525507119028-ed4c629a60a3") },
  { name: "Unstitched", image: U("photo-1509631179647-0177331693ae") },
  { name: "Daily usage essentials", image: U("photo-1523381210434-271e8be1f52b") },
  { name: "T-Shirts", image: U("photo-1521572163474-6864f9cf17ab") },
  { name: "Hoodies", image: U("photo-1556821840-3a63f95609a7") },
  { name: "Jeans & Pants", image: U("photo-1542272604-787c3835535d") },
  { name: "Shoes", image: U("photo-1549298916-b41d501d3772") },
  { name: "Shirts", image: U("photo-1596755094514-f87e34085b2c") },
  { name: "Kurtas", image: U("photo-1441986300917-64674bd600d8") },
  { name: "Jackets", image: U("photo-1551028719-00167b16eac5") },
  { name: "Sweatshirts", image: U("photo-1618354691373-d851c5c3a990") },
  { name: "Shorts", image: U("photo-1591195853828-11db59a44f6b") },
  { name: "Accessories", image: U("photo-1523170335258-f5ed11844a49") },
];

function U(id: string) {
  return `https://images.unsplash.com/${id}?w=900&q=80&auto=format&fit=crop`;
}

export async function getTopCategories(limit = 5): Promise<TopCategory[]> {
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    select: { category: true, image: true },
  });

  const counts = new Map<string, number>();
  const images = new Map<string, string>();
  for (const p of products) {
    if (!p.category) continue;
    counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    if (!images.has(p.category) && p.image) images.set(p.category, p.image);
  }

  return CATALOG.map((c) => ({
    ...c,
    image: images.get(c.name) ?? c.image,
    count: counts.get(c.name) ?? 0,
  }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
