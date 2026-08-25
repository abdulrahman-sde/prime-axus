import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "reicon-react";
import { TextureButton } from "@/components/ui/texture-button";

export default function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          fill
          priority
          sizes="100vw"
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1920&auto=format&fit=crop"
          alt="Fresh ingredients and cookware on a kitchen counter"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-foreground/95 via-foreground/75 to-foreground/20" />

        <div className="relative px-6 py-20 sm:px-12 sm:py-24 lg:px-16 lg:pt-22 lg:pb-18">
          <div className="max-w-xl space-y-6">
            <h2 className="text-4xl font-medium leading-[1.08] tracking-tight text-background sm:text-5xl">
              Everything your home runs on.
            </h2>
            <p className="max-w-md text-base leading-7 text-background/80 sm:text-lg">
              Kitchen to office to pet corner — practical pieces, priced fair,
              delivered fast.
            </p>
            <div className="pt-2">
              <TextureButton
                variant="inverse"
                render={<Link href="/products" />}
              >
                See the collection
                <ArrowRight size={18} />
              </TextureButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
