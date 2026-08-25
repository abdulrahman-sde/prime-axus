"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { TextureButton } from "@/components/ui/texture-button";
import { cn } from "@/lib/utils";
import type { CategoryTile } from "./shop-by-category";

const CATEGORY_IMAGES: Record<string, string> = {
  "Home & Kitchen": "/landing/category-kitchen.png",
  "Office Products": "/landing/category-office.png",
  "Pet Supplies": "/landing/category-pets.png",
};

const SLIDE_CONTENT: Record<
  string,
  { title: string; description: string }
> = {
  "Home & Kitchen": {
    title: "Every corner, covered.",
    description: "Cookware and kitchen gear — priced fair, delivered fast.",
  },
  "Office Products": {
    title: "Workspace, upgraded.",
    description: "Desk and office supplies for smoother workdays.",
  },
  "Pet Supplies": {
    title: "Happy pets, hassle-free.",
    description: "Toys, feeders, and care must-haves they'll love.",
  },
};

function categoryHref(name: string) {
  return `/products?category=${encodeURIComponent(name)}`;
}

export default function Hero({
  categories,
}: {
  categories: CategoryTile[];
}) {
  // Slide imagery is always the static assets from /public/landing — the DB
  // only supplies live product counts per category.
  const slides = [
    "Home & Kitchen",
    "Office Products",
    "Pet Supplies",
  ].map((name) => {
    const existing = categories.find((c) => c.name === name);
    return {
      name,
      image: CATEGORY_IMAGES[name],
      count: existing?.count ?? 0,
    };
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [AutoPlay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);
  const slide = slides[selected];
  const content = SLIDE_CONTENT[slide.name];

  return (
    <section className="relative min-h-[86dvh] overflow-hidden">
      {/* Base backdrop — paints instantly and shows through if a slide is slow */}
      <div className="absolute inset-0">
        <Image
          alt=""
          fill
          sizes="100vw"
          src="/landing/hero.jpg"
          className="object-cover"
        />
      </div>

      {/* Background slides */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={slide.name} className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden">
              <Image
                alt={slide.name}
                fill
                priority={index === 0}
                sizes="100vw"
                className={cn(
                  "object-cover transition-transform duration-[7000ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
                  index === selected ? "scale-105" : "scale-100",
                )}
                src={slide.image}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scrims */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/75 via-black/35 to-black/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black/65 to-transparent" />

      {/* Foreground content */}
      <div className="relative mx-auto flex min-h-[86dvh] w-full max-w-7xl items-end px-4 pb-36 pt-28 sm:items-center sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
        <div key={selected} className="max-w-[600px]">
          <h1
            className="animate-rise text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "0.15s" }}
          >
            {content.title}
          </h1>

          <p
            className="animate-rise mt-4 max-w-md text-sm leading-6 text-white/80 sm:text-base"
            style={{ animationDelay: "0.25s" }}
          >
            {content.description}
          </p>

          <div
            className="animate-rise mt-8 flex items-center gap-6"
            style={{ animationDelay: "0.35s" }}
          >
            <TextureButton
              className="h-10"
              render={<Link href={categoryHref(slide.name)} />}
            >
              Shop {slide.name}
            </TextureButton>
            <Link
              href="/products"
              className="text-sm font-medium text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Browse everything
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel dots */}
      <div className="absolute inset-x-0 bottom-7 z-10 flex justify-center">
        <div className="flex items-center gap-2.5 rounded-full bg-white/10 px-3 py-2 backdrop-blur-md">
          {slides.map((slide, index) => (
            <button
              key={slide.name}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Show ${slide.name}`}
              aria-current={index === selected}
              className={cn(
                "rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                index === selected
                  ? "h-2 w-6 bg-white"
                  : "h-2 w-2 bg-white/40 hover:bg-white/70",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
