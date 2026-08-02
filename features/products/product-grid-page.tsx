import Link from "next/link";
import { shopProducts } from "@/constants/products";
import ProductCard from "@/features/products/components/product-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  return (
    <div className="bg-background text-foreground">
      <main>
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                The collection
              </p>
              <h1 className="mt-2 text-[clamp(1.75rem,1.5rem+1.5vw,2.75rem)] font-semibold tracking-tight text-foreground">
                All prints
              </h1>
              <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
                Every piece in the gallery — signed editions, giclées, and
                museum mounts, ready to hang.
              </p>
            </div>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full",
              )}
            >
              Back to home
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {shopProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
