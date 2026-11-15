"use server";

import { prisma } from "@/lib/prisma";
import type { StoreProduct } from "@/types";

export async function getCartProducts(
  ids: string[],
): Promise<StoreProduct[]> {
  if (ids.length === 0) return [];

  const products = await prisma.product.findMany({
    where: { id: { in: ids } },
  });

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    type: p.type,
    category: p.category,
    sizes: p.sizes,
    price: p.price.toNumber(),
    stock: p.stock,
    image: p.image,
  }));
}
