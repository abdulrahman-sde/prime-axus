import Image from "next/image";
import Link from "next/link";
import { TextureButton } from "@/components/ui/texture-button";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          alt="Seasonal apparel collection"
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
          src="/hero.webp"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-black/10" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="max-w-xl space-y-5">
          <p
            className="animate-rise text-xs font-medium uppercase tracking-[0.28em] text-white/80"
            style={{ animationDelay: "0.05s" }}
          >
            Curated apparel
          </p>
          <h1
            className="animate-rise text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.15s" }}
          >
            Own the everyday.
          </h1>
          <p
            className="animate-rise max-w-md text-base leading-7 text-white/85 sm:text-lg"
            style={{ animationDelay: "0.25s" }}
          >
            T-shirts, hoodies, and sneakers. Hand-picked for fit, fabric, and
            feel that lasts.
          </p>
          <div
            className="animate-rise pt-2"
            style={{ animationDelay: "0.35s" }}
          >
            <TextureButton
              // size="lg"
              className="h-12"
              render={<Link href="/products" />}
            >
              Shop the collection
            </TextureButton>
          </div>
        </div>
      </div>
    </section>
  );
}
