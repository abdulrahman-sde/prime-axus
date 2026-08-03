import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import type { StoreProduct } from "@/types";

export default function ProductCard({ product }: { product: StoreProduct }) {
  return (
    <div className="group flex cursor-pointer flex-col gap-3">
      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted">
        {product.image ? (
          <Image
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={product.image}
            alt={product.name}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}
        {product.stock === 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
            Sold out
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            {product.name}
          </span>
          <span className="truncate text-sm text-muted-foreground">
            {product.type ?? product.category ?? product.description}
          </span>
          <span className="mt-1 text-sm font-medium text-foreground">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
