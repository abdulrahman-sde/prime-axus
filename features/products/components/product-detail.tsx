"use client";

import { useState } from "react";
import Image from "next/image";
import type { StoreProduct } from "@/types";
import { formatPrice } from "@/lib/utils";
import { AwardCertificate, Truck, Verified } from "reicon-react";
import AddToCartButton from "@/features/cart/add-to-cart-button";

export default function ProductDetail({ product }: { product: StoreProduct }) {
  const inStock = product.stock === null || product.stock > 0;
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes[0] ?? null,
  );

  const specs = [
    { label: "Category", value: product.category ?? "\u2014" },
    { label: "Type", value: product.type ?? "\u2014" },
    { label: "Availability", value: inStock ? "In stock" : "Sold out" },
    {
      label: "Stock",
      value: product.stock === null ? "Unlimited" : String(product.stock),
    },
  ];

  const sizeSelector = product.sizes.length > 0 && (
    <div>
      <div className="mb-2">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          Size
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {product.sizes.map((size) => (
          <button
            key={size}
            type="button"
            aria-pressed={selectedSize === size}
            onClick={() => setSelectedSize(size)}
            className={`min-w-11 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
              selectedSize === size
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:border-primary/60"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mb-lg">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
          {product.category ?? "Collection"}
        </p>
        <h1 className="mb-2 mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {product.name}
        </h1>
        {product.type && (
          <p className="text-sm text-muted-foreground">{product.type}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted lg:sticky lg:top-28 lg:aspect-auto lg:h-[560px]">
          {product.image ? (
            <Image
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full object-cover"
              src={product.image}
              alt={product.name}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-foreground">
                {formatPrice(product.price)}
              </span>
              {inStock && (
                <span className="rounded-full bg-tertiary/10 px-2.5 py-1 text-xs font-medium text-tertiary">
                  In stock
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {inStock ? "Ready to ship within 1\u20132 business days" : "Currently sold out"}
            </p>
          </div>

          {sizeSelector}

          {product.description && (
            <div>
              <h2 className="mb-2 text-sm font-semibold tracking-tight text-foreground">
                About this product
              </h2>
              <p className="whitespace-pre-line text-base leading-relaxed text-foreground">
                {product.description}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <AddToCartButton
              productId={product.id}
              size={selectedSize}
              soldOut={!inStock}
              disabled={product.sizes.length > 0 && !selectedSize}
            />
            <p className="text-center text-xs text-muted-foreground">
              Cash on Delivery — you won&apos;t be charged yet
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Truck size={18} className="shrink-0 text-primary" />
              <span>Free standard shipping on all orders</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <AwardCertificate size={18} className="shrink-0 text-primary" />
              <span>Bench-tested quality with warranty</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Verified size={18} className="shrink-0 text-primary" />
              <span>Quality Verified — every unit checked before dispatch</span>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold tracking-tight text-foreground">
              Specifications
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {specs.map((spec) => (
                <div key={spec.label} className="rounded-lg bg-card p-4">
                  <div className="text-xs text-muted-foreground">
                    {spec.label}
                  </div>
                  <div className="mt-0.5 text-sm font-medium text-foreground">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-40 -mx-4 flex items-center justify-between gap-4 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 md:hidden">
        <div>
          <span className="text-xl font-medium text-foreground">
            {formatPrice(product.price)}
          </span>
        </div>
        <div className="w-40">
          <AddToCartButton
            productId={product.id}
            size={selectedSize}
            soldOut={!inStock}
            disabled={product.sizes.length > 0 && !selectedSize}
          />
        </div>
      </div>
    </main>
  );
}
