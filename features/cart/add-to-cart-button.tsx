"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";
import { ShoppingCart } from "reicon-react";

export default function AddToCartButton({
  productId,
  size,
  disabled,
  soldOut,
}: {
  productId: string;
  size?: string | null;
  disabled?: boolean;
  soldOut?: boolean;
}) {
  const { addItem } = useCart();

  if (soldOut) {
    return (
      <Link
        href="/products"
        className="flex w-full items-center justify-center rounded-lg border border-border py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
        aria-disabled
      >
        Sold out
      </Link>
    );
  }

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-3.5 text-sm font-medium text-muted-foreground"
      >
        Select a size
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        addItem(productId, size ?? null);
        toast.success("Added to cart");
      }}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]"
    >
      <ShoppingCart size={16} />
      Add to Cart
    </button>
  );
}
