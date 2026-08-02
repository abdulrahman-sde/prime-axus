"use client";

import { useState } from "react";
import Link from "next/link";
import { shopProducts } from "@/constants/products";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  Lock,
  Minus,
  Plus,
  ShoppingCart,
  Tag,
  Trash,
} from "reicon-react";

type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  qty: number;
};

const initialCart: CartItem[] = shopProducts.slice(0, 3).map((p, index) => ({
  id: p.id,
  name: p.name,
  description: p.description,
  price: p.price,
  image: p.image,
  qty: index === 2 ? 2 : 1,
}));

const SHIPPING: number = 0;

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount + SHIPPING;
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const updateQty = (id: number, delta: number) => {
    setCart((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCart((items) => items.filter((item) => item.id !== id));
  };

  const applyPromo = () => {
    if (promoInput.trim().toUpperCase() === "LUXE10") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoApplied(false);
      setPromoError(true);
    }
  };

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

        {cart.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border bg-card px-6 py-20 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-muted">
              <ShoppingCart size={24} className="text-muted-foreground" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Your cart is empty
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Explore the collection and find your next frame.
              </p>
            </div>
            <Link
              href="/products"
              className={cn(buttonVariants(), "rounded-full px-6")}
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px] lg:gap-10">
            <div className="space-y-0 rounded-xl border border-border bg-card">
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex gap-4 p-4 sm:gap-6 sm:p-5",
                    index > 0 && "border-t border-border",
                  )}
                >
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-28 sm:w-24">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-foreground">
                          {item.name}
                        </h3>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {item.description}
                        </p>
                        <p className="mt-1 text-sm font-medium text-foreground">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <Trash size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-full border border-border bg-background">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-foreground">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, 1)}
                          aria-label="Increase quantity"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-foreground">
                        ${(item.price * item.qty).toLocaleString()}
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
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                {promoApplied && (
                  <div className="flex items-center justify-between text-tertiary">
                    <span>Promo (LUXE10)</span>
                    <span className="font-medium">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-medium text-foreground">
                    {SHIPPING === 0 ? "Free" : `$${SHIPPING.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>LuxeFrame service fee</span>
                  <span className="font-medium text-foreground">$0.00</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-lg border border-dashed border-border bg-background p-1.5">
                <Tag size={16} className="ml-2 shrink-0 text-muted-foreground" />
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value);
                    setPromoError(false);
                  }}
                  placeholder="Promo code (try LUXE10)"
                  className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
                />
                <button
                  type="button"
                  onClick={applyPromo}
                  className="shrink-0 rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background transition-opacity hover:opacity-85 active:scale-[0.97]"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="mt-2 text-xs text-error">
                  That code isn&apos;t valid. Try LUXE10.
                </p>
              )}

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="text-base font-bold text-foreground">
                  Total
                </span>
                <span className="text-lg font-bold text-foreground">
                  ${total.toLocaleString()}
                </span>
              </div>

              <Button
                className="mt-5 w-full rounded-full py-3 text-sm font-semibold"
                render={<Link href="/checkout" />}
              >
                Checkout
              </Button>

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
