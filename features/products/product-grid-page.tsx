import Link from "next/link";
import type { StoreProduct } from "@/types";
import ProductCard from "@/features/products/components/product-card";
import { TextureButton } from "@/components/ui/texture-button";
import { cn } from "@/lib/utils";

export default function ProductsPage({
  activeCategory,
  search,
  products,
}: {
  activeCategory: string | null;
  search: string | null;
  products: StoreProduct[];
}) {
  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean) as string[]),
  );

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
                {search
                  ? `Results for "${search}"`
                  : activeCategory ?? "All products"}
              </h1>
              <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
                {search
                  ? "Here's what matches your search across the collection."
                  : "Every piece in the collection — hand-picked fits, ready to ship."}
              </p>
            </div>
            <TextureButton
              variant="secondary"
              render={<Link href="/" />}
            >
              Back to home
            </TextureButton>
          </div>

          {categories.length > 1 && (
            <div className="mb-8 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
              <Link
                href="/products"
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  activeCategory === null
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-primary/60",
                )}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/products?category=${encodeURIComponent(cat)}`}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                    activeCategory === cat
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary/60",
                  )}
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 py-24 text-center">
              <p className="text-base font-medium text-foreground">
                {search
                  ? `No results for "${search}"`
                  : activeCategory
                    ? `Nothing in ${activeCategory} yet`
                    : "The collection is empty"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {search
                  ? "Try a different search term or browse all products."
                  : "Check back soon — new pieces are being added."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
