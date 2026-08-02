import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "reicon-react";

const featuredProducts = [
  {
    title: "Aurora Wireless Headphones Pro",
    rating: "4.9",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    badge: "Best seller",
  },
  {
    title: "Vertex 4K Mirrorless Camera",
    rating: "4.8",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: 'Nimbus Ultrabook 14"',
    rating: "4.9",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Pulse Smartwatch Series X",
    rating: "4.7",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Echo True Wireless Earbuds",
    rating: "4.6",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Boom Portable Speaker",
    rating: "4.8",
    price: 179,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Tact Mechanical Keyboard",
    rating: "4.7",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Phantom Gaming Mouse",
    rating: "4.9",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80",
  },
];

function ProductCard({
  product,
}: {
  product: (typeof featuredProducts)[number];
}) {
  return (
    <Card className="group w-44 shrink-0 overflow-hidden bg-card shadow-none ring-0 sm:w-48">
      <div className="relative aspect-square overflow-hidden">
        <img
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          src={product.image}
        />
        {product.badge ? (
          <Badge className="absolute left-3 top-3 bg-background text-foreground shadow-sm ring-1 ring-border">
            {product.badge}
          </Badge>
        ) : null}
        <Button
          type="button"
          variant="secondary"
          size="icon"
          aria-label={`Save ${product.title}`}
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur-sm hover:bg-background"
        >
          <Heart size={18} />
        </Button>
      </div>
      <CardContent className="p-0 pt-3">
        <p className="text-sm font-medium leading-tight text-foreground">
          {product.title}
        </p>
        <p className="mt-1 text-sm font-semibold text-foreground">
          ${product.price.toLocaleString()}
        </p>
        <div className="mt-0.5 flex items-center gap-1">
          <Star size={12} weight="Filled" className="text-primary" />
          <span className="text-sm text-muted-foreground">
            {product.rating}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[clamp(1.15rem,1.1rem+0.5vw,1.5rem)] font-semibold tracking-tight text-foreground">
            Featured products
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This week&apos;s most-wanted gear, picked by our team.
          </p>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-1 pr-2 hide-scrollbar snap-x snap-mandatory">
        {featuredProducts.map((product, index) => (
          <Link
            key={`${product.title}-${index}`}
            href="/products"
            className="snap-start"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}
