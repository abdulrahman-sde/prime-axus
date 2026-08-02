import { shopProducts } from "@/constants/products";
import ProductDetail from "@/features/products/components/product-detail";

export function generateStaticParams() {
  return shopProducts.map((product) => ({ id: String(product.id) }));
}

export default async function ProductDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductDetail id={id} />;
}
