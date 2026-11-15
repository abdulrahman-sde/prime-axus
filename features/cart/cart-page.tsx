"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCartProducts } from "@/features/cart/actions";
import { useCart } from "@/hooks/use-cart";
import type { StoreProduct } from "@/types";
import { TextureButton } from "@/components/ui/texture-button";
import Skeleton from "@/components/shared/skeleton";
import { cn, formatPrice } from "@/lib/utils";
import {
  ChevronLeft,
  Lock,
  Minus,
  Plus,
  ShoppingCart,
  Trash,
} from "reicon-react";

const SHIPPING: number = 0;

export default function CartPage() {
  const { items, updateQty, removeItem } = useCart();
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [fetchedFor, setFetchedFor] = useState<string | null>(null);

  const itemsKey = items.map((item) => item.productId).join(",");
  const loading = fetchedFor !== itemsKey;

  useEffect(() => {
    let cancelled = false;
    getCartProducts(items.map((item) => item.productId)).then((result) => {
      if (!cancelled) {
        setProducts(result);
        setFetchedFor(itemsKey);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [itemsKey, items]);

  const productById = useMemo(
    () => new Map(products.map((p) => [p.id, p])),
    [products],
  );

  const cartRows = items
    .map((item) => {
      const product = productById.get(item.productId);
      if (!product) return null;
      return { ...product, qty: item.qty, size: item.size };
    })
    .filter(
      (row): row is StoreProduct & { qty: number; size: string | null } =>
        row !== null,
    );

  const subtotal = cartRows.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const total = subtotal + SHIPPING;
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="bg-background text-foreground">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/products"
              className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft size={16} />
              Continue shopping
            </Link>
            <h1 className="text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-semibold tracking-tight text-foreground">
              Shopping cart
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {itemCount} {itemCount === 1 ? "item" : "items"} ready to check
              out
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Orders ship within 1&ndash;2 business days
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px] lg:gap-10">
            <div className="space-y-0 rounded-xl border border-border bg-card">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-4 p-4 sm:gap-6 sm:p-5",
                    i > 0 && "border-t border-border",
                  )}
                >
                  <Skeleton className="h-24 w-20 shrink-0 sm:h-28 sm:w-24" />
                  <div className="flex flex-1 flex-col justify-between gap-3 py-1">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-8 w-24 rounded-lg" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
              <Skeleton className="h-5 w-32" />
              <div className="mt-5 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="mt-5 h-9 w-full rounded-lg" />
            </aside>
          </div>
        ) : cartRows.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border bg-card px-6 py-20 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-muted">
              <ShoppingCart size={24} className="text-muted-foreground" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Your cart is empty
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Explore the collection and find your next piece.
              </p>
            </div>
            <TextureButton
              variant="secondary"
              render={<Link href="/products" />}
            >
              Browse products
            </TextureButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px] lg:gap-10">
            <div className="space-y-0 rounded-xl border border-border bg-card">
              {cartRows.map((item, index) => (
                <div
                  key={`${item.id}:${item.size ?? ""}`}
                  className={cn(
                    "flex gap-4 p-4 sm:gap-6 sm:p-5",
                    index > 0 && "border-t border-border",
                  )}
                >
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-28 sm:w-24">
                    {item.image ? (
                      <Image
                        fill
                        sizes="(min-width: 640px) 96px, 80px"
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-foreground">
                          {item.name}
                        </h3>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {item.type ?? item.category ?? item.description}
                          {item.size ? ` · Size ${item.size}` : ""}
                        </p>
                        <p className="mt-1 text-sm font-medium text-foreground">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.size)}
                        aria-label={`Remove ${item.name}`}
                        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <Trash size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-lg border border-border bg-background">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-8 w-8 items-center justify-center text-foreground transition-colors hover:bg-muted"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-foreground">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                          aria-label="Increase quantity"
                          className="flex h-8 w-8 items-center justify-center text-foreground transition-colors hover:bg-muted"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {formatPrice(item.price * item.qty)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
              <h2 className="mb-4 text-base font-semibold text-foreground">
                Order summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>
                    Subtotal ({itemCount}{" "}
                    {itemCount === 1 ? "item" : "items"})
                  </span>
                  <span className="font-medium text-foreground">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-medium text-foreground">
                    {SHIPPING === 0 ? "Free" : formatPrice(SHIPPING)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Service fee</span>
                  <span className="font-medium text-foreground">
                    {formatPrice(0)}
                  </span>
                </div>
              </div>


              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="text-base font-medium text-foreground">
                  Total
                </span>
                <span className="text-lg font-medium text-foreground">
                  {formatPrice(total)}
                </span>
              </div>

              <TextureButton
                className="mt-5 w-full"
                render={<Link href="/checkout" />}
              >
                Checkout
              </TextureButton>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Lock size={13} />
                Secure checkout — you won&apos;t be charged yet
              </p>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
