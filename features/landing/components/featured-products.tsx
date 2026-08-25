import Link from "next/link";
import { ShoppingCart } from "reicon-react";
import ProductCard from "@/features/products/components/product-card";
import type { StoreProduct } from "@/types";
import EmptyPanel from "./empty-panel";

export type FeaturedProduct = StoreProduct;

export default function FeaturedProducts({
  products,
}: {
  products: FeaturedProduct[];
}) {
  return (
    <section className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-medium tracking-tight text-foreground">
            Featured this week
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This week&apos;s most-wanted finds across the store.
          </p>
        </div>
        {products.length > 0 && (
          <Link
            href="/products"
            className="shrink-0 text-sm font-medium text-primary transition-colors hover:underline"
          >
            View all
          </Link>
        )}
      </div>

      {products.length === 0 ? (
        <EmptyPanel
          icon={ShoppingCart}
          title="New arrivals are on the way"
          description="Featured products appear here as soon as they're listed. Check back soon."
        />
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="min-w-0">
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
