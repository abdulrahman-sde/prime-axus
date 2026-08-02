import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const heroImage =
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1920&q=80";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          alt=""
          className="h-full w-full object-cover"
          src={heroImage}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/45 to-black/70" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
            Curated electronics
          </p>
          <h1 className="mx-auto max-w-[18ch] text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Gear that feels like an upgrade from day one.
          </h1>
          <p className="mx-auto max-w-[58ch] text-base leading-7 text-white/85 sm:text-lg">
            Headphones, cameras, laptops, and accessories — bench-tested by
            our engineers and picked to last.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            className="rounded-full px-5 py-3 text-sm font-semibold"
            render={<Link href="/products" />}
          >
            Shop featured
          </Button>
          <Link
            href="/products"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 hover:text-white",
            )}
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
