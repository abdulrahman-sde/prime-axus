import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ProductDetail from "@/features/products/components/product-detail";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getProduct(id: string) {
  return prisma.product.findFirst({
    where: { id, status: "ACTIVE" },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product Not Found", robots: { index: false } };

  const description = product.description
    ? product.description.length > 160
      ? `${product.description.slice(0, 157)}...`
      : product.description
    : `Shop ${product.name} at Prime Axus — fair prices, fast delivery.`;

  return {
    title: product.name,
    description,
    alternates: {
      canonical: `/products/${product.id}`,
    },
    openGraph: {
      title: product.name,
      description,
      type: "website",
      images: product.image ? [{ url: product.image, alt: product.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);
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
