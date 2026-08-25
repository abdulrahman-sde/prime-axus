import { prisma } from "@/lib/prisma";
import {
  CATEGORY_TREE,
  categoryChildren,
  type TopCategory,
} from "@/lib/category-tree";

export type { TopCategory };

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

  return CATEGORY_TREE.map((c) => {
    const children = categoryChildren(c.name);
    const ownCount = counts.get(c.name) ?? 0;
    const childrenCount = children.reduce(
      (sum, name) => sum + (counts.get(name) ?? 0),
      0,
    );
    return {
      name: c.name,
      image: images.get(c.name) ?? c.image,
      count: ownCount + childrenCount,
      ...(children.length
        ? {
            children: children.map((name) => ({
              name,
              count: counts.get(name) ?? 0,
            })),
          }
        : {}),
    };
  })
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
