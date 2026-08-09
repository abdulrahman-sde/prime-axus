import { prisma } from "@/lib/prisma";

export interface TopCategory {
  name: string;
  image: string;
  count: number;
}

const CATALOG: { name: string; image: string }[] = [
  { name: "Stitch", image: U("photo-1445205170230-053b83016050") },
  { name: "Unstitched", image: U("photo-1771098206944-ac1633b8276d") },
  { name: "Daily usage essentials", image: U("photo-1770801153497-959241fce3ae") },
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
