"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { createOrder, getCartProducts } from "@/features/cart/actions";
import { useCart } from "@/hooks/use-cart";
import type { StoreProduct } from "@/types";
import { TextureButton } from "@/components/ui/texture-button";
import { Input } from "@/components/ui/input";
import Skeleton from "@/components/shared/skeleton";
import { toast } from "sonner";
import { cn, formatPrice } from "@/lib/utils";
import {
  CheckCircle,
  ChevronLeft,
  Lock,
  Money,
  ShieldCheck,
  Truck,
  TruckFast,
} from "reicon-react";

const shippingMethods = [
  {
    id: "standard",
    label: "Standard delivery",
    detail: "5–7 business days",
    price: 0,
    icon: Truck,
  },
  {
    id: "express",
    label: "Express delivery",
    detail: "1–2 business days",
    price: 5000,
    icon: TruckFast,
  },
] as const;

const inputClass =
  "h-11 rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:ring-1 focus:ring-primary";

function SectionTitle({
  step,
  title,
}: {
  step: number;
  title: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
        {step}
      </span>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
    </div>
  );
}

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [fetchedFor, setFetchedFor] = useState<string | null>(null);
  const [shippingMethod, setShippingMethod] =
    useState<(typeof shippingMethods)[number]["id"]>("standard");
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

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
  const shipping =
    shippingMethods.find((method) => method.id === shippingMethod)?.price ?? 0;
  const total = subtotal + shipping;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (cartRows.length === 0) return;

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const firstName = String(form.get("firstName") ?? "").trim();
    const lastName = String(form.get("lastName") ?? "").trim();
    const address = String(form.get("address") ?? "").trim();
    const city = String(form.get("city") ?? "").trim();
    const zip = String(form.get("zip") ?? "").trim();
    const country = String(form.get("country") ?? "").trim();

    const toastId = toast.loading("Placing your order...");
    startTransition(async () => {
      try {
        const { orderId } = await createOrder({
          customerName: `${firstName} ${lastName}`,
          customerEmail: email,
          address: `${address}, ${city}, ${zip}, ${country}`,
          shipping,
          paymentMethod: "Cash on Delivery",
          items: items.map((item) => ({
            productId: item.productId,
            size: item.size,
            qty: item.qty,
          })),
        });
        clear();
        setPlacedOrderId(orderId);
        toast.success("Order placed", { id: toastId });
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to place order",
          { id: toastId },
        );
      }
    });
  }

  if (placedOrderId) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-tertiary/10 text-tertiary">
          <CheckCircle size={32} />
        </span>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Order confirmed
        </h1>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Thanks for your order (ref {placedOrderId.slice(-8).toUpperCase()}).
          A confirmation email is on its way — your order will be dispatched
          within 1–2 business days.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <TextureButton
            render={<Link href="/products" />}
          >
            Continue shopping
          </TextureButton>
          <TextureButton
            variant="secondary"
            render={<Link href="/" />}
          >
            Back to home
          </TextureButton>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-8">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-4 h-9 w-48" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px] lg:gap-10">
          <div className="space-y-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 sm:p-6">
                <Skeleton className="h-7 w-40" />
                <div className="mt-4 space-y-3">
                  <Skeleton className="h-11 w-full" />
                  <Skeleton className="h-11 w-full" />
                  <Skeleton className="h-11 w-2/3" />
                </div>
              </div>
            ))}
          </div>
          <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <Skeleton className="h-5 w-32" />
            <div className="mt-4 space-y-4">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
            <Skeleton className="mt-5 h-9 w-full rounded-full" />
          </aside>
        </div>
      </main>
    );
  }

  if (cartRows.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Your cart is empty
        </h1>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          Add something to your cart before checking out.
        </p>
        <TextureButton
          className="mt-8"
          render={<Link href="/products" />}
        >
          Browse products
        </TextureButton>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mb-8">
        <Link
          href="/cart"
          className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft size={16} />
          Back to cart
        </Link>
        <h1 className="text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-semibold tracking-tight text-foreground">
          Checkout
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Secure checkout — your details stay encrypted end to end.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px] lg:gap-10">
        <form id="checkout-form" className="space-y-6" onSubmit={onSubmit}>
          <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <SectionTitle step={1} title="Contact" />
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="h-11 rounded-lg px-3.5 text-sm"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Order updates and your digital receipt will be sent here.
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <SectionTitle step={2} title="Shipping address" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-foreground"
                >
                  First name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  placeholder="Alex"
                  className="h-11 rounded-lg px-3.5 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-foreground"
                >
                  Last name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  placeholder="Rivera"
                  className="h-11 rounded-lg px-3.5 text-sm"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-foreground"
                >
                  Street address
                </label>
                <Input
                  id="address"
                  name="address"
                  required
                  placeholder="128 Marlow Lane, Apt 4B"
                  className="h-11 rounded-lg px-3.5 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="city"
                  className="text-sm font-medium text-foreground"
                >
                  City
                </label>
                <Input
                  id="city"
                  name="city"
                  required
                  placeholder="San Francisco"
                  className="h-11 rounded-lg px-3.5 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="zip"
                    className="text-sm font-medium text-foreground"
                  >
                    ZIP / Postal
                  </label>
                  <Input
                    id="zip"
                    name="zip"
                    required
                    placeholder="94110"
                    className="h-11 rounded-lg px-3.5 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="country"
                    className="text-sm font-medium text-foreground"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    defaultValue="US"
                    className={cn(inputClass, "w-full")}
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="DE">Germany</option>
                    <option value="AE">UAE</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <SectionTitle step={3} title="Delivery method" />
            <div className="space-y-3">
              {shippingMethods.map((method) => {
                const Icon = method.icon;
                const selected = shippingMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setShippingMethod(method.id)}
                    aria-pressed={selected}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition-all",
                      selected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:bg-muted/40",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "grid h-10 w-10 shrink-0 place-items-center rounded-full",
                          selected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        <Icon size={18} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {method.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {method.detail}
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        selected ? "text-primary" : "text-foreground",
                      )}
                    >
                      {method.price === 0 ? "Free" : formatPrice(method.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <SectionTitle step={4} title="Payment" />
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4 rounded-xl border border-primary bg-primary/5 p-4 text-left ring-1 ring-primary">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Money size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Pay when your order arrives
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary">
                  Selected
                </span>
              </div>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock size={13} />
                Online payment is not available — you&apos;ll pay in cash at
                your door.
              </p>
            </div>
          </section>

          <TextureButton
            type="submit"
            className="w-full lg:hidden"
            disabled={pending}
          >
            {pending
              ? "Placing order..."
              : `Place order — ${formatPrice(total)}`}
          </TextureButton>
        </form>

        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
          <h2 className="mb-4 text-base font-semibold text-foreground">
            Order summary
          </h2>

          <div className="space-y-4">
            {cartRows.map((item) => (
              <div
                key={`${item.id}:${item.size ?? ""}`}
                className="flex items-center gap-3"
              >
                <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {item.image ? (
                    <Image
                      fill
                      sizes="48px"
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                      No img
                    </div>
                  )}
                  <span className="absolute -right-0 -top-0 grid h-4 w-4 place-items-center rounded-full bg-foreground text-[9px] font-semibold text-background">
                    {item.qty}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {item.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.type ?? item.category}
                    {item.size ? ` · Size ${item.size}` : ""}
                  </p>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {formatPrice(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-medium text-foreground">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="font-medium text-foreground">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Service fee</span>
              <span className="font-medium text-foreground">
                {formatPrice(0)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="text-base font-medium text-foreground">Total</span>
            <span className="text-lg font-medium text-foreground">
              {formatPrice(total)}
            </span>
          </div>

          <TextureButton
            type="submit"
            form="checkout-form"
            className="mt-5 hidden w-full lg:inline-flex"
            disabled={pending}
          >
            {pending
              ? "Placing order..."
              : `Place order — ${formatPrice(total)}`}
          </TextureButton>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck size={13} className="text-tertiary" />
            Protected by 256-bit encryption
          </p>
        </aside>
      </div>
    </main>
  );
}
