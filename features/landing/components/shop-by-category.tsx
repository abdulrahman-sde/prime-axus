import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag } from "reicon-react";
import EmptyPanel from "./empty-panel";

export interface CategoryTile {
  name: string;
  image: string;
  count: number;
}

function categoryHref(name: string) {
  return `/products?category=${encodeURIComponent(name)}`;
}

export default function ShopByCategory({
  categories,
}: {
  categories: CategoryTile[];
}) {
  const [lead, ...rest] = categories;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-6">
        <h2 className="text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-medium tracking-tight text-foreground">
          Shop by category
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Jump straight to your fit.
        </p>
      </div>

      {categories.length === 0 ? (
        <EmptyPanel
          icon={Tag}
          title="Categories are filling up"
          description="Shop-by-category tiles appear here once pieces are listed. Check back soon."
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <Link
          href={categoryHref(lead.name)}
          className="group relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl bg-muted md:row-span-2 md:aspect-auto"
        >
          <Image
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            src={lead.image}
            alt={lead.name}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
            <div>
              <p className="text-lg font-medium text-white sm:text-xl">
                {lead.name}
              </p>
              <p className="text-sm text-white/75">
                {lead.count > 0
                  ? `${lead.count} ${lead.count === 1 ? "piece" : "pieces"}`
                  : "Coming soon"}
              </p>
            </div>
            <ArrowRight
              size={20}
              className="mb-1 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </Link>

        {rest.slice(0, 4).map((tile) => (
          <Link
            key={tile.name}
            href={categoryHref(tile.name)}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-muted"
          >
            <Image
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              src={tile.image}
              alt={tile.name}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4">
              <p className="text-sm font-medium text-white sm:text-base">
                {tile.name}
              </p>
              <ArrowRight
                size={16}
                className="shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </Link>
        ))}
        </div>
      )}
    </section>
  );
}
