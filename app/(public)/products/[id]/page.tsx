import { prisma } from "@/lib/prisma";
import ProductDetail from "@/features/products/components/product-detail";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: { id, status: "ACTIVE" },
  });
  if (!product) notFound();

  return (
    <ProductDetail
      product={{
        id: product.id,
        name: product.name,
        description: product.description,
        type: product.type,
        category: product.category,
        sizes: product.sizes,
        price: product.price.toNumber(),
        stock: product.stock,
        image: product.image,
      }}
    />
  );
}
