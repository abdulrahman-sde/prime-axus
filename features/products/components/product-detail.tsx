import { getProductById } from "@/constants/productDetail";
import { notFound } from "next/navigation";
import {
  AwardCertificate,
  Brush,
  ChevronRight,
  Layers,
  Ruler,
  ShoppingCart,
  Truck,
  Verified,
} from "reicon-react";
import Link from "next/link";

const featureIcons: Record<string, typeof Brush> = {
  brush: Brush,
  workspace_premium: AwardCertificate,
  local_shipping: Truck,
};

export default function ProductDetail({ id }: { id: string }) {
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-lg">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {product.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="cursor-pointer underline">{product.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-xl lg:grid-cols-2 lg:gap-2xl">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl lg:sticky lg:top-28 lg:aspect-auto lg:h-[560px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${product.images[0]}')` }}
            />
            <div className="absolute inset-0 bg-foreground/5" />
          </div>

          <div className="space-y-2xl lg:space-y-3xl">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {product.subtitle}
              </h2>
              <p className="mt-1 text-base text-muted-foreground">
                Brand: {product.artist} · {product.edition}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-3xl font-bold text-foreground">
                  ${product.price}
                </span>
                <span className="text-base text-muted-foreground">
                  {" "}
                  / print
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-6">
                <label
                  htmlFor="quantity"
                  className="text-sm font-medium text-foreground"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  min={1}
                  defaultValue={1}
                  className="w-24 rounded-lg border border-border bg-background px-3 py-2 text-center text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <Link
                href="/cart"
                className="flex w-full items-center justify-center rounded-lg bg-primary py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]"
              >
                Add to Cart
              </Link>
              <p className="text-center text-xs text-muted-foreground">
                You won&apos;t be charged yet
              </p>

              <div className="space-y-1.5 border-t border-border pt-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="min-w-0 truncate text-muted-foreground">
                    {product.title}
                  </span>
                  <span className="shrink-0 font-medium">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="min-w-0 truncate text-muted-foreground">
                    Express Shipping
                  </span>
                  <span className="shrink-0 font-medium">
                    {product.shipping === 0
                      ? "Free"
                      : `$${product.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="min-w-0 truncate text-muted-foreground">
                    LuxeFrame Service Fee
                  </span>
                  <span className="shrink-0 font-medium">$0.00</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="text-base font-bold text-foreground">
                  Total
                </span>
                <span className="text-lg font-bold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3xl w-full space-y-3xl lg:mt-4xl lg:space-y-4xl">
          <div className="border-b border-border pb-2xl">
            <h2 className="mb-lg text-lg font-semibold tracking-tight text-foreground">
              Highlights
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {product.features.map((feature) => {
                const FeatureIcon = featureIcons[feature.icon] ?? Brush;
                return (
                  <div
                    key={feature.title}
                    className="rounded-xl border border-border bg-card p-6"
                  >
                    <FeatureIcon size={24} className="mb-4 text-foreground" />
                    <h3 className="text-sm font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-b border-border pb-2xl">
            <h2 className="mb-lg text-lg font-semibold tracking-tight text-foreground">
              About this product
            </h2>
            <p className="text-base leading-relaxed text-foreground">
              {product.description}
            </p>
            <button className="mt-lg flex items-center space-x-1 text-sm font-semibold text-foreground underline">
              <span>Read more</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div>
            <h2 className="mb-lg text-lg font-semibold tracking-tight text-foreground">
              Specifications
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {product.specs.map((spec) => (
                <div key={spec.label} className="rounded-xl bg-card p-4 sm:p-6">
                  <span className="mb-2 flex text-primary">
                    {spec.label === "Dimensions" ? (
                      <Ruler size={24} />
                    ) : (
                      <Layers size={24} />
                    )}
                  </span>
                  <div className="text-sm font-medium">{spec.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 rounded-xl border border-border p-6 text-muted-foreground">
            <Verified size={24} className="text-primary" />
            <p className="text-sm">
              <span className="font-bold text-foreground">
                Luxe Verified.
              </span>{" "}
              Every unit is bench-tested for sound, battery, and build quality
              before dispatch.
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 z-40 -mx-4 flex items-center justify-between gap-4 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 md:hidden">
          <div>
            <span className="text-xl font-bold text-foreground">
              ${product.price}
            </span>
            <span className="text-sm text-muted-foreground"> / print</span>
          </div>
          <Link
            href="/cart"
            className="flex items-center justify-center space-x-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.98]"
          >
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </Link>
        </div>
      </main>
  );
}
