import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { expandCategory } from "@/lib/category-tree";
import ProductGridPage from "@/features/products/product-grid-page";

// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse the full Prime Axus catalog — kitchen, office, and pet essentials with fair prices and fast delivery.",
  alternates: {
    canonical: "/products",
  },
};

export default async function ProductsRoute({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;

  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      ...(category ? { category: { in: expandCategory(category) } } : {}),
      ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <ProductGridPage
      activeCategory={category ?? null}
      search={search ?? null}
      products={products.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        type: p.type,
        category: p.category,
        sizes: p.sizes,
        price: p.price.toNumber(),
        stock: p.stock,
        image: p.image,
      }))}
    />
  );
}
