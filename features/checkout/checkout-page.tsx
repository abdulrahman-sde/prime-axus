"use client";

import { useState } from "react";
import Link from "next/link";
import { shopProducts } from "@/constants/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  ChevronLeft,
  CreditCard,
  Lock,
  ShieldCheck,
  Truck,
  TruckFast,
} from "reicon-react";

type OrderItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  qty: number;
};

const orderItems: OrderItem[] = shopProducts.slice(0, 3).map((p, index) => ({
  id: p.id,
  name: p.name,
  description: p.description,
  price: p.price,
  image: p.image,
  qty: index === 2 ? 2 : 1,
}));

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
    price: 18,
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
  const [shippingMethod, setShippingMethod] =
    useState<(typeof shippingMethods)[number]["id"]>("standard");
  const [placed, setPlaced] = useState(false);

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const shipping =
    shippingMethods.find((method) => method.id === shippingMethod)?.price ?? 0;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-tertiary/10 text-tertiary">
          <CheckCircle size={32} />
        </span>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Order confirmed
        </h1>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Thanks for your order. A confirmation email is on its way — your
          prints will be dispatched from our studio within 1–2 business days.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            className="rounded-full px-6"
            render={<Link href="/products" />}
          >
            Continue shopping
          </Button>
          <Button
            variant="outline"
            className="rounded-full px-6"
            render={<Link href="/" />}
          >
            Back to home
          </Button>
        </div>
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
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setPlaced(true);
          }}
        >
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
                      {method.price === 0 ? "Free" : `$${method.price}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <SectionTitle step={4} title="Payment" />
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="cardNumber"
                  className="text-sm font-medium text-foreground"
                >
                  Card number
                </label>
                <div className="relative">
                  <CreditCard
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="cardNumber"
                    required
                    inputMode="numeric"
                    placeholder="4242 4242 4242 4242"
                    className="h-11 rounded-lg pl-10 pr-3.5 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="expiry"
                    className="text-sm font-medium text-foreground"
                  >
                    Expiry date
                  </label>
                  <Input
                    id="expiry"
                    required
                    placeholder="MM / YY"
                    className="h-11 rounded-lg px-3.5 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="cvc"
                    className="text-sm font-medium text-foreground"
                  >
                    CVC
                  </label>
                  <Input
                    id="cvc"
                    required
                    inputMode="numeric"
                    placeholder="123"
                    className="h-11 rounded-lg px-3.5 text-sm"
                  />
                </div>
              </div>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock size={13} />
                Payments are encrypted and processed securely. This is a demo
                — no card is charged.
              </p>
            </div>
          </section>
        </form>

        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
          <h2 className="mb-4 text-base font-semibold text-foreground">
            Order summary
          </h2>

          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute -right-0 -top-0 grid h-4 w-4 place-items-center rounded-full bg-foreground text-[9px] font-semibold text-background">
                    {item.qty}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {item.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <span className="text-sm font-medium text-foreground">
                  ${(item.price * item.qty).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-medium text-foreground">
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="font-medium text-foreground">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>LuxeFrame service fee</span>
              <span className="font-medium text-foreground">$0.00</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="text-base font-bold text-foreground">Total</span>
            <span className="text-lg font-bold text-foreground">
              ${total.toLocaleString()}
            </span>
          </div>

          <Button
            type="submit"
            className="mt-5 w-full rounded-full py-3 text-sm font-semibold"
            onClick={() => setPlaced(true)}
          >
            Place order — ${total.toLocaleString()}
          </Button>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck size={13} className="text-tertiary" />
            Protected by 256-bit encryption
          </p>
        </aside>
      </div>
    </main>
  );
}
